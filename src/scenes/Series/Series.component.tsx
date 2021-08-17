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


type GridItem = {
    image: string,
    title: string,
    id: string,
    type: string,
}

type Series_Item = {
    banner: string,
    title: string,
    _id: string,
    loc: string,
    region: string,
}

var ToastRef: any;
const windowWidth = Dimensions.get('window').width;

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

    useEffect(() => {
        initCategories();
    }, [])

    useEffect(()=>{
        if (refreshing == false) {
            setRefreshEnd(true);
        }
        setTimeout(()=>setRefreshEnd(false),1);

    },[refreshing])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(500).then(() => setRefreshing(false));
    }, []);

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

    const renderButtonItem = (item: any) => {
        return (
            <View style={styles.categoryButton}>
                <Text>{item.item.name}</Text>
            </View>
        )
    }

    const handleScroll = (e: any) => {
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

        if (e.nativeEvent.contentOffset.y > 0) {
            scrollY.setValue(e.nativeEvent.contentOffset.y);
        }
    }

    return (
        <View>
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
