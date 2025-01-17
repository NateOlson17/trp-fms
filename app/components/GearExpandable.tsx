import React from 'react';
import { View, FlatList, Text, TouchableOpacity, Animated, useAnimatedValue, FlexAlignType, DimensionValue, Touchable } from 'react-native';
import Gear from '../utils/Gear';
import { useState } from 'react';
import { COLORS } from '../globals';

const GearExpandable = ({data, name}: {data: Gear[], name: string}) => {
  const [expanded, setExpanded] = useState(false);
  const listScaleAnim = useAnimatedValue(0);

  var containsDamaged = false;
  for (const gear of data) {
    if (gear.serviceTickets.length) {
      containsDamaged = true;
      break;
    }
  };

  const renderGearIncludes = ({item}: {item: string}) => {
    return (
      <Text style={{color: COLORS.WHITE}}>{item}</Text>
    )
  }

  const renderGearCard = ({ item }: {item: Gear}) => {
    var numDamaged = 0;
    item.serviceTickets.forEach(ticket => {
      numDamaged += ticket.qty;
    })
    var showTickets = false;

    return (
      <View style={gearCard}>
        <View style={gearCardLeftSideWrapper}>
          <View style={gearCardName}>
            <Text style={{color: COLORS.WHITE}}>{item.name}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={gearCardBubble}>
              <Text style={gearCardBubbleText}>{item.qtyAvail} </Text>
            </View>
            {numDamaged > 0 &&
              <View style={{...gearCardBubble, backgroundColor: COLORS.RED}}>
                <TouchableOpacity onPress={() => {showTickets = !showTickets}}><Text style={{...gearCardBubbleText, paddingTop: 1}}>{numDamaged} </Text></TouchableOpacity>
              </View>
            }
          </View>
          {item.includes &&
            <View style={gearCardIncludes}>
              <Text style={{color: COLORS.WHITE}}>Includes</Text>
              <View style={separatorBar}></View>
              <FlatList
                data={item.includes}
                renderItem={renderGearIncludes}
                keyExtractor={(includeItem) => (includeItem)}
              />
            </View>
          }
        </View>
        <View style={gearCardRightSideWrapper}>
          <View style={gearCardBubble}>
            <Text style={gearCardBubbleText}>{item.powerDraw}W</Text>
          </View>
          <View style={{...gearCardBubble, height: 40}}>
            <Text style={gearCardBubbleText}>COST{'\n'}${item.avgPurchaseCost}</Text>
          </View>
          <View style={{...gearCardBubble, height: 40}}>
            <Text style={gearCardBubbleText}>RENT{'\n'}${item.rentalCost}</Text>
          </View>
          {item.notes &&
            <View style={gearCardNotes}>
              <Text style={{color: COLORS.WHITE}}>NOTES</Text>
              <View style={separatorBar}></View>
              <Text style={{color: COLORS.WHITE}}>{item.notes}</Text>
            </View>
          }
        </View>
      </View>
  );
}

  return (
    <View>
      <TouchableOpacity style={{...headerView, borderColor: containsDamaged ? COLORS.RED : COLORS.GOLD}} onPress={() => {
        if (expanded) {
          listScaleAnim.setValue(1);
          Animated.timing(listScaleAnim, {toValue: 0, duration: 400, useNativeDriver: true}).start(() => setExpanded(false));
        } else {
          setExpanded(true);
          listScaleAnim.setValue(0);
          Animated.timing(listScaleAnim, {toValue: 1, duration: 400, useNativeDriver: true}).start();
        }
      }}>
        <Text style={headerText}>{name}</Text>
      </TouchableOpacity>

      {expanded && 
        <Animated.View style={{transformOrigin: 'top', transform: [{scaleY: listScaleAnim}]}}>
          <FlatList
            data={data}
            renderItem={renderGearCard}
            keyExtractor={(gearItem) => (gearItem.name)}
          />
        </Animated.View>
      }
    </View>
  );
};

const headerView = {
  margin: 4,
  backgroundColor: COLORS.BLACK,
  borderWidth: 2,
  borderRadius: 10
}

const headerText = {
  padding: 5,
  margin: 'auto' as DimensionValue,
  color: COLORS.WHITE,
  fontWeight: 'bold' as 'bold'
}

const separatorBar = {
  backgroundColor: COLORS.WHITE,
  height: 2,
  marginBottom: 4
}

const gearCard = {
  borderRadius: 5,
  borderWidth: 2,
  borderColor: COLORS.GOLD,
  backgroundColor: COLORS.GRAY,
  marginLeft: 15,
  marginRight: 15,
  marginBottom: 15,
  flexDirection: 'row' as 'row'
}

const gearCardName = {
  borderTopLeftRadius: 3,
  borderBottomRightRadius: 5,
  backgroundColor: COLORS.GOLD,
  width: 190,
  paddingBottom: 6,
  paddingTop: 6
}

const gearCardBubble = {
  backgroundColor: COLORS.GOLD,
  height: 20,
  borderRadius: 10,
  marginTop: 4,
  marginBottom: 4,
  marginLeft: 4,
  marginRight: 4
}

const gearCardBubbleText = {
  margin: 'auto' as DimensionValue, 
  paddingLeft: 6, 
  paddingRight: 4, 
  color: COLORS.WHITE
}

const gearCardIncludes = {
  backgroundColor: COLORS.GOLD,
  borderBottomLeftRadius: 3,
  borderTopRightRadius: 5,
  alignSelf: 'flex-start' as FlexAlignType,
  padding: 5,
  marginTop: 'auto' as DimensionValue
}

const gearCardNotes = {
  marginTop: 5,
  padding: 5,
  backgroundColor: COLORS.GOLD,
  borderBottomRightRadius: 3,
  borderTopLeftRadius: 5
}

const gearCardRightSideWrapper = {
  alignItems: 'flex-end' as FlexAlignType,
  flex: 1
}

const gearCardLeftSideWrapper = {
  alignItems: 'flex-start' as FlexAlignType,
}

export default GearExpandable;