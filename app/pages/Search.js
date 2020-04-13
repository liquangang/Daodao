import React, { Component } from "react";
import { FlatList, View, TouchableOpacity, Image, TextInput, SafeAreaView } from "react-native";
import {gImageStyles} from "../style/ImageStyles";
import {gViewStyles} from "../style/ViewStyles";
import MyStatusBar from "../component/MyStatusBar";
import {gTextStyles} from "../style/TextStyles";
import BannerView from "../component/BannerView"
import NewsView from "../component/news/NewsView"
import httpApi from "../tools/Api";
import LoadingView from "../component/LoadingView";

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchList: [],
            load: false
        };
    }

    componentDidMount() {
        this.fetchSearchData(this.props.route.params.search)
    }

    onEndEditing = (text) => {
        this.fetchSearchData(text)
    }

    // 搜索接口
    fetchSearchData = async (text) => {
        let params = {
            search: text,
        };
        let res = await httpApi.getNewsList(null);

        if (res.status == 0) {

            this.setState({
                searchList: res.data.data,
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

        return (
            <View style={gViewStyles.rootViewContainer}>
                <MyStatusBar></MyStatusBar>
                <SafeAreaView style={gViewStyles.rootViewContainer}>
                    <View style={gViewStyles.view3}>
                        {/*返回*/}
                        <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                            <View style={gViewStyles.backView}>
                                <Image source={require('../source/fanhui.png')} style={gImageStyles.leftArrow}/>
                            </View>
                        </TouchableOpacity>
                        {/*搜索框*/}
                        <View style={gViewStyles.searchView}>
                            <Image source={require('../source/sousuo.png')} style={gImageStyles.avatar}/>
                            <TextInput underlineColorAndroid="transparent" placeholder="搜索你想要的内容" placeholderTextColor={'#999999'}
                                       style={gTextStyles.searchTextInput}
                                       onSubmitEditing={(event)=>this.onEndEditing(event.nativeEvent.text)}>
                                {this.props.route.params.search}
                            </TextInput>
                        </View>
                    </View>
                    {/*搜索结果列表*/}
                    <FlatList
                        data={this.state.searchList}
                        renderItem={this.newsListItemView}
                    />
                </SafeAreaView>
            </View>
        );
    }

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