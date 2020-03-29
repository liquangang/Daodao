import React, { Component } from "react";
import {Text, View, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, Dimensions} from "react-native";

export default class NewsDetail extends Component {
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <FlatList
                        data={[{key: '1'}, {key: '2'}, {key: '3'}, {key: '4'}, {key: '5'}, {key: '6'}]}
                        renderItem={this.newsItemView}
                        style={styles.newsInfoList}
                    ></FlatList>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput underlineColorAndroid="transparent" placeholder="输入评论内容"
                               style={styles.input}>
                    </TextInput>
                    <TouchableOpacity>
                        <Image source={require('../source/share1.jpg')} style={styles.shareIcon}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    newsItemView = ({ item }) => {
        switch (item.key) {
            case '1':
            {
                return(this.userInfoItemView(item));
            }
                break;
            case '2':
            {
                return(this.newsInfoItemView(item));
            }
                break;
            case '3':
            {
                return(this.adItemView(item));
            }
                break;
            case '4':
            {
                return(this.commentItemView(item));
            }
                break;
            case '5':
            {
                return(this.subCommentItemView(item));
            }
                break;
            case '6':
            {
                return(this.adItemView(item));
            }
                break;
        }
    };

    userInfoItemView = ({ item }) => {
        return(
            <View style={styles.userInfoContainer}>
                <TouchableOpacity>
                    <Image source={require('../source/avatar.jpg')} style={styles.avatar}/>
                </TouchableOpacity>
                <View style={styles.userInfoContainer1}>
                    <Text style={styles.userInfoText1}>运动无极限</Text>
                    <Text style={styles.userInfoText}>1分钟前 来自 iPhone X</Text>
                </View>
                <Image source={require('../source/attention1.jpg')} style={styles.userInfoImg}/>
            </View>
        );
    };

    adItemView = ({ item }) => {
        return(
            <View style={styles.adContainer}>
                <Image source={require('../source/ad.jpg')} style={styles.adImg}/>
            </View>
        );
    }

    newsInfoItemView = ({ item }) => {
        return(
            <View style={styles.newsInfoContainer}>
                <View style={styles.newsInfoLine}></View>
                <Text style={styles.newsInfoText}>动态内容动态内容动态内容动态内容动态内容动态内容动态
                    内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容动
                    动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容
                    动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容
                    动态内容动态内容动态内容动态内容动态内容动态内容动态内容动态内容
                    态内容动态内容动态内容动态内容动态内容动态内容</Text>
                <Image source={require('../source/avatar.jpg')} style={styles.img1}/>
                <Image source={require('../source/avatar.jpg')} style={styles.img1}/>
                <Image source={require('../source/avatar.jpg')} style={styles.img1}/>
                <View style={styles.newsInfoContainer1}>
                    <Image source={require('../source/location.jpg')} style={styles.itemIcon}/>
                    <Text> 北京市长安街</Text>
                </View>
            </View>
        );
    };

    commentItemView = ({ item }) => {
        return(
            <View>
                <View style={styles.commentLine}></View>
                <View style={styles.commentContainer}>
                    <Image source={require('../source/avatar.jpg')} style={styles.img1}/>
                    <View style={styles.commentContainer1}>
                        <View style={styles.commentContainer2}>
                            <Text style={styles.commentText}> 北京市长安街</Text>
                            <Image source={require('../source/praise1.jpg')} style={styles.commentImg}/>
                            <Text style={styles.commentText2}>111111111111111111</Text>
                        </View>
                        <Text style={styles.commentText1}> 北京市长安街北京市长安街北京
                            北京市长安街北京市长安街北京市长安街北京市长安街北京市长安街北京市长安街北京市长安街北京市长安街
                            北京市长安街北京市长安街北京市长安街北京市长安街北京市长安街北京市长安街北京市长安街
                            市长安街北京市长安街北京市长安街北京市长安街北京市长安街北京市长安街</Text>
                        <Text style={styles.commentText3}>1天前</Text>
                    </View>
                </View>
            </View>
        );
    };

    subCommentItemView = ({ item }) => {
        return( <View>
            <View style={styles.commentLine}></View>
            <View style={styles.subCommentContainer}>
                <Image source={require('../source/avatar.jpg')} style={styles.img1}/>
                <View style={styles.commentContainer1}>
                    <View style={styles.commentContainer2}>
                        <Text style={styles.commentText}> 北京市长安街</Text>
                        <Image source={require('../source/praise1.jpg')} style={styles.commentImg}/>
                        <Text style={styles.commentText2}>111111111111111111</Text>
                    </View>
                    <Text style={styles.commentText1}> 北京市长安街北京市长安街北京
                        北京市长安街北京市长安街北京市长安街北京市长安街北京市长安街北京市长安街北京市长安街北京市长安街
                        北京市长安街北京市长安街北京市长安街北京市长安街北京市长安街北京市长安街北京市长安街
                        市长安街北京市长安街北京市长安街北京市长安街北京市长安街北京市长安街</Text>
                    <Text style={styles.commentText3}>1天前</Text>
                </View>
            </View>
        </View>);
    }
}

const {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topContainer: {
        flex: height - 40,
    },
    newsInfoList: {
    },
    inputContainer: {
        flexDirection: 'row',
        flex: 40,
        padding: 10,
        margin: 5,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    input: {
        flex: width - 70,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        borderRadius: 10,
    },
    shareIcon: {
        flex: 60,
        marginLeft: 10,
        color: 'white',
        width: 60,
        height: 40,
    },
    avatar: {
        flex: 60,
        height: 40,
        width: 40,
        margin: 5,
        borderRadius: 20,
    },
    userInfoContainer: {
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    userInfoContainer1: {
        flex: width - 130,
    },
    userInfoText: {
        margin: 5,
        fontSize: 12,
    },
    userInfoText1: {
        margin: 5,
    },
    userInfoImg: {
        flex: 60,
        width: 60,
        height: 40,
        margin: 5,
    },
    newsInfoContainer: {
    },
    newsInfoLine1: {
        height: 1,
        backgroundColor: '#C0C0C0',
    },
    adContainer: {
        margin: 5,
    },
    adImg: {
        width: width - 10,
    },
    newsInfoLine: {
        height: 1,
        backgroundColor: "#C0C0C0",
    },
    newsInfoText: {
        margin: 10,
    },
    newsInfoContainer1: {
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentLine: {
        height: 1,
        backgroundColor: "#C0C0C0",
    },
    commentContainer: {
        flexDirection: "row",
    },
    commentContainer1: {
        flex: width - 100,
        justifyContent: 'center',
    },
    commentText: {
        flex: width - 150,
        margin: 5,
    },
    commentText1: {
        margin: 5,
        flex: width - 150,
    },
    commentContainer2: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    commentImg: {
        height: 30,
        width: 30,
    },
    commentText2: {

    },
    commentText3: {
        color: "#C0C0C0",
    },
    subCommentContainer: {
        flexDirection: "row",
        marginLeft: 30,
    }
});