import * as React from 'react';
import { View, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity, Text, ScrollView, StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Global from './app/util/Global';
import TextStyles from './app/style/TextStyles';
import ViewStyles from './app/style/ViewStyles';
import ImageStyles, {gImageStyles} from './app/style/ImageStyles'
import HomePage from "./app/pages/HomePage";
import HotSpot from "./app/pages/HotSpot";
import Publish from "./app/pages/Publish";
import Convenience from "./app/pages/Convenience";
import My from "./app/pages/My";
import PersonInfo from "./app/pages/PersonInfo";
import Login from "./app/pages/Login"
import Message from "./app/pages/Message"
import Chat from "./app/pages/Chat"
import NewsDetail from "./app/pages/NewsDetail"
import WebPage from "./app/pages/WebPage";
import Search from "./app/pages/Search";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Splash from "./app/pages/Splash";
import Type from "./app/pages/Type";

const mainTab = createBottomTabNavigator();

function MainTab() {
    return(
        <mainTab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    // 配置tabbaricon
                    if (route.name === '首页') {
                        return <Image source={require('./app/source/tap1.png')} style={gImageStyles.tabbarItem}/>
                    } else if (route.name === '热点') {
                        return <Image source={require('./app/source/tap2.png')} style={gImageStyles.tabbarItem}/>
                    } else if (route.name == '发布') {
                        return <Image source={require('./app/source/tap3.png')} style={gImageStyles.middelTabbarItem}/>
                    } else if (route.name == '便民') {
                        return <Image source={require('./app/source/tap4.png')} style={gImageStyles.tabbarItem}/>
                    } else if (route.name == '我的') {
                        return <Image source={require('./app/source/tap5.png')} style={gImageStyles.tabbarItem}/>
                    }
                },
            })}

            tabBarOptions={{
                activeTintColor: '#FB5442',
                inactiveTintColor: '#D3D3D3',
            }}
        >
            <mainTab.Screen name="首页" component={HomePage} />
            <mainTab.Screen name="热点" component={HotSpot} />
            <mainTab.Screen name="发布" component={Publish} />
            <mainTab.Screen name="便民" component={Convenience} />
            <mainTab.Screen name="我的" component={My} />
        </mainTab.Navigator>
    );
}

const mainNav = createStackNavigator();

function MainNav() {
    return(
        <mainNav.Navigator
            headerMode={'none'}>
            <mainNav.Screen name='Login' component={Login}/>
            {/*tabbar部分*/}
            <mainNav.Screen name='MyTab' component={MainTab}/>
            {/*其他可跳转页面*/}
            <mainNav.Screen name='PersonInfo' component={PersonInfo}/>
            <mainNav.Screen name='Message' component={Message}/>
            <mainNav.Screen name='Chat' component={Chat}/>
            <mainNav.Screen name='NewsDetail' component={NewsDetail}/>
            <mainNav.Screen name='WebPage' component={WebPage}/>
            <mainNav.Screen name='Search' component={Search}/>
            <mainNav.Screen name='Type' component={Type}/>
        </mainNav.Navigator>
    );
}


export default function App() {
    const rootNav = createStackNavigator();
    return (
        <NavigationContainer>
            <rootNav.Navigator
                headerMode={'none'}
            >
                {/*启动广告*/}
                <rootNav.Screen name='Splash' component={Splash}/>
                <rootNav.Screen name="MainNav" component={MainNav}/>
            </rootNav.Navigator>
        </NavigationContainer>
    );
}