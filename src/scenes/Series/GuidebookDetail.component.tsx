import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Platform,
    View,
    Text,
} from 'react-native';
import { SERVER } from '../../server.component';
import axios from 'axios';
import { SubCategoryDetailProps } from '../../navigation/ScreenNavigator/Series.navigator';
import moment from 'moment';
import { SceneRoute } from '../../navigation/app.route';
import { CountNum_Purple } from '../../assets/icon/Series';
import { AngleLeft } from '../../assets/icon/Common';
import FastImage from 'react-native-fast-image';
import { FlatGrid } from 'react-native-super-grid';

const windowWidth = Dimensions.get('window').width;

// 소분류가 GUIDE BOOK 일때 해당 페이지로 
export const GuidebookDetail = (props: SubCategoryDetailProps) => {

    const [listData, setListData] = useState();

    // 아이템 초기화
    useEffect(() => {
        initItems();
    }, []);

    // 아이템 초기화
    const initItems = async () => {
        const config = '/api/sub-categories?main='
            + props.route.params.Main + '&sub='
            + props.route.params.Name + '&limit=0';

        const response = await axios.get(SERVER + config);
        setListData(response.data);
    }

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

    // 가이드북 아이템 렌더링
    const renderItem = (item: any) => {
        return (
            <TouchableOpacity onPress={() => onPressItem(item.item)} style={styles.OuterContainer}>
                <View style={styles.listItemContainer}>
                    {/* Image */}
                    <FastImage source={{ uri: item.item.image }} style={styles.imageContainer} resizeMode='contain' />

                    <View style={styles.propsContainer}>

                        <View style={{ height: 50 }}>
                            <Text style={styles.titleText}>#hashtag  #hashtag  #hashtag</Text>
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
                <Text style={styles.descText}>Guide books of specially chosen tour spots.</Text>
            </View>
            <FlatGrid
                data={listData}
                renderItem={renderItem}
                style={{ paddingTop: 20 }}
            />
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
        width: windowWidth * 0.46,
        overflow: 'hidden',
        borderRadius: 8,
    },
    OuterContainer: {
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
        width: windowWidth * 0.46,
        height: windowWidth * 0.46,
    },
    propsContainer: {
        width: windowWidth * 0.46,
        backgroundColor: 'white',
        paddingLeft: 15,
        paddingVertical: 15,
        justifyContent: 'space-between'
    },
    titleText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 14,
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
    countNumContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        width: '35%' 
    }
});
