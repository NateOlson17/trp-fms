import { useState } from 'react';
import { TextInput, View } from 'react-native';

import ServiceTicket from '@/app/utils/ServiceTicket';
import Gear, { GearContainer } from '@/app/utils/Gear';

import Dropdown from '@/app/components/Dropdown';

import globalStyles, { COLORS, getCurrentDate } from '@/app/globals';
import GenericModal from '@/app/components/GenericModal';


const AddTicketModal = ({gear, onClose}: {gear: GearContainer, onClose: () => void}) => {
  const [newGearContainer, setNewGearContainer] = useState('')
  const [newTicket, setNewTicket] = useState(new ServiceTicket({qty: 0, date: getCurrentDate(), notes: ''}));
  const [newGear, setNewGear] = useState({} as Gear)
  const [currentExpanded, setCurrentExpanded] = useState('')


  return(
    <GenericModal onClose={onClose} onSubmit={() => newGear.addTicket(newTicket)} submitValidated={newGear && newTicket.qty > 0 && newTicket.qty <= newGear.qtyOwned}>
      <Dropdown 
        data={[
          {key: 'INFRASTRUCTURE', value: 'infrastructure'},
          {key: 'LASER FIXTURES', value: 'laserFixtures'},
          {key: 'LX FIXTURES', value: 'lxFixtures'},
          {key: 'SFX', value: 'sfx'},
          {key: 'SHOW CONTROL', value: 'showControl'}
        ]} 
        onSelect={(item: {key: string, value: string}) => setNewGearContainer(item.value)}
        placeholderText={'CATEGORY'}
        style={{margin: 10, width: 140}}
        searchEnabled={false}
        expandLogic
        name={'CATEGORY'}
        onExpand={name => setCurrentExpanded(name)}
        currentExpanded={currentExpanded}
      />

      <View style={{flexDirection: 'row'}}>
        <Dropdown
          isDisabled={!newGearContainer}
          data={newGearContainer ? gear[newGearContainer as keyof GearContainer].map(item => ({key: item.name, value: item})) : []} 
          onSelect={(item: {key: string, value: Gear}) => setNewGear(item.value)}
          placeholderText={'ITEM'}
          style={{margin: 10, width: 170}}
          searchEnabled
          expandLogic
          name={'ITEM'}
          onExpand={name => setCurrentExpanded(name)}
          currentExpanded={currentExpanded}
        />
        <View style={{...globalStyles.modalField, width: 60, paddingBottom: 5, paddingTop: 9}}>
          <TextInput
            style={{...globalStyles.textInput, alignSelf: 'center'}}
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
          style={globalStyles.textInput}
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