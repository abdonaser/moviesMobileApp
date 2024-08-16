import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import notStyle from "../Styles/NotFound.js";
import { useNavigation } from '@react-navigation/native';
import Routes from '../Utils/MyRoutes.js';
const NotFound = () => {
    const { navigate } = useNavigation();
    return (
        <View style={notStyle.container}>
            <Text
                style={notStyle.text}>
                Your List Is Empty
            </Text>
            <TouchableOpacity style={notStyle.btn} activeOpacity={.5} onPress={() => navigate(Routes.home)}>
                <Text style={notStyle.TouchableText} >click Me</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({})

export default NotFound;
