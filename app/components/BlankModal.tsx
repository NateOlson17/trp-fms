import { PropsWithChildren } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { COLORS } from "@/app/globals";


const BlankModal = (props: PropsWithChildren<{onClose: () => void, showReset: boolean, onReset: () => void}>) => (
  <Modal animationType="fade" transparent={true} onRequestClose={props.onClose}>
    <View style={styles.modal}>
        {props.children}
        <View style={{flexDirection: 'row', marginTop: 'auto', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={props.onClose} style={{marginRight: 4, marginTop: 'auto', marginBottom: 4}}>
            <Ionicons name={'arrow-undo-outline'} color={COLORS.LIGHT_GRAY} size={50}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onReset}>
            <Ionicons name={'refresh-outline'} color={COLORS.RED} size={50}/>
          </TouchableOpacity>
        </View>
    </View>
  </Modal> 
)

const styles = StyleSheet.create({
  modal: {
    backgroundColor: COLORS.GRAY,
    borderColor: COLORS.GOLD,
    borderWidth: 3,
    borderRadius: 20,
    margin: 20,
    marginTop: 60,
    marginBottom: 170,
    flex: 1,
    padding: 10
  }
});

export default BlankModal;