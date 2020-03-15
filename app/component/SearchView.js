import React, { Component } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class SearchView extends Component {
    render() {
        return(
            <View style={styles.searchView}>
                <Ionicons name='ios-search' size={25}/>
                <TextInput underlineColorAndroid="transparent" placeholder="搜索你想要的内容"
                           style={styles.searchTextInput}>
                </TextInput>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    searchView: {
        marginLeft: 15,
        height: 40,
        backgroundColor: "#fff",
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black'
    },
    searchTextInput: {
        marginLeft: 10,
        marginRight: 10
    }
});
