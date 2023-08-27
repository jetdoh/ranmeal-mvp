import React from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";

const ItemLibrary = ({imageSource, name, nutrition}) => {
    return (
        <View style = {styles.constainer}>
            <Image source = {{ uri: imageSource }} style = {styles.image}/>
            <View style = {styles.contentContainer}>
                <Text style = {styles.header}>{name}</Text>
                <View style = {styles.barChartContainer}>
                    <View style = {[styles.barChart, {backgroundColor: 'red', flex: nutrition.protein, borderTopLeftRadius: 5, borderBottomLeftRadius: 5,}]}></View>
                    <View style = {[styles.barChart, {backgroundColor: 'yellow', flex: nutrition.fat}]}></View>
                    <View style = {[styles.barChart, {backgroundColor: 'green', flex: nutrition.carbs, borderTopRightRadius: 5, borderBottomRightRadius: 5,}]}></View>
                </View>
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
        fontSize: 15,
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