import React, { Component } from "react";
import { Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity } from "react-native";
import {gImageStyles} from "../style/ImageStyles";
import {gViewStyles} from "../style/ViewStyles";
import {gTextStyles} from "../style/TextStyles";

export default class Login extends Component {
    render() {
        return(
            <SafeAreaView style={gViewStyles.rootViewContainer}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('MyTab', null)}}>
                    <View style={gViewStyles.btnBack}>
                        <Image source={require('../source/guanbi.png')} style={gImageStyles.closeImg}/>
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
                    <View style={[styles.loginBtnContainer, {marginBottom: 50}]}>
                        <TouchableOpacity onPress={()=>{alert(1)}}>
                            <View style={gViewStyles.wechatLoginBack}>
                                <Image source={require('../source/weixin.png')} style={gViewStyles.wechatIcon}/>
                                <Text style={gTextStyles.loginText}>微信登录</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    iconImg: {
        flex: 2.5,
        width: gScreen.screen_width,
        resizeMode: 'center'
    },
    loginBtnContainer: {
        flex: 0.5,
        justifyContent: 'center',
    }

});