import React, { Component } from "react";
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from "react-native";

export default class TitleListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }

    onClickText = (item) => {
        this.props.onClickNewsType(item);
    };

    render() {
        return(
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={this.titleListItemView.bind(this)}
                    style={styles.flatList}
                    horizontal={true}
                />
            </View>

        );
    }

    titleListItemView = ({ item }) => {
        return (
          <View style={styles.item}>
              <TouchableOpacity onPress={()=>this.onClickText(item)}>
                  <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
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