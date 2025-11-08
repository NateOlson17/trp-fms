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

export const STD_OPTIONS = {
  locations: ['CO', 'CA'].map(item => ({key: item, val: item})),
  containers: [
    {key: 'INFRASTRUCTURE', val: 'infrastructure'},
    {key: 'LASER FIXTURES', val: 'laserFixtures'},
    {key: 'LX FIXTURES', val: 'lxFixtures'},
    {key: 'SFX', val: 'sfx'},
    {key: 'SHOW CONTROL', val: 'showControl'}
  ]
}

export type KeyVal<T = any> = {key: string, val: T}

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear().toString().slice(2)
}

export const checkObjEqual = (obj1: object, obj2: object) => (JSON.stringify(obj1) === JSON.stringify(obj2))

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
    justifyContent: 'center'
  },
  
  modalFieldSize: {
    height: 40,
    width: 60
  },

  textInput: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
    alignSelf: 'center'
  },

  border: {
    borderColor: COLORS.GOLD,
    borderWidth: 2,
    borderRadius: 10
  },

  dropdown: {
    margin: 10,
    width: 180
  },

  modalExitButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginTop: 'auto',
    flex: 1
  }
});

export default globalStyles;