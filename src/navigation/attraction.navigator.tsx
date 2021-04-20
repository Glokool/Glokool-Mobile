import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { NavigatorRoute, SceneRoute } from './app.route';
import { AppNavigatorParams } from './app.navigator';
import { AttractionInfoScreen, AttractionIntroScreen, AttractionPhotoScreen } from '../scenes/feed/attraction'

type AttractionNavigatorParams = AppNavigatorParams & {
  [SceneRoute.ATTRACTION_INFO]: undefined;
  [SceneRoute.ATTRACTION_INTRO]: undefined;
  [SceneRoute.ATTRACTION_PHOTO]: undefined;
}

export interface AttractionInfoScreenProps {
  navigation: StackNavigationProp<AttractionNavigatorParams, SceneRoute.ATTRACTION_INFO>;
  route: RouteProp<AttractionNavigatorParams, SceneRoute.ATTRACTION_INFO>;
}

export interface AttractionIntroScreenProps {
  navigation: StackNavigationProp<AttractionNavigatorParams, SceneRoute.ATTRACTION_INTRO>;
  route: RouteProp<AttractionNavigatorParams, SceneRoute.ATTRACTION_INTRO>;
}

export interface AttractionPhotoScreenProps {
  navigation: StackNavigationProp<AttractionNavigatorParams, SceneRoute.ATTRACTION_PHOTO>;
  route: RouteProp<AttractionNavigatorParams, SceneRoute.ATTRACTION_PHOTO>;
}



const Stack = createStackNavigator();

export const AttractionNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.ATTRACTION_INFO} component={AttractionInfoScreen}/>
    <Stack.Screen name={SceneRoute.ATTRACTION_INTRO} component={AttractionIntroScreen}/>
    <Stack.Screen name={SceneRoute.ATTRACTION_PHOTO} component={AttractionPhotoScreen}/>
  </Stack.Navigator>
);