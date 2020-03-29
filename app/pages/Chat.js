import React, { Component } from "react";
import {Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, TextInput, FlatList} from "react-native";

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            a: 1,
        };
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.chat}>
                    <FlatList
                        data={[{key: '1'}, {key: '2'}]}
                        renderItem={this.chatItemView}
                        style={styles.chatList}
                    ></FlatList>
                </View>
                <View style={styles.input}>
                    <TextInput underlineColorAndroid="transparent" placeholder="这里输入消息"
                               style={styles.searchTextInput}>
                    </TextInput>
                    <View style={styles.input2}>
                        <TouchableOpacity onPress={()=>{alert(1)}}>
                            <Image source={require('../source/myIcon.jpg')} style={styles.inputIcon}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{alert(1)}}>
                            <Image source={require('../source/myIcon.jpg')} style={styles.inputIcon}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{alert(1)}}>
                            <Image source={require('../source/myIcon.jpg')} style={styles.inputIcon}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{alert(1)}}>
                            <Image source={require('../source/myIcon.jpg')} style={styles.inputIcon}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{alert(1)}}>
                            <Image source={require('../source/myIcon.jpg')} style={styles.inputIcon}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    chatItemView = ({item}) => {
        switch (item.key) {
            case '1':
            {
                return(this.leftChatItemView({item}));
            }
                break;
            case '2':
            {
                return(this.rightChatItemView({item}));

            }
                break;
        }
    }

    leftChatItemView = ({ item }) => {
        return(
            <View style={styles.chatItemView1}>
                <TouchableOpacity>
                    <Image source={require('../source/avatar.jpg')} style={styles.avatar}/>
                </TouchableOpacity>
                <Image source={require('../source/avatar.jpg')} style={styles.avatar}/>
                <View style={styles.leftMes}>
                    <Text style={styles.mes1}>{item.key} {this.state.a}这里是消息这里是消息这里是消息这里是消息这里是消息这
                        里是消息这里是消息这里是消息这里是消息这里是消息这里是消息这里是消息这里是消息这里是
                        消息这里是消息这里是消息这里是消息这里是消息这里是消息这里是消
                        息这里是消息这里是消息这里是消息这里是消息这里是消息</Text>
                </View>

            </View>
        );
    }

    rightChatItemView = ({ item }) =>  {
        return(<View style={styles.chatItemView2}>
            <View style={styles.rightMes}>
                <Text style={styles.mes2}>这里是消息这里是消息这里是消息这里是消息这里是消息这
                    里是消息这里是消息这里是消息这里是消息这里是消息这里是消息这里是消息这里是消息这里是
                    消息这里是消息这里是消息这里是消息这里是消息这里是消息这里是消
                    息这里是消息这里是消息这里是消息这里是消息这里是消息</Text>
            </View>
            <Image source={require('../source/avatar.jpg')} style={styles.avatar}/>
            <TouchableOpacity>
                <Image source={require('../source/avatar.jpg')} style={styles.avatar}/>
            </TouchableOpacity>
        </View>);
    }
}

const {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chat: {
        flex: height - 105,
    },
    input: {
        flex: 105,

    },
    searchTextInput: {
        height: 40,
        margin: 5,
        backgroundColor: '#fff'
    },
    input2: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    inputIcon: {
        height: 30,
        width: 30,
    },
    chatList: {
        margin: 5,
    },
    chatItemView1: {
        flexDirection: 'row',
    },
    chatItemView2: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    avatar: {
        height: 50,
        width: 50,
        margin: 5,
        borderRadius: 25,
    },
    leftMes: {
        marginTop: 10,
        width: width - 200,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    rightMes: {
        marginTop: 10,
        width: width - 200,
        backgroundColor: '#FF906F',
        borderRadius: 10,
    },
    mes1: {
        padding: 5,
    },
    mes2: {
        padding: 5,
        color: 'white',
    }
});