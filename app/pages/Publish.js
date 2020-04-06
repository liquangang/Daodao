import React, {Component} from "react";
import {Text, View, StyleSheet, TextInput, Image, Dimensions, ScrollView} from "react-native";

export default class Publish extends Component {
    render() {
        return (
            <ScrollView style={styles.scorllviewContainer}>
                <TextInput
                    placeholder={'输入你想说的话。。。'}
                    placeholderTextColor={gColor.grayTextColor}
                    underlineColorAndroid={'transparent'}
                    style={styles.textInput}
                    multiline={true}
                />

                {/*选择照片按钮*/}
                <Image source={require('../source/camera.jpg')} style={styles.selectImg}/>

                <View style={styles.line1}></View>

                {/*选择分类*/}
                <View style={styles.subContainer}>
                    <Image source={require('../source/分类.png')} style={styles.itemIcon}/>
                    <Text style={styles.itemText}>选择分类</Text>
                    <Text style={styles.itemText1}>默认发布到最新板块</Text>
                    <Image source={require('../source/右箭头.png')} style={styles.itemArrow}/>
                </View>

                <View style={styles.line1}></View>

                {/*选择定位*/}
                <View style={styles.subContainer}>
                    <Image source={require('../source/定位.png')} style={styles.itemIcon}/>
                    <Text style={styles.itemText}>选择定位</Text>
                    <Text style={styles.itemText1}>确认定位已开启</Text>
                    <Image source={require('../source/右箭头.png')} style={styles.itemArrow}/>
                </View>

                <View style={styles.line1}></View>

                {/*确认发布*/}
                <View style={styles.subContainer1}>
                    <Text style={styles.text7}>确认发布</Text>
                </View>
            </ScrollView>

        );
    };
}

const {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
    scorllviewContainer: {
        backgroundColor: 'white',
    },
    textInput: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        height: 300,
        fontSize: 17,
        paddingLeft: 5,
        borderColor: gColor.grayTextColor,
        borderWidth: 1,
        backgroundColor: gColor.grayLineColor
    },
    selectImg: {
        margin: 10,
        height: 100,
        width: 100,
    },
    line1: {
        marginLeft: 10,
        marginRight: 10,
        height: 1,
        backgroundColor: gColor.grayLineColor
    },
    subContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemIcon: {
        flex: 50,
        height: 18,
        width: 18,
        marginLeft: 10,
    },
    itemText: {
        flex: 200,
        marginLeft: 10,
    },
    itemText1: {
        flex: 200,
        marginLeft: 20,
        color: gColor.grayTextColor
    },
    subContainer1: {
        marginTop: 30,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    confirmPublish: {
        width: 300,
        height: 40,
    },
    text7: {
        color: 'white',
        fontSize: 18,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 50,
        paddingRight: 50,
        backgroundColor: gColor.orangeTextColor,
    }
});