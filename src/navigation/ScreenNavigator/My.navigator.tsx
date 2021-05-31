import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from '../app.route';
import { AppNavigatorParams } from '../app.navigator';
import { 
  MyPageSettingScreen,
  MyPageCustomerServiceScreen,
  MyPageNotificationScreen,
  MyPagePrivacyConfirmScreen,
  MyPagePrivacyLoginScreen,
  MyPagePrivacyScreen,
  MyPageProfileScreen,
  MyPageFAQScreen,
  MYScreen
} from '../../scenes/My';

type MyNavigatorParams = AppNavigatorParams & {
  [SceneRoute.MY]: undefined;

};

export interface MyScreenProps {
  navigation: StackNavigationProp<MyNavigatorParams, SceneRoute.MY>;
  route: RouteProp<MyNavigatorParams, SceneRoute.MY>;
}



const Stack = createStackNavigator();

export const MyNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.MY} component={MYScreen}/>
    {/* <Stack.Screen name={SceneRoute.MY_PAGE_SETTING} component={MyPageSettingScreen}/>
    <Stack.Screen name={SceneRoute.MY_PAGE_CUSTOMERSERVICE} component={MyPageCustomerServiceScreen}/>
    <Stack.Screen name={SceneRoute.MY_PAGE_NOTIFICATION} component={MyPageNotificationScreen}/>
    <Stack.Screen name={SceneRoute.MY_PAGE_PRIVACY} component={MyPagePrivacyScreen}/>
    <Stack.Screen name={SceneRoute.MY_PAGE_PRIVACY_CONFIRM} component={MyPagePrivacyConfirmScreen}/>
    <Stack.Screen name={SceneRoute.MY_PAGE_PRIVACY_LOGIN} component={MyPagePrivacyLoginScreen}/>
    <Stack.Screen name={SceneRoute.MY_PAGE_PROFILE} component={MyPageProfileScreen}/>
    <Stack.Screen name={SceneRoute.MY_PAGE_FAQ} component={MyPageFAQScreen}/> */}
  </Stack.Navigator>
);