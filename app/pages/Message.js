import React, { Component } from "react";
import {Text, View, StyleSheet, ScrollView, Image, FlatList, TouchableOpacity, Dimensions} from "react-native";

export default class Message extends Component {
    render() {
        return(
            <View style={styles.container}>
                <FlatList
                    data={[{key: '1'}, {key: '2'}, {key: '3'}]}
                    renderItem={(item)=>this.msgListItemView(item)}
                    style={styles.msgListContainer}
                />
            </View>
        );
    };

    msgListItemView = ({ item }) => {
        switch (item.key) {
            case '1':
            {
                return(
                    <View style={styles.topContainer}>
                        <View style={styles.msgIconContainer}>
                            <TouchableOpacity onPress={()=>{alert(1)}}>
                                <Image source={require('../source/myIcon.jpg')} style={styles.msgIcon}/>
                            </TouchableOpacity>
                            <Text style={styles.msgDes}>关注</Text>
                        </View>

                        <View style={styles.msgIconContainer}>
                            <TouchableOpacity onPress={()=>{alert(1)}}>
                                <Image source={require('../source/myIcon.jpg')} style={styles.msgIcon}/>
                            </TouchableOpacity>
                            <Text style={styles.msgDes}>关注</Text>
                        </View>

                        <View style={styles.msgIconContainer}>
                            <TouchableOpacity onPress={()=>{alert(1)}}>
                                <Image source={require('../source/myIcon.jpg')} style={styles.msgIcon}/>
                            </TouchableOpacity>
                            <Text style={styles.msgDes}>关注</Text>
                        </View>

                        <View style={styles.msgIconContainer}>
                            <TouchableOpacity onPress={()=>{alert(1)}}>
                                <Image source={require('../source/myIcon.jpg')} style={styles.msgIcon}/>
                            </TouchableOpacity>
                            <Text style={styles.msgDes}>关注</Text>
                        </View>
                    </View>
                );
            }
                break;
            default:
            {
                return(
                    <View>
                        <View style={styles.line}></View>
                        <View style={styles.msgContainer}>
                            <TouchableOpacity onPress={()=>{alert(1)}}>
                                <Image source={require('../source/avatar.jpg')} style={styles.avatar}/>
                            </TouchableOpacity>
                            <View style={styles.msgSubContainer}>
                                <View style={styles.mesSubContainer}>
                                    <Text style={styles.text1}>运动无极限</Text>
                                    <View style={styles.container1}>
                                        <Text style={styles.text3}>09-12</Text>
                                        <Text style={styles.text2}> * </Text>
                                    </View>
                                </View>
                                <View style={styles.mesSubContainer1}>
                                    <Text style={styles.text2}>评论：</Text>
                                    <Text style={styles.text3}>看到信息回复下</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                );
            }
                break;
        }
    }

}

const {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
    },
    msgListContainer: {
        backgroundColor: 'white',
    },
    topContainer: {
        marginTop: 15,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 60,
    },
    msgIcon: {
        width: 44,
        height: 44,
    },
    msgIconContainer: {
        alignItems: 'center',
    },
    msgDes: {
        marginTop: 5,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
    },
    avatar: {
        flex: 54,
        borderRadius: 27,
        width: 54,
        height: 54,
        marginLeft: 10,
    },
    line: {
        height: 0.5,
        marginLeft: 2,
        marginRight: 2,
        backgroundColor: '#DCDCDC',
    },
    mesSubContainer: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    mesSubContainer1: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    msgSubContainer: {
        flex: width - 74,
    },
    container1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    text1: {
        fontSize: 17,
    },
    text2: {
        color: '#FF4500',
    },
    text3: {
        color: '#808080',
    }
});