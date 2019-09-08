import {createAppContainer, createStackNavigator} from 'react-navigation';

import Main from '../pages/Main';
import User from '../pages/User';
const StackNavigator = createStackNavigator({
  Main,
  User,
});

const Container = createAppContainer(StackNavigator);

export default Container;
