import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import notStyle from "../Styles/NotFound.js";
import { useNavigation, useTheme } from '@react-navigation/native';
import Routes from '../Utils/MyRoutes.js';
const NotFound = ({ isSearchEmpty }) => {
    const { colors } = useTheme();

    const { navigate } = useNavigation();
    return (
        <View style={[notStyle.container, { color: colors.text }]}>
            <Text
                style={[notStyle.text, { color: colors.text }]}>
                Your List Is Empty
            </Text>
            <TouchableOpacity
                style={[notStyle.btn, { cursor: 'pointer' }]}
                activeOpacity={0.5}
                onPress={() => {
                    navigate(Routes.home); // Navigate to the home route
                }}
            >
                <Text style={notStyle.TouchableText}>Home</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({})

export default NotFound;
