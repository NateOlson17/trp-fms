import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Slider from '@react-native-assets/slider';

import Radio from '@/app/components/Radio';
import BlankModal from '@/app/components/BlankModal';

import { checkObjEqual, COLORS, STD_OPTIONS } from '@/app/globals';

export type TechFilters = {
	lx: number;
	ax: number;
	lsr: number;
	vdo: number;
	location: string
}

export const getDefaultTechFilters = () => ({lx: 0, ax: 0, lsr: 0, vdo: 0, location: 'ALL'})

const FilterTechsModal = ({onClose, currFilters}: {onClose: (filters: TechFilters) => void, currFilters: TechFilters}) => {
	const [newFilters, setNewFilters] = useState(currFilters);

  return(
    <BlankModal onClose={() => onClose(newFilters)} showReset={!checkObjEqual(newFilters, getDefaultTechFilters())} onReset={() => setNewFilters(getDefaultTechFilters())}>
      <View style={styles.sliderContainer}>
				<View style={styles.sliderWrapper}>
					<Slider
						step={1}
            value={newFilters.lx}
						maximumValue={3}
						minimumTrackTintColor={COLORS.WEAK_BROWN}
						maximumTrackTintColor={COLORS.LIGHT_GRAY}
						thumbTintColor={COLORS.WEAK_BROWN}
						thumbSize={24}
						thumbStyle={{borderColor: COLORS.GOLD, borderWidth: 5}}
						vertical
						inverted
						style={{height: 160, marginTop: 8}}
						onValueChange={value => setNewFilters({...newFilters, lx: value})}
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
            value={newFilters.ax}
						maximumValue={3}
						minimumTrackTintColor={COLORS.WEAK_BROWN}
						maximumTrackTintColor={COLORS.LIGHT_GRAY}
						thumbTintColor={COLORS.WEAK_BROWN}
						thumbSize={24}
						thumbStyle={{borderColor: COLORS.GOLD, borderWidth: 5}}
						vertical
						inverted
						style={{height: 160, marginTop: 8}}
						onValueChange={value => setNewFilters({...newFilters, ax: value})}
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
            value={newFilters.vdo}
						maximumValue={3}
						minimumTrackTintColor={COLORS.WEAK_BROWN}
						maximumTrackTintColor={COLORS.LIGHT_GRAY}
						thumbTintColor={COLORS.WEAK_BROWN}
						thumbSize={24}
						thumbStyle={{borderColor: COLORS.GOLD, borderWidth: 5}}
						vertical
						inverted
						style={{height: 160, marginTop: 8}}
						onValueChange={value => setNewFilters({...newFilters, vdo: value})}
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
            value={newFilters.lsr}
						maximumValue={3}
						minimumTrackTintColor={COLORS.WEAK_BROWN}
						maximumTrackTintColor={COLORS.LIGHT_GRAY}
						thumbTintColor={COLORS.WEAK_BROWN}
						thumbSize={24}
						thumbStyle={{borderColor: COLORS.GOLD, borderWidth: 5}}
						vertical
						inverted
						style={{height: 160, marginTop: 8}}
						onValueChange={value => setNewFilters({...newFilters, lsr: value})}
					/>
					<View>
						<Text style={styles.label}>LSR1</Text>
						<Text style={styles.label}>LSR2</Text>
						<Text style={styles.label}>LSR3</Text>
					</View>
				</View>
			</View>
			
			<Radio
				data={[...STD_OPTIONS.locations, {key: 'ALL', val: 'ALL'}]}
				defaultOption={{key: currFilters.location, val: currFilters.location}}
				onSelect={option => setNewFilters({...newFilters, location: option.val})}
				style={{marginTop: 20, alignSelf: 'center'}}
			/>
		</BlankModal>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginBottom: 36,
		marginLeft: 5
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

export default FilterTechsModal;