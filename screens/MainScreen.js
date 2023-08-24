import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

//import components
import Card from '../components/Card';
import IconContainer from '../components/IconContainer';

//import data
import data from '../data';
//import neccessary function from firebase
import { collection, addDoc, setDoc, onSnapshot, doc } from 'firebase/firestore';
import { database } from '../firebaseConfig';

//import swiper
import Swiper from 'react-native-deck-swiper';

export default function MainScreen() {

  //setup for database
  const mealHolder = {
    name: '',
    imageSource: '',
    color: '',
    description: '',
    nutrition: {
      protein: 0,
      carbs: 0,
      fat: 0,
    },
  };
  const [meal, setMeal] = useState(mealHolder);
  const [meals, setMeals] = useState([]); //array of meals

  //update meals array when database is updated
  //useEffect to update the list
  useEffect(() => {
    const mealRef = collection(database, "todoList");

    const subscriber = onSnapshot(mealRef, {
      next: (querySnapshot) => {
        const meals = [] ;
        querySnapshot.docs.forEach((doc) => {
          console.log("UPDATED");
          meals.push({
            id: doc.id,
            ...doc.data(),
          })
        });
        setMeals(meals);
      }
    });

    return () => subscriber();
  }, []);

  const addMeal = async (index) => {
    //use setDoc to add data to the database only when not exist
    const mealRef = doc(database, "mealsLibrary", data[index].name);
    await setDoc(mealRef, data[index], {merge: true});
    console.log("ADDED");
    alert('Meal added to library!') //todo : use  stack navigator to navigate to pop-up screen
    setMeal(mealHolder);
  }


  //setup for card
  const [index, setIndex] = useState(0);

  const onSwiped = () => {
    setIndex(index + 1);
  }

  const renderCard = (card) => {
    return (
      <Card 
      caption={card.caption}
      imageSource={card.imageSource} 
      color={card.color} 
      content={card.name} 
      nutrition={card.nutrition}
        />
    )  
  }


  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        marginTop={25}
        backgroundColor='#fff'
        cardHorizontalMargin={0}
        cardVerticalMargin={0}
        cards={data} //Todo: replace with data from database
        cardIndex={index}
        renderCard={(card) => 
          <Card 
            caption={card.caption}
            imageSource={card.imageSource} 
            color={card.color} 
            content={card.name} 
            nutrition={card.nutrition}
            />}
        onSwiped={onSwiped} //change to onSwipted
        onSwipedAll={() => { alert('you ran out of cards!') }}
        stackSize={3}
        stackScale={3}
        stackSeparation={20}
        infinite
        disableTopSwipe
        disableBottomSwipe
        onSwipedLeft={() => {}}//TODO: add functionality to dump when swiped left using onSwipedLeft(() => {})
        onSwipedRight={(index) => addMeal(index)} //it receives index of the swiped card
      />
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