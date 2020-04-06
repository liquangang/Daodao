import React, { Component } from "react";
import {Text, View, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, SectionList} from "react-native";
import httpApi from "../tools/Api";
import LoadingView from "../component/LoadingView";


// 个人详情页，注意与my页区分
// 需要传入userid
export default class PersonInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            personalData: [],
            albumData: [],
            load: false,
            showType: 1, // 展示数据类型，1：资料部分，2：相册
        };
    }

    componentDidMount() {
        this.showNewsList();
    }

    showNewsList = () => {
        this.setState({
            load: false,
            showType: 1,
        });
        this.fetchPersonalData(this.props.route.params.userId);
    }

    showalbum = () => {
        this.setState({
            load: false,
            showType: 2,
        });
        this.fetchAlbumData(this.props.route.params.userId);
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

    render() {
        if (this.state.load == false) {
            return <LoadingView></LoadingView>
        }

        return(
            <View style={styles.superContainer}>
                {this.state.showType == 1 ? (
                    <FlatList
                        style={styles.container}
                        data={this.state.personalData.post_list.data}
                        renderItem={this.newsItemView}
                        ListHeaderComponent={this.topView}
                    />
                ) : (
                    <SectionList
                        style={styles.sectionList1}
                        ListHeaderComponent={this.topView}
                        sections={this.state.albumData}
                        renderItem={this.albumItemView}
                        renderSectionHeader={this.albumHeaderItemView}
                        renderSectionFooter={()=><View style={styles.line3}></View>}
                    ></SectionList>
                )
                }

                {
                    this.state.showType == 1 ? (
                        <View style={styles.container6}>
                            <Image source={require('../source/privateChat.jpg')} style={styles.img2}/>
                            <Image source={require('../source/attention.jpg')} style={styles.img2}/>
                        </View>

                    ) : (<View></View>)
                }
            </View>

        );
    };

    footerLoadView = () => {
        if (this.state.load) {
            return(
                <LoadingView></LoadingView>
            );
        } else {
            return(<View></View>);
        }
    }

    topView = () => {
        return(
            <View>
                <View style={styles.itemContainer1}>
                    {/*有头像的部分*/}
                    <View style={styles.container2}>
                        <Image source={require('../source/avatar.jpg')}
                               // source={{uri: this.state.data.user_info.avatar}}
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
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.showalbum}>
                            <Text style={styles.text4}>相册</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line5}></View>
                </View>

                {
                    this.state.showType == 1 ? (<View style={styles.container5}>
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

    newsItemView = ({ item }) => {
        return(
            <View style={styles.itemContainer2}>
                <Text style={styles.text5}>{item.created_at}</Text>
                <View style={styles.line2}></View>
                <Text style={styles.text6}>{item.post_content}</Text>
                <Image source={require('../source/banner.jpg')} style={styles.newsImg}/>
                <View style={styles.bottomContainer}>
                    <View style={styles.bottomTopContainer}>
                        <Image source={require('../source/location.jpg')} style={styles.itemIcon}/>
                        <Text>{item.post_position}</Text>
                    </View>
                    <View style={styles.segmentation}></View>
                    <View style={styles.bottomBottomContainer}>
                        <View style={styles.bottomBottomSubContainer}>
                            <Image source={require('../source/share.jpg')} style={styles.itemIcon}/>
                            <Text>{item.share_num}</Text>
                        </View>
                        <View style={styles.bottomBottomSubContainer}>
                            <Image source={require('../source/mes.jpg')} style={styles.itemIcon}/>
                            <Text>{item.comment_num}</Text>
                        </View>
                        <View style={styles.bottomBottomSubContainer}>
                            <Image source={require('../source/blackPraise.jpg')} style={styles.itemIcon}/>
                            <Text>{item.praise_num}</Text>
                        </View>
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
                {/*<Image source={{uri: item.src}} style={styles.itemIcon}/>*/}
                <Image source={require('../source/banner.jpg')} style={styles.newsImg}/>
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
}

const {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
    superContainer: {
        flex: 1,
    },
    container: {
    },
    itemContainer1: {

    },
    container2: {
        flexDirection: 'row',
        backgroundColor: gColor.orangeTextColor,
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
    text5: {
        margin: 5,
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
    newsImg: {
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
        height: width/4,
        width: width/4,
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
        backgroundColor: '#FFFEFF',
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
        width: (gScreen.screen_width - 44) / 3,
        height: (gScreen.screen_width - 44) / 3,
        margin: 5,
        borderRadius: 5,
    }
});