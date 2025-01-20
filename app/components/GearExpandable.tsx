import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Animated, useAnimatedValue, StyleSheet, ListRenderItem } from 'react-native';

import Gear from '../utils/Gear';
import ServiceTicket from '../utils/ServiceTicket';

import { COLORS } from '../globals';
import Ionicons from '@expo/vector-icons/Ionicons';

const GearCard = ({ gearItem }: {gearItem: Gear}) => {
  const [ticketView, setTicketView] = useState(false);
  var numDamaged = 0;
  for (const ticket of gearItem.serviceTickets) {
    numDamaged += ticket.qty;
  }
  

  const TicketItem = (ticketItem: ServiceTicket, gearItem: Gear) => (
    <View style={styles.ticketItem}>
      <View style={{...styles.gearCardBubble, backgroundColor: COLORS.RED, margin: 'auto', marginLeft: 5}}>
        <Text style={styles.gearCardBubbleText}>{ticketItem.qty}</Text>
      </View>
      <View style={styles.ticketItemNotes}>
        <Text style={styles.gearCardBubbleText}>{ticketItem.date}</Text>
      </View>
      {ticketItem.notes &&
        <View style={styles.ticketItemNotes}>
          <Text style={styles.gearCardBubbleText}>{ticketItem.notes}</Text>
        </View>
      }
      <TouchableOpacity style={{margin: 'auto'}} onPress={() => gearItem.deleteTicket(ticketItem)}>
        <Ionicons name={'checkmark-circle'} color={COLORS.GREEN} size={40}/>
      </TouchableOpacity>
    </View>
  )

  return (
    <View>
      {ticketView && gearItem.serviceTickets.length ? 
        <View style={styles.ticketView}>
          <View style={styles.ticketName}>
            <View style={{...styles.gearCardName, backgroundColor: COLORS.RED, marginBottom: 'auto'}}>
              <Text style={{color: COLORS.WHITE}}>{gearItem.name}</Text>
            </View>
            <TouchableOpacity  onPress={() => setTicketView(false)}>
              <Ionicons name={'close-outline'} color={COLORS.LIGHT_GRAY} size={40}/>
            </TouchableOpacity>
          </View>

          <FlatList
            data={gearItem.serviceTickets}
            renderItem={(item) => TicketItem(item.item, gearItem)}
            keyExtractor={(ticket) => (ticket.notes)}
          />
        </View>

      :

        <View style={styles.gearCard}>
          <View style={styles.gearCardLeftSideWrapper}>

            <View style={styles.gearCardName}>
              <Text style={{color: COLORS.WHITE}}>{gearItem.name}</Text>
            </View>

            <View style={styles.gearCardQuantityWrapper}>
              <View style={styles.gearCardBubble}>
                <Text style={styles.gearCardBubbleText}>{gearItem.qtyOwned}</Text>
              </View>
              {numDamaged > 0 &&
                <TouchableOpacity onPress={() => {setTicketView(true)}}>
                  <View style={{...styles.gearCardBubble, backgroundColor: COLORS.RED}}>
                    <Text style={{...styles.gearCardBubbleText, paddingTop: 1}}>{numDamaged}</Text>
                  </View>
                </TouchableOpacity>
              }
            </View>

            {gearItem.includes &&
              <View style={styles.gearCardIncludes}>
                <Text style={{color: COLORS.WHITE}}>Includes</Text>
                <View style={styles.separatorBar}></View>
                <FlatList
                  data={gearItem.includes}
                  renderItem={({item}: {item: string}) => {return (<Text style={{color: COLORS.WHITE}}>•{item}</Text>)}}
                  keyExtractor={(includeItem) => (includeItem)}
                />
              </View>
            }

          </View>

          <View style={styles.gearCardRightSideWrapper}>

            <View style={styles.gearCardBubble}>
              <Text style={styles.gearCardBubbleText}>{gearItem.powerDraw}W</Text>
            </View>
            <View style={{...styles.gearCardBubble, height: 40}}>
              <Text style={styles.gearCardBubbleText}>COST{'\n'}${gearItem.avgPurchaseCost}</Text>
            </View>
            <View style={{...styles.gearCardBubble, height: 40}}>
              <Text style={styles.gearCardBubbleText}>RENT{'\n'}${gearItem.rentalCost}</Text>
            </View>

            {gearItem.notes &&
              <View style={styles.gearCardNotes}>
                <Text style={{color: COLORS.WHITE}}>NOTES</Text>
                <View style={styles.separatorBar}></View>
                <Text style={{color: COLORS.WHITE}}>{gearItem.notes}</Text>
              </View>
            }

          </View>
        </View>
      }
    </View>
  )
}



