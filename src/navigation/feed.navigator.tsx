import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from './app.route';
import { AppNavigatorParams } from './app.navigator';
import { FeedScreen, FeedPreviewScreen, FeedBookFirstScreen, FeedBookSecondScreen, FeedBookThirdScreen } from '../scenes/feed';

type FeedNavigatorParams = AppNavigatorParams & {
  [SceneRoute.FEED]: undefined;
  [SceneRoute.FEED_PREVIEW]: undefined;
  [SceneRoute.FEED_BOOK1]: undefined;
  [SceneRoute.FEED_BOOK2]: undefined;
  [SceneRoute.FEED_BOOK3]: undefined;
}

export interface FeedScreenProps {
  navigation: StackNavigationProp<FeedNavigatorParams, SceneRoute.FEED>;
  route: RouteProp<FeedNavigatorParams, SceneRoute.FEED>;
}

export interface FeedPreviewScreenProps {
  navigation: StackNavigationProp<FeedNavigatorParams, SceneRoute.FEED_PREVIEW>;
  route: RouteProp<FeedNavigatorParams, SceneRoute.FEED_PREVIEW>;
}

export interface FeedBookFirstScreenProps {
  navigation: StackNavigationProp<FeedNavigatorParams, SceneRoute.FEED_BOOK1>;
  route: RouteProp<FeedNavigatorParams, SceneRoute.FEED_BOOK1>;
}

export interface FeedBookSecondScreenProps {
  navigation: StackNavigationProp<FeedNavigatorParams, SceneRoute.FEED_BOOK2>;
  route: RouteProp<FeedNavigatorParams, SceneRoute.FEED_BOOK2>;
}

export interface FeedBookThirdScreenProps {
  navigation: StackNavigationProp<FeedNavigatorParams, SceneRoute.FEED_BOOK3>;
  route: RouteProp<FeedNavigatorParams, SceneRoute.FEED_BOOK3>;
}



const Stack = createStackNavigator();

export const FeedNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.FEED} component={FeedScreen}/>
    <Stack.Screen name={SceneRoute.FEED_PREVIEW} component={FeedPreviewScreen}/>
    <Stack.Screen name={SceneRoute.FEED_BOOK1} component={FeedBookFirstScreen}/>
    <Stack.Screen name={SceneRoute.FEED_BOOK2} component={FeedBookSecondScreen}/>
    <Stack.Screen name={SceneRoute.FEED_BOOK3} component={FeedBookThirdScreen}/>
  </Stack.Navigator>
);