import React, { Component } from "react";
import { Text, View } from "react-native";
import BannerView from "../component/BannerView"

export default class Splash extends Component {
    render() {
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <BannerView></BannerView>
            </View>
        );
    };
}