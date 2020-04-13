import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Dimensions,
    TextInput,
    FlatList,
    Keyboard
} from "react-native";
import MyNavigationBar from '../component/MyNavigationBar'
import MyStatusBar from "../component/MyStatusBar";
import {gViewStyles} from "../style/ViewStyles";
import {gImageStyles} from "../style/ImageStyles";
import {gTextStyles} from "../style/TextStyles";
import httpApi from "../tools/Api";
import LoadingView from "../component/LoadingView";

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            load: false,
            keyboardHeight: 0,
        };

        this.keyboardWillShowListener = null;
        this.keyboardWillHideListener = null;
    }

    componentDidMount() {
        this.fetchChatData();
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

    onEndEditing = async (text) => {
        let params = '';
        params+=("to_user_id=" + this.props.route.params.userId + '&');
        params+=('content=' + text + '&');
        params+=('content_type=' + 1 + '&');

        let res = await httpApi.httpPostWithParamsStr('http://dd.shenruxiang.com/api/v1/user_send_message', params);
        if (res.status == 0) {
            this.fetchChatData();
            this.refs.textInput.clear();
        } else {
            alert("网络异常！请检查网络！");
        }
    }

    fetchChatData = async () => {
        let params = '';
        params+=("to_user_id=" + this.props.route.params.userId + '&');

        let res = await httpApi.httpPostWithParamsStr('http://dd.shenruxiang.com/api/v1/user_message_history_list', params);
        if (res.status == 0) {
            this.setState({
                data: res.data,
                load: true,
            });
        } else {
            alert("网络异常！请检查网络！");
        }
    }

    render() {
        if (!this.state.load) {
            return <LoadingView/>;
        }
        return(

            <View style={gViewStyles.rootViewContainer}>
                <MyStatusBar></MyStatusBar>
                <SafeAreaView style={gViewStyles.grayRootViewContainer1}>
                    <MyNavigationBar
                        title={'私信'}
                        onClickBack={()=>{this.props.navigation.goBack();}}
                    ></MyNavigationBar>
                    <View style={styles.chat}>
                        <FlatList
                            ref = "flatList"
                            onContentSizeChange={()=> this.refs.flatList.scrollToEnd()}
                            data={this.state.data}
                            renderItem={this.chatItemView}
                            style={styles.chatList}
                        ></FlatList>
                    </View>
                    <View style={[styles.input, {marginBottom: this.state.keyboardHeight}]}>
                        <TextInput underlineColorAndroid="transparent" placeholder="这里输入消息"
                                   ref='textInput'
                                   style={styles.searchTextInput}
                                   onSubmitEditing={(event)=>this.onEndEditing(event.nativeEvent.text)}>
                        </TextInput>
                        {/*<View style={styles.input2}>*/}
                        {/*<TouchableOpacity onPress={()=>{alert(1)}}>*/}
                        {/*<Image source={require('../source/attention1.jpg')} style={styles.inputIcon}/>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<TouchableOpacity onPress={()=>{alert(1)}}>*/}
                        {/*<Image source={require('../source/attention1.jpg')} style={styles.inputIcon}/>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<TouchableOpacity onPress={()=>{alert(1)}}>*/}
                        {/*<Image source={require('../source/attention1.jpg')} style={styles.inputIcon}/>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<TouchableOpacity onPress={()=>{alert(1)}}>*/}
                        {/*<Image source={require('../source/attention1.jpg')} style={styles.inputIcon}/>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<TouchableOpacity onPress={()=>{alert(1)}}>*/}
                        {/*<Image source={require('../source/attention1.jpg')} style={styles.inputIcon}/>*/}
                        {/*</TouchableOpacity>*/}
                        {/*</View>*/}
                    </View>
                </SafeAreaView>
            </View>
        );
    };

    chatItemView = ({item}) => {
        if (item.user_id == 2) {
            return(this.rightChatItemView({item}));
        } else {
            return(this.leftChatItemView({item}));
        }
    }

    leftChatItemView = ({ item }) => {
        return(
            <View style={styles.chatItemView1}>
                <TouchableOpacity>
                    <Image source={{uri: item.user.avatar}} style={styles.avatar}/>
                </TouchableOpacity>
                <View style={styles.leftMes}>
                    <Text style={styles.mes1}>{item.content}</Text>
                </View>

            </View>
        );
    }

    rightChatItemView = ({ item }) =>  {
        return(<View style={styles.chatItemView2}>
            <View style={styles.rightMes}>
                <Text style={styles.mes2}>{item.content}</Text>
            </View>
            <TouchableOpacity>
                <Image source={{uri: item.user.avatar}} style={styles.avatar}/>
            </TouchableOpacity>
        </View>);
    }
}

const {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chat: {
        flex: height - 70
    },
    input: {
        flex: 70,
    },
    searchTextInput: {
        padding: 5,
        height: 35,
        margin: 10,
        backgroundColor: '#fff',

        borderRadius: 4,
    },
    input2: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    inputIcon: {
        height: 30,
        width: 30,
    },
    chatList: {
        margin: 5,
    },
    chatItemView1: {
        flexDirection: 'row',
    },
    chatItemView2: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    avatar: {
        height: 50,
        width: 50,
        margin: 5,
        borderRadius: 25,
    },
    leftMes: {
        marginTop: 10,
        width: width - 200,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    rightMes: {
        marginTop: 10,
        width: width - 200,
        backgroundColor: '#FB5442',
        borderRadius: 10,
    },
    mes1: {
        padding: 10,
        fontSize: 14,
        color: '#333333',
    },
    mes2: {
        padding: 10,
        color: 'white',
        fontSize: 14,
    }
});