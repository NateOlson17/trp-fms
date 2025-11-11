import { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';

import Ionicons from '@expo/vector-icons/Ionicons';

import AddEventModal from '@/app/components/CalendarScreenComponents/AddEventModal';

import globalStyles, { COLORS } from '@/app/globals';

import { GearContext, TechContext } from '@/app/components/(tabs)/_layout';


const CalendarScreen = () => {
  const gear = useContext(GearContext);
  const techs = useContext(TechContext);

  const [addModalVisible, setAddModalVisible] = useState(false);


  return(
    <View style={globalStyles.screenWrapper}>
      <CalendarList
        horizontal
        scrollEnabled
        pagingEnabled
        pastScrollRange={12}
        futureScrollRange={12}
        theme={{
          calendarBackground: COLORS.BLACK, 
          textSectionTitleColor: COLORS.GOLD,
          dayTextColor: COLORS.WHITE,
          todayTextColor: COLORS.GOLD,
          dotColor: COLORS.GOLD,
          monthTextColor: COLORS.GOLD
        }}
        renderHeader={date => {let dateObj = new Date(date); return <Text style={styles.headerText}>{dateObj.toLocaleString('en-EN', {month: 'long', year: 'numeric'})}</Text>}}
        markingType='custom'
        markedDates={{}}
        onDayPress={day => {console.log(day);}}
      />

      <TouchableOpacity onPress={() => setAddModalVisible(true)} style={styles.addButton}>
        <Ionicons name={'add-circle-outline'} color={COLORS.GOLD} size={100} />
      </TouchableOpacity>

      {addModalVisible && <AddEventModal techs={techs} onClose={() => setAddModalVisible(false)}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  headerText: {
    padding: 5,
    margin: 'auto',
    color: COLORS.GOLD,
    fontWeight: 'bold',
    fontSize: 22
  },

  addButton: {
    alignSelf: 'center', 
    marginTop: 'auto', 
    marginBottom: 20
  }
});

export default CalendarScreen;
