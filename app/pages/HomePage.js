import React, { Component } from "react";
import { View, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity, Text, ScrollView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchView from "../component/SearchView";
import TitleListView from "../component/TitleListView";
import BannerView from "../component/BannerView"
import NewsView from "../component/news/NewsView"
import httpApi from "../tools/Api"
import LoadingView from "../component/LoadingView";
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

export default class HomePage extends Component {


    // --------------------------- 生命周期 --------------------------------------
    constructor(props) {
        super(props);
        this.state = {
            newsTypeList: [],
            newsList: [],
            loaded: false,
            showIndex: 0
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

    // 点击广告
    onClickAd = (item) => {
        if (item.href != null && item.href.length > 0) {
            let params = {
                url: item.href,
            };
            this.props.navigation.navigate('WebPage', params);
        }
    }

    // 点击帖子
    onClickNews = (newsId) => {
        let params = {
            newsId: newsId,
        };
        this.props.navigation.navigate('NewsDetail', params);
    }

    // 展示新闻列表
    showNewsList = (item) => {
        if (this.state.newsList != null && this.state.newsList[item.id] != null) {

        } else {
            this.fetchNewsListData(item.id);
        }

        this.setState({
            showIndex: this.state.newsTypeList.findIndex(()=>item==item),
        });

    }

    // 跳转消息页
    onClickMesBtn = () => {
        this.props.navigation.navigate('Message');
    }

    // 点击tap
    onChangeTabs = (obj) => {
        let item = this.state.newsTypeList[obj.i];
        this.onClickNewsType(item);
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
    fetchNewsListData = async (newsTypeId) => {
        let params = {
            post_cate_id: newsTypeId,
        };
        let res = await httpApi.getNewsList(params);

        if (res.status == 0) {

            let newNewsList = this.state.newsList;
            newNewsList[newsTypeId] = res.data.data;

            this.setState({
                newsList: newNewsList,
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
                        <Image source={require('../source/信息.png')} style={styles.img3}/>
                    </TouchableOpacity>
                </View>


                {/*新闻列表*/}
                <ScrollableTabView
                    initialPage={this.state.showIndex}
                    renderTabBar={() => <ScrollableTabBar style={styles.tabbar1} />}
                    tabBarActiveTextColor='white'
                    tabBarUnderlineStyle={styles.lineStyle}
                    tabBarTextStyle={styles.text9}
                    onChangeTab={this.onChangeTabs}
                >
                    {this.state.newsTypeList.map((value, index, array)=>{
                        return(<FlatList
                            tabLabel={value.name}
                            data={this.state.newsList[value.id]}
                            renderItem={this.newsListItemView}
                            style={styles.newsList}
                            key={index}
                        />);
                    })}

                </ScrollableTabView>

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
                    onClickNews={this.onClickNews}
                    data={item.item.data}
                ></NewsView>
            );
        }

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
        alignItems: 'center',
        backgroundColor: '#FB5442'
    },
    searchView: {
        flex: gScreen.screen_width - 20,
    },
    segmentation: {
        marginTop: 3,
        height: 1,
        backgroundColor: gColor.grayLineColor
    },
    newsList: {

    },
    img3: {
        width: 30,
        height: 30,
        marginTop: 8,
        marginLeft: 8,
        marginRight: 10,
    },
    lineStyle: {
        height: 2,
        backgroundColor: 'white',
    },
    tabbar1: {
        backgroundColor: '#FB5442',
    },
    text9: {
        color: 'white',
        fontSize: 16
    }
});
