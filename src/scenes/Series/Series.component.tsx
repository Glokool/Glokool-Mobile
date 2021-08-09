import React, { useEffect } from 'react'
import { Divider, Layout, LayoutElement, } from '@ui-kitten/components'
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    BackHandler,
    Image,
    Button
} from 'react-native';
import { SeriesScreenProps } from "../../navigation/ScreenNavigator/Series.navigator"
import { SERVER } from '../../server.component';
import axios from 'axios';
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
import { FlatGrid } from 'react-native-super-grid';


type Series_Item = {
    banner: string,
    title: string,
    _id: string,
    loc: string,
    region: string,
  }
  

var ToastRef: any;

export const SeriesScreen = (props: SeriesScreenProps): LayoutElement => {

    const [refresh, setRefresh] = React.useState(true);
    const [tourInfo, setTourInfo] = React.useState([]);
    const [tourBanner, setTourBanner] = React.useState([]);

    const [hiddenGem, setHiddenGem] = React.useState();
    const [seriesA, setSeriesA] = React.useState();

    var exitApp: any = undefined;
    var timeout: any;

    useEffect(()=>{
        initHiddenGem();
        console.log(hiddenGem);
    })

    const focusEvent = useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
            }
        }, [])
    );

    const handleBackButton = () => {

        if (exitApp == undefined || !exitApp) {

            ToastRef.show('Press one more time to exit', 1000);
            exitApp = true;

            timeout = setTimeout(() => {
                exitApp = false;
            }, 2000);
        }

        else {
            clearTimeout(timeout);
            BackHandler.exitApp();
        }

        return true;
    }

    const initHiddenGem = async () => {
        const config = {
            Method: "get",
            url: SERVER + "/api/main-tours",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
          };
      
          var Content = await axios(config);
          var Data = Content.data;
          Data.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setHiddenGem(Content.data);
    }

    const initSeriesA = () => {

    }

    const renderItem = (item: { index: number, item: Series_Item}) => {
        return (
            <Layout style={{flex:1, alignItems:'center', justifyContent:'center', borderRadius:10, overflow:'hidden'}}>
                <Image source={{uri: item.item.banner}} style={{width:110, height:110,}} resizeMode={'stretch'}/>
                {/* <Text>{item.item.title}</Text> */}
            </Layout>
        )
    }

    return (
        <Layout>
            <Toast ref={(toast) => (ToastRef = toast)} position={'center'} />

            <ScrollView
                style={{ backgroundColor: 'white', height: '100%' }}
                showsVerticalScrollIndicator={false}>

                <FlatGrid
                    itemDimension={100}
                    data={hiddenGem}
                    renderItem={renderItem}
                />
                {/* 시리즈 캐러셀 */}
                {/* <SeriesCarousel /> */}

                {/* hidden gems title */}
                {/* <Layout style={styles.seriesHidden1}>
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
                /> */}

                {/* seriesA title - 카드뉴스*/}
                {/* <Layout style={styles.seriesHidden}>
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
                /> */}

                {/* seriesB title - 블로그 */}
                {/* <Layout style={styles.seriesHidden}>
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

                <Layout style={{ height: 220 }} /> */}

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
        marginTop: 20,
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
    },
    moreBtnTxt: {
        color: '#AFAFAF',
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 15,
    },
});
