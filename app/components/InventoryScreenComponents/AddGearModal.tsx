import { useState } from "react";
import { TextInput, View, Text } from "react-native";

import Gear, { GearContainer } from "@/app/utils/Gear";

import GenericModal from "@/app/components/GenericModal"
import Dropdown from "@/app/components/Dropdown";

import globalStyles, { COLORS, KeyVal, STD_OPTIONS } from "@/app/globals";
import Radio from "@/app/components/Radio";


const AddGearModal = ({gear, onClose}: {gear: GearContainer, onClose: () => void}) => {
  const [currentExpanded, setCurrentExpanded] = useState('');
  const [newGearContainer, setNewGearContainer] = useState<keyof GearContainer>('' as keyof GearContainer);
  const [newGear, setNewGear] = useState<Partial<Gear> | undefined>(undefined);
  const [currentGear, setCurrentGear] = useState<Gear | undefined>(undefined);
  const [addToCurrent, setAddToCurrent] = useState<{qty?: number, location?: string, cost?: number, notes?: string}>({});

  return (
    <GenericModal 
      title='ADD GEAR ITEM'
      onClose={onClose} 
      onSubmit={() => {
        if (newGear) {
          const g = newGear as Gear;
          new Gear({
            ...g,
            avgPurchaseCost: g.avgPurchaseCost / g.qtyOwned,
            locations: [{location: g.locations? g.locations[0].location : 'CO', qty: g.qtyOwned}],
            purchaseDates: [{qty: g.qtyOwned, date: new Date().toString(), cost: g.avgPurchaseCost, location: g.locations? g.locations[0].location : 'CO', notes: g.notes}]
          }).addToContainer(newGearContainer);
        } else {
          currentGear?.addQty(addToCurrent.qty as number, addToCurrent.cost as number, addToCurrent.location || 'CO', addToCurrent.notes || '');
        }
      }}
      submitValidated={newGear ? 
        typeof newGear.rentalCost === 'number' && typeof newGear.avgPurchaseCost === 'number' && typeof newGear.powerDraw === 'number' && typeof newGear.qtyOwned === 'number'
      :
        typeof addToCurrent.qty === 'number' && typeof addToCurrent.cost === 'number'
      }
    >
      <Dropdown
        data={STD_OPTIONS.containers} 
        onSelect={(item: KeyVal<keyof GearContainer>) => setNewGearContainer(item.val)}
        placeholderText={'CATEGORY'}
        style={{...globalStyles.dropdown, alignSelf: 'center'}}
        searchEnabled={false}
        expandLogic
        name={'CATEGORY'}
        onExpand={name => setCurrentExpanded(name)}
        currentExpanded={currentExpanded}
      />
      <Dropdown
        isDisabled={!newGearContainer}
        data={newGearContainer ? gear[newGearContainer].map(item => ({key: item.name, val: item})) : []} 
        onSelect={(item: KeyVal<Gear | string>, added: boolean) => {
          if (added) {
            setNewGear({name: item.val as string});
            setCurrentGear(undefined);
          } else {
            setCurrentGear(item.val as Gear);
            setNewGear(undefined);
          }
        }}
        placeholderText={'ITEM'}
        style={{...globalStyles.dropdown, alignSelf: 'center'}}
        searchEnabled
        addEnabled
        expandLogic
        name={'ITEM'}
        onExpand={name => setCurrentExpanded(name)}
        currentExpanded={currentExpanded}
      />

      {currentGear &&
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row'}}>
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
            <Radio
              data={STD_OPTIONS.locations}
              onSelect={(item: KeyVal<string>) => setAddToCurrent({...addToCurrent, location: item.val})}
              defaultOption={{key: 'CO', val: 'CO'}}
              style={{alignSelf: 'center', marginLeft: 10}}
            />
          </View>
          
          <View style={globalStyles.modalField}>
            <TextInput
              style={{...globalStyles.textInput, minWidth: 300, minHeight: 30}}
              onChangeText={text => setAddToCurrent({...addToCurrent, notes: text})}
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
        </View> 
      }

      {newGear &&
        <View style={{alignItems: 'center'}}>
          <View style={globalStyles.modalField}>
            <TextInput
                style={{...globalStyles.textInput, minWidth: 300, minHeight: 30, marginRight: 'auto'}}
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
              style={{...globalStyles.textInput, minWidth: 300, minHeight: 30, marginRight: 'auto'}}
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
            <View>
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
              <Text style={globalStyles.textInput}>COST ($)</Text>
            </View>
            
            <View>
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
              <Text style={globalStyles.textInput}>RENT ($)</Text>
            </View>

            <View>
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
              <Text style={globalStyles.textInput}>DRAW (W)</Text>
            </View>

            <View>
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
              <Text style={globalStyles.textInput}>QTY</Text>
            </View>
          </View>

          <Radio
            data={STD_OPTIONS.locations}
            onSelect={(item: KeyVal<string>) => setNewGear({...newGear, locations: [{qty: 0, location: item.val}]})}
            defaultOption={{key: 'CO', val: 'CO'}}
            style={{marginTop: 15}}
          />
        </View>
      }
    </GenericModal>
  )
}

export default AddGearModal;