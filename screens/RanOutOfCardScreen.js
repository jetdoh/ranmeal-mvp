import { StyleSheet, Text, View } from "react-native";
import React from "react";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const RanOutOfCardScreen = () => {
  return (
    <View style={styles.container}>
      <View
        style={{ flex: 2, alignItems: "center", justifyContent: "flex-end", }}
      >
        <MaterialCommunityIcons
          name="emoticon-sad-outline"
          size={100}
          color="#E17992"
        />
        <Text style={styles.oopsText}>Oops...</Text>
        <Text style={styles.text}>You ran out of cards!</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.pullDownText}>Pull down to refresh</Text>
        <MaterialCommunityIcons
          name="arrow-expand-down"
          size={40}
          color="gray"
        />
      </View>
    </View>
  );
};

export default RanOutOfCardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  oopsText: {
    margin: 1,
    fontSize: 50,
    fontFamily: "TitanOne-Regular",
    color: "#E17992",
  },
  text: {
    margin: 5,
    fontSize: 20,
    fontFamily: "TitanOne-Regular",
    color: "black",
  },
  pullDownText: {
    marginTop: 50,
    fontSize: 15,
    fontFamily: "TitanOne-Regular",
    color: "gray",
  },
});
