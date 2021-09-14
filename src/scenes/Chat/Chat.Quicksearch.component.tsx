import React, { useState, useEffect, useRef } from 'react';
import {
    View, Text, StyleSheet, Platform, FlatList, TouchableOpacity, Dimensions, Animated, ActivityIndicator
} from 'react-native';
import { CloseButton_Bold } from '../../assets/icon/Series';
import { SceneRoute } from '../../navigation/app.route';
import { SERVER, CDN } from '../../server.component';
import axios from 'axios';
import { ChatRoomScreenProps } from '../../navigation/ScreenNavigator/Chat.navigator';
import FastImage from 'react-native-fast-image';
import series_attraction from '../../assets/icon/Series/series_attraction.png';
import series_korea_atoz from '../../assets/icon/Series/series_korea_atoz.png'
import series_daytrip from '../../assets/icon/Series/series_daytrip.png';
import { FlatGrid } from 'react-native-super-grid';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const windowWidth = Dimensions.get('window').width;

export const ChatQuickSearch = (props: ChatRoomScreenProps) => {

    const paging = useRef(0);

    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [focusedCategory, setFocusedCategory] = useState(null);
    const [focusedSubCategory, setFocusedSubCategory] = useState(null);
    const [contents, setContents] = useState([]);
    const [banner, setBanner] = useState();
    const [endReached, setEndReached] = useState(false);

    const scrollY = new Animated.Value(0);

    // 카테고리 초기화
    useEffect(() => {
        initCategories();
    }, []);

    useEffect(() => {
        fetchItems();
    }, [focusedSubCategory])

    // 카테고리 초기화
    const initCategories = async () => {
        const result = await axios.get(SERVER + '/api/main-categories')
        setCategory(result.data);
    }

    // 카테고리 클릭 시 focus 지정
    const pressCategory = async (item: any) => {

        focusedSubCategory !== null && setFocusedSubCategory(null)

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
        const response = await axios(config).catch((e) => console.log(e));
        setSubCategory(response.data);

        if (item.name.toUpperCase() == 'ATTRACTION') {
            setBanner(series_attraction);
        } else if (item.name.toUpperCase() == 'KOREA A-Z') {
            setBanner(series_korea_atoz);
        } else if (item.name.toUpperCase() == 'DAY TRIP') {
            setBanner(series_daytrip);
        }
    }

    // subCategory 클릭 시 focus 지정
    const pressSubCategory = (item: any) => {
        setContents([]);
        setFocusedSubCategory({
            id: item._id,
            name: item.name
        })
        paging.current = 0;

    }

    const fetchItems = async () => {
        const subCategoryName = focusedSubCategory.name.replace('&', '%26');
        const config = '/api/sub-categories?main='
            + focusedCategory.name + '&sub='
            + subCategoryName + '&limit=' + String(paging.current);

        const response = await axios.get(SERVER + config)
            .catch((e) => {
                console.log(e);
            });
        paging.current += 1;
        const tmpListData = contents.concat(response.data);

        setContents(tmpListData);
    }

    // Scroll 이벤트 핸들러
    const handleScroll = (e: any) => {
        // ScrollView end detected 검사
        let paddingToBottom = 100;
        paddingToBottom += e.nativeEvent.layoutMeasurement.height;

        if (endReached == false && e.nativeEvent.contentOffset.y + paddingToBottom >= e.nativeEvent.contentSize.height) {
            setEndReached(true);
            fetchItems();
            setTimeout(() => {
                setEndReached(false);
            }, 1000);
        }
        // Scroll 위치 변화 (hiding top tab)
        if (e.nativeEvent.contentOffset.y > 0) {
            scrollY.setValue(e.nativeEvent.contentOffset.y);
        }
    }

    // 아이템 클릭 시 화면전환
    const onPressItem = (item: any) => {
        if (item.type == 'tour') {
            props.navigation.navigate(SceneRoute.SERIES_HIDDEN_GEM_DETAIL, { TourCode: item._id });
        } else if (item.type == 'content') {
            props.navigation.navigate(SceneRoute.SERIES_A_DETAIL, { Id: item._id })
        } else if (item.type == 'blog') {
            props.navigation.navigate(SceneRoute.SERIES_B_DETAIL, { Id: item._id })
        }
    }

    // 카테고리 버튼 렌더링
    const renderItem = (item: any) => {
        const buttonBackground = item.item._id === focusedCategory?.id ? '#7777ff' : 'white';
        const textColor = item.item._id === focusedCategory?.id ? 'white' : '#7777ff';

        return (
            <TouchableOpacity onPress={() => pressCategory(item.item)}>
                <View style={[styles.categoryButton, { backgroundColor: buttonBackground }]}>
                    <Text style={[styles.buttonText, { color: textColor }]}>{item.item.name.toUpperCase()}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    // subCategory 렌더링
    const renderSubCategory = (item: any) => {
        const buttonBackground = item.item._id === focusedSubCategory?.id ? '#eee' : 'white';

        return (
            <TouchableOpacity onPress={() => pressSubCategory(item.item)}>
                <View style={[styles.subCategoryButton, { backgroundColor: buttonBackground }]}>
                    <Text style={styles.subButtonText}>{item.item.name.toUpperCase()}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    // 카테고리 내 아이템 렌더링
    const renderContents = (item: any) => {
        const titleFont = item.item.type == 'tour' ? 'BrandonGrotesque-BoldItalic' : 'Pretendard-Medium';
        const titleSize = item.item.type == 'tour' ? 17 : 14;
        const lineHeight = item.item.type == 'tour' ? 18 : 15;

        return (
            <TouchableOpacity onPress={() => onPressItem(item.item)} style={styles.OuterContainer}>
                <View style={styles.ImageContainer}>
                    <FastImage source={{ uri: CDN + item.item.image }} style={styles.contentsImage} resizeMode='stretch' />
                    {item.item.type != 'content' && (

                        <LinearGradient
                            colors={['#00000000', '#00000000', '#0008']}
                            style={styles.itemTitleContainer}
                        >
                            <Text style={{ fontFamily: titleFont, color: 'white', fontSize: titleSize, bottom: 7, lineHeight: lineHeight }}>
                                {item.item.title}
                            </Text>
                        </LinearGradient>
                    )}
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <View style={styles.topTabBar}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => props.navigation.pop()}>
                        <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                            <CloseButton_Bold />
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.topTabText}>QUICK SEARCH</Text>
                </View>
                <FastImage source={require('../../assets/icon/Chat/QuickSearchButtonPressed.png')} style={{ width: 91, height: 40 }} resizeMode='contain' />
            </View>

            <FastImage
                source={require('../../assets/icon/Chat/QuickSearchBanner.png')}
                style={{ width: windowWidth, height: windowWidth / 1700 * 263 }}
                resizeMode='contain'
            />
            <View>
                <FlatList
                    data={category}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingRight: 20 }}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                />
            </View>

            <ScrollView
                onScroll={(e) => handleScroll(e)}
            >
                {focusedCategory !== null && (
                    <View style={{ alignItems: 'center', marginTop: 10, }}>
                        <FastImage
                            source={banner}
                            style={styles.categoryImage}
                            resizeMode='contain'
                        />
                        <View style={styles.GridContainer}>
                            <FlatGrid
                                itemDimension={150}
                                data={subCategory}
                                renderItem={renderSubCategory}
                                spacing={5}
                                scrollEnabled={false}
                            />
                        </View>
                    </View>
                )}

                {focusedSubCategory !== null && (
                    <FlatGrid
                        itemDimension={130}
                        data={contents}
                        renderItem={renderContents}
                        scrollEnabled={false}
                        style={{ marginHorizontal: 20, }}
                    />
                )}
                {endReached && (
                    <View style={{ paddingVertical: 15, zIndex: 100, }}>
                        <ActivityIndicator />
                    </View>
                )}
            </ScrollView>

        </View>
    )
};

const styles = StyleSheet.create({
    topTabBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        paddingBottom: 10,
    },
    topTabText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 17,
        color: '#7777ff',
        marginLeft: 15,
    },
    categoryButton: {
        borderColor: '#7777ff',
        borderWidth: 2,
        borderRadius: 100,
        padding: 10,
        margin: 5,
    },
    categoryImage: {
        width: windowWidth * 0.9,
        height: windowWidth / 1920 * 404 * 0.9,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    subCategoryButton: {
        borderWidth: 2,
        borderColor: '#eee',
        borderRadius: 10,
        padding: 5,
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: Platform.OS === 'ios' ? 14 : 12,
    },
    subButtonText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: Platform.OS === 'ios' ? 14 : 12,
        color: '#7777ff'
    },
    GridContainer: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#eee',
        width: windowWidth * 0.9,
        paddingTop: 5,
    },
    contentsImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    ImageContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    OuterContainer: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.11,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 0,
        borderRadius: 10,
    },
    itemTitleContainer: {
        position: 'absolute',
        width: 150,
        height: 150,
        paddingHorizontal: 15,
        borderRadius: 10,
        justifyContent: 'flex-end'
    },
});