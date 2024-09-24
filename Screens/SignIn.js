import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";


import { signInWithEmailAndPassword } from "firebase/auth";

import InputField from "../components/InputField";
import DefaultButton from "../components/DefaultButton";
import Routes from "../Utils/MyRoutes";
import { auth } from "../app/Helpers/firebaseConfig";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function SignIn() {
    const navigation = useNavigation();
    const { colors } = useTheme();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // For loading state

    const handleSignIn = () => {
        if (!email || !password) {
            alert("Please enter both email and password");
            return;
        }

        setLoading(true); // Start loading

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // navigation.navigate(Routes.drawer, { userEmail: user.email, isGuest: false }); // Navigate to Home after successful login
                navigation.navigate(Routes.drawer, { userEmail: user.email, isGuest: false }); // Navigate to Home after successful login
                // console.log("Signed in user: ", user);
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert("Error in signing in: " + errorMessage);
                // console.log("Error in signin", error);
            })
            .finally(() => {
                setLoading(false); // Stop loading after process
            });
    };





    if (loading) {
        return <View style={[styles.ActivityIndicatorContainer, { backgroundColor: colors.background }]}>
            <ActivityIndicator
                animating={true}
                color={MD2Colors.red800}
                size="large"
            />
        </View>
    }
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Image
                source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/295/295128.png",
                }}
                style={styles.image}
            />
            <InputField
                onChange={(value) => setEmail(value)}
                value={email}
                placeholder="Email"
            />

            <InputField
                onChange={(value) => setPassword(value)}
                value={password}
                placeholder="Password"
                isPassword={true}
            />

            <DefaultButton onPress={() => handleSignIn()} buttonTitle={"SignIn"} />

            <Text style={{ color: colors.text }}>
                Don't have an account?
                <Text
                    onPress={() => {
                        navigation.navigate(Routes.SignUp);
                    }}
                    style={[styles.signUpText, { color: colors.text }]}
                >
                    {"  "}
                    Sign up
                </Text>
            </Text>


            <Text style={{ color: colors.text }}>
                <Text
                    onPress={() => {
                        // navigation.navigate(Routes.drawer, { isGuest: true });
                        navigation.navigate(Routes.drawer, { isGuest: true });
                    }}
                    style={[styles.signUpText, { color: colors.appName, margin: 20, textDecorationLine: "underline " }]}
                >
                    Continue as Guest
                </Text>
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    ActivityIndicatorContainer: {
        flex: 1, // Takes the full height of the parent
        justifyContent: 'center', // Centers vertically
        alignItems: 'center', // Centers horizontally
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
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
    image: {
        height: 100,
        width: 100,
        resizeMode: "cover",
        marginBottom: 20,
    },
    signUpText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
});
