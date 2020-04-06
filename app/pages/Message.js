import React, { Component } from "react";
import {Text, View, StyleSheet, ScrollView, Image, FlatList, TouchableOpacity, Dimensions} from "react-native";
import httpApi from "../tools/Api";
import LoadingView from "../component/LoadingView";

export default class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mesData: [],
            load: false
        };
    }

    componentDidMount() {
        this.fetchMesData();
    }



    // 请求消息数据
    fetchMesData = async () => {
        let params = {};
        let res = await httpApi.getMesData(params);

        if (res.status == 0) {
            this.setState({
                mesData: res.data,
                load: true
            });
        } else {
            alert("网络异常！请检查网络！");
        }
    }

    onClickItem = (item) => {
        let params = {

        };
        this.props.navigation.navigate('Chat', params);
    }

    // 点击头像
    onClickAvatar = (userId) => {
        // let params = {
        //     userId: userId,
        // };
        // this.props.navigation.navigate('PersonInfo', params);
    };

    render() {
        if (this.state.load == false) {
            return <LoadingView></LoadingView>
        }
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.mesData}
                    renderItem={this.msgListItemView}
                    style={styles.msgListContainer}
                    ListHeaderComponent={this.headerItemView}
                />
            </View>

        );
    };

    headerItemView = () => {
        return(
            <View style={styles.topContainer}>
                <View style={styles.msgIconContainer}>
                    <TouchableOpacity onPress={()=>{alert(1)}}>
                        <Image source={require('../source/关注.png')} style={styles.msgIcon}/>
                    </TouchableOpacity>
                    <Text style={styles.msgDes}>关注</Text>
                </View>

                <View style={styles.msgIconContainer}>
                    <TouchableOpacity onPress={()=>{alert(1)}}>
                        <Image source={require('../source/评论.png')} style={styles.msgIcon}/>
                    </TouchableOpacity>
                    <Text style={styles.msgDes}>评论</Text>
                </View>

                <View style={styles.msgIconContainer}>
                    <TouchableOpacity onPress={()=>{alert(1)}}>
                        <Image source={require('../source/点赞.png')} style={styles.msgIcon}/>
                    </TouchableOpacity>
                    <Text style={styles.msgDes}>点赞</Text>
                </View>

                <View style={styles.msgIconContainer}>
                    <TouchableOpacity onPress={()=>{alert(1)}}>
                        <Image source={require('../source/通知.png')} style={styles.msgIcon}/>
                    </TouchableOpacity>
                    <Text style={styles.msgDes}>通知</Text>
                </View>
            </View>
        );
    }




    msgListItemView = ({ item }) => {
        return (
            <View>
                <TouchableOpacity onPress={()=>this.onClickItem(item)}>
                    <View style={styles.line}></View>
                    <View style={styles.msgContainer}>
                        <TouchableOpacity onPress={()=>this.onClickAvatar(item)}>
                            <Image source={require('../source/avatar.jpg')} style={styles.avatar}/>
                        </TouchableOpacity>
                        <View style={styles.msgSubContainer}>
                            <View style={styles.mesSubContainer}>
                                <Text style={styles.text1}>昵称啦啦啦</Text>
                                <View style={styles.container1}>
                                    <Text style={styles.text3}>{item.created_at}</Text>
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

}

const {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    msgListContainer: {
        backgroundColor: 'white',
    },
    topContainer: {
        marginTop: 15,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 60,
    },
    msgIcon: {
        width: 44,
        height: 44,
    },
    msgIconContainer: {
        alignItems: 'center',
    },
    msgDes: {
        marginTop: 5,
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
        color: gColor.grayTextColor,
    }
});