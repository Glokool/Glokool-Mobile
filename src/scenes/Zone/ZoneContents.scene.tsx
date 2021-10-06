import React from 'react';
import { StyleSheet, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { ArrowLeft } from '../../assets/icon/Common';
import { windowHeight, windowWidth } from '../../Design.component';

export const ZoneContentsScene = () => {

    const sampleData = ["ALL", "THINGS TO DO", "FOOD", "PUB.CAFE", "DAY TRIP", "TRAVEL TIPS"]
    const [pageIndex, setPageIndex] = React.useState(0);
    const scrollRef = React.useRef<SwiperFlatList>(null);

    const renderContents = (item) => {
        return (
            <TouchableOpacity
                style={{
                    width: windowWidth * 0.48,
                    height: windowWidth * 0.48,
                    borderRadius: 10,
                    backgroundColor: 'gray',
                    margin: 2,
    
                }}
            />
        )
    }

    const renderCategory = (item) => {
        return (
            <TouchableOpacity
                style={{ borderBottomWidth: 2, paddingHorizontal: 5, borderBottomColor: item.index == pageIndex ? "black" : "#ccc" }}
                onPress={() => scrollRef.current?.scrollToIndex({ index: item.index })}
            >
                <Text style={{ marginLeft: 5, color: item.index == pageIndex ? "black" : "#ccc", fontFamily: 'BrandonGrotesque-Bold', fontSize: 17 }}>{item.item}</Text>
            </TouchableOpacity>
        )
    }

    const renderPage = (item) => {

        return (
            <Layout style={[styles.page, { backgroundColor: item.item }]} >
                <FlatList
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    renderItem={renderContents}
                    key={"_"}
                    keyExtractor={item => "_" + item}
                    numColumns={2}
                />
            </Layout>
        )
    }

    return (
        <Layout>

            <Layout style={styles.TopTabContainer}>
                <SafeAreaView />
                <Layout style={styles.TopTabItems}>

                    <TouchableOpacity style={styles.BackButton} onPress={() => props.navigation.pop()}>
                        <ArrowLeft />
                    </TouchableOpacity>

                    <Text style={styles.TopTabText}>HONGDAE</Text>

                    <Layout style={{ flex: 1 }} />
                </Layout>
                <FlatList
                    data={sampleData}
                    renderItem={renderCategory}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 10, }}
                />
            </Layout>

            <SwiperFlatList
                index={pageIndex}
                data={sampleData}
                ref={scrollRef}
                renderItem={renderPage}
                onChangeIndex={({ index, prevIndex }) => {
                    setPageIndex(index);
                }}
            />

        </Layout>
    )
}

const styles = StyleSheet.create({
    page: {
        width: windowWidth,
        height: windowHeight * 0.6,
    },
    TopTabContainer: {
        width: windowWidth,
        paddingBottom: 10,
        backgroundColor: 'white'
    },
    TopTabItems: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    TopTabText: {
        flex: 5,
        fontFamily: 'BrandonGrotesque-Bold',
        textAlign: 'center',
        fontSize: 20,
    },
    BackButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

})