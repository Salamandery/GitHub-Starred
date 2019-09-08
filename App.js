import React from 'react';
import {StatusBar} from 'react-native';
import Routes from './src/services/routes';
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Routes />
    </>
  );
};

export default App;
