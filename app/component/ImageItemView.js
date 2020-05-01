import {gViewStyles} from "../style/ViewStyles";
import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";

export default class ImageItemView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            width: 0,
            height: 0,
        };
    }


    render() {

        if (this.state.data != null) {
            Image.getSize(this.state.data.src, (imgWidth, imgHeight) => {
                this.setState({
                    width: gScreen.screen_width - 4,
                    height: (gScreen.screen_width - 4) / imgWidth * imgHeight
                })
            }, (errorMsg) => {
            })
        }

        return(<View>
            <Image source={{uri: this.state.data.src}} style={[styles.newsImg, {height: this.state.height}]}/>
        </View>);
    };
}

const styles = StyleSheet.create({
    newsImg: {
        margin: 2,
        borderRadius: 5,
        width: gScreen.screen_width - 4,
    },
});