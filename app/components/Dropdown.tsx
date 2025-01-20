import { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ViewStyle } from "react-native";

import { COLORS } from "../globals";

import Ionicons from "@expo/vector-icons/Ionicons";


const Dropdown = ({data, onSelect, placeholderText, isDisabled, style}: {
  data: {key: string, value: any}[], 
  onSelect: (item: {key: string, value: any}) => void,
  placeholderText?: string,
  isDisabled?: boolean,
  style?: ViewStyle;
}) => {
  const [currentSelection, setCurrentSelection] = useState({key: placeholderText ? placeholderText : '', value: null});
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={{...style, maxHeight: 200}}>
      <TouchableOpacity onPress={() => {isDisabled ? null : setExpanded(!expanded)}}>
        <View style={{...styles.textBox, borderColor: isDisabled ? COLORS.LIGHT_GRAY : COLORS.GOLD}}>
          <Text style={{...styles.selectedText, color: isDisabled ? COLORS.LIGHT_GRAY : COLORS.WHITE}}>{currentSelection.key}</Text>
          <Ionicons name={expanded ? 'caret-up-outline' : 'caret-down-outline'} color={isDisabled ? COLORS.LIGHT_GRAY : COLORS.GOLD} size={30} style={{marginLeft: 'auto'}}/>
        </View>
      </TouchableOpacity>  

      {expanded && 
        <View style={styles.listContainer}>
          <FlatList
            data={data}
            renderItem={item => (
              <TouchableOpacity onPress={() => {setCurrentSelection(item.item); setExpanded(false); onSelect(item.item)}}>
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