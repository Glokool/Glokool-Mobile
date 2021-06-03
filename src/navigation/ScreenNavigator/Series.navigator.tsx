import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from '../app.route';
import { AppNavigatorParams } from '../app.navigator';
import {
  SeriesAScreen,
  SeriesHiddenGemScreen,
  SeriesScreen,
} from '../../scenes/Series'


const Stack = createStackNavigator();


type SeriesNavigatorParams = AppNavigatorParams & {
  [SceneRoute.SERIES]: undefined;
  [SceneRoute.SERIES_A]: undefined;
  [SceneRoute.SERIES_HIDDEN_GEM]: undefined;
}

export interface SeriesScreenProps {
  navigation: StackNavigationProp<SeriesNavigatorParams, SceneRoute.SERIES>;
  route: RouteProp<SeriesNavigatorParams, SceneRoute.SERIES>;
}

export interface SeriesFlatlistProps {
  navigation: StackNavigationProp<SeriesNavigatorParams, SceneRoute.SERIES>;
  route: RouteProp<SeriesNavigatorParams, SceneRoute.SERIES>;
}

export interface SeriesAFlatlistProps {
  navigation: StackNavigationProp<SeriesNavigatorParams, SceneRoute.SERIES>;
  route: RouteProp<SeriesNavigatorParams, SceneRoute.SERIES>;
}

export interface SeriesBFlatlistProps {
  navigation: StackNavigationProp<SeriesNavigatorParams, SceneRoute.SERIES>;
  route: RouteProp<SeriesNavigatorParams, SceneRoute.SERIES>;
}

export interface SeriesADetailProps {
  navigation: StackNavigationProp<SeriesNavigatorParams, SceneRoute.SERIES_A>;
  route: RouteProp<SeriesNavigatorParams, SceneRoute.SERIES_A>;
}

export interface SeriesADetailContentProps {
  navigation: StackNavigationProp<SeriesNavigatorParams, SceneRoute.SERIES_A>;
  route: RouteProp<SeriesNavigatorParams, SceneRoute.SERIES_A>;
}

export interface SeriesHiddenGemProps {
  navigation: StackNavigationProp<SeriesNavigatorParams, SceneRoute.SERIES_HIDDEN_GEM>;
  route: RouteProp<SeriesNavigatorParams, SceneRoute.SERIES_HIDDEN_GEM>;
}

export interface HiddenGemInKoreaFlatListProps {
  navigation: StackNavigationProp<SeriesNavigatorParams, SceneRoute.SERIES_HIDDEN_GEM>;
  route: RouteProp<SeriesNavigatorParams, SceneRoute.SERIES_HIDDEN_GEM>;
}

export const SeriesNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.SERIES} component={SeriesScreen}/>
    <Stack.Screen name={SceneRoute.SERIES_HIDDEN_GEM} component={SeriesHiddenGemScreen}/>
    <Stack.Screen name={SceneRoute.SERIES_A} component={SeriesAScreen}/>
  </Stack.Navigator>
);