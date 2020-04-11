import {StyleSheet} from "react-native";

export const gTextStyles = StyleSheet.create({
    navigationTitle: {
        color: 'white',
        fontSize: 15,
    },
    searchTextInput: {
        flex: 1,
        height: 33,
        color: '#333333'
    },
    scrollBarText: {
        fontSize: 14,
    },
    splashText: {
        position:'absolute',
        right: 24,
        top: gScreen.statusBarHeight + 4,
        fontSize: 15,
        color: "white",
    },
    loginText: {
        marginLeft: 70,
        fontSize: 16,
        color: 'white'
    }
});