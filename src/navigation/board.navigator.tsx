import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from './app.route';
import { AppNavigatorParams } from './app.navigator';
import { PostCreateScreen, PostDetailScreen, BoardScreen } from '../scenes/board/index'


type BoardNavigatorParams = AppNavigatorParams & {
  [SceneRoute.BOARD]: undefined;
  [SceneRoute.BOARD_POST_CREATE]: undefined;
  [SceneRoute.BOARD_POST_DETAIL]: undefined;
}

export interface BoardScreenProps {
  navigation: StackNavigationProp<BoardNavigatorParams, SceneRoute.BOARD>;
  route: RouteProp<BoardNavigatorParams, SceneRoute.BOARD>;
}

export interface PostCreateScreenProps {
    navigation: StackNavigationProp<BoardNavigatorParams, SceneRoute.BOARD_POST_CREATE>;
    route: RouteProp<BoardNavigatorParams, SceneRoute.BOARD_POST_CREATE>;
}

export interface PostDetailScreenProps {
    navigation: StackNavigationProp<BoardNavigatorParams, SceneRoute.BOARD_POST_CREATE>;
    route: RouteProp<BoardNavigatorParams, SceneRoute.BOARD_POST_CREATE>;
}

const Stack = createStackNavigator();

export const BoardNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
       <Stack.Screen name={SceneRoute.BOARD} component={BoardScreen}/>
       <Stack.Screen name={SceneRoute.BOARD_POST_CREATE} component={PostCreateScreen}/>
       <Stack.Screen name={SceneRoute.BOARD_POST_DETAIL} component={PostDetailScreen}/>
  </Stack.Navigator>
);