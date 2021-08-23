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
import { FlatGrid } from 'react-native-super-grid';
import { SeriesBottomLogo } from '../../assets/icon/Series';
import { withTheme } from 'styled-components';

export const CategoryDetail = (props: any) => {

    const regex = new RegExp(props.main, "gi");
    const flag = regex.test('korea a-z');

    const pressedMore = (item: any) => {
        const config = {
            Name: item.name,
            Main: props.main,
        };
        item.name == 'GUIDE BOOK' ? (
            props.navigation.navigate(SceneRoute.GUIDEBOOK_DETAIL, config)
        ) : (
            props.navigation.navigate(SceneRoute.SUBCATEGORY_DETAIL, config)
        );

    }

    const onPressItem = (item: any) => {
        console.log(item);
        if (item.type == 'tour') {
            props.navigation.navigate(SceneRoute.SERIES_HIDDEN_GEM_DETAIL, { TourCode: item._id });
        } else if (item.type == 'content') {
            props.navigation.navigate(SceneRoute.SERIES_A_DETAIL, { Id: item._id })
        } else if (item.type == 'blog') {
            props.navigation.navigate(SceneRoute.SERIES_B_DETAIL, { Id: item._id })
        }
    }

    const renderSpace = () => {
        return (<View style={{ width: 25 }} />)
    }

    const renderItem = (item: any) => {
        return (
            <TouchableOpacity onPress={() => onPressItem(item.item)}>
                <View>
                    <FastImage source={{ uri: item.item.image }} style={{ width: 150, height: 150, borderRadius: 10, borderWidth: 1, marginRight: 5, }} resizeMode='contain' />
                    {flag == false && (
                        <View style={{
                            position: 'absolute',
                            bottom: 15,
                            alignItems: 'center',
                            paddingHorizontal: 15,
                        }}>
                            <Text style={{ fontFamily: 'Pretendard-Medium', color: 'white', fontSize: 17 }}>{item.item.title}</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        )
    }

    const renderGridItem = (item: any) => {
        return (
            <TouchableOpacity onPress={() => onPressItem(item.item)}>
                <View>
                    <FastImage source={{ uri: item.item.image }} style={{ width: 150, height: 150, borderRadius: 10, borderWidth: 1, }} resizeMode='contain' />
                    <View style={{
                        position: 'absolute',
                        bottom: 15,
                        alignItems: 'center',
                        width: 150,
                    }}>
                        <Text style={{ fontFamily: 'BrandonGrotesque-BoldItalic', color: 'white', fontSize: 15 }}>{item.item.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const renderCategory = (item: any) => {
        const textColor = item.item.name === 'GUIDE BOOK' ? '#7777ff' : 'black';
        // console.log(item);
        return (
            <View style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginHorizontal: 25, marginVertical: 5, }}>
                    <Text style={{ fontFamily: 'BrandonGrotesque-BoldItalic', fontSize: 19, color: textColor }}>{item.item.name}</Text>
                    <TouchableOpacity onPress={() => pressedMore(item.item)}>
                        <Text style={{ fontFamily: 'Pretendard-Regular', fontSize: 15, color: '#7777ff' }}>View More</Text>
                    </TouchableOpacity>
                </View>

                {item.item.name === 'GUIDE BOOK' ? (
                    <View style={{ height: 315 }}>
                        <FlatGrid
                            itemDimension={150}
                            data={item.item.items}
                            renderItem={renderGridItem}
                            spacing={5}
                            ListHeaderComponent={renderSpace}
                            horizontal
                        />
                    </View>
                ) : (
                    <FlatList
                        data={item.item.items}
                        renderItem={renderItem}
                        ListHeaderComponent={renderSpace}
                        ListFooterComponent={renderSpace}
                        horizontal
                    />
                )}

            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f8f8f8', paddingBottom: 20, }}>
            <View style={styles.trendingNowContainer}>
                <Text style={{ fontFamily: 'BrandonGrotesque-BoldItalic', fontSize: 21, color: '#7777ff', marginLeft: 25, }}>
                    TRENDING NOW
                </Text>
                {/* <FlatList
                    data={sampleData}
                    renderItem={renderItem}
                    ListHeaderComponent={renderSpace}
                    ListFooterComponent={renderSpace}
                    horizontal
                /> */}
            </View>
            <View style={{ backgroundColor: '#f8f8f8', marginTop: 20, }}>
                <FlatList
                    data={props.data}
                    renderItem={renderCategory}
                    style={{}}
                />
            </View>
            <View style={{ alignItems: 'center' }}>
                <SeriesBottomLogo />
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
            height: 2,
        },
        shadowOpacity: 0.11,
        shadowRadius: 2,
        elevation: 5,
    }
})