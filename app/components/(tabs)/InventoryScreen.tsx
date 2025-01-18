import { useContext, useState } from 'react';
import { Modal, TouchableOpacity, View, StyleSheet } from 'react-native';
import { GearContext } from './_layout'
import { COLORS } from '@/app/globals';
import GearExpandable from '../GearExpandable';
import Ionicons from '@expo/vector-icons/Ionicons';

const addEvent = () => {

}

const InventoryScreen = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const gear = useContext(GearContext)

  return(
    <View style={styles.screenWrapper}>
      <View>
        <GearExpandable name='INFRASTRUCTURE' data={gear.infrastructure}/>
        <GearExpandable name='LASER FIXTURES' data={gear.laserFixtures}/>
        <GearExpandable name='LX FIXTURES' data={gear.lxFixtures}/>
        <GearExpandable name='SFX' data={gear.sfx}/>
        <GearExpandable name='SHOW CONTROL' data={gear.showControl}/>
      </View>

      <Modal animationType="fade" transparent={true} visible={addModalVisible} onRequestClose={() => setAddModalVisible(false)}>
        <View style={styles.addModal}>
          <View style={styles.addModalExitButtons}>
            <TouchableOpacity onPress={() => {setAddModalVisible(false)}}>
              <Ionicons name={'close-circle'} color={COLORS.RED} size={70}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setAddModalVisible(false)}}>
              <Ionicons name={'checkmark-circle'} color={COLORS.GREEN} size={70}/>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => {setAddModalVisible(true)}} style={styles.addButton}>
          <Ionicons name={'add-circle-outline'} color={COLORS.GOLD} size={100} />
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
    marginTop: 60,
    marginLeft: 20,
    marginRight: 20,
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