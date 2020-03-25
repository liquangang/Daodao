import React, {Component} from "react";
import {View, StyleSheet, Image, Text, Dimensions, FlatList, TouchableOpacity } from "react-native";

export default class NewsView extends Component {

    onClickAvatar = () => {
        // navigation.navigate('personalInfo');
        this.props.onClickAvatar();
    };

    render() {
        return (
            <View style={styles.container}>

                {/*动态上部部分*/}
                <View style={styles.topInfoContainer}>
                    {/*头像*/}
                    <TouchableOpacity onPress={this.onClickAvatar}>
                        <Image source={require('../../source/avatar.jpg')} style={styles.avatar}/>
                    </TouchableOpacity>
                    <View style={styles.topSubInfoContainer}>
                        <Text style={styles.nickName}>叮当机器女猫</Text>
                        <View style={styles.topSubInfoBottomContainer}>
                            <Text style={styles.publishTime}>1分钟前</Text>
                            <Text style={styles.phoneModel}>来自：iphonex</Text>
                        </View>
                    </View>
                    <Image source={require('../../source/attention.jpg')} style={styles.attention}/>
                </View>

                {/*动态文案部分*/}
                <Text style={styles.newsContent}>蓝田有一颗王维种的银杏树</Text>

                {/*动态图片部分*/}
                <FlatList
                    data={[{key: '最新'}, {key: '关注'}, {key: '房产'}, {key: '房产'}, {key: '房产'}, {key: '房产'}]}
                    renderItem={this.imgItemView}
                    style={styles.newsImgList}
                    numColumns ={3}
                />

                {/*动态底部部分*/}
                <View style={styles.bottomContainer}>
                    <View style={styles.bottomTopContainer}>
                        <Image source={require('../../source/location.jpg')} style={styles.itemIcon}/>
                        <Text>北京市长安街</Text>
                    </View>
                    <View style={styles.segmentation}></View>
                    <View style={styles.bottomBottomContainer}>
                        <View style={styles.bottomBottomSubContainer}>
                            <Image source={require('../../source/share.jpg')} style={styles.itemIcon}/>
                            <Text>111</Text>
                        </View>
                        <View style={styles.bottomBottomSubContainer}>
                            <Image source={require('../../source/mes.jpg')} style={styles.itemIcon}/>
                            <Text>222</Text>
                        </View>
                        <View style={styles.bottomBottomSubContainer}>
                            <Image source={require('../../source/praise.jpg')} style={styles.itemIcon}/>
                            <Text>333</Text>
                        </View>
                    </View>
                    <View style={styles.bottomSegmentation}></View>
                </View>

            </View>
        );
    };

    imgItemView({ item }) {
        return (
            <View style={styles.item}>
                <Image source={require('../../source/banner.jpg')} style={styles.newsImg}/>
            </View>
        );
    }
}

const {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
    },
    topInfoContainer: {
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
    },
    topSubInfoContainer: {
        flex: width - 100,
    },
    avatar: {
        flex: 50,
        height: 50,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 25,
    },
    attention: {
        flex: 50,
        height: 50,
        marginLeft: 5,
        marginRight: 5,
    },
    nickName: {
        marginTop: 5,
        fontSize: 17,
        color: '#DC143C'
    },
    topSubInfoBottomContainer: {
        marginTop: 3,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    publishTime: {

    },
    phoneModel: {
        marginRight: 15,
    },
    newsContent: {
        marginLeft: 5,
        marginRight: 5
    },
    newsImgList: {
    },
    newsImg: {
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
        height: width/4,
        width: width/4,
    },
    bottomContainer: {

    },
    bottomTopContainer: {
        marginTop: 5,
        height: 30,
        marginLeft: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    segmentation: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        height: 1,
        backgroundColor: '#D3D3D3'
    },
    bottomBottomContainer: {
        height: 40,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bottomSegmentation: {
        height: 10,
        backgroundColor: '#DCDCDC'
    },
    itemIcon: {
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
        height: 30,
        width: 30,
    },
    bottomBottomSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});