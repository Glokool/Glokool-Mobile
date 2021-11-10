import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { SceneRoute, NavigatorRoute } from '../app.route';
import { AppNavigatorParams } from '../App.navigator';
import { ZoneMainScene, ZoneContentsScene, ZoneDetailBlogScene, ZoneDetailContentScene } from '../../scenes/Zone';
import { MainNavigatorParams } from '../Main.navigator';
import { ChatRoomScene, ChatTASelectScene } from '../../scenes/Chat';

const Stack = createStackNavigator();

export type ZoneNavigatorParams = AppNavigatorParams & MainNavigatorParams & {
    [SceneRoute.ZONE_MAIN]: undefined;
    [SceneRoute.ZONE_CONTENTS]: {
        title: string;
    };
    [SceneRoute.CHAT_TA_SELECT]: {
        zone: string;
    };
    [SceneRoute.CHATROOM]: {
        id: string;
        guide: {
          name: string;
          uid: string;
          avatar?: string;
        }
        day: Date,
        zone : string;
        maxUser : number;
        finish: boolean;
      };
}

export interface ZoneMainSceneProps {
    navigation: StackNavigationProp<ZoneNavigatorParams, SceneRoute.ZONE_MAIN>;
    route: RouteProp<ZoneNavigatorParams, SceneRoute.ZONE_MAIN>;
    items?: any;
    zoneTitle?: string;
    zoneList?: any;
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

        <Stack.Screen name={SceneRoute.CHAT_TA_SELECT} component={ChatTASelectScene} />
        <Stack.Screen name={SceneRoute.CHATROOM} component={ChatRoomScene} />
    </Stack.Navigator>
)