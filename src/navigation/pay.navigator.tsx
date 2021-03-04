import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from './app.route';
import { AppNavigatorParams } from './app.navigator';
import { PayScreen } from '../scenes/feed';

type PayNavigatorParams = AppNavigatorParams & {
  [SceneRoute.PAY]: undefined;
}

export interface PayScreenProps {
  navigation: StackNavigationProp<PayNavigatorParams, SceneRoute.PAY>;
  route: RouteProp<PayNavigatorParams, SceneRoute.PAY>;
}

const Stack = createStackNavigator();

export const PayNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.PAY} component={PayScreen}/>
  </Stack.Navigator>
);