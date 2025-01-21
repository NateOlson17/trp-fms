import { useContext, useState } from 'react';
import { Modal, TouchableOpacity, View, StyleSheet} from 'react-native';

import { GearContext } from './_layout';

import Ionicons from '@expo/vector-icons/Ionicons';

import globalStyles, { COLORS } from '@/app/globals';

import GearExpandable from '../InventoryScreenComponents/GearExpandable';
import AddGearModal from '../InventoryScreenComponents/AddGearModal';
import AddTicketModal from '../InventoryScreenComponents/AddTicketModal'


const InventoryScreen = () => {
  const gear = useContext(GearContext)
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [ticketModalVisible, setTicketModalVisible] = useState(false);
  const [currentExpanded, setCurrentExpanded] = useState('');

  return(
    <View style={globalStyles.screenWrapper}>
      <View style={{flex: 2.5, maxHeight: 380, paddingBottom: 100, alignContent: 'flex-start'}}>
        <GearExpandable name='INFRASTRUCTURE' currentExpanded={currentExpanded} onExpand={name => setCurrentExpanded(name)} data={gear.infrastructure}/>
        <GearExpandable name='LASER FIXTURES' currentExpanded={currentExpanded} onExpand={name => setCurrentExpanded(name)} data={gear.laserFixtures}/>
        <GearExpandable name='LX FIXTURES' currentExpanded={currentExpanded} onExpand={name => setCurrentExpanded(name)} data={gear.lxFixtures}/>
        <GearExpandable name='SFX' currentExpanded={currentExpanded} onExpand={name => setCurrentExpanded(name)} data={gear.sfx}/>
        <GearExpandable name='SHOW CONTROL' currentExpanded={currentExpanded} onExpand={name => setCurrentExpanded(name)} data={gear.showControl}/>
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
      {addModalVisible && <AddGearModal gear={gear} onClose={() => setAddModalVisible(false)} isVisible={addModalVisible}/>}
      {ticketModalVisible && <AddTicketModal gear={gear} onClose={() => setTicketModalVisible(false)}/>}
    </View>
  );
}


const styles = StyleSheet.create({
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
  }
});

export default InventoryScreen;