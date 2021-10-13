import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity, Platform } from 'react-native';
import { Layout, ListItem, Spinner } from '@ui-kitten/components';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { windowHeight, windowWidth } from '../../Design.component';
import { SeriesBottomLogo } from '../../assets/icon/Series'
import { ZoneContentsSceneProps } from '../../navigation/ScreenNavigator/Zone.navigator';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../model';
import { setCategoryIndex } from '../../model/Zone/Zone.UI.model';
import { CommonTopTabBar } from '../../component/Common';
import axios from 'axios';
import { SERVER, CDN } from '../../server.component';
import FastImage from 'react-native-fast-image';
import { setZoneLoadingFalse, setZoneLoadingTrue } from '../../model/Zone/Zone.Loading.model';

export const ZoneContentsScene = (props: ZoneContentsSceneProps) => {

    const categoryIndex = useSelector((state: RootState) => state.ZoneUIModel.categoryIndex);
    const dispatch = useDispatch();

    const scrollRef = useRef<SwiperFlatList>(null);

    const [category, setCategory] = useState<Array<any>>([]);
    const [fetchedItem, setFetchedItem] = useState<any>({});

    useEffect(() => {

        initCategory();
        dispatch(setCategoryIndex(props.route.params.pageIndex));
        // unmount 시 index 0 으로 초기화
        // return () => { dispatch(setCategoryIndex(0)) }
    }, [])

    // 페이지 내 컨텐츠 렌더링
    const renderContents = (item) => {

        return (
            <TouchableOpacity >
                <FastImage
                    source={{ uri: CDN + item.item.image }}
                    style={styles.ContentsItemStyle}
                    resizeMode={'stretch'}
                />
            </TouchableOpacity>
        )
    }

    const initCategory = async () => {
        const response = await axios.get(SERVER + '/api/main-categories/' + 'Hongdae' + '/sub-categories')
        setCategory(response.data);

        const initFirstCategory = await axios.get(SERVER + '/api/main-categories/' + 'Hongdae' + '?q=' + response.data[0].name + '&limit=0')
        setFetchedItem({ ...fetchedItem, [response.data[0].name]: initFirstCategory.data });
    }

    const onPressCategory = (index: number) => {
        scrollRef.current?.scrollToIndex({ index: index });

        // onChangePage(index);
    }

    // 상단 바 카테고리 버튼 리스트
    const renderCategory = (item) => {

        return (
            <TouchableOpacity
                style={[styles.CategoryItemStyle, { borderBottomColor: item.index == categoryIndex ? "black" : "#ccc", }]}
                onPress={() => onPressCategory(item.index)}
            >
                <Text style={[styles.CategoryTextStyle, { color: item.index == categoryIndex ? "black" : "#ccc", }]}>{item.item.name.toUpperCase()}</Text>
            </TouchableOpacity>
        )
    }

    const onChangePage = (index: number) => {
        if (!(category[index].name in fetchedItem)) {
            axios.get(SERVER + '/api/main-categories/' + 'Hongdae' + '?q=' + category[index].name + '&limit=0')
                .then((response) => {
                    // console.log(response.data);
                    setFetchedItem({ ...fetchedItem, [category[index].name]: response.data });
                });
        }
    }

    // 페이지 렌더링 
    const renderPage = (item) => {

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
                    style={styles.PageListContainer}
                    ListFooterComponent={<SeriesBottomLogo />}
                    ListFooterComponentStyle={styles.PageFooterContainer}
                />
            </Layout>
        )
    }

    return (
        <Layout style={styles.MainContainer}>

            {/* Top Tab Bar */}
            <CommonTopTabBar
                title={'HONGDAE'}
                navigation={props.navigation}
                child={
                    <FlatList
                        data={category}
                        renderItem={renderCategory}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.CategoryListContainer}
                    />}
            />
            {/* page 전체를 담는 list , 양옆으로 swipe 가능 */}
            <SwiperFlatList
                initialScrollIndex={props.route.params.pageIndex}
                index={categoryIndex}
                data={category}
                ref={scrollRef}
                renderItem={renderPage}
                onChangeIndex={({ index, prevIndex }) => {
                    dispatch(setCategoryIndex(index));
                    onChangePage(index);
                }}
            />

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
        borderBottomWidth: 2,
        paddingHorizontal: 5,
    },
    CategoryTextStyle: {
        marginLeft: 5,
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 14
    },
    ContentsItemStyle: {
        width: windowWidth * 0.48,
        height: windowWidth * 0.48,
        borderRadius: 10,
        margin: 2,
        borderWidth: 0.3
    },
    PageListContainer: {
        paddingTop: 10,
    },
    PageFooterContainer: {
        paddingTop: 20,
        alignItems: 'center',
        paddingBottom: windowHeight * 0.05
    },
    CategoryListContainer: {
        marginTop: 10,
    }
})