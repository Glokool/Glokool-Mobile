import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from '../app.route';
import { AppNavigatorParams } from '../app.navigator';
import { 
  MYScreen,
  MySetting,
  PaidChatList
} from '../../scenes/My';
import { RefundPolicy } from '../../component/My/RefundPolicy';

type MyNavigatorParams = AppNavigatorParams & {
  [SceneRoute.MY]: undefined;
  [SceneRoute.REFUND_POLICY] : undefined;
  [SceneRoute.PAID_CHAT_LIST] : undefined;
  [SceneRoute.MY_SETTING] : undefined;
};

export interface MyScreenProps {
  navigation: StackNavigationProp<MyNavigatorParams, SceneRoute.MY>;
  route: RouteProp<MyNavigatorParams, SceneRoute.MY>;
}

export interface MYSettingProps {
  navigation: StackNavigationProp<MyNavigatorParams, SceneRoute.MY>;
  route: RouteProp<MyNavigatorParams, SceneRoute.MY>;
}

export interface PaidDetailProps {
  refundCode : string;
  visible: boolean;
  navigation: StackNavigationProp<MyNavigatorParams, SceneRoute.MY>;
}

export interface PaidChatListProps {
  navigation: StackNavigationProp<MyNavigatorParams, SceneRoute.PAID_CHAT_LIST>;
  route: RouteProp<MyNavigatorParams, SceneRoute.PAID_CHAT_LIST>;
}

export interface RefundPolicyProps {
  navigation: StackNavigationProp<MyNavigatorParams, SceneRoute.REFUND_POLICY>;
}

const Stack = createStackNavigator();

export const MyNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.MY} component={MYScreen}/>
    <Stack.Screen name={SceneRoute.MY_SETTING} component={MySetting}/>
    <Stack.Screen name={SceneRoute.REFUND_POLICY} component={RefundPolicy}/>
    <Stack.Screen name={SceneRoute.PAID_CHAT_LIST} component={PaidChatList}/>
  </Stack.Navigator>
);