const GearExpandable = ({data, name}: {data: Gear[], name: string}) => {
  const [expanded, setExpanded] = useState(false);
  const listScaleAnim = useAnimatedValue(0);

  var containsDamaged = false; //determine if expandable contains damaged gear
  for (const gear of data) {
    if (gear.serviceTickets.length) {
      containsDamaged = true;
      break;
    }
  };

  return (
    <View>
      <TouchableOpacity style={{...styles.headerView, borderColor: containsDamaged ? COLORS.RED : COLORS.GOLD}} onPress={() => {
        if (expanded) {
          listScaleAnim.setValue(1);
          Animated.timing(listScaleAnim, {toValue: 0, duration: 400, useNativeDriver: true}).start(() => setExpanded(false));
        } else {
          setExpanded(true);
          listScaleAnim.setValue(0);
          Animated.timing(listScaleAnim, {toValue: 1, duration: 400, useNativeDriver: true}).start();
        }
      }}>
        <Text style={styles.headerText}>{name}</Text>
      </TouchableOpacity>

      {expanded &&
        <Animated.View style={{paddingBottom: 30, transformOrigin: 'top', transform: [{scaleY: listScaleAnim}]}}>
          <FlatList
            data={data}
            renderItem={(item) => <GearCard gearItem={item.item}/>}
            keyExtractor={(gearItem) => (gearItem.key)}
          />
        </Animated.View>
      }
    </View>
  );
};


const styles = StyleSheet.create({
  headerView: {
    margin: 4,
    backgroundColor: COLORS.BLACK,
    borderWidth: 2,
    borderRadius: 10
  },

  headerText: {
    padding: 5,
    margin: 'auto',
    color: COLORS.WHITE,
    fontWeight: 'bold'
  },

  separatorBar: {
    backgroundColor: COLORS.WHITE,
    height: 2,
    marginBottom: 4
  },

  gearCard: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.GOLD,
    backgroundColor: COLORS.GRAY,
    margin: 15,
    marginTop: 0,
    flexDirection: 'row'
  },

  gearCardName: {
    borderTopLeftRadius: 3,
    borderBottomRightRadius: 5,
    backgroundColor: COLORS.GOLD,
    width: 190,
    paddingBottom: 6,
    paddingTop: 6
  },

  gearCardBubble: {
    backgroundColor: COLORS.GOLD,
    height: 20,
    borderRadius: 10,
    margin: 4
  },

  gearCardBubbleText: {
    margin: 'auto', 
    paddingLeft: 6, 
    paddingRight: 6, 
    color: COLORS.WHITE
  },

  gearCardIncludes: {
    backgroundColor: COLORS.GOLD,
    borderBottomLeftRadius: 3,
    borderTopRightRadius: 5,
    alignSelf: 'flex-start',
    padding: 5,
    marginTop: 'auto'
  },

  gearCardNotes: {
    marginTop: 5,
    padding: 5,
    backgroundColor: COLORS.GOLD,
    borderBottomRightRadius: 3,
    borderTopLeftRadius: 5
  },

  gearCardRightSideWrapper: {
    alignItems: 'flex-end',
    flex: 1
  },

  gearCardLeftSideWrapper: {
    alignItems: 'flex-start'
  },

  gearCardQuantityWrapper: {
    flexDirection: 'row'
  },

  ticketView: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.RED,
    backgroundColor: COLORS.GRAY,
    margin: 15,
    marginTop: 0,
    minHeight: 200
  },

  ticketName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-start'
  },

  ticketItem: {
    flexDirection: 'row', 
    alignContent: 'flex-start', 
    width: 300
  },

  ticketItemNotes: {
    backgroundColor: COLORS.RED,
    borderRadius: 10,
    margin: 4,
    padding: 5
  }
});

export default GearExpandable;