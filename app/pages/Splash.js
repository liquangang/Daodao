import React, { Component } from "react";
import { Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity } from "react-native";
import MyStatusBar from "../component/MyStatusBar";
import Swiper from 'react-native-swiper';
import {gViewStyles} from "../style/ViewStyles";
import {gImageStyles} from "../style/ImageStyles";
import {gTextStyles} from "../style/TextStyles";

export default class Splash extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            load: true
        };
    }

    componentDidMount() {
        this.fetchADData();
        setTimeout(this.onClickNext,3000);
    }

    onClickNext = () => {
        this.props.navigation.navigate('MainNav', null);
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
            <View>
                <StatusBar barStyle="dark-content"/>
                <Image source={require('../source/splashAd.png')} style={gImageStyles.splashImgBack}/>
                <TouchableOpacity onPress={this.onClickNext}>
                    <View style={gViewStyles.splashTextView}>
                    </View>
                    <Text style={gTextStyles.splashText}>跳过</Text>
                </TouchableOpacity>
                    {/*<Swiper*/}
                        {/*style={gViewStyles.splashImgBack}*/}
                        {/*horizontal={true}*/}
                        {/*activeDotColor={'#FB5442'}*/}
                        {/*paginationStyle={{bottom: 12}}*/}
                        {/*showsButtons={false}*/}
                        {/*autoplayTimeout={2}*/}
                    {/*>*/}

                        {/*{*/}
                            {/*Array.isArray(this.state.data) ? (*/}
                                {/*Array.from(this.state.data).map((value, index, array)=>{*/}
                                    {/*return(*/}
                                        {/*<TouchableOpacity onPress={()=>this.onClickImg(value)} key={index}>*/}
                                            {/*<Image source={{uri: value.src}} style={gImageStyles.splashImg}/>*/}
                                            {/*/!*<Image source={require('../source/广告1.png')} style={styles.img}/>*!/*/}
                                        {/*</TouchableOpacity>*/}
                                    {/*);*/}
                                {/*})*/}
                            {/*) : (*/}
                                {/*<TouchableOpacity onPress={()=>this.onClickImg(this.state.data)}>*/}
                                    {/*/!*<Image source={{uri: this.state.data.src}} style={styles.img}/>*!/*/}
                                    {/*<Image source={require('../source/启动广告.jpg')} style={gImageStyles.gImageStyles.splashImg}/>*/}
                                {/*</TouchableOpacity>*/}
                            {/*)*/}
                        {/*}*/}
                    {/*</Swiper>*/}
            </View>
        );
    };
}