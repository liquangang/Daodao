import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";

export default class Login extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Image source={require('../source/iconImg.jpg')} style={styles.iconImg}/>
                <View style={styles.loginBtnContainer}>
                    <TouchableOpacity onPress={()=>{alert(1)}}>
                        <Image source={require('../source/qqLogin.jpg')} style={styles.LoginIcon}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.loginBtnContainer}>
                    <TouchableOpacity onPress={()=>{alert(1)}}>
                        <Image source={require('../source/wechatLogin.jpg')} style={styles.LoginIcon}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingBottom: 60,
    },
    iconImg: {
        flex: 5,
    },
    LoginIcon: {
        width: 300,
        height: 44,
    },
    loginBtnContainer: {
        flex: 0.8,
        justifyContent: 'center',
    }

});