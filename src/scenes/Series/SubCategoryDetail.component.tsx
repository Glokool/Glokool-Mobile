import React, { useState, useEffect, useRef } from 'react';
import {
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    FlatList,
    Platform,
    View,
    Text,
    ScrollView,
    RefreshControl,
    Animated,
    ActivityIndicator
} from 'react-native';
import { SERVER } from '../../server.component';
import axios from 'axios';
import { SubCategoryDetailProps } from '../../navigation/ScreenNavigator/Series.navigator';
import moment from 'moment';
import { SceneRoute } from '../../navigation/app.route';
import { CountNum_Purple } from '../../assets/icon/Series';
import { AngleLeft } from '../../assets/icon/Common';
import FastImage from 'react-native-fast-image';

const windowWidth = Dimensions.get('window').width;

export const SubCategoryDetail = (props: SubCategoryDetailProps) => {

    const paging = useRef(0);

    const [listData, setListData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [endReached, setEndReached] = useState(false);

    const scrollY = new Animated.Value(0);


    // 당겨서 새로고침 끝날때 요청
    useEffect(() => {
        refreshing == false && initItems();
    }, [refreshing])

    // 아이템 초기화 
    const initItems = async () => {
        // 소분류에 & 들어가면 쿼리로 인식해서 바꿔줌
        const subCategoryName = props.route.params.Name.replace('&','%26');
        const config = '/api/sub-categories?main='
            + props.route.params.Main + '&sub='
            + subCategoryName + '&limit=' + String(paging.current);

        const response = await axios.get(SERVER + config).catch((e) => console.log(e));
        paging.current += 1;

        const tmpListData = listData.concat(response.data);

        setListData(tmpListData);
    }

    // Scroll 이벤트 핸들러
    const handleScroll = (e: any) => {
        // ScrollView end detected 검사
        let paddingToBottom = 100;
        paddingToBottom += e.nativeEvent.layoutMeasurement.height;

        if (endReached == false && e.nativeEvent.contentOffset.y + paddingToBottom >= e.nativeEvent.contentSize.height) {
            setEndReached(true);
            initItems();
            setTimeout(() => {
                setEndReached(false);
            }, 1000);
        }
        // Scroll 위치 변화 (hiding top tab)
        if (e.nativeEvent.contentOffset.y > 0) {
            scrollY.setValue(e.nativeEvent.contentOffset.y);
        }
    }

    // 당겨서 새로고침
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }, []);

    // 아이템 클릭 시 화면 이동
    const onPressItem = (item: any) => {
        if (item.type == 'tour') {
            props.navigation.navigate(SceneRoute.SERIES_HIDDEN_GEM_DETAIL, { TourCode: item._id });
        } else if (item.type == 'content') {
            props.navigation.navigate(SceneRoute.SERIES_A_DETAIL, { Id: item._id })
        } else if (item.type == 'blog') {
            props.navigation.navigate(SceneRoute.SERIES_B_DETAIL, { Id: item._id })
        }
    }

    // Flatlist Component
    const renderItem = (item: any) => {
        return (
            <TouchableOpacity onPress={() => onPressItem(item.item)}>
                <View style={styles.listItemContainer}>
                    {/* Image */}
                    <FastImage source={{ uri: item.item.image }} style={styles.imageContainer} resizeMode='contain' />

                    <View style={styles.propsContainer}>

                        <View>
                            <Text style={styles.titleText}>{item.item.title}</Text>
                        </View>

                        <View style={styles.listBottomContainer}>
                            <Text style={styles.grayText}>
                                {moment(item.item.createdAt).format(
                                    'YYYY. M. D',
                                )}
                            </Text>
                            <View style={styles.countNumContainer}>
                                <CountNum_Purple />
                                <Text style={styles.grayText}>{item.item.count}</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', }}>

            <View style={styles.topTab}>
                <TouchableOpacity onPress={() => props.navigation.pop()}>
                    <View style={{ width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}>
                        <AngleLeft />
                    </View>
                </TouchableOpacity>
                <Text style={styles.topTabText}>{props.route.params.Name}</Text>
            </View>
            <View style={styles.descContainer}>
                <Text style={styles.descText}>Everything you want to know about Korea</Text>
            </View>

            <ScrollView
                onScroll={(e) => handleScroll(e)}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}
            >
                <FlatList
                    data={listData}
                    renderItem={renderItem}
                    style={{ paddingTop: 20, paddingBottom:20 }}
                />

                {endReached && (
                    <View style={{ paddingBottom: 15, zIndex: 100, }}>
                        <ActivityIndicator />
                    </View>
                )}

            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    topTab: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: Platform.OS === 'ios' ? 50 : 20,
        paddingVertical: 10,
    },
    topTabText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 22,
        color: '#7777ff',
        marginLeft: 20,
    },
    descContainer: {
        backgroundColor: '#f8f8f8',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    descText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 16,
        color: '#a0a0a0',
    },
    listItemContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 5,
        width: windowWidth - 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 0,
        borderRadius: 8
    },
    imageContainer: {
        width: 113,
        height: 113,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    propsContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        paddingLeft: 15,
        paddingVertical: 15,
        justifyContent: 'space-between'
    },
    titleText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: Platform.OS === 'ios' ? 15 : 13,
        paddingRight: 10,
    },
    grayText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: Platform.OS === 'ios' ? 12 : 10,
        color: '#b5b5b5',
        marginLeft: 5,
    },
    listBottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    countNumContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '35%'
    }
});
