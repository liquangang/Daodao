import React, { Component } from "react";
import {Text, View, FlatList, StyleSheet, Dimensions} from "react-native";
import BannerView from "../component/BannerView"
import NewsView from "../component/news/NewsView"

export default class HotSpot extends Component {
    render() {
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                    data={[{key: '1'}, {key: '2'}, {key: '3'}]}
                    renderItem={this.titleListItemView}
                    style={styles.newsList}
                />
            </View>
        );
    };

    titleListItemView({ item }) {

        switch (item.key) {
            case '1':
            {
                return (
                    <NewsView></NewsView>
                );
            }

                break;
            case '2':
            {
                return (
                    <NewsView></NewsView>
                );
            }
                break;
            case '3':
            {
                return (
                    <BannerView></BannerView>
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
        backgroundColor: 'white'
    },
    newsList: {

    }
});

