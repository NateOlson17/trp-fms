import { useState } from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native';

import Slider from '@react-native-assets/slider';

import Technician from '@/app/utils/Technician'

import GenericModal from '@/app/components/GenericModal'

import globalStyles, { COLORS, STD_OPTIONS } from '@/app/globals';
import Radio from '../Radio';

const AddTechModal = ({onClose}: {onClose: () => void}) => {
  const [newTech, setNewTech] = useState(new Technician({name: '', roles: {lx: 0, ax: 0, lsr: 0, vdo: 0}, location: 'CO', contact: '', notes: '', key: ''}));

  return (
    <GenericModal title='ADD TECHNICIAN' onClose={onClose} onSubmit={() => {(new Technician(newTech)).pushToDB();}} submitValidated={!!(newTech.name && newTech.contact)}>
      <View style={{...globalStyles.modalField, ...globalStyles.modalFieldSize, width: 160, alignSelf: 'center'}}>
        <TextInput
          style={{...globalStyles.textInput, ...globalStyles.modalFieldSize, marginRight: 'auto', width: 140}}
          onChangeText={text => setNewTech({...newTech, name: text})}
          placeholder={'NAME'}
          placeholderTextColor={COLORS.LIGHT_GRAY}
          returnKeyType={'done'}
          returnKeyLabel={'done'}
          contextMenuHidden
          blurOnSubmit
          keyboardAppearance={'dark'}
          maxLength={50}
          selectionColor={COLORS.GOLD}
        />
      </View>

      <View style={{...globalStyles.modalField, ...globalStyles.modalFieldSize, width: 160, alignSelf: 'center'}}>
        <TextInput
          style={{...globalStyles.textInput, ...globalStyles.modalFieldSize, marginRight: 'auto', width: 140}}
          onChangeText={text => setNewTech({...newTech, contact: text})}
          placeholder={'CONTACT'}
          placeholderTextColor={COLORS.LIGHT_GRAY}
          returnKeyType={'done'}
          returnKeyLabel={'done'}
          contextMenuHidden
          blurOnSubmit
          keyboardAppearance={'dark'}
          maxLength={50}
          selectionColor={COLORS.GOLD}
        />
      </View>

			<Radio
				data={STD_OPTIONS.locations}
				defaultOption={{key: 'CO', val: 'CO'}}
				onSelect={option => setNewTech({...newTech, location: option.val})}
				style={{margin: 'auto'}}
			/>	

			<View style={styles.sliderContainer}>
				<View style={styles.sliderWrapper}>
					<Slider
						step={1}
						maximumValue={3}
						minimumTrackTintColor={COLORS.WEAK_BROWN}
						maximumTrackTintColor={COLORS.LIGHT_GRAY}
						thumbTintColor={COLORS.WEAK_BROWN}
						thumbSize={24}
						thumbStyle={{borderColor: COLORS.GOLD, borderWidth: 5}}
						vertical
						inverted
						style={{height: 160, marginTop: 8}}
						onValueChange={(value) => setNewTech({...newTech, roles: {...newTech.roles, lx: value}})}
					/>
					<View>
						<Text style={styles.label}>L1</Text>
						<Text style={styles.label}>L2</Text>
						<Text style={styles.label}>L3</Text>
					</View>
				</View>
				
				<View style={styles.sliderWrapper}>
					<Slider
						step={1}
						maximumValue={3}
						minimumTrackTintColor={COLORS.WEAK_BROWN}
						maximumTrackTintColor={COLORS.LIGHT_GRAY}
						thumbTintColor={COLORS.WEAK_BROWN}
						thumbSize={24}
						thumbStyle={{borderColor: COLORS.GOLD, borderWidth: 5}}
						vertical
						inverted
						style={{height: 160, marginTop: 8}}
						onValueChange={(value) => setNewTech({...newTech, roles: {...newTech.roles, ax: value}})}
					/>
					<View>
						<Text style={styles.label}>A1</Text>
						<Text style={styles.label}>A2</Text>
						<Text style={styles.label}>A3</Text>
					</View>
				</View>

				<View style={styles.sliderWrapper}>
					<Slider
						step={1}
						maximumValue={3}
						minimumTrackTintColor={COLORS.WEAK_BROWN}
						maximumTrackTintColor={COLORS.LIGHT_GRAY}
						thumbTintColor={COLORS.WEAK_BROWN}
						thumbSize={24}
						thumbStyle={{borderColor: COLORS.GOLD, borderWidth: 5}}
						vertical
						inverted
						style={{height: 160, marginTop: 8}}
						onValueChange={(value) => setNewTech({...newTech, roles: {...newTech.roles, vdo: value}})}
					/>
					<View>
						<Text style={styles.label}>V1</Text>
						<Text style={styles.label}>V2</Text>
						<Text style={styles.label}>V3</Text>
					</View>
				</View>

				<View style={styles.sliderWrapper}>
					<Slider
						step={1}
						maximumValue={3}
						minimumTrackTintColor={COLORS.WEAK_BROWN}
						maximumTrackTintColor={COLORS.LIGHT_GRAY}
						thumbTintColor={COLORS.WEAK_BROWN}
						thumbSize={24}
						thumbStyle={{borderColor: COLORS.GOLD, borderWidth: 5}}
						vertical
						inverted
						style={{height: 160, marginTop: 8}}
						onValueChange={(value) => setNewTech({...newTech, roles: {...newTech.roles, lsr: value}})}
					/>
					<View>
						<Text style={styles.label}>LSR1</Text>
						<Text style={styles.label}>LSR2</Text>
						<Text style={styles.label}>LSR3</Text>
					</View>
				</View>
			</View>

      <View style={globalStyles.modalField}>
				<TextInput
					style={{...globalStyles.textInput, minWidth: 200, minHeight: 30, marginRight: 'auto'}}
					onChangeText={text => setNewTech({...newTech, notes: text})}
					placeholder={'NOTES'}
					placeholderTextColor={COLORS.LIGHT_GRAY}
					returnKeyType={'done'}
					returnKeyLabel={'done'}
					contextMenuHidden
					multiline
					blurOnSubmit
					keyboardAppearance={'dark'}
					maxLength={500}
					selectionColor={COLORS.GOLD}
				/>
			</View>
    </GenericModal>
  )
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginBottom: 36,
		marginLeft: 5
  },

	bubble: {
		backgroundColor: COLORS.GOLD,
		height: 20,
		borderRadius: 10,
		margin: 4,
		width: 50
  },

  bubbleText: {
    margin: 'auto', 
    paddingLeft: 6, 
    paddingRight: 6, 
    color: COLORS.WHITE
  },

	sliderContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		marginBottom: 20
	},

	sliderWrapper: {
		flexDirection: 'row'
	}
});

export default AddTechModal;