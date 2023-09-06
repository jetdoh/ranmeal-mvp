import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

//icons
import Feather from "react-native-vector-icons/Feather";

//firebase
import { auth, database } from "../firebaseConfig";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

const NewSettingScreen = () => {
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [calories, setCalories] = useState(0);

  const [nutrition, setNutrition] = useState({
    protein: 0,
    fat: 0,
    calories: 0,
  });

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
          console.log(vars);
        } else {
          console.log("No such document!");
        }
      });
    };
    getVar().then(() => {
        setProtein(nutrition.protein);
        setFat(nutrition.fat);
        setCalories(nutrition.calories);
    })
  }, []);

  useEffect(() => {
    const updateVar = async () => {
      const uid = auth.currentUser.uid;
      const userRef = collection(database, "users");
      const varRef = doc(userRef, uid);
      await setDoc(varRef, { var: nutrition }, { merge: true });
    };
    nutrition.calories !== 0 && updateVar();
    console.log(nutrition);
  }, [nutrition]);

  const onSave = () => {
    setNutrition({ protein: protein, fat: fat, calories: calories });
    console.log("save");
  };

  const [calEditVisible, setCalEditVisible] = useState(false);
  const [proteinEditVisible, setProteinEditVisible] = useState(false);
  const [fatEditVisible, setFatEditVisible] = useState(false);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Settings</Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.insideContainer}>
            <View style={styles.subContentContainer}>
              <Text style={styles.textAmount}>{nutrition.calories} cal</Text>
              <TouchableOpacity
                onPress={() => setCalEditVisible(!calEditVisible)}
              >
                <Feather name="edit" size={30} color="#5B5B5B" />
              </TouchableOpacity>
            </View>
            {calEditVisible && (
              <View style={styles.editContainer}>
                <View style={styles.inputBar}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="enter new amount"
                    onChangeText={(text) => setCalories(Number(text))}
                  />
                </View>
                <TouchableOpacity
                  style={styles.save}
                  onPress={() => {
                    onSave();
                    setCalEditVisible(!calEditVisible);
                  }}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            )}
            <Text style={styles.text}>calories per meal</Text>
          </View>
          <View style={styles.insideContainer}>
            <View style={styles.subContentContainer}>
              <Text style={styles.textAmount}>{nutrition.protein} g </Text>
              <TouchableOpacity
                onPress={() => setProteinEditVisible(!proteinEditVisible)}
              >
                <Feather name="edit" size={30} color="#5B5B5B" />
              </TouchableOpacity>
            </View>
            {proteinEditVisible && (
              <View style={styles.editContainer}>
                <View style={styles.inputBar}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="enter new amount"
                    onChangeText={(text) => setProtein(Number(text))}
                  />
                </View>
                <TouchableOpacity
                  style={styles.save}
                  onPress={() => {
                    onSave();
                    setProteinEditVisible(!proteinEditVisible);
                  }}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            )}
            <Text style={styles.text}>protein per meal</Text>
          </View>
          <View style={styles.insideContainer}>
            <View style={styles.subContentContainer}>
              <Text style={styles.textAmount}>{nutrition.fat} g </Text>
              <TouchableOpacity
                onPress={() => setFatEditVisible(!fatEditVisible)}
              >
                <Feather name="edit" size={30} color="#5B5B5B" />
              </TouchableOpacity>
            </View>
            {fatEditVisible && (
              <View style={styles.editContainer}>
                <View style={styles.inputBar}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="enter new amount"
                    onChangeText={(text) => setFat(Number(text))}
                  />
                </View>
                <TouchableOpacity
                  style={styles.save}
                  onPress={() => {
                    onSave();
                    setFatEditVisible(!fatEditVisible);
                  }}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            )}
            <Text style={styles.text}>fat per meal</Text>
          </View>
          <View style = {{margin: 10}}>
            <Button title="sign out" onPress={() => {auth.signOut()}} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default NewSettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerContainer: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    //same as text container
    flex: 3.5,
    paddingTop: 20,
    alignSelf: "stretch",
    backgroundColor: "#FFE7EF",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  insideContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  subContentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    //backgroundColor: "orange",
  },
  header: {
    fontSize: 30,
    color: "#E17992",
    fontFamily: "TitanOne-Regular",
    textAlign: "center",
    marginTop: 20,
  },
  textAmount: {
    fontSize: 45,
    marginRight: 30,
    color: "#E17992",
    fontFamily: "TitanOne-Regular",
  },
  text: {
    fontSize: 15,
    color: "#5B5B5B",
    fontFamily: "TitanOne-Regular",
  },
  editContainer: {
    height: 50,
    width: "100%",
    // backgroundColor: "white",
    marginTop: 5,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  textInput: {
    color: "#5B5B5B",
    fontSize: 20,
    fontFamily: "TitanOne-Regular",
    textAlign: "left",
  },
  inputBar: {
    height: "100%",
    flex: 1,
    maxWidth: 350,
    backgroundColor: "white",
    borderColor: "#BDE8E8",
    borderWidth: 2,
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "TitanOne-Regular",
    textAlign: "center",
    fontSize: 20,
  },
  save: {
    marginLeft: 20,
    height: "80%",
    width: 100,
    backgroundColor: "#E17992",
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    alighItem: "center",
    justifyContent: "center",
  },
});
