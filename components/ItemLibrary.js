import React from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";

const ItemLibrary = ({imageSource, name, description}) => {
    return (
        <View style = {styles.constainer}>
            <Image source = {imageSource} style = {styles.image}/>
            <View style = {styles.contentContainer}>
                <Text style = {styles.header}>{name}</Text>
                <Text style = {styles.description}>{description}</Text>
            </View>
        </View>
    );
}

export default ItemLibrary;

const styles = StyleSheet.create({
    constainer: {
        height: 140,
        width: 340,
        margin: 10,
        maxWidth: 400,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#BDE8E8',
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    contentContainer: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginLeft: 20,
        borderRadius: 50,
        resizeMode: 'cover',
    },
    header:{
        fontSize: 30,
        color: '#E17992',
        fontFamily: 'TitanOne-Regular',
        textAlign: 'center',
        marginTop: 20,
    },
    description: {
        fontSize: 15,
        color: '#E17992',
        fontFamily: 'TitanOne-Regular',
        textAlign: 'center',
    },
});