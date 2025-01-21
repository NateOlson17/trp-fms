import { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ViewStyle } from "react-native";

import { COLORS } from "../globals";

import Ionicons from "@expo/vector-icons/Ionicons";


type DropdownProps = {
  data: {key: string, value: any}[], 
  onSelect: (item: {key: string, value: any}) => void;
  placeholderText?: string;
  isDisabled?: boolean;
  style?: ViewStyle;
  expandLogic: false;
}

type DropdownPropsWithExpand = {
  data: {key: string, value: any}[];
  onSelect: (item: {key: string, value: any}) => void;
  placeholderText?: string;
  isDisabled?: boolean;
  style?: ViewStyle;
  expandLogic: true;
  name: string;
  onExpand: (name: string) => void;
  currentExpanded: string;
}

const Dropdown = (props: DropdownProps | DropdownPropsWithExpand) => {
  const [currentSelection, setCurrentSelection] = useState({key: props.placeholderText || '', value: null});
  const [expanded, setExpanded] = useState(false);

  // useEffect(()=>{
  //   console.log('current data for ' + props.placeholderText + ': \n');
  //   console.log(props.data);
  //   setCurrentSelection({key: props.placeholderText || '', value: null});
  // },  [props.data]);

  if (props.expandLogic && expanded && props.currentExpanded && props.currentExpanded != props.name) setExpanded(false);

  return (
    <View style={{...props.style, maxHeight: 200}}>
      <TouchableOpacity onPress={() => {props.isDisabled ? null : setExpanded(!expanded); if (props.expandLogic) props.onExpand(props.name)}}>
        <View style={{...styles.textBox, borderColor: props.isDisabled ? COLORS.LIGHT_GRAY : COLORS.GOLD}}>
          <Text style={{...styles.selectedText, color: props.isDisabled ? COLORS.LIGHT_GRAY : COLORS.WHITE}}>{currentSelection.key}</Text>
          <Ionicons name={expanded ? 'caret-up-outline' : 'caret-down-outline'} color={props.isDisabled ? COLORS.LIGHT_GRAY : COLORS.GOLD} size={30} style={{marginLeft: 'auto'}}/>
        </View>
      </TouchableOpacity>  

      {expanded && 
        <View style={styles.listContainer}>
          <FlatList
            data={props.data}
            renderItem={item => (
              <TouchableOpacity onPress={() => {setCurrentSelection(item.item); setExpanded(false); props.onSelect(item.item)}}>
                <View style={styles.listItem}>
                  <Text style={{color: COLORS.WHITE}}>{item.item.key}</Text>
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => (<View style={styles.listSeparator}/>)}
            keyExtractor={(listItem) => (listItem.key)}
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
      padding: 4,
      width: 160
    },

    selectedText: {
      fontWeight: 'bold',
      alignSelf: 'center',
      width: 120
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
      width: 160,
      borderColor: COLORS.WEAK_BROWN,
      borderWidth: 2,
      position: 'absolute',
      zIndex: 1,
      marginTop: 40
    },

    listItem: {
      backgroundColor: COLORS.BLACK,
      flex: 1,
      padding: 5
    }
});

export default Dropdown;