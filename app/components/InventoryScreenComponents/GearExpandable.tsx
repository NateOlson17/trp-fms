import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Animated, useAnimatedValue, StyleSheet } from 'react-native';

import Gear from '@/app/utils/Gear';

import GearCard from '@/app/components/InventoryScreenComponents/GearCard';

import globalStyles, { COLORS } from '@/app/globals';


const GearExpandable = ({data, name, currentExpanded, onExpand}: {data: Gear[], name: string, currentExpanded?: string, onExpand?: (name: string) => void}) => {
  const [expanded, setExpanded] = useState(false);

  const listScaleAnim = useAnimatedValue(0);

  var containsDamaged = false;
  for (const gear of data) {if (gear.serviceTickets.length) {containsDamaged = true; break;}}

  if (expanded && currentExpanded && currentExpanded != name) {setExpanded(false); listScaleAnim.setValue(0)} //force collapse if another GearExpandable is expanded

  return (
    <View>
      <TouchableOpacity style={{...styles.headerView, borderColor: data.length? (containsDamaged ? COLORS.RED : COLORS.GOLD) : COLORS.LIGHT_GRAY}} onPress={() => {
        if (expanded) {
          Animated.timing(listScaleAnim, {toValue: 0, duration: 400, useNativeDriver: true}).start(() => setExpanded(false));
        } else {
          setExpanded(true);
          if (onExpand) onExpand(name);
          Animated.timing(listScaleAnim, {toValue: 1, duration: 400, useNativeDriver: true}).start();
        }
      }}>
        <Text style={styles.headerText}>{name}</Text>
      </TouchableOpacity>

      {expanded &&
        <Animated.View style={{...styles.listContainer, transform: [{scaleY: listScaleAnim}]}}>
          {data.length ? 
            <FlatList
            data={data}
            renderItem={item => <GearCard gearItem={item.item}/>}
            keyExtractor={gearItem => gearItem.key}
          />
          :
          <View style={styles.emptyView}>
            <Text style={{color: COLORS.WHITE}}>NO MATCHES</Text>
          </View>
          }
        </Animated.View>
      }
    </View>
  );
};


const styles = StyleSheet.create({
  headerView: {
    ...globalStyles.border,
    margin: 4,
  },

  headerText: {
    padding: 5,
    margin: 'auto',
    color: COLORS.WHITE,
    fontWeight: 'bold'
  },

  listContainer: {
    paddingBottom: 30, 
    maxHeight: 270, 
    transformOrigin: 'top', 
  },

  emptyView: {
    ...globalStyles.border,
    padding: 5,
    margin: 10,
    alignItems: 'center',
    backgroundColor: COLORS.GRAY,
  }
});

export default GearExpandable;