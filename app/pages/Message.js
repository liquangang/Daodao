import React, { Component } from "react";
import {Text, View, StyleSheet, ScrollView, Image, FlatList, TouchableOpacity, Dimensions} from "react-native";
import httpApi from "../tools/Api";
import LoadingView from "../component/LoadingView";
import MyNavigationBar from '../component/MyNavigationBar'
import MyStatusBar from "../component/MyStatusBar";
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

export default class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mesData: [{0:[]}, {1:[]}, {2:[]}, {3:[]}],
            load: false,
            showIndex: 0
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

    onClickType = (index) => {
        switch (index) {
            case 0:
            {
                // 请求关注列表
            }
            break;
            case 1:
            {
                // 请求评论列表
            }
            break;
            case 2:
            {
                // 请求点赞列表
            }
                break;
            case 3:
            {
                // 请求通知列表
            }
                break;
        }
    }

    render() {
        if (this.state.load == false) {
            return <LoadingView></LoadingView>
        }
        return (
            <View style={styles.container}>
                <MyStatusBar/>
                <MyNavigationBar
                    title={'消息'}
                    onClickBack={()=>{this.props.navigation.goBack();}}
                ></MyNavigationBar>
                {/*<FlatList*/}
                    {/*data={this.state.mesData}*/}
                    {/*renderItem={this.msgListItemView}*/}
                    {/*style={styles.msgListContainer}*/}
                    {/*ListHeaderComponent={this.headerItemView}*/}
                {/*/>*/}

                <ScrollableTabView
                    initialPage={this.state.showIndex}
                >
                    {this.state.newsTypeList.map((value, index, array)=>{
                        return(<FlatList
                            data={this.state.mesData[value.id]}
                            renderItem={this.newsListItemView}
                            style={styles.newsList}
                            key={index}
                        />);
                    })}

                </ScrollableTabView>
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
                        <TouchableOpacity>
                            <Image source={require('../source/未登陆.png')} style={styles.avatar}/>
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
        width: 42,
        height: 42,
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