import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'

const CalenderScreen = () => {
  return (
    <SafeAreaView style = {styles.container}>
      <Text style = {styles.text}>Calender Screen</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
      fontSize: 30,
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 20,
      },
});

export default CalenderScreen
