import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from './app.route';
import { AppNavigatorParams } from './app.navigator';
import { FeedScreen, TourBookScreen } from '../scenes/feed';

type FeedNavigatorParams = AppNavigatorParams & {
  [SceneRoute.FEED]: undefined;
  [SceneRoute.FEED_TOURBOOK]: undefined;

}

export interface FeedScreenProps {
  navigation: StackNavigationProp<FeedNavigatorParams, SceneRoute.FEED>;
  route: RouteProp<FeedNavigatorParams, SceneRoute.FEED>;
}

export interface TourBookScreenProps {
  navigation: StackNavigationProp<FeedNavigatorParams, SceneRoute.FEED_TOURBOOK>;
  route: RouteProp<FeedNavigatorParams, SceneRoute.FEED_TOURBOOK>;
}

const Stack = createStackNavigator();

export const FeedNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.FEED} component={FeedScreen}/>
    <Stack.Screen name={SceneRoute.FEED_TOURBOOK} component={TourBookScreen}/>
  </Stack.Navigator>
);