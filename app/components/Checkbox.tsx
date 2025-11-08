import { useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";

import { COLORS, KeyVal, STD_OPTIONS } from "@/app/globals";


const Checkbox = ({data, onChange, defaultOptions, style}: {data: KeyVal[], onChange: (options: KeyVal[]) => void, defaultOptions: KeyVal[], style?: ViewStyle}) => {
  const [currentSelections, setCurrentSelections] = useState(defaultOptions);

  useEffect(() => {onChange(currentSelections);}, [currentSelections])

  return (
    <View style={{...style, ...styles.wrapper}}>
      <FlatList
        data={data}
        renderItem={({item, index}) =>
          <TouchableOpacity onPress={() => {
              if (currentSelections.some(sel => sel.key == item.key)) {
                setCurrentSelections(currentSelections.filter(sel => sel.key !== item.key));
              } else {
                setCurrentSelections([...currentSelections, item]);
              }
          }}>
            <View style={{...styles.itemContainer, 
              borderTopLeftRadius: !index ? 5 : 0, 
              borderBottomLeftRadius: !index ? 5 : 0,
              borderTopRightRadius: index === data.length - 1 ? 5 : 0,
              borderBottomRightRadius: index === data.length - 1 ? 5 : 0,
              borderColor: currentSelections.some(sel => sel.key == item.key) ? COLORS.GOLD : COLORS.WEAK_BROWN
            }}>
              <Text style={{fontWeight: 'bold', color: currentSelections.some(sel => sel.key == item.key) ? COLORS.WHITE : COLORS.LIGHT_GRAY}}>{item.key}</Text>
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

export default Checkbox;