//Create an empty screen
import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { View, Text, StyleSheet, SafeAreaView, TextInput, FlatList } from 'react-native';
import IconContainer from '../components/IconContainer';
import { Search } from 'react-native-feather';
import SearchFilter from '../components/SearchFilter';
import data from '../data';

const LibraryScreen = () => {
  //input for search bar
  const [input, setInput] = useState('');

  //load fonts
  const [fontsLoaded] = useFonts({
    'TitanOne-Regular': require('../assets/fonts/TitanOne-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  console.log(input);

  //icon size
  const iconSize = 37;

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.header}>Library</Text>
        <View style={styles.searchBar}>
          <TextInput value={input} onChangeText={(text) => { setInput(text) }} style={styles.textInput} placeholder='search' />
          <Search stroke='#E17992' width={iconSize} height={iconSize} />
        </View>

      </View>
      <View style={styles.itemsContainer}>
        <SearchFilter data={data} input={input} />
      </View>

      <IconContainer caption='logo' imageSource={require('../assets/icons/logo.png')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 30,
    color: '#E17992',
    fontFamily: 'TitanOne-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
  searchBar: {
    height: 50,
    width: '80%',
    maxWidth: 350,
    backgroundColor: 'white',
    borderColor: '#BDE8E8',
    borderWidth: 2,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 20,
    color: '#E17992',
    fontFamily: 'TitanOne-Regular',
    textAlign: 'left',
  },
  headerContainer: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemsContainer: { //same as text container
    flex: 2.5,
    paddingTop: 20,
    alignSelf: 'stretch',
    backgroundColor: '#F8EFEF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
});
export default LibraryScreen;