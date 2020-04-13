import React, { Component } from "react";
import { Image, View, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
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
                        data={[require('../source/ad1.png'),
                            require('../source/ad5.png'),
                            require('../source/ad2.png'),]}
                        renderItem={({item})=>{
                            return(<View style={gViewStyles.itemView1}>
                                <TouchableOpacity>
                                    <Image source={item} style={gImageStyles.ad1}></Image>
                                </TouchableOpacity>
                            </View>);
                        }}
                    >
                    </FlatList>
                </SafeAreaView>
            </View>
        );
    };
}