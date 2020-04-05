import React, { Component } from "react";
import { View, StyleSheet, Dimensions, FlatList, Text, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchView from "../component/SearchView";
import TitleListView from "../component/TitleListView";
import BannerView from "../component/BannerView"
import NewsView from "../component/news/NewsView"
import httpApi from "../tools/Api"
import LoadingView from "../component/LoadingView";

export default class HomePage extends Component {


    // --------------------------- 生命周期 --------------------------------------
    constructor(props) {
        super(props);
        this.state = {
            newsTypeList: [],
            newsList: [],
            currentShowNewsList: [],
            loaded: false
        };

    }

    async componentDidMount() {
        await this.fetchNewsTypeListData();

        // 默认请求第一个新闻列表
        this.showNewsList(this.state.newsTypeList[0]);
    }

    // ------------------------- 主题逻辑 ------------------------------

    // 点击头像
    onClickAvatar = (userId) => {
        let params = {
            userId: userId,
        };
        this.props.navigation.navigate('PersonInfo', params);
    };

    // 点击某个新闻分类标题
    onClickNewsType = (item) => {
        this.showNewsList(item);
    }

    // 展示新闻列表
    showNewsList = (item) => {
        if (this.state.newsList != null && this.state.newsList[item.id] != null) {
            this.setState({
                currentShowNewsList: this.state.newsList[item.id],
            });
        } else {
            this.fetchNewsListData(item.id);
        }
    }

    // 跳转消息页
    onClickMesBtn = () => {
        this.props.navigation.navigate('Message');
    }

    // ------------------------------ 网络请求 -------------------------------------------

    // 请求新闻分类列表
    fetchNewsTypeListData = async () => {
        let params = {};
        let res = await httpApi.getNewsTypeList(params);

        if (res.status == 0) {
            this.setState({
                newsTypeList: res.data,
                loaded: true
            });
        } else {
            alert("网络异常！请检查网络！");
        }
    }

    // 下载具体新闻分类数据
    fetchNewsListData = async (newsId) => {
        let params = {
            post_cate_id: newsId,
        };
        let res = await httpApi.getNewsList(params);

        if (res.status == 0) {

            let newNewsList = this.state.newsList;
            newNewsList[newsId] = res.data.catePostList.data;

            this.setState({
                newsList: newNewsList,
                currentShowNewsList: res.data.catePostList.data,
            });
        } else {
            alert("网络异常！请检查网络！");
        }
    }

    // -------------------------- view 层 ------------------------------------
    render() {

        if (!this.state.loaded) {
            return <LoadingView/>;
        }

        return(
            <View style={styles.container}>

                {/*搜索*/}
                <View style={styles.searchContainer}>
                    <View style={styles.searchView}><SearchView/></View>
                    <TouchableOpacity onPress={this.onClickMesBtn}>
                        <Ionicons name='md-mail' size={35} style={styles.messageView}/>
                    </TouchableOpacity>
                </View>

                {/*分割线*/}
                <View style={styles.segmentation}></View>

                {/*分类列表*/}
                <TitleListView
                    onClickNewsType = {this.onClickNewsType}
                    data={this.state.newsTypeList}
                ></TitleListView>

                {/*分割线*/}
                <View style={styles.segmentation}></View>


                {/*新闻列表*/}
                <FlatList
                    data={this.state.currentShowNewsList}
                    renderItem={this.newsListItemView}
                    style={styles.newsList}
                />

            </View>
        );
    };

    newsListItemView = (item) => {

        return (
            <NewsView
                onClickAvatar = {this.onClickAvatar}
                data={item.item}
            ></NewsView>
        );
    };

}

const {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchView: {
        flex: gScreen.screen_width - 30,
    },
    messageView: {
        flex: 30,
        marginRight: 10,
        marginLeft: 10
    },
    segmentation: {
        marginTop: 3,
        height: 1,
        backgroundColor: gColor.grayLineColor
    },
    newsList: {

    },
});
