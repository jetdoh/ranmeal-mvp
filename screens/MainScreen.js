import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
//import components
import Card from "../components/Card";
import IconContainer from "../components/IconContainer";

//fetch data from Spoonacular API
import useRandomFetch from "../hooks/useRandomFetch";

//import neccessary function from firebase
import { collection, setDoc, onSnapshot, doc, getDoc } from "firebase/firestore";
import { database } from "../firebaseConfig";

//import swiper
import Swiper from "react-native-deck-swiper";

//Stack navigation
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import firebase auth
import { auth } from "../firebaseConfig";

//import Screen
import CalenderScreen from "./CalenderScreen";

export default function MainScreen() {
  //query for API
  const [query, setQuery] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    number: 3,
  });

  // //get variables data from database
  // useEffect(() => {
  //   const varRef = collection(database, "variables");
    
  //   const subscriber = onSnapshot(varRef, {
  //     next: (querySnapshot) => {
  //       const vars = querySnapshot.docs[0].data();
  //       setQuery({ ...vars, number: 3 });
  //     },
  //   });
  //   return () => subscriber();
  // }, []);

    //get variables data from database (users => uid => variables)
    useEffect(() => {
      const uid = auth.currentUser.uid;
      const userRef = collection(database, "users");
      const varRef = doc(userRef, uid);
      const getVar = async () => {
        await getDoc(varRef).then((doc) => {
          if (doc.exists()) {
            const vars = doc.data().var;
            setQuery({...vars, number: 3});
          } else {
            console.log("No such document!");
          }
        });
      };
      getVar();
    }, []);
  
  //delete this
  // useEffect(() => {
  //   const uid = auth.currentUser.uid;
  //   const userRef = collection(database, "users");
  //   const varRef = doc(userRef, uid);
    
  //   getDoc(varRef).then((doc) => {
  //     if (doc.exists()) {
  //       // const vars = doc.data();
  //       // setQuery({ ...vars, number: 3 });
  //       console.log(doc.data());
  //     } else {
  //       console.log("No such document!");
  //     }
  //   });
  // }, []);

  //meals in library
  const mealHolder = {
    calories: 0,
    carbs: "0g",
    fat: "0g",
    protein: "0g",
    id: 0,
    image: "URL",
    imageType: "", //usually JPG
    title: "Name of the meal",
  };

  //convert nutrition string to number (remove 'g' at the end)
  const convertNutritionToNumber = (proteinString, carbsString, fatString) => {
    const protein = parseInt(proteinString.slice(0, -1));
    const carbs = parseInt(carbsString.slice(0, -1));
    const fat = parseInt(fatString.slice(0, -1));
    return { protein: protein, carbs: carbs, fat: fat };
  };
  const [meal, setMeal] = useState(mealHolder);

  //fetch data from API
  const { data, loading, error, refetch } = useRandomFetch(query);
 
  useEffect(() => {
    refetch(query);
  }, [query]);

  //add meal to library
  const addMeal = async (index) => {
    // delete this 
    // //use setDoc to add data to the database only when not exist
    // const mealRef = doc(database, "mealsLibrary", data[index].id.toString());
    // await setDoc(mealRef, data[index], { merge: true });

    //add a subcollection of mealLibrary in user document
    //collection(users) => doc(uid) => collection(mealLibrary) => doc(mealId)
    const uid = auth.currentUser.uid;
    const userRef = collection(database, "users");
    const docRef = doc(userRef, uid)
    const mealLibraryCollection = collection(docRef, "mealLibrary");
    const mealLibraryDoc = doc(mealLibraryCollection, data[index].id.toString());
    await setDoc(mealLibraryDoc, {
      calories: data[index].calories,
      carbs: data[index].carbs,
      fat: data[index].fat,
      id: data[index].id,
      image: data[index].image,
      imageType: data[index].imageType,
      protein: data[index].protein,
      title: data[index].title,
    }, {merge: true});
    setMeal(mealHolder);
  };

  //onSwipedRight
  const navigation = useNavigation();
  const onSwipedRight = (index) => {
    addMeal(index);
    navigation.navigate("DetailScreenStack", { id: data[index].id }); //pass id , {meal: data[index]}
  };

  //setup for card
  const [index, setIndex] = useState(0);
  const onSwiped = () => {
    setIndex(index + 1);
  };

  const renderCard = (card) => {
    const nutrition = convertNutritionToNumber(
      card.protein,
      card.carbs,
      card.fat
    );

    return (
      <Card
        id={card.id}
        caption={card.title}
        imageSource={card.image}
        color="#FFCCDE"
        content={card.title}
        nutrition={nutrition}
        calories={card.calories}
      />
    );
  };
  
  //random meal screen
  const RanMeal = () => (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : query.calories === 0 ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error...</Text>
      ) : data === undefined ? (
        <Text>no result</Text>
      ) : (
        <Swiper
          marginTop={25}
          backgroundColor="#fff"
          cardHorizontalMargin={0}
          cardVerticalMargin={0}
          cards={data}
          cardIndex={index}
          renderCard={(card) => card && renderCard(card)}
          onSwiped={onSwiped} 
          onSwipedAll={() => {
            alert("you ran out of cards!");
          }}
          stackSize={3}
          stackScale={3}
          stackSeparation={20}
          // infinite
          disableTopSwipe
          disableBottomSwipe
          onSwipedLeft={() => {}} //TODO: add functionality to dump when swiped left using onSwipedLeft(() => {})
          onSwipedRight={(index) => onSwipedRight(index)} //it receives index of the swiped card
        />
      )}
      <IconContainer
        caption="logo"
        imageSource={require("../assets/icons/logo.png")}
      />
    </SafeAreaView>
  );

  //create native-stack navigator
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MainScreenStack"
    >
      <Stack.Screen name="MainScreenStack" component={RanMeal} />
      <Stack.Screen name="DetailScreenStack" component={CalenderScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
