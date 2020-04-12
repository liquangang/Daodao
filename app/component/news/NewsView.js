import React, {Component} from "react";
import {View, StyleSheet, Image, Text, Dimensions, FlatList, TouchableOpacity, ImageBackground } from "react-native";
import httpApi from "../../tools/Api";
import {gTextStyles} from "../../style/TextStyles";

export default class NewsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            isShowPersonInfo: this.props.isShowPersonInfo,
        };
    }

    onClickAvatar = (userId) => {
        this.props.onClickAvatar(userId);
    };

    onClickNewsView = (newsId) => {
        this.props.onClickNews(newsId);
    }

    onPraise = async (item) => {
        let params = '';
        params+=("post_id=" + item.id + '&');
        params+=('to_user_id=' + item.user_id + '&');

        let res = await httpApi.httpPostWithParamsStr('http://dd.shenruxiang.com/api/v1/post_comment_praise', params);
        if (res.status == 0) {
            let newData = this.state.data;
            if (newData.user_priase == null) {
                newData.user_priase = 1;
                newData.praise_num+=1;
            } else {
                newData.user_priase = null;
                newData.praise_num-=1;
            }
            this.setState({
                data: newData
            });
        } else {
            alert("网络异常！请检查网络！");
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.bottomSegmentation}></View>

                {this.state.isShowPersonInfo == true ? (
                    <View style={styles.topInfoContainer}>
                        {/*头像*/}
                        <TouchableOpacity onPress={()=>this.onClickAvatar(this.state.data.user.id)}>
                            <Image source={{uri: this.state.data.user.avatar}}
                                   style={styles.avatar}/>
                            {/*<Image source={require('../../source/未登陆.png')}*/}
                            {/*style={styles.avatar}/>*/}
                        </TouchableOpacity>
                        <View style={styles.topSubInfoContainer}>
                            <Text style={styles.nickName}>{this.state.data.user.nick_name}</Text>
                            <View style={styles.topSubInfoBottomContainer}>
                                <Text style={styles.publishTime}>{this.state.data.created_at}</Text>
                                <Text style={styles.phoneModel}>来自：{this.state.data.phone_model}</Text>
                            </View>
                        </View>
                        <Text style={styles.text10}>+ 关注</Text>
                    </View>) : (<Text style={gTextStyles.timeText}>{this.state.data.created_at}</Text>)}


                <View style={styles.segmentation}></View>

                <TouchableOpacity onPress={()=>this.onClickNewsView(this.state.data.post_cate_id)}>
                    {/*动态文案部分*/}
                    <Text style={styles.newsContent}>{this.state.data.post_content}</Text>

                    {/*动态图片部分*/}
                    <FlatList
                        data={this.state.data.source}
                        renderItem={this.imgItemView}
                        style={styles.newsImgList}
                        numColumns={2}
                    />
                </TouchableOpacity>


                {/*动态底部部分*/}
                <View style={styles.bottomContainer}>
                    <View style={styles.bottomTopContainer}>
                        <Image source={require('../../source/首页定位.png')} style={styles.itemIcon}/>
                        <Text>{this.state.data.post_position}</Text>
                    </View>
                    <View style={styles.segmentation}></View>
                    <View style={styles.bottomBottomContainer}>
                        <View style={styles.bottomBottomSubContainer}>
                            <Image source={require('../../source/首页分享.png')} style={styles.itemIcon}/>
                            <Text>{this.state.data.share_num}</Text>
                        </View>
                        <View style={styles.bottomBottomSubContainer}>
                            <Image source={require('../../source/首页评论.png')} style={styles.itemIcon}/>
                            <Text>{this.state.data.comment_num}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>this.onPraise(this.state.data)}>
                            <View style={styles.bottomBottomSubContainer}>
                                {this.state.data.user_priase != null ? (
                                    <Image source={require('../../source/首页点赞.png')} style={styles.itemIcon}/>
                                ) : (<Image source={require('../../source/首页点赞-未点亮.png')} style={styles.itemIcon}/>
                                )}
                                <Text>{this.state.data.praise_num}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    };

    imgItemView({ item }) {
        return (
            <View>
                <Image source={{uri: item.src}} style={styles.newsImg}/>
            </View>
        );
    }
}

const {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    topInfoContainer: {
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
    },
    topSubInfoContainer: {
        flex: width - 100,
    },
    avatar: {
        flex: 50,
        height: 40,
        width: 40,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 20,
    },
    attention: {
        flex: 50,
        height: 25,
        marginLeft: 5,
        marginRight: 10,
    },
    nickName: {
        marginTop: 5,
        fontSize: 17,
    },
    topSubInfoBottomContainer: {
        marginTop: 3,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    publishTime: {

    },
    phoneModel: {
        marginRight: 15,
    },
    newsContent: {
        margin: 10,
    },
    newsImgList: {
    },
    newsImg: {
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
        width: width/2 - 5,
        height: width/2 - 5,
    },
    bottomContainer: {

    },
    bottomTopContainer: {
        marginTop: 5,
        height: 30,
        marginLeft: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    segmentation: {
        margin: 5,
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
    bottomSegmentation: {
        height: 10,
        backgroundColor: gColor.grayLineColor
    },
    itemIcon: {
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
        height: 25,
        width: 25,
    },
    bottomBottomSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text10: {
        backgroundColor: '#FB5442',
        color: 'white',
        padding: 8,
        height: 30,
        width: 60,
        margin: 5,
    }
});