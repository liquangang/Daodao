import React, { Component } from "react";
import { View, StyleSheet, Dimensions, FlatList, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchView from "../component/SearchView";
import TitleListView from "../component/TitleListView";
import BannerView from "../component/BannerView"
import NewsView from "../component/news/NewsView"
import httpApi from "../tools/Api"

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

    componentDidMount() {
        this.fetchNewsTypeListData();
    }

    // ------------------------- 主题逻辑 ------------------------------

    // 点击头像
    onClickAvatar = () => {
        this.props.navigation.navigate('PersonInfo');
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

    // ------------------------------ 网络请求 -------------------------------------------

    // 请求新闻分类列表
    async fetchNewsTypeListData() {
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

        // 默认请求第一个新闻列表
        this.showNewsList(this.state.newsTypeList[0]);
    }

    // 下载具体新闻分类数据
    async fetchNewsListData(newsId) {
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
            return this.renderLoadingView();
        }

        return(
            <View style={styles.container}>

                {/*搜索*/}
                <View style={styles.searchContainer}>
                    <View style={styles.searchView}><SearchView/></View>
                    <Ionicons name='md-mail' size={35} style={styles.messageView}/>
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

        // switch (item.key) {
        //     case '1':
        //     {
        //         return (
        //             <BannerView></BannerView>
        //         );
        //     }
        //
        //         break;
        //     case '2':
        //     {
        //         return (
        //             <NewsView onClickAvatar = {this.onClickAvatar}></NewsView>
        //         );
        //     }
        //         break;
        //     case '3':
        //     {
        //         return (
        //             <NewsView onClickAvatar = {this.onClickAvatar}></NewsView>
        //         );
        //     }
        //         break;
        //     default :
        //     {
        //         return (
        //             <NewsView></NewsView>
        //         );
        //     }
        //         break;
        // }
    };

    renderLoadingView() {
        return (
            <View style={styles.loadingView}>
                <Text>Loading data...</Text>
            </View>
        );
    }

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
        backgroundColor: '#D3D3D3'
    },
    newsList: {

    },
    loadingView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
});
