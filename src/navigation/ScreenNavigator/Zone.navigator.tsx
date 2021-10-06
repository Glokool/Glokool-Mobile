import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from '../app.route';
import { AppNavigatorParams } from '../app.navigator';
import { ZoneMainScene } from '../../scenes/Zone';

const Stack = createStackNavigator();

export type ZoneNavigatorParams = AppNavigatorParams & {
    [SceneRoute.ZONE_MAIN]: undefined;
}

export interface ZoneMainSceneProps {
    navigation: StackNavigationProp<ZoneNavigatorParams, SceneRoute.ZONE_MAIN>;
    route: RouteProp<ZoneNavigatorParams, SceneRoute.ZONE_MAIN>;
}


export const ZoneNavigator = (): React.ReactElement => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name={SceneRoute.ZONE_MAIN} component={ZoneMainScene} />
    </Stack.Navigator>
)