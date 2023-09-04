import React from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";

const ItemLibrary = ({imageSource, name, nutrition}) => {
    return (
        <View style = {styles.constainer}>
            <Image source = {{ uri: imageSource }} style = {styles.image}/>
            <View style = {styles.contentContainer}>
                <Text style = {styles.header}>{name}</Text>
                {/* <View style = {styles.barChartContainer}>
                    <View style = {[styles.barChart, {backgroundColor: 'red', flex: nutrition.protein, borderTopLeftRadius: 5, borderBottomLeftRadius: 5,}]}></View>
                    <View style = {[styles.barChart, {backgroundColor: 'yellow', flex: nutrition.fat}]}></View>
                    <View style = {[styles.barChart, {backgroundColor: 'green', flex: nutrition.carbs, borderTopRightRadius: 5, borderBottomRightRadius: 5,}]}></View>
                </View> */}
            </View>
        </View>
    );
}

export default ItemLibrary;

const IMAGE_SIZE = 70;

const styles = StyleSheet.create({
    constainer: {
        height: IMAGE_SIZE * 1.3,
        width: '80%',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: IMAGE_SIZE / 2.5,
        maxWidth: 400,
        borderRadius: 20,
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderRadius: IMAGE_SIZE / 2,
        position: 'absolute',
        left: -IMAGE_SIZE / 2.2,
        resizeMode: 'cover',
    },
    header:{
        fontSize: 15,
        color: '#E17992',
        fontFamily: 'TitanOne-Regular',
        textAlign: 'center',
    },
    description: {
        fontSize: 15,
        color: '#E17992',
        fontFamily: 'TitanOne-Regular',
        textAlign: 'center',
    },
    barChartContainer: {
        height: 30,
        width: '70%',
        maxWidth: 300,
        backgroundColor: '#F8EFEF',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    barChart: {
        flex: 1,
        height: '100%',
        backgroundColor: '#E17992',
    }
});