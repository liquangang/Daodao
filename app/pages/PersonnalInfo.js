import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";

export default class PersonnalInfo extends Component {
    render() {
        return(
            <ScrollView style={styles.container}>
                <Image source={require('../source/selectImg.jpg')} style={styles.selectImg}/>
            </ScrollView>
        );
    };
}

const styles = StyleSheet.create({
   container: {

   },
});