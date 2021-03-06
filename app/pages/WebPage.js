import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import MyStatusBar from '../component/MyStatusBar'

export default class WebPage extends Component {

    render() {
        return (
            <View>
                <MyStatusBar></MyStatusBar>
                <SafeAreaView>
                    <MyNavigationBar
                        title={'网页'}
                        onClickBack={()=>{this.props.navigation.goBack();}}
                    ></MyNavigationBar>
                    <View style={{ height: gScreen.screen_height - gScreen.statusBarHeight - 44,
                        width: gScreen.screen_width, overflow:'hidden'}}>
                        <WebView
                            source={{uri: this.props.route.params.url}}
                            scalesPageToFit={true}
                        />
                    </View>
                </SafeAreaView>
            </View>

        );
    }
}