import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, ScrollView, Animated, PanResponder, TextInput } from 'react-native';
import * as Linking from 'expo-linking';

import Ionicons from '@expo/vector-icons/Ionicons';

import type Technician from '@/app/utils/Technician';
import Gear, { GearContainer } from '@/app/utils/Gear';
import Event, { STATUS, GearList } from '@/app/utils/Event';

import Dropdown from '@/app/components/Dropdown';

import globalStyles, { checkObjEqual, COLORS, dateToLocalTrunc, KeyVal } from '@/app/globals';


const DetailItem = (props: {label: string, text: string}) => (
	<View>
		<View style={styles.textBubble}><Text style={globalStyles.textInput}>{props.label}</Text></View>
		<Text style={globalStyles.textInput}>{props.text}</Text>
	</View> 
)

const DetailOverview = (props: {event: Event}) => (
	<View>
		<View style={styles.overviewRow}>
			<View>
				<View style={styles.textBubble}><Text style={globalStyles.textInput}>STATUS</Text></View>
				<View style={{...styles.textBubble, backgroundColor: props.event.status.color, marginBottom: 0}}><Text style={globalStyles.textInput}>{props.event.status.name}</Text></View>
			</View>

			<DetailItem label={'MANAGER'} text={props.event.getManager().name as string}/>
		</View>

		<View style={styles.overviewRow}>
			<DetailItem label={'CLIENT'} text={props.event.client as string}/>

			<View>
				<View style={styles.textBubble}><Text style={globalStyles.textInput}>CONTACT</Text></View>
				<View style={{flexDirection: 'row'}}>
					<Text style={globalStyles.textInput}>{props.event.contact}</Text>
					{props.event.contactInfo?.includes('@') ?
						<TouchableOpacity  onPress={() => Linking.openURL(`mailto:${props.event.contactInfo}`)} style={{marginLeft: 5}}>
							<Ionicons name={'mail'} color={COLORS.GOLD} size={20}/>
						</TouchableOpacity>
					:
						<View style={{flexDirection: 'row'}}>
							<TouchableOpacity  onPress={() => Linking.openURL(`tel:${props.event.contactInfo}`)} style={{marginLeft: 5}}>
								<Ionicons name={'call'} color={COLORS.GOLD} size={20} />
							</TouchableOpacity>
							<TouchableOpacity  onPress={() => Linking.openURL(`sms:${props.event.contactInfo}`)} style={{marginLeft: 10}}>
								<Ionicons name={'chatbubble'} color={COLORS.GOLD} size={20} />
							</TouchableOpacity>
						</View>
					}
				</View>
			</View>
		</View>

		<View style={{...styles.overviewRow, marginTop: 10}}>
			<DetailItem label={'LOCATION'} text={props.event.location as string}/>
			<DetailItem label={'SHOP'} text={props.event.shop as string}/>

			{props.event.startDate != props.event.endDate && <DetailItem label={'MULTI-DAY'} text={
				(new Date(dateToLocalTrunc(props.event.startDate)).toLocaleDateString('en-US', {timeZone: 'UTC', month: '2-digit', day: '2-digit'})) + '-' +
				(new Date(dateToLocalTrunc(props.event.endDate)).toLocaleDateString('en-US', {timeZone: 'UTC', month: '2-digit', day: '2-digit'}))
			}/>}
		</View>

		<View style={styles.overviewRow}>
			<DetailItem label={'QUOTED'} text={props.event.dateQuoted ? new Date(dateToLocalTrunc(props.event.dateQuoted)).toLocaleDateString('en-US', {timeZone: 'UTC', month: '2-digit', day: '2-digit'}) : 'NO'}/>
			<DetailItem label={'CONFIRMED'} text={props.event.dateConfirmed ? new Date(dateToLocalTrunc(props.event.dateConfirmed)).toLocaleDateString('en-US', {timeZone: 'UTC', month: '2-digit', day: '2-digit'}) : 'NO'}/>
			<DetailItem label={'INVOICED'} text={props.event.dateInvoiced ? new Date(dateToLocalTrunc(props.event.dateInvoiced)).toLocaleDateString('en-US', {timeZone: 'UTC', month: '2-digit', day: '2-digit'}) : 'NO'}/>
			<DetailItem label={'CONFIRMED'} text={props.event.datePaid ? new Date(dateToLocalTrunc(props.event.datePaid)).toLocaleDateString('en-US', {timeZone: 'UTC', month: '2-digit', day: '2-digit'}) : 'NO'}/>
		</View>
	</View>
)


