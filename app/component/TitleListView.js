import React, { Component } from "react";
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from "react-native";

export default class TitleListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            selectId: 2
        };
    }

    onClickText = (item) => {
        this.props.onClickNewsType(item);
        this.setState({
            selectId: item.id
        });
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
                  {this.state.selectId == item.id ?
                      (
                          <Text style={styles.itemText2}>{item.name}</Text>
                  ) : (
                      <Text style={styles.itemText}>{item.name}</Text>
                      )}
              </TouchableOpacity>
          </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        height: 40,
        backgroundColor: '#FB5442',
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
        fontSize: 14,
        color: 'white'
    },
    itemText2: {
        fontSize: 18,
        color: '#F0F8FF'
    }
});