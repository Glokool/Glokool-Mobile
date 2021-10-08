import React from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { ZoneMainSceneProps } from '../../../navigation/ScreenNavigator/Zone.navigator';
import { windowHeight, windowWidth } from '../../../Design.component';
import { ExploreIcon, ViewMoreIcon } from '../../../assets/icon/Zone';
import { SceneRoute } from '../../../navigation/app.route';

export const ZoneCategoryListComponent = (props: ZoneMainSceneProps) => {
    const sampleData = ['THINGS TO DO', 'FOOD', 'PUB&CAFE', 'DAY TRIP', 'TRAVEL TIPS'];

    // 컨텐츠 렌더링
    const renderContents = (item) => {
        return (
            <TouchableOpacity style={styles.ContentContainer}>

            </TouchableOpacity>
        )
    }

    // 카테고리 렌더링 
    const renderCategory = (item) => {

        return (
            <Layout style={styles.CategoryContainer}>
                <Text style={styles.ItemText}>{item.item}</Text>
                {/* 카테고리 하위 컨텐츠 아이템 리스트 */}
                <FlatList
                    data={[1, 2, 3, 4, 5]}
                    renderItem={renderContents}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ListFooterComponent={
                        <TouchableOpacity style={styles.ListFooterIcon}>
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
                <Layout style={styles.AllContainer}>
                    <Text style={styles.AllText}>View All</Text>
                </Layout>
            </Layout>
            
            {/* 카테고리 리스트 */}
            <FlatList
                data={sampleData}
                renderItem={renderCategory}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
            />

            {/* 더 많은 컨텐츠 보기 버튼 */}
            <TouchableOpacity style={styles.BottomButton} onPress={() => props.navigation.navigate(SceneRoute.ZONE_CONTENTS)}>
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
        width: windowWidth * 0.4,
        height: windowWidth * 0.4,
        borderRadius: 10,
        backgroundColor: '#ddd',
        marginHorizontal: 5,
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