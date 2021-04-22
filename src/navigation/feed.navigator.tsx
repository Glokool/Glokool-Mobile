import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { NavigatorRoute, SceneRoute } from './app.route';
import { AppNavigatorParams } from './app.navigator';
import { FeedScreen, TourBookScreen } from '../scenes/feed';
import { AttractionNavigator } from './attraction.navigator';
import { RestaurantNavigator } from './restaurant.navigator'
import { CafeNavigator } from './cafe.navigator';
import { CourseDetailNavigator } from './course.detail.navigator'
import { CourseMapScreen } from '../scenes/feed/course';

type FeedNavigatorParams = AppNavigatorParams & {
  [SceneRoute.FEED]: undefined;
  [SceneRoute.FEED_TOURBOOK]: undefined;
  [SceneRoute.COURSE_MAP]: {
    params: {
      tourCode: string
    }
  };
  [SceneRoute.FEED_DETAIL]: {
    params: {
      code: string
    }
  };
  [SceneRoute.FEED_DETAIL_REVIEW]: {
    params: {
      code: string
    }
  };

  [NavigatorRoute.COURSE_DETAIL]: { 
    list: { 
      tourCode: string,
      directory: string
    }    
  };

  [NavigatorRoute.ATTRACTION]: {
    screen: string;
    params: {
      code: any,
      tourCode: string
    }
  };

  [NavigatorRoute.RESTAURANT]: {
    screen: never;
    params: {
      code: any,
      tourCode: string
    }
  };

  [NavigatorRoute.CAFE]: NavigatorScreenParams<{
    screen: SceneRoute;
    params: {
      code: any,
      tourCode: any
    }
  }>;
  
  [NavigatorRoute.BOOK]: {
    screen: SceneRoute;
    params: {
      tourCode: string
    }
  };
}

export interface FeedScreenProps {
  navigation: StackNavigationProp<FeedNavigatorParams, SceneRoute.FEED>;
  route: RouteProp<FeedNavigatorParams, SceneRoute.FEED>;
}

export interface TourBookScreenProps {
  navigation: StackNavigationProp<FeedNavigatorParams, SceneRoute.FEED_TOURBOOK>;
  route: RouteProp<FeedNavigatorParams, SceneRoute.FEED_TOURBOOK>;
}

export interface CourseMapScreenProps {
  navigation: StackNavigationProp<FeedNavigatorParams, SceneRoute.COURSE_MAP>;
  route: RouteProp<FeedNavigatorParams, SceneRoute.COURSE_MAP>;
}

export interface CafeInfoScreenProps {
  navigation: StackNavigationProp<FeedNavigatorParams, SceneRoute.CAFE_INFO>;
  route: RouteProp<FeedNavigatorParams, SceneRoute.CAFE_INFO>;
}

const Stack = createStackNavigator();

export const FeedNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.FEED} component={FeedScreen}/>
    <Stack.Screen name={SceneRoute.FEED_TOURBOOK} component={TourBookScreen}/>
    <Stack.Screen name={SceneRoute.COURSE_MAP} component={CourseMapScreen}/>
    <Stack.Screen name={NavigatorRoute.COURSE_DETAIL} component={CourseDetailNavigator}/>
    <Stack.Screen name={NavigatorRoute.ATTRACTION} component={AttractionNavigator}/>
    <Stack.Screen name={NavigatorRoute.RESTAURANT} component={RestaurantNavigator}/>
    <Stack.Screen name={NavigatorRoute.CAFE} component={CafeNavigator}/>
  </Stack.Navigator>
);