import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, ScrollView, useAnimatedValue, Animated, GestureResponderEvent, PanResponderGestureState, PanResponder } from 'react-native';
import * as Linking from 'expo-linking';

import Ionicons from '@expo/vector-icons/Ionicons';

import type Technician from '@/app/utils/Technician';
import { GearContainer } from '@/app/utils/Gear';
import Event, { STATUS } from '@/app/utils/Event';

import globalStyles, { COLORS, dateToLocalTrunc } from '@/app/globals';



const EventDetail = (props: {onClose: () => void, currDate: number, techs: Technician[], gear: GearContainer, events: Event[]}) => {
	const [selectedEvent, setSelectedEvent] = useState(props.events[0]);
	const [expanded, setExpanded] = useState(false);

	const currHeight = useRef(175)
	const animHeight = React.useRef(new Animated.Value(175)).current;

	const panResponder = useRef(PanResponder.create({
		onStartShouldSetPanResponder: (evt) => (evt.nativeEvent.locationY <= 25),
		onPanResponderMove: (_, gestureState) => Animated.spring(animHeight, {toValue: currHeight.current - gestureState.dy, tension: 20, useNativeDriver: false}).start(),
		onPanResponderRelease: (_, gestureState) => {
			currHeight.current -= gestureState.dy;
			if (currHeight.current > 300) {
				Animated.spring(animHeight, {toValue: 525, tension: 20, useNativeDriver: false}).start();
				setExpanded(true);
			} else if (currHeight.current < 100 && !expanded) {
				Animated.spring(animHeight, {toValue: 20, tension: 20, useNativeDriver: false}).start();
				props.onClose();
			} else {
				Animated.spring(animHeight, {toValue: 175, tension: 20, useNativeDriver: false}).start();
				setExpanded(false)
			}
		}
		
	})).current;

	return (
			<Animated.View style={{...styles.container, height: animHeight}} {...panResponder.panHandlers}>
				<View style={styles.handle}/>				
				<View style={styles.tabContainer}>
					<View style={{...styles.tab, borderBottomWidth: 1, backgroundColor: COLORS.GOLD, marginTop: 5, height: 30}}>
						<Text style={globalStyles.textInput}>{new Date(props.currDate).toLocaleDateString('en-US', {timeZone: 'UTC', month: 'short', day: 'numeric'})}</Text>
					</View>
					<FlatList
						data={props.events}
						renderItem={({item}) => 
							<TouchableOpacity onPress={() => setSelectedEvent(item)}>
								<View style={{...styles.tab, borderBottomWidth: item == selectedEvent ? 0 : 1}}>
									<Text style={globalStyles.textInput}>{item.name}</Text>
								</View>
							</TouchableOpacity>
						}
						horizontal
						style={{alignSelf: 'center'}}
					/>
				</View>

				<ScrollView pagingEnabled={!expanded}>
					<View style={styles.overviewRow}>
						<View>
							<View style={styles.textBubble}><Text style={globalStyles.textInput}>STATUS</Text></View>
							<View style={{...styles.textBubble, backgroundColor: selectedEvent.status.color, marginBottom: 0}}><Text style={globalStyles.textInput}>{selectedEvent.status.name}</Text></View>
						</View>

						<View>
							<View style={styles.textBubble}><Text style={globalStyles.textInput}>MANAGER</Text></View>
							<Text style={globalStyles.textInput}>{selectedEvent.manager?.name}</Text>
						</View>

						<View>
							<View style={styles.textBubble}><Text style={globalStyles.textInput}>CLIENT</Text></View>
							<Text style={globalStyles.textInput}>{selectedEvent.client}</Text>
						</View> 
					</View>

					<View style={styles.overviewRow}>
						<View>
							<View style={styles.textBubble}><Text style={globalStyles.textInput}>LOCATION</Text></View>
							<Text style={globalStyles.textInput}>{selectedEvent.location}</Text>
						</View>

						{selectedEvent.startDate != selectedEvent.endDate && <View>
							<View style={styles.textBubble}><Text style={globalStyles.textInput}>MULTI-DAY</Text></View>
							<Text style={globalStyles.textInput}>{
								(new Date(dateToLocalTrunc(selectedEvent.startDate)).toLocaleDateString('en-US', {timeZone: 'UTC', month: '2-digit', day: '2-digit'})) + '-' +
								(new Date(dateToLocalTrunc(selectedEvent.endDate)).toLocaleDateString('en-US', {timeZone: 'UTC', month: '2-digit', day: '2-digit'}))
							}
							</Text>
						</View>}
					</View>

					<View style={{...styles.overviewRow, marginTop: 10}}>
						<View>
							<View style={styles.textBubble}><Text style={globalStyles.textInput}>CONTACT</Text></View>
							<View style={{flexDirection: 'row'}}>
								<Text style={globalStyles.textInput}>{selectedEvent.contact}</Text>
								{selectedEvent.contactInfo?.includes('@') ?
									<TouchableOpacity  onPress={() => Linking.openURL(`mailto:${selectedEvent.contactInfo}`)} style={{marginLeft: 5}}>
										<Ionicons name={'mail'} color={COLORS.GOLD} size={20}/>
									</TouchableOpacity>
								:
									<View style={{flexDirection: 'row'}}>
										<TouchableOpacity  onPress={() => Linking.openURL(`tel:${selectedEvent.contactInfo}`)} style={{marginLeft: 5}}>
											<Ionicons name={'call'} color={COLORS.GOLD} size={20} />
										</TouchableOpacity>
										<TouchableOpacity  onPress={() => Linking.openURL(`sms:${selectedEvent.contactInfo}`)} style={{marginLeft: 10}}>
											<Ionicons name={'chatbubble'} color={COLORS.GOLD} size={20} />
										</TouchableOpacity>
									</View>
								}
							</View>
						</View>
					</View>

					<View style={styles.overviewRow}>
						<View>
							<View style={styles.textBubble}><Text style={globalStyles.textInput}>QUOTED</Text></View>
							<Text style={globalStyles.textInput}>{selectedEvent.dateQuoted ? new Date(dateToLocalTrunc(selectedEvent.dateQuoted)).toLocaleDateString('en-US', {timeZone: 'UTC', month: '2-digit', day: '2-digit'}) : 'NO'}</Text>
						</View>

						<View>
							<View style={styles.textBubble}><Text style={globalStyles.textInput}>CONFIRMED</Text></View>
							<Text style={globalStyles.textInput}>{selectedEvent.dateConfirmed ? new Date(dateToLocalTrunc(selectedEvent.dateConfirmed)).toLocaleDateString('en-US', {timeZone: 'UTC', month: '2-digit', day: '2-digit'}) : 'NO'}</Text>
						</View>

						<View>
							<View style={styles.textBubble}><Text style={globalStyles.textInput}>INVOICED</Text></View>
							<Text style={globalStyles.textInput}>{selectedEvent.dateInvoiced ? new Date(dateToLocalTrunc(selectedEvent.dateInvoiced)).toLocaleDateString('en-US', {timeZone: 'UTC', month: '2-digit', day: '2-digit'}) : 'NO'}</Text>
						</View> 

						<View>
							<View style={styles.textBubble}><Text style={globalStyles.textInput}>PAID</Text></View>
							<Text style={globalStyles.textInput}>{selectedEvent.datePaid ? new Date(dateToLocalTrunc(selectedEvent.datePaid)).toLocaleDateString('en-US', {timeZone: 'UTC', month: '2-digit', day: '2-digit'}) : 'NO'}</Text>
						</View> 
					</View>
				

					<FlatList
						data={Object.values(STATUS)}
						renderItem={({item}) => (
							<View style={{alignContent: 'center', margin: 10, marginTop: 20, marginBottom: 25, marginLeft: item.step == 0 ? 0 : 10, width: item.step == 6 ? 80 : 110}}>
								<View style={{flexDirection: 'row', opacity: item.step <= selectedEvent.status.step ? 1 : .5}}>
									<View style={{...styles.progressBubble, backgroundColor: item.color}}/>
									{item.step != 6 && <Ionicons name={'chevron-forward-outline'} color={COLORS.WHITE} size={40}/>}
								</View>
								<Text style={globalStyles.textInput}>{item.name}</Text>
							</View>
						)}
						horizontal
						initialScrollIndex={selectedEvent.status.step ? selectedEvent.status.step - 1 : 0}
						getItemLayout={(data, index) => ({length: 110, offset: index * 110, index})}
					/>
				</ScrollView>

			</Animated.View>
	)
}

const styles = StyleSheet.create({
  container: {
		...globalStyles.border,
		backgroundColor: COLORS.GRAY,
		position: 'absolute',
		bottom: 110,
		right: 0,
		left: 0,
		margin: 8,
		padding: 5
	},

	tabContainer: {
		height: 40,
		flexDirection: 'row'
	},

	tab: {
		...globalStyles.border,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		padding: 5
	},

	handle: {
		height: 5,
		width: 180,
		backgroundColor: COLORS.LIGHT_GRAY,
		borderRadius: 5,
		alignSelf: 'center',
		marginBottom: 3
	},

	progressBubble: {
		height: 40,
		width: 40,
		borderColor: COLORS.WHITE,
		borderRadius: 20,
		borderWidth: 5,
		margin: 'auto',
		marginBottom: 8
	},

	overviewRow: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 5
	},

	textBubble: {
		backgroundColor: COLORS.GOLD,
		height: 20,
		borderRadius: 10,
		padding: 2,
		paddingLeft: 4,
		paddingRight: 4,
		margin: 'auto',
		marginBottom: 5
  }
});

export default EventDetail;