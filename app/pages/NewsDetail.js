import React, { Component } from "react";
import {Text, View, StyleSheet, FlatList, TextInput, TouchableOpacity,
    Image, Dimensions, SectionList} from "react-native";
import httpApi from "../tools/Api";
import BannerView from "../component/BannerView"
import LoadingView from "../component/LoadingView";
import {gViewStyles} from "../style/ViewStyles";
import MyNavigationBar from '../component/MyNavigationBar'
import MyStatusBar from "../component/MyStatusBar";

export default class NewsDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newsDetailData: [],
            commentList: [],
            load: false,
        };

    }

    componentDidMount() {
        let newsId = this.props.route.params.newsId;
         this.fetchNewsData(newsId);
         this.fetchNewsCommentListData(newsId);
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

    // 请求帖子详情
    fetchNewsData = async (newsId) => {
        let params = {
            post_id: 7
        };
        let res = await httpApi.getNewsData(params);

        if (res.status == 0) {

            this.setState({
                newsDetailData: res.data,
            });
        } else {
            alert("网络异常！请检查网络！");
        }
    }

    // 请求帖子评论列表数据
    fetchNewsCommentListData = async (newsId) => {
        let params = {
            post_id: 4
        };
        let res = await httpApi.getNewsCommentListData(params);

        if (res.status == 0) {
            let newCommentList = [];
            for (let i = 0; i < res.data.data.length; i++) {
                newCommentList.push({title:res.data.data[i], data:res.data.data[i].reply_list});
            }
            this.setState({
                commentList: newCommentList,
                load: true
            });
        } else {
            alert("网络异常！请检查网络！");
        }
    }

    render() {
        if (!this.state.load) {
            return <LoadingView/>;
        }
        return(
            <View style={styles.container}>
                <MyStatusBar/>
                <MyNavigationBar
                    title={'帖子详情'}
                    onClickBack={()=>{this.props.navigation.goBack();}}
                ></MyNavigationBar>
                <View style={styles.topContainer}>
                    <SectionList
                        showsVerticalScrollIndicator = {false}
                        ListHeaderComponent={this.headerView}
                        sections={this.state.commentList}
                        renderItem={this.subCommentItemView}
                        renderSectionHeader={this.commentItemView}
                        stickySectionHeadersEnabled={false}
                        keyExtractor={(item, index) => item + index}
                    ></SectionList>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput underlineColorAndroid="transparent" placeholder="输入评论内容"
                               style={styles.input}>
                    </TextInput>
                    <TouchableOpacity>
                        <Image source={require('../source/详情分享.png')} style={styles.shareIcon}/>
                    </TouchableOpacity>
                </View>
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
                <View style={styles.bottomSegmentation}></View>
            </View>
        );
    }

    userInfoItemView = () => {
        return(
            <View style={styles.userInfoContainer}>
                <TouchableOpacity>
                    <Image source={require('../source/未登陆.png')} style={styles.avatar}/>
                    {/*<Image source={{uri: this.state.newsDetailData.newsDetail.user.avatar}}*/}
                           {/*style={styles.avatar}/>*/}
                </TouchableOpacity>
                <View style={styles.userInfoContainer1}>
                    <Text style={styles.userInfoText1}>{this.state.newsDetailData.newsDetail.user.nick_name}</Text>
                    <Text style={styles.userInfoText}>{this.state.newsDetailData.newsDetail.user.created_at} 来自
                        {this.state.newsDetailData.newsDetail.user.phone_model}</Text>
                </View>
                <Text style={styles.text10}>+ 关注</Text>
            </View>
        );
    };

    newsInfoItemView = () => {
        return(
            <View style={styles.newsInfoContainer}>
                <View style={styles.newsInfoLine}></View>
                <Text style={styles.newsInfoText}>{this.state.newsDetailData.newsDetail.user.post_content}</Text>

                {/*动态图片部分*/}
                <FlatList
                    data={this.state.newsDetailData.newsDetail.source}
                    renderItem={this.imgItemView}
                    style={styles.newsImgList}
                    numColumns={3}
                />
                <View style={styles.newsInfoContainer1}>
                    <Image source={require('../source/首页定位.png')} style={styles.itemIcon}/>
                    <Text>{this.state.newsDetailData.newsDetail.post_position}</Text>
                </View>
            </View>
        );
    };

    imgItemView({ item }) {
        return (
            <View style={styles.item}>
                {/*<Image source={{uri: item.src}} style={styles.newsImg}/>*/}
                <Image source={require('../source/banner.jpg')} style={styles.img2}/>
            </View>
        );
    }

    commentItemView = ({ section: { title, data } }) => {
        let commentData = title;
        return(
            <View>
                <View style={styles.commentContainer}>
                    <Image source={require('../source/未登陆.png')} style={styles.img1}/>
                    <View style={styles.commentContainer1}>
                        <View style={styles.commentContainer2}>
                            <Text style={styles.commentText}>{commentData.user.nick_name}</Text>
                            <Image source={require('../source/首页点赞.png')} style={styles.commentImg}/>
                            <Text style={styles.commentText2}>{commentData.praise_num}</Text>
                        </View>
                        <Text style={styles.commentText1}>{commentData.content}</Text>
                        <Text style={styles.commentText3}>{commentData.created_at}</Text>
                    </View>
                </View>
                <View style={styles.commentLine}></View>
            </View>
        );
    };

    subCommentItemView = ({ item }) => {
        return( <View>
            <View style={styles.subCommentContainer}>
                <Image source={require('../source/未登陆.png')} style={styles.img1}/>
                <View style={styles.commentContainer1}>
                    <View style={styles.commentContainer2}>
                        <Text style={styles.commentText}> {item.user.nick_name}</Text>
                        <Image source={require('../source/首页点赞.png')} style={styles.commentImg}/>
                        <Text style={styles.commentText2}>{item.praise_num}</Text>
                    </View>
                    <Text style={styles.commentText1}>{item.user.nick_name} @ {item.to_user.nick_name}：{item.content}</Text>
                    <Text style={styles.commentText3}>{item.created_at}</Text>
                </View>
            </View>
            <View style={styles.commentLine}></View>
        </View>);
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
        flex: width - 100,
        justifyContent: 'center',
    },
    commentText: {
        flex: width - 150,
    },
    commentText1: {
        margin: 5,
        flex: width - 150,
        color: '#333333'
    },
    commentContainer2: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    commentImg: {
        height: 30,
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
        padding: 8,
        height: 30,
        width: 60,
        margin: 5,
    }
});