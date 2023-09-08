import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";

//firebase database
import { auth, database } from "../firebaseConfig";
import {
  collection,
  setDoc,
  doc,
} from "firebase/firestore";
//firebase auth
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

//use Stack navigation
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import KeyboardDissmissal component
import KeyboardDissmissal from "../components/KeyboardDissmissal";

const LoginScreen = () => {

  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  //load fonts
  const [fontsLoaded] = useFonts({
    "TitanOne-Regular": require("../assets/fonts/TitanOne-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //sign in
    const signIn = async () => {
      try {
        const usersCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = usersCredential.user; //we don't use this user object for now
        alert("signed in successfully");
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };


    return (
      <KeyboardDissmissal>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Welcome!</Text>
            <Text style={styles.subHeader}>Sign in to continue. Enjoy!</Text>
        </View>
        <View style={styles.contentContainter}>
          <Text style={styles.title}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="enter your email"
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={styles.title}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            secureTextEntry={true}
            placeholder="enter your password"
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={styles.loginButton} onPress={signIn}>
            <Text style={styles.buttonText}>sign in</Text>
          </TouchableOpacity>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <Button
              title="Sign Up"
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            />
          </View>
        </View>
      </SafeAreaView>
      </KeyboardDissmissal>
    );
  };

  const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");

    //sign up
    const signUp = async () => {
      if (password === secondPassword) {
        try {
          const usersCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = usersCredential.user;

          //add user to database
          const usersCollection = collection(database, "users");
          const docRef = doc(usersCollection, user.uid);
          await setDoc(docRef, {
            email: email,
            uid: user.uid,
            var: {
              calories: 700,
              protein: 30,
              fat: 20,
            },
          });
          alert("signed up successfully");
        } catch (error) {
          console.log(error);
          alert(error);
        }
      } else {
        alert("passwords don't match");
      }
    };

    const DissmissKeyboard = ({ children }) => (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible = {false}>
        {children}
      </TouchableWithoutFeedback>
    )

    return (
      <KeyboardDissmissal>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Hello!</Text>
          <Text style={styles.subHeader}>Sign up to get started</Text>
        </View>
        <View style={styles.contentContainter}>
          <Text style={styles.title}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="enter your email"
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={styles.title}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={password}
            placeholder="enter your password"
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            style={[styles.input, { marginTop: 0 }]}
            secureTextEntry={true}
            value={secondPassword}
            placeholder="enter your password again"
            onChangeText={(text) => setSecondPassword(text)}
          />
          <TouchableOpacity style={styles.loginButton} onPress={signUp}>
            <Text style={styles.buttonText}>sign up</Text>
          </TouchableOpacity>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Text style={styles.signUpText}>Already have an account? </Text>
            <Button
              title="Sign in"
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            />
          </View>
        </View>
      </SafeAreaView>
      </KeyboardDissmissal>
    );
  };

  const MyStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    );
  };

  return <MyStack />;
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  input: {
    width: 300,
    height: 40,
    marginTop: 7,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E17992",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    fontFamily: "TitanOne-Regular",
  },
  headerContainer: {
    flex: 1,
    padding: 30,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  contentContainter: {
    flex: 3,
    paddingVertical: 30,
    width: "100%",
    backgroundColor: "#FFE7EF",
    alignItems: "center",
    justifyContent: "flex-start",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  header: {
    fontSize: 40,
    fontFamily: "TitanOne-Regular",
  },
  subHeader: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: "TitanOne-Regular",
    color: "#5B5B5B",
  },
  title: {
    fontSize: 20,
    fontFamily: "TitanOne-Regular",
    color: "#E17992",
    alignSelf: "flex-start",
    marginTop: 10,
    marginLeft: 30,
  },
  loginButton: {
    width: 100,
    height: 40,
    backgroundColor: "#E17992",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: "TitanOne-Regular",
    color: "#fff",
  },
  signUpText: {
    fontSize: 15,
  },
});
