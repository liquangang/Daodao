import {gViewStyles} from "../style/ViewStyles";
import React, {Component} from "react";
import {View, StyleSheet, Image, TouchableOpacity, Text, Dimensions} from "react-native";
import {gTextStyles} from "../style/TextStyles";
import httpApi from "../tools/Api";

export default class CommentItemView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
        };
    }

    render() {
        return (<View>
            <TouchableOpacity onPress={() => {
                this.props.onClickReply(this.state.data);
            }}>
                <View style={styles.commentContainer}>
                    <Image source={{uri: this.state.data.user.avatar}} style={styles.img1}/>
                    <View style={styles.commentContainer1}>
                        <View style={styles.commentContainer2}>
                            <Text style={styles.commentText}>{this.state.data.user.nick_name}</Text>
                            <View style={gViewStyles.praiseView}>
                                {this.state.data.comment_priase != null ? (<TouchableOpacity onPress={async () => {
                                        let params = '';
                                        params += ("post_id=" + this.state.data.post_id + '&');
                                        params += ('to_user_id=' + this.state.data.to_user_id + '&');
                                        params += ('comment_id=' + this.state.data.comment_id + '&');

                                        let res = await httpApi.httpPostWithParamsStr('http://dd.shenruxiang.com/api/v1/post_comment_praise', params);
                                        if (res.status == 0) {
                                            let newData = this.state.data;
                                            if (newData.comment_priase == null) {
                                                newData.comment_priase = 1;
                                                newData.praise_num += 1;
                                            } else {
                                                newData.comment_priase = null;
                                                newData.praise_num -= 1;
                                            }
                                            this.setState({
                                                data: newData
                                            })
                                        } else {
                                            alert("网络异常！请检查网络！");
                                        }
                                    }}>
                                        <Image source={require('../source/dianzanred.png')}
                                               style={styles.commentImg}/>
                                    </TouchableOpacity>
                                ) : (<TouchableOpacity onPress={async ()=>{
                                        let params = '';
                                        params += ("post_id=" + this.state.data.post_id + '&');
                                        params += ('to_user_id=' + this.state.data.to_user_id + '&');
                                        params += ('comment_id=' + this.state.data.comment_id + '&');

                                        let res = await httpApi.httpPostWithParamsStr('http://dd.shenruxiang.com/api/v1/post_comment_praise', params);
                                        if (res.status == 0) {
                                            let newData = this.state.data;
                                            if (newData.comment_priase == null) {
                                                newData.comment_priase = 1;
                                                newData.praise_num += 1;
                                            } else {
                                                newData.comment_priase = null;
                                                newData.praise_num -= 1;
                                            }
                                            this.setState({
                                                data: newData
                                            })
                                        } else {
                                            alert("网络异常！请检查网络！");
                                        }
                                    }}><Image source={require('../source/dianzanblack.png')}
                                                              style={styles.commentImg}/></TouchableOpacity>
                                )}
                                <Text style={styles.commentText2}>{this.state.data.praise_num}</Text>
                            </View>
                        </View>
                        <Text style={styles.commentText1}>{this.state.data.content}</Text>
                        <Text style={styles.commentText3}>{this.state.data.created_at}</Text>
                        <TouchableOpacity onPress={() => {
                            this.props.onClickReply(this.state.data);
                        }}><Text style={gTextStyles.huifuText}>回复Ta</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={styles.commentLine}></View>
            </TouchableOpacity>
        </View>);
    };
}

const {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
    newsImg: {
        margin: 2,
        borderRadius: 5,
        width: gScreen.screen_width - 4,
    },
    img1: {
        height: 40,
        width: 40,
        margin: 5,
        borderRadius: 20,
    },
    commentContainer: {
        padding: 5,
        flexDirection: "row",
    },
    commentContainer1: {
        marginLeft: 5,
        marginRight: width - 70,
        justifyContent: 'center',
    },
    commentContainer2: {
        width: width - 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    commentText: {
        color: '#1A1A1A'
    },
    commentImg: {
        width: 30,
    },
    commentText: {
        color: '#1A1A1A'
    },
    commentText1: {
        margin: 5,
        flex: width - 150,
        color: '#333333'
    },
    commentText3: {
        color: "#C0C0C0",
    },
});