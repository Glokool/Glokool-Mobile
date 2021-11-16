import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { SceneRoute } from '../app.route';
import { AppNavigatorParams } from '../App.navigator';
import {
  CustomerServiceComponent,
  FAQ,
  MYScreen,
  MySetting,
  PaidChatList,
  Privacy,
  PrivacyConfirm,
  PrivacyLogin,
  MyProfile,
  HistoryScreen,
  RefundPolicy
} from '../../scenes/My';
import { ZoneDetailBlogScene, ZoneDetailContentScene } from '../../scenes/Zone';
import { ChatRoomScene } from '../../scenes/Chat';
import { ChatNavigatorParams } from '../../navigation/SceneNavigator/Chat.navigator';
import { authContextType, ReceiptDetailInfo, ReservationInfo } from '../../types';
import { MainNavigatorParams } from '../Main.navigator';
import { MyHistoryChatScene } from '../../scenes/My/My.HistoryChat.scene';

type MyNavigatorParams = AppNavigatorParams & MainNavigatorParams & {
  [SceneRoute.MY]: undefined;
  [SceneRoute.REFUND_POLICY]: undefined;
  [SceneRoute.PAID_CHAT_LIST]: undefined;
  [SceneRoute.MY_SETTING]: undefined;
  [SceneRoute.PRIVACY]: undefined;
  [SceneRoute.PRIVACY_CONFIRM]: undefined;
  [SceneRoute.PRIVACY_LOGIN]: undefined;
  [SceneRoute.CUSTOMER_SERVICE]: undefined;
  [SceneRoute.FAQ]: undefined;
  [SceneRoute.MY_PROFILE]: undefined;
  [SceneRoute.HISTORY]: undefined;
  [SceneRoute.CHATROOM] : {
      id: string;
      guide: {
        name: string;
        uid: string;
        avatar?: string;
      }
      day: string,
      zone: string;
      maxUser: number;
      finish: boolean;
    };
};

export interface MyScreenProps {
  navigation: StackNavigationProp<MyNavigatorParams, SceneRoute.MY>;
  route: RouteProp<MyNavigatorParams, SceneRoute.MY>;
  currentUser: authContextType;
}

export interface MYProfileProps {
  navigation: StackNavigationProp<MyNavigatorParams, SceneRoute.MY_PROFILE>;
  route: RouteProp<MyNavigatorParams, SceneRoute.MY_PROFILE>;
}

export interface MYSettingProps {
  navigation: StackNavigationProp<MyNavigatorParams, SceneRoute.MY>;
  route: RouteProp<MyNavigatorParams, SceneRoute.MY>;
}

export interface PaidDetailProps {
  data?: ReceiptDetailInfo | undefined;
  id: string;
}

export interface PaidChatListProps {
  navigation: StackNavigationProp<MyNavigatorParams, SceneRoute.PAID_CHAT_LIST>;
  route: RouteProp<MyNavigatorParams, SceneRoute.PAID_CHAT_LIST>;
}

export interface RefundPolicyProps {
  navigation: StackNavigationProp<MyNavigatorParams, SceneRoute.REFUND_POLICY>;
}

export interface PrivacyProps {
  navigation: StackNavigationProp<MyNavigatorParams, SceneRoute.PRIVACY>;
  route: RouteProp<MyNavigatorParams, SceneRoute.PRIVACY>;
}

export interface PrivacyConfirmProps {
  navigation: StackNavigationProp<MyNavigatorParams, SceneRoute.PRIVACY_CONFIRM>;
  route: RouteProp<MyNavigatorParams, SceneRoute.PRIVACY_CONFIRM>;
}

export interface PrivacyLoginProps {
  navigation: StackNavigationProp<MyNavigatorParams, SceneRoute.PRIVACY_LOGIN>;
  route: RouteProp<MyNavigatorParams, SceneRoute.PRIVACY_LOGIN>;
}

export interface CustomerServiceProps {
  navigation: StackNavigationProp<MyNavigatorParams, SceneRoute.CUSTOMER_SERVICE>;
  route: RouteProp<MyNavigatorParams, SceneRoute.CUSTOMER_SERVICE>;
}

export interface FAQProps {
  navigation: StackNavigationProp<MyNavigatorParams, SceneRoute.FAQ>;
  route: RouteProp<MyNavigatorParams, SceneRoute.FAQ>;
}

export interface HistoryScreenProps {
  navigation: StackNavigationProp<MyNavigatorParams, SceneRoute.HISTORY>;
  route: RouteProp<MyNavigatorParams, SceneRoute.HISTORY>;
}

export interface MyHistoryChatSceneProps {
  navigation: StackNavigationProp<ChatNavigatorParams, SceneRoute.CHATROOM>;
  route: RouteProp<ChatNavigatorParams, SceneRoute.CHATROOM>;
}



const Stack = createStackNavigator();

export const MyNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>

    <Stack.Screen name={SceneRoute.MY} component={MYScreen} />
    <Stack.Screen name={SceneRoute.MY_SETTING} component={MySetting} />
    <Stack.Screen name={SceneRoute.MY_PROFILE} component={MyProfile} />
    <Stack.Screen name={SceneRoute.REFUND_POLICY} component={RefundPolicy} />
    <Stack.Screen name={SceneRoute.PAID_CHAT_LIST} component={PaidChatList} />
    <Stack.Screen name={SceneRoute.HISTORY} component={HistoryScreen} />

    <Stack.Screen name={SceneRoute.CUSTOMER_SERVICE} component={CustomerServiceComponent} />
    <Stack.Screen name={SceneRoute.FAQ} component={FAQ} />

    <Stack.Screen name={SceneRoute.PRIVACY} component={Privacy} />
    <Stack.Screen name={SceneRoute.PRIVACY_CONFIRM} component={PrivacyConfirm} />
    <Stack.Screen name={SceneRoute.PRIVACY_LOGIN} component={PrivacyLogin} />

    <Stack.Screen name={SceneRoute.CHATROOM} component={MyHistoryChatScene} />

  </Stack.Navigator>
);