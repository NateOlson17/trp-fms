import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { RangeSlider } from '@react-native-assets/slider';

import { COLORS } from '../globals';

const Range = (props: {range: {low: number, high: number}, startRange: {low: number, high: number}, step: number, name: string, onChange: (range: {low: number, high: number}) => void}) => {
  const [labelRange, setLabelRange] = useState(props.startRange);

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.labelWrapper}>
        <Text style={styles.label}>{labelRange.low}</Text>
        <Text style={styles.label}>{props.name}</Text>
        <Text style={styles.label}>{labelRange.high}</Text>
      </View>
      <RangeSlider
        range={[props.startRange.low, props.startRange.high]}
        step={props.step}
        minimumValue={props.range.low}
        maximumValue={props.range.high}
        outboundColor={COLORS.LIGHT_GRAY}
        inboundColor={COLORS.WEAK_BROWN}
        thumbTintColor={COLORS.WEAK_BROWN}
        thumbSize={24}
        thumbStyle={{borderColor: COLORS.GOLD, borderWidth: 5}}
        onValueChange={(range: [low: number, high: number]) => {props.onChange({low: range[0], high: range[1]}); setLabelRange({low: range[0], high: range[1]})}}
      />
    </View>
    
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    padding: 10
  },

  labelWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5
  },
  
  label: {
    fontWeight: 'bold',
    color: COLORS.WHITE,
  }
});

export default Range
