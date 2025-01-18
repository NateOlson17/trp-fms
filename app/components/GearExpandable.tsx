import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Animated, useAnimatedValue, StyleSheet } from 'react-native';
import Gear from '../utils/Gear';
import { COLORS } from '../globals';

const GearCard = ({ item }: {item: Gear}) => {
  var numDamaged = 0; //determine if card contains damaged gear
  for (const ticket of item.serviceTickets) {
    numDamaged += ticket.qty;
  }

  return (
    <View style={styles.gearCard}>
      <View style={styles.gearCardLeftSideWrapper}>

        <View style={styles.gearCardName}>
          <Text style={{color: COLORS.WHITE}}>{item.name}</Text>
        </View>

        <View style={styles.gearCardQuantityWrapper}>
          <View style={styles.gearCardBubble}>
            <Text style={styles.gearCardBubbleText}>{item.qtyAvail}</Text>
          </View>
          {numDamaged > 0 &&
            <TouchableOpacity onPress={() => {}}>
              <View style={{...styles.gearCardBubble, backgroundColor: COLORS.RED}}>
                <Text style={{...styles.gearCardBubbleText, paddingTop: 1}}>{numDamaged}</Text>
              </View>
            </TouchableOpacity>
          }
        </View>

        {item.includes &&
          <View style={styles.gearCardIncludes}>
            <Text style={{color: COLORS.WHITE}}>Includes</Text>
            <View style={styles.separatorBar}></View>
            <FlatList
              data={item.includes}
              renderItem={({item}: {item: string}) => {return (<Text style={{color: COLORS.WHITE}}>•{item}</Text>)}}
              keyExtractor={(includeItem) => (includeItem)}
            />
          </View>
        }

      </View>

      <View style={styles.gearCardRightSideWrapper}>

        <View style={styles.gearCardBubble}>
          <Text style={styles.gearCardBubbleText}>{item.powerDraw}W</Text>
        </View>
        <View style={{...styles.gearCardBubble, height: 40}}>
          <Text style={styles.gearCardBubbleText}>COST{'\n'}${item.avgPurchaseCost}</Text>
        </View>
        <View style={{...styles.gearCardBubble, height: 40}}>
          <Text style={styles.gearCardBubbleText}>RENT{'\n'}${item.rentalCost}</Text>
        </View>

        {item.notes &&
          <View style={styles.gearCardNotes}>
            <Text style={{color: COLORS.WHITE}}>NOTES</Text>
            <View style={styles.separatorBar}></View>
            <Text style={{color: COLORS.WHITE}}>{item.notes}</Text>
          </View>
        }

      </View>
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
        <Animated.View style={{transformOrigin: 'top', transform: [{scaleY: listScaleAnim}]}}>
          <FlatList
            data={data}
            renderItem={GearCard}
            keyExtractor={(gearItem) => (gearItem.name)}
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
  }
});

export default GearExpandable;