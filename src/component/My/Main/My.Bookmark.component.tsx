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

const windowWidth = Dimensions.get('window').width;

export const BookmarkList = () => {

    const [bookmarkList, setBookmarkList] = useState<Array<Detail_Item>>([]);

    useEffect(() => {
        InitBookmark();
    }, [])

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
            setBookmarkList([...response.data.tours, ...response.data.contents, ...response.data.blog]);
        })
    }

    const renderItem = (item: { item: Detail_Item }) => {
        console.log(item);
        return (
            <TouchableOpacity onPress={() => { }} style={styles.ItemContainer}>
                <FastImage source={{ uri: CDN + item.item.image }} style={styles.BookmarkItem} resizeMode='stretch' />
            </TouchableOpacity>
        )
    }

    return bookmarkList.length === 0 ? (
        // 리스트가 비었을때
        <View style={styles.EmptyContainer}>
            <Text style={[styles.EmptyText, { fontSize: 20 }]}>Whoops!</Text>
            <Text style={[styles.EmptyText, { fontSize: 15, marginVertical: 5 }]}>Your bookmark list is empty :(</Text>
            <Text style={[styles.EmptyText, { fontSize: 15, marginVertical: 5 }]}>Tap the bookmark icon to easily add to the list!</Text>
            <EmptyBookmark />
        </View>
    ) : (
        // 리스트 존재할때
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
        borderWidth: 1,
        borderRadius: 10,
        margin: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 2,
    },
    FlatListContainer: {
        width: windowWidth,
        backgroundColor: 'red',
        paddingBottom: 30,
    },
    ContentContainer: {
        alignSelf: 'center'
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