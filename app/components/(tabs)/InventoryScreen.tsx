import { useContext, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, useAnimatedValue, Animated, TextInput } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import Gear from '@/app/utils/Gear';
import ServiceTicket from '@/app/utils/ServiceTicket';

import GearExpandable from '@/app/components/InventoryScreenComponents/GearExpandable';
import AddGearModal from '@/app/components/InventoryScreenComponents/AddGearModal';
import AddTicketModal from '@/app/components/InventoryScreenComponents/AddTicketModal';
import FilterGearModal, { getDefaultGearFilters, GearFilters } from '@/app/components/InventoryScreenComponents/FilterGearModal';

import globalStyles, { checkObjEqual, COLORS } from '@/app/globals';

import { GearContext } from '@/app/components/(tabs)/_layout';

const filterGear = (arr: Gear[], filters: GearFilters, defaultFilters: GearFilters, searchText: string) => {
  const applied = (prop: keyof GearFilters) => (filters[prop] !== defaultFilters[prop]) //determine if prop has been changed from default

  const numberInRange = (num: number, prop: 'avgPurchaseCost' | 'rentalCost' | 'powerDraw' | 'qtyOwned') => (
    !applied(prop) || (num >= filters[prop].low && num <= filters[prop].high) //determine if filter is unapplied or (applied and value within filter)
  )

  const dateInRange = (dateList: Date[]) => ( //determine if filter is unapplied or (applied and value within filter)
    !applied('purchaseDate') || dateList.some(date => (
      date >= filters.purchaseDate.low && date <= filters.purchaseDate.high
    ))
  )

  const serviceTicketsMatch = (tickets: ServiceTicket[]) => ( //determine if filter is applied or both serviceTicket statuses are shown or (item has service tickets and those with service tickets are shown) or (item does not have service tickets and items without service tickets are shown)
    !applied('hasServiceTickets') || filters.hasServiceTickets === 'ALL' || (filters.hasServiceTickets === 'Y' && tickets.length) || (filters.hasServiceTickets === 'N' && !tickets.length)
  )

  const locationsMatch = (locations: string[]) => (!applied('locations') || filters.locations.some(filterLoc => locations.includes(filterLoc))) //determine if filter is unapplied or some location filter matches any location of the item

  if (!searchText && checkObjEqual(filters, defaultFilters)) return arr; //pass unfiltered array if no filters or search applied
  return arr.filter(gearItem => (
    (!searchText || (searchText && gearItem.name.includes(searchText))) && //pass items matching search text
    (checkObjEqual(filters, defaultFilters) || ( //do not check filters if no filters are applied
      numberInRange(gearItem.avgPurchaseCost, 'avgPurchaseCost') &&
      numberInRange(gearItem.rentalCost, 'rentalCost') &&
      numberInRange(gearItem.powerDraw, 'powerDraw') &&
      numberInRange(gearItem.qtyOwned, 'qtyOwned') &&
      dateInRange(gearItem.purchaseDates.map(item => new Date(item.date))) &&
      serviceTicketsMatch(gearItem.serviceTickets) &&
      locationsMatch(gearItem.locations.map(item => item.location))
    ))
  ))
}



const InventoryScreen = () => {
  const gear = useContext(GearContext);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [ticketModalVisible, setTicketModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [searchBarVisible, setSearchBarVisible] = useState(false); 
  const [currentExpanded, setCurrentExpanded] = useState(''); //track current expanded GearExpandable to force all others closed
  const [searchText, setSearchText] = useState('');

  const defaultFilters = getDefaultGearFilters(gear);
  const [filters, setFilters] = useState<GearFilters>(defaultFilters);
  const [filterModalKey, setFilterModalKey] = useState(0);

  const [searchShifted, setSearchShifted] = useState(false); //search bar shifts up when keyboard visible
  const searchShift = useAnimatedValue(0);

  return(
    <View style={globalStyles.screenWrapper}>
      <View style={styles.gearExpandableContainer}>
        <GearExpandable name='INFRASTRUCTURE' currentExpanded={currentExpanded} onExpand={name => setCurrentExpanded(name)} data={filterGear(gear.infrastructure, filters, defaultFilters, searchText)}/>
        <GearExpandable name='LASER FIXTURES' currentExpanded={currentExpanded} onExpand={name => setCurrentExpanded(name)} data={filterGear(gear.laserFixtures, filters, defaultFilters, searchText)}/>
        <GearExpandable name='LX FIXTURES' currentExpanded={currentExpanded} onExpand={name => setCurrentExpanded(name)} data={filterGear(gear.lxFixtures, filters, defaultFilters, searchText)}/>
        <GearExpandable name='SFX' currentExpanded={currentExpanded} onExpand={name => setCurrentExpanded(name)} data={filterGear(gear.sfx, filters, defaultFilters, searchText)}/>
        <GearExpandable name='SHOW CONTROL' currentExpanded={currentExpanded} onExpand={name => setCurrentExpanded(name)} data={filterGear(gear.showControl, filters, defaultFilters, searchText)}/>
        <GearExpandable name='CABLE' currentExpanded={currentExpanded} onExpand={name => setCurrentExpanded(name)} data={filterGear(gear.cable, filters, defaultFilters, searchText)}/>
      </View>

      <View style={styles.bottomBar}>
        {searchBarVisible &&
          <Animated.View style={{...styles.searchBar,transform: [{translateY: searchShift}]}}>
            <View style={styles.searchField}>
              <TextInput
                value={searchText}
                style={styles.searchText}
                onChangeText={text => setSearchText(text)}
                onFocus={() => {
                  setSearchShifted(true);
                  Animated.timing(searchShift, {toValue: -67, duration: 300, useNativeDriver: true}).start();
                }}
                onEndEditing={() => {
                  setSearchShifted(false);
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

              {searchText && 
                <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearSearch}>
                  <Ionicons name={'close-circle'} color={COLORS.LIGHT_GRAY} size={24}/>
                </TouchableOpacity>
              }
            </View>

            {!searchShifted &&
              <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
                <Ionicons name={'filter'} color={checkObjEqual(filters, defaultFilters) ? COLORS.GOLD : COLORS.GREEN} size={35}/>
              </TouchableOpacity>
            }
          </Animated.View>
        }

        <View style={styles.actionButtonBar}>
          <TouchableOpacity onPress={() => setSearchBarVisible(!searchBarVisible)} style={styles.actionButton}>
            <Ionicons name={'search'} color={!searchText && checkObjEqual(filters, defaultFilters) ? COLORS.GOLD : COLORS.GREEN} size={65}/>
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
      {filterModalVisible && <FilterGearModal gear={gear} currFilters={filters} onClose={(newFilters) => {setFilterModalVisible(false); setFilters(newFilters);}} onReset={() => {setFilters(defaultFilters); setFilterModalKey(filterModalKey + 1)}} key={filterModalKey}/>}
    </View>
  )
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
    ...globalStyles.border,
    backgroundColor: COLORS.BLACK,
    height: 40,
    flexDirection: 'row',
    flex: 1,
    marginRight: 5,
    paddingLeft: 5
  },

  clearSearch: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 10
  },

  actionButton: {
    marginBottom: 20,
    alignSelf: 'center',
    marginLeft: 20,
    marginRight: 20
  },

  actionButtonBar: {
    height: 123,
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