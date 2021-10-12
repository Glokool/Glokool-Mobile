import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { SceneRoute } from '../app.route';
import { AppNavigatorParams } from '../app.navigator';
import { ZoneMainScene, ZoneContentsScene } from '../../scenes/Zone';

const Stack = createStackNavigator();

export type ZoneNavigatorParams = AppNavigatorParams & {
    [SceneRoute.ZONE_MAIN]: undefined;
    [SceneRoute.ZONE_CONTENTS]: undefined;
}

export interface ZoneMainSceneProps {
    navigation: StackNavigationProp<ZoneNavigatorParams, SceneRoute.ZONE_MAIN>;
    route: RouteProp<ZoneNavigatorParams, SceneRoute.ZONE_MAIN>;
    items?: any;
}

export interface ZoneContentsSceneProps {
    navigation: StackNavigationProp<ZoneNavigatorParams, SceneRoute.ZONE_CONTENTS>;
    route: RouteProp<ZoneNavigatorParams, SceneRoute.ZONE_CONTENTS>;
}

export const ZoneNavigator = (): React.ReactElement => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name={SceneRoute.ZONE_MAIN} component={ZoneMainScene} />
        <Stack.Screen name={SceneRoute.ZONE_CONTENTS} component={ZoneContentsScene} />
    </Stack.Navigator>
)