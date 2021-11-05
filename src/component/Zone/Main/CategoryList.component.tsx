import React from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { ZoneMainSceneProps } from '../../../navigation/SceneNavigator/Zone.navigator';
import { windowHeight, windowWidth } from '../../../Design.component';
import { ExploreIcon, ViewMoreIcon } from '../../../assets/icon/Zone';
import { SceneRoute } from '../../../navigation/app.route';
import FastImage from 'react-native-fast-image';
import { CDN } from '../../../server.component';
import { ZoneContentsType, ZoneItemListType } from '../../../types';
import { useDispatch } from 'react-redux';
import { setCategoryIndex } from '../../../model/Zone/Zone.UI.model';

export const ZoneCategoryListComponent = (props: ZoneMainSceneProps) => {

    const dispatch = useDispatch();

    const onPressContent = (type: string, id: string) => {
        if (type == 'blog') {
            props.navigation.navigate(SceneRoute.ZONE_DETAIL_BLOG, { Id: id })
        } else if (type == 'content') {
            props.navigation.navigate(SceneRoute.ZONE_DETAIL_CONTENT, { Id: id })
        }
    }

    // 컨텐츠 렌더링
    const renderContents = (item: { item: ZoneContentsType }) => {
        return (
            <TouchableOpacity style={styles.ContentContainer} onPress={() => onPressContent(item.item.type, item.item._id)}>
                <FastImage
                    source={{ uri: CDN + item.item.image }}
                    style={styles.ItemImage}
                />
            </TouchableOpacity>
        )
    }

    // 카테고리 렌더링 
    const renderCategory = (item: { item: ZoneItemListType, index: number }) => {
        return (
            <Layout style={styles.CategoryContainer}>
                <Text style={styles.ItemText}>{item.item.name.toUpperCase()}</Text>
                {/* 카테고리 하위 컨텐츠 아이템 리스트 */}
                <FlatList
                    data={item.item.items}
                    renderItem={renderContents}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ListFooterComponent={
                        <TouchableOpacity
                            style={styles.ListFooterIcon}
                            onPress={() => {
                                dispatch(setCategoryIndex(item.index + 1));
                                props.navigation.navigate(SceneRoute.ZONE_CONTENTS, { title: props.zoneTitle! });
                            }}
                        >
                            <ViewMoreIcon />
                        </TouchableOpacity>
                    }
                    style={styles.ContentsListContainer}
                    keyExtractor={(item, index) => index.toString()}
                />
            </Layout>
        )
    }

    return (
        <Layout style={styles.MainContainer}>

            <Layout style={styles.TitleContainer}>
                <Text style={styles.TitleText}>LOCAL'S RECOMMENDATIONS</Text>
                <TouchableOpacity
                    style={styles.AllContainer}
                    onPress={() => {
                        dispatch(setCategoryIndex(0));
                        props.navigation.navigate(SceneRoute.ZONE_CONTENTS, { title: props.zoneTitle! });
                    }}
                >
                    <Text style={styles.AllText}>View All</Text>
                </TouchableOpacity>
            </Layout>

            {/* 카테고리 리스트 */}
            <FlatList
                data={props.items}
                renderItem={renderCategory}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
            />

            {/* 더 많은 컨텐츠 보기 버튼 */}
            <TouchableOpacity
                style={styles.BottomButton}
                onPress={() => {
                    dispatch(setCategoryIndex(0));
                    props.navigation.navigate(SceneRoute.ZONE_CONTENTS, { title: props.zoneTitle! });
                }}
            >
                <Layout style={styles.SideSpace} />
                <Text style={styles.BottomButtonText}>Click to Explore More Posts</Text>
                <Layout style={styles.SideSpace}>
                    <ExploreIcon />
                </Layout>
            </TouchableOpacity>

        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        paddingTop: 20,
        paddingBottom: windowHeight * 0.15,
        alignItems: 'center',
    },
    ItemText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 15,
        marginBottom: 5,
        marginLeft: 15,
    },
    TitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth,
        paddingHorizontal: 15,
    },
    TitleText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 17,
    },
    AllContainer: {
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    AllText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 14,
        color: '#7777ff'
    },
    ContentContainer: {
        width: windowWidth * 0.35,
        height: windowWidth * 0.35,
        borderRadius: 10,
        marginHorizontal: windowWidth * 0.005,
    },
    ItemImage: {
        width: windowWidth * 0.35,
        height: windowWidth * 0.35,
        borderRadius: 10,
    },
    CategoryContainer: {
        paddingVertical: 15,
    },
    BottomButton: {
        backgroundColor: '#7777ff',
        flexDirection: 'row',
        width: windowWidth * 0.9,
        alignItems: 'center',
        borderRadius: 50,
        justifyContent: 'space-evenly',
        paddingVertical: 15,
        marginTop: 20,
    },
    BottomButtonText: {
        color: 'white',
        fontFamily: 'Pretendard-Medium',
        fontSize: 16,
        textAlign: 'center',
    },
    SideSpace: {
        width: windowWidth * 0.08,
        height: windowWidth * 0.08,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0000'
    },
    ListFooterIcon: {
        width: windowWidth * 0.25,
        height: windowWidth * 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 20,
    },
    ContentsListContainer: {
        paddingLeft: 10,
    }
})