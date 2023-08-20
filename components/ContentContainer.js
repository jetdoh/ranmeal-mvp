import React from 'react';
import { Text, View, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';

export default function ContentContainer({color, content}) {
  const [fontsLoaded] = useFonts({
    'TitanOne-Regular': require('../assets/fonts/TitanOne-Regular.ttf'), // Match the font family name
  });

  if (!fontsLoaded) {
    // Return a placeholder or loading indicator if fonts are not yet loaded 
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.space}>
      </View>

      <View style={[styles.textContainer, {backgroundColor: color}]}>
        <Text style={styles.text}>{content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    alignSelf: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  space: {
    //just an empty view to take up space
    flex: 1,

    },
  textContainer: {
    //modify this
    flex: 2.5,
    margin: 1,
    backgroundColor: '#fff',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: 'TitanOne-Regular',
    color: '#E17992',
  },
});