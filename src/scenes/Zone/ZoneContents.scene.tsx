import React from 'react';
import { StyleSheet, Text, ScrollView, FlatList, TouchableOpacity, Platform } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { ArrowLeft } from '../../assets/icon/Common';
import { windowHeight, windowWidth } from '../../Design.component';
import { SeriesBottomLogo } from '../../assets/icon/Series'
import { ZoneContentsSceneProps } from '../../navigation/ScreenNavigator/Zone.navigator';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../model';
import { setCategoryIndex } from '../../model/Zone/Zone.UI.model';

export const ZoneContentsScene = (props: ZoneContentsSceneProps) => {

    const categoryIndex = useSelector((state: RootState) => state.ZoneUIModel.categoryIndex);
    const dispatch = useDispatch();

    const sampleData = ["ALL", "THINGS TO DO", "FOOD", "PUB.CAFE", "DAY TRIP", "TRAVEL TIPS"]
    // const [pageIndex, setPageIndex] = React.useState(0);
    const scrollRef = React.useRef<SwiperFlatList>(null);

    const renderContents = (item) => {
        return (
            <TouchableOpacity
                style={styles.ContentsItemStyle}
            />
        )
    }

    const renderCategory = (item) => {
        return (
            <TouchableOpacity
                style={[styles.CategoryItemStyle, { borderBottomColor: item.index == categoryIndex ? "black" : "#ccc", }]}
                onPress={() => scrollRef.current?.scrollToIndex({ index: item.index })}
            >
                <Text style={[styles.CategoryTextStyle, { color: item.index == categoryIndex ? "black" : "#ccc", }]}>{item.item}</Text>
            </TouchableOpacity>
        )
    }

    const renderPage = (item) => {

        return (
            <Layout style={styles.PageContainer} >
                <FlatList
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    renderItem={renderContents}
                    key={"_"}
                    keyExtractor={item => "_" + item}
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
            <Layout style={styles.TopTabContainer}>
                <Layout style={styles.TopTabItems}>

                    <TouchableOpacity style={styles.BackButton} onPress={() => props.navigation.pop()}>
                        <ArrowLeft />
                    </TouchableOpacity>

                    <Text style={styles.TopTabText}>HONGDAE</Text>

                    <Layout style={{ flex: 1 }} />
                </Layout>
                {/* Category Flatlist */}
                <FlatList
                    data={sampleData}
                    renderItem={renderCategory}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.CategoryListContainer}
                />
            </Layout>

            <SwiperFlatList
                index={categoryIndex}
                data={sampleData}
                ref={scrollRef}
                renderItem={renderPage}
                onChangeIndex={({ index, prevIndex }) => {
                    dispatch(setCategoryIndex(index));
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
        backgroundColor: '#ccc',
        margin: 2,
    },
    PageListContainer: {
        paddingTop: 10,
    },
    PageFooterContainer: {
        alignItems: 'center'
    },
    CategoryListContainer:{
        marginTop: 10, 
    }
})