import React, { useEffect, useState } from 'react'
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Platform,
} from 'react-native';
import { SERVER, CDN } from '../../server.component';
import axios from 'axios';
import { SceneRoute } from '../../navigation/app.route';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { FlatGrid } from 'react-native-super-grid';
import { SeriesBottomLogo } from '../../assets/icon/Series';
import { GridItem } from '../../types';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Series 메인에서 Grid 형태로 나타나는 컴포넌트

export const SeriesGrid = (props: any) => {

    const [content, setContent] = useState(props.data);
    const [first, setFirst] = useState(true);

    // item 클릭 시 화면 전환
    // 이후 어느정도 수정 필요할듯...
    const onPressItem = (item: GridItem) => {
        if (item.type == 'tour') {
            props.navigation.navigate(SceneRoute.SERIES_HIDDEN_GEM_DETAIL, { TourCode: item.id });
        } else if (item.type == 'content') {
            props.navigation.navigate(SceneRoute.SERIES_A_DETAIL, { Id: item.id })
        } else if (item.type == 'blog') {
            props.navigation.navigate(SceneRoute.SERIES_B_DETAIL, { Id: item.id })
        }
    }

    // grid 아이템 렌더링
    const renderItem = (item: { index: number, item: GridItem }) => {

        const textFont = item.item.type == 'tour' ? 'BrandonGrotesque-BoldItalic' : 'Pretendard-Medium';
        const textSize = item.item.type == 'tour' ? 16 : 13;
        const textAlign = item.item.type == 'tour' ? 'center' : 'flex-start';
        const lineHeight = item.item.type == 'tour' ? 18 : 15;

        return (
            <TouchableOpacity onPress={() => onPressItem(item.item)}>
                <View style={styles.itemContainer}>
                    <FastImage
                        source={{ uri: CDN + item.item.image }}
                        style={{
                            width: windowWidth * 0.33,
                            height: windowWidth * 0.33,
                        }}
                        resizeMode={'stretch'} />
                </View>
                <View style={{ alignItems: item.item.type == 'tour' ? 'center' : 'auto' }}>
                    {item.item.type != 'content' && (
                        <LinearGradient
                            colors={['#00000000', '#00000000', '#0008']}
                            style={[styles.itemTextContainer, { alignItems: textAlign }]}
                        >
                            <Text style={[styles.itemText, { fontFamily: textFont, fontSize: Platform.OS === 'android' ? textSize - 2 : textSize, lineHeight: lineHeight }]}>
                                {item.item.title}
                            </Text>
                        </LinearGradient>
                    )}
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, }}>
            <FlatGrid
                itemDimension={windowWidth * 0.3}
                data={props.data.slice(0, props.itemCount)}
                renderItem={renderItem}
                spacing={1.5}
                style={styles.GridStyle}
            />
            <View style={styles.bottomContainer}>
                <SeriesBottomLogo style={{ marginBottom: 10, marginTop: 10, }} width={'15%'} />
                {props.endReached == true &&
                    props.data.length > props.itemCount ? <ActivityIndicator /> : null}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden'
    },
    itemText: {
        color: 'white',
    },
    itemTextContainer: {
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 7,
        width: windowWidth * 0.33,
        height: windowWidth * 0.33,
        borderRadius: 10,
        justifyContent: 'flex-end',
        paddingBottom: 10,
    },
    GridStyle: {
        marginTop: 135,
        backgroundColor: '#1b1b1b',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    bottomContainer: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: windowHeight * 0.13,
        backgroundColor: '#1b1b1b'
    }
});