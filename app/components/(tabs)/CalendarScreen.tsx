import { useState } from 'react';
import { View, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';

import Ionicons from '@expo/vector-icons/Ionicons';

import { COLORS } from '@/app/globals';

const CalendarScreen = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
    return(
        <View style={styles.screenWrapper}>
          <CalendarList
            horizontal
            pagingEnabled
            pastScrollRange={12}
            futureScrollRange={12}
            scrollEnabled
            showScrollIndicator={false}
            theme={{
              backgroundColor: COLORS.BLACK,
              calendarBackground: COLORS.BLACK, 
              textSectionTitleColor: COLORS.GOLD,
              selectedDayBackgroundColor: 'transparent',
              selectedDayTextColor: COLORS.GOLD,
              todayTextColor: COLORS.WHITE,
              todayBackgroundColor: COLORS.WEAK_BROWN,
              dayTextColor: COLORS.GRAY,
              dotColor: COLORS.GOLD,
              selectedDotColor: COLORS.GOLD,
              monthTextColor: COLORS.GOLD,
            }}
          />

          <Modal animationType="fade" transparent={true} visible={addModalVisible} onRequestClose={() => setAddModalVisible(false)}>
            <View style={styles.addModal}>
              <View style={styles.addModalExitButtons}>
                <TouchableOpacity onPress={() => {setAddModalVisible(false)}}>
                  <Ionicons name={'close-circle'} color={COLORS.RED} size={70}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setAddModalVisible(false)}}>
                  <Ionicons name={'checkmark-circle'} color={COLORS.GREEN} size={70}/>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <TouchableOpacity onPress={() => {setAddModalVisible(true)}} style={styles.addButton}>
            <Ionicons name={'add-circle-outline'} color={COLORS.GOLD} size={100} />
          </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  screenWrapper: {
    paddingTop: 50, 
    backgroundColor: COLORS.BLACK, 
    flex: 1
  },

  addButton: {
    alignSelf: 'center', 
    marginTop: 'auto', 
    marginBottom: 20
  },

  addModal: {
    backgroundColor: COLORS.GRAY,
    borderColor: COLORS.GOLD,
    borderWidth: 3,
    borderRadius: 20,
    marginTop: 60,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 170,
    flex: 1
  },

  addModalExitButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 'auto',
    marginBottom: 20
  }
});

export default CalendarScreen;
