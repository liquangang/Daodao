import {gViewStyles} from "../style/ViewStyles";
import React, { Component } from "react";
import { View, StyleSheet, StatusBar, TouchableOpacity, Image, Text } from "react-native";
import {gImageStyles} from "../style/ImageStyles";
import {gTextStyles} from "../style/TextStyles";

export default class MyStatusBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            hiddenBack: this.props.hiddenBack, // 默认true
        };
    }

    onClickBack = () => {
        this.props.onClickBack();
    }

    render() {
        return (
            <View style={gViewStyles.navigationBar}>
                {(this.state.hiddenBack == true) ? (<View></View>) : (<TouchableOpacity onPress={()=>this.onClickBack()}>
                    <View style={gViewStyles.backView}>
                        <Image source={require('../source/fanhui.png')} style={gImageStyles.leftArrow}/>
                    </View>
                    </TouchableOpacity>)}

                <View style={gViewStyles.navigationBarTitle}>
                    <Text style={gTextStyles.navigationTitle}>{this.state.title}</Text>
                </View>
            </View>
        );
    };
}