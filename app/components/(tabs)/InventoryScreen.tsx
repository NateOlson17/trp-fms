import { useContext, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, useAnimatedValue, Animated, TextInput } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import Gear from '@/app/utils/Gear';

import GearExpandable from '@/app/components/InventoryScreenComponents/GearExpandable';
import AddGearModal from '@/app/components/InventoryScreenComponents/AddGearModal';
import AddTicketModal from '@/app/components/InventoryScreenComponents/AddTicketModal';
import FilterGearModal, { Filters } from '@/app/components/InventoryScreenComponents/FilterGearModal';

import globalStyles, { COLORS } from '@/app/globals';

import { GearContext } from '@/app/components/(tabs)/_layout';


const InventoryScreen = () => {
  const gear = useContext(GearContext)

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [ticketModalVisible, setTicketModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [searchBarVisible, setSearchBarVisible] = useState(false); 
  const [currentExpanded, setCurrentExpanded] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState<Filters>({
    
  });

  const searchShift = useAnimatedValue(0);

  const filterGear = (arr: Gear[]) => {
    if (!searchText && Object.values(filters).every(item => !item)) return arr;
    return arr.filter(gearItem => (
      (searchText && gearItem.name.includes(searchText))
    ))
  }

  return(
    <View style={globalStyles.screenWrapper}>
      <View style={styles.gearExpandableContainer}>
        <GearExpandable name='INFRASTRUCTURE' currentExpanded={currentExpanded} onExpand={name => setCurrentExpanded(name)} data={filterGear(gear.infrastructure)}/>
        <GearExpandable name='LASER FIXTURES' currentExpanded={currentExpanded} onExpand={name => setCurrentExpanded(name)} data={filterGear(gear.laserFixtures)}/>
        <GearExpandable name='LX FIXTURES' currentExpanded={currentExpanded} onExpand={name => setCurrentExpanded(name)} data={filterGear(gear.lxFixtures)}/>
        <GearExpandable name='SFX' currentExpanded={currentExpanded} onExpand={name => setCurrentExpanded(name)} data={filterGear(gear.sfx)}/>
        <GearExpandable name='SHOW CONTROL' currentExpanded={currentExpanded} onExpand={name => setCurrentExpanded(name)} data={filterGear(gear.showControl)}/>
        <GearExpandable name='CABLE' currentExpanded={currentExpanded} onExpand={name => setCurrentExpanded(name)} data={filterGear(gear.cable)}/>
      </View>

      <View style={styles.bottomBar}>
        {searchBarVisible &&
          <Animated.View style={{...styles.searchBar,transform: [{translateY: searchShift}]}}>
            <View style={styles.searchField}>
              <TextInput
                  value={searchText}
                  style={styles.searchText}
                  onChangeText={(text: string) => {setSearchText(text)}}
                  onFocus={() => {
                    Animated.timing(searchShift, {toValue: -67, duration: 300, useNativeDriver: true}).start();
                  }}
                  onEndEditing={() => {
                    Animated.timing(searchShift, {toValue: 0, duration: 300, useNativeDriver: true}).start();
                  }}
                  placeholder={'SEARCH'}
                  placeholderTextColor={COLORS.LIGHT_GRAY}
                  returnKeyType={'done'}
                  returnKeyLabel={'done'}
                  keyboardAppearance={'dark'}
                  maxLength={50}
                  selectionColor={COLORS.GOLD}
                />
            </View>

            <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
              <Ionicons name={'filter'} color={Object.values(filters).every(item => !item) ? COLORS.GOLD : COLORS.GREEN} size={35}/>
            </TouchableOpacity>
          </Animated.View>
        }

        <View style={styles.actionButtonBar}>
        <TouchableOpacity onPress={() => setSearchBarVisible(!searchBarVisible)} style={styles.actionButton}>
            <Ionicons name={'search'} color={searchText || !Object.values(filters).every(item => !item) ? COLORS.GREEN : COLORS.GOLD} size={65}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAddModalVisible(true)} style={styles.actionButton}>
            <Ionicons name={'add-circle-outline'} color={COLORS.GOLD} size={100}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTicketModalVisible(true)} style={styles.actionButton}>
            <Ionicons name={'build-outline'} color={COLORS.GOLD} size={65}/>
          </TouchableOpacity>
        </View>
      </View>

      {addModalVisible && <AddGearModal gear={gear} onClose={() => setAddModalVisible(false)}/>}
      {ticketModalVisible && <AddTicketModal gear={gear} onClose={() => setTicketModalVisible(false)}/>}
      {filterModalVisible && <FilterGearModal onSubmit={filters => setFilters(filters)} onClose={() => setFilterModalVisible(false)}/>}
    </View>
  );
}


const styles = StyleSheet.create({
  bottomBar: {
    marginTop: 'auto'
  },

  searchBar: {
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 3
  },

  searchText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
    flex: 1
  },

  searchField: {
    backgroundColor: COLORS.BLACK,
    borderColor: COLORS.GOLD,
    borderWidth: 2,
    borderRadius: 10,
    height: 40,
    flex: 1,
    marginRight: 5,
    paddingLeft: 5
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
    justifyContent: 'space-between'
  },

  gearExpandableContainer: {
    flex: 2.5, 
    maxHeight: 340, 
    paddingBottom: 100, 
    alignContent: 'flex-start'
  }
});

export default InventoryScreen;