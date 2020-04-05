import React, {Component} from "react";
import {View, StyleSheet, Image, Text, Dimensions, FlatList, TouchableOpacity } from "react-native";

export default class NewsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }

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
                    <TouchableOpacity onPress={()=>this.onClickAvatar()}>
                        <Image source={require('../../source/avatar.jpg')}
                               // source={{uri: this.state.data.user.avatar}}
                               style={styles.avatar}/>
                    </TouchableOpacity>
                    <View style={styles.topSubInfoContainer}>
                        <Text style={styles.nickName}>{this.state.data.user.nick_name}</Text>
                        <View style={styles.topSubInfoBottomContainer}>
                            <Text style={styles.publishTime}>{this.state.data.created_at}</Text>
                            <Text style={styles.phoneModel}>来自：{this.state.data.phone_model}</Text>
                        </View>
                    </View>
                    <Image source={require('../../source/attention.jpg')} style={styles.attention}/>
                </View>

                <View style={styles.segmentation}></View>

                {/*动态文案部分*/}
                <Text style={styles.newsContent}>{this.state.data.post_content}</Text>

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
                        <Text>{this.state.data.post_position}</Text>
                    </View>
                    <View style={styles.segmentation}></View>
                    <View style={styles.bottomBottomContainer}>
                        <View style={styles.bottomBottomSubContainer}>
                            <Image source={require('../../source/share.jpg')} style={styles.itemIcon}/>
                            <Text>{this.state.data.share_num}</Text>
                        </View>
                        <View style={styles.bottomBottomSubContainer}>
                            <Image source={require('../../source/mes.jpg')} style={styles.itemIcon}/>
                            <Text>{this.state.data.comment_num}</Text>
                        </View>
                        <View style={styles.bottomBottomSubContainer}>
                            <Image source={require('../../source/blackPraise.jpg')} style={styles.itemIcon}/>
                            <Text>{this.state.data.praise_num}</Text>
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
        backgroundColor: 'white',
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
        height: 40,
        width: 40,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 20,
    },
    attention: {
        flex: 60,
        height: 30,
        marginLeft: 5,
        marginRight: 5,
    },
    nickName: {
        marginTop: 5,
        fontSize: 17,
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
        margin: 10,
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
        margin: 5,
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
        height: 25,
        width: 25,
    },
    bottomBottomSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});