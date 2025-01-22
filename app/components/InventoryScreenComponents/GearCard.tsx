import { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import ServiceTicket from '../../utils/ServiceTicket';
import Gear from '../../utils/Gear';

import { COLORS } from '../../globals';


const TicketItem = (ticketItem: ServiceTicket, gearItem: Gear) => (
  <View style={styles.ticketItem}>
    <View style={styles.ticketItemField}>
      <Text style={styles.cardBubbleText}>{ticketItem.date}</Text>
    </View>
    <View style={{...styles.cardBubble, backgroundColor: COLORS.RED, marginLeft: 5, marginTop: 'auto', marginBottom: 'auto'}}>
      <Text style={styles.cardBubbleText}>{ticketItem.qty}</Text>
    </View>
    {ticketItem.notes &&
      <View style={styles.ticketItemField}>
        <Text style={styles.cardBubbleText}>{ticketItem.notes}</Text>
      </View>
    }
    <TouchableOpacity style={{marginBottom: 'auto', marginTop: 'auto'}} onPress={() => gearItem.deleteTicket(ticketItem)}>
      <Ionicons name={'checkmark-circle'} color={COLORS.GREEN} size={35}/>
    </TouchableOpacity>
  </View>
)


const GearCard = ({ gearItem }: {gearItem: Gear}) => {
  const [ticketView, setTicketView] = useState(false);

  const numDamaged = gearItem.serviceTickets.reduce((total, {qty}) => total + qty, 0);

  return (
    <View>
      {ticketView && gearItem.serviceTickets.length ? 
        <View style={styles.ticketView}>
          <View style={styles.ticketName}>
            <View style={{...styles.cardName, backgroundColor: COLORS.RED, marginBottom: 'auto'}}>
              <Text style={{color: COLORS.WHITE}}>{gearItem.name}</Text>
            </View>
            <TouchableOpacity  onPress={() => setTicketView(false)} style={{marginRight: 4, marginTop: 3}}>
              <Ionicons name={'arrow-undo-outline'} color={COLORS.LIGHT_GRAY} size={40}/>
            </TouchableOpacity>
          </View>

          <FlatList
            data={gearItem.serviceTickets}
            renderItem={(item) => TicketItem(item.item, gearItem)}
            keyExtractor={(ticket, index) => index.toString()}
          />
        </View>

      :

        <View style={styles.card}>
          <View style={styles.cardLeftSideWrapper}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.cardName}>
                <Text style={{color: COLORS.WHITE}}>{gearItem.name}</Text>
              </View>
              <TouchableOpacity style={{alignSelf: 'center', marginLeft: 5}} onPress={() => {}}>
                <Ionicons name={'create-outline'} color={COLORS.GOLD} size={30}/>
              </TouchableOpacity>
            </View>

            <View style={styles.cardQuantityWrapper}>
              <View style={styles.cardBubble}>
                <Text style={styles.cardBubbleText}>{gearItem.qtyOwned}</Text>
              </View>
              {numDamaged > 0 &&
                <TouchableOpacity onPress={() => setTicketView(true)}>
                  <View style={{...styles.cardBubble, backgroundColor: COLORS.RED}}>
                    <Text style={styles.cardBubbleText}>{numDamaged}</Text>
                  </View>
                </TouchableOpacity>
              }
            </View>

            {gearItem.includes &&
              <View style={styles.cardIncludes}>
                <Text style={{color: COLORS.WHITE}}>INCLUDES</Text>
                <View style={styles.separatorBar}></View>
                <FlatList
                  data={gearItem.includes}
                  renderItem={({item}: {item: string}) => <Text style={{color: COLORS.WHITE}}>• {item}</Text>}
                  keyExtractor={includeItem => includeItem}
                />
              </View>
            }
          </View>

          <View style={styles.cardRightSideWrapper}>
            <View style={styles.cardBubble}>
              <Text style={styles.cardBubbleText}>{gearItem.powerDraw}W</Text>
            </View>
            <View style={{...styles.cardBubble, height: 40}}>
              <Text style={styles.cardBubbleText}>COST{'\n'}${gearItem.avgPurchaseCost}</Text>
            </View>
            <View style={{...styles.cardBubble, height: 40}}>
              <Text style={styles.cardBubbleText}>RENT{'\n'}${gearItem.rentalCost}</Text>
            </View>

            {gearItem.notes &&
              <View style={styles.cardNotes}>
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

const styles = StyleSheet.create({
    separatorBar: {
        backgroundColor: COLORS.WHITE,
        height: 2,
        marginBottom: 4
    },

    card: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: COLORS.GOLD,
        backgroundColor: COLORS.GRAY,
        margin: 15,
        marginTop: 0,
        flexDirection: 'row'
    },

    cardName: {
        borderTopLeftRadius: 3,
        borderBottomRightRadius: 5,
        backgroundColor: COLORS.GOLD,
        width: 190,
        paddingBottom: 6,
        paddingTop: 6,
        paddingLeft: 4
    },

    cardBubble: {
        backgroundColor: COLORS.GOLD,
        height: 20,
        borderRadius: 10,
        margin: 4
    },

    cardBubbleText: {
        margin: 'auto', 
        paddingLeft: 6, 
        paddingRight: 6, 
        color: COLORS.WHITE
    },

    cardIncludes: {
        backgroundColor: COLORS.GOLD,
        borderBottomLeftRadius: 3,
        borderTopRightRadius: 5,
        alignSelf: 'flex-start',
        padding: 5,
        marginTop: 'auto'
    },

    cardNotes: {
        marginTop: 5,
        padding: 5,
        backgroundColor: COLORS.GOLD,
        borderBottomRightRadius: 3,
        borderTopLeftRadius: 5
    },

    cardRightSideWrapper: {
        alignItems: 'flex-end',
        flex: 1
    },

    cardLeftSideWrapper: {
        alignItems: 'flex-start'
    },

    cardQuantityWrapper: {
        flexDirection: 'row'
    },

    ticketView: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: COLORS.RED,
        backgroundColor: COLORS.GRAY,
        margin: 15,
        marginTop: 0,
        minHeight: 200,
        paddingBottom: 10
    },

    ticketName: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        marginBottom: 4
    },

    ticketItem: {
        flexDirection: 'row', 
        alignContent: 'flex-start', 
        width: 300
    },

    ticketItemField: {
        backgroundColor: COLORS.RED,
        borderRadius: 10,
        margin: 4,
        padding: 5,
        maxWidth: 170,
        marginTop: 'auto',
        marginBottom: 'auto'
    }
});

export default GearCard;