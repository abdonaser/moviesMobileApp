import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, Image, Text, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../app/Helpers/firebaseConfig";
import InputField from "../components/InputField";
import DefaultButton from "../components/DefaultButton";
import Routes from "../Utils/MyRoutes";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
const SignUp = () => {
    const { colors } = useTheme();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigation = useNavigation();

    const [loading, setLoading] = useState(false); // Loading state

    const handleSignUp = () => {
        // Input validation
        if (!email || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (confirmPassword !== password) {
            setPassword("");
            setConfirmPassword("");
            alert("Passwords don't match.");
            return;
        }

        setLoading(true); // Start loading

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("userCredential in signup", userCredential);
                const user = userCredential.user;
                console.log("user", user.email);
                resetData(); // Reset data after successful sign-up
                navigation.navigate(Routes.SignIn);
            })
            .catch((error) => {
                // Provide user-friendly error messages
                const errorMessage = error.message;
                const existError = errorMessage?.split("/")[1].split(")")[0].split("-").join(" ");
                if (existError == "email already in use") {
                    alert("email already Exist .. we will navigate to  sign in  ");
                    setTimeout(() => {
                        navigation.navigate(Routes.SignIn);
                    }, 2000)
                } else {
                    alert(errorMessage);
                }
                console.log("Error during signup", error);
            })
            .finally(() => {
                setLoading(false); // Stop loading after process
            });
    };

    const resetData = () => {
        setEmail("");
        setConfirmPassword("");
        setName("");
        setPassword("");
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
            <KeyboardAwareScrollView
                style={{ width: "100%" }}
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginVertical: 40,
                    }}
                >
                    <Image
                        source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/295/295128.png",
                        }}
                        style={styles.image}
                    />
                </View>

                <InputField
                    onChange={(value) => setName(value)}
                    value={name}
                    placeholder="Name"
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

                <InputField
                    onChange={(value) => setConfirmPassword(value)}
                    value={confirmPassword}
                    placeholder="confirm Password"
                    isPassword={true}
                />

                <DefaultButton onPress={() => handleSignUp()} buttonTitle="Signup" />

                <Text style={{ alignSelf: "center", color: colors.text }}>
                    Already have an account?
                    <Text
                        onPress={() => {
                            navigation.navigate(Routes.SignIn);
                        }}
                        style={[styles.signInText, { color: colors.text }]}
                    >
                        {"  "}
                        Sign In
                    </Text>
                </Text>
            </KeyboardAwareScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    ActivityIndicatorContainer: {
        flex: 1, // Takes the full height of the parent
        justifyContent: 'center', // Centers vertically
        alignItems: 'center', // Centers horizontally
    },
    container: {
        flex: 1,
        backgroundColor: "#f7f7f7",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    image: {
        height: 100,
        width: 100,
        resizeMode: "cover",
        marginBottom: 20,
    },
    signInText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default SignUp;
