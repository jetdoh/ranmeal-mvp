import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
} from "react-native";
//import components
import Card from "../components/Card";
import IconContainer from "../components/IconContainer";

//fetch data from Spoonacular API
import useRandomFetch from "../hooks/useRandomFetch";

//import neccessary function from firebase
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
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
import RanOutOfCardScreen from "./RanOutOfCardScreen";
import LoadingScreen from "./LoadingScreen";

export default function MainScreen() {
  //query for API
  const number = 3;
  const [query, setQuery] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    number: number,
  });

  //get variables data from database (users => uid => variables)
  useEffect(() => {
    const uid = auth.currentUser.uid;
    const userRef = collection(database, "users");
    const varRef = doc(userRef, uid);
    const getVar = async () => {
      await getDoc(varRef).then((doc) => {
        if (doc.exists()) {
          const vars = doc.data().var;
          // vars.calories !== 0 && console.log("vars : ", vars);
          vars.calories !== 0 && setQuery({ ...vars, number: number });
        } else {
          console.log("No such document!");
        }
      });
    };
    getVar();
  }, []);

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
    if (query.calories !== 0 && query.number) {
      //refetch when the query is changed already
      // console.log("query changed, refetch!");
      // console.log("query : ", query);
      refetch(query);
    }
  }, [query]);

  //add meal to library
  const addMeal = async (index) => {
    //add a subcollection of mealLibrary in user document
    //collection(users) => doc(uid) => collection(mealLibrary) => doc(mealId)
    const uid = auth.currentUser.uid;
    const userRef = collection(database, "users");
    const docRef = doc(userRef, uid);
    const mealLibraryCollection = collection(docRef, "mealLibrary");
    const mealLibraryDoc = doc(
      mealLibraryCollection,
      data[index].id.toString()
    );
    await setDoc(
      mealLibraryDoc,
      {
        calories: data[index].calories,
        carbs: data[index].carbs,
        fat: data[index].fat,
        id: data[index].id,
        //todo: change default image
        //current default https://spoonacular.com/recipeImages/157093-556x370.jpg
        image: data[index].image,
        imageType: data[index].imageType,
        protein: data[index].protein,
        title: data[index].title,
      },
      { merge: true }
    );
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

  // data?.forEach((meal, index) => console.log(index, meal.title));

  //random meal screen
  const RanMeal = () => {
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      setIndex(0);
      refetch(query);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          {loading ? <LoadingScreen/> : query.calories === 0 ? (
            <LoadingScreen/>
          ) : error ? (
            <Text>Error...</Text>
          ) : data === undefined ? (
            <Text>no result</Text>
          ) : (
            <Swiper
              marginTop={0}
              backgroundColor="#fff"
              cardHorizontalMargin={0}
              cardVerticalMargin={0}
              cards={data}
              cardIndex={index}
              renderCard={(card) => card && renderCard(card)}
              onSwiped={onSwiped}
              onSwipedAll={() => {}}
              stackSize={3}
              stackScale={3}
              stackSeparation={20}
              childrenOnTop={false}
              // infinite
              disableTopSwipe
              disableBottomSwipe
              onSwipedLeft={() => {}} //TODO: add functionality to dump when swiped left using onSwipedLeft(() => {})
              onSwipedRight={(index) => onSwipedRight(index)} //it receives index of the swiped card
            >
              <RanOutOfCardScreen />
            </Swiper>
          )}
          {/* <IconContainer
        caption="logo"
        imageSource={require("../assets/icons/logo.png")}
      /> */}
        </ScrollView>
      </SafeAreaView>
    );
  };

  //create native-stack navigator
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MainScreenStack"
    >
      <Stack.Screen name="MainScreenStack" component={RanMeal} />
      <Stack.Screen name="DetailScreenStack" component={CalenderScreen} />
      <Stack.Screen name="RanOutOfCardScreen" component={RanOutOfCardScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  loadingText: {
    fontSize: 20,
    color: "#E17992",
    fontFamily: "TitanOne-Regular",
    textAlign: "center",
  },
});
