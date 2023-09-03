import React from 'react';
import { SafeAreaView, View, Image } from 'react-native';

//import screens
import MainScreen from './screens/MainScreen';
import LibraryScreen from './screens/LibraryScreen';
import SettingScreen from './screens/SettingScreen';

//import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Stack navigation
import {NavigationContainer, useNavigation} from '@react-navigation/native';
//import navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//create a bottom tab navigator
const Tab = createBottomTabNavigator();
const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="MainScreen"
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
        name="LibraryScreen" 
        component={LibraryScreen} 
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
          ),
        }}
        />
      <Tab.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
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


