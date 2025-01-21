import React, { useEffect, useState, createContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';

import { onValue, ref } from 'firebase/database';
import rtdb from '@/app/rtdb_config';

import Gear, { GearContainer } from '@/app/utils/Gear';
import Event from '@/app/utils/Event';
import Technician from '@/app/utils/Technician';
import ServiceTicket from '@/app/utils/ServiceTicket';

import Ionicons from '@expo/vector-icons/Ionicons';

import { COLORS } from '@/app/globals'

export const GearContext = createContext<GearContainer>({} as GearContainer);
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
    onValue(gearRef, (snapshot) => {
      if (snapshot.exists()) {
        var tempGear: GearContainer = {infrastructure: [], laserFixtures: [], lxFixtures: [], sfx: [], showControl: []};
        snapshot.forEach(container => { //for each category object in master container (infrastructure, lxFixtures, etc)
          container.forEach(gearItem => { //for each Gear item in category object
            let g = gearItem.val();
            tempGear[container.key as keyof GearContainer].push(new Gear(
              g.name,
              g.includes,
              g.avgPurchaseCost,
              g.rentalCost,
              g.powerDraw,
              g.qtyOwned,
              (g.serviceTickets || []) as ServiceTicket[],
              g.notes,
              container.key + '/' + gearItem.key
            )) //get key of current category object and push to corresponding gear array a new Gear object with data from current item
            //structure of gear state is now a GearContainer object consisting of arrays for each category. Each array contains Gear objects
          });
        });
        setGear(tempGear);
      } else {
        console.log('USER OFFLINE');
        //give notif that database fetch failed
        //use cached data (UNIMPLEMENTED)
      }
    });
    
    const techRef = ref(rtdb, 'TechnicianContainer'); //create reference to firebase rtdb at tech container
    onValue(techRef, (snapshot) => {
      if (snapshot.exists()) {
        var tempTechs: Technician[] = [];
        snapshot.forEach(tech => {
          let t = tech.val();
          tempTechs.push(new Technician(t.name, t.contact, t.role, tech.key)); //create new Technician with DB data
        });
        setTechs(tempTechs);
      } else {
        console.log('USER OFFLINE');
        //give notif that database fetch failed
        //use cached data (UNIMPLEMENTED)
      }
    });

    const eventRef = ref(rtdb, 'EventContainer'); //create reference to firebase rtdb at event container
    onValue(eventRef, (snapshot) => {
      if (snapshot.exists()) {
        var tempEvents: Event[] = [];
        snapshot.forEach(event => {
          let e = event.val();
          tempEvents.push(new Event(
            e.name, 
            e.location,
            e.client,
            e.manager as Technician,
            e.startDate,
            e.endDate,
            e.quotePrice,
            e.invoicePrice,
            (e.gear || []) as Gear[],
            (e.techs || []) as Technician[],
            e.techRates || [],
            e.techsPaid || [],
            e.dateQuoted,
            e.dateConfirmed,
            e.dateInvoiced,
            e.datePaid,
            e.subrentals || [],
            e.subrentalAmounts || [],
            e.otherCosts || [],
            e.otherCostsAmount || [],
            e.outbounded,
            e.outboundNotes,
            e.inbounded,
            e.inboundNotes,
            event.key
          )); //create new event for each item in db container
        });
        setEvents(tempEvents);
      } else {
        console.log('USER OFFLINE');
        //give notif that database fetch failed
        //use cached data (UNIMPLEMENTED)
      }
    });
  }, []); 
  
  return (
    <GearContext.Provider value={gear}>
    <TechContext.Provider value={techs}>
    <EventContext.Provider value={events}>
      <Tabs screenOptions={{
        tabBarActiveTintColor: COLORS.GOLD,
        tabBarInactiveTintColor: COLORS.WEAK_BROWN,
        tabBarStyle: {
          backgroundColor: COLORS.BLACK,
          height: 150
        },
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


