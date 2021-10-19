import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity, Dimensions, Alert, Platform } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { SERVER, CDN } from '../../../server.component';
import axios from 'axios';
import { ExploreIcon, GloProfile } from '../../../assets/icon/Zone';
import { ZoneMainSceneProps } from '../../../navigation/ScreenNavigator/Zone.navigator';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import { setGuideVisiblityTrue } from '../../../model/Zone/Zone.UI.model';
import { ZoneChatModal } from '..';
import LinearGradient from 'react-native-linear-gradient';
import { windowHeight } from '../../../Design.component';

const windowWidth = Dimensions.get('window').width;

export const ZoneGuideListComponent = (props: ZoneMainSceneProps) => {

    const dispatch = useDispatch();

    const [guideList, setGuideList] = useState();
    const [guideInfo, setGuideInfo] = useState();
    const [route, setRoute] = useState({});

    useEffect(() => {
        // InitialGuideList();
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
                const res = await axios.get(`${SERVER}/api/chat-rooms/` + item._id);

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

    const ListHeaderComponent = () => {
        return (
            <TouchableOpacity style={styles.GuideContainer} onPress={() => { }}>
                <Layout style={styles.ItemContainer}>

                    <Layout style={[styles.ImageBorder, { borderColor: '#8797ff' }]}>
                        {/* <FastImage source={{ uri: CDN + item.item.guide.avatar }} style={styles.ImageItem} resizeMode={'contain'} /> */}
                        <GloProfile />
                    </Layout>

                    <Text style={[styles.ItemText, { color: '#7777ff' }]}>Glo</Text>

                    <Layout style={styles.KeywordContainer}>
                        <Text style={styles.KeywordText}>Virtual</Text>
                        <Text style={styles.KeywordText}>Travel Assistant</Text>
                    </Layout>

                </Layout>

            </TouchableOpacity>
        )
    }

    // 가이드 리스트 아이템
    const renderItem = (item: { item, index }) => {
        return (
            <TouchableOpacity style={styles.GuideContainer} onPress={() => InitialGuideInfo(item.item)}>
                <Layout style={styles.ItemContainer}>

                    <Layout style={[styles.ImageBorder, { borderColor: item.item.maxUserNum > item.item.users.length ? '#7777ff' : '#0000' }]}>
                        <FastImage source={{ uri: CDN + item.item.guide.avatar }} style={styles.ImageItem} resizeMode={'contain'} />
                    </Layout>

                    <Text style={styles.ItemText}>{item.item.guide.name}</Text>

                    <Layout style={styles.KeywordContainer}>
                        {item.item.guide.keyword &&
                            item.item.guide.keyword.map((item) => (
                                <Text style={styles.KeywordText}>#{item}</Text>
                            ))
                        }
                    </Layout>

                </Layout>

                {/* 채팅방 참여 가능 여부 먼저 검사 */}
                {(item.item.maxUserNum > item.item.users.length) ? (
                    // 참여 가능 시
                    // group 인지 private 인지 검사
                    item.item.maxUserNum > 1 ? (
                        <LinearGradient
                            style={styles.ChatTypeIcon}
                            colors={['#9668ef', '#7777ff']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Text style={styles.ChatTypeText}>GROUP</Text>
                        </LinearGradient>
                    ) : (
                        <Layout style={[styles.ChatTypeIcon, { backgroundColor: '#7777ff' }]} >
                            <Text style={styles.ChatTypeText}>PRIVATE</Text>
                        </Layout>
                    )
                ) : (
                    // 참여 불가능 시
                    // group 인지 private 인지 검사
                    item.item.maxUserNum > 1 ? (
                        <Layout style={styles.ChatTypeIconDisabled} >
                            <Text style={styles.ChatTypeText}>GROUP</Text>
                        </Layout>
                    ) : (
                        <Layout style={styles.ChatTypeIconDisabled} >
                            <Text style={styles.ChatTypeText}>PRIVATE</Text>
                        </Layout>
                    )
                )}

            </TouchableOpacity>
        )
    }

    return (
        <Layout style={{ width: '100%' }}>
            {/* 가이드 (챗방) list */}
            <FlatList
                data={props.items}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.FlatListContainer}
                ListFooterComponent={<Layout style={{ width: 15 }} />}
                ListHeaderComponent={ListHeaderComponent}
                keyExtractor={(item, index) => index.toString()}
            />
            {/* guide 더보기 버튼 */}
            <TouchableOpacity style={styles.ButtonContainer}>
                <Text style={[styles.ButtonText, { color: 'white' }]}>Click to Explore More </Text>
                <Text style={[styles.ButtonText, { color: '#8596FF', marginRight: 10, }]}>Travel Assistants</Text>
                <ExploreIcon />
            </TouchableOpacity>

            {guideInfo && <ZoneChatModal guide={guideInfo} navigation={props.navigation} />}

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
        elevation: 5,
    },
    ItemText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        marginTop: 10,
    },
    ImageItem: {
        width: windowWidth * 0.15,
        height: windowWidth * 0.15,
        borderWidth: 0.5,
        borderRadius: 100,
    },
    KeywordContainer: {
        alignItems: 'center',
        marginTop: 7,
        height: windowHeight * 0.04
    },
    KeywordText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 14,
        textAlign: 'center'
    },
    ChatTypeIcon: {
        position: 'absolute',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 15,
        top: 5,
        elevation: 6,
    },
    ChatTypeText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        color: 'white',
    },
    ChatTypeIconDisabled: {
        position: 'absolute',
        backgroundColor: '#b5b5b5',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 15,
        top: 5,
        elevation: 6,
    },
    ChatTypeTextDisabled: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        color: '#e4e4e4',
    },
    GuideContainer: {
        paddingTop: 20,
        paddingBottom: 10,
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
        alignSelf: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
    },
    ButtonText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: Platform.OS === 'ios' ? 16 : 14,
    },
})