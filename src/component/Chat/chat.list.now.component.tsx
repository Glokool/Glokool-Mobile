import React, { useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, FlatList, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { Layout, Text, LayoutElement, } from '@ui-kitten/components';
import { ChatListNowProps } from '../../navigation/ScreenNavigator/Chat.navigator';
import axios from 'axios';
import { SERVER, CDN } from '../../server.component';
import { GloChatData } from '../../types';
import moment from 'moment';
import { SceneRoute } from '../../navigation/app.route';

import { ProfileModal } from './chat.profile.component';
import { AuthContext } from '../../context/AuthContext';

export const ChatListNow = (props: ChatListNowProps): LayoutElement => {
    const user = auth().currentUser;

    const userContext = useContext(AuthContext);

    const Today = new Date();
    const [data, setData] = useState<Array<GloChatData>>([]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const [guide, setGuide] = useState({});
    const [guideVisible, setGuideVisible] = useState(false);
    const [ENG, setENG] = useState(false);
    const [CHN, setCHN] = useState(false);

    const [route, setRoute] = useState({});

    useEffect(() => {
        InitNowList();
    }, []);

    // 가이드 프로필 모달 컴포넌트에 true 전달 후 바로 false
    useEffect(() => {
        if (guideVisible) {
            setGuideVisible(false);
        }
    }, [guideVisible])

    const InitNowList = async () => {

        if (userContext.currentUser) {
            const Token = await user?.getIdToken(true);
            const AxiosConfig = {
                method: 'get',
                url: SERVER + '/api/users/reservations/future',
                headers: {
                    Authorization: 'Bearer ' + Token,
                },
            };
            axios(AxiosConfig)
                .then((res) => {
                    setData(res.data);
                })
                .catch((e) => {
                    console.log('error : ', e);
                });

        }
        setLoading(false);
    }
    // 여기서 날짜 등등 데이터를 navigate 할 때 같이 전달해줌
    function PressChatRoom(item: GloChatData) {
        const DDay = moment(item.day).diff(Today, 'days');

        if (item.guide == undefined) {
            Alert.alert('Sorry', 'We are currently matching your travel assistant :)');
            return;
        }

        props.navigation.navigate(SceneRoute.CHATROOM, {
            id: item._id,
            guide: {
                name: item.guide.name,
                uid: item.guide.uid,
                token: item.guide.token,
            },
            day: item.day,
            finish: true,
        });

    }

    // 가이드 사진 클릭 시 가이드 프로필 출력
    const showGuideProfile = async (item: GloChatData) => {

        if (item.guide.uid != '') {
            setRoute({
                params: {
                    id: item._id,
                    guide: {
                        uid: item.guide.uid,
                        name: item.guide.name,
                    }
                }
            });

            try {
                const res = await axios.get(`${SERVER}/api/guides/` + item.guide.uid);

                setGuide({
                    avatar: res.data.avatar,
                    name: res.data.name,
                    gender: res.data.gender,
                    birthDate: res.data.birthDate,
                    lang: res.data.lang,
                    country: res.data.country,
                    intro: res.data.intro,
                    oneLineIntro: res.data.oneLineIntro,
                    keyword: res.data.keyword,
                })
                if (res.data.lang.length == 1) {
                    setENG(true);
                    setCHN(false);
                }
                else {
                    if (res.data.lang[0]) { setENG(true); }
                    if (res.data.lang[1]) { setCHN(true); }
                }

                setGuideVisible(true);
            } catch (e) {
                console.log('e', e);
            }
        }
        else {
            Alert.alert('Sorry,', 'Guide Not Matched!');
        }
    }


    const RenderItem = (item: { item: GloChatData; index: number }) => {
        // 날짜 계산
        const DDay = moment(item.item.day).diff(Today, 'days');
        const ItemDay = (new Date(item.item.day)).getDate();

        return (
            <Layout style={styles.ChatLayout}>
                <TouchableOpacity
                    style={styles.ChatContainer}
                    onPress={() => PressChatRoom(item.item)}>
                    <Layout style={styles.GuideContainer}>
                        <TouchableOpacity onPress={() => showGuideProfile(item.item)}>
                            <Layout style={styles.GuideAvatarContainer}>
                                {
                                    item.item.guide?.avatar != undefined &&
                                        item.item.guide?.avatar != null ? (
                                        <Image
                                            source={{ uri: CDN + item.item.guide?.avatar }}
                                            style={styles.GuideAvatar}
                                        />
                                    ) : (
                                        <Image
                                            source={require('../../assets/profile/profile_01.png')}
                                            style={styles.GuideAvatar}
                                        />
                                    )}
                            </Layout>
                        </TouchableOpacity>

                        <Layout style={styles.GuideProfileContainer}>
                            <Text style={styles.GuideProfileTxt1}>
                                Travel Assistant
                            </Text>
                            {item.item.guide?.uid === '' ||
                                item.item.guide?.uid === undefined ||
                                item.item.guide?.uid === null ? (
                                <Text style={styles.GuideProfileTxt3}>
                                    Matching... please wait :)
                                </Text>
                            ) : (
                                <Text style={styles.GuideProfileTxt2}>
                                    {item.item.guide.name}
                                </Text>
                            )}
                        </Layout>
                    </Layout>

                    <Layout style={styles.DateContainer}>
                        {DDay > 0 ? (
                            <Text style={styles.DdayTxt}>D - {DDay}</Text>
                        ) : (
                            ItemDay == Today.getDate() ? (
                                <Text style={styles.DdayTxt}>D - Day</Text>
                            ) : (
                                <Text style={styles.DdayTxt}>D - 1</Text>
                            )
                        )}
                        <Text style={styles.dateTxt}>
                            {moment(item.item.day).format('MM.DD')}
                        </Text>
                    </Layout>
                </TouchableOpacity>
            </Layout>
        );
    };

    return loading ? (
        <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator color='#999' size='large' />
        </Layout>
    ) : (
        <>
            <Layout>
                {data.length === 0 ? (
                    <Layout style={styles.EmptyContainer}>
                        <Text style={styles.EmptyText}>TRAVEL ASSISTANT SERVICE</Text>
                        <TouchableOpacity
                            style={styles.EmptyButton}
                            onPress={() =>
                                props.navigation.navigate(
                                    SceneRoute.SERIES_A_DETAIL,
                                    { Id: '60cc01e0ee8b3104211971b4' },
                                )
                            }>
                            <Text style={styles.EmptyButtonText}>
                                HOW TO USE GloChat
                            </Text>
                        </TouchableOpacity>
                    </Layout>
                ) : (
                    <Layout style={styles.Container}>
                        <FlatList
                            data={data}
                            renderItem={RenderItem}
                            refreshing={refresh}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 500 }}
                        />
                        {/* 가이드 프로필 모달 */}
                        <ProfileModal guide={guide} ENG={ENG} CHN={CHN} isVisible={guideVisible} navigation={props.navigation} route={route} />

                    </Layout>
                )}
            </Layout>
        </>
    );
};

