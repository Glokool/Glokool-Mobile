import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from './app.route';
import { AppNavigatorParams } from './app.navigator';
import { BookPayConfirmScreen } from '../scenes/Book1';

type PayNavigatorParams = AppNavigatorParams & {
  [SceneRoute.PAY]: undefined;
}

export interface BookPayConfirmScreenProps {
  navigation: StackNavigationProp<PayNavigatorParams, SceneRoute.PAY>;
  route: RouteProp<PayNavigatorParams, SceneRoute.PAY>;
}

const Stack = createStackNavigator();

export const PayNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.PAY} component={BookPayConfirmScreen}/>
  </Stack.Navigator>
);
