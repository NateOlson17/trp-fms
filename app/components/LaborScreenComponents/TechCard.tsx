import { View, TouchableOpacity, StyleSheet, FlatList, Text} from 'react-native';
import * as Linking from 'expo-linking';

import Ionicons from '@expo/vector-icons/Ionicons';

import Technician from '@/app/utils/Technician';


import globalStyles, { COLORS } from '@/app/globals';


const TechCard = (props: {tech: Technician}) => (
  <View style={styles.card}>
    <View style={{flexDirection: 'row'}}>
      <View style={styles.cardName}>
        <Text style={{color: COLORS.WHITE}}>{props.tech.name}</Text>
      </View>
      <View style={{...styles.cardBubble, alignSelf: 'center'}}>
        <Text style={styles.cardBubbleText}>{props.tech.location}</Text>
      </View>

      <TouchableOpacity style={{marginLeft: 'auto', marginTop: 3}} onPress={() => {}}>
        <Ionicons name={'create-outline'} color={COLORS.GOLD} size={30}/>
      </TouchableOpacity>
      <TouchableOpacity style={{marginLeft: 5, marginTop: 3, marginRight: 4}} onPress={props.tech.delete}>
        <Ionicons name={'trash-outline'} color={COLORS.RED} size={30}/>
      </TouchableOpacity>
    </View>

    <View style={styles.contactContainer}>
      <View style={styles.cardBubble}>
        <Text style={styles.cardBubbleText}>{props.tech.contact}</Text>
      </View>
      {props.tech.contact.includes('@') ?
        <TouchableOpacity  onPress={() => Linking.openURL(`mailto:${props.tech.contact}`)} style={{marginLeft: 5}}>
          <Ionicons name={'mail'} color={COLORS.GOLD} size={20}/>
        </TouchableOpacity>
      :
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity  onPress={() => Linking.openURL(`tel:${props.tech.contact}`)} style={{marginLeft: 5}}>
            <Ionicons name={'call'} color={COLORS.GOLD} size={20} />
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => Linking.openURL(`sms:${props.tech.contact}`)} style={{marginLeft: 10}}>
            <Ionicons name={'chatbubble'} color={COLORS.GOLD} size={20} />
          </TouchableOpacity>
        </View>
      }
    </View>

    <View style={styles.rolesContainer}>
      {Object.entries(props.tech.roles).every(role => role[1] == 0) &&
        <View style={styles.cardBubble}>
          <Text style={styles.cardBubbleText}>HAND</Text>
        </View>
      }
      <FlatList
        data={Object.entries(props.tech.roles).filter(role => role[1] != 0)}
        renderItem={({item}) =>
          <View style={styles.cardBubble}>
            <Text style={styles.cardBubbleText}>{`${(item[0] == 'lsr' ? item[0] : item[0].slice(0, 1)).toUpperCase()}${4 - item[1]}`}</Text>
          </View>
        }
        keyExtractor={role => role[0]}
        horizontal
        scrollEnabled={false}
      />
    </View>

    {props.tech.notes &&
        <View style={styles.cardNotes}>
          <Text style={{color: COLORS.WHITE}}>NOTES</Text>
          <View style={styles.separatorBar}></View>
          <Text style={{color: COLORS.WHITE}}>{props.tech.notes}</Text>
        </View>
      }  
  </View>
)

const styles = StyleSheet.create({
card: {
    ...globalStyles.border,
    borderRadius: 5,
    backgroundColor: COLORS.GRAY,
    margin: 15,
    marginTop: 0,
    minHeight: 120
  },

  cardName: {
    borderTopLeftRadius: 3,
    borderBottomRightRadius: 5,
    backgroundColor: COLORS.GOLD,
    paddingBottom: 6,
    paddingTop: 6,
    paddingLeft: 4,
    paddingRight: 10,
    marginRight: 5
  },

  contactContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 5
  },

  rolesContainer: {
    marginRight: 'auto',
    marginLeft: 5,
    marginTop: 10
  },

  cardBubble: {
    backgroundColor: COLORS.GOLD,
    height: 20,
    borderRadius: 10,
    margin: 4,
    marginTop: 2
  },

  cardBubbleText: {
    margin: 'auto', 
    paddingLeft: 6, 
    paddingRight: 6, 
    color: COLORS.WHITE
  },

  cardNotes: {
    marginTop: 10,
    padding: 5,
    backgroundColor: COLORS.GOLD,
  },

  separatorBar: {
    backgroundColor: COLORS.WHITE,
    height: 2,
    marginBottom: 4
  }
});

export default TechCard;