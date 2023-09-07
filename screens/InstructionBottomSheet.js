import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { useFonts } from "expo-font";

import ItemInstuction from "../components/ItemInstruction";

const InstructionsBottomSheet = ({ instructions }) => {
  //Load font
  const [fontsLoaded] = useFonts({
    "TitanOne-Regular": require("../assets/fonts/TitanOne-Regular.ttf"), // Match the font family name
  });

  if (!fontsLoaded) {
    // Return a placeholder or loading indicator if fonts are not yet loaded
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Instructions</Text>
      <View style={styles.instructionsContainer}>
        <FlatList
          style={styles.flatList}
          data={instructions}
          showsVerticalScrollIndicator = {false}
          renderItem={({ item, index }) => {
            return <ItemInstuction instruction={item} index={index} />;
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "80%",
    // backgroundColor: 'orange',
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    alignSelf: "flex-start",
    marginLeft: "10%",
    marginTop: "7%",
    marginBottom: "3%",
    fontSize: 30,
    fontFamily: "TitanOne-Regular",
    color: "#E17992",
    textAlign: "center",
  },
  instructionsContainer: {
    width: "90%",
    height: "85%",
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  instructions: {
    fontSize: 13,
    fontFamily: "TitanOne-Regular",
  },
  flatList: {
    flex: 1,
    width: "100%",
    // backgroundColor: 'cyan',
  },
});
export default InstructionsBottomSheet;
