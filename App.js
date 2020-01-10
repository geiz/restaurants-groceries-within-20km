import React from 'react';
import { Platform, StatusBar, Image } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';

import Screens from './navigation/Screens';
import { materialTheme } from './constants/';


// cache product images
// products.map(product => assetImages.push(product.image));

// cache categories images
// Object.keys(categories).map(key => {
//   categories[key].map(category => assetImages.push(category.image));
// });


// Entry Point for App
export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
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

  _loadResourcesAsync = async () => {
    return Promise.all([
      ...cacheImages(assetImages),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
