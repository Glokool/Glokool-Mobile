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
import axios from 'axios';
import FastImage from 'react-native-fast-image';

import { SERVER, CDN } from '../../../server.component';

const windowWidth = Dimensions.get('window').width;

export const BookmarkList = () => {

    const [bookmarkList, setBookmarkList] = useState<Array>([]);

    useEffect(() => {
        InitBookmark();
    }, [])

    const InitBookmark = async () => {
        const authToken = await auth().currentUser?.getIdToken();
        var config = {
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

    const renderItem = (item) => {
        return (
            <TouchableOpacity onPress={() => { }} style={styles.ItemContainer}>
                <FastImage source={{ uri: CDN + item.item.image }} style={styles.BookmarkItem} resizeMode='stretch' />
            </TouchableOpacity>
        )
    }

    return bookmarkList.length == 0 ? (
        <View>
            <Text>Whoops!</Text>
            <Text>Your bookmark list is empty</Text>
            <Text>Tap the bookmark icon to easily add to the list</Text>
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
            />
        </View>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        marginTop: 10,
        width: windowWidth,
        alignItems:'center'
    },
    BookmarkItem: {
        width: windowWidth * 0.31,
        height: windowWidth * 0.31,
        borderRadius: 10,
    },
    ItemContainer: {
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
    FlatListContainer:{
        width: windowWidth * 0.31 * 3 + 6,
        backgroundColor: '#ffff'
    }
})