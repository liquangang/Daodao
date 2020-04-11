import React, { Component } from "react";
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, DeviceEventEmitter } from "react-native";
import MyStatusBar from '../component/MyStatusBar'
import MyNavigationBar from '../component/MyNavigationBar'
import {gViewStyles} from "../style/ViewStyles";
import httpApi from "../tools/Api";
import {gTextStyles} from "../style/TextStyles";

export default class Type extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [], // 动态分类数据
        };
    }

    componentDidMount() {
        this.fetchTypeData();
    }

    fetchTypeData = async () => {
        let res = await httpApi.httpPostWithParamsStr("http://dd.shenruxiang.com/api/v1/post_cate_list", null);
        if (res.status == 0) {
            this.setState({
                data: res.data,
            });
        } else {
            alert("网络异常！请检查网络！");
        }
    }

    onClickItem = (item) => {
        //调用事件通知  param是指传递的相应参数
        DeviceEventEmitter.emit('updateType', item);
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={gViewStyles.rootViewContainer}>
                <MyStatusBar></MyStatusBar>
                <SafeAreaView>
                    <MyNavigationBar
                        title={'动态分类'}
                        onClickBack={()=>{this.props.navigation.goBack();}}
                    ></MyNavigationBar>
                    <FlatList
                        extraData={this.state}
                        data={this.state.data}
                        renderItem={({item})=>(
                            <TouchableOpacity onPress={()=>this.onClickItem(item)}>
                                <View style={gViewStyles.itemView}>
                                    <View style={gViewStyles.line}></View>
                                    <Text style={gTextStyles.nickNameText}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                            )}
                        style={gViewStyles.flatList}
                    />
                </SafeAreaView>
            </View>

        );
    }
}