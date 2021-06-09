import React, { Children } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {
  Layout,
  LayoutElement,
} from '@ui-kitten/components';
import { NavigatorRoute, SceneRoute } from '../navigation/app.route';
import { useNavigation } from '@react-navigation/native';

import Feed from '../../assets/icon/feed.svg';
import Guide from '../../assets/icon/guide.svg';
import MyPage from '../../assets/icon/MyPage.svg';
import Board from  '../../assets/icon/board.svg';


export const TourBookBottomBar = (tour : any) => {

    const navigation = useNavigation();
  
    const PressBook = () => {
        navigation.navigate(NavigatorRoute.BOOK, {
            screen: SceneRoute.BOOK_DATE,
            params: {
                tourCode: tour
            }
        });
    }

    return(
        <React.Fragment>

            <TouchableOpacity style={{ backgroundColor: '#00FF0000', alignItems: 'flex-end', position: 'absolute', bottom: 10, right: 0 }} onPress={() => PressBook()}>
                <Image source={require('../assets/feed/Book.png')} style={{}}/>
            </TouchableOpacity>

        </React.Fragment>
    );

};

