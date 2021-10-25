import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { SceneRoute } from '../app.route';
import { AppNavigatorParams } from '../App.navigator';
import { ZoneMainScene, ZoneContentsScene, ZoneDetailBlogScene, ZoneDetailContentScene } from '../../scenes/Zone';
import { MainNavigatorParams } from '../Main.navigator';

const Stack = createStackNavigator();

export type ZoneNavigatorParams = AppNavigatorParams & MainNavigatorParams & {
    [SceneRoute.ZONE_MAIN]: undefined;
    [SceneRoute.ZONE_CONTENTS]: {
        pageIndex: number;
    };
    [SceneRoute.ZONE_DETAIL_BLOG]: {
        Id: string;
    };
    [SceneRoute.ZONE_DETAIL_CONTENT]: {
        Id: string;
    }
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

export interface ZoneDetailBlogSceneProps {
    navigation: StackNavigationProp<ZoneNavigatorParams, SceneRoute.ZONE_DETAIL_BLOG>;
    route: RouteProp<ZoneNavigatorParams, SceneRoute.ZONE_DETAIL_BLOG>;
}

export interface ZoneDetailContentSceneProps {
    navigation: StackNavigationProp<ZoneNavigatorParams, SceneRoute.ZONE_DETAIL_CONTENT>;
    route: RouteProp<ZoneNavigatorParams, SceneRoute.ZONE_DETAIL_CONTENT>;
}

export const ZoneNavigator = (): React.ReactElement => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name={SceneRoute.ZONE_MAIN} component={ZoneMainScene} />
        <Stack.Screen name={SceneRoute.ZONE_CONTENTS} component={ZoneContentsScene} />
        <Stack.Screen name={SceneRoute.ZONE_DETAIL_BLOG} component={ZoneDetailBlogScene} />
        <Stack.Screen name={SceneRoute.ZONE_DETAIL_CONTENT} component={ZoneDetailContentScene} />
    </Stack.Navigator>
)