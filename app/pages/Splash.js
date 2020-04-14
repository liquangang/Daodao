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
            data: [require('../source/splashAd.jpg'), require('../source/ad6.jpg'), require('../source/ad7.jpg')],
            load: true
        };
    }

    componentDidMount() {
        this.fetchADData();
        // setTimeout(this.onClickNext,3000);
    }

    onClickImg = (data) => {
        this.props.onClickAd(data);
    }

    fetchADData = async() => {
        let params = {
            post_cate_id: 3,
        };
        let res = await httpApi.httpPost("http://dd.shenruxiang.com/api/v1/cate_adv_list", params);
        if (res.status == 0) {
            this.setState({
                data: res.data.data,
                load: true
            });
        } else {
            alert("网络异常！请检查网络！");
        }
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
                                        {/*<Image source={{uri: value.src}} style={gImageStyles.splashImg}/>*/}
                                        <Image source={value} style={[{height: gScreen.screen_height, width: gScreen.screen_width}]}/>
                                    </TouchableWithoutFeedback>
                                );
                            })
                        ) : (
                            <TouchableWithoutFeedback onPress={() => this.onClickImg(this.state.data)}>
                                {/*<Image source={{uri: this.state.data.src}} style={styles.img}/>*/}
                                <Image source={require('../source/splashAd.jpg')}
                                       style={gImageStyles.gImageStyles.splashImg}/>
                            </TouchableWithoutFeedback>
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