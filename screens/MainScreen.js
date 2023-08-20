import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

//import components
import Card from '../components/Card';
import IconContainer from '../components/IconContainer';

//import data
import data from '../data';

//import swiper
import Swiper from 'react-native-deck-swiper';

export default function MainScreen() {

  const [index, setIndex] = useState(0);

  const onSwiped = () => {
    setIndex(index + 1);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        backgroundColor='#fff'
        cardHorizontalMargin={0}
        cardVerticalMargin={0}
        cards={data} //Todo: replace with data from database
        cardIndex={index}
        renderCard={(card) => <Card caption={card.caption} imageSource={card.imageSource} color={card.color} content={card.name} />}
        onSwiped={onSwiped}
        onSwipedAll={() => { alert('you ran out of cards!') }}
        stackSize={3}
        stackScale={3}
        stackSeparation={20}
        infinite
        disableTopSwipe
        disableBottomSwipe
        onSwipedLeft={() => { }}//TODO: add functionality to dump when swiped left using onSwipedLeft(() => {})
        onSwipedRight={() => { }}//TODO: add functionality to like when swiped right using onSwipedRight(() => {})
      />
      <IconContainer caption='logo' imageSource={require('../assets/icons/logo.png')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

//delete this later

// // example data
// const cards = [
//   {
//     caption: 'lasagna',
//     imageSource: require('../assets/pics/lasagna.jpg'),
//     color: '#FFCCDE',
//     content: 'Choice 1',
//   },
//   {
//     caption: 'pizza',
//     imageSource: require('../assets/pics/pizza.jpg'),
//     color: '#BDE8E8',
//     content: 'Choice 2',
//   },
//   {
//     caption: 'sushi',
//     imageSource: require('../assets/pics/sushi.jpg'),
//     color: '#F0D1A5',
//     content: 'Choice 3',
//   },
// ];