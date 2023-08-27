import React from 'react';
import { View, Image, StyleSheet, Dimensions} from 'react-native';

//set image size
const imageSize = Dimensions.get('window').height * 0.37;

const PictureContainer = ({ caption, imageSource }) => {
  return (
    <View style={styles.container}>
      <Image alt = {caption} source= {{ uri: imageSource }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    alignItems: 'center',
    marginBottom: 20,
    // position: 'absolute',
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
    resizeMode: 'cover',
  },
});

export default PictureContainer;