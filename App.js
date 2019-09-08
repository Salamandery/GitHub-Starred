/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Routes from './src/services/routes';

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Routes />
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
