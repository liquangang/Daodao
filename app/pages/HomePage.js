import React, { Component } from "react";
import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchView from "../component/SearchView";
import TitleListView from "../component/TitleListView";
import BannerView from "../component/BannerView"
import NewsView from "../component/news/NewsView"
import httpApi from "../tools/Api"

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
    }

    onClickAvatar = () => {
        // this.props.navigation.navigate('NewsDetail');
        this.fetchData();
    };

    async fetchData() {
        let params = {};
        let res = httpApi.getNewsInfo(params);

        //请求回复的一些操作，这里根据你们的业务员需求和接口自定义
        console.log("~~~~~~~~~~~~~~", res);
    }

    render() {

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
                <TitleListView></TitleListView>

                {/*新闻列表*/}
                <FlatList
                    data={[{key: '1'}, {key: '2'}, {key: '3'}]}
                    renderItem={(item)=>this.newsListItemView(item)}
                    style={styles.newsList}
                />
            </View>
        );
    };

    newsListItemView = ({ item }) => {

        switch (item.key) {
            case '1':
            {
                return (
                    <BannerView></BannerView>
                );
            }

                break;
            case '2':
            {
                return (
                    <NewsView onClickAvatar = {()=>this.onClickAvatar()}></NewsView>
                );
            }
                break;
            case '3':
            {
                return (
                    <NewsView onClickAvatar = {()=>this.onClickAvatar()}></NewsView>
                );
            }
                break;
            default :
            {
                return (
                    <NewsView></NewsView>
                );
            }
                break;
        }
    }

}

const {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

    }
});
