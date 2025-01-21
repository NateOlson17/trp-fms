import { useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";

import { GearContainer } from "../../utils/Gear";

import Dropdown from "../Dropdown";

import Ionicons from "@expo/vector-icons/Ionicons";

import globalStyles, { COLORS } from "../../globals";


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
          />
          <Dropdown
            isDisabled={newGearContainer === ''}
            data={newGearContainer === '' ? [] : gear[newGearContainer as keyof GearContainer].map(item => ({key: item.name, value: item}))} 
            onSelect={(item: {key: string, value: any}) => {}}
            placeholderText='ITEM'
            style={{margin: 10}}
          />
        </View>

        <View style={globalStyles.modalExitButtons}>
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

  export default AddGearModal;
  
  
  