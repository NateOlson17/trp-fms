import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';

import { COLORS } from '@/app/globals';

import updateDB, { bindDBUpdater } from '@/app/DBUpdater';


export default function TabLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bindDBUpdater();
    updateDB(true).finally(() => setLoading(false));
  }, []);
  
  return (
    <View style={{flex: 1}}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    height: 50,
    width: 50,
    marginTop: 50
  } 
});


