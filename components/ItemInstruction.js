import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useFonts } from 'expo-font';

const WIDTH = '100%';

const ItemInstuction = ({ instruction, index }) => {

    //Load font
  const [fontsLoaded] = useFonts({
    'TitanOne-Regular': require('../assets/fonts/TitanOne-Regular.ttf'), // Match the font family name
  });

  if (!fontsLoaded) {
    // Return a placeholder or loading indicator if fonts are not yet loaded 
    return null;
  }

  return (
      <View style={styles.container}>
        <View style = {styles.indexContainer}>
            <Text style = {styles.index}>{index + 1}.</Text>
        </View>
        <View style = {styles.contentContainer}>
          <Text style = {styles.text}>{instruction}</Text>
        </View>
      </View>
  );
};

export default ItemInstuction;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    paddingLeft: 20,
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 5, // Add elevation for shadow effect on Android
    shadowOffset: {
        width: 4,
        height: 4,
      },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
    contentContainer: {
    flex: 5,
    height: '100%',
    marginLeft: '5%',
    marginRight: '7%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    },
    indexContainer: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },
    text: {
        fontSize: 15,
        fontFamily: 'TitanOne-Regular',
        textAlign: 'center',
        color: 'black',
    },
    index: {
        fontSize: 30,
        fontFamily: 'TitanOne-Regular',
        textAlign: 'center',
        color: '#E17992',
    },
});
