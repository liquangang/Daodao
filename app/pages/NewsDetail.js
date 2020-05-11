import React, { Component } from "react";
import {Text, View, StyleSheet, FlatList, TextInput, TouchableOpacity,
    Image, Dimensions, SectionList, SafeAreaView, Keyboard} from "react-native";
import httpApi from "../tools/Api";
import BannerView from "../component/BannerView"
import LoadingView from "../component/LoadingView";
import {gViewStyles} from "../style/ViewStyles";
import MyNavigationBar from '../component/MyNavigationBar'
import MyStatusBar from "../component/MyStatusBar";
import {gImageStyles} from "../style/ImageStyles";
import {gTextStyles} from "../style/TextStyles";
import ImageItemView from "../component/ImageItemView";
import {WToast} from "react-native-smart-tip/index";
import CommentItemView from "../component/CommentItemView";
import SubCommentItemView from "../component/SubCommentItemView";

export default class NewsDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newsDetailData: [],
            commentList: [],
            load: false,
            toUserId: null,
            autoFocus: null,
            keyboardHeight: 0,
            commentId: null,
        };

        this.keyboardWillShowListener = null;
        this.keyboardWillHideListener = null;

    }

    async componentDidMount() {
        this.setState({
            newsDetailData: [],
            commentList: [],
            load: false,
            toUserId: null,
            autoFocus: null,
            keyboardHeight: 0,
            commentId: null,
        });
        let newsId = this.props.route.params.newsId;
        await this.fetchNewsData(newsId);
        await this.fetchNewsCommentListData(newsId);

        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow',this.keyboardDidShow);
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide',this.keyboardDidHide);
    }

    //注销监听
    componentWillUnmount () {
        this.setState({
            newsDetailData: [],
            commentList: [],
            load: false,
            toUserId: null,
            autoFocus: null,
            keyboardHeight: 0,
            commentId: null,
        });
        this.keyboardWillShowListener && this.keyboardWillShowListener.remove();
        this.keyboardWillHideListener && this.keyboardWillHideListener.remove();
    }


    //键盘弹起后执行
    keyboardDidShow = (event) =>  {
        this.setState({
            keyboardHeight: event.endCoordinates.height
        });
    }

    //键盘收起后执行
    keyboardDidHide = () => {
        this.setState({
            keyboardHeight: 0
        });
    }

    // 点击广告
    onClickAd = (item) => {
        if (item.href != null && item.href.length > 0) {
            let params = {
                url: item.href,
            };
            this.props.navigation.navigate('WebPage', params);
        }
    }

    // 结束评论编辑
    onEndEditing = (text) => {
        this.uploadComment(text)
    }

    // 上传评论
    uploadComment = async (text) => {
        let params = '';
        params+=("post_id=" + this.props.route.params.newsId + '&');
        params+=('comment_content=' + text + '&');
        params+=('to_user_id=' + this.state.toUserId + '&');
        params+=('comment_id=' + this.state.commentId + '&');

        let res = await httpApi.httpPostWithParamsStr("http://dd.shenruxiang.com/api/v1/send_post_comment", params);
        if (res.status == 0) {
            this.refs.textInputRefer.clear();
            let newsId = this.props.route.params.newsId;
            this.fetchNewsCommentListData(newsId);
            WToast.show({data: '评论成功!'});
        } else {
            alert("网络异常！请检查网络！");
        }
    }

    // 请求帖子详情
    fetchNewsData = async (newsId) => {
        let params = {
            post_id: newsId
        };
        let res = await httpApi.getNewsData(params);

        if (res.status == 0) {

            this.setState({
                newsDetailData: res.data,
                toUserId: res.data.newsDetail.user.id,
            });
        } else {
            alert("网络异常！请检查网络！");
        }
    }

    onPraise = async (item) => {
        let params = '';
        params+=("post_id=" + this.props.route.params.newsId + '&');
        params+=('to_user_id=' + item.to_user_id + '&');
        params+=('comment_id=' + item.comment_id + '&');

        let res = await httpApi.httpPostWithParamsStr('http://dd.shenruxiang.com/api/v1/post_comment_praise', params);
        if (res.status == 0) {
            this.fetchNewsCommentListData(this.props.route.params.newsId);
        } else {
            alert("网络异常！请检查网络！");
        }
    }

    // 请求帖子评论列表数据
    fetchNewsCommentListData = async (newsId) => {
        let params = {
            post_id: newsId
        };
        let res = await httpApi.getNewsCommentListData(params);

        if (res.status == 0) {
            let newCommentList = [];
            for (let i = 0; i < res.data.length; i++) {
                newCommentList.push({title:res.data[i], data:(res.data[i].reply_list != null ? res.data[i].reply_list : [])});
            }
            this.setState({
                commentList: newCommentList,
                load: true
            });
        } else {
            alert("网络异常！请检查网络！");
        }
    }

    onClickReply = (item) => {
        this.setState({
            toUserId: item.user.id,
            commentId: item.id,
        });
        this.refs.textInputRefer.focus();
    }

    render() {
        if (!this.state.load) {
            return <LoadingView/>;
        }
        return(
            <View style={gViewStyles.rootViewContainer}>
                <MyStatusBar/>
                <SafeAreaView style={styles.container}>
                    <MyNavigationBar
                        title={'帖子详情'}
                        onClickBack={()=>{this.props.navigation.goBack();}}
                    ></MyNavigationBar>
                    <View style={styles.topContainer}>
                        <SectionList
                            ListHeaderComponent={this.headerView}
                            sections={this.state.commentList}
                            renderItem={this.subCommentItemView}
                            renderSectionHeader={this.commentItemView}
                            stickySectionHeadersEnabled={false}
                            keyExtractor={(item, index) => item + index}
                        ></SectionList>
                    </View>

                    <View style={[styles.inputContainer, {marginBottom: this.state.keyboardHeight}]}>
                        <TextInput underlineColorAndroid="transparent"
                                   placeholder="输入评论内容"
                                   ref='textInputRefer'
                                   style={styles.input}
                                   returnKeyType="send"
                                   onSubmitEditing={(event)=>this.onEndEditing(event.nativeEvent.text)}>
                        </TextInput>
                        <TouchableOpacity>
                            <Image source={require('../source/xiangqingfenxiang.png')} style={styles.shareIcon}/>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>

        );
    };

    headerView = () => {
        return(
            <View style={styles.view2}>
                {this.userInfoItemView()}
                {this.newsInfoItemView()}
                <View style={styles.commentLine}></View>
                <BannerView
                    onClickAd = {this.onClickAd}
                    data={this.state.newsDetailData.adDetail.data}
                ></BannerView>
                {/*评论总数、点赞总数*/}
                <View style={styles.container7}>
                    <Text style={[{color: '#666666'}, ]}>全部评论：{this.state.newsDetailData.newsDetail.comment_num}</Text>
                    <Text style={[{color: '#666666'}, ]}>点赞：{this.state.newsDetailData.newsDetail.praise_num}</Text>
                </View>
                <View style={styles.bottomSegmentation}></View>
            </View>
        );
    }

    userInfoItemView = () => {
        return(
            <View style={styles.userInfoContainer}>
                <TouchableOpacity>
                    <Image source={{uri: this.state.newsDetailData.newsDetail.user.avatar}}
                           style={styles.avatar}/>
                </TouchableOpacity>
                <View style={styles.userInfoContainer1}>
                    <Text style={styles.userInfoText1}>{this.state.newsDetailData.newsDetail.user.nick_name}</Text>
                    <Text style={styles.userInfoText}>{this.state.newsDetailData.newsDetail.user.created_at} 来自：
                        {this.state.newsDetailData.newsDetail.phone_model}</Text>
                </View>
                {this.state.newsDetailData.newsDetail.user_follow == null ? (<TouchableOpacity onPress={async ()=>{
                    let params = ('to_user_id=' + this.state.newsDetailData.newsDetail.user.id + '&');
                    let res = await httpApi.httpPostWithParamsStr('http://dd.shenruxiang.com/api/v1/user_follow', params);
                    if (res.status == 0) {
                        let newsDetailData = this.state.newsDetailData;
                        newsDetailData.newsDetail.user_follow = 1;
                        this.setState({
                            newsDetailData: newsDetailData,
                        });
                        WToast.show({data: '关注成功!'});
                    } else {
                        alert("网络异常！请检查网络！");
                    }
                }}>
                    <View style={[gTextStyles.textBack, {marginRight: 5}]}>
                        <Text style={gTextStyles.text}> + 关注</Text>
                    </View>
                </TouchableOpacity>) : (<TouchableOpacity onPress={async ()=>{
                    let params = ('to_user_id=' + this.state.newsDetailData.newsDetail.user.id + '&');
                    let res = await httpApi.httpPostWithParamsStr('http://dd.shenruxiang.com/api/v1/user_follow', params);
                    if (res.status == 0) {
                    let newsDetailData = this.state.newsDetailData;
                    newsDetailData.newsDetail.user_follow = null;
                    this.setState({
                    newsDetailData: newsDetailData,
                });
                    WToast.show({data: '取关成功!'});
                } else {
                    alert("网络异常！请检查网络！");
                }
                }}>
                    <View style={[gTextStyles.textBack, {marginRight: 5}]}>
                        <Text style={gTextStyles.text}>已关注</Text>
                    </View>
                </TouchableOpacity>)}

            </View>
        );
    };

    newsInfoItemView = () => {
        return(
            <View style={styles.newsInfoContainer}>
                <View style={styles.commentLine}></View>
                <Text style={styles.newsInfoText}>{this.state.newsDetailData.newsDetail.post_content}</Text>

                {/*动态图片部分*/}
                <FlatList
                    data={this.state.newsDetailData.newsDetail.source}
                    renderItem={this.imgItemView}
                    style={styles.newsImgList}
                />
                <View style={styles.newsInfoContainer1}>
                    <Image source={require('../source/dingwei1.png')} style={styles.itemIcon}/>
                    <Text>{this.state.newsDetailData.newsDetail.post_position}</Text>
                </View>
            </View>
        );
    };

   imgItemView({ item }) {
        return(<ImageItemView
            data={item}
        ></ImageItemView>);

    }

    commentItemView = ({ section: { title, data } }) => {
       return(<CommentItemView
       data={title}
       onClickReply={this.onClickReply}
       />);
    }

    subCommentItemView = ({ item }) => {
        return(<SubCommentItemView
            data={item}
            onClickReply={this.onClickReply}
        />);
    }

}

