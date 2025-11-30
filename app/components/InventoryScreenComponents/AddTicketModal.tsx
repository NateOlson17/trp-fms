import { useState } from 'react';
import { TextInput, View } from 'react-native';

import ServiceTicket from '@/app/utils/ServiceTicket';
import Gear, { GearContainer } from '@/app/utils/Gear';

import Dropdown from '@/app/components/Dropdown';
import GenericModal from '@/app/components/GenericModal';
import Radio from '@/app/components/Radio';

import globalStyles, { COLORS, KeyVal, STD_OPTIONS } from '@/app/globals';


const AddTicketModal = ({gear, onClose}: {gear: GearContainer, onClose: () => void}) => {
  const [newGearContainer, setNewGearContainer] = useState<keyof GearContainer>('' as keyof GearContainer)
  const [newTicket, setNewTicket] = useState(new ServiceTicket({qty: 0, location: 'CO', date: new Date().toString(), notes: ''}));
  const [gearItem, setGearItem] = useState({} as Gear)
  const [currentExpanded, setCurrentExpanded] = useState('')


  return(
    <GenericModal title='ADD SERVICE TICKET' onClose={onClose} onSubmit={() => gearItem.addTicket(newTicket)} submitValidated={gearItem && newTicket.qty > 0 && newTicket.qty <= gearItem.qtyOwned}>
      <View style={{flexDirection: 'row'}}>
        <Dropdown 
          data={STD_OPTIONS.containers} 
          onSelect={(item: KeyVal<keyof GearContainer>) => setNewGearContainer(item.val)}
          placeholderText={'CATEGORY'}
          style={globalStyles.dropdown}
          searchEnabled={false}
          expandLogic
          name={'CATEGORY'}
          onExpand={name => setCurrentExpanded(name)}
          currentExpanded={currentExpanded}
        />
        <Radio
            data={STD_OPTIONS.locations}
            onSelect={(item: KeyVal<string>) => setNewTicket({...newTicket, location: item.val})}
            defaultOption={{key: 'CO', val: 'CO'}}
            style={{marginLeft: 10, marginTop: 15}}
          />
      </View>

      <View style={{flexDirection: 'row'}}>
        <Dropdown
          isDisabled={!newGearContainer}
          data={newGearContainer ? gear[newGearContainer].map(item => ({key: item.name, val: item})) : []} 
          onSelect={(item: KeyVal<Gear>) => setGearItem(item.val)}
          placeholderText={'ITEM'}
          style={globalStyles.dropdown}
          searchEnabled
          expandLogic
          name={'ITEM'}
          onExpand={name => setCurrentExpanded(name)}
          currentExpanded={currentExpanded}
        />
        <View style={{...globalStyles.modalField, ...globalStyles.modalFieldSize}}>
          <TextInput
            style={{...globalStyles.textInput, ...globalStyles.modalFieldSize}}
            textAlign={'center'}
            onChangeText={(text: string) => setNewTicket({...newTicket, qty: Number(text)})}
            placeholder={'QTY'}
            placeholderTextColor={COLORS.LIGHT_GRAY}
            enterKeyHint={'done'}
            contextMenuHidden
            keyboardAppearance={'dark'}
            keyboardType={'number-pad'}
            maxLength={4}
            selectionColor={COLORS.GOLD}
          />
        </View>
      </View>

      <View style={globalStyles.modalField}>
        <TextInput
          style={{...globalStyles.textInput, minWidth: 200, minHeight: 30, marginRight: 'auto'}}
          onChangeText={(text: string) => setNewTicket({...newTicket, notes: text})}
          placeholder={'NOTES'}
          placeholderTextColor={COLORS.LIGHT_GRAY}
          returnKeyType={'done'}
          returnKeyLabel={'done'}
          keyboardAppearance={'dark'}
          maxLength={200}
          multiline
          blurOnSubmit
          selectionColor={COLORS.GOLD}
        />
      </View>
    </GenericModal>
  )
}

export default AddTicketModal;