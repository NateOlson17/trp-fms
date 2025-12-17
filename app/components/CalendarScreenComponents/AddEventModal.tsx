import { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import RNDateTimePicker from '@react-native-community/datetimepicker';

import Event from '@/app/utils/Event';
import Technician from '@/app/utils/Technician'

import GenericModal from '@/app/components/GenericModal'
import Dropdown from '@/app/components/Dropdown';

import globalStyles, { COLORS, KeyVal } from '@/app/globals';

const AddEventModal = ({techs, onClose}: {techs: Technician[], onClose: () => void}) => {
  const [newEvent, setNewEvent] = useState<Partial<Event>>({startDate: new Date().getTime(), endDate: new Date().getTime()});

  return (
    <GenericModal title='ADD EVENT' onClose={onClose} onSubmit={() => {new Event(newEvent as Event).pushToDB()}} submitValidated={!!(newEvent.name && newEvent.client && newEvent.location && newEvent.manager && newEvent.contact && newEvent.contactInfo)}>
      <Dropdown
        data={techs.map(tech => ({key: tech.name, val: tech}))}
        onSelect={(item: KeyVal) => setNewEvent({...newEvent, manager: item.val})}
        placeholderText={'MANAGER'}
        style={{...globalStyles.dropdown, width: 160, alignSelf: 'center'}}
        searchEnabled={true}
        expandLogic={false}
      />

      <View style={{...globalStyles.modalField, ...globalStyles.modalFieldSize, width: 160, alignSelf: 'center'}}>
        <TextInput
          style={{...globalStyles.textInput, ...globalStyles.modalFieldSize, marginRight: 'auto', width: 140}}
          onChangeText={text => setNewEvent({...newEvent, name: text})}
          placeholder={'NAME'}
          placeholderTextColor={COLORS.LIGHT_GRAY}
          returnKeyType={'done'}
          returnKeyLabel={'done'}
          contextMenuHidden
          blurOnSubmit
          keyboardAppearance={'dark'}
          maxLength={50}
          selectionColor={COLORS.GOLD}
        />
      </View>
      <View style={{...globalStyles.modalField, ...globalStyles.modalFieldSize, width: 160, alignSelf: 'center'}}>
        <TextInput
          style={{...globalStyles.textInput, ...globalStyles.modalFieldSize, marginRight: 'auto', width: 140}}
          onChangeText={text => setNewEvent({...newEvent, location: text})}
          placeholder={'LOCATION'}
          placeholderTextColor={COLORS.LIGHT_GRAY}
          returnKeyType={'done'}
          returnKeyLabel={'done'}
          contextMenuHidden
          blurOnSubmit
          keyboardAppearance={'dark'}
          maxLength={50}
          selectionColor={COLORS.GOLD}
        />
      </View>

      <View style={{...globalStyles.modalField, ...globalStyles.modalFieldSize, width: 160, alignSelf: 'center'}}>
        <TextInput
          style={{...globalStyles.textInput, ...globalStyles.modalFieldSize, marginRight: 'auto', width: 140}}
          onChangeText={text => setNewEvent({...newEvent, client: text})}
          placeholder={'CLIENT'}
          placeholderTextColor={COLORS.LIGHT_GRAY}
          returnKeyType={'done'}
          returnKeyLabel={'done'}
          contextMenuHidden
          blurOnSubmit
          keyboardAppearance={'dark'}
          maxLength={50}
          selectionColor={COLORS.GOLD}
        />
      </View>

      <View style={{flexDirection: 'row'}}>
        <View style={{...globalStyles.modalField, ...globalStyles.modalFieldSize, width: 145}}>
          <TextInput
            style={{...globalStyles.textInput, ...globalStyles.modalFieldSize, marginRight: 'auto', width: 125}}
            onChangeText={text => setNewEvent({...newEvent, contact: text})}
            placeholder={'CONTACT'}
            placeholderTextColor={COLORS.LIGHT_GRAY}
            returnKeyType={'done'}
            returnKeyLabel={'done'}
            contextMenuHidden
            blurOnSubmit
            keyboardAppearance={'dark'}
            maxLength={50}
            selectionColor={COLORS.GOLD}
          />
        </View>
        <View style={{...globalStyles.modalField, ...globalStyles.modalFieldSize, width: 145}}>
          <TextInput
            style={{...globalStyles.textInput, ...globalStyles.modalFieldSize, marginRight: 'auto', width: 125}}
            onChangeText={text => setNewEvent({...newEvent, contactInfo: text})}
            placeholder={'CONTACT INFO'}
            placeholderTextColor={COLORS.LIGHT_GRAY}
            returnKeyType={'done'}
            returnKeyLabel={'done'}
            contextMenuHidden
            blurOnSubmit
            keyboardAppearance={'dark'}
            maxLength={50}
            selectionColor={COLORS.GOLD}
          />
        </View>
      </View>

      <View style={styles.pickerWrapper}>
        <View>
          <Text style={styles.label}>START</Text>
          <RNDateTimePicker
            value={new Date(newEvent.startDate as number)}
            onChange={(event, date) => {if (event.type == 'set' && date) setNewEvent({...newEvent, startDate: date.getTime()})}}
            textColor={COLORS.GOLD}
            accentColor={COLORS.GOLD}
            themeVariant='dark'
          />
        </View>
        <View>
          <Text style={styles.label}>END</Text>
          <RNDateTimePicker 
            value={new Date(newEvent.endDate as number)}
            onChange={(event, date) => {if (event.type == 'set' && date) setNewEvent({...newEvent, endDate: date.getTime()})}}
            textColor={COLORS.GOLD}
            accentColor={COLORS.GOLD}
            themeVariant='dark'
          />
        </View>
      </View>
    </GenericModal>
  )
}

const styles = StyleSheet.create({
  pickerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },

  label: {
    fontWeight: 'bold',
    color: COLORS.WHITE,
    margin: 'auto',
    marginTop: 10,
    marginBottom: 10
  }
});

export default AddEventModal;