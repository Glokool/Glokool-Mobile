import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, FlatList, TouchableOpacity, Image, Pressable, Alert } from 'react-native';
import { Layout, Text, LayoutElement, Modal } from '@ui-kitten/components';
import { ChatListNowProps } from '../../navigation/ScreenNavigator/Chat.navigator';
import axios from 'axios';
import { SERVER } from '../../server.component';
import { GloChatData } from '.';
import moment from 'moment';
import { SceneRoute } from '../../navigation/app.route';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { ProfileModal } from './chat.profile.component';

export const ChatListNow = (props: ChatListNowProps): LayoutElement => {
    const user = auth().currentUser;
    const Today = new Date();
    const [data, setData] = React.useState<Array<GloChatData>>([]);
    const [refresh, setRefresh] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(true);

    const [guide, setGuide] = useState({});
    const [guideVisible, setGuideVisible] = useState(false);
    const [ENG, setENG] = useState(false);
    const [CHN, setCHN] = useState(false);

    React.useEffect(() => {
        InitNowList();
    }, []);

    // 가이드 프로필 모달 컴포넌트에 true 전달 후 바로 false
    React.useEffect(() => {
        if (guideVisible) {
            setGuideVisible(false);
        }
    }, [guideVisible])

    async function InitNowList() {
        const Token = await user?.getIdToken(true);
        const AxiosConfig = {
            method: 'get',
            url: SERVER + '/api/users/reservations/future',
            headers: {
                Authorization: 'Bearer ' + Token,
            },
        };
        const RevData = await axios(AxiosConfig);
        // axios 로 받아온 데이터를 useState 이용해 setData 
        // setData 에서 제네릭 안에 GloChatData 형태로 들어가는듯 
        // GloChatData 는 index.ts 에서 type 으로 export 되어있음
        setData(RevData.data);
        setLoading(false);
    }
    // 여기서 날짜 등등 데이터를 navigate 할 때 같이 전달해줌
    function PressChatRoom(item: GloChatData) {
        const DDay = moment(item.day).diff(Today, 'days');
        console.log(item.day, Today, DDay);

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
            try {
                const res = await axios.get(`${SERVER}/api/guides/` + item.guide.uid);
                console.log(res.data);

                setGuide({
                    avatar: res.data.avatar,
                    name: res.data.name,
                    gender: res.data.gender,
                    birthDate: res.data.birthDate,
                    lang: res.data.lang,
                    country: res.data.country,
                    intro: res.data.intro,
                    oneLineIntro: res.data.oneLineIntro,
                })
                if (res.data.lang.length == 1) {
                    setENG(true);
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
        // console.log(item.item.day.getDate())
        //console.log(moment(Today))
        const ItemDay = (new Date(item.item.day)).getDate();
        //console.log(moment(item.item.day));


        return (
            <Layout style={styles.ChatLayout}>
                <TouchableOpacity
                    style={styles.ChatContainer}
                    onPress={() => PressChatRoom(item.item)}>
                    <Layout style={styles.GuideContainer}>
                        <TouchableOpacity onPress={() => showGuideProfile(item.item)}>
                            <Layout style={styles.GuideAvatarContainer}>
                                <Image
                                    source={require('../../assets/profile/profile_01.png')}
                                    style={styles.GuideAvatar}
                                    resizeMode={'stretch'}
                                />
                            </Layout>
                        </TouchableOpacity>

                        <Layout style={styles.GuideProfileContainer}>
                            <Text style={styles.GuideProfileTxt1}>
                                Travel Assistant
                            </Text>
                            {item.item.guide.uid === '' ? (
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

    return (
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
                        <ProfileModal guide={guide} ENG={ENG} CHN={CHN} isVisible={guideVisible} />

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
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 1.41,
        // elevation: 2,
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
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
