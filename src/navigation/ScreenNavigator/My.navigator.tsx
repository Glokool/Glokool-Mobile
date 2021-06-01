import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from '../app.route';
import { AppNavigatorParams } from '../app.navigator';
import { 
  CustomerService,
  FAQ,
  MYScreen,
  MySetting,
  PaidChatList,
  Privacy,
  PrivacyConfirm,
  PrivacyLogin,
} from '../../scenes/My';
import { RefundPolicy } from '../../component/My/RefundPolicy';

type MyNavigatorParams = AppNavigatorParams & {
  [SceneRoute.MY]: undefined;
  [SceneRoute.REFUND_POLICY] : undefined;
  [SceneRoute.PAID_CHAT_LIST] : undefined;
  [SceneRoute.MY_SETTING] : undefined;
  [SceneRoute.PRIVACY] : undefined;
  [SceneRoute.PRIVACY_CONFIRM] : undefined;
  [SceneRoute.PRIVACY_LOGIN] : undefined;
  [SceneRoute.CUSTOMER_SERVICE] : undefined;
  [SceneRoute.FAQ] : undefined;
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



const Stack = createStackNavigator();

export const MyNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.MY} component={MYScreen}/>
    <Stack.Screen name={SceneRoute.MY_SETTING} component={MySetting}/>
    <Stack.Screen name={SceneRoute.REFUND_POLICY} component={RefundPolicy}/>
    <Stack.Screen name={SceneRoute.PAID_CHAT_LIST} component={PaidChatList}/>

    <Stack.Screen name={SceneRoute.CUSTOMER_SERVICE} component={CustomerService}/>
    <Stack.Screen name={SceneRoute.FAQ} component={FAQ}/>

    <Stack.Screen name={SceneRoute.PRIVACY} component={Privacy}/>
    <Stack.Screen name={SceneRoute.PRIVACY_CONFIRM} component={PrivacyConfirm}/>
    <Stack.Screen name={SceneRoute.PRIVACY_LOGIN} component={PrivacyLogin}/>

  </Stack.Navigator>
);