import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from '../app.route';
import { AppNavigatorParams } from '../app.navigator';
import {
  SeriesAInfoScreen,
  SeriesAScreen,
  SeriesBInfoScreen,
  SeriesBScreen,
  SeriesHiddenGemContentAttr,
  SeriesHiddenGemContentCafe,
  SeriesHiddenGemContentRest,
  SeriesHiddenGemScreen,
  SeriesScreen,
} from '../../scenes/Series'
import { SeriesHiddenGemDetailScreen } from '../../scenes/Series/SeriesHiddenGem.detail.component';


const Stack = createStackNavigator();


type SeriesNavigatorParams = AppNavigatorParams & {
  [SceneRoute.SERIES]: undefined;
  
  [SceneRoute.SERIES_A]: undefined;
  [SceneRoute.SERIES_A_DETAIL]: {
    Id: string,
  };

  [SceneRoute.SERIES_B]: undefined;
  [SceneRoute.SERIES_B_DETAIL]: {
    Id: string,
  };

  [SceneRoute.SERIES_HIDDEN_GEM]: undefined;
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

export interface SeriesADetailInfoProps {
  navigation: StackNavigationProp<SeriesNavigatorParams, SceneRoute.SERIES_A_DETAIL>;
  route: RouteProp<SeriesNavigatorParams, SceneRoute.SERIES_A_DETAIL>;
}

export interface SeriesADetailInfoCommentsProps {
  navigation: StackNavigationProp<SeriesNavigatorParams, SceneRoute.SERIES_A_DETAIL>;
  route: RouteProp<SeriesNavigatorParams, SceneRoute.SERIES_A_DETAIL>;
}

export interface SeriesBDetailProps {
  navigation: StackNavigationProp<SeriesNavigatorParams, SceneRoute.SERIES_B>;
  route: RouteProp<SeriesNavigatorParams, SceneRoute.SERIES_B>;
}

export interface SeriesBDetailContentProps {
  navigation: StackNavigationProp<SeriesNavigatorParams, SceneRoute.SERIES_B>;
  route: RouteProp<SeriesNavigatorParams, SceneRoute.SERIES_B>;
}

export interface SeriesBDetailInfoProps {
  navigation: StackNavigationProp<SeriesNavigatorParams, SceneRoute.SERIES_B_DETAIL>;
  route: RouteProp<SeriesNavigatorParams, SceneRoute.SERIES_B_DETAIL>;
}

export interface SeriesHiddenGemProps {
  navigation: StackNavigationProp<SeriesNavigatorParams, SceneRoute.SERIES_HIDDEN_GEM>;
  route: RouteProp<SeriesNavigatorParams, SceneRoute.SERIES_HIDDEN_GEM>;
}

export interface HiddenGemInKoreaFlatListProps {
  navigation: StackNavigationProp<SeriesNavigatorParams, SceneRoute.SERIES_HIDDEN_GEM>;
  route: RouteProp<SeriesNavigatorParams, SceneRoute.SERIES_HIDDEN_GEM>;
}

export interface SeriesHiddenGemDetailProps {
  navigation: StackNavigationProp<SeriesNavigatorParams, SceneRoute.SERIES_HIDDEN_GEM_DETAIL>;
  route: RouteProp<SeriesNavigatorParams, SceneRoute.SERIES_HIDDEN_GEM_DETAIL>;
}

export interface SeriesCarouselProps {
  
}

export type DetailData = {
  banner: string;
  desc: string;
  visible: boolean;
  title: string;
  placeCode: string;
}

export interface HiddenGemInKoreaDetailListProps {
  navigation: StackNavigationProp<SeriesNavigatorParams, SceneRoute.SERIES_HIDDEN_GEM_DETAIL>;
  route: RouteProp<SeriesNavigatorParams, SceneRoute.SERIES_HIDDEN_GEM_DETAIL>;
  data: Array<DetailData> | undefined;
  type: string;
}

export interface SeriesHiddenGemContentAttrProps {
  navigation: StackNavigationProp<SeriesNavigatorParams, SceneRoute.SERIES_HIDDEN_GEM_DETAIL_ATTR>;
  route: RouteProp<SeriesNavigatorParams, SceneRoute.SERIES_HIDDEN_GEM_DETAIL_ATTR>;
}

export interface SeriesHiddenGemContentCafeProps {
  navigation: StackNavigationProp<SeriesNavigatorParams, SceneRoute.SERIES_HIDDEN_GEM_DETAIL_CAFE>;
  route: RouteProp<SeriesNavigatorParams, SceneRoute.SERIES_HIDDEN_GEM_DETAIL_CAFE>;
}

export interface SeriesHiddenGemContentRestProps {
  navigation: StackNavigationProp<SeriesNavigatorParams, SceneRoute.SERIES_HIDDEN_GEM_DETAIL_ATTR>;
  route: RouteProp<SeriesNavigatorParams, SceneRoute.SERIES_HIDDEN_GEM_DETAIL_ATTR>;
}

export const SeriesNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.SERIES} component={SeriesScreen}/>

    <Stack.Screen name={SceneRoute.SERIES_HIDDEN_GEM} component={SeriesHiddenGemScreen}/>
    <Stack.Screen name={SceneRoute.SERIES_HIDDEN_GEM_DETAIL} component={SeriesHiddenGemDetailScreen}/>

    <Stack.Screen name={SceneRoute.SERIES_HIDDEN_GEM_DETAIL_ATTR} component={SeriesHiddenGemContentAttr}/>
    <Stack.Screen name={SceneRoute.SERIES_HIDDEN_GEM_DETAIL_REST} component={SeriesHiddenGemContentRest}/>
    <Stack.Screen name={SceneRoute.SERIES_HIDDEN_GEM_DETAIL_CAFE} component={SeriesHiddenGemContentCafe}/>

    <Stack.Screen name={SceneRoute.SERIES_A} component={SeriesAScreen}/>
    <Stack.Screen name={SceneRoute.SERIES_A_DETAIL} component={SeriesAInfoScreen}/>
    <Stack.Screen name={SceneRoute.SERIES_B} component={SeriesBScreen}/>
    <Stack.Screen name={SceneRoute.SERIES_B_DETAIL} component={SeriesBInfoScreen}/>
  </Stack.Navigator>
);