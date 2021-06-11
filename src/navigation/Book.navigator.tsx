import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import { SceneRoute } from './app.route';
import { AppNavigatorParams } from './app.navigator';
import { BookDateScreen, BookFirstScreen, BookFouthScreen, BookPayScreen, BookProfileScreen, BookSecondScreen, BookThirdScreen } from '../scenes/Book';

type BookNavigatorParams = AppNavigatorParams & {
  [SceneRoute.BOOK_DATE]: {    
      tourCode : string,
  };
  [SceneRoute.BOOK_PAY]: undefined;
  [SceneRoute.BOOK_PROFILE]: undefined;

  [SceneRoute.BOOK_FIRST] : undefined;
  [SceneRoute.BOOK_SECOND] : { date : Date };
  [SceneRoute.BOOK_THIRD] : { 
    date: Date; 
    Name: string;  
    Email : string;
    Contact : {
      type : string;
      info : string;
    }
  }
  [SceneRoute.BOOK_FOUTH] : undefined;

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

export interface BookFirstScreenProps {
  navigation: StackNavigationProp<BookNavigatorParams, SceneRoute.BOOK_FIRST>;
  route: RouteProp<BookNavigatorParams, SceneRoute.BOOK_FIRST>;
}

export interface BookSecondScreenProps {
  navigation: StackNavigationProp<BookNavigatorParams, SceneRoute.BOOK_SECOND>;
  route: RouteProp<BookNavigatorParams, SceneRoute.BOOK_SECOND>;
}

export interface BookThirdScreenProps {
  navigation: StackNavigationProp<BookNavigatorParams, SceneRoute.BOOK_THIRD>;
  route: RouteProp<BookNavigatorParams, SceneRoute.BOOK_THIRD>;
}

export interface BookFouthScreenProps {
  navigation: StackNavigationProp<BookNavigatorParams, SceneRoute.BOOK_FOUTH>;
  route: RouteProp<BookNavigatorParams, SceneRoute.BOOK_FOUTH>;
}

const Stack = createStackNavigator();

export const BookNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={SceneRoute.BOOK_FIRST} component={BookFirstScreen}/>
    <Stack.Screen name={SceneRoute.BOOK_SECOND} component={BookSecondScreen}/>
    <Stack.Screen name={SceneRoute.BOOK_THIRD} component={BookThirdScreen}/>
    <Stack.Screen name={SceneRoute.BOOK_FOUTH} component={BookFouthScreen}/>
  </Stack.Navigator>
);
