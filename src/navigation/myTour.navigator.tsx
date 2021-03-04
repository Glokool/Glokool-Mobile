import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { NavigatorRoute, SceneRoute } from './app.route';
import { AppNavigatorParams } from './app.navigator';
import { 
  MyTourScreen,
  MyTourDetailScreen, 
  MyTourAllLocationScreen,
  MyTourReportScreen
} from '../scenes/my_tour';
import { AttractionNavigator } from './attraction.navigator';
import { RestaurantNavigator } from './restaurant.navigator'
import { CafeNavigator } from './cafe.navigator';
import { CourseNavigator } from './course.navigator';
import { MyTourChatScreen, MyTourReportErrorScreen, MyTourReportGuideScreen } from '../scenes/my_tour/chat'

type MyTourNavigatorParams = AppNavigatorParams & {
  [SceneRoute.MY_TOUR]: undefined;
  [SceneRoute.MY_TOUR_CHAT]: undefined;
  [SceneRoute.MY_TOUR_DETAIL]: undefined;
  [SceneRoute.MY_TOUR_MAP]: undefined;
  [SceneRoute.MY_TOUR_ALL_LOCATION]: undefined;
  [SceneRoute.MY_TOUR_REPORT]: undefined;
  [SceneRoute.MY_TOUR_REPORT_ERROR]: undefined;
  [SceneRoute.MY_TOUR_REPORT_GUIDE]: undefined;
}

export interface MyTourScreenProps {
  navigation: StackNavigationProp<MyTourNavigatorParams, SceneRoute.MY_TOUR>;
  route: RouteProp<MyTourNavigatorParams, SceneRoute.MY_TOUR>;
}

export interface MyTourChatScreenProps {
  navigation: StackNavigationProp<MyTourNavigatorParams, SceneRoute.MY_TOUR_CHAT>;
  route: RouteProp<MyTourNavigatorParams, SceneRoute.MY_TOUR_CHAT>;
}

export interface MyTourDetailScreenProps {
  navigation: StackNavigationProp<MyTourNavigatorParams, SceneRoute.MY_TOUR_DETAIL>;
  route: RouteProp<MyTourNavigatorParams, SceneRoute.MY_TOUR_DETAIL>;
}

export interface MyTourAllLocationScreenProps {
  navigation: StackNavigationProp<MyTourNavigatorParams, SceneRoute.MY_TOUR_ALL_LOCATION>;
  route: RouteProp<MyTourNavigatorParams, SceneRoute.MY_TOUR_ALL_LOCATION>;
}

export interface MyTourReportScreenProps {
  navigation: StackNavigationProp<MyTourNavigatorParams, SceneRoute.MY_TOUR_REPORT>;
  route: RouteProp<MyTourNavigatorParams, SceneRoute.MY_TOUR_REPORT>;
}

export interface MyTourReportErrorScreenProps {
  navigation: StackNavigationProp<MyTourNavigatorParams, SceneRoute.MY_TOUR_REPORT_ERROR>;
  route: RouteProp<MyTourNavigatorParams, SceneRoute.MY_TOUR_REPORT_ERROR>;
}

export interface MyTourReportGuideScreenProps {
  navigation: StackNavigationProp<MyTourNavigatorParams, SceneRoute.MY_TOUR_REPORT_GUIDE>;
  route: RouteProp<MyTourNavigatorParams, SceneRoute.MY_TOUR_REPORT_GUIDE>;
}



const Stack = createStackNavigator();

export const MyTourNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.MY_TOUR} component={MyTourScreen}/>
    <Stack.Screen name={SceneRoute.MY_TOUR_CHAT} component={MyTourChatScreen}/>
    <Stack.Screen name={SceneRoute.MY_TOUR_REPORT_ERROR} component={MyTourReportErrorScreen}/>
    <Stack.Screen name={SceneRoute.MY_TOUR_REPORT_GUIDE} component={MyTourReportGuideScreen}/>
    <Stack.Screen name={SceneRoute.MY_TOUR_DETAIL} component={MyTourDetailScreen}/>
    <Stack.Screen name={SceneRoute.MY_TOUR_ALL_LOCATION} component={MyTourAllLocationScreen}/>
    <Stack.Screen name={SceneRoute.MY_TOUR_REPORT} component={MyTourReportScreen}/>
    <Stack.Screen name={NavigatorRoute.COURSE} component={CourseNavigator}/>
    <Stack.Screen name={NavigatorRoute.ATTRACTION} component={AttractionNavigator}/>
    <Stack.Screen name={NavigatorRoute.RESTAURANT} component={RestaurantNavigator}/>
    <Stack.Screen name={NavigatorRoute.CAFE} component={CafeNavigator}/>
  </Stack.Navigator>
);