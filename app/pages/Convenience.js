import React, { Component } from "react";
import { Image, View, SafeAreaView, FlatList, TouchableWithoutFeedback } from "react-native";
import { WebView } from 'react-native-webview';
import MyNavigationBar from '../component/MyNavigationBar'
import MyStatusBar from "../component/MyStatusBar";
import {gImageStyles} from "../style/ImageStyles";
import {gViewStyles} from "../style/ViewStyles";

export default class Convenience extends Component {
    render() {
        return(
            <View style={gViewStyles.rootViewContainer}>
                <MyStatusBar/>
                <SafeAreaView style={[gViewStyles.rootViewContainer, backgroundColor='#F4F1F4']}>
                    <MyNavigationBar
                        title={'便民'}
                        hiddenBack={true}
                    ></MyNavigationBar>
                    <View style={{ height: gScreen.screen_height - gScreen.statusBarHeight - 44,
                        width: gScreen.screen_width, overflow:'hidden'}}>
                        <WebView
                            source={{uri: 'http://dd.shenruxiang.com/api/v1/adv_page?en_name=bianmin'}}
                            scalesPageToFit={true}
                        />
                    </View>
                </SafeAreaView>
            </View>
        );
    };
}