import { useContext, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, Text, useAnimatedValue, Animated, TextInput } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import Technician from '@/app/utils/Technician';

import AddTechModal from '@/app/components/LaborScreenComponents/AddTechModal';
import FilterTechsModal, { getDefaultTechFilters, TechFilters } from '@/app/components/LaborScreenComponents/FilterTechsModal';
import TechCard from '@/app/components/LaborScreenComponents/TechCard';

import globalStyles, { COLORS, checkObjEqual } from '@/app/globals';

import { TechContext } from '@/app/components/(tabs)/_layout';

const filterTechs = (arr: Technician[], filters: TechFilters, searchText: string) => {
  if (!searchText && checkObjEqual(filters, getDefaultTechFilters())) return arr; //pass unfiltered array if no filters or search applied
  
  return arr.filter(tech => (
    (!searchText || tech.name.toUpperCase().includes(searchText.toUpperCase())) && //pass items matching search text
    (checkObjEqual(filters, getDefaultTechFilters()) || ( //do not check filters if no filters are applied
      (tech.location == 'ALL' || tech.location == filters.location) &&
      tech.roles.lx >= filters.lx && tech.roles.ax >= filters.ax && tech.roles.lsr >= filters.lsr && tech.roles.vdo >= filters.vdo
    ))
  ))
}

const LaborScreen = () => {
  const techs = useContext(TechContext);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const [filters, setFilters] = useState(getDefaultTechFilters());

  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchShifted, setSearchShifted] = useState(false); //search bar shifts up when keyboard visible
  const searchShift = useAnimatedValue(0);
  
  return(
    <View style={globalStyles.screenWrapper}>
      {filterTechs(techs, filters, searchText).length ? 
        <FlatList
          data={filterTechs(techs, filters, searchText)}
          renderItem={({item}) => <TechCard tech={item}/>}
          keyExtractor={tech => tech.name}
          style={{marginBottom: 5}}
        />
      : 
        <View style={styles.emptyView}>
          <Text style={globalStyles.textInput}>NO MATCHES</Text>
        </View>
      }

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
                <Ionicons name={'filter'} color={checkObjEqual(filters, getDefaultTechFilters()) ? COLORS.GOLD : COLORS.GREEN} size={35}/>
              </TouchableOpacity>
            }
          </Animated.View>
        }

        <View style={styles.actionButtonBar}>
          <TouchableOpacity onPress={() => setSearchBarVisible(!searchBarVisible)} style={styles.actionButton}>
            <Ionicons name={'search'} color={!searchText && checkObjEqual(filters, getDefaultTechFilters()) ? COLORS.GOLD : COLORS.GREEN} size={65}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAddModalVisible(true)} style={styles.actionButton}>
            <Ionicons name={'add-circle-outline'} color={COLORS.GOLD} size={100}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
            <View style={{width: 65}}></View>
          </TouchableOpacity>
        </View>
      </View>

      {addModalVisible && <AddTechModal onClose={() => setAddModalVisible(false)}/>}
      {filterModalVisible && <FilterTechsModal currFilters={filters} onClose={(newFilters) => {setFilters(newFilters); setFilterModalVisible(false);}}/>}
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

  addButton: {
    alignSelf: 'center', 
    marginTop: 'auto', 
    marginBottom: 20
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

  emptyView: {
    ...globalStyles.border,
    padding: 5,
    margin: 10,
    alignItems: 'center',
    backgroundColor: COLORS.GRAY,
  }
});

export default LaborScreen;
