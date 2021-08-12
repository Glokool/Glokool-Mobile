import React, { useEffect, useState } from 'react'
import { Divider, Layout, LayoutElement, } from '@ui-kitten/components'
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    BackHandler,
    Image,
    Button,
    View,
    FlatList
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
import { SeriesGrid } from '../../component/Series';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';



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

    const [animation, setAnimation] = useState<String>('');
    const [firstY, setFirstY] = useState(0);
    const [secondY, setSecondY] = useState(0);

    const [category, setCategory] = useState([]);

    var exitApp: any = undefined;
    var timeout: any;

    useEffect(() => {
        setSecondY(firstY);
        const dY = firstY - secondY;
        console.log(dY);

        if (dY > 0) {
            setAnimation('slideOutUp')
        } else {
            setAnimation('slideInDown');
        }

    }, [firstY])

    useEffect(() => {
        initCategories();
    }, [])

    const initCategories = async () => {
        const result = await axios.get(SERVER + '/api/category')
        setCategory(result.data);
    }

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
        } else {
            clearTimeout(timeout);
            BackHandler.exitApp();
        }

        return true;
    }

    const renderItem = (item: any) => {
        return (
            <View style={styles.categoryButton}>
                <Text>{item.item.name}</Text>
            </View>
        )
    }

    return (

        <View>

            <ScrollView
                style={{ backgroundColor: 'white', height: '100%' }}
                onScroll={(e) => setFirstY(e.nativeEvent.contentOffset.y)}
                decelerationRate='fast'
                bounces={false}
            >
                <SeriesGrid />

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

            {/* <Animatable.Image
                source={require('../../assets/icon/Series/TestBanner.png')}
                animation={animation}
                duration={100}
                style={{ position: 'absolute' }}
            /> */}
            <Animatable.View
                animation={animation}
                duration={300}
                style={{ position: 'absolute' }}
            >
                <Image source={require('../../assets/icon/Series/TestBanner.png')} />
                <FlatList
                    data={category}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingRight: 20 }}
                    horizontal
                />
            </Animatable.View>
        </View>
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
    categoryButton: {
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 100,
        padding: 10,
        margin: 5,
        backgroundColor: 'white'
    }
});
