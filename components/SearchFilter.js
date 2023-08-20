import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";
import ItemLibrary from "./ItemLibrary";

const SearchFilter = ({ data, input }) => {
    return (
        <View
            style={styles.constainer}
        >
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ alignSelf: 'stretch', }}
                data={data}
                renderItem={({ item }) => {
                    if (input === "") {
                        return (
                            <ItemLibrary imageSource={item.imageSource} name={item.name} description={item.description} />
                        )
                    }
                    if (item.name.includes(input.toLowerCase())) {
                        return (
                            <ItemLibrary imageSource={item.imageSource} name={item.name} description={item.description} />
                        )
                    }
                }}
            />
        </View>
    );
}

export default SearchFilter;

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});