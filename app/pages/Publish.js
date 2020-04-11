import React, {Component} from "react";
import {Text, View, StyleSheet, TextInput, Image, Dimensions, ScrollView, TouchableOpacity, FlatList, Alert, DeviceEventEmitter, ActivityIndicator} from "react-native";
import ImagePicker from 'react-native-image-picker';
import MyNavigationBar from '../component/MyNavigationBar'
import MyStatusBar from "../component/MyStatusBar";
import {gViewStyles} from "../style/ViewStyles";
import httpApi from "../tools/Api";


export default class Publish extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageArr: [], // 动态图片
            post_content: null, // 动态内容
            post_cate_id: null, // 分类id
            phone_model: null, // 手机型号
            post_position: null, // 地点
            post_type: 1, // 帖子类型 1图片 2视频
            typeData: null, // 分类数据
            load: false
        };
        this.emitter = null;
    }

    componentDidMount(){
        this.emitter = DeviceEventEmitter.addListener('updateType', (type)=>{this.setState({
            post_cate_id: type.id, // 分类id
            typeData: type, // 分类数据
        })});
    };

    //在组件销毁的时候要将其移除
    componentWillUnmount(){
        this.emitter.remove();
    };

    // 发布帖子
    onPublish = async () => {

        this.setState({
            load: true
        });

        let imageArrStr = '';
        for (let i = 0; i < this.state.imageArr.length; i++) {
            let subImgStr = 'image' + i + '=' + this.state.imageArr[i].uri + '&';
            imageArrStr+=subImgStr;
        }

        let params = '';
        params+=imageArrStr;
        params+=("post_content=" + this.state.post_content + '&');
        params+=('post_cate_id=' + this.state.post_cate_id + '&');
        params+=('phone_model=' + this.state.phone_model + '&');
        params+=('post_position=' + this.state.post_position + '&');
        params+=('post_type=' + this.state.post_type + '&');

        let res = await httpApi.httpPostWithParamsStr("http://dd.shenruxiang.com/api/v1/post_send", params);
        if (res.status == 0) {
            this.setState({
                load: false
            });
            alert("发布成功！")
        } else {
            alert("网络异常！请检查网络！");
        }

    }

    // 删除照片
    deleteImg = (index) => {

        Alert.alert(
            '提示', //提示标题
            '是否删除该照片', //提示内容
            [
                { text: '取消', onPress: () => console.log('点击取消') },
                {
                    text: '确定', onPress:  () =>  {
                        let newImgArr = this.state.imageArr;
                        newImgArr.splice(index, 1);
                        this.setState({
                            imageArr: newImgArr,
                        });
                    }
                }
            ] //按钮集合
        )

    }

    // open album
    onSelectImg = () => {

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

        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
            } else if (response.error) {
            } else {
                const source = {uri: 'data:image/jpeg;base64,'+ response.data};
                let newImgArr = this.state.imageArr;
                newImgArr.push(source);
                this.setState({
                    imageArr: newImgArr,
                });
            }
        });
    }

    // open type page
    onClickType = () => {
        this.props.navigation.navigate('Type');
    }

    render() {
        return (
            <View style={gViewStyles.rootViewContainer}>
                <MyStatusBar/>
                <MyNavigationBar
                    title={'动态发布'}
                    hiddenBack={true}
                ></MyNavigationBar>
                <ScrollView style={styles.scorllviewContainer}>
                    <TextInput
                        placeholder={'输入你想说的话。。。'}
                        placeholderTextColor={gColor.grayTextColor}
                        underlineColorAndroid={'transparent'}
                        style={styles.textInput}
                        multiline={true}
                        onChangeText={(text) => this.setState({post_content:text})}
                    />

                    <FlatList
                        extraData={this.state}
                        ListHeaderComponent={this.selectImgView}
                        data={this.state.imageArr}
                        renderItem={({item, index})=>(<TouchableOpacity onPress={()=>this.deleteImg(index)}>
                            <Image source={item} style={styles.selectImg} />
                        </TouchableOpacity>)}
                        horizontal={true}
                    >
                    </FlatList>


                    <View style={styles.line1}></View>

                    {/*选择分类*/}
                    <TouchableOpacity onPress={()=>this.onClickType()}>
                        <View style={styles.subContainer}>
                            <Image source={require('../source/分类.png')} style={styles.itemIcon}/>
                            <Text style={styles.itemText}>选择分类</Text>
                            {this.state.typeData != null ? (<Text style={styles.itemText1}>{this.state.typeData.name}</Text>) : (<Text style={styles.itemText1}>默认发布到最新板块</Text>)}
                            <Image source={require('../source/右箭头.png')} style={styles.itemArrow}/>
                        </View>
                    </TouchableOpacity>


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
                        <TouchableOpacity onPress={()=>this.onPublish()}>
                            <View style={styles.backView}>
                                <Text style={styles.text7}>确认发布</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {this.state.load == true ? (<ActivityIndicator size="large" color='#FB5442' style={gViewStyles.loading}/>
                ) : (<View></View>)}
            </View>
        );
    };

    selectImgView = ({}) => {
        return(
            <TouchableOpacity onPress={() => this.onSelectImg()}>
                <Image source={require('../source/camera.jpg')} style={styles.selectImg}/>
            </TouchableOpacity>
        );
    }

}

const {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
    scorllviewContainer: {
        backgroundColor: 'white',
        flex: 1,
    },
    textInput: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        height: 300,
        fontSize: 14,
        paddingLeft: 5,
        borderColor: gColor.grayTextColor,
        borderWidth: 1,
        backgroundColor: gColor.grayLineColor
    },
    selectImg: {
        margin: 10,
        height: 70,
        width: 70,
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
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: gScreen.screen_width,
        marginBottom: 40,
    },
    confirmPublish: {
        width: 300,
        height: 40,
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