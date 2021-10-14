import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { SceneRoute } from '../app.route';
import { AppNavigatorParams } from '../app.navigator';
import { PayFirstScene, PaySecondScene, PayFailedScene, CancellationPolicy, PayProcessScene, PaySuccessScene } from '../../scenes/Pay';

type PayNavigatorParams = AppNavigatorParams & {
    [SceneRoute.PAY_FIRST]: undefined;
    [SceneRoute.PAY_SECOND]: {
        name: string;
        email: string;
        snsID?: {
            type: string;
            value: string;
        };
        phone?: {
            type: string | undefined;
            value: string;
        };
    };
    [SceneRoute.PAY_FAILED]: undefined;
    [SceneRoute.PAY_CANCELLATION]: undefined;
    [SceneRoute.PAY_PROCESS]: {
        params: {
            pg: string;
            pay_method: string;
            name: string;
            merchant_uid: string;
            amount: number,
            buyer_name: string;
            buyer_tel: string;
            buyer_email: string;
            buyer_addr: string;
            buyer_postcode: string;
            app_scheme: string;
        };
        ReservationData: {
            name: string;
            email: string;
            snsID?: {
                type: string;
                value: string;
            };
            phone?: {
                type: string | undefined;
                value: string;
            };
        };
    };
    //
    [SceneRoute.PAY_SUCCESS]: undefined;

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

export interface CancellationPolicyProps {
    navigation: StackNavigationProp<PayNavigatorParams, SceneRoute.PAY_CANCELLATION>;
}

export interface PayProcessSceneProps {
    navigation: StackNavigationProp<PayNavigatorParams, SceneRoute.PAY_PROCESS>;
    route: RouteProp<PayNavigatorParams, SceneRoute.PAY_PROCESS>;
}

export interface PaySuccessSceneProps {
    navigation: StackNavigationProp<PayNavigatorParams, SceneRoute.PAY_SUCCESS>;
    route: RouteProp<PayNavigatorParams, SceneRoute.PAY_SUCCESS>;
}

const Stack = createStackNavigator();

export const PayNavigator = (): React.ReactElement => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name={SceneRoute.PAY_FIRST} component={PayFirstScene} />
        <Stack.Screen name={SceneRoute.PAY_SECOND} component={PaySecondScene} />
        <Stack.Screen name={SceneRoute.PAY_FAILED} component={PayFailedScene} />
        <Stack.Screen name={SceneRoute.PAY_CANCELLATION} component={CancellationPolicy} />
        <Stack.Screen name={SceneRoute.PAY_PROCESS} component={PayProcessScene} />
        <Stack.Screen name={SceneRoute.PAY_SUCCESS} component={PaySuccessScene} />
    </Stack.Navigator>
);