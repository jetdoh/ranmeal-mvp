import React from 'react';
import { StyleSheet, View} from 'react-native';

//import components
import PictureContainer from '../components/PictureContainer';
import ContentContainer from '../components/ContentContainer';

export default function Card({caption, imageSource, color, content}) {

      return (
     <View style={[styles.container]}>
          <ContentContainer content = {content} color = {color}/>
          <PictureContainer caption= {caption} imageSource= {imageSource}/> 
     </View>
      );
    }

    const styles = StyleSheet.create({
        container: {
          width: '100%',
          height: '90%',
          alignItems: 'center',
          justifyContent: 'flex-start',
        },
      });