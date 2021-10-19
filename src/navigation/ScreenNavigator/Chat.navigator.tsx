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
  ChatQuickRecommendationScene,
  ChatRoomSettingScene,
} from '../../scenes/Chat';
import { SeriesAInfoScreen, SeriesBInfoScreen, SeriesHiddenGemDetailScreen } from '../../scenes/Series';

const Stack = createStackNavigator();

export type ChatNavigatorParams = AppNavigatorParams & {
  [SceneRoute.CHAT]: undefined;
  [SceneRoute.CHATROOM] : {
    id : string;
    guide: {
      name : string;
      uid : string;
      token?: string;
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
    user: {
      name : string;
      uid : string;
    }
  };
  [SceneRoute.SERIES_A_DETAIL] : {
    Id : string;
  };
  [SceneRoute.SERIES_B_DETAIL] : {
    Id : string;
  };
  [SceneRoute.SERIES_HIDDEN_GEM_DETAIL] : {
    TourCode : string;
  };
  [SceneRoute.CHAT_QUICK_SEARCH]: undefined;
  [SceneRoute.CHAT_QUICK_RECOMMENDATION] : undefined;
  [SceneRoute.CHAT_ROOM_SETTING] : undefined;
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

export interface ChatQuickRecommendationProps { 
  navigation: StackNavigationProp<ChatNavigatorParams, SceneRoute.CHAT_QUICK_RECOMMENDATION>;
  route: RouteProp<ChatNavigatorParams, SceneRoute.CHAT_QUICK_RECOMMENDATION>;
}

export interface ChatRoomSettingProps { 
  navigation: StackNavigationProp<ChatNavigatorParams, SceneRoute.CHAT_ROOM_SETTING>;
  route: RouteProp<ChatNavigatorParams, SceneRoute.CHAT_ROOM_SETTING>;
}

export const ChatNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.CHAT} component={ChatScreen} />
    <Stack.Screen name={SceneRoute.SERIES_A_DETAIL} component={SeriesAInfoScreen} />
    <Stack.Screen name={SceneRoute.SERIES_B_DETAIL} component={SeriesBInfoScreen} />
    <Stack.Screen name={SceneRoute.SERIES_HIDDEN_GEM_DETAIL} component={SeriesHiddenGemDetailScreen} />

    <Stack.Screen name={SceneRoute.CHATROOM} component={ChatRoomScreen} />
    <Stack.Screen name={SceneRoute.CHAT_HELP} component={ChatHelpScreen} />
    <Stack.Screen name={SceneRoute.CHAT_REPORT} component={ChatReportScreen} />
    <Stack.Screen name={SceneRoute.CHAT_QUICK_SEARCH} component={ChatQuickSearch}/>
    <Stack.Screen name={SceneRoute.CHAT_QUICK_RECOMMENDATION} component={ChatQuickRecommendationScene}/>
    <Stack.Screen name={SceneRoute.CHAT_ROOM_SETTING} component={ChatRoomSettingScene}/>
  </Stack.Navigator>
);