import { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import ServiceTicket from '@/app/utils/ServiceTicket';
import Gear from '@/app/utils/Gear';

import Radio from '@/app/components/Radio';

import globalStyles, { COLORS, KeyVal, STD_OPTIONS, formatDate } from '@/app/globals';


const TicketItem = ({ticket, onDelete}: {ticket: ServiceTicket, onDelete: () => void}) => (
  <View style={styles.ticketItem}>
    <View style={styles.ticketItemField}>
      <Text style={styles.cardBubbleText}>{formatDate(ticket.date)}</Text>
    </View>
    <View style={styles.ticketItemField}>
      <Text style={styles.cardBubbleText}>{ticket.location}</Text>
    </View>
    <View style={{...styles.cardBubble, backgroundColor: COLORS.RED, marginLeft: 5, marginTop: 'auto', marginBottom: 'auto'}}>
      <Text style={styles.cardBubbleText}>{ticket.qty}</Text>
    </View>
    {ticket.notes &&
      <View style={styles.ticketItemField}>
        <Text style={styles.cardBubbleText}>{ticket.notes}</Text>
      </View>
    }
    <TouchableOpacity style={{marginBottom: 'auto', marginTop: 'auto'}} onPress={onDelete}>
      <Ionicons name={'checkmark-circle'} color={COLORS.GREEN} size={35}/>
    </TouchableOpacity>
  </View>
)

const TicketView = ({gearItem, onClose}: {gearItem: Gear, onClose: () => void}) => (
  <View style={styles.ticketView}>
    <View style={styles.ticketName}>
      <View style={{...styles.cardName, backgroundColor: COLORS.RED, marginBottom: 'auto'}}>
        <Text style={{color: COLORS.WHITE}}>{gearItem.name}</Text>
      </View>
      <TouchableOpacity  onPress={onClose} style={{marginRight: 4, marginTop: 3}}>
        <Ionicons name={'arrow-undo-outline'} color={COLORS.LIGHT_GRAY} size={40}/>
      </TouchableOpacity>
    </View>

    <FlatList
      data={gearItem.serviceTickets}
      renderItem={({item}) => <TicketItem ticket={item} onDelete={() => {gearItem.deleteTicket(item); if (!gearItem.serviceTickets.length) onClose()}}/>}
      keyExtractor={(ticket, index) => index.toString()}
    />
  </View>
)

const DeleteView = ({gearItem, onClose}: {gearItem: Gear, onClose: () => void}) => {
  const [deleteType, setDeleteType] = useState('DECOMISSIONED');
  const [deleteData, setDeleteData] = useState({qty: 0, price: 0, location: 'CO', notes: ''})

  const validateSubmit = () => {
    let qtyAtLoc = 0;
    gearItem.locations.forEach(loc => {if (loc.location == deleteData.location) qtyAtLoc = loc.qty;});
    return (deleteData.qty && deleteData.qty <= qtyAtLoc && (deleteData.price || deleteType === 'DECOMISSIONED'));
  }

  return (
    <View style={styles.ticketView}>
      <Radio
        data={['SOLD', 'DECOMISSIONED'].map(item => ({key: item, val: item}))}
        onSelect={option => {setDeleteType(option.val); if (option.val === 'DECOMISSIONED') setDeleteData({...deleteData, price: 0});}}
        defaultOption={{key: 'DECOMISSIONED', val: 'DECOMISSIONED'}}
         style={{margin: 'auto', marginTop: 5}}
      />
      <View style={{flexDirection: 'row', alignContent: 'space-around', alignSelf: 'center'}}>
        <View style={{...globalStyles.modalField, ...globalStyles.modalFieldSize}}>
          <TextInput
            style={{...globalStyles.textInput, ...globalStyles.modalFieldSize}}
            textAlign={'center'}
            onChangeText={text => setDeleteData({...deleteData, qty: Number(text)})}
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
        {gearItem.locations.length > 1 && 
          <Radio
            data={STD_OPTIONS.locations}
            onSelect={(item: KeyVal<string>) => setDeleteData({...deleteData, location: item.val})}
            defaultOption={{key: 'CO', val: 'CO'}}
            style={{marginLeft: 10, marginTop: 15}}
          />
        }
        {deleteType === 'SOLD' && 
          <View style={{...globalStyles.modalField, ...globalStyles.modalFieldSize}}>
            <TextInput
              style={{...globalStyles.textInput, ...globalStyles.modalFieldSize}}
              textAlign={'center'}
              onChangeText={text => setDeleteData({...deleteData, price: Number(text)})}
              placeholder={'PRICE'}
              placeholderTextColor={COLORS.LIGHT_GRAY}
              enterKeyHint={'done'}
              contextMenuHidden
              keyboardAppearance={'dark'}
              keyboardType={'number-pad'}
              maxLength={4}
              selectionColor={COLORS.GOLD}
            />
          </View>
        }
      </View>
      <View style={globalStyles.modalField}>
        <TextInput
          style={{...globalStyles.textInput, minWidth: 200, minHeight: 30, marginRight: 'auto'}}
          onChangeText={text => setDeleteData({...deleteData, notes: text})}
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
      <View style={globalStyles.modalExitButtons}>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name={'close-circle'} color={COLORS.RED} size={50}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {if (validateSubmit()) {onClose(); gearItem.deleteQty(deleteData.qty, deleteData.location);}}}>
          <Ionicons name={'checkmark-circle'} color={validateSubmit() ? COLORS.GREEN : COLORS.LIGHT_GRAY} size={50}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const PurchaseItem = ({purchase}: {purchase: {qty: number, date: string, cost: number, location: string, notes: string}}) => (
  <View style={styles.historyItem}>
    <View style={styles.historyItemField}>
      <Text style={styles.cardBubbleText}>{formatDate(purchase.date)}</Text>
    </View>
    <View style={styles.historyItemField}>
      <Text style={styles.cardBubbleText}>{purchase.location}</Text>
    </View>
    <View style={{...styles.cardBubble, marginLeft: 5, marginTop: 'auto', marginBottom: 'auto'}}>
      <Text style={styles.cardBubbleText}>{purchase.qty}</Text>
    </View>
    <View style={styles.historyItemField}>
      <Text style={styles.cardBubbleText}>{`$${purchase.cost}`}</Text>
    </View>
    {purchase.notes &&
      <View style={styles.historyItemField}>
        <Text style={styles.cardBubbleText}>{purchase.notes}</Text>
      </View>
    }
  </View>
)

const HistoryView = ({gearItem, onClose}: {gearItem: Gear, onClose: () => void}) => (
  <View style={{...styles.card, flexDirection: 'column'}}>
    <View style={{flexDirection: 'row'}}>
      <View style={{...styles.cardName, marginBottom: 'auto'}}>
        <Text style={{color: COLORS.WHITE}}>{gearItem.name}</Text>
      </View>
      <TouchableOpacity  onPress={onClose} style={{marginRight: 4, marginTop: 3, marginLeft: 'auto'}}>
        <Ionicons name={'arrow-undo-outline'} color={COLORS.LIGHT_GRAY} size={40}/>
      </TouchableOpacity>
    </View>
    
    <FlatList
      data={gearItem.purchaseDates}
      renderItem={({item}) => <PurchaseItem purchase={item}/>}
      keyExtractor={(ticket, index) => index.toString()}
    />
  </View>
)




const GearCard = ({gearItem}: {gearItem: Gear}) => {
  const [ticketView, setTicketView] = useState(false);
  const [deleteView, setDeleteView] = useState(false);
  const [editView, setEditView] = useState(false);
  const [historyView, setHistoryView] = useState(false);

  const numDamaged = gearItem.serviceTickets.reduce((total, {qty}) => total + qty, 0);

  return (
    <View>
      {ticketView && <TicketView gearItem={gearItem} onClose={() => setTicketView(false)}/>}
      {deleteView && <DeleteView gearItem={gearItem} onClose={() => setDeleteView(false)}/>}
      {/* {editView && <EditView gearItem={gearItem} onClose={() => setEditView(false)}/>} */}
      {historyView && <HistoryView gearItem={gearItem} onClose={() => setHistoryView(false)}/>}

      {!ticketView && !deleteView && !editView && !historyView &&
        <View style={styles.card}>
          <View style={styles.cardLeftSideWrapper}>
            <View style={styles.cardName}>
              <Text style={{color: COLORS.WHITE}}>{gearItem.name}</Text>
            </View>

            {!!numDamaged &&
              <TouchableOpacity onPress={() => setTicketView(true)}>
                <View style={{...styles.cardBubble, backgroundColor: COLORS.RED}}>
                  <Text style={styles.cardBubbleText}>{numDamaged}</Text>
                </View>
              </TouchableOpacity>
            }
            <FlatList
              data={gearItem.locations}
              renderItem={({item}) => 
                <View style={styles.cardQuantityWrapper}>
                  <View style={styles.cardBubble}>
                      <Text style={styles.cardBubbleText}>{item.location}</Text>
                    </View>
                  <View style={styles.cardBubble}>
                    <Text style={styles.cardBubbleText}>{item.qty}</Text>
                  </View>
                </View>
              }
              keyExtractor={loc => loc.location}
              style={{marginBottom: 5}}
            />

            {!!gearItem.includes.length &&
              <View style={styles.cardIncludes}>
                <Text style={{color: COLORS.WHITE}}>INCLUDES</Text>
                <View style={styles.separatorBar}></View>
                <FlatList
                  data={gearItem.includes}
                  renderItem={({item}) => <Text style={{color: COLORS.WHITE}}>• {item}</Text>}
                  keyExtractor={includeItem => includeItem}
                />
              </View>
            }
          </View>

          <View style={styles.cardRightSideWrapper}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={{alignSelf: 'center', marginLeft: 5}} onPress={() => setHistoryView(true)}>
                <Ionicons name={'time-outline'} color={COLORS.GOLD} size={30}/>
              </TouchableOpacity>
              <TouchableOpacity style={{alignSelf: 'center', marginLeft: 5}} onPress={() => setEditView(true)}>
                <Ionicons name={'create-outline'} color={COLORS.GOLD} size={30}/>
              </TouchableOpacity>
              <TouchableOpacity style={{alignSelf: 'center', marginLeft: 5}} onPress={() => setDeleteView(true)}>
                <Ionicons name={'trash-outline'} color={COLORS.RED} size={30}/>
              </TouchableOpacity>
            </View>

            <View style={styles.cardBubble}>
              <Text style={styles.cardBubbleText}>{gearItem.powerDraw}W</Text>
            </View>
            <View style={{...styles.cardBubble, height: 40}}>
              <Text style={styles.cardBubbleText}>COST{'\n'}${Math.round(gearItem.avgPurchaseCost)}</Text>
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
    ...globalStyles.border,
    borderRadius: 5,
    backgroundColor: COLORS.GRAY,
    margin: 15,
    marginTop: 0,
    flexDirection: 'row',
    minHeight: 120
  },

  cardName: {
    borderTopLeftRadius: 3,
    borderBottomRightRadius: 5,
    backgroundColor: COLORS.GOLD,
    width: 190,
    paddingBottom: 6,
    paddingTop: 6,
    paddingLeft: 4,
    paddingRight: 4
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
      marginTop: 'auto',
      maxWidth: 190
  },

  cardNotes: {
    marginTop: 'auto',
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
  },

  historyItem: {
    flexDirection: 'row', 
    alignContent: 'flex-start', 
    width: 300,
    marginBottom: 5
  },

  historyItemField: {
    backgroundColor: COLORS.GOLD,
    borderRadius: 10,
    margin: 4,
    padding: 5,
    maxWidth: 170,
    marginTop: 'auto',
    marginBottom: 'auto'
  },

  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    position: 'absolute'
  }
});

export default GearCard;