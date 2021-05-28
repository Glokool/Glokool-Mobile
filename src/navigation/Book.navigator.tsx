import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from './app.route';
import { AppNavigatorParams } from './app.navigator';
import { BookDateScreen, BookPayScreen, BookProfileScreen } from '../scenes/Book1';

type BookNavigatorParams = AppNavigatorParams & {
  [SceneRoute.BOOK_DATE]: {    
      tourCode : string,
  };
  [SceneRoute.BOOK_PAY]: undefined;
  [SceneRoute.BOOK_PROFILE]: undefined;
}

export interface BookDateScreenProps {
  navigation: StackNavigationProp<BookNavigatorParams, SceneRoute.BOOK_DATE>;
  route: RouteProp<BookNavigatorParams, SceneRoute.BOOK_DATE>;
}

export interface BookPayScreenProps {
  navigation: StackNavigationProp<BookNavigatorParams, SceneRoute.BOOK_PAY>;
  route: RouteProp<BookNavigatorParams, SceneRoute.BOOK_PAY>;
}

export interface BookProfileScreenProps {
  navigation: StackNavigationProp<BookNavigatorParams, SceneRoute.BOOK_PROFILE>;
  route: RouteProp<BookNavigatorParams, SceneRoute.BOOK_PROFILE>;
}

const Stack = createStackNavigator();

export const BookNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.BOOK_DATE} component={BookDateScreen}/>
    <Stack.Screen name={SceneRoute.BOOK_PROFILE} component={BookProfileScreen}/>
    <Stack.Screen name={SceneRoute.BOOK_PAY} component={BookPayScreen}/>
  </Stack.Navigator>
);
