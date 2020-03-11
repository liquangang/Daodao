import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class HomePage extends Component {
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <View style={styles.searchView} >
                        <Ionicons name='ios-search' size={25} />
                        <TextInput underlineColorAndroid="transparent" placeholder="搜索你想要的内容" style={styles.searchTextInput}>
                        </TextInput>
                    </View>
                    <Ionicons name='md-mail' size={35} style={styles.messageView}/>
                </View>

            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchContainer: {
        paddingRight: 15,
        paddingLeft: 15,
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchView: {
        flex: 10,
        height: 40,
        backgroundColor: "#fff",
        borderRadius: 20,
        borderWidth: 1,
        paddingLeft: 15,
        marginRight: 0,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'black'
    },
    searchTextInput: {
        marginLeft: 10,
        marginRight: 10
    },
    messageView: {
        flex: 1,
        marginLeft: 10
    }
});
