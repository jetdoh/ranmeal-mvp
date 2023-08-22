import React from 'react';
import { Text, View, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';

const marginHeader = Dimensions.get('window').height * 0.20;

export default function ContentContainer({color, content, nutrition}) {
  const [fontsLoaded] = useFonts({
    'TitanOne-Regular': require('../assets/fonts/TitanOne-Regular.ttf'), // Match the font family name
  });

  if (!fontsLoaded) {
    // Return a placeholder or loading indicator if fonts are not yet loaded 
    return null;
  }

// calculate width of each bar chart
  const { protein, carbs, fat } = nutrition;
  const sum = protein + carbs + fat;
  const proteinWidth = (protein / sum) * 70;
  const carbsWidth = (carbs / sum) * 70;
  const fatWidth = (fat / sum) * 70;

  return (
    <View style={styles.container}>
      <View style={[styles.contentContainer, {backgroundColor: color}]}>
        <Text style={styles.textHeader}>{content}</Text>
        <View style={styles.nutritionContainer}>
          <Text style={styles.textNutrition}>Protein : </Text>
          <View style = {[styles.proteinBarChart, {width: `${proteinWidth}%`}]}></View>
        </View>
        <View style={styles.nutritionContainer}>
          <Text style={styles.textNutrition}>Fat : </Text>
          <View style = {[styles.fatBarChart, {width: `${fatWidth}%`}]}></View>
        </View>
        <View style={styles.nutritionContainer}>
          <Text style={styles.textNutrition}>Carbs : </Text>
          <View style = {[styles.carbsBarChart, {width: `${carbsWidth}%`}]}></View>
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    alignSelf: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  nutritionContainer: {
    marginTop: 10,
    marginBottom: 10,
    height: 32,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  contentContainer: {
    margin: 1,
    height: '70%',
    backgroundColor: '#fff',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textHeader: {
    marginTop: marginHeader,
    marginBottom: 10,
    width: '80%',
    fontSize: 35,
    fontFamily: 'TitanOne-Regular',
    textAlign: 'center',
    color: '#E17992',
  },
  textNutrition:{
    width: '40%',
    marginRight: '5%',
    fontSize: 20,
    fontFamily: 'TitanOne-Regular',
    textAlign: 'right',
    alignSelf: 'center',
    color: '#E17992',
  },

  
//to do: make bar chart dynamicallly change width base on amount of nutrition
  proteinBarChart: {
    backgroundColor: 'red',
    marginRight: '5%',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
  carbsBarChart: {
    backgroundColor: 'green',
    marginRight: '5%',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
  fatBarChart: {
    backgroundColor: 'yellow',
    marginRight: '5%',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
});