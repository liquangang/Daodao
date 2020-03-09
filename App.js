import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

function HomePage() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>HomePage!</Text>
        </View>
    );
}

function HotSpot() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>HotSpot!</Text>
        </View>
    );
}

function Publish() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Publish!</Text>
        </View>
    );
}

function Convenience() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Convenience!</Text>
        </View>
    );
}

function My() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>My!</Text>
        </View>
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

                        if (route.name === '首页') {
                            iconName = 'md-home';
                        } else if (route.name === '热点') {
                            iconName = 'md-rocket';
                        } else if (route.name == '发布') {
                            iconName = 'md-create';
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
                <Tab.Screen name="首页" component={HomePage} />
                <Tab.Screen name="热点" component={HotSpot} />
                <Tab.Screen name="发布" component={Publish} />
                <Tab.Screen name="便民" component={Convenience} />
                <Tab.Screen name="我的" component={My} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}