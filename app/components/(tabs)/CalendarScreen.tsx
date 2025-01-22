import { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';

import Ionicons from '@expo/vector-icons/Ionicons';

import AddEventModal from '@/app/components/CalendarScreenComponents/AddEventModal';

import globalStyles, { COLORS } from '@/app/globals';


const CalendarScreen = () => {
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
          />

          <TouchableOpacity onPress={() => {setAddModalVisible(true)}} style={styles.addButton}>
            <Ionicons name={'add-circle-outline'} color={COLORS.GOLD} size={100} />
          </TouchableOpacity>

          {/* {addModalVisible && <AddEventModal/>} */}
        </View>
    );
}

const styles = StyleSheet.create({
   addButton: {
    alignSelf: 'center', 
    marginTop: 'auto', 
    marginBottom: 20
  }
});

export default CalendarScreen;
