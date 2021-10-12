import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { NavigatorRoute, SceneRoute } from './app.route';
import { AppNavigatorParams } from './app.navigator';
import { BookFirstScreen, BookSecondScreen, BookThirdScreen, PaymentScreen, BookFouthScreen } from '../scenes/Book';
import { CallbackRsp } from 'iamport-react-native';
import { RefundPolicy } from '../component/Booking';
import { PayFirstScene, PaySecondScene, PayFailedScene } from '../scenes/Pay';

type PayNavigatorParams = AppNavigatorParams & {
    [SceneRoute.PAY_FIRST]: undefined;
    [SceneRoute.PAY_SECOND]: undefined;
    [SceneRoute.PAY_FAILED]: undefined;
}

export interface PayFirstSceneProps {
    navigation: StackNavigationProp<PayNavigatorParams, SceneRoute.PAY_FIRST>;
    route: RouteProp<PayNavigatorParams, SceneRoute.PAY_FIRST>;
}

export interface PaySecondSceneProps {
    navigation: StackNavigationProp<PayNavigatorParams, SceneRoute.PAY_SECOND>;
    route: RouteProp<PayNavigatorParams, SceneRoute.PAY_SECOND>;
}

export interface PayFailedSceneProps {
    navigation: StackNavigationProp<PayNavigatorParams, SceneRoute.PAY_FAILED>;
    route: RouteProp<PayNavigatorParams, SceneRoute.PAY_FAILED>;
}

const Stack = createStackNavigator();

export const PayNavigator = (): React.ReactElement => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name={SceneRoute.PAY_FIRST} component={PayFirstScene} />
        <Stack.Screen name={SceneRoute.PAY_SECOND} component={PaySecondScene} />
        <Stack.Screen name={SceneRoute.PAY_FAILED} component={PayFailedScene} />
    </Stack.Navigator>
);