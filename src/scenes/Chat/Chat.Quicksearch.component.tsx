import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, Platform, Image, FlatList, TouchableOpacity, Dimensions
} from 'react-native';
import { QuickSearchBanner, QuickSearchGlo } from '../../assets/icon/Chat';
import { CloseButton } from '../../assets/icon/Series';
import { SceneRoute } from '../../navigation/app.route';
import { SERVER } from '../../server.component';
import axios from 'axios';
import { ChatRoomScreenProps } from '../../navigation/ScreenNavigator/Chat.navigator';
import FastImage from 'react-native-fast-image';
import series_attraction from '../../assets/icon/Series/series_attraction.png';
import series_korea_atoz from '../../assets/icon/Series/series_korea_atoz.png'
import series_daytrip from '../../assets/icon/Series/series_daytrip.png';
import { FlatGrid } from 'react-native-super-grid';
import { ScrollView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;

export const ChatQuickSearch = (props: ChatRoomScreenProps) => {

    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [focusedCategory, setFocusedCategory] = useState(null);
    const [focusedSubCategory, setFocusedSubCategory] = useState(null);
    const [contents, setContents] = useState();
    const [banner, setBanner] = useState();

    useEffect(() => {
        initCategories();
    }, []);

    const initCategories = async () => {
        const result = await axios.get(SERVER + '/api/main-categories')
        setCategory(result.data);
    }

    const pressCategory = async (item: any) => {

        focusedSubCategory !== null && setFocusedSubCategory(null)

        setFocusedCategory({
            id: item._id,
            name: item.name,
        })

        const config = {
            Method: "get",
            url: SERVER + "/api/categories/" + item.name,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        };
        const response = await axios(config).catch((e) => console.log(e));
        // console.log(response.data);
        setSubCategory(response.data);

        if (item.name.toUpperCase() == 'ATTRACTION') {
            setBanner(series_attraction);
        } else if (item.name.toUpperCase() == 'KOREA A-Z') {
            setBanner(series_korea_atoz);
        } else if (item.name.toUpperCase() == 'DAY TRIP') {
            setBanner(series_daytrip);
        }
    }

    const pressSubCategory = (item: any) => {
        setFocusedSubCategory({
            id: item._id,
            name: item.name
        })

        setContents(item.items);
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

    const renderItem = (item: any) => {
        const buttonBackground = item.item._id === focusedCategory?.id ? '#7777ff' : 'white';
        const textColor = item.item._id === focusedCategory?.id ? 'white' : '#7777ff';

        return (
            <TouchableOpacity onPress={() => pressCategory(item.item)}>
                <View style={[styles.categoryButton, { backgroundColor: buttonBackground }]}>
                    <Text style={[styles.buttonText, { color: textColor }]}>{item.item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const renderSubCategory = (item: any) => {
        const buttonBackground = item.item._id === focusedSubCategory?.id ? '#eee' : 'white';

        return (
            <TouchableOpacity onPress={() => pressSubCategory(item.item)}>
                <View style={[styles.subCategoryButton, { backgroundColor: buttonBackground }]}>
                    <Text style={styles.subButtonText}>{item.item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const renderContents = (item: any) => {
        console.log(item.item.type);
        const titleFont = item.item.type == 'tour' ? 'BrandonGrotesque-BoldItalic' : 'Pretendard-Medium';
        const titleAlign = item.item.type == 'tour' ? 'center' : 'flex-start';
        const titleSize = item.item.type == 'tour' ? 17 : 14;

        return (
            <TouchableOpacity onPress={() => onPressItem(item.item)}>
                <View style={styles.ImageContainer}>
                    <FastImage source={{ uri: item.item.image }} style={styles.contentsImage} resizeMode='contain' />
                    {item.item.type != 'content' && (
                        <View style={{
                            position: 'absolute',
                            bottom: 15,
                            width: 150,
                            alignItems: titleAlign,
                            paddingHorizontal: 15,
                        }}>
                            <Text style={{ fontFamily: titleFont, color: 'white', fontSize: titleSize }}>{item.item.title}</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
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
                <FastImage source={require('../../assets/icon/Chat/QuickSearchButtonPressed.png')} style={{ width: 91, height: 40 }} resizeMode='contain' />
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

            <ScrollView>
                {focusedCategory !== null && (
                    <View style={{ alignItems: 'center', marginTop: 10, }}>
                        <FastImage
                            source={banner}
                            style={styles.categoryImage}
                            resizeMode='contain'
                        />
                        <View style={styles.GridContainer}>
                            <FlatGrid
                                itemDimension={150}
                                data={subCategory}
                                renderItem={renderSubCategory}
                                spacing={5}
                                scrollEnabled={false}
                            />
                        </View>
                    </View>
                )}

                {focusedSubCategory !== null && (
                    <FlatGrid
                        itemDimension={130}
                        data={contents}
                        renderItem={renderContents}
                        scrollEnabled={false}
                        style={{ marginHorizontal: 20, }}
                    />
                )}
            </ScrollView>


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
    contentsImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    ImageContainer: {
        borderRadius: 10,
        overflow: 'hidden'
    }
});