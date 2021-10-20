import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Dimensions,
    Text,
    TouchableOpacity
} from 'react-native';

import auth from '@react-native-firebase/auth';
import axios, { AxiosRequestConfig } from 'axios';
import FastImage from 'react-native-fast-image';

import { SERVER, CDN } from '../../../server.component';
import { Detail_Item } from '../../../types';
import { EmptyBookmark } from '../../../assets/icon/My';
import { NavigatorRoute, SceneRoute } from '../../../navigation/app.route';
import { MyScreenProps } from '../../../navigation/ScreenNavigator/My.navigator';

const windowWidth = Dimensions.get('window').width;

export const BookmarkList = (props: MyScreenProps) => {

    const [bookmarkList, setBookmarkList] = useState<Array<Detail_Item>>([]);

    useEffect(() => {
        InitBookmark();
    }, [])

    const onPressItem = (type: string, id: string) => {
        if (type == 'blog') {
            props.navigation.navigate(SceneRoute.BOOKMARK_DETAIL_BLOG, { Id: id });
        } else if (type == 'contents') {
            props.navigation.navigate(SceneRoute.BOOKMARK_DETAIL_CONTENT, { Id: id });
        }
    }

    // bookmarklist 초기화, api 완성 되면 바꿔야함
    const InitBookmark = async () => {
        const authToken = await auth().currentUser?.getIdToken();
        var config: AxiosRequestConfig = {
            method: 'get',
            url: SERVER + '/api/users/bookmark',
            headers: {
                Authorization: 'Bearer ' + authToken,
            },
        };

        axios(config).then((response) => {
            setBookmarkList(response.data.items);
        })
    }

    const renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.ItemContainer} onPress={() => onPressItem(item.item.itemType, item.item.id)}>
                <FastImage source={{ uri: CDN + item.item.image }} style={styles.BookmarkItem} resizeMode='stretch' />
            </TouchableOpacity>
        )
    }

    return bookmarkList.length === 0 ? (
        <View style={styles.EmptyContainer}>
            <EmptyBookmark />
            <Text style={[styles.EmptyText, { fontSize: 20 }]}>Whoops!</Text>
            <Text style={[styles.EmptyText, { fontSize: 15, marginVertical: 5 }]}>Your bookmark list is empty :(</Text>
            <Text style={[styles.EmptyText, { fontSize: 15, marginVertical: 5 }]}>Tap the bookmark icon to easily add to the list!</Text>
        </View>
    ) : (
        <View style={styles.MainContainer}>
            <FlatList
                data={bookmarkList}
                renderItem={renderItem}
                numColumns={3}
                key={'_'}
                keyExtractor={(item) => "_" + item._id}
                style={styles.FlatListContainer}
                contentContainerStyle={styles.ContentContainer}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        marginTop: 10,
        width: windowWidth,
        alignItems: 'center'
    },
    BookmarkItem: {
        width: windowWidth * 0.31,
        height: windowWidth * 0.31,
        borderRadius: 10,
    },
    ItemContainer: {
        borderRadius: 10,
        width: windowWidth * 0.31,
        height: windowWidth * 0.31,
        margin: windowWidth * 0.005,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    FlatListContainer: {
        width: windowWidth,
        paddingBottom: 30,
    },
    ContentContainer: {
        width: windowWidth * 0.965,
        alignSelf: 'center',
    },
    EmptyContainer: {
        backgroundColor: '#f9f9f9',
        width: windowWidth,
        height: windowWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
    EmptyText: {
        fontFamily: 'Pretendard-Medium',
        color: '#999',
    }
})