const styles = StyleSheet.create({
    EmptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },
    EmptyText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 18,
        color: '#000',
        marginTop: 24,
        marginBottom: 3,
    },
    EmptyButton: {
        width: 344,
        height: 37,
        borderRadius: 8,
        borderWidth: 3.5,
        borderColor: "#f1f1f1",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 26,
    },
    EmptyButtonText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 19,
        color: '#7777FF',
    },
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#00FF0000',
        marginBottom: 10,
    },
    ChatLayout: {
        width: '99%',
        alignSelf: 'center',
        paddingHorizontal: 10,
        height: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
        marginBottom: 10,
    },
    ChatContainer: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
    },
    GuideContainer: {
        flexDirection: 'row',
        flex: 8,
        backgroundColor: '#00FF0000',
    },
    GuideAvatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00FF0000',
    },
    GuideAvatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 0.5,
        borderColor: '#ccc',
    },
    GuideProfileContainer: {
        marginLeft: 10,
        backgroundColor: '#00FF0000',
    },
    GuideProfileTxt1: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 15,
        color: '#C3C3C3',
        marginBottom: -5,
    },
    GuideProfileTxt2: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 15,
        color: 'black',
        marginTop: 0,
    },
    GuideProfileTxt3: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 15,
        color: '#7777FF',
        marginTop: 0,
    },
    DateContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00FF0000',
    },
    DdayTxt: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 16,
        color: '#8797FF',
    },
    dateTxt: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 12,
        color: 'black',
        marginBottom: -5,
    },
});
