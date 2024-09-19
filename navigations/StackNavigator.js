import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetails from "../Screens/MovieDetails";
import Routes from "../Utils/MyRoutes";
import DrowNavigator from "./DrowNavigator";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={Routes.drawer}
                component={DrowNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen name={Routes.movieDetails} component={MovieDetails} />
        </Stack.Navigator>
    );
};

export default StackNavigator;
