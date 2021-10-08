import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { SERVER, CDN } from '../../../server.component';
import axios from 'axios';
import { ExploreIcon } from '../../../assets/icon/Zone';
import { ZoneMainSceneProps } from '../../../navigation/ScreenNavigator/Zone.navigator';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import { setGuideVisiblityTrue } from '../../../model/Zone/Zone.UI.model';
import { ZoneChatModal } from '.';

const windowWidth = Dimensions.get('window').width;

export const ZoneGuideListComponent = (props: ZoneMainSceneProps) => {

    const dispatch = useDispatch();

    const [guideList, setGuideList] = useState();
    const [guideInfo, setGuideInfo] = useState();
    const [route, setRoute] = useState({});

    useEffect(() => {
        InitialGuideList();
    }, []);

    // 초기 가이드 리스트 초기화
    const InitialGuideList = () => {
        axios.get(SERVER + '/api/guides')
            .then((response) => setGuideList(response.data))
            .catch((e) => console.log(e));
    }

    // 가이드 클릭했을 때 모달로 넘겨줄 정보 요청
    const InitialGuideInfo = async (item) => {

        if (item.uid != '') {
            setRoute({
                params: {
                    id: item._id,
                    guide: {
                        uid: item.uid,
                        name: item.name,
                    }
                }
            });

            try {
                const res = await axios.get(`${SERVER}/api/guides/` + item.uid);
                setGuideInfo(res.data)
                dispatch(setGuideVisiblityTrue());
            } catch (e) {
                console.log('e', e);
            }
        }
        else {
            Alert.alert('Sorry,', 'Guide Not Matched!');
        }
    }

    // 가이드 리스트 아이템
    const renderItem = (item: { item, index }) => {
        return (
            <TouchableOpacity style={styles.GuideContainer} onPress={() => InitialGuideInfo(item.item)}>
                <Layout style={styles.ItemContainer}>

                    <Layout style={[styles.ImageBorder, { borderColor: item.index === 0 ? '#7777ff' : '#0000' }]}>
                        <FastImage source={{ uri: CDN + item.item.avatar }} style={styles.ImageItem} resizeMode={'contain'} />
                    </Layout>

                    <Text style={styles.ItemText}>{item.item.name}</Text>

                    <Layout style={styles.KeywordContainer}>
                        <Text># K-pop lover</Text>
                        <Text># Hidden Spots</Text>
                    </Layout>

                </Layout>

                {(item.index === 0) && (
                    <Layout style={styles.FreeIcon}>
                        <Text style={styles.FreeText}>FREE</Text>
                    </Layout>
                )}
                {(item.index === 1) && (
                    <Layout style={styles.FreeIconDisabled}>
                        <Text style={styles.FreeTextDisabled}>FREE</Text>
                    </Layout>
                )}

            </TouchableOpacity>
        )
    }

    return (
        <Layout style={{ alignItems: 'center' }}>
            {/* 가이드 (챗방) list */}
            <FlatList
                data={guideList}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.FlatListContainer}
                ListFooterComponent={<Layout style={{ width: 15 }} />}
                keyExtractor={(item, index) => index.toString()}
            />
            {/* guide 더보기 버튼 */}
            <TouchableOpacity style={styles.ButtonContainer}>
                <Text style={[styles.ButtonText, { color: 'white' }]}>Click to Explore More </Text>
                <Text style={[styles.ButtonText, { color: '#8596FF', marginRight: 10, }]}>Travel Assistants</Text>
                <ExploreIcon />
            </TouchableOpacity>

            {guideInfo && <ZoneChatModal guide={guideInfo} />}

        </Layout>
    )
}

const styles = StyleSheet.create({
    ItemContainer: {
        borderRadius: 10,
        width: windowWidth * 0.35,
        alignItems: 'center',
        paddingVertical: 20,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 2,
    },
    ItemText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        marginTop: 5,
    },
    ImageItem: {
        width: windowWidth * 0.15,
        height: windowWidth * 0.15,
        borderWidth: 0.5,
        borderRadius: 100,
    },
    KeywordContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    FreeIcon: {
        position: 'absolute',
        backgroundColor: '#7777ff',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 15,
        top: 5,
    },
    FreeText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        color: 'white',
    },
    FreeIconDisabled: {
        position: 'absolute',
        backgroundColor: '#b5b5b5',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 15,
        top: 5,
    },
    FreeTextDisabled: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        color: '#e4e4e4',
    },
    GuideContainer: {
        paddingTop: 20,
        alignItems: 'center',
    },
    ImageBorder: {
        width: windowWidth * 0.17,
        height: windowWidth * 0.17,
        borderWidth: 2,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    FlatListContainer: {
        paddingBottom: 20,
        paddingLeft: 10,
    },
    ButtonContainer: {
        backgroundColor: '#292434',
        width: windowWidth * 0.95,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
    },
    ButtonText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 16,
    },
})