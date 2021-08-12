import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, Platform, Image, FlatList
} from 'react-native';
import { QuickSearchButtonPressed, QuickSearchBanner, QuickSearchGlo } from '../../assets/icon/Chat';
import { CloseButton } from '../../assets/icon/Series';
import { SERVER } from '../../server.component';
import axios from 'axios';

export const ChatQuickSearch = () => {

    const [category, setCategory] = useState([]);

    useEffect(() => {
        initCategories();
    }, []);

    const initCategories = async () => {
        const result = await axios.get(SERVER + '/api/category')
        setCategory(result.data);
    }

    const renderItem = (item: any) => {
        return (
            <View style={styles.categoryButton}>
                <Text style={styles.buttonText}>{item.item.name}</Text>
            </View>
        )
    }

    return (
        <View style={{ alignItems: 'center', backgroundColor: 'white' }}>
            <View style={styles.topTabBar}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CloseButton />
                    <Text style={styles.topTabText}>QUICK SEARCH</Text>
                </View>
                <QuickSearchButtonPressed />
            </View>
            <QuickSearchBanner />
            <QuickSearchGlo />
            <Image source={require('../../assets/icon/Chat/QuickSearchBanner.png')} />

            <FlatList
                data={category}
                renderItem={renderItem}
                contentContainerStyle={{ paddingRight: 20 }}
                horizontal
            />

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
        backgroundColor: 'white'
    },
    buttonText:{
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 14,
        color: '#7777ff'
    }
});