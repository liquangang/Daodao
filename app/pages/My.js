import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    ImageBackground,
    FlatList,
    Dimensions,
    TouchableOpacity,
    DeviceEventEmitter
} from "react-native";
import httpApi from "../tools/Api";
import LoadingView from "../component/LoadingView";

export default class My extends Component {

    constructor(props) {
        super(props);
        this.state = {
            optionData: [
                {title: '我的动态', img: require('../source/dongtai.png')},
                {title: '我的相册', img: require('../source/xiangce.png')},
                {title: '实名认证', img: require('../source/shiming.png')},
                {title: '广告投放', img: require('../source/guanggao.png')},
                {title: '帮助中心', img: require('../source/bangzhu.png')},
                {title: '投诉反馈', img: require('../source/tousu.png')},
                {title: '在线客服', img: require('../source/kefu.png')},
                {title: '关于我们', img: require('../source/guanyu.png')},
                {title: '检查更新', img: require('../source/gengxin.png')},
                {title: '退出登录', img: require('../source/tuichu.png')},
            ],
            personalData: [],
            load: false,
        };

        this.emitter = null;
    }

    componentDidMount() {
        this.fetchPersonalData();

        this.emitter = DeviceEventEmitter.addListener('updatePersonInfo', ()=>{this.fetchPersonalData();});
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
                                showType: 1,
                            };
                            this.props.navigation.navigate('PersonInfo', params);
                        } else if (item.title == '实名认证') {
                            this.props.navigation.navigate('Verified', null);
                        } else if (item.title == '广告投放') {

                        } else if (item.title == '帮助中心') {
                            this.props.navigation.navigate('HelpCenter', null);
                        } else if (item.title == '投诉反馈') {
                            this.props.navigation.navigate('Feedback', null);
                        } else if (item.title == '在线客服') {

                        } else if (item.title == '关于我们') {
                            this.props.navigation.navigate('AboutUs', null);
                        } else if (item.title == '检查更新') {

                        } else {

                        }
                    }}>
                        <View style={styles.itemContainer}>
                            <View style={styles.itemInfoContainer}>
                                <Image source={item.img}
                                       style={styles.itemIcon}/>
                                <Text style={styles.itemText}>{item.title}</Text>
                                <Image source={require('../source/youjiantou.png')} style={styles.itemArrow}/>
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
            <ImageBackground style={styles.topContainer} source={require('../source/wodebeijingtu.png')}>
                <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate('EditPersonInfo', null);
                }}>
                    <Image source={{uri: this.state.personalData.user_info.avatar}} style={styles.avatar}/>
                </TouchableOpacity>
                <View style={styles.personalInfoContainer}>
                    <Text style={styles.nickName}>{this.state.personalData.user_info.nick_name}</Text>
                    <Text style={styles.commonText}>ID：{this.state.personalData.user_info.id}</Text>
                    <Text style={styles.commonText}>粉丝：{this.state.personalData.user_info.fan_num}  关注：{this.state.personalData.user_info.follow_num}</Text>
                </View>
                <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate('EditPersonInfo', null);
                }}>
                    <Image source={require('../source/xiugai.png')} style={styles.updateNickName}/>
                </TouchableOpacity>
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
        margin: 16,
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