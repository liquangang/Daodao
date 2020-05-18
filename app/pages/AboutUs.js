import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { WebView } from 'react-native-webview';
import MyStatusBar from '../component/MyStatusBar'
import MyNavigationBar from '../component/MyNavigationBar'
import {gViewStyles} from "../style/ViewStyles";

export default class AboutUs extends Component {

    render() {
        return (
            <View>
                <MyStatusBar></MyStatusBar>
                <SafeAreaView style={gViewStyles.rootViewContainer}>
                    <MyNavigationBar
                        title={'关于我们'}
                        onClickBack={()=>{this.props.navigation.goBack();}}
                    ></MyNavigationBar>
                    <View style={{ height: gScreen.screen_height - gScreen.statusBarHeight - 44,
                        width: gScreen.screen_width, overflow:'hidden'}}>
                        <WebView
                            source={{uri: 'http://dd.shenruxiang.com/api/v1/adv_page?en_name=about'}}
                            scalesPageToFit={true}
                        />
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}
