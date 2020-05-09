import React, { Component } from "react";
import {View, SafeAreaView, TextInput, StyleSheet, Text, TouchableOpacity, Image, ScrollView, } from "react-native";
import MyStatusBar from '../component/MyStatusBar'
import MyNavigationBar from '../component/MyNavigationBar'
import {gViewStyles} from "../style/ViewStyles";
import ImagePicker from 'react-native-image-picker';
import httpApi from "../tools/Api";
import {WToast} from "react-native-smart-tip/index";

const options = {
    title: '请选择图片来源',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'相册图片',
    mediaType: 'photo',
    maxWidth: 700,
    maxHeight: 700,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class Verified extends Component {

    constructor(props) {
        super(props);
        this.state = {
            zhengImg: null,
            fanImg: null,
            realName: '',
        };
    }

    // open album
    onSelectFanImg = () => {

        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
            } else if (response.error) {
            } else {
                this.setState({
                    fanImg: {uri: 'data:image/jpeg;base64,'+ response.data},
                });
            }
        });
    }

    onSelectZhengImg = () => {

        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
            } else if (response.error) {
            } else {
                this.setState({
                    zhengImg: {uri: 'data:image/jpeg;base64,'+ response.data},
                });
            }
        });
    }

    render() {
        return (
            <View style={gViewStyles.rootViewContainer}>
                <MyStatusBar></MyStatusBar>
                <SafeAreaView style={gViewStyles.rootViewContainer}>
                    <MyNavigationBar
                        title={'实名认证'}
                        onClickBack={()=>{this.props.navigation.goBack();}}
                    ></MyNavigationBar>
                    <ScrollView style={gViewStyles.rootViewContainer}>
                        <View style={styles.container1}>
                            <Text>姓名：</Text>
                            <TextInput underlineColorAndroid="transparent" placeholder="请输入真实姓名！" placeholderTextColor={'#999999'}
                                       style={styles.textInput1}
                                       onSubmitEditing={(event)=>{
                                           this.setState({
                                               realName: event.nativeEvent.text,
                                           })
                                       }}
                                       onChange={(event)=>{
                                           this.setState({
                                               realName: event.nativeEvent.text,
                                           })
                                       }}
                            >
                            </TextInput>
                        </View>
                        <View style={styles.container1}>
                            <Text>身份证正面：</Text>
                            {this.state.zhengImg == null ? (<TouchableOpacity onPress={() => this.onSelectZhengImg()}>
                                <Image source={require('../source/camera.jpg')} style={styles.selectImg}/>
                            </TouchableOpacity>) : (<Image source={this.state.zhengImg} style={styles.selectedImg}/>)}

                        </View>
                        <View style={styles.container1}>
                            <Text>身份证反面：</Text>
                            {this.state.fanImg == null ? (<TouchableOpacity onPress={() => this.onSelectFanImg()}>
                                <Image source={require('../source/camera.jpg')} style={styles.selectImg}/>
                            </TouchableOpacity>) : (<Image source={this.state.fanImg} style={styles.selectedImg}/>)}

                        </View>
                        <View style={styles.subContainer1}>
                            <TouchableOpacity onPress={async ()=>{
                                if (this.state.realName.length > 0) {
                                    let params = ('truename=' + this.state.realName + '&');
                                    params+=('img_zheng=' + this.state.zhengImg + '&');
                                    params+=('img_fan=' + this.state.fanImg + '&');
                                    let res = await httpApi.httpPostWithParamsStr('http://dd.shenruxiang.com/api/v1/user_cert', params);
                                    if (res.status == 1) {
                                        WToast.show({data: res.msg});
                                        this.props.navigation.goBack();
                                    } else {
                                        alert("网络异常！请检查网络！");
                                    }
                                } else {
                                    alert('姓名格式错误！');
                                }
                            }}>
                                <View style={styles.backView}>
                                    <Text style={styles.text7}>提交</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                </SafeAreaView>
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
    },
    selectImg: {
        margin: 5,
        height: 80,
        width: 80,
    },
    selectedImg: {
        margin: 5,
        height: 180,
        width: 300,
    },
});