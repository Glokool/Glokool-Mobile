import React, { useEffect, useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import axios from 'axios';
import { SceneRoute } from '../../navigation/app.route';
import FastImage from 'react-native-fast-image';
import { FlatGrid } from 'react-native-super-grid';
import { SeriesBottomLogo } from '../../assets/icon/Series';
import { SERVER } from '../../server.component';

// Series 메인에서 상단 카테고리 버튼 클릭 시 렌더링되는 컴포넌트

export const CategoryDetail = (props: any) => {

    // View More 버튼 클릭 시 화면 이동
    const pressedMore = (item: any) => {
        const config = {
            Name: item.name,
            Main: props.main,
        };
        item.name == 'GUIDE BOOK' ? (
            props.navigation.navigate(SceneRoute.GUIDEBOOK_DETAIL, config)
        ) : (
            props.navigation.navigate(SceneRoute.SUBCATEGORY_DETAIL, config)
        );

    }

    // 아이템 클릭 시 화면 전환
    const onPressItem = (item: any) => {
        if (item.type == 'tour') {
            props.navigation.navigate(SceneRoute.SERIES_HIDDEN_GEM_DETAIL, { TourCode: item._id });
        } else if (item.type == 'content') {
            props.navigation.navigate(SceneRoute.SERIES_A_DETAIL, { Id: item._id })
        } else if (item.type == 'blog') {
            props.navigation.navigate(SceneRoute.SERIES_B_DETAIL, { Id: item._id })
        }
    }

    // List Header / Footer Component
    const renderSpace = () => {
        return (<View style={{ width: 25 }} />)
    }

    // 소분류 하위 Flatlist
    const renderItem = (item: any) => {
        return (
            <TouchableOpacity onPress={() => onPressItem(item.item)}>
                <View style={styles.listItemContainer}>
                    <FastImage
                        source={{ uri: item.item.image }}
                        style={styles.subItemContainer}
                        resizeMode='stretch'
                    />

                    {item.item.type != 'content' && (
                        <View style={styles.subItemTitle}>
                            <Text style={styles.subItemTitleText}>{item.item.title}</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        )
    }

    // Guide book 하위 Grid
    const renderGridItem = (item: any) => {
        return (
            <TouchableOpacity onPress={() => onPressItem(item.item)}>
                <View style={styles.GridItemContainer}>
                    <FastImage
                        source={{ uri: item.item.image }}
                        style={styles.GridImage}
                        resizeMode='stretch'
                    />
                    <View style={styles.GridItemTitle}>
                        <Text style={styles.GridItemTitleText}>{item.item.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    // 소분류 제목 , View More 버튼 렌더링
    const renderCategory = (item: any) => {
        const textColor = item.item.name === 'GUIDE BOOK' ? '#7777ff' : 'black';
        return (
            <View>

                <View style={styles.categoryItemContainer}>
                    <Text style={[styles.categoryItemText, { color: textColor }]}>{item.item.name}</Text>
                    <TouchableOpacity onPress={() => pressedMore(item.item)}>
                        <Text style={styles.MoreButton}>View More</Text>
                    </TouchableOpacity>
                </View>

                {/* 가이드북이면 그리드로 출력 */}
                {item.item.name === 'GUIDE BOOK' ? (
                    <View style={{ height: 315 }}>
                        <FlatGrid
                            itemDimension={150}
                            data={item.item.items}
                            renderItem={renderGridItem}
                            spacing={5}
                            ListHeaderComponent={renderSpace}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                        />
                    </View>
                ) : (
                    <FlatList
                        data={item.item.items}
                        renderItem={renderItem}
                        ListHeaderComponent={renderSpace}
                        ListFooterComponent={renderSpace}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                    />
                )}

            </View>
        )
    }

    // trendingNow 아이템 렌더링
    const renderTrendingNow = (item: any) => {
        

        return (
            <TouchableOpacity onPress={() => onPressItem(item.item)}>
                <View style={styles.trendingListItemContainer}>
                    <FastImage
                        source={{ uri: item.item.image }}
                        style={styles.trendingItemContainer}
                        resizeMode='stretch'
                    />

                    {item.item.type != 'content' && (
                        <View style={styles.subItemTitle}>
                            <Text style={styles.subItemTitleText}>{item.item.title}</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f8f8f8', paddingBottom: 20, }}>

            {/* TRENDING NOW */}
            <View style={styles.trendingNowContainer}>
                <Text style={styles.trendingNowText}>
                    TRENDING NOW
                </Text>
                <FlatList
                    data={props.trendingNow}
                    renderItem={renderTrendingNow}
                    ListHeaderComponent={renderSpace}
                    ListFooterComponent={renderSpace}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                />
            </View>

            {/* 소분류 부분 */}
            <View style={{ backgroundColor: '#f8f8f8', marginTop: 20, }}>
                <FlatList
                    data={props.data}
                    renderItem={renderCategory}
                />
            </View>
            <View style={{ alignItems: 'center' }}>
                <SeriesBottomLogo />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    trendingNowText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 21, color: '#7777ff',
        marginLeft: 25,
        marginBottom: 7,
    },
    trendingNowContainer: {
        backgroundColor: 'white',
        paddingVertical: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.11,
        shadowRadius: 2,
        elevation: 5,
    },
    subItemContainer: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginRight: 5,
    },
    subItemTitle: {
        position: 'absolute',
        bottom: 15,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    subItemTitleText: {
        fontFamily: 'Pretendard-Medium',
        color: 'white',
        fontSize: 17
    },
    GridItemTitleText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        color: 'white',
        fontSize: 15
    },
    GridItemTitle: {
        position: 'absolute',
        bottom: 15,
        alignItems: 'center',
        width: 150,
    },
    GridImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    categoryItemContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginHorizontal: 25,
        marginVertical: 5,
    },
    categoryItemText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 19,
    },
    MoreButton: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 15,
        color: '#7777ff'
    },
    listItemContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.11,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20,
        borderWidth: 0,
        borderRadius: 10,
        width: 150,
        height: 150,
        marginRight: 5,
    },
    GridItemContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.11,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 0,
        borderRadius: 10,
        width: 150,
        height: 150,
    },
    trendingListItemContainer: {
        width: 156,
        height: 156,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.11,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 5,
        borderWidth: 0,
        borderRadius: 10,
        marginRight: 7,
    },
    trendingItemContainer: {
        width: 156,
        height: 156,
        borderRadius: 10,
    },
})