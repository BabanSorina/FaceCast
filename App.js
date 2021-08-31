import React, { useState, useEffect } from 'react';
import { theme } from './src/constants/theme';
import { UtilityThemeProvider } from 'react-native-design-utility';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootStoreContext, RootStoreProvider } from './src/context/RootStoreContext';

import AuthStack from './src/navigations/AuthStack';
import Provider from './src/navigations/Provider';
import { rootStore } from './src/context/RootStore';
import TrackPlayer from 'react-native-track-player';

const App = () => {
  const SetPlayer = () => {
    // Creates the player
    TrackPlayer.setupPlayer()
      .then(async () => {
        console.log('player is setup');
      })
      .catch(e => console.log('error', e));
  };
  React.useEffect(() => {
    SetPlayer();
  }, [])

  return (<RootStoreProvider rootStore={rootStore}>
    <UtilityThemeProvider>
      <SafeAreaProvider>

        <Provider theme={theme} />

      </SafeAreaProvider>

    </UtilityThemeProvider>
  </RootStoreProvider>)
};



export default App;