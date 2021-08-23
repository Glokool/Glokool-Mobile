import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    FlatList,
    Platform,
    View,
    Text,
    ScrollView,
    RefreshControl
} from 'react-native';
import { SERVER } from '../../server.component';
import axios from 'axios';
import { SubCategoryDetailProps } from '../../navigation/ScreenNavigator/Series.navigator';
import moment from 'moment';
import { SceneRoute } from '../../navigation/app.route';
import { CountNum_Purple } from '../../assets/icon/Series';
import { AngleLeft } from '../../assets/icon/Common';
import FastImage from 'react-native-fast-image';

const windowWidth = Dimensions.get('window').width;

export const SubCategoryDetail = (props: SubCategoryDetailProps) => {

    const [listData, setListData] = useState();
    const [refreshing, setRefreshing] = useState(false);

    // 아이템 초기화
    useEffect(() => {
        initItems();
    }, []);

    // 당겨서 새로고침 끝날때 요청
    useEffect(() => {
        refreshing == false && initItems();

    }, [refreshing])

    // 아이템 초기화 
    const initItems = async () => {
        const config = '/api/sub-categories?main='
            + props.route.params.Main + '&sub='
            + props.route.params.Name + '&limit=0';

        const response = await axios.get(SERVER + config);

        setListData(response.data);
    }

    // 당겨서 새로고침
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }, []);

    // 아이템 클릭 시 화면 이동
    const onPressItem = (item: any) => {
        if (item.type == 'tour') {
            props.navigation.navigate(SceneRoute.SERIES_HIDDEN_GEM_DETAIL, { TourCode: item._id });
        } else if (item.type == 'content') {
            props.navigation.navigate(SceneRoute.SERIES_A_DETAIL, { Id: item._id })
        } else if (item.type == 'blog') {
            props.navigation.navigate(SceneRoute.SERIES_B_DETAIL, { Id: item._id })
        }
    }

    // Flatlist Component
    const renderItem = (item: any) => {
        return (
            <TouchableOpacity onPress={() => onPressItem(item.item)}>
                <View style={styles.listItemContainer}>
                    {/* Image */}
                    <FastImage source={{ uri: item.item.image }} style={styles.imageContainer} resizeMode='contain' />

                    <View style={styles.propsContainer}>

                        <View>
                            <Text style={styles.titleText}>{item.item.title}</Text>
                        </View>

                        <View style={styles.listBottomContainer}>
                            <Text style={styles.grayText}>
                                {moment(item.createdAt).format(
                                    'YYYY. M. D',
                                )}
                            </Text>
                            <View style={styles.countNumContainer}>
                                <CountNum_Purple />
                                <Text style={styles.grayText}>{item.item.count}</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', }}>

            <View style={styles.topTab}>
                <TouchableOpacity onPress={() => props.navigation.pop()}>
                    <AngleLeft />
                </TouchableOpacity>
                <Text style={styles.topTabText}>{props.route.params.Name}</Text>
            </View>
            <View style={styles.descContainer}>
                <Text style={styles.descText}>Everything you want to know about Korea</Text>
            </View>

            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}
            >
                <FlatList
                    data={listData}
                    renderItem={renderItem}
                    style={{ paddingTop: 20, }}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    topTab: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: Platform.OS === 'ios' ? 50 : 20,
        paddingVertical: 10,
    },
    topTabText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 22,
        color: '#7777ff',
        marginLeft: 20,
    },
    descContainer: {
        backgroundColor: '#f8f8f8',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    descText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 16,
        color: '#a0a0a0',
    },
    listItemContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 5,
        width: windowWidth - 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imageContainer: {
        width: 113,
        height: 113,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    propsContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        paddingLeft: 15,
        paddingVertical: 15,
        justifyContent: 'space-between'
    },
    titleText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 17,
    },
    grayText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 13,
        color: '#b5b5b5',
        marginLeft: 5,
    },
    listBottomContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    countNumContainer:{
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        width: '35%' 
    }
});
