import React from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    View,
    Text,
    Platform,
} from 'react-native'
import {
    LayoutElement,
} from '@ui-kitten/components'
import { Pin } from '../../assets/icon/Series';
import { Instagram, Naver } from '../../assets/icon/SNS';
import { SelectableText } from '../../component/Common/SelectableText.component'
import { CDN } from '../../server.component';
import { photoSpot, photoSpotImage } from '../../types';
import ImageModal from 'react-native-image-modal';

interface DetailFlatlistProps {
    data: Array<photoSpot> | undefined
}

const WindowSize = Dimensions.get('window').width;

export const PhotoSpotFlatlist = (props: DetailFlatlistProps): LayoutElement => {

    const renderSpace = () => {
        return (
            <View style={{ width: 30 }}></View>
        )
    }

    const renderInnerList = (item: any) => {
        return (
            <View>
                <ImageModal
                    source={{ uri: CDN + item.item.img }}
                    style={styles.InsideImage} resizeMode={'contain'}
                />
                <View style={styles.authorContainer}>
                    {item.item.author === 'i' && <Instagram />}
                    {item.item.author === 'n' && <Naver />}
                </View>
            </View>
        )
    }

    const renderOuterList = (item: any) => {
        return (
            <View style={{ marginTop: 25 }}>
                <FlatList
                    data={item.item.images}
                    renderItem={renderInnerList}
                    ListHeaderComponent={renderSpace}
                    ListFooterComponent={renderSpace}
                    horizontal
                />
                <View style={{ marginHorizontal: 30 }}>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginRight: 30 }}>
                        <Pin style={styles.Pin} />
                        <SelectableText style={styles.LocationText}>{item.item.location}</SelectableText>
                    </View>
                    <SelectableText style={styles.DescriptionText}>{item.item.desc}</SelectableText>
                </View>
            </View>
        )
    }


    return (
        <View style={{ marginBottom: 25 }}>
            <FlatList
                data={props.data}
                renderItem={renderOuterList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    authorContainer: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 10,
        left: 20,
        backgroundColor: '#00FF0000'
    },
    authorText: {
        fontFamily: 'IBMPlexSansKR-Text',
        fontSize: 13,
        color: 'white'
    },
    InsideImage: {
        width: WindowSize * 0.58,
        height: WindowSize * 0.77,
        marginRight: 5,
    },
    LocationText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: Platform.OS === 'ios' ? 14 : 12,
        color: '#747474',
    },
    DescriptionText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 15,
        color: 'black',
        marginTop: 8,
    },
    Pin: {
        marginLeft: 0,
        marginRight: 10
    }
})

