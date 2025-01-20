import { useContext, useState } from 'react';
import { Modal, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';

import { GearContext } from './_layout';

import Gear, { GearContainer } from '@/app/utils/Gear';
import ServiceTicket from '@/app/utils/ServiceTicket';

import Ionicons from '@expo/vector-icons/Ionicons';

import { COLORS, getCurrentDate } from '@/app/globals';

import GearExpandable from '../GearExpandable';
import Dropdown from '../Dropdown';

const AddGearModal = ({gear, onClose, isVisible}: {gear: GearContainer, onClose: () => void, isVisible: boolean}) => {
  const [newGearContainer, setNewGearContainer] = useState('')

  var newGearData = {
    name: '',
    includes: [],
    purchaseCost: 0,
    rentalCost: 0,
    powerDraw: 0,
    qtyAdded: 0,
    notes: ''
  }

  return(
    <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={() => {onClose(); setNewGearContainer('')}}>
      <View style={styles.modal}>
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
            style = {{margin: 10}}
          />
          <Dropdown
            isDisabled={newGearContainer === ''}
            data={newGearContainer === '' ? [] : gear[newGearContainer as keyof GearContainer].map(item => ({key: item.name, value: item}))} 
            onSelect={(item: {key: string, value: any}) => {}}
            placeholderText='ITEM'
            style={{margin: 10}}
          />
        </View>

        <View style={styles.modalExitButtons}>
          <TouchableOpacity onPress={() => {onClose(); setNewGearContainer('')}}>
            <Ionicons name={'close-circle'} color={COLORS.RED} size={70}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {onClose(); setNewGearContainer('')}}>
            <Ionicons name={'checkmark-circle'} color={COLORS.GREEN} size={70}/>
          </TouchableOpacity>
        </View>
      </View>
    </Modal> 
  )
}



const AddTicketModal = ({gear, onClose, isVisible}: {gear: GearContainer, onClose: () => void, isVisible: boolean}) => {
  const [newGearContainer, setNewGearContainer] = useState('')

  var newTicket = new ServiceTicket(0, getCurrentDate(), '');
  var newGear: Gear | null = null;

  return(
    <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={() => {onClose(); setNewGearContainer('')}}>
      <View style={styles.modal}>
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
          />
          <View style={{flexDirection: 'row'}}>
            <Dropdown
              isDisabled={newGearContainer === ''}
              data={newGearContainer === '' ? [] : gear[newGearContainer as keyof GearContainer].map(item => ({key: item.name, value: item}))} 
              onSelect={(item: {key: string, value: any}) => {newGear = item.value}}
              placeholderText='ITEM'
              style={{margin: 10}}
            />
            <View style={{...styles.addTicketNotes, width: 60, paddingBottom: 5, paddingTop: 9}}>
              <TextInput
                style={{color: COLORS.WHITE, fontWeight: 'bold', alignSelf: 'center'}}
                onChangeText={(text: string) => newTicket.qty = Number(text)}
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
              onChangeText={(text: string) => newTicket.notes = text}
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

        <View style={styles.modalExitButtons}>
          <TouchableOpacity onPress={() => {onClose(); setNewGearContainer('')}}>
            <Ionicons name={'close-circle'} color={COLORS.RED} size={70}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {if (newTicket.qty > 0 && newGear) {onClose(); setNewGearContainer(''); newGear.addTicket(newTicket)}}}>
            <Ionicons name={'checkmark-circle'} color={COLORS.GREEN} size={70}/>
          </TouchableOpacity>
        </View>
      </View>
    </Modal> 
  )
}



const InventoryScreen = () => {
  const gear = useContext(GearContext)
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [ticketModalVisible, setTicketModalVisible] = useState(false);

  return(
    <View style={styles.screenWrapper}>
      <View style={{flex: 2.5, maxHeight: 380, paddingBottom: 100, alignContent: 'flex-start'}}>
        <GearExpandable name='INFRASTRUCTURE' data={gear.infrastructure}/>
        <GearExpandable name='LASER FIXTURES' data={gear.laserFixtures}/>
        <GearExpandable name='LX FIXTURES' data={gear.lxFixtures}/>
        <GearExpandable name='SFX' data={gear.sfx}/>
        <GearExpandable name='SHOW CONTROL' data={gear.showControl}/>
      </View>

      <View style={styles.actionButtonBar}>
      <TouchableOpacity style={styles.actionButton}>
          <Ionicons name={'search'} color={COLORS.GOLD} size={65}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setAddModalVisible(true)}} style={styles.actionButton}>
          <Ionicons name={'add-circle-outline'} color={COLORS.GOLD} size={100}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setTicketModalVisible(true)}}style={styles.actionButton}>
          <Ionicons name={'build-outline'} color={COLORS.GOLD} size={65}/>
        </TouchableOpacity>
      </View>
      <AddGearModal gear={gear} onClose={() => setAddModalVisible(false)} isVisible={addModalVisible}/>
      <AddTicketModal gear={gear} onClose={() => setTicketModalVisible(false)} isVisible={ticketModalVisible}/>
    </View>
  );
}


const styles = StyleSheet.create({
  screenWrapper: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: COLORS.BLACK
  },

  actionButton: {  
    marginBottom: 20,
    alignSelf: 'center',
    marginLeft: 20,
    marginRight: 20
  },

  actionButtonBar: {
    height: 120,
    flexDirection: 'row',
    marginTop: 'auto',
    justifyContent: 'space-between'
  },

  modal: {
    backgroundColor: COLORS.GRAY,
    borderColor: COLORS.GOLD,
    borderWidth: 3,
    borderRadius: 20,
    margin: 20,
    marginTop: 60,
    marginBottom: 170,
    flex: 1
  },

  modalExitButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 'auto',
    marginBottom: 20
  },

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

export default InventoryScreen;