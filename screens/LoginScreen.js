import { View, SafeAreaView, Text, TextInput, Button, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";

//firebase database
import { auth, database } from "../firebaseConfig";
import {
  collection,
  setDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
//firebase auth
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    //sign in
    const signIn = async () => {
        try{
            const usersCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = usersCredential.user; //we don't use this user object for now
            alert('signed in successfully');
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    //sign up
    const signUp = async () => {
        try{
            const usersCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = usersCredential.user;

            //add user to database
            const usersCollection = collection(database, "users")
            const docRef = doc(usersCollection, user.uid)
            await setDoc(docRef, {
                email: email,
                uid: user.uid,
                var: {
                    calories: 700,
                    protein: 30,
                    fat: 20,
                }
            });
            alert('signed up successfully');
           
        } catch (error) {
            console.log(error);
            alert(error);
        } 
    }

    // //check if user is logged in
    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged((user) => {
    //         if(user){
    //             console.log(user);
    //         } else {
    //             console.log('user is logged out');
    //         }
    //     });
    //     return unsubscribe;
    // }, []);
// do we need this useEffect?


  return (
    <SafeAreaView style = {styles.container}>
      <Text>LoginScreen</Text>
      <TextInput style = {styles.input} value = {email} placeholder="enter your email" onChangeText={(text) => setEmail(text)}/>
      <TextInput style = {styles.input} value = {password} placeholder="enter your password" onChangeText={(text) => setPassword(text)}/>
        <Button title = "Sign In" onPress = {signIn}/>
        <Button title = "Sign Up" onPress = {signUp}/>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    input: {
        width: 300,
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff',
    },
});