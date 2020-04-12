import React, { Component } from "react";
import {Text, View, StyleSheet, Image, ImageBackground, FlatList, Dimensions, TouchableOpacity } from "react-native";
import httpApi from "../tools/Api";
import LoadingView from "../component/LoadingView";

export default class My extends Component {

    constructor(props) {
        super(props);
        this.state = {
            optionData: [
                {title: '我的动态', img: require('../source/动态.png')},
                {title: '我的相册', img: require('../source/相册.png')},
                {title: '实名认证', img: require('../source/实名.png')},
                {title: '广告投放', img: require('../source/广告.png')},
                {title: '帮助中心', img: require('../source/帮助.png')},
                {title: '投诉反馈', img: require('../source/投诉.png')},
                {title: '在线客服', img: require('../source/客服.png')},
                {title: '关于我们', img: require('../source/关于.png')},
                {title: '检查更新', img: require('../source/更新.png')},
                {title: '退出登录', img: require('../source/退出.png')},
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
            <View style={styles.container}>
                {this.topView()}
                <FlatList
                    style={styles.list}
                    renderItem={({item, index})=>(<TouchableOpacity onPress={()=>{
                        if (item.title == '我的动态') {
                            let params = {
                                userId: 2,
                            };
                            this.props.navigation.navigate('PersonInfo', params);
                        } else if (item.title == '我的相册') {
                            let params = {
                                userId: 2,
                            };
                            this.props.navigation.navigate('PersonInfo', params);
                        } else if (item.title == '实名认证') {

                        } else if (item.title == '广告投放') {

                        } else if (item.title == '帮助中心') {

                        } else if (item.title == '投诉反馈') {

                        } else if (item.title == '在线客服') {

                        } else if (item.title == '关于我们') {

                        } else if (item.title == '检查更新') {

                        } else {

                        }
                    }}>
                        <View style={styles.itemContainer}>
                            <View style={styles.itemInfoContainer}>
                                <Image source={item.img}
                                       style={styles.itemIcon}/>
                                <Text style={styles.itemText}>{item.title}</Text>
                                <Image source={require('../source/右箭头.png')} style={styles.itemArrow}/>
                            </View>
                            <View style={styles.bottomLine}></View>
                        </View>
                    </TouchableOpacity>)}
                    data={this.state.optionData}
                />
            </View>
        );
    };

    topView = () => {
        return(
            <ImageBackground style={styles.topContainer} source={require('../source/我的背景图.png')}>
                <Image source={require('../source/未登陆.png')} style={styles.avatar}/>
                <View style={styles.personalInfoContainer}>
                    <Text style={styles.nickName}>{this.state.personalData.user_info.nick_name}</Text>
                    <Text style={styles.commonText}>ID：{this.state.personalData.user_info.id}</Text>
                    <Text style={styles.commonText}>粉丝：{this.state.personalData.user_info.fan_num}
                    关注：{this.state.personalData.user_info.follow_num}</Text>
                </View>
                <Image source={require('../source/修改.png')} style={styles.updateNickName}/>
            </ImageBackground>
        );
    }

}

const {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    topContainer: {
        height: 150,
        flexDirection: 'row',
        paddingTop: gScreen.statusBarHeight,
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
        width: 16,
        height: 16,
    },
    bottomLine: {
        marginTop: 13,
        height: 1,
        backgroundColor: gColor.grayLineColor
    },
    itemInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center'
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
        backgroundColor: 'white',
    }
});