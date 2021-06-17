import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from './app.route';
import { AppNavigatorParams } from './app.navigator';
import { BookFouthScreen } from '../scenes/Book';
import { CallbackRsp } from 'iamport-react-native';

type BookConfirmNavigatorParams = AppNavigatorParams & {
    [SceneRoute.BOOK_FOUTH] : {
        response: CallbackRsp;
        ReservationData : {
          date: Date; 
          Name: string;  
          Email : string;
          Contact : {
            type : string;
            info : string;
          }
        }
    };
}

export interface BookFouthScreenProps {
    navigation: StackNavigationProp<BookConfirmNavigatorParams, SceneRoute.BOOK_FOUTH>;
    route: RouteProp<BookConfirmNavigatorParams, SceneRoute.BOOK_FOUTH>;
}

const Stack = createStackNavigator();

export const BookConfirmNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.BOOK_FOUTH} component={BookFouthScreen}/>
  </Stack.Navigator>
);
