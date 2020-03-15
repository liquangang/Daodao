import React, { Component } from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";

export default class TitleListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            titleListData: []
        };
    }

    render() {
        return(
            <View style={styles.container}>
                <FlatList
                    data={[{key: '最新'}, {key: '关注'}, {key: '房产'}]}
                    renderItem={this.titleListItemView}
                    style={styles.flatList}
                    horizontal={true}
                />
            </View>

        );
    }

    titleListItemView({ item }) {
        return (
          <View style={styles.item}>
              <Text style={styles.itemText}>{item.key}</Text>
          </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        height: 40,
    },
    flatList: {
    },
    item: {
        height: 40,
        paddingLeft: 5,
        paddingRight: 5,
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 18
    }
});