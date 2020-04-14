import React, { Component } from "react";
import { Image, View, SafeAreaView, FlatList, TouchableWithoutFeedback } from "react-native";
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
                    <FlatList
                        style={backgroundColor='#F4F1F4'}
                        data={[require('../source/ad1.jpg'),
                            require('../source/ad2.jpg'),
                            require('../source/ad3.jpg'),
                            require('../source/ad4.jpg'),
                            require('../source/ad5.jpg'),
                            require('../source/ad6.jpg'),
                            require('../source/ad7.jpg'),
                            require('../source/splashAd.jpg'),
                            require('../source/splashAd1.png'),]}
                        renderItem={({item})=>{
                            let imgW = Image.resolveAssetSource(item).width;
                            let imgH = Image.resolveAssetSource(item).height;
                            let showW = gScreen.screen_width - 24;
                            let showH = showW / imgW * imgH;
                                return(<View style={gViewStyles.itemView1}>
                                    <TouchableWithoutFeedback>
                                        <View>
                                            <Image source={item}
                                                   style={[gImageStyles.ad1, {height: showH}]}></Image>
                                            <View style={gViewStyles.segmentation}></View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>);
                        }}
                    >
                    </FlatList>
                </SafeAreaView>
            </View>
        );
    };
}