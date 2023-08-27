//Create an empty screen
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';

//use custom hook "useFetch"
import useFetch from '../hooks/useFetch';


const CalenderScreen = () => {

  const query = {
    maxCalories: 1401,
    number: 3,
    //other query parameters
  }

  const { data, loading, error, refetch } = useFetch(query);

  return (
    <SafeAreaView style = {styles.container}>
      <ScrollView>
      <Text style = {styles.text}>Calender Screen</Text>
      {loading ? <Text>Loading...</Text> : 
        error ? <Text>Error...</Text> :
        data === undefined ? <Text>no result</Text> :
        data.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => {}} style ={{marign: 10, alignItems: 'center'}}>
              <Text style = {{fontSize: 20,}}> {item.title} </Text>
              {console.log(item.image)}
              <Image style={{ height: 100, width: 100, borderWidth: 2 }} source={{ uri: item.image }} />
            </TouchableOpacity>
          )
        })
      }
      </ScrollView>
    </SafeAreaView>
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