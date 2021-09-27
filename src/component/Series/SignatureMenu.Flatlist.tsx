import React from 'react';
import {
    Image,
    FlatList,
    StyleSheet,
    Dimensions
} from 'react-native';
import {
    Layout,
    LayoutElement,
    Text
} from '@ui-kitten/components';
import { SelectableText } from '../Common/SelectableText.component';
import { CDN } from '../../server.component';
import { SignatureMenu } from '../../types';
import ImageModal from 'react-native-image-modal';

interface SignatureMenuFlatlistProps {
    data: Array<SignatureMenu> | undefined;
}

const WindowSize = Dimensions.get('window').width

export const SignatureMenuFlatlist = (props: SignatureMenuFlatlistProps): LayoutElement => {

    const renderItem = (item: { item: SignatureMenu, index: number }) => {
        console.log(item.item.img)
        return (
            <Layout style={styles.ImageContainer}>
                <ImageModal source={{ uri: CDN + item.item.img }} style={styles.Image} resizeMode={'contain'} />

                <SelectableText style={styles.MenuTitleText}>{item.item.title}</SelectableText>
                <Layout style={styles.PriceContainer}>
                    <Text style={styles.MenuPriceText}>{item.item.money}</Text>
                    <Text style={styles.KRWText}> KRW</Text>
                </Layout>
            </Layout>
        )
    }

    return (
        <Layout style={styles.MainContainer}>
            <FlatList
                data={props.data}
                renderItem={renderItem}
                contentContainerStyle={{ marginRight: 15 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </Layout>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        marginLeft: 30,
        marginTop: 20
    },
    ImageContainer: {
        marginRight: 15,
        width: WindowSize * 0.35,
    },
    Image: {
        width: WindowSize * 0.35,
        height: WindowSize * 0.35,
    },
    MenuTitleText: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 16,
        color: 'black'
    },
    PriceContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    MenuPriceText: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 15,
        color: 'black'
    },
    KRWText: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 13,
        color: '#8797FF'
    }
})