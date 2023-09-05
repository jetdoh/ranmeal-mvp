import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";

const ItemLibrary = ({ imageSource, name, nutrition, ingredients }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <>
      <TouchableOpacity
        style={styles.constainer}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Image source={{ uri: imageSource }} style={styles.image} />
        <View style={styles.contentContainer}>
          <Text style={styles.header}>{name}</Text>
          {/* <View style = {styles.barChartContainer}>
                    <View style = {[styles.barChart, {backgroundColor: 'red', flex: nutrition.protein, borderTopLeftRadius: 5, borderBottomLeftRadius: 5,}]}></View>
                    <View style = {[styles.barChart, {backgroundColor: 'yellow', flex: nutrition.fat}]}></View>
                    <View style = {[styles.barChart, {backgroundColor: 'green', flex: nutrition.carbs, borderTopRightRadius: 5, borderBottomRightRadius: 5,}]}></View>
                </View> */}
        </View>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        {console.log("modal is open")}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTextHeader}>ingredients</Text>
            <ScrollView style={styles.ingredientsContainer} showsVerticalScrollIndicator = {false}>
              {ingredients !== undefined &&
                ingredients.map((ingredient) => (
                  <Text key={ingredient.id} style={styles.modalTextIngredients}>
                    × {ingredient.amount}  :  {ingredient.name}
                  </Text>
                ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.hideModal}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonText}>Hide</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ItemLibrary;

const IMAGE_SIZE = 70;

const styles = StyleSheet.create({
  constainer: {
    height: IMAGE_SIZE * 1.3,
    width: "80%",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: IMAGE_SIZE / 2.5,
    maxWidth: 400,
    borderRadius: 20,
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    elevation: 5, // Add elevation for shadow effect on Android
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  contentContainer: {
    flex: 1,
    marginLeft: IMAGE_SIZE / 1.7,
    marginRight: 20,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    position: "absolute",
    left: -IMAGE_SIZE / 2.2,
    resizeMode: "cover",
  },
  header: {
    fontSize: 15,
    color: "#E17992",
    fontFamily: "TitanOne-Regular",
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: "#E17992",
    fontFamily: "TitanOne-Regular",
    textAlign: "center",
  },
  //   barChartContainer: {
  //     height: 30,
  //     width: "70%",
  //     maxWidth: 300,
  //     backgroundColor: "#F8EFEF",
  //     borderRadius: 5,
  //     marginTop: 10,
  //     marginBottom: 10,
  //     flexDirection: "row",
  //     justifyContent: "flex-start",
  //     alignItems: "center",
  //   },
  //   barChart: {
  //     flex: 1,
  //     height: "100%",
  //     backgroundColor: "#E17992",
  //   },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: "90%",
    height: "80%",
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, //for android
  },
  ingredientsContainer: {
    flex: 1,
    padding: 20,
  },
  modalTextHeader: {
    marginBottom: 25,
    textAlign: "center",
    fontSize: 30,
    color: "#E17992",
    fontFamily: "TitanOne-Regular",
  },
  modalTextIngredients: {
    margin: 7,
    textAlign: "left",
    fontSize: 17,
    fontFamily: "TitanOne-Regular",
    color: "black",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontFamily: "TitanOne-Regular",
    textAlign: "center",
    fontSize: 20,
  },
  hideModal: {
    margin: 20,
    width: 100,
    backgroundColor: "#E17992",
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
});
