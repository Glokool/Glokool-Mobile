import React from 'react';
import auth from '@react-native-firebase/auth';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigator } from './auth.navigator';
import { MainNavigator } from './main.navigator';
import { PayNavigator } from './pay.navigator'
import { NavigatorRoute } from './app.route';

export type AppNavigatorParams = {
  [NavigatorRoute.AUTH]: undefined;
  [NavigatorRoute.MAIN]: undefined;
}

const Stack = createStackNavigator();
const user = auth().currentUser

export const AppNavigator = (props): React.ReactElement => (
  <Stack.Navigator {...props} headerMode='none'>    
    <Stack.Screen name={NavigatorRoute.MAIN} component={MainNavigator}/>
    <Stack.Screen name={NavigatorRoute.PAY} component={PayNavigator}/>
    <Stack.Screen name={NavigatorRoute.AUTH} component={AuthNavigator}/>
  </Stack.Navigator>
);