import {gViewStyles} from "../style/ViewStyles";
import React, { Component } from "react";
import { View, StatusBar, SafeAreaView } from "react-native";

export default class MyStatusBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            styleType: this.props.styleType
        };
    }

    render() {

        if (this.props.styleType == 'dark') {
            return (
                <View>
                    <StatusBar barStyle="dark-content"/>
                    <SafeAreaView style={gViewStyles.statusbar2}></SafeAreaView>
                </View>
            );
        } else {
            return (
                <View>
                    <StatusBar barStyle="light-content"/>
                    <SafeAreaView style={gViewStyles.statusbar1}></SafeAreaView>
                </View>
            );
        }


    };
}