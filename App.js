import { registerRootComponent } from 'expo';

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrowNavigator from './navigations/DrowNavigator';
import { StyleSheet, View, Switch, StatusBar } from 'react-native';
import MoviesContextProvider from './Context/MoviesContextProvider.js';

import store from './Redux/Slices/Store.js';
import { Provider } from 'react-redux';

import StackNavigator from './navigations/StackNavigator.js';

import {
  MD3LightTheme as PaperLightTheme,
  MD3DarkTheme as PaperDarkTheme,
  PaperProvider,
} from 'react-native-paper';

import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { useColorScheme } from 'react-native';
import { Appearance } from 'react-native';
import { useMemo } from 'react';



export default function App() {
  // const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');

  // const darkTheme = {
  //   ...DefaultTheme,
  //   dark: true,
  //   colors: {
  //     primary: '#0000', // Replace with your desired dark primary color
  //     accent: '#0000', // Replace with your desired dark accent color
  //     background: '#0000', // Replace with your desired dark background color
  //     text: '#0000', // Replace with your desired dark text color
  //   },
  // };

  // const lightTheme = {
  //   ...DefaultTheme,
  //   dark: false,
  //   colors: {
  //     primary: '#0000', // Replace with your desired light primary color
  //     accent: '#0000', // Replace with your desired light accent color
  //     background: '#0000', // Replace with your desired light background color
  //     text: '#0000', // Replace with your desired light text color
  //   },
  // };

  // const theme = darkTheme

  // const toggleTheme = () => {
  //   setIsDarkMode(!isDarkMode);
  // };
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const customLightTheme = {
    ...PaperLightTheme,
    colors: {
      ...PaperLightTheme.colors,
      primary: '#6200ee',
      accent: '#03dac4',
      background: '#ffffff',
      text: '#000000',
      appName: '#000000',
    },
  };
  const customDarkTheme = {
    ...PaperDarkTheme,
    colors: {
      ...PaperDarkTheme.colors,
      primary: '#1DB954',
      accent: '#BB86FC',
      background: '#121212',
      text: '#ffffff',
      appName: '#0096FF',
    },
  };

  const theme = isDarkTheme ? customDarkTheme : customLightTheme;





  return (

    <PaperProvider theme={theme} >
      {/* //' redux statemanegment */}
      <StatusBar
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkTheme ? '#121212' : '#ffffff'}
      />
      <Provider store={store}>
        {/* //' contextApi statemanegment */}
        <MoviesContextProvider>
          <NavigationContainer theme={theme}>
            {/* <DrowNavigator /> */}
            <StackNavigator />
            <View style={styles.switchContainer}>
              <Switch value={isDarkTheme} onValueChange={toggleTheme} />
            </View>
          </NavigationContainer>
        </MoviesContextProvider>
      </Provider>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  switchContainer: {
    position: 'absolute',
    top: 7,
    right: 20,
    backgroundColor: 'transparent',
  },
});