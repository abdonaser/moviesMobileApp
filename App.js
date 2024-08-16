import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrowNavigator from './navigations/DrowNavigator';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';
import { Appearance } from 'react-native';
import { useMemo } from 'react';
import MoviesContextProvider from './Context/MoviesContextProvider.js';
import store from './Redux/Slices/Store.js';
import { Provider } from 'react-redux';
import StackNavigator from './navigations/StackNavigator.js';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');

  const darkTheme = {
    ...DefaultTheme,
    dark: true,
    colors: {
      primary: '#0000', // Replace with your desired dark primary color
      accent: '#0000', // Replace with your desired dark accent color
      background: '#0000', // Replace with your desired dark background color
      text: '#0000', // Replace with your desired dark text color
    },
  };

  const lightTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      primary: '#0000', // Replace with your desired light primary color
      accent: '#0000', // Replace with your desired light accent color
      background: '#0000', // Replace with your desired light background color
      text: '#0000', // Replace with your desired light text color
    },
  };

  const theme = darkTheme

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (

    <PaperProvider  >
      <Provider store={store}>
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