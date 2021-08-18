import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from '../app.route';
import { AppNavigatorParams } from '../app.navigator';
import { 
  ChatScreen,
  ChatRoomScreen,
  ChatHelpScreen,
  ChatReportScreen,
  ChatQuickSearch,
} from '../../scenes/Chat';
import { SeriesAInfoScreen } from '../../scenes/Series';

const Stack = createStackNavigator();

type ChatNavigatorParams = AppNavigatorParams & {
  [SceneRoute.CHAT]: undefined;
  [SceneRoute.CHATROOM] : {
    id : string;
    guide: {
      name : string;
      uid : string;
    }
    day: Date,
    finish : boolean;
  };
  [SceneRoute.CHAT_HELP] : {    
    id : string;
    guide: {
      name : string;
      uid : string;
    }};
  [SceneRoute.CHAT_REPORT] : {
    id : string;
    guide: {
      name : string;
      uid : string;
    }
  };
  [SceneRoute.SERIES_A_DETAIL] : {
    Id : string;
  };
  [SceneRoute.CHAT_QUICK_SEARCH]: undefined;
}

export interface ChatScreenProps {
  navigation: StackNavigationProp<ChatNavigatorParams, SceneRoute.CHAT>;
  route: RouteProp<ChatNavigatorParams, SceneRoute.CHAT>;
}

export interface ChatListNowProps {
  navigation: StackNavigationProp<ChatNavigatorParams, SceneRoute.CHAT>;
  route: RouteProp<ChatNavigatorParams, SceneRoute.CHAT>;
}

export interface ChatListRecentProps { 
  navigation: StackNavigationProp<ChatNavigatorParams, SceneRoute.CHAT>;
  route: RouteProp<ChatNavigatorParams, SceneRoute.CHAT>;
}

export interface ChatRoomScreenProps { 
  navigation: StackNavigationProp<ChatNavigatorParams, SceneRoute.CHATROOM>;
  route: RouteProp<ChatNavigatorParams, SceneRoute.CHATROOM>;
}

export interface ChatHelpScreenProps { 
  navigation: StackNavigationProp<ChatNavigatorParams, SceneRoute.CHAT_HELP>;
  route: RouteProp<ChatNavigatorParams, SceneRoute.CHAT_HELP>;
}

export interface ChatReportScreenProps { 
  navigation: StackNavigationProp<ChatNavigatorParams, SceneRoute.CHAT_REPORT>;
  route: RouteProp<ChatNavigatorParams, SceneRoute.CHAT_REPORT>;
}

export interface ChatQuickSearchProps { 
  navigation: StackNavigationProp<ChatNavigatorParams, SceneRoute.CHAT_QUICK_SEARCH>;
  route: RouteProp<ChatNavigatorParams, SceneRoute.CHAT_QUICK_SEARCH>;
}

export const ChatNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.CHAT} component={ChatScreen} />
    <Stack.Screen name={SceneRoute.SERIES_A_DETAIL} component={SeriesAInfoScreen} />
    <Stack.Screen name={SceneRoute.CHATROOM} component={ChatRoomScreen} />
    <Stack.Screen name={SceneRoute.CHAT_HELP} component={ChatHelpScreen} />
    <Stack.Screen name={SceneRoute.CHAT_REPORT} component={ChatReportScreen} />
    <Stack.Screen name={SceneRoute.CHAT_QUICK_SEARCH} component={ChatQuickSearch}/>
  </Stack.Navigator>
);