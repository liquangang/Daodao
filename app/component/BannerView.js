import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import Swiper from 'react-native-swiper';

export default class BannerView extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Swiper
                    style={styles.swiper}
                    horizontal={true}
                    paginationStyle={{bottom: 10}}
                    showsButtons={false}
                    autoplayTimeout={2}
                >
                    <Image source={require('../source/banner.jpg')} style={styles.img}/>
                    <Image source={require('../source/banner1.jpg')} style={styles.img}/>
                    <Image source={require('../source/banner2.jpg')} style={styles.img}/>
                </Swiper>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        height: 200,
    },
    swiper: {
    },
    img: {
        height: 200
    }
});
