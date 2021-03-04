import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from './app.route';
import { AppNavigatorParams } from './app.navigator';
import { CafeInfoScreen, CafeIntroScreen, CafeMenuScreen } from '../scenes/my_tour/cafe'

type CafeNavigatorParams = AppNavigatorParams & {
  [SceneRoute.CAFE_INFO]: undefined;
  [SceneRoute.CAFE_INTRO]: undefined;
  [SceneRoute.CAFE_MENU]: undefined;
}

export interface CafeInfoScreenProps {
  navigation: StackNavigationProp<CafeNavigatorParams, SceneRoute.CAFE_INFO>;
  route: RouteProp<CafeNavigatorParams, SceneRoute.CAFE_INFO>;
}

export interface CafeIntroScreenProps {
  navigation: StackNavigationProp<CafeNavigatorParams, SceneRoute.CAFE_INTRO>;
  route: RouteProp<CafeNavigatorParams, SceneRoute.CAFE_INTRO>;
}

export interface CafeMenuScreenProps {
  navigation: StackNavigationProp<CafeNavigatorParams, SceneRoute.CAFE_MENU>;
  route: RouteProp<CafeNavigatorParams, SceneRoute.CAFE_MENU>;
}



const Stack = createStackNavigator();

export const CafeNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.CAFE_INFO} component={CafeInfoScreen}/>
    <Stack.Screen name={SceneRoute.CAFE_INTRO} component={CafeIntroScreen}/>
    <Stack.Screen name={SceneRoute.CAFE_MENU} component={CafeMenuScreen}/>
  </Stack.Navigator>
);