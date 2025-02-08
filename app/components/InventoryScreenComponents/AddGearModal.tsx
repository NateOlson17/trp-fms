import { useState } from "react";
import { TextInput, View } from "react-native";

import Gear, { GearContainer } from "@/app/utils/Gear";

import GenericModal from "@/app/components/GenericModal"
import Dropdown from "@/app/components/Dropdown";

import globalStyles, { COLORS, getCurrentDate } from "@/app/globals";


const AddGearModal = ({gear, onClose}: {gear: GearContainer, onClose: () => void}) => {
  const [currentExpanded, setCurrentExpanded] = useState('');
  const [newGearContainer, setNewGearContainer] = useState('');
  const [newGear, setNewGear] = useState<Partial<Gear> | undefined>(undefined);
  const [currentGear, setCurrentGear] = useState<Gear | undefined>(undefined)
  const [addToCurrent, setAddToCurrent] = useState<{qty?: number, location?: string, cost?: number}>({});

  return (
    <GenericModal 
      onClose={onClose} 
      onSubmit={() => {
        if (newGear) {
          new Gear({
            ...newGear as Gear,
            avgPurchaseCost: (newGear.avgPurchaseCost as number) / (newGear.qtyOwned as number),
            locations: [{...(newGear.locations as {qty: number, location: string}[])[0], qty: newGear.qtyOwned as number}],
            purchaseDates: [{qty: newGear.qtyOwned as number, date: getCurrentDate()}]
          }).addToContainer(newGearContainer as keyof GearContainer)
        } else {
          currentGear?.addQty(addToCurrent as {qty: number, location: string, cost: number})
        }
      }}
      submitValidated={newGear ? 
          typeof newGear.rentalCost === 'number' && typeof newGear.avgPurchaseCost === 'number' && typeof newGear.powerDraw === 'number' && typeof newGear.qtyOwned === 'number' && Object.hasOwn(newGear, 'locations')
        :
          typeof addToCurrent.qty === 'number' && typeof addToCurrent.cost === 'number' && Object.hasOwn(addToCurrent, 'location')
      }
    >
      <Dropdown
        data={[
          {key: 'INFRASTRUCTURE', value: 'infrastructure'},
          {key: 'LASER FIXTURES', value: 'laserFixtures'},
          {key: 'LX FIXTURES', value: 'lxFixtures'},
          {key: 'SFX', value: 'sfx'},
          {key: 'SHOW CONTROL', value: 'showControl'}
        ]} 
        onSelect={(item: {key: string, value: string}) => setNewGearContainer(item.value)}
        placeholderText={'CATEGORY'}
        style={globalStyles.dropdown}
        searchEnabled={false}
        expandLogic
        name={'CATEGORY'}
        onExpand={name => setCurrentExpanded(name)}
        currentExpanded={currentExpanded}
      />
      <Dropdown
          isDisabled={!newGearContainer}
          data={newGearContainer ? gear[newGearContainer as keyof GearContainer].map(item => ({key: item.name, value: item})) : []} 
          onSelect={(item: {key: string, value: Gear | string}, added: boolean) => {
            if (added) {
              setNewGear({name: item.value as string});
              setCurrentGear(undefined);
            } else {
              setCurrentGear(item.value as Gear);
              setNewGear(undefined);
            }
          }}
          placeholderText={'ITEM'}
          style={globalStyles.dropdown}
          searchEnabled
          addEnabled
          expandLogic
          name={'ITEM'}
          onExpand={name => setCurrentExpanded(name)}
          currentExpanded={currentExpanded}
        />

        {currentGear &&
          <View>
            <View style={{...globalStyles.modalField, ...globalStyles.modalFieldSize}}>
              <TextInput
                style={{...globalStyles.textInput, ...globalStyles.modalFieldSize}}
                textAlign={'center'}
                onChangeText={text => setAddToCurrent({...addToCurrent, qty: Number(text) || undefined})}
                placeholder={'QTY'}
                placeholderTextColor={COLORS.LIGHT_GRAY}
                enterKeyHint={'done'}
                contextMenuHidden
                keyboardAppearance={'dark'}
                keyboardType={'number-pad'}
                maxLength={4}
                selectionColor={COLORS.GOLD}
              />
            </View>
            <View style={{...globalStyles.modalField, ...globalStyles.modalFieldSize}}>
              <TextInput
                style={{...globalStyles.textInput, ...globalStyles.modalFieldSize}}
                textAlign={'center'}
                onChangeText={text => setAddToCurrent({...addToCurrent, cost: text ? Number(text) : undefined})}
                placeholder={'COST'}
                placeholderTextColor={COLORS.LIGHT_GRAY}
                enterKeyHint={'done'}
                contextMenuHidden
                keyboardAppearance={'dark'}
                keyboardType={'number-pad'}
                maxLength={6}
                selectionColor={COLORS.GOLD}
              />
            </View>
            <Dropdown
              data={['CO', 'CA'].map(item => ({key: item, value: item}))} 
              onSelect={(item: {key: string, value: string}) => setAddToCurrent({...addToCurrent, location: item.value})}
              placeholderText={'LOCATION'}
              style={globalStyles.dropdown}
              searchEnabled={false}
              addEnabled
              expandLogic
              name={'LOCATION'}
              onExpand={name => setCurrentExpanded(name)}
              currentExpanded={currentExpanded}
            />
          </View> 
        }

        {newGear &&
          <View>
            <View style={globalStyles.modalField}>
            <TextInput
                style={{...globalStyles.textInput, minWidth: 200, minHeight: 30, marginRight: 'auto'}}
                onChangeText={text => setNewGear({...newGear, includes: text.split(',').map(item => item.trim()).filter(item => item)})}
                placeholder={'INCLUDES\n(comma between each item)'}
                placeholderTextColor={COLORS.LIGHT_GRAY}
                returnKeyType={'done'}
                returnKeyLabel={'done'}
                contextMenuHidden
                multiline
                blurOnSubmit
                keyboardAppearance={'dark'}
                maxLength={500}
                selectionColor={COLORS.GOLD}
              />
              </View>
              <View style={globalStyles.modalField}>
               <TextInput
                style={{...globalStyles.textInput, minWidth: 200, minHeight: 30, marginRight: 'auto'}}
                onChangeText={text => setNewGear({...newGear, notes: text})}
                placeholder={'NOTES'}
                placeholderTextColor={COLORS.LIGHT_GRAY}
                returnKeyType={'done'}
                returnKeyLabel={'done'}
                contextMenuHidden
                multiline
                blurOnSubmit
                keyboardAppearance={'dark'}
                maxLength={500}
                selectionColor={COLORS.GOLD}
              />
              </View>
              <View style={{flexDirection: 'row'}}>
              <View style={{...globalStyles.modalField, ...globalStyles.modalFieldSize}}>
              <TextInput
                style={{...globalStyles.textInput, ...globalStyles.modalFieldSize}}
                textAlign={'center'}
                onChangeText={text => setNewGear({...newGear, avgPurchaseCost: text ? Number(text) : undefined})}
                placeholder={'COST'}
                placeholderTextColor={COLORS.LIGHT_GRAY}
                enterKeyHint={'done'}
                contextMenuHidden
                keyboardAppearance={'dark'}
                keyboardType={'number-pad'}
                maxLength={6}
                selectionColor={COLORS.GOLD}
              />
              </View>
              <View style={{...globalStyles.modalField, ...globalStyles.modalFieldSize}}>
              <TextInput
                style={{...globalStyles.textInput, ...globalStyles.modalFieldSize}}
                textAlign={'center'}
                onChangeText={text => setNewGear({...newGear, rentalCost: text ? Number(text) : undefined})}
                placeholder={'RENT'}
                placeholderTextColor={COLORS.LIGHT_GRAY}
                enterKeyHint={'done'}
                contextMenuHidden
                keyboardAppearance={'dark'}
                keyboardType={'number-pad'}
                maxLength={6}
                selectionColor={COLORS.GOLD}
              />
              </View>
              <View style={{...globalStyles.modalField, ...globalStyles.modalFieldSize}}>
              <TextInput
                style={{...globalStyles.textInput, ...globalStyles.modalFieldSize}}
                textAlign={'center'}
                onChangeText={text => setNewGear({...newGear, powerDraw: text ? Number(text) : undefined})}
                placeholder={'DRAW'}
                placeholderTextColor={COLORS.LIGHT_GRAY}
                enterKeyHint={'done'}
                contextMenuHidden
                keyboardAppearance={'dark'}
                keyboardType={'number-pad'}
                maxLength={6}
                selectionColor={COLORS.GOLD}
              />
              </View>
              <View style={{...globalStyles.modalField, ...globalStyles.modalFieldSize}}>
              <TextInput
                style={{...globalStyles.textInput, ...globalStyles.modalFieldSize}}
                textAlign={'center'}
                onChangeText={text => setNewGear({...newGear, qtyOwned: Number(text) || undefined})}
                placeholder={'QTY'}
                placeholderTextColor={COLORS.LIGHT_GRAY}
                enterKeyHint={'done'}
                contextMenuHidden
                keyboardAppearance={'dark'}
                keyboardType={'number-pad'}
                maxLength={4}
                selectionColor={COLORS.GOLD}
              />
              </View>
              </View>
              <Dropdown
              data={['CO', 'CA'].map(item => ({key: item, value: item}))} 
              onSelect={(item: {key: string, value: string}) => setNewGear({...newGear, locations: [{qty: 0, location: item.value}]})}
              placeholderText={'LOCATION'}
              style={globalStyles.dropdown}
              searchEnabled={false}
              addEnabled
              expandLogic
              name={'LOCATION'}
              onExpand={name => setCurrentExpanded(name)}
              currentExpanded={currentExpanded}
            />
          </View>
        }
    </GenericModal>
  )
}

export default AddGearModal;