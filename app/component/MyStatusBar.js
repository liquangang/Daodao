import {gViewStyles} from "../style/ViewStyles";
import React, { Component } from "react";
import { View, StyleSheet, StatusBar } from "react-native";

export default class MyStatusBar extends Component {
    render() {
        return (
            <View>
                <StatusBar barStyle="light-content"/>
                <View style={gViewStyles.orangeStatusBar}></View>
            </View>
        );
    };
}