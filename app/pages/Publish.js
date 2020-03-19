import React, { Component } from "react";
import {Text, View, StyleSheet, TextInput, Image, Dimensions} from "react-native";

export default class Publish extends Component {
    render() {
        return(
            <View style={styles.container}>
                <TextInput
                    placeholder = {'输入你想说的话。。。'}
                    placeholderTextColor = {'#BBBBBB'}
                    underlineColorAndroid = {'transparent'}
                    style = {styles.textInput}
                    multiline={true}
                />

                {/*选择照片按钮*/}
                <Image source={require('../source/selectImg.jpg')} style={styles.selectImg}/>

                <View style={styles.line1}></View>

                {/*选择分类*/}
                <View style={styles.subContainer}>
                    <Image source={require('../source/location.jpg')} style={styles.itemIcon}/>
                    <Text style={styles.itemText}>选择分类</Text>
                    <Text style={styles.itemText1}>默认发布到最新板块</Text>
                    <Image source={require('../source/rightArrow.jpg')} style={styles.itemArrow}/>
                </View>

                <View style={styles.line1}></View>

                {/*选择定位*/}
                <View style={styles.subContainer}>
                    <Image source={require('../source/location.jpg')} style={styles.itemIcon}/>
                    <Text style={styles.itemText}>选择定位</Text>
                    <Text style={styles.itemText1}>确认定位已开启</Text>
                    <Image source={require('../source/rightArrow.jpg')} style={styles.itemArrow}/>
                </View>

                <View style={styles.line1}></View>

                {/*确认发布*/}
                <View style={styles.subContainer1}>
                    <Image source={require('../source/confimPublish.jpg')} style={styles.confirmPublish}/>
                </View>

            </View>
        );
    };
}

const {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {

    },
    textInput: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        height: 300,
        fontSize: 17,
        borderWidth: 1,
        paddingLeft: 5,
        borderColor: 'gray',
    },
    selectImg: {
        marginTop: 10,
        marginLeft: 10,
        height: 100,
        width: 100,
    },
    line1: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        height: 1,
        backgroundColor: '#C0C0C0'
    },
    subContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemIcon: {
        flex: 50,
        height: 40,
        width: 20,
        marginLeft: 10,
    },
    itemText: {
        flex: 200,
        marginLeft: 10,
    },
    itemText1: {
        flex: 200,
        marginLeft: 20,
        color: '#C0C0C0'
    },
    subContainer1: {
        marginTop: 30,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    confirmPublish: {
        width: 300,
        height: 40
    }
});