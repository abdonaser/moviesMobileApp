// DrowNavigator.js

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Home from '../Screens/Home';
import Favorites from '../Screens/Favorites';
import Routes from '../Utils/MyRoutes';
import { Badge, Icon, useTheme } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { MaterialIcons } from 'react-native-vector-icons';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { useSelector } from 'react-redux';
const Drawer = createDrawerNavigator();

// Custom drawer content component
const CustomDrawerContent = ({ onSignOut, ...props }) => {
    const { colors } = useTheme();

    return (
        <DrawerContentScrollView {...props} style={{ backgroundColor: colors.background }}>
            <View style={styles.drawerContainer}>
                <View style={[styles.column]}>
                    <DrawerItemList {...props} />
                    <DrawerItem
                        label="Sign Out"
                        onPress={onSignOut} // Call the passed onSignOut function
                        labelStyle={{ color: colors.text }} // Use theme color for the label
                        icon={({ color, size }) => ( // Add an icon to the left
                            <MaterialIcons name="logout" size={size} color={colors.text} />
                        )}
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
    const favMovieslength = useSelector((state) => state.allFavMoviesStore.favMovieslength);
    // console.log("favMovieslength - > ", favMovieslength);
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
                swipeEnabled: !isGuest
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} onSignOut={onSignOut} />}
        >

            {/*//' Home Screen */}
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
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="home" size={size} color={colors.text} />
                    ),
                }}
            >
                {(props) => <Home {...props} userEmail={userEmail} isGuest={isGuest} />}
            </Drawer.Screen>

            {/*//' Favorites Screen */}
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
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="favorite" size={size} color="red" />
                        // <MaterialCommunityIcons
                        //     name="cards-heart"
                        //     size={size} // or 20 if you want a fixed size
                        //     color="red" // or colors.text
                        // />
                    ),

                    headerRight: () => (
                        <Badge size={23} style={[styles.badgeHeaderStyle, { color: colors.badgeText, backgroundColor: colors.badgeBgc }]} >
                            {favMovieslength}
                        </Badge>
                        // <View style={styles.countContainer}>
                        //     <Text style={{ color: "#fff" }}>{favMovieslength}</Text>
                        // </View>
                    ),

                    drawerLabel: () => (
                        <View style={styles.drawerLabelStyle}>
                            <Text style={{ color: colors.text }}>Favorites</Text>
                            {/* <View style={styles.countContainerDrawerLabel}>
                                <Text style={{ color: colors.text }}>{favMovieslength}</Text>
                            </View> */}
                            <Badge size={23} style={[styles.badgeStyle, { color: colors.badgeText, backgroundColor: colors.badgeBgc }]} >{favMovieslength}</Badge>
                        </View>
                    ),
                }}
            />
        </Drawer.Navigator >
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
    countContainer: {
        borderRadius: 20,
        width: 30,
        height: 30,
        marginRight: 140,
        backgroundColor: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    drawerLabelStyle: {
        // backgroundColor: "teal",
        flexDirection: 'row',
        // justifyContent: 'space-between',
        width: "auto",
        padding: 0
    },
    countContainerDrawerLabel: {
        borderRadius: 20,
        width: 30,
        height: 30,
        // marginRight: 140,
        backgroundColor: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }, badgeStyle: {
        position: "absolute",
        top: -5,
        right: 20,
    }, badgeHeaderStyle: {
        position: "absolute",
        top: 5,
        left: -11,

    }
});

export default DrowNavigator;
