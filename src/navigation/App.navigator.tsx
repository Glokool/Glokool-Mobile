import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigator } from './Auth.navigator';
import { MainNavigator } from './Main.navigator';
import { PayNavigator } from './Pay.navigator';
import { NavigatorRoute, SceneRoute } from './app.route';
import { ReservationData_FIRST } from '../types';
import { ChatInfoScene } from '../scenes/Chat';

export type AppNavigatorParams = {
    [NavigatorRoute.AUTH]: {
        screen: SceneRoute,
        params: undefined
    } | undefined;
    [NavigatorRoute.MAIN]: {
        screen: SceneRoute,
        params: undefined
    } | undefined;
    [NavigatorRoute.PAY]: {
        screen: SceneRoute,
        params: ReservationData_FIRST;
    } | undefined;
    [SceneRoute.CHAT_INFO]: undefined;

};

const Stack = createStackNavigator();

export const AppNavigator = (props: React.ReactElement): React.ReactElement => {

    return (
        <Stack.Navigator {...props} headerMode="none">
            <Stack.Screen name={NavigatorRoute.MAIN} component={MainNavigator} />
            <Stack.Screen name={NavigatorRoute.AUTH} component={AuthNavigator} />
            <Stack.Screen name={NavigatorRoute.PAY} component={PayNavigator} />
            <Stack.Screen name={SceneRoute.CHAT_INFO} component={ChatInfoScene} />
        </Stack.Navigator>
    )

};
