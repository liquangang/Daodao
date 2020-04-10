import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import MyNavigationBar from '../component/MyNavigationBar'
import MyStatusBar from "../component/MyStatusBar";

export default class Convenience extends Component {
    render() {
        return(
            <View>
                <MyStatusBar/>
                <SafeAreaView>
                    <MyNavigationBar
                        title={'便民'}
                        hiddenBack={true}
                    ></MyNavigationBar>
                    <Text>这里是个网页！！！</Text>
                </SafeAreaView>
            </View>
        );
    };
}