const {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topContainer: {
        flex: height - 40,
    },
    newsInfoList: {
    },
    inputContainer: {
        flexDirection: 'row',
        flex: 40,
        padding: 10,
        margin: 5,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    input: {
        flex: width - 70,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        borderRadius: 10,
    },
    shareIcon: {
        flex: 40,
        marginLeft: 10,
        color: 'white',
        width: 20,
        height: 20,
    },
    avatar: {
        flex: 60,
        height: 40,
        width: 40,
        margin: 5,
        borderRadius: 20,
    },
    userInfoContainer: {
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    userInfoContainer1: {
        flex: width - 130,
    },
    userInfoText: {
        margin: 5,
        fontSize: 12,
        color: '#666666'
    },
    userInfoText1: {
        margin: 5,
    },
    userInfoImg: {
        flex: 60,
        width: 60,
        height: 40,
        margin: 5,
    },
    newsInfoContainer: {
        flex: 1,
    },
    newsInfoLine1: {
        height: 1,
        backgroundColor: '#C0C0C0',
    },
    adContainer: {
        margin: 5,
    },
    adImg: {
        width: width - 10,
    },
    newsInfoLine: {
        height: 1,
        backgroundColor: "#C0C0C0",
    },
    newsInfoText: {
        margin: 10,
    },
    newsInfoContainer1: {
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentLine: {
        margin: 5,
        height: 0.5,
        backgroundColor: "#D8D8D8",
    },
    commentContainer: {
        padding: 5,
        flexDirection: "row",
    },
    commentContainer1: {
        marginLeft: 5,
        marginRight: width - 70,
        justifyContent: 'center',
    },
    commentText: {
        color: '#1A1A1A'
    },
    commentText1: {
        margin: 5,
        flex: width - 150,
        color: '#333333'
    },
    commentContainer2: {
        width: width - 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    commentContainer3: {
        marginLeft: 5,
        marginRight: width - 70 - 44,
        justifyContent: 'center',
    },
    commentContainer4: {
        width: width - 70 - 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    commentImg: {
        width: 30,
    },
    commentText2: {
    },
    commentText3: {
        color: "#C0C0C0",
    },
    subCommentContainer: {
        padding: 5,
        flexDirection: "row",
        marginLeft: 44,
    },
    view2: {
        flex: 1,
    },
    line4: {
        height: 0.5,
        backgroundColor: '#D8D8D8'
    },
    img1: {
        height: 40,
        width: 40,
        margin: 5,
        borderRadius: 20,
    },
    bottomSegmentation: {
        height: 10,
        backgroundColor: gColor.grayLineColor
    },
    text10: {
        backgroundColor: '#FB5442',
        color: 'white',
        fontSize: 12,
        padding: 8,
        height: 30,
        width: 60,
        margin: 5,
    },
    container7: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 12,
    },
    newsImg: {
        margin: 2,
        borderRadius: 5,
        width: gScreen.screen_width - 4,
        resizeMode: 'center',
    },
});