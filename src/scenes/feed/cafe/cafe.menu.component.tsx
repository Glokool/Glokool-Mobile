import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Layout,
  LayoutElement,
} from '@ui-kitten/components';
import { CafeMenuScreenProps } from '../../../navigation/cafe.navigator';
import {
    faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigatorRoute, SceneRoute } from '../../../navigation/app.route';
import axios from 'axios';
import { SERVER } from '../../../server.component';
import { FullWidthPicture } from '../../../data/picture.model';
import { TourBookBottomBar } from '../../../component/tourBook.bottombar.components'

import Feed from '../../../assets/icon/feed.svg';
import Guide from '../../../assets/icon/guide.svg';
import MyPage from '../../../assets/icon/MyPage.svg';

export const CafeMenuScreen = (props: CafeMenuScreenProps): LayoutElement => {
  const [iconSelected, setIconSelected] = React.useState(true);
  const info = props.route.params;
  const [cafe, setCafe] = React.useState({});
  
  React.useEffect(() => {
    axios.get(SERVER + '/api/cafe/menu/' + info.code.code + '/tour/' + info.code.tour_id)
        .then((response) => {
            setCafe(response.data)
        })
  }, []);

  const PressBook = () => {
    props.navigation.navigate(NavigatorRoute.BOOK, {
        screen: SceneRoute.BOOK_DATE,
        params: {
            tourCode: info.code.tour_id
        }
        });
    }  
  

    const PressBack = () => {
        props.navigation.navigate(SceneRoute.FEED_TOURBOOK);
    }

    const PressGuide = () => {
        props.navigation.navigate(NavigatorRoute.GUIDE);
    }

    const PressInfo = () => {
        props.navigation.navigate(SceneRoute.CAFE_INFO, info);
    }

    const PressIntro = () => {
        props.navigation.navigate(SceneRoute.CAFE_INTRO, info);
    }

    const PressFeed = () => {
        props.navigation.navigate(SceneRoute.FEED)
    }

    const PressSetting = () => {
        props.navigation.navigate(NavigatorRoute.MY_PAGE)
    }



   
  return (
    <React.Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
        {/*탑 탭바 */}
        <Layout style={styles.tabbar}>
            <Layout style={styles.tabbarContainer}>
                <TouchableOpacity onPress={PressBack}>
                    <FontAwesomeIcon icon={faAngleLeft} style={{color: 'black'}} size={28}/>
                </TouchableOpacity>
            </Layout>
            <Layout style={styles.tabbarContainer}>
                <TouchableOpacity onPress={PressInfo}>
                    <Text style={styles.Title}>Information</Text>
                </TouchableOpacity>
            </Layout>
            <Layout style={styles.tabbarContainer}>
                <TouchableOpacity onPress={PressIntro}>
                    <Text style={styles.Title}>Introduction</Text>
                </TouchableOpacity>
            </Layout>
            <Layout style={styles.tabbarContainer}>
                <TouchableOpacity>
                    <Text style={styles.selectTitle}>Menu</Text>
                </TouchableOpacity>
            </Layout>
        </Layout>

        {/* 내용물*/}
        
        <Layout style={{flex: 9, backgroundColor: 'white', alignItems: 'center'}}>
            <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                <FullWidthPicture uri={cafe.menu}/>
            </ScrollView>            
        </Layout>


        <TourBookBottomBar>
            {info.code.tour_id}
        </TourBookBottomBar>

    </React.Fragment>
  );
};

const styles = StyleSheet.create({
    canvas: {
        flex: 1,
        marginVertical: 10,
    },
    tabbar: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',       
    },
    tabbarContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    titleContainer: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    title: {
        fontSize : 16,
        fontWeight: 'bold'
    },
    smallTitle: {
        fontSize : 14,
        fontWeight: 'bold'
    },
    iconSelectContainer: {
        borderRadius: 100,
        width: 40,
        height: 40,
        backgroundColor: '#FFC043',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },   
    iconContainer: {
        borderRadius: 100,
        width: 40,
        height: 40,
        backgroundColor: 'white',
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectTitle: {
        fontSize: 12,
        color: '#FFC043',
        fontWeight: 'bold'
    },
    Title: {
        fontSize: 12,
        color: '#C9C9C9',
        fontWeight: 'bold'
    },
    MainTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    textContainer: {
        backgroundColor: '#00FF0000',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%'
    },
    icon: {
        position: 'absolute', 
        top: 0, 
        right: 0, 
        padding: 30, 
        backgroundColor: '#00FF0000'
    },
    tagContainer: {
        marginHorizontal: 15,
        marginVertical: 20,
        padding: 5,
        alignItems: 'center'
    },
    tag: {
        borderColor: 'gray',
        borderWidth: 0.5,
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 10,
        alignItems: 'center'
    },
      tagText: {
        marginHorizontal: 10,
        marginVertical: 5,
        fontSize: 12
    },
    desc: {
        fontSize: 14,
        textAlign: 'center'
    },
    bottomTab: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        width : 170,
        height: 55,
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
    },
});