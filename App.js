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

const Tab = createBottomTabNavigator();

function MyTab() {
    return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    // 配置tabbaricon
                    if (route.name === '首页') {
                        return <Image source={require('./app/source/组38.png')} style={gImageStyles.tabbarItem}/>
                    } else if (route.name === '热点') {
                        return <Image source={require('./app/source/组3.png')} style={gImageStyles.tabbarItem}/>
                    } else if (route.name == '发布') {
                        return <Image source={require('./app/source/组43.png')} style={gImageStyles.middelTabbarItem}/>
                    } else if (route.name == '便民') {
                        return <Image source={require('./app/source/组4.png')} style={gImageStyles.tabbarItem}/>
                    } else if (route.name == '我的') {
                        return <Image source={require('./app/source/组5.png')} style={gImageStyles.tabbarItem}/>
                    }
                },
            })}

            tabBarOptions={{
                activeTintColor: '#FB5442',
                inactiveTintColor: '#D3D3D3',
            }}
        >
            <Tab.Screen name="首页" component={HomePage} />
            <Tab.Screen name="热点" component={HotSpot} />
            <Tab.Screen name="发布" component={Publish} />
            <Tab.Screen name="便民" component={Convenience} />
            <Tab.Screen name="我的" component={My} />
        </Tab.Navigator>
    );
}

const Nav = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Nav.Navigator
                headerMode={'none'}
            >
                {/*启动广告*/}
                {/*tabbar部分*/}
                <Nav.Screen name='tab' component={MyTab}/>
                {/*其他可跳转页面*/}
                <Nav.Screen name='HomePage' component={HomePage}/>
                <Nav.Screen name='PersonInfo' component={PersonInfo}/>
                <Nav.Screen name='Login' component={Login}/>
                <Nav.Screen name='Message' component={Message}/>
                <Nav.Screen name='Chat' component={Chat}/>
                <Nav.Screen name='NewsDetail' component={NewsDetail}/>
                <Nav.Screen name='WebPage' component={WebPage}/>
                <Nav.Screen name='Search' component={Search}/>
            </Nav.Navigator>
        </NavigationContainer>
    );
}