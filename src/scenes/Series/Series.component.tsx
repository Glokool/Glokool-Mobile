<<<<<<< HEAD
import React from 'react';
import { Layout, LayoutElement } from '@ui-kitten/components';
import {
    StyleSheet,
    Text,
=======
import React from 'react'
import { Divider, Layout, LayoutElement,  } from '@ui-kitten/components'
import { 
    StyleSheet, 
    Text, 
>>>>>>> modify
    TouchableOpacity,
    ScrollView,
    BackHandler,
} from 'react-native';
<<<<<<< HEAD
import { SeriesScreenProps } from '../../navigation/ScreenNavigator/Series.navigator';

=======
import { SeriesScreenProps } from "../../navigation/ScreenNavigator/Series.navigator"
import { SERVER } from '../../server.component';
import axios from 'axios';
>>>>>>> modify
import { SceneRoute } from '../../navigation/app.route';
import {
    SeriesAFlatlist,
    SeriesBFlatlist,
    SeriesFlatlist,
} from '../../component/Series';
import { SeriesCarousel } from '../../component/Series/Series.Carousel';
import { Blog, Content, HiddenGem_Title } from '../../assets/icon/Series';
import Toast from 'react-native-easy-toast';
import { useFocusEffect } from '@react-navigation/native';

var ToastRef: any;

export const SeriesScreen = (props: SeriesScreenProps): LayoutElement => {
    
    const [refresh, setRefresh] = React.useState(true);
    const [tourInfo, setTourInfo] = React.useState([]);
    const [tourBanner, setTourBanner] = React.useState([]);

    var exitApp : any = undefined;  
    var timeout : any;

  const focusEvent = useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
      
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      }
    }, [])
  );

  const handleBackButton = () => {
    
    if (exitApp == undefined || !exitApp){

      ToastRef.show('Press one more time to exit', 1000);
      exitApp = true;

      timeout = setTimeout(() => {
        exitApp = false;
      }, 2000);
    }

    else{
      clearTimeout(timeout);
      BackHandler.exitApp();
    }       
    
    return true;
  }

    return(
        <Layout>

        return true;
    };

    return (
        <Layout>
            <Toast ref={(toast) => (ToastRef = toast)} position={'center'} />

            <ScrollView
                style={{ backgroundColor: 'white', height: '100%' }}
                showsVerticalScrollIndicator={false}>
                {/* 시리즈 캐러셀 */}
                <SeriesCarousel />

                {/* hidden gems title */}
                <Layout style={styles.seriesHidden1}>
                    <Layout style={styles.seriesHiddenLayout}>
                        <HiddenGem_Title />
                        <Text
                            style={
                                styles.seriesHiddenTxt
                            }>{`Hidden Gems in Korea`}</Text>
                    </Layout>
                    <TouchableOpacity
                        style={styles.moreBtnLayout}
                        onPress={() =>
                            props.navigation.navigate(
                                SceneRoute.SERIES_HIDDEN_GEM,
                            )
                        }>
                        <Text style={styles.moreBtnTxt}>{`More`}</Text>
                    </TouchableOpacity>
                </Layout>

                <SeriesFlatlist
                    navigation={props.navigation}
                    route={props.route}
                />

                {/* seriesA title - 카드뉴스*/}
                <Layout style={styles.seriesHidden}>
                    <Layout style={styles.seriesHiddenLayout}>
                        <Content />
                        <Text
                            style={styles.seriesHiddenTxt}>{`Korea A-Z `}</Text>
                    </Layout>
                    <TouchableOpacity
                        style={styles.moreBtnLayout}
                        onPress={() =>
                            props.navigation.navigate(SceneRoute.SERIES_A)
                        }>
                        <Text style={styles.moreBtnTxt}>{`More`}</Text>
                    </TouchableOpacity>
                </Layout>
                <SeriesAFlatlist
                    navigation={props.navigation}
                    route={props.route}
                />

                {/* seriesB title - 블로그 */}
                <Layout style={styles.seriesHidden}>
                    <Layout style={styles.seriesHiddenLayout}>
                        <Blog style={{}} />
                        <Text
                            style={
                                styles.seriesHiddenTxt
                            }>{`Day Trip with Glokool`}</Text>
                    </Layout>
                    <TouchableOpacity
                        style={styles.moreBtnLayout}
                        onPress={() =>
                            props.navigation.navigate(SceneRoute.SERIES_B)
                        }>
                        <Text style={styles.moreBtnTxt}>{`More`}</Text>
                    </TouchableOpacity>
                </Layout>
                <SeriesBFlatlist
                    navigation={props.navigation}
                    route={props.route}
                />

                <Layout style={{ height: 220 }} />
            </ScrollView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    seriesHidden1: {
        alignSelf: 'center',
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 35,
        marginRight: 35,
    },

    seriesHidden: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
        marginLeft: 35,
        marginRight: 35,
    },
    seriesHiddenLayout: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seriesHiddenTxt: {
        fontFamily: 'IBMPlexSansKR-SemiBold',
        fontSize: 17,
        color: '#000000',
        marginLeft: 10,
    },
    moreBtnLayout: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        flex: 1,
        // borderWidth: 1,
        // borderColor: 'red',
    },
    moreBtnTxt: {
        color: '#AFAFAF',
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 15,
    },
});
