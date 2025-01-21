import { useState } from 'react';
import { View, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';

import Ionicons from '@expo/vector-icons/Ionicons';

import globalStyles, { COLORS } from '@/app/globals';

const addEvent = () => {

}

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

          <Modal animationType="fade" transparent={true} visible={addModalVisible} onRequestClose={() => setAddModalVisible(false)}>
            <View style={styles.addModal}>
              <View style={styles.addModalExitButtons}>
                <TouchableOpacity onPress={() => setAddModalVisible(false)}>
                  <Ionicons name={'close-circle'} color={COLORS.RED} size={70}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setAddModalVisible(false); addEvent()}}>
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
    margin: 20,
    marginTop: 60,
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
