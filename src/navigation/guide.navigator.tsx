import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from './app.route';
import { AppNavigatorParams } from './app.navigator';
import { 
  GuideChatScreen,
  GuideScreen,
  GuideErrorScreen,
  GuideReportScreen
} from '../scenes/guide';

type GuideNavigatorParams = AppNavigatorParams & {
  [SceneRoute.GUIDE]: undefined;
  [SceneRoute.GUIDE_CHAT]: undefined;
  [SceneRoute.GUIDE_ERROR]: undefined;
  [SceneRoute.GUIDE_REPORT]: undefined;
}

export interface GuideScreenProps {
  navigation: StackNavigationProp<GuideNavigatorParams, SceneRoute.GUIDE>;
  route: RouteProp<GuideNavigatorParams, SceneRoute.GUIDE>;
}

export interface GuideChatScreenProps {
  navigation: StackNavigationProp<GuideNavigatorParams, SceneRoute.GUIDE_CHAT>;
  route: RouteProp<GuideNavigatorParams, SceneRoute.GUIDE_CHAT>;
}

export interface GuideChatScreenProps {
  navigation: StackNavigationProp<GuideNavigatorParams, SceneRoute.GUIDE_CHAT>;
  route: RouteProp<GuideNavigatorParams, SceneRoute.GUIDE_CHAT>;
}

export interface GuideErrorScreenProps {
  navigation: StackNavigationProp<GuideNavigatorParams, SceneRoute.GUIDE_ERROR>;
  route: RouteProp<GuideNavigatorParams, SceneRoute.GUIDE_ERROR>;
}

export interface GuideReportScreenProps {
  navigation: StackNavigationProp<GuideNavigatorParams, SceneRoute.GUIDE_REPORT>;
  route: RouteProp<GuideNavigatorParams, SceneRoute.GUIDE_REPORT>;
}




const Stack = createStackNavigator();

export const GuideNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.GUIDE} component={GuideChatScreen}/>
    <Stack.Screen name={SceneRoute.GUIDE_CHAT} component={GuideScreen}/>
    <Stack.Screen name={SceneRoute.GUIDE_ERROR} component={GuideErrorScreen}/>
    <Stack.Screen name={SceneRoute.GUIDE_REPORT} component={GuideReportScreen}/>
  </Stack.Navigator>
);