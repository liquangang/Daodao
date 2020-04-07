import {StyleSheet} from "react-native";

export const gViewStyles = StyleSheet.create({
    viewContainer1: {
        flex: 1,
        backgroundColor: 'white',
    },
    orangeStatusBar: {
        backgroundColor: gColor.orangeBackColor,
        height: gScreen.statusBarHeight,
        width: gScreen.screen_width
    },
    whiteStatusBar: {
        height: gScreen.statusBarHeight,
        width: gScreen.screen_width
    },
    navigationBar: {
        backgroundColor: gColor.orangeBackColor,
        height: 44,
        width: gScreen.screen_width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    navigationBarTitle: {
        marginRight: 44,
        width: gScreen.screen_width - 88,
        alignItems: "center",
        justifyContent: 'center'
    },
    viewContainer2: {
        backgroundColor: 'white'
    },
    rootViewContainer: {
        backgroundColor: 'white',
        flex: 1,
    },
    view3: {
        height: 44,
        backgroundColor: '#FB5442',
        width: gScreen.screen_width,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchView: {
        width: gScreen.screen_width - 88,
        height: 33,
        backgroundColor: "#fff",
        paddingLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
    },
    backView: {
        width: 44,
        height: 44,
        flexDirection: 'row',
        alignItems: 'center'
    }
});