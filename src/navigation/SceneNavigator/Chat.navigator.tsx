import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { NavigatorRoute, SceneRoute } from '../app.route';
import { AppNavigatorParams } from '../App.navigator';
import {
  ChatRoomSettingScene,
  ChatZoneSelectScene,
  ChatTASelectScene,
  ChatMainScene,
  ChatRoomScene,
  ChatReportScene
} from '../../scenes/Chat';
import { MainNavigatorParams } from '../Main.navigator';

const Stack = createStackNavigator();

export type ChatNavigatorParams = AppNavigatorParams & MainNavigatorParams & {
  [SceneRoute.CHAT]: undefined;
  [SceneRoute.CHATROOM]: {
    id: string;
    guide: {
      name: string;
      uid: string;
      avatar?: string;
    }
    day: Date,
    finish: boolean;
  };
  [SceneRoute.CHAT_HELP]: {
    id: string;
    guide: {
      name: string;
      uid: string;
    }
  };
  [SceneRoute.CHAT_REPORT]: {
    id: string;
    user: {
      name: string;
      uid: string;
    }
  };
  [SceneRoute.CHAT_ROOM_SETTING] : {
    id : string;
  };
  [SceneRoute.CHAT_ZONE_SELECT] : undefined;
  [SceneRoute.CHAT_TA_SELECT] : {
    zone : string;
  };
}

export interface ChatMainSceneProps {
  navigation: StackNavigationProp<ChatNavigatorParams, SceneRoute.CHAT>;
  route: RouteProp<ChatNavigatorParams, SceneRoute.CHAT>;
}

export interface ChatRoomSceneProps { 
  navigation: StackNavigationProp<ChatNavigatorParams, SceneRoute.CHATROOM>;
  route: RouteProp<ChatNavigatorParams, SceneRoute.CHATROOM>;
}

export interface ChatReportSceneProps { 
  navigation: StackNavigationProp<ChatNavigatorParams, SceneRoute.CHAT_REPORT>;
  route: RouteProp<ChatNavigatorParams, SceneRoute.CHAT_REPORT>;
}

export interface ChatRoomSettingSceneProps { 
  navigation: StackNavigationProp<ChatNavigatorParams, SceneRoute.CHAT_ROOM_SETTING>;
  route: RouteProp<ChatNavigatorParams, SceneRoute.CHAT_ROOM_SETTING>;
}

export interface ChatZoneSelectSceneProps {
  navigation: StackNavigationProp<ChatNavigatorParams, SceneRoute.CHAT_ZONE_SELECT>;
  route: RouteProp<ChatNavigatorParams, SceneRoute.CHAT_ZONE_SELECT>;
}

export interface ChatTASelectSceneProps {
  navigation: StackNavigationProp<ChatNavigatorParams, SceneRoute.CHAT_TA_SELECT>;
  route: RouteProp<ChatNavigatorParams, SceneRoute.CHAT_TA_SELECT>;
}

export const ChatNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.CHAT} component={ChatMainScene} />
    <Stack.Screen name={SceneRoute.CHAT_ZONE_SELECT} component={ChatZoneSelectScene} />
    <Stack.Screen name={SceneRoute.CHAT_TA_SELECT} component={ChatTASelectScene} />
    <Stack.Screen name={SceneRoute.CHATROOM} component={ChatRoomScene} />    
    <Stack.Screen name={SceneRoute.CHAT_ROOM_SETTING} component={ChatRoomSettingScene}/>
    <Stack.Screen name={SceneRoute.CHAT_REPORT} component={ChatReportScene} />
  </Stack.Navigator>
);