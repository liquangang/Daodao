import React, { Component } from "react";
import {Text, View, StyleSheet, SafeAreaView, Image, FlatList, TouchableOpacity, Dimensions} from "react-native";
import httpApi from "../tools/Api";
import LoadingView from "../component/LoadingView";
import MyNavigationBar from '../component/MyNavigationBar'
import MyStatusBar from "../component/MyStatusBar";
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {gViewStyles} from "../style/ViewStyles";
import {gTextStyles} from "../style/TextStyles";

export default class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [[], [], [], [], []],
            titleList: ['关注', '评论', '点赞', '私信', '通知'],
            load: false,
            showIndex: 1
        };
    }

    componentDidMount() {
        this.fetchAttentionData();
    }

    // 点击头像
    onClickAvatar = (item) => {
        let params = {
            userId: item.to_user.id,
        };
        this.props.navigation.navigate('PersonInfo', params);
    };

    // 点击关注
    onClickAttention = (item) => {
        console.log("-----------item", item);
        // 跳转个人详情
        let params = {
            userId: item.user.id,
        };
        this.props.navigation.navigate('PersonInfo', params);
    }

    // 请求关注列表
    fetchAttentionData = async() => {
        let params = {};
        let res = await httpApi.httpPost("http://dd.shenruxiang.com/api/v1/user_fan_list", params);
        this.updateData(0, res);
    }

    // 请求评论列表
    fetchCommentData = async() => {
        let params = {};
        let res = await httpApi.httpPost('http://dd.shenruxiang.com/api/v1/user_comment_list', params);
        this.updateData(1, res);
    }

    // 请求点赞列表
    fetchPraiseData = async() => {
        let params = {};
        let res = await httpApi.httpPost('http://dd.shenruxiang.com/api/v1/user_praise_list', params);
        this.updateData(2, res);
    }

    // 请求私信列表
    fetchChatData = async() => {
        let params = {};
        let res = await httpApi.httpPost('http://dd.shenruxiang.com/api/v1/user_message_list', params);
        if (res.status == 0) {
            let newData = this.state.data;
            newData[3] = res.data;
            this.setState({
                data: newData,
                showIndex: 3,
                load: true
            });
        } else {
            alert("网络异常！请检查网络！");
        }
    }

    // 请求通知列表
    fetchNoticeData = async () => {
        let params = {};
        let res = await httpApi.httpPost('http://dd.shenruxiang.com/api/v1/notice_list', params);
        this.updateData(4, res);
    }

    updateData = (index, res) => {
        if (res.status == 0) {
            let newData = this.state.data;
            newData[index] = res.data.data;
            this.setState({
                data: newData,
                showIndex: index,
                load: true
            });
        } else {
            alert("网络异常！请检查网络！");
        }
    }

    // 切换tab
    onChangeTabs = (index) => {

        if (this.state.data != null && this.state.data[index].length > 0) {
            // 有数据
            let newData = this.state.data;
            this.setState({
                data: newData,
                showIndex: index,
                load: true
            });
        } else {
            // 无数据
            this.fetchData(index);
        }

    }

    fetchData = (index) => {
        if (index == 0) {
            this.fetchAttentionData();
        } else if (index == 1) {
            this.fetchCommentData();
        } else if (index == 2) {
            this.fetchPraiseData();
        } else if (index == 3) {
            this.fetchChatData();
        } else if (index == 4) {
            this.fetchNoticeData();
        }
    }

    onClickItem = (item) => {
        let params = {

        };
        this.props.navigation.navigate('Chat', params);
    }

    render() {
        if (this.state.load == false) {
            return <LoadingView></LoadingView>
        }
        return (
            <View style={gViewStyles.rootViewContainer}>
                <MyStatusBar></MyStatusBar>
                <SafeAreaView style={styles.container}>
                    <MyNavigationBar
                        title={'消息记录'}
                        onClickBack={()=>{this.props.navigation.goBack();}}
                    ></MyNavigationBar>

                    {this.headerItemView()}

                    {this.listView()}

                </SafeAreaView>
            </View>

        );
    };

    listView = () => {
        return(
            <FlatList
                extraData={this.state}
                data={this.state.data[this.state.showIndex]}
                renderItem={this.listItemView}
                style={gViewStyles.flatList}
            />
        );
    }

    headerItemView = () => {
        return(
            <View style={styles.topContainer}>
                <View style={styles.msgIconContainer}>
                    <TouchableOpacity onPress={()=>this.onChangeTabs(0)}>
                        <Image source={require('../source/关注.png')} style={styles.msgIcon}/>
                    </TouchableOpacity>
                    <Text style={styles.msgDes}>关注</Text>
                    {this.state.showIndex == 0 ? (<View style={gViewStyles.scrollBarBottomLine1}></View>) : (<View></View>)}
                </View>

                <View style={styles.msgIconContainer}>
                    <TouchableOpacity onPress={()=>this.onChangeTabs(1)}>
                        <Image source={require('../source/评论.png')} style={styles.msgIcon}/>
                    </TouchableOpacity>
                    <Text style={styles.msgDes}>评论</Text>
                    {this.state.showIndex == 1 ? (<View style={gViewStyles.scrollBarBottomLine1}></View>) : (<View></View>)}
                </View>

                <View style={styles.msgIconContainer}>
                    <TouchableOpacity onPress={()=>this.onChangeTabs(2)}>
                        <Image source={require('../source/点赞.png')} style={styles.msgIcon}/>
                    </TouchableOpacity>
                    <Text style={styles.msgDes}>点赞</Text>
                    {this.state.showIndex == 2 ? (<View style={gViewStyles.scrollBarBottomLine1}></View>) : (<View></View>)}
                </View>

                <View style={styles.msgIconContainer}>
                    <TouchableOpacity onPress={()=>this.onChangeTabs(3)}>
                        <Image source={require('../source/评论.png')} style={styles.msgIcon}/>
                    </TouchableOpacity>
                    <Text style={styles.msgDes}>私信</Text>
                    {this.state.showIndex == 3 ? (<View style={gViewStyles.scrollBarBottomLine1}></View>) : (<View></View>)}
                </View>

                <View style={styles.msgIconContainer}>
                    <TouchableOpacity onPress={()=>this.onChangeTabs(4)}>
                        <Image source={require('../source/通知.png')} style={styles.msgIcon}/>
                    </TouchableOpacity>
                    <Text style={styles.msgDes}>通知</Text>
                    {this.state.showIndex == 4 ? (<View style={gViewStyles.scrollBarBottomLine1}></View>) : (<View></View>)}
                </View>
            </View>
        );
    }

    listItemView = ({item}) => {
        switch (this.state.showIndex) {
            case 0:
            {
                return(this.attentionItemView(item));
            }
                break;
            case 1:
            {
                return(this.commentItemView(item));
            }
                break;
            case 2:
            {
                return(this.praiseItemView(item));
            }
                break;
            case 3:
            {
                return(this.chatItemView(item));
            }
                break;
            case 4:
            {
                return(this.noticeItemView(item));
            }
                break;
            default:
            {
                return(<View></View>);
            }
                break;
        }
    }

    attentionItemView = (item) => {
        return(
            <View>
                <TouchableOpacity onPress={()=>this.onClickAttention(item)}>
                    <View style={styles.line}></View>
                    <View style={styles.msgContainer}>
                        {/*<TouchableOpacity onPress={()=>this.onClickAvatar(item)}>*/}
                            {/*<Image source={{uri: item.to_user.avatar}} style={styles.avatar}/>*/}
                            <Image source={require('../source/未登陆.png')} style={styles.avatar}/>
                        {/*</TouchableOpacity>*/}
                        <View style={styles.msgSubContainer}>
                            <View style={styles.mesSubContainer}>
                                <Text style={styles.text1}>{item.user.nick_name}</Text>
                            </View>
                            <View style={styles.mesSubContainer1}>
                                <Text style={styles.text2}>Ta关注了你！</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    commentItemView = (item) => {
        return(
            <View>
                <TouchableOpacity onPress={()=>this.onClickItem(item)}>
                    <View style={styles.line}></View>
                    <View style={styles.msgContainer}>
                        <TouchableOpacity>
                            <Image source={require('../source/未登陆.png')} style={styles.avatar}/>
                        </TouchableOpacity>
                        <View style={styles.msgSubContainer}>
                            <View style={styles.mesSubContainer}>
                                <Text style={styles.text1}>{item.user.nick_name}</Text>
                                <View style={styles.container1}>
                                    <Text style={styles.text3}>1小时前</Text>
                                    <Text style={styles.text2}> * </Text>
                                </View>
                            </View>
                            <View style={styles.mesSubContainer1}>
                                <Text style={styles.text2}>评论：</Text>
                                <Text style={styles.text3}>{item.content}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    praiseItemView = (item) => {
        return(<View><View>
            <TouchableOpacity onPress={()=>this.onClickItem(item)}>
                <View style={styles.line}></View>
                <View style={styles.msgContainer}>
                    <TouchableOpacity onPress={()=>this.onClickAvatar(item)}>
                        {/*<Image source={{uri: item.to_user.avatar}} style={styles.avatar}/>*/}
                        <Image source={require('../source/未登陆.png')} style={styles.avatar}/>
                    </TouchableOpacity>
                    <View style={styles.msgSubContainer}>
                        <View style={styles.mesSubContainer}>
                            <Text style={styles.text1}>给你点赞的用户昵称</Text>
                        </View>
                        <View style={styles.mesSubContainer1}>
                            <Text style={styles.text2}>Ta给你点赞啦！</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View></View>);
    }

    chatItemView = (item) => {
        return(<View>
            <TouchableOpacity onPress={()=>this.onClickItem(item)}>
                <View style={styles.line}></View>
                <View style={styles.msgContainer}>
                    <TouchableOpacity>
                        <Image source={require('../source/未登陆.png')} style={styles.avatar}/>
                    </TouchableOpacity>
                    <View style={styles.msgSubContainer}>
                        <View style={styles.mesSubContainer}>
                            <Text style={styles.text1}>给你发私信的人的昵称</Text>
                            <View style={styles.container1}>
                                <Text style={styles.text3}>1小时前</Text>
                                <Text style={styles.text2}> * </Text>
                            </View>
                        </View>
                        <View style={styles.mesSubContainer1}>
                            <Text style={styles.text2}>私信：</Text>
                            <Text style={styles.text3}>{item.content}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>)
    }

    noticeItemView = (item) => {

        return(<View><View>
            <TouchableOpacity onPress={()=>this.onClickItem(item)}>
                <View style={styles.line}></View>
                <View style={styles.msgContainer}>
                    <TouchableOpacity onPress={()=>this.onClickAvatar(item)}>
                        {/*<Image source={{uri: item.to_user.avatar}} style={styles.avatar}/>*/}
                        <Image source={require('../source/未登陆.png')} style={styles.avatar}/>
                    </TouchableOpacity>
                    <View style={styles.msgSubContainer}>
                        <View style={styles.mesSubContainer}>
                            <Text style={styles.text1}>消息通知</Text>
                        </View>
                        <View style={styles.mesSubContainer1}>
                            <Text style={styles.text2}>{item.content}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View></View>);
    }

}

const {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 80,
        backgroundColor: 'white'
    },
    msgIcon: {
        width: 42,
        height: 42,
    },
    msgIconContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
    },
    msgDes: {
        marginTop: 5,
        fontSize: 12,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
    },
    avatar: {
        flex: 54,
        borderRadius: 27,
        width: 54,
        height: 54,
        marginLeft: 10,
    },
    line: {
        height: 0.5,
        marginLeft: 2,
        marginRight: 2,
        backgroundColor: gColor.grayLineColor,
    },
    mesSubContainer: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    mesSubContainer1: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    msgSubContainer: {
        flex: width - 74,
    },
    container1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    text1: {
        fontSize: 17,
    },
    text2: {
        color: gColor.orangeTextColor,
    },
    text3: {
        color: '#333333',
    }
});