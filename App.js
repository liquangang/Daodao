import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomePage from "./app/pages/HomePage";
import HotSpot from "./app/pages/HotSpot";
import Publish from "./app/pages/Publish";
import Convenience from "./app/pages/Convenience";
import My from "./app/pages/My";

const HomePageStack = createStackNavigator();

function HomePageStackScreen() {
    return (
      <HomePageStack.Navigator headerMode='none'>
          <HomePageStack.Screen name='首页' component={HomePage}/>
      </HomePageStack.Navigator>
    );
}

const HotSpotStack = createStackNavigator();

function HotSpotStackScreen() {
    return (
      <HotSpotStack.Navigator>
          <HotSpotStack.Screen name='热点' component={HotSpot}/>
      </HotSpotStack.Navigator>
    );
}

const PublishStack = createStackNavigator();

function PublishStackScreen() {
    return(
      <PublishStack.Navigator>
          <PublishStack.Screen name='发布' component={Publish}/>
      </PublishStack.Navigator>
    );
}

const ConvenienceStack = createStackNavigator();

function ConvenienceStackScreen() {
    return(
        <ConvenienceStack.Navigator>
            <ConvenienceStack.Screen name='便民' component={Convenience}/>
        </ConvenienceStack.Navigator>
    );
}

const MyStack = createStackNavigator();

function MyStackScreen() {
    return(
        <MyStack.Navigator>
            <MyStack.Screen name='我的' component={My}/>
        </MyStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        // 配置tabbaricon
                        if (route.name === '首页') {
                            iconName = 'md-home';
                        } else if (route.name === '热点') {
                            iconName = 'md-rocket';
                        } else if (route.name == '发布') {
                            iconName = 'ios-create';
                        } else if (route.name == '便民') {
                            iconName = 'md-sunny';
                        } else if (route.name == '我的') {
                            iconName = 'md-person';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}

                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="首页" component={HomePageStackScreen} />
                <Tab.Screen name="热点" component={HotSpotStackScreen} />
                <Tab.Screen name="发布" component={PublishStackScreen} />
                <Tab.Screen name="便民" component={ConvenienceStackScreen} />
                <Tab.Screen name="我的" component={MyStackScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}