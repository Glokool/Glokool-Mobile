import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { NavigatorRoute, SceneRoute } from '../app.route';
import { AppNavigatorParams } from '../App.navigator';
import { HomeScreen } from '../../scenes/Home';
import { MainNavigatorParams } from '../Main.navigator';
import { ZoneDetailBlogScene, ZoneDetailContentScene } from '../../scenes/Zone';

type HomeNavigatorParams = AppNavigatorParams & MainNavigatorParams & {
  [SceneRoute.HOME]: undefined;
  [NavigatorRoute.CHAT]: undefined;
}

export interface HomeScreenProps {
  navigation: StackNavigationProp<HomeNavigatorParams, SceneRoute.HOME>;
  route: RouteProp<HomeNavigatorParams, SceneRoute.HOME>;
}

const Stack = createStackNavigator();

export const HomeNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.HOME} component={HomeScreen} />
  </Stack.Navigator>
);