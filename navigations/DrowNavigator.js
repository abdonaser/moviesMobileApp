// DrowNavigator.js

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Home from '../Screens/Home';
import Favorites from '../Screens/Favorites';
import Routes from '../Utils/MyRoutes';
import { useTheme } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

// Custom drawer content component
const CustomDrawerContent = ({ onSignOut, ...props }) => {
    const { colors } = useTheme();

    return (
        <DrawerContentScrollView {...props} style={{ backgroundColor: colors.background }}>
            <View style={styles.drawerContainer}>
                <View style={styles.column}>
                    <DrawerItemList {...props} />
                    <DrawerItem
                        label="Sign Out"
                        onPress={onSignOut} // Call the passed onSignOut function
                        labelStyle={{ color: colors.text }} // Use theme color for the label
                    />
                </View>
            </View>
        </DrawerContentScrollView>
    );
};

function DrowNavigator({ onSignOut }) {
    const { colors } = useTheme();
    const route = useRoute();
    const { userEmail, isGuest } = route.params || {};
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: {
                    backgroundColor: colors.background,
                },
                drawerLabelStyle: {
                    color: colors.text,
                },
                headerTintColor: colors.text,
                headerShown: !isGuest,
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} onSignOut={onSignOut} />}
        >
            <Drawer.Screen
                name={Routes.home}
                // component={Home}
                options={{
                    headerTitleStyle: {
                        color: colors.text,
                    },
                    headerStyle: {
                        backgroundColor: colors.background,
                    },
                }}
            >
                {(props) => <Home {...props} userEmail={userEmail} isGuest={isGuest} />}
            </Drawer.Screen>
            <Drawer.Screen
                name={Routes.favorites}
                component={Favorites}
                options={{
                    headerTitleStyle: {
                        color: colors.text,
                    },
                    headerStyle: {
                        backgroundColor: colors.background,
                    },


                }}
            />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    drawerContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Allow items to wrap to the next line
        padding: 16,
    },
    column: {
        flex: 1, // Takes up half the width (for two columns)
        justifyContent: 'flex-start',
    },
});

export default DrowNavigator;
