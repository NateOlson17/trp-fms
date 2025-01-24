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
  const [currentSelection, setCurrentSelection] = useState({key: props.placeholderText || '', value: null});
  const [expanded, setExpanded] = useState(false);
  const [typedText, setTypedText] = useState('');

  useEffect(()=>{
    console.log((props.placeholderText || '') + ' CHANGE:\n' + props.data)
    //setTypedText('');
    //setCurrentSelection({key: props.placeholderText || '', value: null});
  }, [props.data]);

  if (props.expandLogic && expanded && props.currentExpanded != props.name) setExpanded(false);

  const filterDropdown = () => {
    let filteredList = props.data.filter(item => item.key.toLowerCase().includes(typedText.toLowerCase()));
    return props.addEnabled ? filteredList.concat([{key: `Add "${typedText}"`, value: typedText}]) : filteredList;
  }

  return (
    <View style={props.style}>
      <TouchableOpacity onPress={() => {if (!props.isDisabled) {setExpanded(!expanded); if (props.expandLogic) props.onExpand(props.name)}}}>
        <View style={{...styles.textBox, borderColor: props.isDisabled ? COLORS.LIGHT_GRAY : COLORS.GOLD}}>
          {props.searchEnabled ? 
            <TextInput
              value={typedText}
              editable={!props.isDisabled}
              style={styles.selectedText}
              onChangeText={(text: string) => setTypedText(text)}
              onFocus={() => setExpanded(true)}
              placeholder={props.placeholderText}
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

          <Ionicons name={expanded ? 'caret-up-outline' : 'caret-down-outline'} color={props.isDisabled ? COLORS.LIGHT_GRAY : COLORS.GOLD} size={30} style={{marginLeft: 'auto'}}/>
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
            data={typedText ? filterDropdown() : props.data}
            renderItem={item => (
              <TouchableOpacity onPress={() => {
                setCurrentSelection(item.item);
                setExpanded(false);
                props.onSelect(item.item, item.item.value === typedText);
                if (props.searchEnabled) setTypedText(item.item.key);
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