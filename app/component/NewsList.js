import React, { Component } from "react";
import BannerView from "../component/BannerView"
import NewsView from "../component/news/NewsView"
import { View, StyleSheet, FlatList } from "react-native";
import {gViewStyles} from "../style/ViewStyles";

export default class NewsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            load: false,
        };
    }

    render() {
        return (
            <View style={gViewStyles.rootViewContainer}>
                <FlatList
                    data={this.state.data}
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
                    onClickNews={this.onClickNews}
                    data={item.item.data}
                    isShowPersonInfo={true}
                ></NewsView>
            );
        }

    };
}

const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
});