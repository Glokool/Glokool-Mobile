import React, { useEffect, useState } from 'react'
import {
    ScrollView,
    Text,
    View,
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { SERVER } from '../../server.component';
import axios from 'axios';
import { SceneRoute } from '../../navigation/app.route';
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

    const [content, setContent] = useState<Object>([]);

    useEffect(() => {
        InitGrid();
    }, [])

    const InitGrid = async () => {
        const tmpContent: Array<Object> = [];

        const config = {
            Method: "get",
            url: SERVER + "/api/main-tours",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        };

        const hiddenGem = await axios(config);
        const hiddenGemData = hiddenGem.data;
        hiddenGemData.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        hiddenGem.data.map((item: any, index: any) => {
            tmpContent.push(({
                image: item.banner,
                title: item.title,
                id: item._id,
                type: 'guide book'
            }))
        })

        const seriesA = await axios.get(SERVER + '/api/contents');
        seriesA.data.map((item: any, index: any) => {
            tmpContent.push(({
                image: item.image,
                title: item.title,
                id: item._id,
                type: 'card news'
            }))
        })

        const seriesB = await axios.get(SERVER + '/api/blog');
        seriesB.data.map((item: any, index: any) => {
            tmpContent.push(({
                image: item.cover,
                title: item.title,
                id: item._id,
                type: 'blog'
            }))
        })
        tmpContent.sort(() => Math.random() - 0.5);
        setContent(tmpContent);
    }

    const onPressItem = (item: GridItem) => {
        if (item.type == 'guide book') {
            props.navigation.navigate(SceneRoute.SERIES_HIDDEN_GEM_DETAIL, { TourCode: item.id });
        } else if (item.type == 'card news') {
            props.navigation.navigate(SceneRoute.SERIES_A_DETAIL, { Id: item.id })
        } else if (item.type == 'blog') {
            props.navigation.navigate(SceneRoute.SERIES_B_DETAIL, { Id: item.id })
        }
    }

    const renderItem = (item: { index: number, item: GridItem }) => {

        const textFont = item.item.type == 'guide book' ? 'BrandonGrotesque-BoldItalic' : 'Pretendard-Medium';
        const textSize = item.item.type == 'guide book' ? 17 : 13;

        return (
            <TouchableOpacity onPress={() => onPressItem(item.item)}>
                <View style={styles.itemContainer}>
                    <Image
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
        <View style={{ flex: 1, }}>
            <FlatGrid
                itemDimension={100}
                data={content}
                renderItem={renderItem}
                spacing={1.5}
                style={styles.GridStyle}
            />
            <View style={styles.bottomContainer}>
                <SeriesBottomLogo />
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