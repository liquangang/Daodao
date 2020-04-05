import React, { Component } from "react";
import {Text, View, StyleSheet, Image, ImageBackground, SectionList, Dimensions } from "react-native";

export default class My extends Component {
    render() {
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../source/myBack.jpg')} style={styles.topContainer}>
                    <Image source={require('../source/avatar.jpg')} style={styles.avatar}/>
                    <View style={styles.personalInfoContainer}>
                        <Text style={styles.nickName}>庞各庄一中校长</Text>
                        <Text style={styles.commonText}>ID：123</Text>
                        <Text style={styles.commonText}>粉丝：123   关注：123</Text>
                    </View>
                    <Image source={require('../source/updateNickName.jpg')} style={styles.updateNickName}/>
                </ImageBackground>
                <SectionList
                    sections={[
                        {title: 'D', data: ['我的动态 ', '我的相册 ', '实名认证 ', '广告投放 ', '帮助中心 ', '投诉反馈 ', '在线客服 ']},
                        {title: 'J', data: ['关于我们', '检查更新', '退出登录']},
                    ]}
                    renderItem={this.myItemView}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}></Text>}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    };

    myItemView({ item }) {
        if (item.length >= 5) {
            return (
                <View style={styles.itemContainer}>
                    <View style={styles.topLine}></View>
                    <View style={styles.itemInfoContainer}>
                        <Image source={require('../source/attention1.jpg')} style={styles.itemIcon}/>
                        <Text style={styles.itemText}>{item}</Text>
                        <Image source={require('../source/rightArrow.jpg')} style={styles.itemArrow}/>
                    </View>
                    <View style={styles.bottomLine}></View>
                </View>
            );
        } else {
            return (
                <View style={styles.itemContainer}>
                    <View style={styles.topLine}></View>
                    <View style={styles.itemInfoContainer}>
                        <Text style={styles.itemText}>{item}</Text>
                        <Image source={require('../source/rightArrow.jpg')} style={styles.itemArrow}/>
                    </View>

                </View>
            );
        }
    }
}

const {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {

    },
    topContainer: {
        height: 150,
        flexDirection: 'row',
    },
    avatar: {
        height: 50,
        width: 50,
        marginTop: 15,
        marginLeft: 15,
        marginRight: 5,
        borderRadius: 25,
    },
    personalInfoContainer: {
        marginTop: 15,
    },
    nickName: {
        fontSize: 18,
    },
    commonText: {

    },
    updateNickName: {
        marginTop: 15,
        height: 30,
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
    },
    itemContainer: {
        padding: 10,
        fontSize: 18,
        height: 48,
    },
    itemIcon: {
        flex: 20,
        marginTop: 10,
        width: 20,
        height: 20,
    },
    topLine: {
        height: 1,
        backgroundColor: '#C0C0C0'
    },
    bottomLine: {
        marginTop: 13,
        height: 1,
        backgroundColor: '#C0C0C0'
    },
    itemInfoContainer: {
        flexDirection: 'row',
    },
    itemText: {
        flex: width - 200,
        marginTop: 11,
        marginLeft: 10,
    },
    itemArrow: {
        flex: 30,
        height: 30,
        width: 30,
        marginTop: 5
    }
});