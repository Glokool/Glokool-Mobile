import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from '../app.route';
import { AppNavigatorParams } from '../app.navigator';
import { 
  ChatScreen
} from '../../scenes/Chat';

const Stack = createStackNavigator();

type ChatNavigatorParams = AppNavigatorParams & {
  [SceneRoute.CHAT]: undefined;
}

export interface ChatScreenProps {
  navigation: StackNavigationProp<ChatNavigatorParams, SceneRoute.CHAT>;
  route: RouteProp<ChatNavigatorParams, SceneRoute.CHAT>;
}

export const ChatNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.CHAT} component={ChatScreen}/>
  </Stack.Navigator>
);