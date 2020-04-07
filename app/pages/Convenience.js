import React, { Component } from "react";
import { Text, View } from "react-native";
import MyNavigationBar from '../component/MyNavigationBar'
import MyStatusBar from "../component/MyStatusBar";

export default class Convenience extends Component {
    render() {
        return(
            <View>
                <MyStatusBar/>
                <MyNavigationBar
                    title={'便民'}
                    hiddenBack={true}
                ></MyNavigationBar>
                <Text>这里是个网页！！！</Text>
            </View>
        );
    };
}