import React from 'react';
import { StyleSheet, View, Dimensions} from 'react-native';

//import components
import PictureContainer from '../components/PictureContainer';
import ContentContainer from '../components/ContentContainer';

const containerHeight = Dimensions.get('window').height * 0.88;

export default function Card({caption, imageSource, color, content, nutrition}) {
      //todo: add nutrition data to the database
      return (
     <View style={[styles.container]}>
          <ContentContainer 
          content = {content} 
          color = {color} 
          nutrition={nutrition}/>
          <View style={styles.overlay}>
            <PictureContainer caption= {caption} imageSource= {imageSource}/> 
          </View>
     </View>
      );
    }

    const styles = StyleSheet.create({
        container: {
          width: '100%',
          height: containerHeight,
          alignItems: 'center',
          justifyContent: 'flex-start',
        },
        overlay: {
          ...StyleSheet.absoluteFillObject, // This fills the entire parent container
          justifyContent: 'flex-start',
          alignItems: 'center',
        },
      });