import React from 'react';
import { Platform, StatusBar, Image } from 'react-native';
import { Block, GalioProvider } from 'galio-framework';

import Screens from './navigation/Screens';
import { materialTheme } from './constants/';

// Entry Point for App
export default class App extends React.Component {
  render() {
    
    return (
      <GalioProvider theme={materialTheme}>
        <Block flex>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <Screens />
        </Block>
      </GalioProvider>
    );
  }
}

