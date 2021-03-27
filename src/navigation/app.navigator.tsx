import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigator } from './auth.navigator';
import { MainNavigator } from './main.navigator';
import { PayNavigator } from './pay.navigator'
import { BookNavigator } from './book.navigator';
import { NavigatorRoute } from './app.route';

export type AppNavigatorParams = {
  [NavigatorRoute.AUTH]: undefined;
  [NavigatorRoute.MAIN]: undefined;
  [NavigatorRoute.PAY]: undefined;
  [NavigatorRoute.BOOK]: undefined;
}

const Stack = createStackNavigator();

export const AppNavigator = (props: React.ReactElement): React.ReactElement => (
  <Stack.Navigator {...props} headerMode='none'>    
    <Stack.Screen name={NavigatorRoute.MAIN} component={MainNavigator}/>
    <Stack.Screen name={NavigatorRoute.PAY} component={PayNavigator}/>
    <Stack.Screen name={NavigatorRoute.AUTH} component={AuthNavigator}/>
    <Stack.Screen name={NavigatorRoute.BOOK} component={BookNavigator}/>
  </Stack.Navigator>
);