const GearListComp = (props: {name: string, gear: Gear[], gearList: GearList, eventLocation: string, setGearList: (newList: GearList) => void}) => {
	const [currentExpanded, setCurrentExpanded] = useState('');

	const checkQtyValid = (gearItem: Gear, qty: number) => (
		qty &&
		gearItem.locations.filter(loc => loc.location == props.eventLocation).length && 
		qty <= gearItem.locations.filter(loc => loc.location == props.eventLocation)[0].qty
	)

	return(
		<View>
			<Text style={globalStyles.textInput}>{props.name}</Text>
			<FlatList
				data={props.gearList}
				scrollEnabled={false}
				renderItem={({item, index}) => {
					const [currQty, setCurrQty] = useState(item.qty);
					const [currGear, setCurrGear] = useState(item.gear);

					return(
						<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
							<View>
								<View style={{...globalStyles.modalField, ...globalStyles.modalFieldSize, borderColor: checkQtyValid(currGear, currQty) ? COLORS.GOLD : COLORS.RED}}>
									<TextInput
										value={currQty.toString()}
										style={{...globalStyles.textInput, ...globalStyles.modalFieldSize}}
										textAlign={'center'}
										onChangeText={text => setCurrQty(Number(text))}
										placeholder={'QTY'}
										placeholderTextColor={COLORS.LIGHT_GRAY}
										enterKeyHint={'done'}
										contextMenuHidden
										keyboardAppearance={'dark'}
										keyboardType={'number-pad'}
										maxLength={4}
										selectionColor={COLORS.GOLD}
									/>
								</View>

								{!checkQtyValid(currGear, currQty) &&
									<Text style={{color: COLORS.RED}}>{`${currGear.locations.filter(loc => loc.location == props.eventLocation).length ? currGear.locations.filter(loc => loc.location == props.eventLocation)[0].qty : 0} AVAIL IN ${props.eventLocation}`}</Text>
								}
							</View>

							<Dropdown
								data={props.gear.filter(g => g.locations.filter(loc => loc.location == props.eventLocation).length).map(g => ({key: g.name, val: g}))} 
								onSelect={(item: KeyVal) => setCurrGear(item.val)}
								placeholderText={'ITEM'}
								style={globalStyles.dropdown}
								searchEnabled
								expandLogic
								name={'GEAR' + index}
								onExpand={name => setCurrentExpanded(name)}
								currentExpanded={currentExpanded}
							/>

							{(!checkObjEqual(currGear, item.gear) || currQty != item.qty) && checkQtyValid(currGear, currQty) &&
								<TouchableOpacity style={styles.textBubble} onPress={() => {
									let newList = props.gearList;
									newList[index] = {qty: currQty, gear: currGear};
									props.setGearList(newList);
								}}>
									<Text style={globalStyles.textInput}>UPDATE</Text>
								</TouchableOpacity>
							}

							<Text style={globalStyles.textInput}>{'$' + currGear.rentalCost}</Text>
							<Text style={globalStyles.textInput}>{'$' + (currGear.rentalCost * currQty)}</Text>
						</View>
					)
				}}
				
				ListHeaderComponent={() => 
					<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
						<Text style={globalStyles.textInput}>QTY</Text>
						<Text style={globalStyles.textInput}>ITEM</Text>
						<Text style={globalStyles.textInput}>EACH</Text>
						<Text style={globalStyles.textInput}>TOTAL</Text>
					</View>
				}
				
				ListFooterComponent={() => {
					const [currQty, setCurrQty] = useState(NaN);
					const [currGear, setCurrGear] = useState<Gear | null>(null);

					return(
						<View style={{flexDirection: 'row'}}>
							<View>
								<View style={{...globalStyles.modalField, ...globalStyles.modalFieldSize, marginLeft: 0, borderColor: currGear && !checkQtyValid(currGear, currQty) ? COLORS.RED : COLORS.GOLD}}>
									<TextInput
										value={currQty ? currQty.toString() : ''}
										style={{...globalStyles.textInput, ...globalStyles.modalFieldSize}}
										textAlign={'center'}
										onChangeText={text => setCurrQty(Number(text))}
										placeholder={'QTY'}
										placeholderTextColor={COLORS.LIGHT_GRAY}
										enterKeyHint={'done'}
										contextMenuHidden
										keyboardAppearance={'dark'}
										keyboardType={'number-pad'}
										maxLength={4}
										selectionColor={COLORS.GOLD}
									/>
								</View>

								{currGear && 
									(!checkQtyValid(currGear, currQty) ?
										<Text style={{color: COLORS.RED}}>{`  ${currGear.locations.filter(loc => loc.location == props.eventLocation).length ? currGear.locations.filter(loc => loc.location == props.eventLocation)[0].qty : 0} AVAIL\n   IN ${props.eventLocation}`}</Text>
									:
										<TouchableOpacity onPress={() => props.setGearList([...props.gearList, {qty: currQty, gear: currGear}])} style={{...styles.textBubble, marginRight: 20}}>
											<Text style={globalStyles.textInput}>ADD</Text>
										</TouchableOpacity>
									)
								}
							</View>

							<Dropdown
								data={props.gear.filter(g => g.locations.filter(loc => loc.location == props.eventLocation).length).map(g => ({key: g.name, val: g}))} 
								onSelect={(item: KeyVal) => setCurrGear(item.val)}
								placeholderText={'ITEM'}
								style={globalStyles.dropdown}
								searchEnabled
								expandLogic
								name={'GEAR NEW'}
								onExpand={name => setCurrentExpanded(name)}
								currentExpanded={currentExpanded}
							/>

							{currGear && <Text style={globalStyles.textInput}>{'$' + currGear.rentalCost}</Text>}
							{currGear && currQty && <Text style={globalStyles.textInput}>{'$' + (currGear.rentalCost * currQty)}</Text>}
						</View>
					)
				}}
			/>
		</View>	
	)
}

