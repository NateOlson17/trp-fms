import { StyleSheet, TextInput, View } from "react-native";
import RangeSlider from 'rn-range-slider';

import GenericModal from "@/app/components/GenericModal"

import { COLORS, STD_OPTIONS } from "@/app/globals";
import { useState } from "react";
import { GearContainer } from "@/app/utils/Gear";

export type GearFilters = {
  avgPurchaseCost: {low: number, high: number};
  rentalCost: {low: number, high: number};
  powerDraw: {low: number, high: number};
  qtyOwned: {low: number, high: number};
  hasServiceTickets: 'yes' | 'no' | 'both';
  purchaseDate: {low: string, high: string};
  locations: string[];
}

export const getDefaultGearFilters = (gear: GearContainer): GearFilters => {
  let minPurchaseCost = 100000;
  let maxPurchaseCost = 0;
  let maxRentalCost = 0;
  let maxPowerDraw = 0;
  let maxQtyOwned = 1;
  let minDate = '1-0-3000';
  let maxDate = '1-0-1971';
  Object.keys(gear).forEach(key => {gear[key as keyof GearContainer].forEach(gearItem => {
    if (gearItem.avgPurchaseCost < minPurchaseCost) minPurchaseCost = gearItem.avgPurchaseCost;
    if (gearItem.avgPurchaseCost > maxPurchaseCost) maxPurchaseCost = gearItem.avgPurchaseCost;
    if (gearItem.rentalCost > maxRentalCost) maxRentalCost = gearItem.rentalCost;
    if (gearItem.powerDraw > maxPowerDraw) maxPowerDraw = gearItem.powerDraw;
    if (gearItem.qtyOwned > maxQtyOwned) maxQtyOwned = gearItem.qtyOwned;
    gearItem.purchaseDates.forEach(item => {
      if (Date.parse(item.date) > Date.parse(maxDate)) maxDate = item.date;
      if (Date.parse(item.date) < Date.parse(minDate)) minDate = item.date;
    })
  })})

  return {
    avgPurchaseCost: {low: minPurchaseCost, high: maxPurchaseCost},
    rentalCost: {low: 0, high: maxRentalCost},
    powerDraw: {low: 0, high: maxPowerDraw},
    qtyOwned: {low: 1, high: maxQtyOwned},
    hasServiceTickets: 'both',
    purchaseDate: {low: minDate, high: maxDate},
    locations: STD_OPTIONS.locations.map(loc => loc.val)
  }
  
}


const FilterGearModal = ({gear, onClose, onSubmit}: {gear: GearContainer, onClose: () => void, onSubmit: (filters: GearFilters) => void}) => {
  const defaultFilters = getDefaultGearFilters(gear);
  const [filters, setFilters] = useState<GearFilters>(defaultFilters);

  return (
    <GenericModal onClose={onClose} onSubmit={() => onSubmit(filters)} submitValidated={true}>

    </GenericModal>
  )
}

const styles = StyleSheet.create({

});

export default FilterGearModal;