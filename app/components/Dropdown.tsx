import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ViewStyle, TextInput } from 'react-native';

import { COLORS } from '@/app/globals';

import Ionicons from '@expo/vector-icons/Ionicons';


type DropdownProps = {
  data: {key: string, value: any}[], 
  onSelect: (item: {key: string, value: any}, added: boolean) => void;
  placeholderText?: string;
  isDisabled?: boolean;
  style?: ViewStyle;
  searchEnabled: boolean;
  addEnabled?: boolean;
  expandLogic: false;
}

type DropdownPropsWithExpand = {
  data: {key: string, value: any}[];
  onSelect: (item: {key: string, value: any}, added: boolean) => void;
  placeholderText?: string;
  isDisabled?: boolean;
  style?: ViewStyle;
  searchEnabled: boolean;
  addEnabled?: boolean;
  expandLogic: true;
  name: string;
  onExpand: (name: string) => void;
  currentExpanded: string;
}

const Dropdown = (props: DropdownProps | DropdownPropsWithExpand) => {
  const {data, onSelect, placeholderText, isDisabled, style, searchEnabled, addEnabled, expandLogic} = props
  const {name, onExpand, currentExpanded} = expandLogic ? props as DropdownPropsWithExpand : {};
  
  const [currentSelection, setCurrentSelection] = useState({key: placeholderText || '', value: null});
  const [expanded, setExpanded] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [focused, setFocused] = useState(false);

  useEffect(()=>{
    //setTypedText('');
    //setCurrentSelection({key: placeholderText || '', value: null});
  }, [data]);

  if (expandLogic && expanded && currentExpanded != name) setExpanded(false);

  const filterDropdown = () => {
    if (!typedText || typedText == `Add "${currentSelection.value}"`) return data;
    let filteredList = data.filter(item => item.key.toLowerCase().includes(typedText.toLowerCase()));
    if (filteredList.some(item => item.key === typedText)) return data;
    return addEnabled ? filteredList.concat([{key: `Add "${typedText}"`, value: typedText}]) : filteredList;
  }

  return (
    <View style={style}>
      <TouchableOpacity onPress={() => {if (!isDisabled) {setExpanded(!expanded); if (onExpand) onExpand(name as string)}}}>
        <View style={{...styles.textBox, borderColor: isDisabled ? COLORS.LIGHT_GRAY : COLORS.GOLD}}>
          {searchEnabled ? 
            <TextInput
              value={typedText}
              editable={!isDisabled}
              style={styles.selectedText}
              onChangeText={text => setTypedText(text)}
              onFocus={() => {setFocused(true); setExpanded(true); if (onExpand) onExpand(name as string);}}
              onEndEditing={() => setFocused(false)}
              placeholder={placeholderText}
              placeholderTextColor={COLORS.LIGHT_GRAY}
              returnKeyType={'done'}
              returnKeyLabel={'done'}
              keyboardAppearance={'dark'}
              maxLength={50}
              selectionColor={COLORS.GOLD}
            />
          :
            <TextInput
              value={currentSelection.key}
              editable={false}
              style={{...styles.selectedText, color: currentSelection.value ? COLORS.WHITE : COLORS.LIGHT_GRAY}}
            />
          }

          <Ionicons name={expanded ? 'caret-up-outline' : 'caret-down-outline'} color={isDisabled ? COLORS.LIGHT_GRAY : COLORS.GOLD} size={30} style={{marginLeft: 'auto'}}/>
        </View>
      </TouchableOpacity>  

      {expanded && 
        <View style={styles.listContainer}>
          {typedText && !filterDropdown().length &&
            <View style={styles.listItem}>
              <Text style={{color: COLORS.WHITE, alignSelf: 'center'}}>NO MATCHES</Text>
            </View>
          }
          <FlatList
            data={filterDropdown()}
            renderItem={item => (
              <TouchableOpacity onPress={() => {
                setCurrentSelection(item.item);
                setExpanded(false);
                onSelect(item.item, item.item.value === typedText);
                if (searchEnabled) setTypedText(item.item.key);
              }}>
                <View style={styles.listItem}>
                  <Text style={{color: COLORS.WHITE}}>{item.item.key}</Text>
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => (<View style={styles.listSeparator}/>)}
            keyExtractor={listItem => listItem.key}
          />
        </View>
      } 
    </View>  
  )
}

const styles = StyleSheet.create({
  textBox: {
    backgroundColor: COLORS.BLACK,
    borderRadius: 3,
    borderWidth: 2,
    height: 40,
    flexDirection: 'row',
    padding: 4
  },

  selectedText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
    flex: 1
  },

  listSeparator: {
    height: 2,
    backgroundColor: COLORS.WEAK_BROWN,
    marginLeft: 6,
    marginRight: 6
  },

  listContainer: {
    borderRadius: 5,
    backgroundColor: COLORS.BLACK,
    borderColor: COLORS.WEAK_BROWN,
    borderWidth: 2,
    position: 'absolute',
    zIndex: 1,
    marginTop: 40,
    maxHeight: 200
  },

  listItem: {
    flex: 1,
    padding: 5
  }
});

export default Dropdown;