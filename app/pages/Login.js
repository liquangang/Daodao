import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import {gImageStyles} from "../style/ImageStyles";
import {gViewStyles} from "../style/ViewStyles";
import {gTextStyles} from "../style/TextStyles";

export default class Login extends Component {
    render() {
        return(
            <View style={gViewStyles.rootViewContainer}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('MyTab', null)}}>
                    <View style={gViewStyles.btnBack}>
                        <Image source={require('../source/关闭.png')} style={gImageStyles.closeImg}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.container}>
                    <Image source={require('../source/iconImg.jpg')} style={styles.iconImg}/>
                    <View style={styles.loginBtnContainer}>
                        <TouchableOpacity onPress={()=>{alert(1)}}>
                            <View style={gViewStyles.qqloginBack}>
                                <Image source={require('../source/qq-2.png')} style={gViewStyles.qqIcon}/>
                                <Text style={gTextStyles.loginText}>QQ登录</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.loginBtnContainer}>
                        <TouchableOpacity onPress={()=>{alert(1)}}>
                            <View style={gViewStyles.wechatLoginBack}>
                                <Image source={require('../source/weixin.png')} style={gViewStyles.wechatIcon}/>
                                <Text style={gTextStyles.loginText}>微信登录</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        paddingBottom: 60,
    },
    iconImg: {
    },
    LoginIcon: {
        width: 3,
        height: 44,
    },
    loginBtnContainer: {
        justifyContent: 'center',
    }

});