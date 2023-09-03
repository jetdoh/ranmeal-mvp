import { View, Text, StyleSheet, FlatList} from 'react-native'
import React from 'react'
import ItemInLists from '../components/ItemInLists'
import { useFonts } from 'expo-font';

const BottomSheet = ({ ingredients }) => {

  //Load font
  const [fontsLoaded] = useFonts({
    'TitanOne-Regular': require('../assets/fonts/TitanOne-Regular.ttf'), // Match the font family name
  });

  if (!fontsLoaded) {
    // Return a placeholder or loading indicator if fonts are not yet loaded 
    return null;
  }

  return (
    <View style = {styles.container}>
      <Text style = {styles.text}>Ingredients</Text>
      <FlatList
        style = {styles.flatList}
        data = {ingredients}
        renderItem = {({item}) => {
          return (
            <ItemInLists data = {item}/>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '80%',
        // backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    text: {
        alignSelf: 'flex-start',
        marginLeft: '10%',
        marginTop: '7%',
        marginBottom: '3%',
        fontSize: 30,
        fontFamily: 'TitanOne-Regular',
        color: '#E17992',
        textAlign: 'center',
    },
    flatList: {
      flex: 1,
      width: '100%',
      // backgroundColor: 'cyan',
    }
});
export default BottomSheet