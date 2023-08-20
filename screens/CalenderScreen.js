//Create an empty screen
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const CalenderScreen = () => {
  return (
    <View style = {styles.container}>
      <Text style = {styles.text}>Calender Screen</Text>
    </View>
  );
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
export default CalenderScreen;