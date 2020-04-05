import React, { Component } from "react";
import {Text, View, StyleSheet, ScrollView, Image, FlatList, Dimensions} from "react-native";

// 个人详情页，注意与my页区分
export default class PersonInfo extends Component {

    componentDidMount() {
        this.fetchNewsTypeListData();
    }

    render() {
        return(
            <View style={styles.superContainer}>
                <FlatList
                    style={styles.container}
                    data={[{key: '1'}, {key: '2'}, {key: '3'}]}
                    renderItem={this.itemView}
                />
                <View style={styles.container6}>
                    <Image source={require('../source/privateChat.jpg')} style={styles.img2}/>
                    <Image source={require('../source/attention.jpg')} style={styles.img2}/>
                </View>
            </View>

        );
    };

    itemView = ({ item }) => {
        switch (item.key) {
            case '1':
            {
                return(this.infoItemView(item));
            }
                break;
            case '2':
            {
                return(this.detailItemView(item));
            }
                break;
            default:
            {
                return(this.newsItemView(item));
            }
                break;
        }
    };

    infoItemView = ({ item }) => {
        return(
            <View style={styles.itemContainer1}>
                {/*有头像的部分*/}
                <View style={styles.container2}>
                    <Image source={require('../source/avatar.jpg')} style={styles.img1}/>
                    <View style={styles.container3}>
                        <Text style={styles.text1}>会飞的鱼</Text>
                        <Text style={styles.text2}>签名：我是一条会飞的鱼</Text>
                        <Text style={styles.text3}>粉丝：12345    关注：12345</Text>
                    </View>
                </View>
                <View style={styles.container4}>
                    <Text style={styles.text4}>资料</Text>
                    <Text style={styles.text4}>相册</Text>
                </View>
            </View>
        );
    };

    detailItemView = ({ item }) => {
        return(
            <View style={styles.container5}>
                <Text style={styles.text5}>性别：女</Text>
                <Text style={styles.text5}>星座：摩羯座</Text>
                <Text style={styles.text5}>感情状况：单身</Text>
                <Text style={styles.text5}>出生日期：2000-01-01</Text>
                <Text style={styles.text5}>职业：互联网-电子工程</Text>
                <Text style={styles.text5}>注册地点：北京市昌平区</Text>
            </View>
        );
    };

    newsItemView = ({ item }) => {
        return(
            <View style={styles.itemContainer2}>
                <Text style={styles.text5}>09-18</Text>
                <View style={styles.line2}></View>
                <Text style={styles.text6}>动态内容动态内容动态内容动态内容动态内容动态内容动态
                    内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容动
                    动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容
                    动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容
                    动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容
                    态内容动态内容动态内容动态内容动态内容动态内容</Text>
                <Image source={require('../source/avatar.jpg')} style={styles.img1}/>
                <Image source={require('../source/avatar.jpg')} style={styles.img1}/>
                <Image source={require('../source/avatar.jpg')} style={styles.img1}/>
                <View style={styles.bottomContainer}>
                    <View style={styles.bottomTopContainer}>
                        <Image source={require('../source/location.jpg')} style={styles.itemIcon}/>
                        <Text>北京市长安街</Text>
                    </View>
                    <View style={styles.segmentation}></View>
                    <View style={styles.bottomBottomContainer}>
                        <View style={styles.bottomBottomSubContainer}>
                            <Image source={require('../source/share.jpg')} style={styles.itemIcon}/>
                            <Text>111</Text>
                        </View>
                        <View style={styles.bottomBottomSubContainer}>
                            <Image source={require('../source/mes.jpg')} style={styles.itemIcon}/>
                            <Text>222</Text>
                        </View>
                        <View style={styles.bottomBottomSubContainer}>
                            <Image source={require('../source/blackPraise.jpg')} style={styles.itemIcon}/>
                            <Text>333</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };
}

const {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
    superContainer: {
        flex: 1,
    },
    container: {
    },
    itemContainer1: {

    },
    container2: {
        flexDirection: 'row',
        backgroundColor: '#FF906F',
        alignItems: 'center',
    },
    img1: {
        height: 50,
        width: 50,
        margin: 10,
        borderRadius: 25,
    },
    container3: {
        margin: 10,
    },
    text1: {
        color: 'white',
        fontSize: 18,
    },
    text2: {
        color: 'white',
        marginTop: 5,
        marginBottom: 5,
    },
    text3: {
        color: 'white',
    },
    container4: {
        padding: 5,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    text4: {
        margin: 5,
        fontSize: 17,
    },
    container5: {
        marginTop: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    text5: {
        margin: 5,
    },
    itemContainer2: {
        marginTop: 5,
        backgroundColor: 'white',
    },
    text6: {
        padding: 10,
    },
    line2: {
        height: 1,
        backgroundColor: "#D3D3D3",
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
    },
    img2: {
        height: 35,
        width: width/2 - 40,
    },
    container6: {
        marginTop: 10,
        backgroundColor: 'white',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
});