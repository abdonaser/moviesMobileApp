import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function InputField(props) {
    const { value, placeholder, isPassword, onChange } = props;
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            secureTextEntry={isPassword ?? false}
            autoCapitalize="none"
            autoCorrect={false}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 20,
        borderColor: "#ccc",
        borderWidth: 1,
    },
});
