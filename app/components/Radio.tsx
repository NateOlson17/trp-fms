import { useState } from "react"
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";

import { checkObjEqual, COLORS, KeyVal } from "@/app/globals";


const Radio = ({data, onSelect, defaultOption, style}: {data: KeyVal[], onSelect: (option: KeyVal) => void, defaultOption: KeyVal, style?: ViewStyle}) => {
  const [currentSelection, setCurrentSelection] = useState(defaultOption);
  
  //useEffect(() => onSelect(defaultOption))

  return (
    <View style={{...style, ...styles.wrapper}}>
      <FlatList
        data={data}
        renderItem={({item, index}) =>
          <TouchableOpacity onPress={() => {onSelect(item); setCurrentSelection(item);}}>
            <View style={{...styles.itemContainer, 
              borderTopLeftRadius: !index ? 5 : 0, 
              borderBottomLeftRadius: !index ? 5 : 0,
              borderTopRightRadius: index === data.length - 1 ? 5 : 0,
              borderBottomRightRadius: index === data.length - 1 ? 5 : 0,
              borderColor: checkObjEqual(item, currentSelection) ? COLORS.GOLD : COLORS.WEAK_BROWN
            }}>
              <Text style={{fontWeight: 'bold', color: checkObjEqual(item, currentSelection) ? COLORS.WHITE : COLORS.LIGHT_GRAY}}>{item.key}</Text>
            </View>
          </TouchableOpacity>
        }
        keyExtractor={option => option.key}
        horizontal
        scrollEnabled={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.BLACK,
    borderRadius: 5,
    height: 30
  },

  itemContainer: {
    padding: 5,
    borderWidth: 2,
    flex: 1
  },

  separator: {
    backgroundColor: COLORS.GOLD,
    height: 40,
    width: 5
  }
});

export default Radio;