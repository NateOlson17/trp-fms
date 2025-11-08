import { PropsWithChildren } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { COLORS } from "@/app/globals";


const GenericModal = (props: PropsWithChildren<{onClose: () => void}>) => (
  <Modal animationType="fade" transparent={true} onRequestClose={props.onClose}>
    <View style={styles.modal}>
        {props.children}

        <TouchableOpacity  onPress={props.onClose} style={{marginRight: 4, marginTop: 'auto', marginBottom: 4}}>
        <Ionicons name={'arrow-undo-outline'} color={COLORS.LIGHT_GRAY} size={50}/>
      </TouchableOpacity>
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

export default GenericModal;