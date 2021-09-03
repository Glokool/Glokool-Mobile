import React, { useState, useEffect, useRef } from 'react';
import {
    TouchableOpacity,
    Dimensions,
    StyleSheet,
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
import LinearGradient from 'react-native-linear-gradient';
import { FlatGrid } from 'react-native-super-grid';

const windowWidth = Dimensions.get('window').width;

// 소분류가 GUIDE BOOK 일때 해당 페이지로 
export const GuidebookDetail = (props: SubCategoryDetailProps) => {

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
        const config = '/api/sub-categories?main='
            + props.route.params.Main + '&sub='
            + props.route.params.Name + '&limit=' + String(paging.current);

        const response = await axios.get(SERVER + config);
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

    // 가이드북 아이템 렌더링
    const renderItem = (item: any) => {
        return (
            <TouchableOpacity onPress={() => onPressItem(item.item)} style={styles.OuterContainer}>
                <View style={styles.listItemContainer}>
                    {/* Image */}
                    <FastImage source={{ uri: item.item.image }} style={styles.imageContainer} resizeMode='contain' />
                    <LinearGradient
                        colors={['#00000000', '#00000000', '#0008']}
                        style={styles.ItemTitle}
                    >
                        <Text style={styles.ItemTitleText}>{item.item.title}</Text>
                    </LinearGradient>
                    <View style={styles.propsContainer}>

                        <View style={styles.tagContainer}>
                            {item.item.tag.map((item: string) => (
                                <Text style={styles.titleText}>
                                    <Text style={[styles.titleText, { color: '#808080' }]}>#</Text>
                                    {item + '  '}
                                </Text>
                            ))}
                        </View>

                        <View style={styles.listBottomContainer}>
                            <Text style={styles.grayText}>
                                {moment(item.item.createdAt).format(
                                    'YYYY. M. D',
                                )}
                            </Text>
                            <View style={styles.countNumContainer}>
                                <CountNum_Purple />
                                <Text style={styles.grayText}> {item.item.count}</Text>
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
                <Text style={styles.descText}>Guide books of specially chosen tour spots.</Text>
            </View>
            <ScrollView
                onScroll={(e) => handleScroll(e)}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}
            >
                <FlatGrid
                    itemDimension={windowWidth * 0.4}
                    data={listData}
                    renderItem={renderItem}
                    style={{ paddingTop: 20 }}
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
        fontSize: Platform.OS === 'ios' ? 16 : 14,
        color: '#a0a0a0',
    },
    listItemContainer: {
        width: windowWidth * 0.46,
        overflow: 'hidden',
        borderRadius: 8,
    },
    OuterContainer: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 8,
        borderWidth: 0,
    },
    imageContainer: {
        width: windowWidth * 0.46,
        height: windowWidth * 0.46,
    },
    propsContainer: {
        width: windowWidth * 0.46,
        backgroundColor: 'white',
        paddingLeft: 15,
        paddingVertical: 15,
        justifyContent: 'space-between'
    },
    titleText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: Platform.OS === 'ios' ? 14 : 12,
    },
    grayText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: Platform.OS === 'ios' ? 13 : 11,
        color: '#b5b5b5',
    },
    listBottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    countNumContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '35%',
    },
    tagContainer: {
        height: 50,
        width: windowWidth * 0.46,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingRight: 10,
    },
    ItemTitle: {
        position: 'absolute',
        justifyContent: 'flex-end',
        paddingHorizontal: 15,
        width: windowWidth * 0.46,
        height: windowWidth * 0.46,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    ItemTitleText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        color: 'white',
        fontSize: Platform.OS === 'ios' ? 16 : 13,
        fontWeight: '400',
        bottom: 10,
    },
});
