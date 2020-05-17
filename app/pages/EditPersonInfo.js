import React, { Component } from "react";
import {
    View,
    SafeAreaView,
    TextInput,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Keyboard, DeviceEventEmitter
} from "react-native";
import MyStatusBar from '../component/MyStatusBar'
import MyNavigationBar from '../component/MyNavigationBar'
import ImagePicker from 'react-native-image-picker';
import httpApi from "../tools/Api";
import LoadingView from "../component/LoadingView";
import {gViewStyles} from "../style/ViewStyles";
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

export default class EditPersonInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            load: false,
            personalData: null,
            avatar: '',
            nickName: '',
            gender: '',
            personalDes: '',
            province: '',
            city: '',
            birthday: '',
            job: '',
            keyboardHeight: 0,
        };

        this.keyboardWillShowListener = null;
        this.keyboardWillHideListener = null;
    }

    componentDidMount() {
        this.fetchPersonalData();
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow',this.keyboardDidShow);
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide',this.keyboardDidHide);
    }

    //注销监听
    componentWillUnmount () {
        this.keyboardWillShowListener && this.keyboardWillShowListener.remove();
        this.keyboardWillHideListener && this.keyboardWillHideListener.remove();
    }


    //键盘弹起后执行
    keyboardDidShow = (event) =>  {
        this.setState({
            keyboardHeight: event.endCoordinates.height,
        });
    }

    //键盘收起后执行
    keyboardDidHide = () => {
        this.setState({
            keyboardHeight: 0,
        });
    }

    // 请求个人数据
    fetchPersonalData = async () => {

        let params = {};
        let res = await httpApi.getPersonalData(params);

        if (res.status == 0) {
            this.setState({
                personalData: res.data,
                load: true
            });
        } else {
            alert("网络异常！请检查网络！");
        }
    }

    render() {
        if (!this.state.load) {
            return <LoadingView/>;
        }
        return (
            <View style={gViewStyles.rootViewContainer}>
                <MyStatusBar></MyStatusBar>
                <SafeAreaView style={gViewStyles.rootViewContainer}>
                    <MyNavigationBar
                        title={'个人信息修改'}
                        onClickBack={()=>{this.props.navigation.goBack();}}
                    ></MyNavigationBar>
                    <ScrollView>
                        <View style={styles.container1}>
                            <Text>头像：</Text>
                            <TouchableOpacity onPress={()=>{
                                ImagePicker.showImagePicker(options, (response) => {

                                    if (response.didCancel) {
                                    } else if (response.error) {
                                    } else {
                                        this.setState({
                                            avatar: {uri: 'data:image/jpeg;base64,'+ response.data},
                                        });
                                    }
                                });
                            }}>
                                {
                                    this.state.avatar == '' ?
                                        (<Image source={{uri: this.state.personalData.user_info.avatar}} style={styles.avatar}/>)
                                        : (<Image source={this.state.avatar} style={styles.avatar}/>)
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={styles.container1}>
                            <Text>新昵称：</Text>
                            <TextInput underlineColorAndroid="transparent" placeholder="请输入新昵称！" placeholderTextColor={'#999999'}
                                       style={styles.textInput1}
                                       onSubmitEditing={(event)=>{
                                           this.setState({
                                               nickName: event.nativeEvent.text,
                                           })
                                       }}
                                       onChange={(event)=>{
                                           this.setState({
                                               nickName: event.nativeEvent.text,
                                           })
                                       }}>
                            </TextInput>
                        </View>
                        <View style={styles.container1}>
                            <Text>性别（1男 2 女 3保密）：</Text>
                            <TextInput underlineColorAndroid="transparent" placeholder="请输入性别！" placeholderTextColor={'#999999'}
                                       style={styles.textInput3}
                                       onSubmitEditing={(event)=>{
                                           this.setState({
                                               gender: event.nativeEvent.text,
                                           })
                                       }}
                                       onChange={(event)=>{
                                           this.setState({
                                               gender: event.nativeEvent.text,
                                           })
                                       }}>
                            </TextInput>
                        </View>
                        <View style={styles.container1}>
                            <Text>个人简介：</Text>
                            <TextInput underlineColorAndroid="transparent" placeholder="请输入个人简介！" placeholderTextColor={'#999999'}
                                       style={[styles.textInput1, {width: gScreen.screen_width - 90}]}
                                       onSubmitEditing={(event)=>{
                                           this.setState({
                                               personalDes: event.nativeEvent.text,
                                           })
                                       }}
                                       onChange={(event)=>{
                                           this.setState({
                                               personalDes: event.nativeEvent.text,
                                           })
                                       }}>
                            </TextInput>
                        </View>
                        <View style={styles.container1}>
                            <Text>省份：</Text>
                            <TextInput underlineColorAndroid="transparent" placeholder="请输入省份！" placeholderTextColor={'#999999'}
                                       style={[styles.textInput1, {width: gScreen.screen_width - 65}]}
                                       onSubmitEditing={(event)=>{
                                           this.setState({
                                               province: event.nativeEvent.text,
                                           })
                                       }}
                                       onChange={(event)=>{
                                           this.setState({
                                               province: event.nativeEvent.text,
                                           })
                                       }}>
                            </TextInput>
                        </View>
                        <View style={styles.container1}>
                            <Text>城市：</Text>
                            <TextInput underlineColorAndroid="transparent" placeholder="请输入城市！" placeholderTextColor={'#999999'}
                                       style={[styles.textInput1, {width: gScreen.screen_width - 65}]}
                                       onSubmitEditing={(event)=>{
                                           this.setState({
                                               city: event.nativeEvent.text,
                                           })
                                       }}
                                       onChange={(event)=>{
                                           this.setState({
                                               city: event.nativeEvent.text,
                                           })
                                       }}>
                            </TextInput>
                        </View>
                        <View style={styles.container1}>
                            <Text>生日：</Text>
                            <TextInput underlineColorAndroid="transparent" placeholder="请输入生日！" placeholderTextColor={'#999999'}
                                       style={[styles.textInput1, {width: gScreen.screen_width - 65}]}
                                       onSubmitEditing={(event)=>{
                                           this.setState({
                                               birthday: event.nativeEvent.text,
                                           })
                                       }}
                                       onChange={(event)=>{
                                           this.setState({
                                               birthday: event.nativeEvent.text,
                                           })
                                       }}>
                            </TextInput>
                        </View>
                        <View style={styles.container1}>
                            <Text>职业：</Text>
                            <TextInput underlineColorAndroid="transparent" placeholder="请输入职业！" placeholderTextColor={'#999999'}
                                       style={[styles.textInput1, {width: gScreen.screen_width - 65}]}
                                       onSubmitEditing={(event)=>{
                                           this.setState({
                                               job: event.nativeEvent.text,
                                           })
                                       }}
                                       onChange={(event)=>{
                                           this.setState({
                                               job: event.nativeEvent.text,
                                           })
                                       }}>
                            </TextInput>
                        </View>
                        <View style={styles.subContainer1}>
                            <TouchableOpacity onPress={async ()=>{
                                let params = ('avatar=' + this.state.avatar.uri + '&');
                                params += ('nick_name=' + this.state.nickName + '&');
                                params += ('sex=' + this.state.gender + '&');
                                params += ('desc=' + this.state.personalDes + '&');
                                params += ('province=' + this.state.province + '&');
                                params += ('city=' + this.state.city + '&');
                                params += ('birthday=' + this.state.birthday + '&');
                                params += ('job=' + this.state.job + '&');
                                let res = await httpApi.httpPostWithParamsStr('http://dd.shenruxiang.com/api/v1/user_info', params);
                                if (res.status == 0) {
                                    WToast.show({data: res.msg});
                                    DeviceEventEmitter.emit('updatePersonInfo', null);
                                    this.props.navigation.goBack();
                                } else {
                                    alert("网络异常！请检查网络！");
                                }
                            }}>
                                <View style={styles.backView}>
                                    <Text style={styles.text7}>提交</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[{height: this.state.keyboardHeight}]}></View>
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
    },
    avatar: {
        height: 60,
        width: 60,
        margin: 16,
        borderRadius: 30,
    },
    textInput3: {
        padding: 10,
        height: 40,
        color: '#333333',
        borderColor: '#D8D8D8',
        borderWidth: 1,
        borderRadius: 20,
        width: gScreen.screen_width - 190,
    },
});