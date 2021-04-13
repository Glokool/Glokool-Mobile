import React, { Children } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
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

    const PressGuide = () => {
        navigation.navigate(NavigatorRoute.GUIDE);
    }
  
    const PressSetting = () => {
        navigation.navigate(NavigatorRoute.MY_PAGE);
    }
  
    const PressBook = () => {
        navigation.navigate(NavigatorRoute.BOOK, {
            screen: SceneRoute.BOOK_DATE,
            params: {
                tourCode: tour
            }
        });
    }

    const PressFeed = () => {
        navigation.navigate(SceneRoute.FEED);
    }

    const PressBoard = () => {
        navigation.navigate(NavigatorRoute.BOARD)
    }

    return(
        <React.Fragment>
        <Layout style={styles.bottomTabBar}>            
            <Layout style={styles.bottomTab}>
                <TouchableOpacity onPress={PressGuide}>
                    <Guide width={20} height={20}/>
                </TouchableOpacity>
            </Layout>

            <Layout style={styles.bottomTab}>
                <TouchableOpacity onPress={PressFeed}>
                    <Feed width={20} height={20}/>
                </TouchableOpacity>
            </Layout>

            <Layout style={styles.bottomTab}></Layout>

            <Layout style={styles.bottomTab}>
                <TouchableOpacity onPress={PressBoard}>
                    <Board width={20} height={20}/>
                </TouchableOpacity>
            </Layout>

            <Layout style={styles.bottomTab}>
                <TouchableOpacity onPress={PressSetting}>
                    <MyPage width={20} height={20}/>
                </TouchableOpacity>
            </Layout>
        </Layout>

            <Layout style={styles.bottomBar}>            
                <TouchableOpacity onPress={() => {PressBook()}} style={{backgroundColor: '#FFD774', borderRadius: 50, justifyContent: 'center', alignItems: 'center', padding: 10, width: 100, height: 40}}>
                    <Text style={{fontWeight: 'bold', fontSize: 14, color: 'white'}}>BOOK</Text>
                </TouchableOpacity>
            </Layout>
            
        </React.Fragment>
    );

};

const styles = StyleSheet.create({
    bottomTab: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    bottomBar: {
        position: 'absolute',
        bottom: 10,
        width : 115,
        height: 50,
        marginBottom: 5,
        borderRadius: 40,
        flexDirection: 'row',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        zIndex: 5
    },
    bottomTabBar: {
        position: 'absolute', 
        bottom: 0, 
        backgroundColor: 'white', 
        flexDirection:'row', 
        height: 50, 
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
