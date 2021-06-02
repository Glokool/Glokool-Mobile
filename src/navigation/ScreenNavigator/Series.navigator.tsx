import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from '../app.route';
import { AppNavigatorParams } from '../app.navigator';
import {
  SeriesScreen
} from '../../scenes/Series'

const Stack = createStackNavigator();


type SeriesNavigatorParams = AppNavigatorParams & {
  [SceneRoute.SERIES]: undefined;
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

export const SeriesNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.SERIES} component={SeriesScreen}/>
  </Stack.Navigator>
);