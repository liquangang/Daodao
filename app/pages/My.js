import React, { Component } from "react";
import {Text, View, StyleSheet, Image, ImageBackground, FlatList, Dimensions } from "react-native";
import httpApi from "../tools/Api";
import LoadingView from "../component/LoadingView";

export default class My extends Component {

    constructor(props) {
        super(props);
        this.state = {
            optionData: [
                {title: '我的动态', img: require('../source/dongtai.jpg')},
                {title: '我的相册', img: require('../source/xiangce.jpg')},
                {title: '实名认证', img: require('../source/shiming.jpg')},
                {title: '广告投放', img: require('../source/guanggao.jpg')},
                {title: '帮助中心', img: require('../source/bangzhu.jpg')},
                {title: '投诉反馈', img: require('../source/tousu.jpg')},
                {title: '在线客服', img: require('../source/zaixian.jpg')},
                {title: '关于我们', img: require('../source/guanyu.jpg')},
                {title: '检查更新', img: require('../source/jiancha.jpg')},
                {title: '退出登录', img: require('../source/tuichu.jpg')},
            ],
            personalData: [],
            load: false,
        };
    }

    componentDidMount() {
        this.fetchPersonalData();
    }

    // 请求个人数据
    fetchPersonalData = async () => {
        let params = {};
        let res = await httpApi.getPersonalData(params);

        if (res.status == 0) {
            this.setState({
                personalData: res.data,
                load: true
            });
        } else {
            alert("网络异常！请检查网络！");
        }
    }

    render() {
        if (this.state.load == false) {
            return <LoadingView></LoadingView>
        }
        return(
                <FlatList
                    style={styles.list}
                    renderItem={this.myItemView}
                    data={this.state.optionData}
                    ListHeaderComponent={this.topView}
                />
        );
    };

    topView = () => {
        return(
            <ImageBackground style={styles.topContainer}>
                <Image source={require('../source/avatar.jpg')} style={styles.avatar}/>
                <View style={styles.personalInfoContainer}>
                    <Text style={styles.nickName}>{this.state.personalData.user_info.nick_name}</Text>
                    <Text style={styles.commonText}>ID：{this.state.personalData.user_info.id}</Text>
                    <Text style={styles.commonText}>粉丝：{this.state.personalData.user_info.fan_num}
                    关注：{this.state.personalData.user_info.follow_num}</Text>
                </View>
                <Image source={require('../source/updateNickName.jpg')} style={styles.updateNickName}/>
            </ImageBackground>
        );
    }

    myItemView({ item }) {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemInfoContainer}>
                    <Image source={item.img}
                           style={styles.itemIcon}/>
                    <Text style={styles.itemText}>{item.title}</Text>
                    <Image source={require('../source/rightArrow.jpg')} style={styles.itemArrow}/>
                </View>
                <View style={styles.bottomLine}></View>
            </View>
        );
    }
}

const {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    topContainer: {
        height: 150,
        flexDirection: 'row',
        backgroundColor: gColor.orangeTextColor,
    },
    avatar: {
        height: 60,
        width: 60,
        margin: 10,
        borderRadius: 30,
    },
    personalInfoContainer: {
        marginTop: 15,
    },
    nickName: {
        fontSize: 18,
        color: 'white'
    },
    commonText: {
        color: 'white'
    },
    updateNickName: {
        margin: 10,
        height: 25,
        width: 25,
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
    },
    itemContainer: {
        padding: 10,
        fontSize: 18,
        height: 48,
    },
    itemIcon: {
        flex: 20,
        marginTop: 10,
        width: 20,
        height: 20,
    },
    bottomLine: {
        marginTop: 13,
        height: 1,
        backgroundColor: gColor.grayLineColor
    },
    itemInfoContainer: {
        flexDirection: 'row',
    },
    itemText: {
        flex: width - 200,
        marginTop: 11,
        marginLeft: 10,
    },
    itemArrow: {
        height: 25,
        width: 25,
        marginTop: 10,
    },
    list: {
        backgroundColor: 'white'
    }
});