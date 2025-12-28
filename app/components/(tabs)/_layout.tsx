import React, { useEffect, useState, createContext, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';

import { GearContainer } from '@/app/utils/Gear';
import Event from '@/app/utils/Event';
import Technician from '@/app/utils/Technician';

import { COLORS } from '@/app/globals';

import updateDB, { bindDBUpdater } from '@/app/DBUpdater';


export const GearContext = createContext({} as GearContainer);
export const EventContext = createContext<Event[]>([]);
export const TechContext = createContext<Technician[]>([]);

export default function TabLayout() {
  const [gear, setGear] = useState<GearContainer>({infrastructure: [], laserFixtures: [], lxFixtures: [], sfx: [], showControl: [], cable: []});
  const [events, setEvents] = useState<Event[]>([]);
  const [techs, setTechs] = useState<Technician[]>([]);

  const [loading, setLoading] = useState(true);

  const gearRef = useRef(gear);
  const eventsRef = useRef(events);
  const techsRef = useRef(techs);

  useEffect(() => {gearRef.current = gear;}, [gear]);
  useEffect(() => {eventsRef.current = events;}, [events]);
  useEffect(() => {techsRef.current = techs;}, [techs]);

  useEffect(() => {
    bindDBUpdater(gearRef, eventsRef, techsRef, setGear, setEvents, setTechs);
    updateDB(true).finally(() => setLoading(false));
  }, []);
  
  return (
    <GearContext.Provider value={gear}>
    <TechContext.Provider value={techs}>
    <EventContext.Provider value={events}>
      {loading ?
        <View style={{flex: 1, backgroundColor: COLORS.BLACK, alignContent: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size='large' color={COLORS.GOLD}/>
        </View>
      :
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
            name='LaborScreen' 
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color }) => (
                <View style={styles.tabIcon}>
                  <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={50} />
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
      }
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


