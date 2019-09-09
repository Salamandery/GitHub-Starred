import React from 'react';
import {StatusBar} from 'react-native';
import Routes from './src/services/routes';
const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#333" />
      <Routes />
    </>
  );
};

export default App;
