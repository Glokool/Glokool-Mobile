import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from './app.route';
import { AppNavigatorParams } from './app.navigator';
import { LoginCheck } from '../component/Common'

type CommonNavigatorParams = AppNavigatorParams & {
  [SceneRoute.LOGIN_CHECK]: undefined;
}

export interface LoginCheckProps {
  navigation: StackNavigationProp<CommonNavigatorParams, SceneRoute.LOGIN_CHECK>;
  route: RouteProp<CommonNavigatorParams, SceneRoute.LOGIN_CHECK>;
  visible : boolean;
}

const Stack = createStackNavigator();

export const CommonNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.LOGIN_CHECK} component={LoginCheck}/>
  </Stack.Navigator>
);
