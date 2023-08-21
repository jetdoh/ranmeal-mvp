import React from 'react';
import { View, Image, StyleSheet, Dimensions} from 'react-native';

//set image size
const imageSize = Dimensions.get('window').width / 1.4;

const PictureContainer = ({ caption, imageSource }) => {
  return (
    <View style={styles.container}>
      <Image alt = {caption} source= {imageSource} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '15%',
    alignItems: 'center',
    marginBottom: 20,
    position: 'absolute',
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
    resizeMode: 'cover',
  },
});

export default PictureContainer;