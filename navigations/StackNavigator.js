import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetails from "../Screens/MovieDetails";
import Routes from "../Utils/MyRoutes";
import DrowNavigator from "./DrowNavigator";
import { useTheme } from "react-native-paper";
import SignIn from "../Screens/SignIn";
import SignUp from "../Screens/SignUp";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../app/Helpers/firebaseConfig";
import { signOut } from "firebase/auth";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
    const { colors } = useTheme();
    const navigation = useNavigation()


    // ' Sign Out----------------------------------------------------------
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigation.navigate(Routes.SignIn)
            })
            .catch((error) => {
                console.log(error)
            });
    };

    // '----------------------------------------------------------

    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: colors.text,
            }}
            initialRouteName={Routes.SignIn}
        >
            <Stack.Screen
                name={Routes.SignIn}
                component={SignIn}
                options={{
                    headerShown: true,
                    headerTitleStyle: {
                        color: colors.text,
                    },
                    headerStyle: {
                        backgroundColor: colors.background,
                    },
                }}

            />

            <Stack.Screen
                name={Routes.SignUp}
                component={SignUp}
                options={{ headerShown: false }}
            />


            {/* //'-----------------------Handel drawer navigator------------------------------------- */}
            {/* <Stack.Screen
                name={Routes.drawer}
                component={DrowNavigator}
                options={{ headerShown: false }}
                onSignOut={handleSignOut}
            /> */}

            {/* <Stack.Screen
                name={Routes.drawer}
                component={() => <DrowNavigator onSignOut={handleSignOut} />}  
                options={{ headerShown: false }}
            /> */}

            <Stack.Screen
                name={Routes.drawer}
                options={{ headerShown: false }}
            >
                {() => <DrowNavigator onSignOut={handleSignOut} />}
            </Stack.Screen>



            {/* //'------------------------------------------------------------ */}




            <Stack.Screen name={Routes.movieDetails} component={MovieDetails} options={{
                headerTitleStyle: {
                    color: colors.text
                },
                headerStyle: {
                    backgroundColor: colors.background,
                },
                drawerLabelStyle: {
                    color: colors.text,  // Set the drawer item text color to white
                },
                contentStyle: {
                    color: colors.text, // Change the content background color for Home screen
                }
            }} />

        </Stack.Navigator>
    );
};

export default StackNavigator;
