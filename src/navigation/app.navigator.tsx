import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigator } from './Auth.navigator';
import { MainNavigator } from './Main.navigator';
import { BookNavigator } from './Book.navigator';
import { PayNavigator } from './Pay/Pay.navigator';
import { NavigatorRoute, SceneRoute } from './app.route';
import { BookmarkNavigator } from './Bookmark.navigator';
import { CallbackRsp } from 'iamport-react-native';

export type AppNavigatorParams = {
    [NavigatorRoute.AUTH]: undefined;
    [NavigatorRoute.MAIN]: undefined;
    [NavigatorRoute.BOOK]: {
        screen: SceneRoute,
        params: {
            response: CallbackRsp,
            ReservationData: any,
        }
    };
    [NavigatorRoute.BOOKMARK]: undefined;
};

const Stack = createStackNavigator();

export const AppNavigator = (props: React.ReactElement): React.ReactElement => {

    return (
        <Stack.Navigator {...props} headerMode="none">
            <Stack.Screen name={NavigatorRoute.MAIN} component={MainNavigator} />
            <Stack.Screen name={NavigatorRoute.AUTH} component={AuthNavigator} />
            <Stack.Screen name={NavigatorRoute.BOOK} component={BookNavigator} />
            <Stack.Screen name={NavigatorRoute.BOOKMARK} component={BookmarkNavigator} />
            <Stack.Screen name={NavigatorRoute.PAY} component={PayNavigator} />
        </Stack.Navigator>
    )

};
