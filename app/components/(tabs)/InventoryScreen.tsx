import { useContext, useState } from 'react';
import { Modal, TouchableOpacity, View, StyleSheet } from 'react-native';

import { GearContext } from './_layout';

import { GearContainer } from '@/app/utils/Gear';

import Ionicons from '@expo/vector-icons/Ionicons';

import { COLORS } from '@/app/globals';

import GearExpandable from '../GearExpandable';
import Dropdown from '../Dropdown';

const AddGearModal = ({gear, onClose, isVisible}: {gear: GearContainer, onClose: () => void, isVisible: boolean}) => {
  const [newGearContainer, setNewGearContainer] = useState('')

  const DBAddGear = () => {

  }

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
    <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.addModal}>
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
          />
          <Dropdown
            isDisabled={newGearContainer === ''}
            data={ newGearContainer === '' ? [] : gear[newGearContainer as keyof GearContainer].map(item => ({key: item.name, value: item}))} 
            onSelect={(item: {key: string, value: any}) => {}}
            placeholderText='ITEM'
          />
        </View>
        <View style={styles.addModalExitButtons}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name={'close-circle'} color={COLORS.RED} size={70}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {onClose(); DBAddGear()}}>
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

  return(
    <View style={styles.screenWrapper}>
      <View style={{flex: 2.5, maxHeight: 380, paddingBottom: 100, alignContent: 'flex-start'}}>
        <GearExpandable name='INFRASTRUCTURE' data={gear.infrastructure}/>
        <GearExpandable name='LASER FIXTURES' data={gear.laserFixtures}/>
        <GearExpandable name='LX FIXTURES' data={gear.lxFixtures}/>
        <GearExpandable name='SFX' data={gear.sfx}/>
        <GearExpandable name='SHOW CONTROL' data={gear.showControl}/>
      </View>

      <AddGearModal gear={gear} onClose={() => setAddModalVisible(false)} isVisible={addModalVisible}/>

      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => {setAddModalVisible(true)}} style={styles.addButton}>
          <Ionicons name={'add-circle-outline'} color={COLORS.GOLD} size={100}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: COLORS.BLACK
  },

  addButton: {
    alignSelf: 'center', 
    marginTop: 'auto', 
    marginBottom: 20
  },

  addModal: {
    backgroundColor: COLORS.GRAY,
    borderColor: COLORS.GOLD,
    borderWidth: 3,
    borderRadius: 20,
    margin: 20,
    marginTop: 60,
    marginBottom: 170,
    flex: 1
  },

  addModalExitButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 'auto',
    marginBottom: 20
  }
});

export default InventoryScreen;