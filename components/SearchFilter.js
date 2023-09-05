import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";
import ItemLibrary from "./ItemLibrary";

const SearchFilter = ({ data, input }) => {
  const convertNutritionToNumber = (proteinString, carbsString, fatString) => {
    const protein = parseInt(proteinString.slice(0, -1));
    const carbs = parseInt(carbsString.slice(0, -1));
    const fat = parseInt(fatString.slice(0, -1));
    return { protein: protein, carbs: carbs, fat: fat };
  };

  return (
    <View style={styles.constainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ alignSelf: "stretch" }}
        data={data}
        renderItem={({ item }) => {
          if (input === "") {
            const nutrition = convertNutritionToNumber(
              item.protein,
              item.carbs,
              item.fat
            );
            return (
              <ItemLibrary
                imageSource={item.image}
                name={item.title}
                nutrition={nutrition}
                ingredients={item.extendedIngredients}
              />
            );
          }
          if (item.title.toLowerCase().includes(input.toLowerCase())) {
            const nutrition = convertNutritionToNumber(
              item.protein,
              item.carbs,
              item.fat
            );
            return (
              <ItemLibrary
                imageSource={item.image}
                name={item.title}
                nutrition={nutrition}
                ingredients={item.extendedIngredients}
              />
            );
          }
        }}
      />
    </View>
  );
};

export default SearchFilter;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
