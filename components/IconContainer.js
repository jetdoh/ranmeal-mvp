import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";

const sideLength = 30;
export default function IconContainer({ caption, imageSource }) {
    return (
        <View style={styles.container}>
      <Image alt = {caption} source={imageSource} style={styles.image} />
    </View>
    );
    }
   
    const styles = StyleSheet.create({
        container: {
          marginLeft: 20,
          marginTop: '15%',
          position: 'absolute',
          alignSelf: 'flex-start',
          alignItems: 'center',
        },
        image: {
          width: sideLength,
          height: sideLength,
          resizeMode: 'cover',
        },
      });