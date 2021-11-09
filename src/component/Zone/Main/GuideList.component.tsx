import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, FlatList, Pressable, Dimensions, Alert, Platform } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { SERVER, CDN } from '../../../server.component';
import axios from 'axios';
import { ExploreIcon, GloProfile } from '../../../assets/icon/Zone';
import { ZoneMainSceneProps } from '../../../navigation/SceneNavigator/Zone.navigator';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import { setGuideVisiblityTrue } from '../../../model/Zone/Zone.UI.model';
import { ZoneChatModal } from '..';
import LinearGradient from 'react-native-linear-gradient';
import { windowHeight } from '../../../Design.component';
import { SceneRoute, NavigatorRoute } from '../../../navigation/app.route';
import { AuthContext } from '../../../context/AuthContext';
import { loginAlertWindow } from '../../Common/LoginCheck.component';
import moment from 'moment';

const windowWidth = Dimensions.get('window').width;

export const ZoneGuideListComponent = (props: ZoneMainSceneProps) => {

    const dispatch = useDispatch();
    const [guideInfo, setGuideInfo] = useState();

    const { currentUser } = useContext(AuthContext);

    // 가이드 클릭했을 때 모달로 넘겨줄 정보 요청
    const InitialGuideInfo = (item: any) => {

        if (item.uid != '') {
            axios.get(`${SERVER}/chat-rooms/` + item._id).then((res) => {
                setGuideInfo(res.data)
                dispatch(setGuideVisiblityTrue());
            }).catch((e) => {
                console.log('e', e);
            });
        }
        else {
            Alert.alert('Sorry,', 'Guide Not Matched!');
        }
    }

    const isAvailable = () => {
        const hourDiff = new Date().getTimezoneOffset() / 60 * 100;
        const localTime = Number(moment(new Date()).format('kkmm'));
        const KST = localTime + hourDiff + 900;

        if (1801 <= KST && KST <= 2359) {
            return false;
        } else {
            return true;
        }
    }

    const onPressExploreButton = () => {
        if (currentUser && isAvailable()) {
            props.navigation.navigate(
                SceneRoute.CHAT_TA_SELECT,
                { zone: props.zoneTitle! }
            )
        } else {
            if (isAvailable()) {
                loginAlertWindow(props.navigation);
            } else {
                Alert.alert("", "Sorry, booking is only available from 12AM ~ 5:59PM (KST) everyday. Please try again later.")
            }
        }
    }

    const ListHeaderComponent = () => {
        return (
            <Pressable style={styles.GuideContainer} onPress={() => { }}>
                <Layout style={[styles.ItemContainer, { borderColor: '#D1D1FF' }]}>

                    <Layout style={[styles.ImageBorder, { borderColor: '#8797ff' }]}>
                        <GloProfile />
                    </Layout>

                    <Text style={[styles.ItemText, { color: '#7777ff' }]}>Glo</Text>

                    <Layout style={styles.KeywordContainer}>
                        <Text style={styles.KeywordText}>Virtual</Text>
                        <Text style={styles.KeywordText}>Travel Assistant</Text>
                    </Layout>

                </Layout>

            </Pressable>
        )
    }

    // 가이드 리스트 아이템
    const renderItem = (item: { item, index: number }) => {
        return (
            <Pressable style={styles.GuideContainer} onPress={() => InitialGuideInfo(item.item)}>
                <Layout style={[styles.ItemContainer, { borderColor: '#fff' }]}>

                    <Layout style={[styles.ImageBorder, { borderColor: item.item.maxUserNum > item.item.userCount ? '#7777ff' : '#0000' }]}>
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
                {(item.item.maxUserNum > item.item.userCount) ? (
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

            </Pressable>
        )
    }

    return (
        <Layout style={{ width: '100%' }}>

            <Text style={styles.GuideText}>LOCAL EXPERTS IN THIS AREA</Text>

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
            <Pressable
                style={styles.ButtonContainer}
                onPress={() => {
                    onPressExploreButton();
                }}>
                <Text style={[styles.ButtonText, { color: 'white' }]}>Click to Explore More </Text>
                <Text style={[styles.ButtonText, { color: '#8596FF', marginRight: 10, }]}>Travel Assistants</Text>
                <ExploreIcon />
            </Pressable>

            {guideInfo && <ZoneChatModal guideInfo={guideInfo} />}

        </Layout >
    )
}

const styles = StyleSheet.create({
    ItemContainer: {
        borderRadius: 10,
        borderWidth: 3,
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
        backgroundColor: 'white'
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
        backgroundColor: '#0000',
    },
    KeywordContainer: {
        alignItems: 'center',
        marginTop: 7,
        height: windowHeight * 0.04,
        backgroundColor: '#0000',
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
        backgroundColor: '#0000',
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
    GuideText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 18,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
})