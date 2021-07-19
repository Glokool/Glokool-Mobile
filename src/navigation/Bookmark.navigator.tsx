import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from './app.route';
import { AppNavigatorParams } from './app.navigator';
import { SeriesAInfoScreen, SeriesBInfoScreen, SeriesHiddenGemDetailScreen } from '../scenes/Series';

type BookNavigatorParams = AppNavigatorParams & {

    [SceneRoute.BOOKMARK_SERIES]: {
        TourCode: string,
    };

    [SceneRoute.BOOKMARK_SERIES_A]: {
        Id: string,
    };

    [SceneRoute.BOOKMARK_SERIES_B]: {
        Id: string,
    };
}

const Stack = createStackNavigator();

export const BookmarkNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>

    <Stack.Screen name={SceneRoute.BOOKMARK_SERIES} component={SeriesHiddenGemDetailScreen}/>
    <Stack.Screen name={SceneRoute.BOOKMARK_SERIES_A} component={SeriesAInfoScreen}/>
    <Stack.Screen name={SceneRoute.BOOKMARK_SERIES_B} component={SeriesBInfoScreen}/>

  </Stack.Navigator>
);