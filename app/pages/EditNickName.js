import React, { Component } from "react";
import {View, SafeAreaView, TextInput, StyleSheet, Text, TouchableOpacity, } from "react-native";
import MyStatusBar from '../component/MyStatusBar'
import MyNavigationBar from '../component/MyNavigationBar'

export default class EditNickName extends Component {

    render() {
        return (
            <View>
                <MyStatusBar></MyStatusBar>
                <SafeAreaView>
                    <MyNavigationBar
                        title={'修改昵称'}
                        onClickBack={()=>{this.props.navigation.goBack();}}
                    ></MyNavigationBar>
                </SafeAreaView>
                <View style={styles.container1}>
                    <Text>新昵称：</Text>
                    <TextInput underlineColorAndroid="transparent" placeholder="请输入新昵称！" placeholderTextColor={'#999999'}
                               style={styles.textInput1}
                               onSubmitEditing={(event)=>this.onEndEditing(event.nativeEvent.text)}>
                    </TextInput>
                </View>
                <View style={styles.subContainer1}>
                    <TouchableOpacity onPress={()=>this.onPublish()}>
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
        width: gScreen.screen_width - 80,
    },
    textInput2: {
        padding: 10,
        height: 40,
        color: '#333333',
        borderColor: '#D8D8D8',
        borderWidth: 1,
        borderRadius: 20,
        width: gScreen.screen_width - 90,
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