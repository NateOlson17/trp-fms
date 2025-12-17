import { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';

import Ionicons from '@expo/vector-icons/Ionicons';

import AddEventModal from '@/app/components/CalendarScreenComponents/AddEventModal';
import EventDetail from '@/app/components/CalendarScreenComponents/EventDetail';

import globalStyles, { COLORS, dateToLocalTrunc } from '@/app/globals';

import { EventContext, GearContext, TechContext } from '@/app/components/(tabs)/_layout';
import { STATUS } from '@/app/utils/Event';


const CalendarScreen = () => {
  const gear = useContext(GearContext);
  const events = useContext(EventContext);
  const techs = useContext(TechContext);

  const getEventDates = () => {
    let newEventDates: any[] = [];

    events.forEach(e => {
      newEventDates.push([new Date(dateToLocalTrunc(e.startDate)).toISOString().slice(0, 10), {startingDay: true, endingDay: dateToLocalTrunc(e.startDate) == dateToLocalTrunc(e.endDate), color: e.status.color, textColor: e.status == STATUS.OUTBOUNDED ? COLORS.BLACK : null}]);
      if (dateToLocalTrunc(e.startDate) != dateToLocalTrunc(e.endDate)) {
        let iterDate = e.startDate + (1000 * 60 * 60 * 24);
        while (dateToLocalTrunc(iterDate) < dateToLocalTrunc(e.endDate)) {
          newEventDates.push([new Date(dateToLocalTrunc(iterDate)).toISOString().slice(0, 10), {color: e.status.color, textColor: e.status == STATUS.OUTBOUNDED ? COLORS.BLACK : null}]);
          iterDate += (1000 * 60 * 60 * 24);
        }
        newEventDates.push([new Date(dateToLocalTrunc(e.endDate)).toISOString().slice(0, 10), {endingDay: true, color: e.status.color, textColor: e.status == STATUS.OUTBOUNDED ? COLORS.BLACK : null}]);
      }
    });

    return Object.fromEntries(newEventDates);
  }

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [eventDetailVisible, setEventDetailVisible] = useState(false);
  const [eventDates, setEventDates] = useState(getEventDates());
  const [currentDate, setCurrentDate] = useState(new Date().getTime());


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
          todayTextColor: COLORS.WHITE,
          monthTextColor: COLORS.GOLD
        }}
        renderHeader={date => <Text style={styles.headerText}>{new Date(date).toLocaleString('en-EN', {month: 'long', year: 'numeric'})}</Text>}
        markingType='period'
        markedDates={eventDates}
        onDayPress={day => {setCurrentDate(day.timestamp); if (events.filter(e => dateToLocalTrunc(e.startDate) <= currentDate && currentDate <= dateToLocalTrunc(e.endDate)).length) setEventDetailVisible(true);}}
      />

      {eventDetailVisible && <EventDetail currDate={currentDate} events={events.filter(e => dateToLocalTrunc(e.startDate) <= currentDate && currentDate <= dateToLocalTrunc(e.endDate))} techs={techs} gear={gear} onClose={() => setEventDetailVisible(false)}/>}

      <TouchableOpacity onPress={() => setAddModalVisible(true)} style={styles.addButton}>
        <Ionicons name={'add-circle-outline'} color={COLORS.GOLD} size={100} />
      </TouchableOpacity>

      {addModalVisible && <AddEventModal techs={techs} onClose={() => {setAddModalVisible(false); setEventDates(getEventDates())}}/>}
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
