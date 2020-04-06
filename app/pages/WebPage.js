import React, { Component } from "react";
import { Text, View } from "react-native";

export default class WebPage extends Component {

    render() {
        return (
            <WebView
                source={{uri: this.props.route.params.url}}
            />
        );
    }
}