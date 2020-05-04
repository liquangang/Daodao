import React, { Component } from "react";
import {Text, View, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, SectionList, SafeAreaView} from "react-native";
import httpApi from "../tools/Api";
import LoadingView from "../component/LoadingView";
import {gViewStyles} from "../style/ViewStyles";
import MyNavigationBar from '../component/MyNavigationBar'
import MyStatusBar from "../component/MyStatusBar";
import NewsView from "../component/news/NewsView"
import {gTextStyles} from "../style/TextStyles";

// 个人详情页，注意与my页区分
// 需要传入userid
export default class PersonInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            personalData: [],
            albumData: [],
            attentionData: [],
            load: false,
            showType: 0, // 展示数据类型，0：资料部分，1：相册 2: 关注
            userId: null,
        };
    }

    componentDidMount() {
        this.setState({
            userId: this.props.route.params.userId,
            showType: this.props.route.params.showType
        });

        if (this.props.route.params.showType == 1) {
            this.showNewsList();
            this.showalbum();
        } else {
            this.showNewsList();
        }
    }

    showNewsList = () => {
        this.setState({
            load: false,
            showType: 0,
        });
        this.fetchPersonalData(this.state.userId);
    }

    showalbum = () => {
        this.setState({
            load: false,
            showType: 1,
        });
        this.fetchAlbumData(this.state.userId);
    }

    showAttentioin = () => {
        this.fetchAttentionData();
    }

    // 点击关注
    onClickAttention = (item) => {
        // 跳转个人详情
        this.setState({
            userId: item.to_user_id,
            personalData: [],
            albumData: [],
            attentionData: [],
        });
        this.showNewsList();
    }

    // 请求个人数据
    fetchPersonalData = async (userId) => {
        let params = {
            user_id: userId,
        };
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

    // 请求相册数据
    fetchAlbumData = async (userId) => {
        let params = {
            user_id: userId,
        };
        let res = await httpApi.getAlbumData(params);

        if (res.status == 0) {
            let newAlbumArr = [];
            for (var key in res.data) {
                var value = res.data[key];
                let subAlbumArr = value;
                let dataArr = [{data:subAlbumArr}];
                newAlbumArr.push({title:key, data:dataArr});
            }
            this.setState({
                albumData: newAlbumArr,
                load: true
            });
        } else {
            alert("网络异常！请检查网络！");
        }
    }

    // 请求关注列表
    fetchAttentionData = async() => {
        let params = {

        };
        let res = await httpApi.httpPost("http://dd.shenruxiang.com/api/v1/user_follow_list", params);
        if (res.status == 0) {
            this.setState({
                attentionData: res.data,
                showType: 2,
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
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <MyStatusBar/>
                <SafeAreaView style={gViewStyles.rootViewContainer}>
                    <MyNavigationBar
                        title={'个人信息'}
                        onClickBack={()=>{this.props.navigation.goBack();}}
                    ></MyNavigationBar>

                    <View style={styles.itemContainer1}>
                        {/*有头像的部分*/}
                        <View style={styles.container2}>
                            <Image source={{uri: this.state.personalData.user_info.avatar}}
                                   style={styles.img1}/>
                            <View style={styles.container3}>
                                <Text style={styles.text1}>{this.state.personalData.user_info.nick_name}</Text>
                                <Text style={styles.text2}>签名：{this.state.personalData.user_info.desc}</Text>
                                <Text style={styles.text3}>粉丝：{this.state.personalData.user_info.fan_num}    关注：{this.state.personalData.user_info.follow_num}</Text>
                            </View>
                        </View>
                        <View style={styles.container4}>
                            <TouchableOpacity onPress={this.showNewsList}>
                                <Text style={styles.text4}>资料</Text>
                                {this.state.showType == 0 ? (<View style={gViewStyles.scrollBarBottomLine2}></View>) : (<View></View>)}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.showalbum}>
                                <Text style={styles.text4}>相册</Text>
                                {this.state.showType == 1 ? (<View style={gViewStyles.scrollBarBottomLine2}></View>) : (<View></View>)}
                            </TouchableOpacity>
                            {/*<TouchableOpacity onPress={this.showAttentioin}>*/}
                                {/*<Text style={styles.text4}>关注</Text>*/}
                                {/*{this.state.showType == 2 ? (<View style={gViewStyles.scrollBarBottomLine2}></View>) : (<View></View>)}*/}
                            {/*</TouchableOpacity>*/}
                        </View>
                        <View style={styles.line5}></View>
                    </View>

                    {this.listView()}

                    <View style={styles.container6}>
                        <TouchableOpacity onPress={()=>{
                            let params = {
                                userId: this.state.personalData.user_info.id,
                            };
                            this.props.navigation.navigate('Chat', params);
                        }}>
                            <View style={[gTextStyles.textBack, {marginRight: 5}]}>
                                <Text style={gTextStyles.text}>私信Ta</Text>
                            </View>
                        </TouchableOpacity>

                        {
                            this.state.personalData.user_follow == 1 ? (<TouchableOpacity onPress={()=>{
                                let params = ('user_id=' + this.state.personalData.user_info.id + '&');
                                let res = httpApi.httpPostWithParamsStr('http://dd.shenruxiang.com/api/v1/user_follow', params);
                                if (res.status = 0) {
                                    let personalData = this.state.personalData;
                                    personalData.user_follow = 1;
                                    this.setState({
                                        personalData: personalData,
                                    });
                                    WToast.show({data: '关注成功!'});
                                } else {
                                    alert("网络异常！请检查网络！");
                                }
                            }}>
                                <View style={[gTextStyles.textBack, {marginRight: 5}]}>
                                    <Text style={gTextStyles.text}>+ 关注</Text>
                                </View>
                            </TouchableOpacity>) : (<View style={[gTextStyles.textBack, {marginRight: 5}]}>
                                <Text style={gTextStyles.text}>已关注</Text>
                            </View>)
                        }
                    </View>
                </SafeAreaView>
            </View>


        );
    };

    listView = () => {
        if (this.state.showType == 0) {
            // 资料
            return(
                <FlatList
                    extraData={this.state}
                    style={styles.container}
                    data={this.state.personalData.post_list}
                    renderItem={({item})=>(<NewsView
                         onClickNews={()=>{
                             let params = {
                                 newsId: item.id,
                             };
                             this.props.navigation.navigate('NewsDetail', params);
                         }}
                         data={item}
                     ></NewsView>)}
                    ListHeaderComponent={this.topView}
                />
            );
        } else if (this.state.showType == 1) {
            // 相册
            return(<SectionList
                style={styles.sectionList1}
                stickySectionHeadersEnabled={false}
                ListHeaderComponent={this.topView}
                sections={this.state.albumData}
                renderItem={this.albumItemView}
                renderSectionHeader={this.albumHeaderItemView}
                renderSectionFooter={()=><View style={styles.line3}></View>}
            ></SectionList>);
        } else {
            // 关注
            return(<FlatList
                extraData={this.state}
                data={this.state.attentionData}
                renderItem={this.attentionItemView}
                style={gViewStyles.flatList}
            />);
        }
    }

    topView = () => {
        return(
            <View style={gViewStyles.viewContainer2}>

                {
                    this.state.showType != 2 ? (<View style={styles.container5}>
                        <Text style={styles.text5}>性别：{this.state.personalData.user_info.sex}</Text>
                        <Text style={styles.text5}>星座：摩羯座</Text>
                        <Text style={styles.text5}>感情状况：单身</Text>
                        <Text style={styles.text5}>出生日期：2000-01-01</Text>
                        <Text style={styles.text5}>职业：互联网-电子工程</Text>
                        <Text style={styles.text5}>注册地点：{this.state.personalData.user_info.province}-{this.state.personalData.user_info.city}</Text>
                    </View>) : (<View></View>)
                }

            </View>
        );
    }

    attentionItemView = ({item}) => {
        return(
            <View>
                <TouchableOpacity onPress={()=>this.onClickAttention(item)}>
                    <View style={styles.line}></View>
                    <View style={styles.msgContainer}>
                        <Image source={{uri: item.to_user.avatar}} style={styles.avatar}/>
                        <View style={styles.msgSubContainer}>
                            <View style={styles.mesSubContainer}>
                                <Text style={styles.attentionNickNametext}>{item.to_user.nick_name}</Text>
                            </View>
                            <View style={styles.mesSubContainer1}>
                                <Text style={styles.attentiontext1}>你关注了Ta！</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    newsItemView = ({ item }) => {
        return(
            <View style={styles.itemContainer2}>
                <Text style={styles.text5}>{item.created_at}</Text>
                <View style={styles.line2}></View>
                <Text style={styles.text6}>{item.post_content}</Text>
                {/*<Image source={{uri: item.src}} style={styles.newsImg}/>*/}
                {/*<Image source={require('../source/广告4.jpg')} style={styles.newsImg}/>*/}

                {/*动态图片部分*/}
                <FlatList
                    data={item.source}
                    renderItem={this.newsImgItemView}
                    style={styles.newsImgList}
                    numColumns={2}
                />
                <View style={styles.bottomContainer}>
                    <View style={styles.bottomTopContainer}>
                        <Image source={require('../source/dingwei1.png')} style={styles.itemIcon}/>
                        <Text>{item.post_position}</Text>
                    </View>
                    <View style={styles.segmentation}></View>
                    <View style={styles.bottomBottomContainer}>
                        <View style={styles.bottomBottomSubContainer}>
                            <Image source={require('../source/fenxiang.png')} style={styles.itemIcon}/>
                            <Text>{item.share_num}</Text>
                        </View>
                        <View style={styles.bottomBottomSubContainer}>
                            <Image source={require('../source/pinglun1.png')} style={styles.itemIcon}/>
                            <Text>{item.comment_num}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>this.onPraise(item)}>
                            <View style={styles.bottomBottomSubContainer}>
                                <Image source={require('../source/dianzanblack.png')} style={styles.itemIcon}/>
                                <Text>{item.praise_num}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    albumItemView = ({item}) => {
        return (
            <View style={styles.view1}>
                <FlatList
                    data={item.data}
                    renderItem={this.imgItemView}
                    numColumns={3}
                >
                </FlatList>
            </View>

        );
    }

    imgItemView = ({item}) => {
        return(
            <View>
                <Image source={{uri: item.src}} style={styles.albumImg}/>
            </View>
        );
    }

    albumHeaderItemView = ({section}) => {
        return(
            <View>
                <Text style={styles.text8}>{section.title}</Text>
            </View>
        );
    }

    newsImgItemView({ item }) {
        return (
            <View>
                <Image source={{uri: item.src}} style={styles.newsImgs}/>
            </View>
        );
    }
}

const {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
    superContainer: {
        flex: 1,
    },
    container: {
        // backgroundColor: '#FB5442',
    },
    itemContainer1: {
        backgroundColor: '#FB5442',
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    img1: {
        height: 50,
        width: 50,
        margin: 10,
        borderRadius: 25,
    },
    container3: {
        margin: 10,
    },
    text1: {
        color: 'white',
        fontSize: 18,
    },
    text2: {
        color: 'white',
        marginTop: 5,
        marginBottom: 5,
    },
    text3: {
        color: 'white',
    },
    container4: {
        padding: 5,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    text4: {
        margin: 5,
        fontSize: 17,
    },
    container5: {
        marginTop: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    itemContainer2: {
        marginTop: 5,
        backgroundColor: 'white',
    },
    text6: {
        padding: 10,
    },
    line2: {
        height: 1,
        backgroundColor: gColor.grayLineColor,
    },
    bottomTopContainer: {
        marginTop: 5,
        height: 30,
        marginLeft: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    segmentation: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        height: 1,
        backgroundColor: gColor.grayLineColor
    },
    bottomBottomContainer: {
        height: 40,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemIcon: {
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
        height: 30,
        width: 30,
    },
    bottomBottomSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    img2: {
        height: 30,
        width: width/2 - 100,
    },
    container6: {
        padding: 10,
        backgroundColor: 'white',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    line3: {
        height: 10,
        backgroundColor: '#F2F2F2'
    },
    line5: {
        height: 0.5,
        backgroundColor: '#F2F2F2',
    },
    sectionList1: {
    },
    text8: {
        color: '#333333',
        fontSize: 11.5,
        marginTop: 10,
        marginLeft: 11,
    },
    view1: {
        flex: 1,
    },
    newsImg: {
        width: (gScreen.screen_width - 20) / 2,
        height: (gScreen.screen_width - 20) / 2,
        margin: 5,
        borderRadius: 5,
    },
    albumImg: {
        width: (gScreen.screen_width - 30) / 3,
        height: (gScreen.screen_width - 30) / 3,
        margin: 5,
        borderRadius: 5,
    },
    attentionNickNametext: {
        fontSize: 17,
    },
    attentiontext1: {
        color: gColor.orangeTextColor,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
    },
    avatar: {
        borderRadius: 27,
        width: 54,
        height: 54,
        marginLeft: 10,
    },
    msgSubContainer: {
        width: width - 100,
        marginLeft: 7,
    },
    newsImgs: {
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
        width: width/2 - 5,
        height: width/2 - 5,
    },
});