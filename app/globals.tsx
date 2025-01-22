import { StyleSheet } from "react-native";

export enum COLORS {
    BLACK = '#141414',
    GRAY = '#252624',
    WHITE = '#ffffff',
    GOLD = '#b17304',
    WEAK_BROWN = '#6e4702',
    RED = '#721918',
    GREEN = '#447053',
    LIGHT_GRAY = '#808381'
}

export const getCurrentDate = () => {
    const date = new Date();
    return (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear().toString().slice(2)
}

const globalStyles = StyleSheet.create({
    screenWrapper: {
      paddingTop: 50, 
      backgroundColor: COLORS.BLACK, 
      flex: 1
    },

    modalField: {
      backgroundColor: COLORS.BLACK,
      borderColor: COLORS.GOLD,
      borderWidth: 2,
      borderRadius: 5,
      margin: 10,
      padding: 8,
      paddingBottom: 14
    },

    textInput: {
      color: COLORS.WHITE,
      fontWeight: 'bold'
    }
});

export default globalStyles;