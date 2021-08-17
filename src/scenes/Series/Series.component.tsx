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

var ToastRef: any;

// 새로고침 시 setTimeout 으로 실행되는 함수
const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export const SeriesScreen = (props: SeriesScreenProps): LayoutElement => {

    const [refreshing, setRefreshing] = useState(false);
    const [refreshEnd, setRefreshEnd] = useState(false);
    const [tourInfo, setTourInfo] = useState([]);
    const [tourBanner, setTourBanner] = useState([]);

    const [category, setCategory] = useState([]);
    const [endReached, setEndReached] = useState(false);

    const [itemCount, setItemCount] = useState(12);
    const itemCountRef = useRef(12);

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
    useEffect(()=>{
        if (refreshing == false) {
            setRefreshEnd(true);
        }
        setTimeout(()=>setRefreshEnd(false),1);

    },[refreshing])

    // 새로고침 시 refresh 상태변화
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(500).then(() => setRefreshing(false));
    }, []);

    // 대분류 초기화
    const initCategories = async () => {
        const result = await axios.get(SERVER + '/api/category')
        setCategory(result.data);
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

    // 대분류 버튼 렌더링
    const renderButtonItem = (item: any) => {
        return (
            <View style={styles.categoryButton}>
                <Text>{item.item.name}</Text>
            </View>
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
                <Image source={require('../../assets/icon/Series/TestBanner.png')} />
                <FlatList
                    data={category}
                    renderItem={renderButtonItem}
                    contentContainerStyle={{ paddingRight: 20 }}
                    horizontal
                />
            </Animated.View>
            
            {/* grid scrollview */}
            <ScrollView
                style={{ backgroundColor: 'white', height: '100%' }}
                scrollEventThrottle={1}
                onScroll={(e) => handleScroll(e)}
                bounces={true}
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

        </View>
    );
};

const styles = StyleSheet.create({
    categoryButton: {
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 100,
        padding: 10,
        margin: 5,
        backgroundColor: 'white'
    },
});
