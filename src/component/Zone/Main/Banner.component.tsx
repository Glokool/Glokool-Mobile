import React from 'react';
import { Dimensions, Pressable, StyleSheet, } from 'react-native';
import { Layout } from '@ui-kitten/components';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { ZoneMainSceneProps } from '../../../navigation/SceneNavigator/Zone.navigator';
import FastImage, { Source } from 'react-native-fast-image';

const windowWidth = Dimensions.get('window').width;

type BannerType = {
    [key: string]: NodeRequire[];
}

export const ZoneBannerComponent = (props: ZoneMainSceneProps) => {
    
    const title = props.zoneTitle!.toUpperCase();
    const Banners: BannerType =
    {
        "HONGDAE": [
            require("../../../assets/image/Zone/ZoneMainBanner/hongdae/001.png"),
            require("../../../assets/image/Zone/ZoneMainBanner/hongdae/002.png"),
            require("../../../assets/image/Zone/ZoneMainBanner/hongdae/003.png"),
            require("../../../assets/image/Zone/ZoneMainBanner/hongdae/004.png"),
        ],
        "GWANGHWAMUN": [
            require("../../../assets/image/Zone/ZoneMainBanner/gwanghwamun/001.png"),
            require("../../../assets/image/Zone/ZoneMainBanner/gwanghwamun/002.png"),
            require("../../../assets/image/Zone/ZoneMainBanner/gwanghwamun/003.png"),
            require("../../../assets/image/Zone/ZoneMainBanner/gwanghwamun/004.png"),
        ],
    }

    // list item
    const renderItem = (item: { item: Source, index: number }) => {

        return (
            <Pressable style={[styles.ItemContainer, { backgroundColor: 'red' }]}>
                <FastImage
                    source={item.item}
                    style={styles.BannerItem}
                    resizeMode={'stretch'}
                />
            </Pressable>
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
                data={Banners[title]}
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
        height: windowWidth / 800 * 348,
        backgroundColor: '#0000',
    },
    BannerContainer: {
        backgroundColor: '#0000',
    },
    ItemContainer: {
        width: windowWidth,
        height: windowWidth / 800 * 348,
    },
    BannerItem: {
        width: windowWidth,
        height: windowWidth / 800 * 348,
    }
})