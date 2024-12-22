import React, { useEffect, useState, createContext } from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';

import { onValue, ref } from 'firebase/database';
import { rtdb } from '@/app/rtdb_config';

import Gear, { GearContainer } from '@/app/utils/Gear';
import Event from '@/app/utils/Event';
import Technician from '@/app/utils/Technician';

import Ionicons from '@expo/vector-icons/Ionicons';

import { COLORS } from '@/app/globals'

export const GearContext = createContext<GearContainer>({} as GearContainer);

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
    const gearRef = ref(rtdb, "GearContainer"); //create reference to firebase rtdb at master gear container
    onValue(gearRef, (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach(container => { //for each category object in master container (infrastructure, lxFixtures, etc)
          container.forEach(gearItem => { //for each Gear item in category object
            let g = gearItem.val();
            gear[container.key as keyof GearContainer].push(new Gear(g.name, g.includes, g.purchaseCost, g.rentalCost, g.powerDraw, g.qtyOwned, g.notes)) //get key of current category object and push to corresponding gear array a new Gear object with data from current item
            //structure of gear state is now a GearContainer object consisting of arrays for each category. Each array contains Gear objects
          });
        });
      } else {
        console.log("USER OFFLINE");
        //give notif that database fetch failed
        //use cached data (UNIMPLEMENTED)
      }
    });
    const eventRef = ref(rtdb, "EventContainer"); //create reference to firebase rtdb at master event container
    onValue(eventRef, (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach(event => {
          let e = event.val();
          events.push(new Event(e.name, e.location, e.startDate, e.endDate, e.client));
        });
      } else {
        console.log("USER OFFLINE");
        //give notif that database fetch failed
        //use cached data (UNIMPLEMENTED)
      }
    });
    const techRef = ref(rtdb, "TechnicianContainer"); //create reference to firebase rtdb at master tech container
    onValue(techRef, (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach(tech => {
          let t = tech.val();
          techs.push(new Technician(t.location, t.contact, t.level));
        });
      } else {
        console.log("USER OFFLINE");
        //give notif that database fetch failed
        //use cached data (UNIMPLEMENTED)
      }
    });
  }, []); 
  
  return (
    <GearContext.Provider value={gear}>
      <Tabs screenOptions={{
        tabBarActiveTintColor: COLORS.GOLD,
        tabBarInactiveTintColor: COLORS.GOLD,
        tabBarStyle: {
          backgroundColor: COLORS.BLACK,
          height: 150
        },
        tabBarShowLabel: false
      }}>
        <Tabs.Screen
          name="InventoryScreen" 
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <View style={iconStyle}>
                <Ionicons name={focused ? 'construct' : 'construct-outline'} color={color} size={50} />
              </View>
            )
          }}/>
        <Tabs.Screen 
          name="CalendarScreen" 
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <View style={iconStyle}>
                <Ionicons name={focused ? 'calendar' : 'calendar-outline'} color={color} size={50} />
              </View>
            )
          }}
          />
        <Tabs.Screen 
          name="FinanceScreen" 
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <View style={iconStyle}>
                <Ionicons name={focused ? 'cash' : 'cash-outline'} color={color} size={50} />
              </View>
            )
          }}
        />
      </Tabs>
    </GearContext.Provider>
    
  );
}

const iconStyle = {
  height: 50,
  width: 50,
  marginTop: 50
};  


