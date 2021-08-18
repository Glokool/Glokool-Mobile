import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, Platform, Image, FlatList, TouchableOpacity, Dimensions
} from 'react-native';
import { QuickSearchBanner, QuickSearchGlo } from '../../assets/icon/Chat';
import { CloseButton } from '../../assets/icon/Series';
import { SERVER } from '../../server.component';
import axios from 'axios';
import { ChatRoomScreenProps } from '../../navigation/ScreenNavigator/Chat.navigator';

import series_all from '../../assets/icon/Series/series_all.png';
import series_attraction from '../../assets/icon/Series/series_attraction.png';
import series_korea_atoz from '../../assets/icon/Series/series_korea_atoz.png'
import series_daytrip from '../../assets/icon/Series/series_daytrip.png';
import { FlatGrid } from 'react-native-super-grid';

const windowWidth = Dimensions.get('window').width;

export const ChatQuickSearch = (props: ChatRoomScreenProps) => {

    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [focusedCategory, setFocusedCategory] = useState(null);

    useEffect(() => {
        initCategories();
    }, []);

    const initCategories = async () => {
        const result = await axios.get(SERVER + '/api/category')
        setCategory(result.data);
    }

    const checkFocused = (item: any) => {
        setFocusedCategory({
            id: item._id,
            name: item.name,
        })
        setSubCategory(item.subCategory);
    }

    const renderItem = (item: any) => {
        const buttonBackground = item.item._id === focusedCategory?.id ? '#7777ff' : 'white';
        const textColor = item.item._id === focusedCategory?.id ? 'white' : '#7777ff';

        return (
            <TouchableOpacity onPress={() => checkFocused(item.item)}>
                <View style={[styles.categoryButton, { backgroundColor: buttonBackground }]}>
                    <Text style={[styles.buttonText, { color: textColor }]}>{item.item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const renderSubCategory = (item: any) => {
        console.log(item);
        return (
            <View style={styles.subCategoryButton}>
                <Text style={styles.subButtonText}>{item.item.name}</Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <View style={styles.topTabBar}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => props.navigation.pop()}>
                        <CloseButton />
                    </TouchableOpacity>

                    <Text style={styles.topTabText}>QUICK SEARCH</Text>
                </View>
                <Image source={require('../../assets/icon/Chat/QuickSearchButtonPressed.png')} style={{ width: 91, height: 40 }} resizeMode='contain' />
            </View>


            <QuickSearchBanner />
            {/* <QuickSearchGlo /> */}
            {/* <Image source={require('../../assets/icon/Chat/QuickSearchBanner.png')} /> */}
            <View>
                <FlatList
                    data={category}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingRight: 20 }}
                    horizontal
                />
            </View>

            {focusedCategory !== null ? (
                <View style={{ alignItems: 'center', marginTop: 10, }}>
                    <Image
                        source={require('../../assets/icon/Series/series_attraction.png')}
                        style={styles.categoryImage}
                        resizeMode='contain'
                    />
                    <View style={styles.GridContainer}>
                        <FlatGrid
                            itemDimension={150}
                            data={subCategory}
                            renderItem={renderSubCategory}
                            spacing={5}
                        />
                    </View>
                </View>
            ) : (
                null
            )}


        </View>
    )
};

const styles = StyleSheet.create({
    topTabBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        paddingBottom: 10,
    },
    topTabText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 17,
        color: '#7777ff',
        marginLeft: 15,
    },
    categoryButton: {
        borderColor: '#7777ff',
        borderWidth: 2,
        borderRadius: 100,
        padding: 10,
        margin: 5,
    },
    categoryImage: {
        width: windowWidth * 0.9,
        height: windowWidth / 1920 * 404 * 0.9,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    subCategoryButton: {
        borderWidth: 2,
        borderColor: '#eee',
        borderRadius: 10,
        padding: 5,
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 14,
    },
    subButtonText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 14,
        color: '#7777ff'
    },
    GridContainer: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#eee',
        width: windowWidth * 0.9,
        paddingTop: 5,
    },

});