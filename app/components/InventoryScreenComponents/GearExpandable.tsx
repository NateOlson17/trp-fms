import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Animated, useAnimatedValue, StyleSheet } from 'react-native';

import Gear from '../../utils/Gear';

import { COLORS } from '../../globals';
import GearCard from './GearCard';


const GearExpandable = ({data, name, currentExpanded, onExpand}: {data: Gear[], name: string, currentExpanded?: string, onExpand?: (name: string) => void}) => {
  const [expanded, setExpanded] = useState(false);
  const listScaleAnim = useAnimatedValue(0);

  var containsDamaged = false; //determine if expandable contains damaged gear
  for (const gear of data) {
    if (gear.serviceTickets.length) {
      containsDamaged = true;
      break;
    }
  };

  if (expanded && currentExpanded && currentExpanded != name) {
    setExpanded(false);
    listScaleAnim.setValue(0)
  }

  return (
    <View>
      <TouchableOpacity style={{...styles.headerView, borderColor: containsDamaged ? COLORS.RED : COLORS.GOLD}} onPress={() => {
        if (expanded) {
          listScaleAnim.setValue(1);
          Animated.timing(listScaleAnim, {toValue: 0, duration: 400, useNativeDriver: true}).start(() => setExpanded(false));
        } else {
          setExpanded(true);
          if (onExpand) onExpand(name);
          listScaleAnim.setValue(0);
          Animated.timing(listScaleAnim, {toValue: 1, duration: 400, useNativeDriver: true}).start();
        }
      }}>
        <Text style={styles.headerText}>{name}</Text>
      </TouchableOpacity>

      {expanded &&
        <Animated.View style={{paddingBottom: 30, transformOrigin: 'top', transform: [{scaleY: listScaleAnim}]}}>
          <FlatList
            data={data}
            renderItem={(item) => <GearCard gearItem={item.item}/>}
            keyExtractor={gearItem => gearItem.key}
          />
        </Animated.View>
      }
    </View>
  );
};


const styles = StyleSheet.create({
  headerView: {
    margin: 4,
    backgroundColor: COLORS.BLACK,
    borderWidth: 2,
    borderRadius: 10
  },

  headerText: {
    padding: 5,
    margin: 'auto',
    color: COLORS.WHITE,
    fontWeight: 'bold'
  }
});

export default GearExpandable;