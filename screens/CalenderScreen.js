import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";

//gesture handler
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

//animation
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";

//import BottomSheet
import BottomSheet from "./BottomSheet";

//import custom hook
import useFetchDetail from "../hooks/useFetchDetail";

//import useRoute
import { useRoute } from "@react-navigation/native";

//import firebase auth
import { auth, database } from "../firebaseConfig";
import { collection, setDoc, doc } from "firebase/firestore";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const imageSize = windowWidth * 0.7;

const CalenderScreen = () => {
  //state for bottom sheet
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  //make backdrop animatable
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  //fetch recipe detail
  const route = useRoute();
  const recipeId = route.params?.id;
  const { data, loading, error, refetch } = useFetchDetail(recipeId);

  // console.log(loading, typeof(data))
  const ingredients = data?.extendedIngredients;
  // filter out ingredients that have the same id
  const filteredIngredients = []
  const seenId = {}

  ingredients?.forEach((ingredient) => {
    if(!seenId[ingredient.id]){
      filteredIngredients.push(ingredient)
      seenId[ingredient.id] = true
    }
  })

  //add recipe detail to database
  const addDetailToDatabase = async () => {
    //collection(users) => doc(uid) => collection(mealLibrary) => doc(mealId)
    const uid = auth.currentUser.uid;
    const userRef = collection(database, "users");
    const docRef = doc(userRef, uid);
    const mealLibraryCollection = collection(docRef, "mealLibrary");
    const mealDocRef = doc(mealLibraryCollection, recipeId.toString());
    await setDoc(mealDocRef, data, {merge: true});
  };

  !loading && addDetailToDatabase();


  //Load font
  const [fontsLoaded] = useFonts({
    "TitanOne-Regular": require("../assets/fonts/TitanOne-Regular.ttf"), // Match the font family name
  });
  if (!fontsLoaded) {
    // Return a placeholder or loading indicator if fonts are not yet loaded
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider style={styles.container}>
        <View style={styles.backgroundSquareBottom} />
        <View style={styles.backgroundSquareTop} />
        <View style={styles.backgroundOvalTop} />

        <Text style={[styles.text, { fontSize: 40 }]}>Today's meal</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>{error}</Text>
        ) : data.image === undefined ? <Text> loading pictures </Text> : (
          <>
            <Image style={styles.image} source={{ uri: data.image }} />
            <Text style={styles.text}>{data.title}</Text>
          </>
        )}
        <TouchableOpacity style={styles.buttonRight} onPress={toggleIsOpen}>
          <Text style={styles.buttonText}>prepare</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLeft}>
          <Text style={styles.buttonText}>buy</Text>
        </TouchableOpacity>

        {isOpen && (
          <>
            <AnimatedPressable
              style={styles.backDrop}
              onPress={toggleIsOpen}
              entering={FadeIn}
              exiting={FadeOut}
            />
            <Animated.View
              style={styles.sheet}
              entering={SlideInDown.springify().damping(15)}
              exiting={SlideOutDown}
            >
              {loading ? (
                <Text>Loading...</Text>
              ) : error ? (
                <Text>{error}</Text>
              ) : (
                <BottomSheet ingredients={filteredIngredients} />
              )}
            </Animated.View>
          </>
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const BOTTOM = 10;
const SIDE = 10;
const HEIGHT = 40;
const WIDTH = "auto";
const PADDING = 20;
const BACKGROUND_SCALE = 0.35;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 25,
    color: "#D3647E",
    fontFamily: "TitanOne-Regular",
    textAlign: "center",
    margin: 30,
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
    // borderWidth: 1,
  },

  backDrop: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  sheet: {
    backgroundColor: "#FFE7EF",
    paddingTop: 16,
    height: "100%",
    width: "100%",
    position: "absolute",
    top: "15%",
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    zIndex: 1,
  },
  buttonLeft: {
    height: HEIGHT,
    width: WIDTH,
    borderRadius: HEIGHT / 2,
    paddingRight: PADDING,
    paddingLeft: PADDING,
    position: "absolute",
    bottom: BOTTOM,
    left: SIDE,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#fff",
  },
  buttonRight: {
    height: HEIGHT,
    width: WIDTH,
    borderRadius: HEIGHT / 2,
    paddingRight: PADDING,
    paddingLeft: PADDING,
    position: "absolute",
    bottom: BOTTOM,
    right: SIDE,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#fff",
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "TitanOne-Regular",
    color: "#E17992",
    textAlign: "center",
    textAlignVertical: "center",
  },

  backgroundSquareTop: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: windowHeight * BACKGROUND_SCALE,
    backgroundColor: "#fff",
  },
  backgroundOvalTop: {
    position: "absolute",
    width: windowWidth * 1.7,
    height: windowWidth * 1.5,
    bottom: windowHeight * 0.23,
    borderRadius: (windowWidth * 1.5) / 2,
    transform: [{ scaleY: 0.5 }],
    backgroundColor: "#fff",
  },
  backgroundSquareBottom: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: windowHeight * (1 - BACKGROUND_SCALE),
    backgroundColor: "#FFE7EF",
  },
});

export default CalenderScreen;
