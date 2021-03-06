import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from '../pages/Main';
import User from '../pages/User';
import WebView from '../pages/WebView';

const StackNavigator = createStackNavigator({
  Main: {
    screen: Main
  },
  User: {
    screen: User
  },
  WebView: {
    screen: WebView
  },
},
{
  headerLayoutPreset: "center",
  headerBackTitleVisible: false,
  defaultNavigationOptions: {
    headerTintColor: "#f2f2f2",
    headerStyle: {
      backgroundColor: "#333",
    },
  },
  
});

const Container = createAppContainer(StackNavigator);

export default Container;
