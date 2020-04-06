import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ImageBackground } from "react-native";
import Swiper from 'react-native-swiper';

export default class BannerView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }

    onClickImg = (data) => {
        this.props.onClickAd(data);
    }

    render() {
        return(
            <View style={styles.container}>
                <Swiper
                    style={styles.swiper}
                    horizontal={true}
                    paginationStyle={{bottom: 12}}
                    showsButtons={false}
                    autoplayTimeout={2}
                >

                    {
                        Array.isArray(this.state.data) ? (
                            Array.from(this.state.data).map((value, index, array)=>{
                                return(
                                    <TouchableOpacity onPress={()=>this.onClickImg(value)} key={index}>
                                        {/*<Image source={{uri: value.src}} style={styles.img}/>*/}
                                        <Image source={require('../source/广告1.png')} style={styles.img}/>
                                    </TouchableOpacity>
                                );
                            })
                        ) : (
                            <TouchableOpacity onPress={()=>this.onClickImg(this.state.data)}>
                                {/*<Image source={{uri: this.state.data.src}} style={styles.img}/>*/}
                                <Image source={require('../source/广告1.png')} style={styles.img}/>
                            </TouchableOpacity>
                        )
                    }

                </Swiper>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
    },
    swiper: {
        height: 144,
    },
    img: {
        width: gScreen.screen_width - 24,
        height: 120,
        borderRadius: 5,
        margin: 12,
        marginBottom: 12,
    },
    bottomSegmentation: {
        height: 10,
        backgroundColor: gColor.grayLineColor
    },
});
