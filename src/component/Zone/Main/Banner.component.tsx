import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { ZoneMainSceneProps } from '../../../navigation/ScreenNavigator/Zone.navigator';
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ZoneBannerComponent = (props: ZoneMainSceneProps) => {

    const sampleData = ['red', 'black', 'blue', 'green', 'orange', 'tomato']

    const renderItem = (item) => {

        return (
            <TouchableOpacity style={[styles.ItemContainer, { backgroundColor: item.item }]}>

            </TouchableOpacity>
        )
    }

    return (
        <Layout style={styles.MainContainer}>
            <SwiperFlatList
                index={0}
                autoplay={true}
                autoplayDelay={2}
                autoplayLoop={true}
                autoplayLoopKeepAnimation={true}
                data={sampleData}
                renderItem={renderItem}
                showPagination
                paginationStyle={{ bottom: -10 }}
                paginationDefaultColor={'#d2d2d2'}
                paginationStyleItemActive={{
                    width: 10,
                    height: 5,
                }}
                paginationActiveColor={'#7777ff'}
                paginationStyleItemInactive={{
                    width: 10,
                    height: 5,
                }}
                style={styles.BannerContainer}
            />

        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: windowWidth,
        height: windowWidth / 3,
        backgroundColor: '#0000',
    },
    BannerContainer: {

        backgroundColor: '#0000',
    },
    ItemContainer: {
        width: windowWidth,
        height: windowWidth / 3,
    }
})