import React, { Component } from "react";
import { View, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity, Text, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchView from "../component/SearchView";
import TitleListView from "../component/TitleListView";
import BannerView from "../component/BannerView"
import NewsView from "../component/news/NewsView"
import httpApi from "../tools/Api"
import LoadingView from "../component/LoadingView";
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import {gViewStyles} from "../style/ViewStyles";
import MyStatusBar from "../component/MyStatusBar";

export default class HomePage extends Component {

    // --------------------------- 生命周期 --------------------------------------
    constructor(props) {
        super(props);
        this.state = {
            newsTypeList: [],
            newsList: [],
            pageList: [],
            loaded: false,
            showIndex: 0,
            headerLoad: false,
            listLoad: true,
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
            headerLoad: false,
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

    // 搜索
    onSearch = (text) => {
        let params = {
            search: text
        };
        this.props.navigation.navigate('Search', params);
    }


    // ------------------------------ 网络请求 -------------------------------------------

    // 请求新闻分类列表
    fetchNewsTypeListData = async () => {
        let params = {};
        let res = await httpApi.getNewsTypeList(params);

        if (res.status == 0) {
            let newPageList = [];
            for (let i = 0; i < res.data.length; i++) {
                newPageList[res.data[i].id] = 1;
            }
            this.setState({
                pageList: newPageList,
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

    // 上拉加载
    onLoadMoreData = async (value) => {

        if (this.state.listLoad == false) {
            return;
        }

        let params = '';
        params+=("post_cate_id=" + value.id + '&');
        params+=('page=' + (this.state.pageList[value.id]+=1) + '&');

        let res = await httpApi.httpPostWithParamsStr('http://dd.shenruxiang.com/api/v1/post_list', params);
        if (res.status == 0) {

            if (res.data.data.length > 0) {
                let newNewsList = this.state.newsList;
                for (let i = 0; i < res.data.data.length; i++) {
                    newNewsList[value.id].push(res.data.data[i]);
                }
                this.setState({
                    newsList: newNewsList,
                });
            } else {
                this.setState({
                    listLoad: false,
                });
            }

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
            <View style={gViewStyles.viewContainer1}>
                <MyStatusBar/>

                {/*搜索*/}
                <View style={styles.searchContainer}>
                    <View style={styles.searchView}>
                        <SearchView
                            onSearch={this.onSearch}
                        />
                    </View>
                    <TouchableOpacity onPress={this.onClickMesBtn}>
                        <Image source={require('../source/xinxi.png')} style={styles.img3}/>
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
                    {this.state.newsTypeList.map((value, index, array) => {
                        return (
                            <View
                                tabLabel={value.name}
                            >
                                <FlatList
                                    data={this.state.newsList[value.id]}
                                    renderItem={this.newsListItemView}
                                    style={styles.newsList}
                                    key={index}
                                    ListFooterComponent={()=>(
                                        this.state.listLoad == true ? (<View style={styles.indicatorContainer}>
                                            <ActivityIndicator
                                                style={styles.indicator}
                                                size={'small'}
                                                animating={true}
                                            />
                                        </View>) : (<View style={gViewStyles.bottomLoad}><Text>到底啦！</Text></View>)
                                        )}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.headerLoad}
                                            onRefresh={()=>{
                                                this.setState({
                                                    newsTypeList: [],
                                                    newsList: [],
                                                    pageList: [],
                                                    loaded: false,
                                                    showIndex: index,
                                                    listLoad: true,
                                                    headerLoad: true,
                                                });
                                                this.componentDidMount();
                                            }}
                                            enabled={true}
                                        />
                                    }
                                    onEndReached={()=>{
                                        this.onLoadMoreData(value, index);
                                    }}
                                    onEndReachedThreshold={0.1}
                                />
                            </View>


                        );
                    })}

                </ScrollableTabView>

            </View>
        );
    };


    newsListItemView = (item) => {
        if (item.item.is_adv) {
            return(
                <View>
                    <View style={styles.bottomSegmentation}></View>
                    <BannerView
                        onClickAd = {this.onClickAd}
                        data={item.item.data}
                    ></BannerView>
                </View>
                );
        } else {
            return (
                <NewsView
                    onClickAvatar = {this.onClickAvatar}
                    onClickNews={this.onClickNews}
                    data={item.item.data}
                    isShowPersonInfo={true}
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
    },
    indicatorContainer:{
        alignItems:'center'
    },
    indicator:{
        color:'red',
        margin:10
    },
    bottomSegmentation: {
        height: 10,
        backgroundColor: gColor.grayLineColor
    },
});
