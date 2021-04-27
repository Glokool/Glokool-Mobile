import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from './app.route';
import { AppNavigatorParams } from './app.navigator';
import { HomeScreen } from '../scenes/home';
import { ContentScreen, ContentListScreen } from '../scenes/contents'

type HomeNavigatorParams = AppNavigatorParams & {
    [SceneRoute.HOME] : undefined;
    [SceneRoute.CONTENT] : {
      param : {
        id : string
      }
    }
    [SceneRoute.CONTENT_LIST] : undefined
}
  
export interface HomeScreenProps {
    navigation: StackNavigationProp<HomeNavigatorParams, SceneRoute.HOME>;
    route: RouteProp<HomeNavigatorParams, SceneRoute.HOME>;
}

export interface ContentScreenProps {
  navigation: StackNavigationProp<HomeNavigatorParams, SceneRoute.CONTENT>;
  route: RouteProp<HomeNavigatorParams, SceneRoute.CONTENT>;
}

export interface ContentListScreenProps {
  navigation: StackNavigationProp<HomeNavigatorParams, SceneRoute.CONTENT_LIST>;
  route: RouteProp<HomeNavigatorParams, SceneRoute.CONTENT_LIST>;
}

const Stack = createStackNavigator();

export const HomeNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.HOME} component={HomeScreen}/>
    <Stack.Screen name={SceneRoute.CONTENT_LIST} component={ContentListScreen}/>
    <Stack.Screen name={SceneRoute.CONTENT} component={ContentScreen}/>
  </Stack.Navigator>
);