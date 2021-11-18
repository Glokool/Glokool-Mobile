import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity, Platform } from 'react-native';
import { Layout } from '@ui-kitten/components';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { windowHeight, windowWidth } from '../../Design.component';
import { SeriesBottomLogo } from '../../assets/icon/Series'
import { ZoneContentsSceneProps } from '../../navigation/SceneNavigator/Zone.navigator';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../model';
import { setCategoryIndex } from '../../model/Zone/Zone.UI.model';
import { CommonTopTabBar, Loading } from '../../component/Common';
import axios from 'axios';
import { SERVER, CDN } from '../../server.component';
import FastImage from 'react-native-fast-image';
import { SceneRoute } from '../../navigation/app.route';
import { ZoneCategoryType, ZoneContentsType } from '../../types';
import { setZoneLoadingTrue, setZoneLoadingFalse } from '../../model/Zone/Zone.Loading.model';

export const ZoneContentsScene = (props: ZoneContentsSceneProps) => {

    const categoryIndex = useSelector((state: RootState) => state.ZoneUIModel.categoryIndex);
    const loading = useSelector((state: RootState) => state.ZoneLoadingModel.loading);
    const dispatch = useDispatch();

    const scrollRef = useRef<SwiperFlatList>(null);

    const [category, setCategory] = useState<Array<any>>([]);
    const [fetchedItem, setFetchedItem] = useState<any>({});

    useEffect(() => {
        initCategory();
    }, [])

    const initCategory = async () => {

        const response = await axios.get(SERVER + '/main-categories/' + props.route.params.title + '/sub-categories')
        setCategory([{ name: "all" }, ...response.data]);

        const ALL = await axios.get(SERVER + '/main-categories/' + props.route.params.title + '?q=all');
        setFetchedItem({ ...fetchedItem, all: ALL.data });
    }

    // 컨텐츠 클릭 시
    const onPressContent = (type: string, id: string) => {
        if (type == 'blog') {
            props.navigation.navigate(SceneRoute.ZONE_DETAIL_BLOG, { Id: id });
        } else if (type == 'content') {
            console.log(id);
            props.navigation.navigate(SceneRoute.ZONE_DETAIL_CONTENT, { Id: id });
        }
    }

    // 페이지 내 컨텐츠 렌더링
    const renderContents = (item: { item: ZoneContentsType }) => {
        return (
            <TouchableOpacity onPress={() => onPressContent(item.item.type, item.item._id)}>
                <FastImage
                    source={{ uri: CDN + item.item.image }}
                    style={styles.ContentsItemStyle}
                    resizeMode={'stretch'}
                />
            </TouchableOpacity>
        )
    }

    const onPressCategory = (index: number) => {
        scrollRef.current?.scrollToIndex({ index: index });
    }

    // 상단 바 카테고리 버튼 리스트
    const renderCategory = (item: { item: ZoneCategoryType, index: number }) => {
        // console.log(item);
        return (
            <TouchableOpacity
                style={[styles.CategoryItemStyle, { borderBottomColor: item.index == categoryIndex ? (item.index === 0 ? "black" : "#7777ff") : "#ccc", }]}
                onPress={() => onPressCategory(item.index)}
            >
                <Text style={[styles.CategoryTextStyle, { color: item.index == categoryIndex ? (item.index === 0 ? "black" : "#7777ff") : "#ccc", }]}>{item.item.name.toUpperCase()}</Text>
            </TouchableOpacity>
        )
    }

    /*
    카테고리 클릭 혹은 좌우 스와이프 시
    서버 요청 전적이 없으면 요청 후 저장
    서버 요청 전적이 있으면 요청 안함
    */
    const onChangePage = (index: number) => {

        const url = `https://api.glokool.com/v3/main-categories/${props.route.params.title}`

        if (!(category[index].name in fetchedItem)) {
            dispatch(setZoneLoadingTrue());

            axios(url, {
                method: 'GET',
                // url 파라미터를 params 아래로 구성
                params: {
                    q: category[index].name,
                    limit: 0,
                }
            }).then((response) => {
                setFetchedItem({ ...fetchedItem, [category[index].name]: response.data });
                dispatch(setZoneLoadingFalse());
            }).catch((e) => {
                console.log(e);
                dispatch(setZoneLoadingFalse());
            });
        }
    }

    // 페이지 렌더링 
    const renderPage = (item: { item: ZoneCategoryType, index: number }) => {
        return (
            <Layout style={styles.PageContainer} >
                {/* 페이지 내 아이템들을 보여주는 리스트 */}
                <FlatList
                    data={fetchedItem[item.item.name]}
                    renderItem={renderContents}
                    key={"_"}
                    keyExtractor={(item, index) => "_" + index.toString()}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    style={styles.PageList}
                    contentContainerStyle={styles.PageListContainer}
                    ListFooterComponent={<Layout style={{ height: windowHeight * 0.05 }} />}
                    // ListFooterComponentStyle={styles.PageFooterContainer}
                />
            </Layout>
        )
    }

    return (
        <Layout style={styles.MainContainer}>

            {/* Top Tab Bar */}
            <CommonTopTabBar
                title={props.route.params.title.toUpperCase()}
                child={
                    <Layout style={styles.CategoryOuterContainer}>
                        <FlatList
                            data={category}
                            renderItem={renderCategory}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.CategoryListContainer}
                        />
                    </Layout>
                }
            />
            {/* page 전체를 담는 list , 양옆으로 swipe 가능 */}
            <SwiperFlatList
                initialScrollIndex={categoryIndex}
                index={categoryIndex}
                data={category}
                ref={scrollRef}
                renderItem={renderPage}
                onChangeIndex={({ index, prevIndex }) => {
                    dispatch(setCategoryIndex(index));
                    onChangePage(index);
                }}
            />

            {loading && <Loading />}

        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    PageContainer: {
        width: windowWidth,
        alignItems: 'center',
    },
    TopTabContainer: {
        width: windowWidth,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        backgroundColor: 'white',
    },
    TopTabItems: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    TopTabText: {
        flex: 5,
        fontFamily: 'BrandonGrotesque-Bold',
        textAlign: 'center',
        fontSize: 17,
    },
    BackButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    CategoryItemStyle: {
        borderBottomWidth: 2.5,
        paddingHorizontal: 10,
        alignItems:'center',
        justifyContent:'center',
        // paddingBottom: 5,
    },
    CategoryTextStyle: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 14,
        paddingBottom: 5,
    },
    ContentsItemStyle: {
        width: windowWidth * 0.48,
        height: windowWidth * 0.48,
        borderRadius: 10,
        margin: windowWidth * 0.01,
    },
    PageList: {
        paddingTop: windowWidth * 0.01,
    },
    PageListContainer: {
        width: windowWidth,
    },
    PageFooterContainer: {
        paddingTop: 20,
        alignItems: 'center',
        paddingBottom: windowHeight * 0.05
    },
    CategoryListContainer: {
        marginTop: 5,
        // position:'absolute',
        bottom: -2.5,
    },
    CategoryOuterContainer: {
        borderBottomWidth: 2.5,
        borderBottomColor: '#ccc',
        height: windowHeight * 0.05,
    }
})