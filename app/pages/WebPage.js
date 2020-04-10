import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import MyStatusBar from '../component/MyStatusBar'

export default class WebPage extends Component {

    render() {
        return (
            <View>
                <MyStatusBar></MyStatusBar>
                <SafeAreaView>
                    <WebView
                        source={{uri: this.props.route.params.url}}
                    />
                </SafeAreaView>
            </View>

        );
    }
}