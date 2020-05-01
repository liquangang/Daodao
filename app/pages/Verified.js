import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import MyStatusBar from '../component/MyStatusBar'

export default class Verified extends Component {

    render() {
        return (
            <View>
                <MyStatusBar></MyStatusBar>
                <SafeAreaView>
                    <MyNavigationBar
                        title={'实名认证'}
                        onClickBack={()=>{this.props.navigation.goBack();}}
                    ></MyNavigationBar>
                </SafeAreaView>
            </View>

        );
    }
}