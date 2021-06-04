import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from '../app.route';
import { AppNavigatorParams } from '../app.navigator';
import { HomeScreen } from '../../scenes/Home';

type HomeNavigatorParams = AppNavigatorParams & {
    [SceneRoute.HOME] : undefined;
    
}
  
export interface HomeScreenProps {
    navigation: StackNavigationProp<HomeNavigatorParams, SceneRoute.HOME>;
    route: RouteProp<HomeNavigatorParams, SceneRoute.HOME>;
}

export interface HomeTopTabBarProps {
    navigation: StackNavigationProp<HomeNavigatorParams, SceneRoute.HOME>;
    route: RouteProp<HomeNavigatorParams, SceneRoute.HOME>;
}

export interface HomeCarouselProps {
  navigation: StackNavigationProp<HomeNavigatorParams, SceneRoute.HOME>;
  route: RouteProp<HomeNavigatorParams, SceneRoute.HOME>;
}

const Stack = createStackNavigator();

export const HomeNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.HOME} component={HomeScreen}/>
  </Stack.Navigator>
);