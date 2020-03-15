import React, { Component } from "react";
import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchView from "../component/SearchView";
import TitleListView from "../component/TitleListView";
import BannerView from "../component/BannerView"
import NewsView from "../component/news/NewsView"

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    titleListItemView({ item }) {

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
                        <NewsView></NewsView>
                    );
                }
                    break;
                case '3':
                {
                    return (
                        <NewsView></NewsView>
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

                <TitleListView></TitleListView>

                {/*新闻列表*/}
                <FlatList
                    data={[{key: '1'}, {key: '2'}, {key: '3'}]}
                    renderItem={this.titleListItemView}
                    style={styles.newsList}
                />
            </View>
        );
    };
}

const {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    searchContainer: {
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchView: {
        flex: width - 30,
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
