import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { NavigatorRoute, SceneRoute } from './app.route';
import { AppNavigatorParams } from './app.navigator';
import { CourseListScreen, CourseMapScreen } from '../scenes/my_tour/course';
import { CourseDetailNavigator } from './course.detail.navigator';


type CourseNavigatorParams = AppNavigatorParams & {
  [SceneRoute.COURSE_LIST]: undefined;
  [SceneRoute.COURSE_MAP]: undefined;
}

export interface CourseListScreenProps {
  navigation: StackNavigationProp<CourseNavigatorParams, SceneRoute.COURSE_LIST>;
  route: RouteProp<CourseNavigatorParams, SceneRoute.COURSE_LIST>;
}

export interface CourseMapScreenProps {
  navigation: StackNavigationProp<CourseNavigatorParams, SceneRoute.COURSE_MAP>;
  route: RouteProp<CourseNavigatorParams, SceneRoute.COURSE_MAP>;
}

const Stack = createStackNavigator();

export const CourseNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.COURSE_LIST} component={CourseListScreen}/>    
    <Stack.Screen name={SceneRoute.COURSE_MAP} component={CourseMapScreen}/>
    <Stack.Screen name={NavigatorRoute.COURSE_DETAIL} component={CourseDetailNavigator}/>
  </Stack.Navigator>
);