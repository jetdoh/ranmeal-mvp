import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
} from "react-native";
import IconContainer from "../components/IconContainer";
import { Search } from "react-native-feather";
import SearchFilter from "../components/SearchFilter";

//firebase database
import { doc, collection, onSnapshot } from "firebase/firestore";
import { database } from "../firebaseConfig";
//firebase auth
import { auth } from "../firebaseConfig";

const LibraryScreen = () => {
  //input for search bar
  const [input, setInput] = useState("");

  //meals in library
  const [meals, setMeals] = useState([]);

  //useEffect to update the list
  useEffect(() => {
    // // delete this line
    // const mealRef = collection(database, "mealsLibrary");

    //get docs from mealLibrary collection in user's document
    const uid = auth.currentUser.uid;
    const userRef = collection(database, "users");
    const docRef = doc(userRef, uid);
    const mealLibraryCollectionRef = collection(docRef, "mealLibrary");

    const subscriber = onSnapshot(mealLibraryCollectionRef, {
      next: (querySnapshot) => {
        const meals = [];
        querySnapshot.docs.forEach((doc) => {
          meals.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setMeals(meals);
        console.log("UPDATED");
      },
    });

    return () => subscriber();
  }, []);

  //load fonts
  const [fontsLoaded] = useFonts({
    "TitanOne-Regular": require("../assets/fonts/TitanOne-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  // console.log(input);

  //icon size
  const iconSize = 37;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Library</Text>
        <View style={styles.searchBar}>
          <TextInput
            value={input}
            onChangeText={(text) => {
              setInput(text);
            }}
            style={styles.textInput}
            placeholder="search"
          />
          <Search stroke="#E17992" width={iconSize} height={iconSize} />
        </View>
      </View>
      {meals === undefined ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.itemsContainer}>
          <SearchFilter data={meals} input={input} />
        </View>
      )}

      {/* <IconContainer
        caption="logo"
        imageSource={require("../assets/icons/logo.png")}
      /> */}
    </SafeAreaView>
  );
};

//styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    fontSize: 30,
    color: "#E17992",
    fontFamily: "TitanOne-Regular",
    textAlign: "center",
    marginTop: 20,
  },
  searchBar: {
    height: 50,
    width: "80%",
    maxWidth: 350,
    backgroundColor: "white",
    borderColor: "#BDE8E8",
    borderWidth: 2,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    height: "100%",
    fontSize: 20,
    color: "#E17992",
    fontFamily: "TitanOne-Regular",
    textAlign: "left",
  },
  headerContainer: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  itemsContainer: {
    //same as text container
    flex: 2.5,
    paddingTop: 20,
    alignSelf: "stretch",
    backgroundColor: "#FFE7EF",
    alignItems: "center",
    justifyContent: "flex-start",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  backDrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "100%",
    backgroundColor: 'backgroundColor: "rgba(0,0,0,0.5)"',
    justifyContent: "center",
    alignItems: "center",
  },
});
export default LibraryScreen;
