import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from './app.route';
import { AppNavigatorParams } from './app.navigator';
import { SignupScreen, SigninScreen, EmailVerificationScreen, EmailFailScreen, PasswordResetScreen } from '../scenes/Auth1';

type AuthNavigatorParams = AppNavigatorParams & {
  [SceneRoute.SIGN_IN]: undefined;
  [SceneRoute.SIGN_UP]: undefined;
  [SceneRoute.EMAIL_VERIFICATION]: undefined;
  [SceneRoute.EMAIL_FAIL]: undefined;
  [SceneRoute.PASSWORD]: undefined;
}

export interface SignInScreenProps {
  navigation: StackNavigationProp<AuthNavigatorParams, SceneRoute.SIGN_IN>;
  route: RouteProp<AuthNavigatorParams, SceneRoute.SIGN_IN>;
}

export interface SignUpScreenProps {
  navigation: StackNavigationProp<AuthNavigatorParams, SceneRoute.SIGN_UP>;
  route: RouteProp<AuthNavigatorParams, SceneRoute.SIGN_UP>;
}

export interface EmailVerificationScreenProps {
  navigation: StackNavigationProp<AuthNavigatorParams, SceneRoute.SIGN_UP>;
  route: RouteProp<AuthNavigatorParams, SceneRoute.SIGN_UP>;
}

export interface EmailFailScreenProps {
  navigation: StackNavigationProp<AuthNavigatorParams, SceneRoute.EMAIL_FAIL>;
  route: RouteProp<AuthNavigatorParams, SceneRoute.EMAIL_FAIL>;
}

export interface PasswordResetScreenProps {
  navigation: StackNavigationProp<AuthNavigatorParams, SceneRoute.PASSWORD>;
  route: RouteProp<AuthNavigatorParams, SceneRoute.PASSWORD>;
}

const Stack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.SIGN_IN} component={SigninScreen}/>
    <Stack.Screen name={SceneRoute.SIGN_UP} component={SignupScreen}/>
    <Stack.Screen name={SceneRoute.EMAIL_VERIFICATION} component={EmailVerificationScreen}/>
    <Stack.Screen name={SceneRoute.EMAIL_FAIL} component={EmailFailScreen}/>
    <Stack.Screen name={SceneRoute.PASSWORD} component={PasswordResetScreen}/>
  </Stack.Navigator>
);
