import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from './app.route';
import { AppNavigatorParams } from './app.navigator';
import { RestaurantInfoScreen, RestaurantIntroScreen, RestaurantMenuScreen } from '../scenes/feed/restaurant'

type RestaurantNavigatorParams = AppNavigatorParams & {
  [SceneRoute.RESTAURANT_INFO]: undefined;
  [SceneRoute.RESTAURANT_INTRO]: undefined;
  [SceneRoute.RESTAURANT_MENU]: undefined;
}

export interface RestaurantInfoScreenProps {
  navigation: StackNavigationProp<RestaurantNavigatorParams, SceneRoute.RESTAURANT_INFO>;
  route: RouteProp<RestaurantNavigatorParams, SceneRoute.RESTAURANT_INFO>;
}

export interface RestaurantIntroScreenProps {
  navigation: StackNavigationProp<RestaurantNavigatorParams, SceneRoute.RESTAURANT_INTRO>;
  route: RouteProp<RestaurantNavigatorParams, SceneRoute.RESTAURANT_INTRO>;
}


export interface RestaurantMenuScreenProps {
  navigation: StackNavigationProp<RestaurantNavigatorParams, SceneRoute.RESTAURANT_MENU>;
  route: RouteProp<RestaurantNavigatorParams, SceneRoute.RESTAURANT_MENU>;
}




const Stack = createStackNavigator();

export const RestaurantNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.RESTAURANT_INFO} component={RestaurantInfoScreen}/>
    <Stack.Screen name={SceneRoute.RESTAURANT_INTRO} component={RestaurantIntroScreen}/>
    <Stack.Screen name={SceneRoute.RESTAURANT_MENU} component={RestaurantMenuScreen}/>
  </Stack.Navigator>
);