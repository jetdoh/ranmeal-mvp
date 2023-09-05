import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useFonts } from 'expo-font';

const WIDTH = '100%';
const ImageSize = 60;

const SmallItemInLists = ({ data }) => {

    //Load font
  const [fontsLoaded] = useFonts({
    'TitanOne-Regular': require('../assets/fonts/TitanOne-Regular.ttf'), // Match the font family name
  });

  if (!fontsLoaded) {
    // Return a placeholder or loading indicator if fonts are not yet loaded 
    return null;
  }

  const imageSource = 'https://spoonacular.com/cdn/ingredients_100x100/' + data.image;
    
  const PictureContainer = ({ imageSource }) => {
    return (
        <Image
          style={styles.picture}
          source={{ uri: imageSource }}
        />
    );
  };


  return (
    <View>
      <View style={styles.container}>

        <PictureContainer imageSource= {imageSource} />

        <View style = {styles.contentContainer}>
          <Text style = {styles.textHeader}>{data.name}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style = {styles.textAmount}>{data.amount}</Text>
            {
                data.unit === "" ? <Text style = {styles.textAmount}> units </Text>
                : <Text style = {styles.textAmount}> {data.unit} </Text>
            }
          </View>
        </View>

      </View>
    </View>
  );
};

export default SmallItemInLists;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: 85,
    marginBottom: 20,
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
    height: '100%',
    marginLeft: '5%',
    marginRight: '7%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    },
    textHeader: {
        fontSize: 17,
        fontFamily: 'TitanOne-Regular',
        textAlign: 'center',
        color: 'black',
    },
    textAmount: {
        fontSize: 13,
        fontFamily: 'TitanOne-Regular',
        textAlign: 'center',
        color: '#E17992',
    },
  picture: {
    width: ImageSize,
    height: ImageSize,
    marginLeft: 10,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',    
    resizeMode: 'contain',
  },

});
