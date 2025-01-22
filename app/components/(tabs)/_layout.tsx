import React, { useEffect, useState, createContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';

import { onValue, ref } from 'firebase/database';
import rtdb from '@/app/rtdb_config';

import Gear, { GearContainer } from '@/app/utils/Gear';
import Event from '@/app/utils/Event';
import Technician from '@/app/utils/Technician';

import { COLORS } from '@/app/globals';

export const GearContext = createContext({} as GearContainer);
export const EventContext = createContext<Event[]>([]);
export const TechContext = createContext<Technician[]>([]);


export default function TabLayout() {
  const [gear, setGear] = useState<GearContainer>({
    infrastructure: [],
    laserFixtures: [],
    lxFixtures: [],
    sfx: [],
    showControl: []
  });
  const [events, setEvents] = useState<Event[]>([]);
  const [techs, setTechs] = useState<Technician[]>([]);

  useEffect(() => {
    const gearRef = ref(rtdb, 'GearContainer'); //create reference to firebase rtdb at master gear container
    onValue(gearRef, snapshot => {
      if (snapshot.exists()) {
        var tempGear: GearContainer = {infrastructure: [], laserFixtures: [], lxFixtures: [], sfx: [], showControl: []};
        snapshot.forEach(container => { //for each category object in master container (infrastructure, lxFixtures, etc)
          container.forEach(gearItem => { //for each Gear item in category
            tempGear[container.key as keyof GearContainer].push(new Gear({...gearItem.val(), key: container.key + '/' + gearItem.key})); //get key of current category and push to corresponding Gear array a new Gear object with data from current item
            //structure of gear state is now a GearContainer object consisting of arrays for each category. Each array contains Gear objects
          });
        });
        setGear(tempGear);
      } else {console.log('USER OFFLINE');}
    });
    
    const techRef = ref(rtdb, 'TechnicianContainer'); //create reference to firebase rtdb at tech container
    onValue(techRef, snapshot => {
      if (snapshot.exists()) {
        var tempTechs: Technician[] = [];
        snapshot.forEach(tech => {
          tempTechs.push(new Technician({...tech.val(), key: tech.key})); //create new Technician with DB data
        });
        setTechs(tempTechs);
      } else {console.log('USER OFFLINE')}
    });

    const eventRef = ref(rtdb, 'EventContainer'); //create reference to firebase rtdb at event container
    onValue(eventRef, snapshot => {
      if (snapshot.exists()) {
        var tempEvents: Event[] = [];
        snapshot.forEach(event => {
          tempEvents.push(new Event({...event.val(), key: event.key})); //create new event for each item in DB container
        });
        setEvents(tempEvents);
      } else {console.log('USER OFFLINE');}
    });
  }, []); 
  
  return (
    <GearContext.Provider value={gear}>
    <TechContext.Provider value={techs}>
    <EventContext.Provider value={events}>
      <Tabs screenOptions={{
        tabBarActiveTintColor: COLORS.GOLD,
        tabBarInactiveTintColor: COLORS.WEAK_BROWN,
        tabBarStyle: {backgroundColor: COLORS.BLACK, height: 150},
        tabBarShowLabel: false
      }}>
      
        <Tabs.Screen
          name='InventoryScreen' 
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <View style={styles.tabIcon}>
                <Ionicons name={focused ? 'construct' : 'construct-outline'} color={color} size={50} />
              </View>
            )
          }}
        />
                
        <Tabs.Screen 
          name='CalendarScreen' 
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <View style={styles.tabIcon}>
                <Ionicons name={focused ? 'calendar' : 'calendar-outline'} color={color} size={50} />
              </View>
            )
          }}
        />

        <Tabs.Screen 
          name='FinanceScreen' 
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <View style={styles.tabIcon}>
                <Ionicons name={focused ? 'cash' : 'cash-outline'} color={color} size={50} />
              </View>
            )
          }}
        />
        
      </Tabs>
    </EventContext.Provider>
    </TechContext.Provider>
    </GearContext.Provider>    
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    height: 50,
    width: 50,
    marginTop: 50
  } 
});


