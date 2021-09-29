import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    Image,
    FlatList,
    View,
    Dimensions
} from 'react-native';
import { Text } from '@ui-kitten/components';
import { AuthContext } from '../../../context/AuthContext';
import { SERVER, CDN } from '../../../server.component';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

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
            <TouchableOpacity onPress={()=>{}} style={styles.ItemContainer}>
                <FastImage source={{ uri: CDN + item.item.image }} style={styles.BookmarkItem} resizeMode='stretch' />
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.MainContainer}>
            <FlatList
                data={bookmarkList}
                renderItem={renderItem}
                numColumns={3}
                key={'_'}
                keyExtractor={(item) => "_" + item._id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        marginTop: 10,
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
    }
})