const StatusView = (props: {event: Event}) => (
	<FlatList
		data={Object.values(STATUS)}
		renderItem={({item}) => (
			<View style={{alignContent: 'center', margin: 10, marginTop: 20, marginBottom: 25, marginLeft: item.step == 0 ? 0 : 10, width: item.step == 6 ? 80 : 110}}>
				<View style={{flexDirection: 'row', opacity: item.step <= props.event.status.step ? 1 : .5}}>
					<View style={{...styles.progressBubble, backgroundColor: item.color}}/>
					{item.step != 6 && <Ionicons name={'chevron-forward-outline'} color={COLORS.WHITE} size={40}/>}
				</View>
				<Text style={globalStyles.textInput}>{item.name}</Text>
			</View>
		)}
		horizontal
		showsHorizontalScrollIndicator={false}
		initialScrollIndex={props.event.status.step ? props.event.status.step - 1 : 0}
		getItemLayout={(data, index) => ({length: 110, offset: index * 110, index})}
	/>
)


const EventDetail = (props: {onClose: () => void, currDate: number, techs: Technician[], gear: GearContainer, events: Event[]}) => {
	const [selectedEvent, setSelectedEvent] = useState(props.events[0]);
	const [expanded, setExpanded] = useState(false);
	const currHeight = useRef(175)
	const animHeight = React.useRef(new Animated.Value(175)).current;

	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: (evt) => (evt.nativeEvent.locationY < 15),
		onPanResponderMove: (_, gestureState) => Animated.spring(animHeight, {toValue: currHeight.current - gestureState.dy, tension: 20, useNativeDriver: false}).start(),
		onPanResponderRelease: (_, gestureState) => {
			currHeight.current -= gestureState.dy;
			if (currHeight.current > 300) {
				Animated.spring(animHeight, {toValue: 525, tension: 20, useNativeDriver: false}).start();
				currHeight.current = 525;
				setExpanded(true);
			} else if (currHeight.current < 100 && !expanded) {
				Animated.spring(animHeight, {toValue: 10, tension: 20, useNativeDriver: false}).start();
				currHeight.current = 175;
				props.onClose();
			} else {
				Animated.spring(animHeight, {toValue: 175, tension: 20, useNativeDriver: false}).start();
				currHeight.current = 175;
				setExpanded(false)
			}
		}
		
	});

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
					  showsHorizontalScrollIndicator={false}
						style={{alignSelf: 'center'}}
					/>
				</View>

				<ScrollView pagingEnabled={!expanded} showsVerticalScrollIndicator={false}>
					<DetailOverview event={selectedEvent}/>

					<StatusView event={selectedEvent}/>
					
					{expanded && 
						<View style={{margin: 10}}>
							<GearListComp name={'SHOW CONTROL EQUIPMENT'} gear={props.gear.showControl} gearList={selectedEvent.gear.showControl} eventLocation={selectedEvent.shop} setGearList={newList => selectedEvent.setGear({...selectedEvent.gear, showControl: newList})}/>				
							<GearListComp name={'LX EQUIPMENT'} gear={props.gear.lxFixtures} gearList={selectedEvent.gear.lxFixtures} eventLocation={selectedEvent.shop} setGearList={newList => selectedEvent.setGear({...selectedEvent.gear, lxFixtures: newList})}/>
							<GearListComp name={'LASER EQUIPMENT'} gear={props.gear.laserFixtures} gearList={selectedEvent.gear.laserFixtures} eventLocation={selectedEvent.shop} setGearList={newList => selectedEvent.setGear({...selectedEvent.gear, laserFixtures: newList})}/>
							<GearListComp name={'INFRASTRUCTURE'} gear={props.gear.infrastructure} gearList={selectedEvent.gear.infrastructure} eventLocation={selectedEvent.shop} setGearList={newList => selectedEvent.setGear({...selectedEvent.gear, infrastructure: newList})}/>
							<GearListComp name={'SFX EQUIPMENT'} gear={props.gear.sfx} gearList={selectedEvent.gear.sfx} eventLocation={selectedEvent.shop} setGearList={newList => selectedEvent.setGear({...selectedEvent.gear, sfx: newList})}/>
							<GearListComp name={'CABLE'} gear={props.gear.cable} gearList={selectedEvent.gear.cable} eventLocation={selectedEvent.shop} setGearList={newList => selectedEvent.setGear({...selectedEvent.gear, cable: newList})}/>
						</View>
					}
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