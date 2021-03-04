import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from './app.route';
import { AppNavigatorParams } from './app.navigator';
import { 
  MyPageScreen, 
  MyPageSettingScreen,
  MyPageCustomerServiceScreen,
  MyPageNotificationScreen,
  MyPagePrivacyConfirmScreen,
  MyPagePrivacyLoginScreen,
  MyPagePrivacyScreen,
  MyPageProfileScreen,
  MyPageFAQScreen
} from '../scenes/my_page';

type MyPageNavigatorParams = AppNavigatorParams & {
  [SceneRoute.MY_PAGE]: undefined;
  [SceneRoute.MY_PAGE_SETTING]: undefined;
  [SceneRoute.MY_PAGE_CUSTOMERSERVICE] : undefined;
  [SceneRoute.MY_PAGE_NOTIFICATION] : undefined;
  [SceneRoute.MY_PAGE_PRIVACY] : undefined;
  [SceneRoute.MY_PAGE_PRIVACY_CONFIRM] : undefined;
  [SceneRoute.MY_PAGE_PRIVACY_LOGIN] : undefined;
  [SceneRoute.MY_PAGE_PROFILE] : undefined;
  [SceneRoute.MY_PAGE_FAQ] : undefined;
}

export interface MyPageScreenProps {
  navigation: StackNavigationProp<MyPageNavigatorParams, SceneRoute.MY_PAGE>;
  route: RouteProp<MyPageNavigatorParams, SceneRoute.MY_PAGE>;
}

export interface MyPageSettingScreenProps {
  navigation: StackNavigationProp<MyPageNavigatorParams, SceneRoute.MY_PAGE_SETTING>;
  route: RouteProp<MyPageNavigatorParams, SceneRoute.MY_PAGE_SETTING>;
}

export interface MyPageCustomerServiceScreenProps {
  navigation: StackNavigationProp<MyPageNavigatorParams, SceneRoute.MY_PAGE_CUSTOMERSERVICE>;
  route: RouteProp<MyPageNavigatorParams, SceneRoute.MY_PAGE_CUSTOMERSERVICE>;
}

export interface MyPageNotificationScreenProps {
  navigation: StackNavigationProp<MyPageNavigatorParams, SceneRoute.MY_PAGE_NOTIFICATION>;
  route: RouteProp<MyPageNavigatorParams, SceneRoute.MY_PAGE_NOTIFICATION>;
}

export interface MyPagePrivacyScreenProps {
  navigation: StackNavigationProp<MyPageNavigatorParams, SceneRoute.MY_PAGE_PRIVACY>;
  route: RouteProp<MyPageNavigatorParams, SceneRoute.MY_PAGE_PRIVACY>;
}

export interface MyPagePrivacyConfirmScreenProps {
  navigation: StackNavigationProp<MyPageNavigatorParams, SceneRoute.MY_PAGE_PRIVACY_CONFIRM>;
  route: RouteProp<MyPageNavigatorParams, SceneRoute.MY_PAGE_PRIVACY_CONFIRM>;
}

export interface MyPagePrivacyLoginScreenProps {
  navigation: StackNavigationProp<MyPageNavigatorParams, SceneRoute.MY_PAGE_PRIVACY_LOGIN>;
  route: RouteProp<MyPageNavigatorParams, SceneRoute.MY_PAGE_PRIVACY_LOGIN>;
}

export interface MyPageProfileScreenProps {
  navigation: StackNavigationProp<MyPageNavigatorParams, SceneRoute.MY_PAGE_PROFILE>;
  route: RouteProp<MyPageNavigatorParams, SceneRoute.MY_PAGE_PROFILE>;
}

export interface MyPageFAQScreenProps {
  navigation: StackNavigationProp<MyPageNavigatorParams, SceneRoute.MY_PAGE_FAQ>;
  route: RouteProp<MyPageNavigatorParams, SceneRoute.MY_PAGE_FAQ>;
}

const Stack = createStackNavigator();

export const MyPageNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.MY_PAGE} component={MyPageScreen}/>
    <Stack.Screen name={SceneRoute.MY_PAGE_SETTING} component={MyPageSettingScreen}/>
    <Stack.Screen name={SceneRoute.MY_PAGE_CUSTOMERSERVICE} component={MyPageCustomerServiceScreen}/>
    <Stack.Screen name={SceneRoute.MY_PAGE_NOTIFICATION} component={MyPageNotificationScreen}/>
    <Stack.Screen name={SceneRoute.MY_PAGE_PRIVACY} component={MyPagePrivacyScreen}/>
    <Stack.Screen name={SceneRoute.MY_PAGE_PRIVACY_CONFIRM} component={MyPagePrivacyConfirmScreen}/>
    <Stack.Screen name={SceneRoute.MY_PAGE_PRIVACY_LOGIN} component={MyPagePrivacyLoginScreen}/>
    <Stack.Screen name={SceneRoute.MY_PAGE_PROFILE} component={MyPageProfileScreen}/>
    <Stack.Screen name={SceneRoute.MY_PAGE_FAQ} component={MyPageFAQScreen}/>
  </Stack.Navigator>
);