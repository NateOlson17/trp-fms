import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import RNDateTimePicker from '@react-native-community/datetimepicker';

import BlankModal from '@/app/components/BlankModal';
import Range from '@/app/components/Range';
import Radio from '@/app/components/Radio';
import Checkbox from '@/app/components/Checkbox';

import { COLORS, STD_OPTIONS, KeyVal, checkObjEqual, dateToLocalTrunc } from '@/app/globals';

import { GearContainer } from '@/app/utils/Gear';

export type GearFilters = {
  avgPurchaseCost: {low: number, high: number};
  rentalCost: {low: number, high: number};
  powerDraw: {low: number, high: number};
  qtyOwned: {low: number, high: number};
  hasServiceTickets: 'Y' | 'N' | 'ALL';
  purchaseDate: {low: number, high: number};
  locations: string[];
}

export const getDefaultGearFilters = (gear: GearContainer): GearFilters => {
  let minPurchaseCost = 100000;
  let maxPurchaseCost = 0;
  let maxRentalCost = 0;
  let maxPowerDraw = 0;
  let maxQtyOwned = 1;
  let minDate = Number.MAX_VALUE;
  let maxDate = 0;
  Object.keys(gear).forEach(key => {gear[key as keyof GearContainer].forEach(gearItem => {
    if (gearItem.avgPurchaseCost < minPurchaseCost) minPurchaseCost = Math.floor(gearItem.avgPurchaseCost);
    if (gearItem.avgPurchaseCost > maxPurchaseCost) maxPurchaseCost = Math.ceil(gearItem.avgPurchaseCost);
    if (gearItem.rentalCost > maxRentalCost) maxRentalCost = gearItem.rentalCost;
    if (gearItem.powerDraw > maxPowerDraw) maxPowerDraw = gearItem.powerDraw;
    if (gearItem.qtyOwned > maxQtyOwned) maxQtyOwned = gearItem.qtyOwned;
    gearItem.purchaseDates.forEach(item => {
      if (dateToLocalTrunc(item.date) > dateToLocalTrunc(maxDate)) maxDate = item.date;
      if (dateToLocalTrunc(item.date) < dateToLocalTrunc(minDate)) minDate = item.date;
    })
  })});

  return {
    avgPurchaseCost: {low: minPurchaseCost, high: maxPurchaseCost},
    rentalCost: {low: 0, high: maxRentalCost},
    powerDraw: {low: 0, high: maxPowerDraw},
    qtyOwned: {low: 1, high: maxQtyOwned},
    hasServiceTickets: 'ALL',
    purchaseDate: {low: minDate, high: maxDate},
    locations: STD_OPTIONS.locations.map(loc => loc.val)
  }
  
}


const FilterGearModal = ({gear, onClose, currFilters, onReset}: {gear: GearContainer, onClose: (newFilters: GearFilters) => void, currFilters: GearFilters, onReset: () => void}) => {
  const defaultFilters = getDefaultGearFilters(gear);
  let filters = currFilters;

  const [resetVisible, setResetVisible] = useState(!checkObjEqual(filters, defaultFilters));
  
  const checkForReset = () => {if (checkObjEqual(filters, defaultFilters) == resetVisible) setResetVisible(!resetVisible);}

  return (
    <BlankModal onClose={() => onClose(filters)} showReset={resetVisible} onReset={() => {onReset(); setResetVisible(false)}}>
      <Range
        name={'PURCHASE COST'}
        range={defaultFilters.avgPurchaseCost}
        startRange={filters.avgPurchaseCost}
        step={1}
        onChange={(range: {low: number, high: number}) => {filters.avgPurchaseCost = range; checkForReset();}}
      />   
      <Range
        name={'RENTAL COST'}
        range={defaultFilters.rentalCost}
        startRange={filters.rentalCost}
        step={10}
        onChange={(range: {low: number, high: number}) => {filters.rentalCost = range; checkForReset();}}
      />
      <Range
        name={'POWER DRAW'}
        range={defaultFilters.powerDraw}
        startRange={filters.powerDraw}
        step={10}
        onChange={(range: {low: number, high: number}) => {filters.powerDraw = range; checkForReset();}}
      />
      <Range
        name={'QTY OWNED'}
        range={defaultFilters.qtyOwned}
        startRange={filters.qtyOwned}
        step={1}
        onChange={(range: {low: number, high: number}) => {filters.qtyOwned = range; checkForReset();}}
      />

      <View style={styles.pickerWrapper}>
        <View>
          <Text style={styles.label}>SERVICE TICKETS</Text>
          <Radio
            data={['Y', 'N', 'ALL'].map(opt => ({key: opt, val: opt}))}
            onSelect={(item: KeyVal<string>) => {filters.hasServiceTickets = item.val as 'Y'|'N'|'ALL'; checkForReset();}}
            defaultOption={{key: filters.hasServiceTickets, val: filters.hasServiceTickets}}
            style={{margin: 'auto'}}
          />
        </View>

        <View>
          <Text style={styles.label}>LOCATIONS</Text>
          <Checkbox
            data={STD_OPTIONS.locations}
            defaultOptions={filters.locations.map(loc => ({key: loc, val: loc}))}
            onChange={options => {filters.locations = options.map(opt => opt.key); checkForReset();}}
            style={{margin: 'auto'}}
          />
        </View>
      </View>

      <Text style={{...styles.label, marginTop: 30, marginBottom: 0}}>PURCHASED</Text>
      <View style={styles.pickerWrapper}>
        <View>
          <Text style={styles.label}>AFTER</Text>
          <RNDateTimePicker 
            value={new Date(filters.purchaseDate.low)}
            onChange={(event, date) => {if (event.type == 'set' && date) filters.purchaseDate.low = date.getTime(); checkForReset();}}
            minimumDate={new Date(filters.purchaseDate.low)}
            maximumDate={new Date(filters.purchaseDate.high)}
            textColor={COLORS.GOLD}
            accentColor={COLORS.GOLD}
            themeVariant='dark'
          />
        </View>

        <View>
          <Text style={styles.label}>BEFORE</Text>
          <RNDateTimePicker 
            value={new Date(filters.purchaseDate.high)}
            onChange={(event, date) => {if (event.type == 'set' && date) filters.purchaseDate.high = date.getTime(); checkForReset();}}
            minimumDate={new Date(filters.purchaseDate.low)}
            maximumDate={new Date(filters.purchaseDate.high)}
            textColor={COLORS.GOLD}
            accentColor={COLORS.GOLD}
            themeVariant='dark'
          />
        </View>
      </View>
    </BlankModal>
  )
}

const styles = StyleSheet.create({
  pickerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },

  label: {
    fontWeight: 'bold',
    color: COLORS.WHITE,
    margin: 'auto',
    marginTop: 10,
    marginBottom: 10
  }
});

export default FilterGearModal;