import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.loadingText}> Loading...</Text>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText:{
    margin: 5,
    fontSize: 20,
    fontFamily: "TitanOne-Regular",
    color: "#E17992",
  }
});
