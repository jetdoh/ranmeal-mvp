import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import {  } from 'react-native-feather';

//import components
import Card from '../components/Card';
import IconContainer from '../components/IconContainer';

//fetch data from Spoonacular API
import useFetch from '../hooks/useFetch';

//import neccessary function from firebase
import { collection, addDoc, setDoc, onSnapshot, doc } from 'firebase/firestore';
import { database } from '../firebaseConfig';

//import swiper
import Swiper from 'react-native-deck-swiper';

export default function MainScreen() {

  //query for API
  const [query, setQuery] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    number: 3,
  });  

  //get variables data from database
  useEffect(() => {
    const varRef = collection(database, "variables");
  
    const subscriber = onSnapshot(varRef, {
      next: (querySnapshot) => {
        const vars = querySnapshot.docs[0].data();
        console.log("VARS");
        console.log(vars);
        setQuery({...vars, number: 3});
      }
    });
    return () => subscriber();
  }, []);


  //meals in library
  const mealHolder =  {
    "calories": 0,
    "carbs": "0g", 
    "fat": "0g", 
    "id": 0,
    "image": "URL",
    "imageType": "", //usually JPG
    "protein": "0g",
    "title": "Name of the meal"
}

  //convert nutrition string to number (remove 'g' at the end)
  const convertNutritionToNumber = (proteinString, carbsString, fatString) => {
    const protein = parseInt(proteinString.slice(0, -1));
    const carbs = parseInt(carbsString.slice(0, -1));
    const fat = parseInt(fatString.slice(0, -1));
    return {protein: protein, carbs: carbs, fat: fat};
  }
  const [meal, setMeal] = useState(mealHolder);
  const [meals, setMeals] = useState([]); //array of meals
  
  //fetch data from API
  const {data, loading, error, refetch} = useFetch(query);

  useEffect(() => {
    refetch(query);
  },[query]);


  //add meal to library
  const addMeal = async (index) => {
    //use setDoc to add data to the database only when not exist
    const mealRef = doc(database, "mealsLibrary", data[index].id.toString());
    await setDoc(mealRef, data[index], {merge: true});
    console.log("ADDED");
    //todo : use  stack navigator to navigate to pop-up screen
    setMeal(mealHolder);
  }

  //setup for card
  const [index, setIndex] = useState(0);
  const onSwiped = () => {
    setIndex(index + 1);
  }

  const renderCard = (card) => {
    const nutrition = convertNutritionToNumber(card.protein, card.carbs, card.fat);

    return (
      <Card 
      id = {card.id}
      caption={card.title}
      imageSource={card.image} 
      color= '#FFCCDE' 
      content={card.title} 
      nutrition={nutrition}
      calories={card.calories}
        />
    )  
  }


  return (
    <SafeAreaView style={styles.container}>
      {loading ? <Text>Loading...</Text> : 
        query.calories === 0 ? <Text>Loading...</Text> :
        error ? <Text>Error...</Text> :
        data === undefined ? <Text>no result</Text> :
        <Swiper
        marginTop={25}
        backgroundColor='#fff'
        cardHorizontalMargin={0}
        cardVerticalMargin={0}
        cards={data} 
        cardIndex={index}
        renderCard={(card) => renderCard(card)}
        onSwiped={onSwiped} //change to onSwipted
        onSwipedAll={() => { alert('you ran out of cards!') }}
        stackSize={3}
        stackScale={3}
        stackSeparation={20}
        // infinite
        disableTopSwipe
        disableBottomSwipe
        onSwipedLeft={() => {}}//TODO: add functionality to dump when swiped left using onSwipedLeft(() => {})
        onSwipedRight={(index) => addMeal(index)} //it receives index of the swiped card
      />}
      <IconContainer caption='logo' imageSource={require('../assets/icons/logo.png')} />
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
});