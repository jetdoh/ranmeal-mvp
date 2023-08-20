import React from 'react';
import { SafeAreaView } from 'react-native';
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
import IconContainer from './components/IconContainer';

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
      <Tab.Screen name="MainScreen" component={MainScreen} />
      <Tab.Screen
        name="CalenderScreen"
        component={CalenderScreen} />
      <Tab.Screen name="LibraryScreen" component={LibraryScreen} />
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


