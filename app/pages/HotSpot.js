import React, { Component } from "react";
import {Text, View, FlatList, StyleSheet, Dimensions, StatusBar} from "react-native";
import BannerView from "../component/BannerView"
import NewsView from "../component/news/NewsView"
import httpApi from "../tools/Api";
import LoadingView from "../component/LoadingView";
import MyNavigationBar from '../component/MyNavigationBar'
import MyStatusBar from "../component/MyStatusBar";
import {gViewStyles} from "../style/ViewStyles";

export default class HotSpot extends Component {

    // --------------------------- 生命周期 --------------------------------------
    constructor(props) {
        super(props);
        this.state = {
            newsList: [],
            load: false
        };
    }

    componentDidMount() {
        this.fetchNewsListData()
    }

    // 点击帖子
    onClickNews = (newsId) => {
        let params = {
            newsId: newsId,
        };
        this.props.navigation.navigate('NewsDetail', params);
    }

    // 点击头像
    onClickAvatar = (userId) => {
        let params = {
            userId: userId,
        };
        this.props.navigation.navigate('PersonInfo', params);
    };

    // 点击广告
    onClickAd = (item) => {
        if (item.href != null && item.href.length > 0) {
            let params = {
                url: item.href,
            };
            this.props.navigation.navigate('WebPage', params);
        }
    }

    // 下载具体新闻分类数据
    fetchNewsListData = async () => {
        let params = {
            post_cate_id: 2,
        };
        let res = await httpApi.getNewsList(params);

        if (res.status == 0) {

            this.setState({
                newsList: res.data.data,
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
            <View style={gViewStyles.rootViewContainer}>
                <MyStatusBar/>
                <MyNavigationBar
                    title={'热点'}
                    hiddenBack={true}
                ></MyNavigationBar>
                {/*新闻列表*/}
                <FlatList
                    data={this.state.newsList}
                    renderItem={this.newsListItemView}
                    style={styles.newsList}
                />
            </View>
        );
    };

    newsListItemView = (item) => {
        if (item.item.is_adv) {
            return(<BannerView
                onClickAd = {this.onClickAd}
                data={item.item.data}
            ></BannerView>);
        } else {
            return (
                <NewsView
                    onClickAvatar = {this.onClickAvatar}
                    data={item.item.data}
                    onClickNews={this.onClickNews}
                ></NewsView>
            );
        }

    };

}

const {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    newsList: {
        backgroundColor: 'white'
    }
});

