import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from './app.route';
import { AppNavigatorParams } from './app.navigator';
import { PostCreateScreen, PostDetailScreen, PostModifyScreen, PostReportScreen , BoardScreen, BoardListScreen, ContentListScreen, ContentDetailScreen } from '../scenes/board/index'


type BoardNavigatorParams = AppNavigatorParams & {
  [SceneRoute.BOARD]: undefined;
  [SceneRoute.BOARD_LIST] : undefined;
  [SceneRoute.BOARD_POST_CREATE]: undefined;
  [SceneRoute.BOARD_POST_DETAIL]: {
    param: {
      item : any
    }
  };
  [SceneRoute.BOARD_POST_REPORT]: {
    param: {
      id : string
      type: string
    }
  };
  [SceneRoute.BOARD_POST_MODIFY]: {
    param: {
      id : string
      type : string
    }
  };

  [SceneRoute.CONTENT_LIST] : undefined;
  [SceneRoute.CONTENT_DETAIL] : {
    param: {
      id : string
    }
  }
}

export interface BoardScreenProps {
  navigation: StackNavigationProp<BoardNavigatorParams, SceneRoute.BOARD>;
  route: RouteProp<BoardNavigatorParams, SceneRoute.BOARD>;
}

export interface BoardListScreenProps {
  navigation: StackNavigationProp<BoardNavigatorParams, SceneRoute.BOARD_LIST>;
  route: RouteProp<BoardNavigatorParams, SceneRoute.BOARD_LIST>;
}

export interface PostCreateScreenProps {
    navigation: StackNavigationProp<BoardNavigatorParams, SceneRoute.BOARD_POST_CREATE>;
    route: RouteProp<BoardNavigatorParams, SceneRoute.BOARD_POST_CREATE>;
}

export interface PostDetailScreenProps {
    navigation: StackNavigationProp<BoardNavigatorParams, SceneRoute.BOARD_POST_DETAIL>;
    route: RouteProp<BoardNavigatorParams, SceneRoute.BOARD_POST_DETAIL>;
}

export interface PostModifyScreenProps {
  navigation: StackNavigationProp<BoardNavigatorParams, SceneRoute.BOARD_POST_MODIFY>;
  route: RouteProp<BoardNavigatorParams, SceneRoute.BOARD_POST_MODIFY>;
}

export interface PostReportScreenProps {
  navigation: StackNavigationProp<BoardNavigatorParams, SceneRoute.BOARD_POST_REPORT>;
  route: RouteProp<BoardNavigatorParams, SceneRoute.BOARD_POST_REPORT>;
}

export interface ContentListScreenProps {
  navigation: StackNavigationProp<BoardNavigatorParams, SceneRoute.CONTENT_LIST>;
  route: RouteProp<BoardNavigatorParams, SceneRoute.CONTENT_LIST>;
}

export interface ContentDetailScreenProps {
  navigation: StackNavigationProp<BoardNavigatorParams, SceneRoute.CONTENT_DETAIL>;
  route: RouteProp<BoardNavigatorParams, SceneRoute.CONTENT_DETAIL>;
}

const Stack = createStackNavigator();

export const BoardNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
       <Stack.Screen name={SceneRoute.BOARD} component={BoardScreen}/>

       <Stack.Screen name={SceneRoute.CONTENT_LIST} component={ContentListScreen}/>
       <Stack.Screen name={SceneRoute.CONTENT_DETAIL} component={ContentDetailScreen}/>

       <Stack.Screen name={SceneRoute.BOARD_LIST} component={BoardListScreen}/>
       <Stack.Screen name={SceneRoute.BOARD_POST_CREATE} component={PostCreateScreen}/>
       <Stack.Screen name={SceneRoute.BOARD_POST_DETAIL} component={PostDetailScreen}/>
       <Stack.Screen name={SceneRoute.BOARD_POST_REPORT} component={PostReportScreen}/>
       <Stack.Screen name={SceneRoute.BOARD_POST_MODIFY} component={PostModifyScreen}/>
  </Stack.Navigator>
);