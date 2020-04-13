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
                    {Platform.OS === "android" ? (<View></View>) : (<View style={gViewStyles.statusbar2}></View>)}
                </View>
            );
        } else {
            return (
                <View>
                    <StatusBar barStyle="light-content"/>
                    {Platform.OS === "android" ? (<View></View>) : (<View style={gViewStyles.statusbar1}></View>)}
                </View>
            );
        }


    };
}