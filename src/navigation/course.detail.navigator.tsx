import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createMaterialTopTabNavigator, MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { SceneRoute } from './app.route';
import { AppNavigatorParams } from './app.navigator';
import { CourseDetailOverviewScreen, CourseDetailSpotsScreen } from '../scenes/feed/course'

type CourseDetailNavigatorParams = AppNavigatorParams & {
    [SceneRoute.COURSE_DETAIL_OVERVIEW]: undefined;
    [SceneRoute.COURSE_DETAIL_SPOTS]: undefined;
  }

export interface CourseDetailOverviewScreenProps {
    navigation: MaterialTopTabNavigationProp<CourseDetailNavigatorParams, SceneRoute.COURSE_DETAIL_OVERVIEW>;
    route: RouteProp<CourseDetailNavigatorParams, SceneRoute.COURSE_DETAIL_OVERVIEW>;
  }
  
  export interface CourseDetailSpotsScreenProps {
    navigation: MaterialTopTabNavigationProp<CourseDetailNavigatorParams, SceneRoute.COURSE_DETAIL_SPOTS>;
    route: RouteProp<CourseDetailNavigatorParams, SceneRoute.COURSE_DETAIL_SPOTS>;
  }
    
  const Tab = createMaterialTopTabNavigator();

  function MyTabBar({ state, descriptors, navigation, position }) {
    return(
      null
    );
  }
       
  export const CourseDetailNavigator = ({ navigation, route }) => (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />} swipeEnabled={route.state && route.state.index == 1 ? false : true}>
      <Tab.Screen name={SceneRoute.COURSE_DETAIL_OVERVIEW} component={CourseDetailOverviewScreen} />
      <Tab.Screen name={SceneRoute.COURSE_DETAIL_SPOTS} component={CourseDetailSpotsScreen} options={{gestureEnabled: false}}/>
    </Tab.Navigator>
  );