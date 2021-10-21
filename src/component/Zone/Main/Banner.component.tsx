import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { ZoneMainSceneProps } from '../../../navigation/SceneNavigator/Zone.navigator';
import { CDN } from '../../../server.component';
import FastImage from 'react-native-fast-image';

const windowWidth = Dimensions.get('window').width;

export const ZoneBannerComponent = (props: ZoneMainSceneProps) => {

    // list item
    const renderItem = (item: { item: string, index: number }) => {
        return (
            <TouchableOpacity style={[styles.ItemContainer, { backgroundColor: 'red' }]}>
                <FastImage
                    source={{ uri: CDN + item.item }}
                    style={styles.BannerItem}
                    resizeMode={'stretch'}
                />
            </TouchableOpacity>
        )
    }

    return (
        <Layout style={styles.MainContainer}>
            {/* zone 메인 배너 */}
            <SwiperFlatList
                index={0}
                autoplay={true}
                autoplayDelay={2}
                autoplayLoop={true}
                autoplayLoopKeepAnimation={true}
                data={props.items}
                renderItem={renderItem}
                showPagination
                paginationStyle={{ alignSelf: 'flex-start', bottom: -10 }}
                paginationDefaultColor={'rgba(0,0,0,0.4)'}
                paginationStyleItemActive={{
                    width: 17,
                    height: 5,
                    marginRight: -4,
                }}
                paginationActiveColor={'#fff'}
                paginationStyleItemInactive={{
                    width: 17,
                    height: 5,
                    marginRight: -4,
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
    },
    BannerItem: {
        width: windowWidth,
        height: windowWidth / 3,
    }
})