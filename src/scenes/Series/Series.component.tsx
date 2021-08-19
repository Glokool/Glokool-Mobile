import React, { useEffect, useState, useRef } from 'react'
import { LayoutElement, } from '@ui-kitten/components'
import {
    StyleSheet,
    Text,
    RefreshControl,
    ScrollView,
    BackHandler,
    Image,
    View,
    FlatList,
    Animated,
    Dimensions,
    TouchableOpacity,
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
import { useFocusEffect } from '@react-navigation/native';
import { SeriesGrid } from '../../component/Series';
import { text } from '@fortawesome/fontawesome-svg-core';
import FastImage from 'react-native-fast-image';
import series_all from '../../assets/icon/Series/series_all.png';
import series_attraction from '../../assets/icon/Series/series_attraction.png';
import series_korea_atoz from '../../assets/icon/Series/series_korea_atoz.png'
import series_daytrip from '../../assets/icon/Series/series_daytrip.png';
import { numberLiteralTypeAnnotation } from '@babel/types';
import { CategoryDetail } from '../../component/Series/CategoryDetail.component';

var ToastRef: any;

// 새로고침 시 setTimeout 으로 실행되는 함수
const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const windowWidth = Dimensions.get('window').width;

export const SeriesScreen = (props: SeriesScreenProps): LayoutElement => {

    const [refreshing, setRefreshing] = useState(false);
    const [refreshEnd, setRefreshEnd] = useState(false);
    const [focusedCategory, setFocusedCategory] = useState({
        id: 'series_all',
        name: 'ALL'
    });
    const [banner, setBanner] = useState(series_all);

    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [endReached, setEndReached] = useState(false);
    const [refreshCategory, setRefreshCategory] = useState(false);
    const [itemCount, setItemCount] = useState(30);

    const itemCountRef = useRef(30);

    const scrollY = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY, 0, 150);
    const translateY = diffClamp.interpolate({
        inputRange: [0, 150],
        outputRange: [0, -150]
    })

    var exitApp: any = undefined;
    var timeout: any;

    // 대분류 초기화
    useEffect(() => {
        initCategories();
    }, [])

    // 새로고침 이벤트가 끝날때 refresh 해주기
    useEffect(() => {
        if (refreshing == false) {
            setRefreshEnd(true);
            initCategories();
        }
        setTimeout(() => setRefreshEnd(false), 1);

    }, [refreshing])

    // 새로고침 시 refresh 상태변화
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(500).then(() => setRefreshing(false));
    }, []);

    // 대분류 초기화
    const initCategories = async () => {
        const result = await axios.get(SERVER + '/api/main-categories');

        const tmpContent = [{
            id: 'series_all',
            name: 'ALL'
        }].concat(result.data);

        setCategory(tmpContent);
    }

    // 아마도 안드로이드 뒤로가기 버튼 이벤트 핸들러인듯!
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

    const checkFocused = async (item: any) => {
        setFocusedCategory({
            id: item._id,
            name: item.name,
        })

        const config = {
            Method: "get",
            url: SERVER + "/api/categories/" + item.name,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        };
        const response = await axios(config);
        const tmpContent = [];

        response.data.categories.map((item: any) => {
            tmpContent.push(item.name);
        })
        setSubCategory(tmpContent);

        response.data.categoryInfo.map((item: any) => {
            console.log(item);
        })

        if (item.name == 'ALL') {
            setBanner(series_all);
        } else if (item.name == 'ATTRACTION') {
            setBanner(series_attraction);
        } else if (item.name == 'KOREA A-Z') {
            setBanner(series_korea_atoz);
        } else if (item.name == 'DAY TRIP') {
            setBanner(series_daytrip);
        }
    }

    // 대분류 버튼 렌더링
    const renderButtonItem = (item: any) => {

        const buttonBG = (item.item.name === 'ALL' && focusedCategory?.name === 'ALL') ?
            'black' : (item.item.name === 'ALL' && focusedCategory?.name !== 'ALL') ?
                '#eee' : (item.item.name === focusedCategory?.name) ?
                    '#7777ff' : 'white';

        const buttonBorder = (item.item.name === 'ALL' && focusedCategory?.name === 'ALL') ?
            'black' : (item.item.name === 'ALL' && focusedCategory?.name !== 'ALL') ?
                '#eee' : (item.item.name === focusedCategory?.name) ?
                    '#7777ff' : '#eee';

        const textColor = (item.item.name === 'ALL' && focusedCategory?.name === 'ALL') ?
            'white' : (item.item.name === 'ALL' && focusedCategory?.name !== 'ALL') ?
                '#7777ff' : (item.item.name === focusedCategory?.name) ?
                    'white' : 'black';

        return (
            <TouchableOpacity onPress={() => checkFocused(item.item)}>
                <View style={[styles.categoryButton, { borderColor: buttonBorder, backgroundColor: buttonBG }]}>
                    <Text style={[styles.categoryText, { color: textColor }]}>{item.item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    // Scroll 이벤트 핸들러
    const handleScroll = (e: any) => {
        // ScrollView end detected 검사
        let paddingToBottom = 1;
        paddingToBottom += e.nativeEvent.layoutMeasurement.height;

        if (endReached == false && e.nativeEvent.contentOffset.y + paddingToBottom >= e.nativeEvent.contentSize.height) {
            setEndReached(true);
            setTimeout(() => {
                itemCountRef.current += 12;
                setItemCount(itemCountRef.current);
                setEndReached(false);
            }, 1000);
        }
        // Scroll 위치 변화 (hiding top tab)
        if (e.nativeEvent.contentOffset.y > 0) {
            scrollY.setValue(e.nativeEvent.contentOffset.y);
        }
    }

    return (
        <View>
            {/* top tab bar */}
            <Animated.View
                style={{
                    transform: [{ translateY: translateY }],
                    elevation: 4,
                    zIndex: 100,
                    backgroundColor: '#00ff0000',
                    position: 'absolute',
                }}
            >
                <FastImage
                    style={styles.bannerImage}
                    source={banner}
                    resizeMode='contain' />
                <View style={{ backgroundColor: 'white', alignItems: 'center' }}>
                    <FlatList
                        data={category}
                        renderItem={renderButtonItem}
                        contentContainerStyle={{ paddingRight: 20 }}
                        horizontal
                    />
                </View>
            </Animated.View>

            {/* ALL */}
            {/* grid scrollview */}
            {focusedCategory?.name == 'ALL' ? (
                <ScrollView
                    style={{ backgroundColor: 'white', height: '100%' }}
                    scrollEventThrottle={1}
                    onScroll={(e) => handleScroll(e)}
                    decelerationRate='fast'
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />}
                >
                    <SeriesGrid
                        navigation={props.navigation}
                        refreshing={refreshEnd}
                        itemCount={itemCount}
                        endReached={endReached} />

                </ScrollView>
            ) : (
                <ScrollView
                    style={{ backgroundColor: 'white', marginTop: 135, }}
                    scrollEventThrottle={1}
                    onScroll={(e) => handleScroll(e)}
                    decelerationRate='fast'
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />}
                >
                    <CategoryDetail data={subCategory} />
                </ScrollView>
            )}



        </View>
    );
};

const styles = StyleSheet.create({
    categoryText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 14,
    },
    categoryButton: {
        borderWidth: 2,
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 5,
    },
    bannerImage: {
        width: windowWidth,
        height: windowWidth / 1920 * 404
    }
});
