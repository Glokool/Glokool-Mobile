import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { ZoneMainSceneProps } from '../../../navigation/ScreenNavigator/Zone.navigator';

const windowWidth = Dimensions.get('window').width;

export const ZoneBannerComponent = (props: ZoneMainSceneProps) => {

    const renderItem = (item) => {
        return (
            <TouchableOpacity>

            </TouchableOpacity>
        )
    }

    return (
        <Layout>

        </Layout>
    )
}

const styles = StyleSheet.create({

})