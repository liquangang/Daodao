import React, { Component } from "react";
import { Text, View, TouchableOpacity, StatusBar, Image, TouchableWithoutFeedback } from "react-native";
import MyStatusBar from "../component/MyStatusBar";
import Swiper from 'react-native-swiper';
import {gViewStyles} from "../style/ViewStyles";
import {gImageStyles} from "../style/ImageStyles";
import {gTextStyles} from "../style/TextStyles";

export default class Splash extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
    }

    componentDidMount() {
        this.fetchADData();
        // setTimeout(this.onClickNext,3000);
    }

    onClickImg = (item) => {
        if (item.href != null && item.href.length > 0) {
            let params = {
                url: item.href,
            };
            this.props.navigation.navigate('WebPage', params);
        }
    }

    fetchADData = async() => {
        let res = await httpApi.httpPost("http://dd.shenruxiang.com/api/v1/app_start_list", null);
        this.setState({
            data: res,
        });
    }

    render() {
        return(
            <View style={gViewStyles.rootViewContainer}>
                <StatusBar barStyle="dark-content"/>
                <Swiper
                    style={[gViewStyles.splashImgBack]}
                    horizontal={true}
                    activeDotColor={'#FB5442'}
                    paginationStyle={{bottom: 12}}
                    showsButtons={false}
                    autoplayTimeout={2}
                >

                    {
                        Array.isArray(this.state.data) ? (
                            Array.from(this.state.data).map((value, index, array) => {
                                return (
                                    <TouchableWithoutFeedback onPress={() => this.onClickImg(value)} key={index}>
                                        <Image source={{uri: value.src}} style={gImageStyles.splashImg}/>
                                        {/*<Image source={value} style={[{height: gScreen.screen_height, width: gScreen.screen_width}]}/>*/}
                                    </TouchableWithoutFeedback>
                                );
                            })
                        ) : (
                            <View></View>
                        )
                    }
                </Swiper>
                <View style={gViewStyles.splashTextView}>
                    <Text style={gTextStyles.splashText}>跳过</Text>
                </View>
                <TouchableOpacity style={[gViewStyles.splashBtnView]} onPress={() => {
                    this.props.navigation.navigate('MainNav', null);
                }}>
                </TouchableOpacity>
            </View>
        );
    };
}