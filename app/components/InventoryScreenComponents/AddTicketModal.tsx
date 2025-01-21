import { useState } from "react";
import { Modal, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons"

import ServiceTicket from "../../utils/ServiceTicket";
import Gear, { GearContainer } from "../../utils/Gear";

import globalStyles, { COLORS, getCurrentDate } from '@/app/globals';

import Dropdown from "../Dropdown";


const AddTicketModal = ({gear, onClose}: {gear: GearContainer, onClose: () => void}) => {
  const [newGearContainer, setNewGearContainer] = useState('')
  const [newTicket, setNewTicket] = useState(new ServiceTicket(0, getCurrentDate(), ''));
  const [newGear, setNewGear] = useState<Gear | null>(null)
  const [currentExpanded, setCurrentExpanded] = useState('')

  return(
    <Modal animationType="fade" transparent={true} onRequestClose={() => {onClose(); setNewGearContainer('')}}>
      <View style={globalStyles.modal}>
        <View style={{padding: 10}}>
          <Dropdown 
            data={[
              {key: 'INFRASTRUCTURE', value: 'infrastructure'},
              {key: 'LASER FIXTURES', value: 'laserFixtures'},
              {key: 'LX FIXTURES', value: 'lxFixtures'},
              {key: 'SFX', value: 'sfx'},
              {key: 'SHOW CONTROL', value: 'showControl'}
            ]} 
            onSelect={(item: {key: string, value: any}) => {setNewGearContainer(item.value)}}
            placeholderText='CATEGORY'
            style={{margin: 10}}
            expandLogic
            name={'CATEGORY'}
            onExpand={name => setCurrentExpanded(name)}
            currentExpanded={currentExpanded}
          />
          <View style={{flexDirection: 'row'}}>
            <Dropdown
              isDisabled={newGearContainer === ''}
              data={newGearContainer === '' ? [] : gear[newGearContainer as keyof GearContainer].map(item => ({key: item.name, value: item}))} 
              onSelect={(item: {key: string, value: any}) => {setNewGear(item.value)}}
              placeholderText='ITEM'
              style={{margin: 10}}
              expandLogic
              name={'ITEM'}
              onExpand={name => setCurrentExpanded(name)}
              currentExpanded={currentExpanded}
            />
            <View style={{...styles.addTicketNotes, width: 60, paddingBottom: 5, paddingTop: 9}}>
              <TextInput
                style={{color: COLORS.WHITE, fontWeight: 'bold', alignSelf: 'center'}}
                onChangeText={(text: string) => setNewTicket({...newTicket, qty: Number(text)})}
                placeholder={'QTY'}
                placeholderTextColor={COLORS.LIGHT_GRAY}
                enterKeyHint={'done'}
                contextMenuHidden
                keyboardAppearance={'dark'}
                keyboardType={'number-pad'}
                maxLength={200}
                selectionColor={COLORS.GOLD}
              />
            </View>
          </View>

          <View style={styles.addTicketNotes}>
            <TextInput
              style={{color: COLORS.WHITE, fontWeight: 'bold'}}
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
        </View>

        <View style={globalStyles.modalExitButtons}>
          <TouchableOpacity onPress={() => {onClose(); setNewGearContainer('')}}>
            <Ionicons name={'close-circle'} color={COLORS.RED} size={70}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {if (newGear && newTicket.qty > 0 && newTicket.qty <= newGear.qtyOwned) newGear.addTicket(newTicket); onClose();}}>
            <Ionicons name={'checkmark-circle'} color={COLORS.GREEN} size={70}/>
          </TouchableOpacity>
        </View>
      </View>
    </Modal> 
  )
}

const styles = StyleSheet.create({
  addTicketNotes: {
    backgroundColor: COLORS.BLACK,
    borderColor: COLORS.GOLD,
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    padding: 8,
    paddingBottom: 14
  }
});

export default AddTicketModal;