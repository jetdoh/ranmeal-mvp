import React from 'react';
import { SafeAreaView, View, Image } from 'react-native';
//import navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//import screens
import MainScreen from './screens/MainScreen';
import CalenderScreen from './screens/CalenderScreen';
import HomeScreen from './screens/HomeScreen';
import LibraryScreen from './screens/LibraryScreen';

//import navigation
import { NavigationContainer, useNavigation } from "@react-navigation/native";

//create a bottom tab navigator
const Tab = createBottomTabNavigator();

//import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: '#000',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          tabBarLabel: 'RanMeal',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="registered-trademark" color={color} size={size} />
          ),
        }}
        />
      <Tab.Screen
        name="CalenderScreen"
        component={CalenderScreen} 
        options={{
          tabBarLabel: 'Calender',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          ),
        }}
        />
      <Tab.Screen 
        name="LibraryScreen" 
        component={LibraryScreen} 
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
          ),
        }}
        />
    </Tab.Navigator>
  );
}


export default function App() {

  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}


