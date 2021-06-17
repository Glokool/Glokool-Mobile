import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from '../app.route';
import { AppNavigatorParams } from '../app.navigator';
import { HomeScreen } from '../../scenes/Home';
import { SeriesAInfoScreen, SeriesBInfoScreen, SeriesHiddenGemContentAttr, SeriesHiddenGemContentCafe, SeriesHiddenGemContentRest } from '../../scenes/Series';
import { SeriesHiddenGemDetailScreen } from '../../scenes/Series/SeriesHiddenGem.detail.component';

type HomeNavigatorParams = AppNavigatorParams & {
    [SceneRoute.HOME] : undefined;

    [SceneRoute.SERIES_A_DETAIL]: {
      Id: string,
    };
    [SceneRoute.SERIES_B_DETAIL]: {
      Id: string,
    };
  
    [SceneRoute.SERIES_HIDDEN_GEM_DETAIL] : {
      TourCode: string;
    }
    [SceneRoute.SERIES_HIDDEN_GEM_DETAIL_ATTR] : {
      TourCode: string;
      PlaceCode: string;
    }
    [SceneRoute.SERIES_HIDDEN_GEM_DETAIL_REST] : {
      TourCode: string;
      PlaceCode: string;
    }
    [SceneRoute.SERIES_HIDDEN_GEM_DETAIL_CAFE] : {
      TourCode: string;
      PlaceCode: string;
    }
    
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
    
    <Stack.Screen name={SceneRoute.SERIES_HIDDEN_GEM_DETAIL} component={SeriesHiddenGemDetailScreen}/>
    <Stack.Screen name={SceneRoute.SERIES_HIDDEN_GEM_DETAIL_ATTR} component={SeriesHiddenGemContentAttr}/>
    <Stack.Screen name={SceneRoute.SERIES_HIDDEN_GEM_DETAIL_REST} component={SeriesHiddenGemContentRest}/>
    <Stack.Screen name={SceneRoute.SERIES_HIDDEN_GEM_DETAIL_CAFE} component={SeriesHiddenGemContentCafe}/>

    <Stack.Screen name={SceneRoute.SERIES_A_DETAIL} component={SeriesAInfoScreen}/>
    <Stack.Screen name={SceneRoute.SERIES_B_DETAIL} component={SeriesBInfoScreen}/>
  </Stack.Navigator>
);