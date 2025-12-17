import { PropsWithChildren } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import globalStyles, { COLORS } from '@/app/globals';


const GenericModal = (props: PropsWithChildren<{onClose: () => void, onSubmit: () => void, submitValidated: boolean, title: string}>) => (
  <Modal animationType='fade' transparent={true} onRequestClose={props.onClose}>
    <View style={styles.modal}>
      <Text style={{...globalStyles.textInput, fontSize: 18, marginBottom: 10, marginTop: 5}}>{props.title}</Text>
        {props.children}
          
        <View style={globalStyles.modalExitButtons}>
          <TouchableOpacity onPress={props.onClose}>
            <Ionicons name={'close-circle'} color={COLORS.RED} size={70}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {if (props.submitValidated) {props.onSubmit(); props.onClose();}}}>
            <Ionicons name={'checkmark-circle'} color={props.submitValidated ? COLORS.GREEN : COLORS.LIGHT_GRAY} size={70}/>
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
    padding: 10,
  }
});

export default GenericModal;