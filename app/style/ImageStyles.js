import {StyleSheet} from "react-native";

export const gImageStyles = StyleSheet.create({
    leftArrow: {
        height: 17,
        width: 10,
        marginLeft: 12,
    },
    tabbarItem: {
        height: 30,
        width: 30,
    },
    middelTabbarItem: {
        marginTop: 10,
        height: 35,
        width: 35,
    },
    avatar: {
        height: 25,
        width: 25,
        margin: 5,
    },
    splashImgBack: {
        position:'absolute',
        left:0,
        top:0,
        width:gScreen.screen_width,
    },
    splashImg: {
        margin: 0,
    },
    closeImg: {
        height: 18,
        width: 18,
        marginLeft: 13,
    },
    bannerImg: {
        width: gScreen.screen_width,
        padding: 12,
    },
});