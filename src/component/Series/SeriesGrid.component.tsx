import React, { useEffect, useState } from 'react'
import {
    ScrollView,
    Text,
    View,
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { SERVER } from '../../server.component';
import axios from 'axios';
import { SceneRoute } from '../../navigation/app.route';
import FastImage from 'react-native-fast-image';
import { FlatGrid } from 'react-native-super-grid';
import { SeriesBottomLogo } from '../../assets/icon/Series';

type GridItem = {
    image: string,
    title: string,
    id: string,
    type: string,
}

const windowWidth = Dimensions.get('window').width;

export const SeriesGrid = (props: any) => {

    const [content, setContent] = useState([]);

    // grid item 초기화
    useEffect(() => {
        initGrid();
    }, [])

    // 새로고침 시 refresh
    useEffect(() => {
        if (props.refreshing == true) {
            initGrid();
        }
    })

    // grid item 초기화
    const initGrid = async () => {
        const tmpContent: Array<Object> = [];
        const response = await axios.get(SERVER + '/api/series');
        response.data.map((item: any, index: any) => {
            tmpContent.push(({
                image: item.image,
                title: item.title,
                id: item._id,
                type: item.type,
            }))
        })
        setContent(tmpContent);
    }

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

        const textFont = item.item.type == 'guide book' ? 'BrandonGrotesque-BoldItalic' : 'Pretendard-Medium';
        const textSize = item.item.type == 'guide book' ? 17 : 13;

        return (
            <TouchableOpacity onPress={() => onPressItem(item.item)}>
                <View style={styles.itemContainer}>
                    <FastImage
                        source={{ uri: item.item.image }}
                        style={{
                            width: windowWidth * 0.33,
                            height: windowWidth * 0.33,
                        }}
                        resizeMode={'stretch'} />
                </View>
                <View style={{ alignItems: item.item.type == 'guide book' ? 'center' : 'auto' }}>
                    {item.item.type != 'card news' ? (
                        <View style={styles.itemTextContainer}>
                            <Text style={[styles.itemText, { fontFamily: textFont, fontSize: textSize }]}>
                                {item.item.title}
                            </Text>
                        </View>
                    ) : null}
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1,}}>
            <FlatGrid
                itemDimension={100}
                data={content.slice(0, props.itemCount)}
                renderItem={renderItem}
                spacing={1.5}
                style={styles.GridStyle}
            />
            <View style={styles.bottomContainer}>
                <SeriesBottomLogo style={{marginBottom:10,}}/>
                {props.endReached == true &&
                    content.length > props.itemCount ? <ActivityIndicator /> : null}

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
        bottom: 10,
        alignItems: 'center',
        paddingHorizontal: 7,
    },
    GridStyle: {
        marginTop: 150,
        backgroundColor: '#1b1b1b',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    bottomContainer: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: '#1b1b1b'
    }
});