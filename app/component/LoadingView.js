import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

export default class LoadingView extends Component {
    render() {
        return (
            <View style={styles.loadingView}>
                <Text>Loading data...</Text>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
});