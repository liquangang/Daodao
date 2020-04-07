import React, { Component } from "react";
import { View, StyleSheet, TextInput, Image } from "react-native";

export default class SearchView extends Component {

    onEndEditing = (text) => {
        this.props.onSearch(text);
    }

    render() {
        return(
            <View style={styles.searchView}>
                <Image source={require('../source/搜索.png')} style={styles.avatar}/>
                <TextInput underlineColorAndroid="transparent" placeholder="搜索你想要的内容" placeholderTextColor={'#999999'}
                           style={styles.searchTextInput}
                           onSubmitEditing={(event)=>this.onEndEditing(event.nativeEvent.text)}>
                </TextInput>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    searchView: {
        marginTop: 7,
        marginLeft: 12,
        height: 33,
        backgroundColor: "#fff",
        paddingLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
    },
    searchTextInput: {
        flex: 1,
        height: 33,
    },
    avatar: {
        height: 25,
        width: 25,
        margin: 5,
    },
});
