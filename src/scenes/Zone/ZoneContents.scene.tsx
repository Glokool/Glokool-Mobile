import React from 'react';
import { StyleSheet, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { windowHeight, windowWidth } from '../../Design.component';

export const ZoneContentsScene = () => {

    const sampleData = ["red", "orange", "yellow", "green", "blue", "purple"]
    const [pageIndex, setPageIndex] = React.useState(0);
    const scrollRef = React.useRef<SwiperFlatList>(null);



    const renderCategory = (item) => {
        return (
            <TouchableOpacity
                style={{ width: 50, height: 30, borderWidth: 1, }}
                onPress={() => scrollRef.current?.scrollToIndex({ index: item.index })}
            >
                <Text style={{ marginLeft: 5, color: item.index == pageIndex ? "red" : "black" }}>{item.item}</Text>
            </TouchableOpacity>
        )
    }

    const renderPage = (item) => {

        return (
            <Layout style={[styles.page, { backgroundColor: item.item }]} >
                <ScrollView>
                    <Text>TEST</Text><Text>TEST</Text><Text>TEST</Text><Text>TEST</Text><Text>TEST</Text><Text>TEST</Text><Text>TEST</Text><Text>TEST</Text><Text>TEST</Text><Text>TEST</Text><Text>TEST</Text>
                </ScrollView>
            </Layout>
        )
    }

    return (
        <Layout>
            <SafeAreaView />
            <FlatList
                data={sampleData}
                renderItem={renderCategory}
            />
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
    }

})