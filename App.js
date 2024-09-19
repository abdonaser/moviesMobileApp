import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrowNavigator from './navigations/DrowNavigator';

import MoviesContextProvider from './Context/MoviesContextProvider.js';

import store from './Redux/Slices/Store.js';
import { Provider } from 'react-redux';

import StackNavigator from './navigations/StackNavigator.js';


import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider
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
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();
  const paperTheme = { ...MD3DarkTheme, colors: theme.dark }
  // { ...MD3DarkTheme, colors: theme.dark }

  return (

    <PaperProvider theme={paperTheme} >
      {/* //' redux statemanegment */}
      <Provider store={store}>
        {/* //' contextApi statemanegment */}
        <MoviesContextProvider>
          <NavigationContainer>
            {/* <DrowNavigator /> */}
            <StackNavigator />
          </NavigationContainer>
        </MoviesContextProvider>
      </Provider>
    </PaperProvider>
  );
}