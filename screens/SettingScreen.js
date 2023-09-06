//Create an empty screen
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";

//firebase database
import {
  collection,
  setDoc,
  getDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { database } from "../firebaseConfig";
//firebase auth
import { auth } from "../firebaseConfig";

const SettingScreen = () => {
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [calories, setCalories] = useState(0);

  const [nutrition, setNutrition] = useState({
    protein: 0,
    fat: 0,
    calories: 0,
  });

  //delete this old version
  // //get variables data from database
  // useEffect(() => {
  //   const varRef = collection(database, "variables");
  //   const subscriber = onSnapshot(varRef, {
  //     next: (querySnapshot) => {
  //       const vars = querySnapshot.docs[0].data();
  //       setNutrition(vars);
  //     },
  //   });
  //   return () => subscriber();
  // }, []);

  //get innitial variables data from database (users => uid => variables)
  useEffect(() => {
    const uid = auth.currentUser.uid;
    const userRef = collection(database, "users");
    const varRef = doc(userRef, uid);
    const getVar = async () => {
      await getDoc(varRef).then((doc) => {
        if (doc.exists()) {
          const vars = doc.data().var;
          setNutrition(vars);
        } else {
          console.log("No such document!");
        }
      });
    };
    getVar();
  }, []);

  //delete this old version
  // //update variables in database
  // const addVariable = async () => {
  //   //use setDoc to add data to the database only when not exist
  //   const varRef = doc(database, "variables", "variables");
  //   await setDoc(varRef, nutrition, {merge: true});
  //   // console.log("ADDED");
  // }

  //update variables in database
  const addVariable = async () => {
    const uid = auth.currentUser.uid;
    const userRef = collection(database, "users");
    const varRef = doc(userRef, uid);
    await setDoc(varRef, {var: nutrition}, { merge: true });
    // console.log("ADDED");
  };

  useEffect(() => {
    nutrition.calories !== 0 && addVariable();
  }, [nutrition]);

  const onSubmit = () => {
    setNutrition({ protein: protein, fat: fat, calories: calories });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Setting Screen</Text>
      <TextInput
        style={styles.inputBar}
        onChangeText={(text) => {
          setProtein(Number(text));
        }}
        placeholder="enter protein"
      />
      <TextInput
        style={styles.inputBar}
        onChangeText={(text) => {
          setFat(Number(text));
        }}
        placeholder="enter fat"
      />
      <TextInput
        style={styles.inputBar}
        onChangeText={(text) => {
          setCalories(Number(text));
        }}
        placeholder="enter calories"
      />
      <Button onPress={() => onSubmit()} title="submit" />
      <Text>Protein: {protein}</Text>
      <Text>Fat: {fat}</Text>
      <Text>Calories: {calories}</Text>
      <Text>Nutrition</Text>
      <Text>Protein: {nutrition.protein}</Text>
      <Text>Fat: {nutrition.fat}</Text>
      <Text>Calories: {nutrition.calories}</Text>
      <Button title = 'sign out' onPress={() => auth.signOut()}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  inputBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  },
});
export default SettingScreen;
