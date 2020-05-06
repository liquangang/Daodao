import React, { Component } from "react";
import {View, SafeAreaView, TextInput, StyleSheet, Text, TouchableOpacity, } from "react-native";
import MyStatusBar from '../component/MyStatusBar'
import MyNavigationBar from '../component/MyNavigationBar'
import httpApi from "../tools/Api";
import {WToast} from 'react-native-smart-tip'

export default class Feedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feedbackContent: ''
        };
    }

    onEndEditing = (text) => {
        this.setState({
            feedbackContent: text
        });
    }

    render() {
        return (
            <View>
                <MyStatusBar></MyStatusBar>
                <SafeAreaView>
                    <MyNavigationBar
                        title={'实名认证'}
                        onClickBack={()=>{this.props.navigation.goBack();}}
                    ></MyNavigationBar>
                </SafeAreaView>
                <View style={styles.container1}>
                    <Text>反馈：</Text>
                    <TextInput underlineColorAndroid="transparent" placeholder="请输入反馈内容！" placeholderTextColor={'#999999'}
                               style={styles.textInput2}
                               onSubmitEditing={(event)=>this.onEndEditing(event.nativeEvent.text)}>
                    </TextInput>
                </View>
                <View style={styles.subContainer1}>
                    <TouchableOpacity onPress={async ()=>{
                        if (this.state.feedbackContent.length > 0) {
                            let params = ('content=' + this.state.feedbackContent + '&');
                            let res = await httpApi.httpPostWithParamsStr('http://dd.shenruxiang.com/api/v1/user_suggest', params);
                            if (res.status == 0) {
                                WToast.show({data: res.msg});
                                this.props.navigation.goBack();
                            } else {
                                alert("网络异常！请检查网络！");
                            }
                        } else {
                            WToast.show({data: '反馈内容格式错误！'});
                        }

                    }}>
                        <View style={styles.backView}>
                            <Text style={styles.text7}>提交</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container1: {
        margin: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput1: {
        padding: 10,
        height: 40,
        color: '#333333',
        borderColor: '#D8D8D8',
        borderWidth: 1,
        borderRadius: 20,
        width: gScreen.screen_width - 60,
    },
    textInput2: {
        padding: 10,
        height: 40,
        color: '#333333',
        borderColor: '#D8D8D8',
        borderWidth: 1,
        borderRadius: 20,
        width: gScreen.screen_width - 60,
    },
    subContainer1: {
        marginTop: 30,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: gScreen.screen_width,
        marginBottom: 40,
    },
    backView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 40,
        borderRadius: 5,
        backgroundColor: gColor.orangeBackColor,
    },
    text7: {
        color: 'white',
        fontSize: 14,
    }
});