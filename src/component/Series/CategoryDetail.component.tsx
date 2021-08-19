import React, { useEffect, useState } from 'react'
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import { SERVER } from '../../server.component';
import axios from 'axios';
import { SceneRoute } from '../../navigation/app.route';
import FastImage from 'react-native-fast-image';

export const CategoryDetail = (props: any) => {

    const sampleData = [1, 2, 3, 4, 5, 6]

    const renderItem = (item: any) => {
        return (
            <View style={{ width: 150, height: 150, backgroundColor: 'tomato', borderRadius: 10, marginRight: 10, }} />
        )
    }

    const renderCategory = (item: any) => {
        return (
            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontFamily: 'BrandonGrotesque-BoldItalic', fontSize: 19, color: 'black', marginLeft: 20, }}>{item.item}</Text>
                <FlatList
                    data={sampleData}
                    renderItem={renderItem}
                    horizontal
                />
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
            <View style={styles.trendingNowContainer}>
                <Text style={{ fontFamily: 'BrandonGrotesque-BoldItalic', fontSize: 21, color: '#7777ff', marginLeft: 20, }}>
                    TRENDING NOW
                </Text>
                <FlatList
                    data={sampleData}
                    renderItem={renderItem}
                    horizontal
                />
            </View>
            <View style={{ backgroundColor: '#f8f8f8', marginTop: 20, }}>
                <FlatList
                    data={props.data}
                    renderItem={renderCategory}
                    style={{}}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    trendingNowContainer: {
        backgroundColor: 'white',
        paddingVertical: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    }
})