import React, { useState, useContext, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import {
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator
} from 'react-native';
import {
    Layout,
    Text,
    LayoutElement,
} from '@ui-kitten/components';
import { ChatListRecentProps } from '../../navigation/ScreenNavigator/Chat.navigator';
import moment from 'moment';
import { GloChatData } from '../../types';
import axios from 'axios';
import { SERVER, CDN } from '../../server.component';
import { SceneRoute } from '../../navigation/app.route';
import { ProfileModal } from './chat.profile.component';
import { AuthContext } from '../../context/AuthContext';


export const ChatListRecent = (props: ChatListRecentProps): LayoutElement => {
    // RECENT 에서는 지난 예약들을 볼 수 있습니당
    const user = auth().currentUser;

    const userContext = useContext(AuthContext);

    const [data, setData] = useState<Array<GloChatData>>([]);
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
                url: SERVER + '/api/users/reservations/past',
                headers: {
                    'Authorization': 'Bearer ' + Token
                }
            }
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

    const PressChatRoom = (item: GloChatData) => {

        if (item.guide == undefined) {
            Alert.alert('Sorry', 'We are currently matching your travel assistant :)');
            return;
        }
        props.navigation.navigate(SceneRoute.CHATROOM, {
            id: item._id,
            guide: { name: item.guide.name, uid: item.guide.uid },
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

    const RenderItem = (item: { item: GloChatData, index: number }) => {

        return (
            <TouchableOpacity style={styles.ChatContainer}
                onPress={() => PressChatRoom(item.item)}>

                <Layout style={styles.GuideContainer}>
                    <TouchableOpacity onPress={() => showGuideProfile(item.item)}>
                        <Layout style={styles.GuideAvatarContainer}>
                            {item.item.guide?.avatar != undefined &&
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
                        <Text style={styles.GuideProfileTxt1}>Travel Assistant</Text>

                        {item.item.guide?.uid === '' ||
                            item.item.guide?.uid === undefined ||
                            item.item.guide?.uid === null ? null :
                            (<Text style={styles.GuideProfileTxt2}>{item.item.guide?.name}</Text>)}

                    </Layout>

                </Layout>

                <Layout style={styles.DateContainer}>
                    <Text style={styles.DdayTxt}>{moment(item.item.day).format('YYYY.MM.DD')}</Text>
                </Layout>

            </TouchableOpacity>
        )
    }

    return loading ? (
        <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator color='#999' size='large' />
        </Layout>
    ) : (
        <Layout>
            {(data.length === 0) ?
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
                :
                <Layout style={styles.Container}>

                    <FlatList
                        data={data}
                        renderItem={RenderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 500 }}
                    />
                    {/* 가이드 프로필 모달 */}
                    <ProfileModal guide={guide} ENG={ENG} CHN={CHN} isVisible={guideVisible} navigation={props.navigation} route={route} />

                </Layout>
            }
        </Layout>
    );
}

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
    ChatContainer: {
        width: '100%',
        height: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#F8F8F8',
        marginBottom: 10
    },
    GuideContainer: {
        flexDirection: 'row',
        flex: 7,
        backgroundColor: '#00FF0000'
    },
    GuideAvatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00FF0000'
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
        backgroundColor: '#00FF0000'
    },
    GuideProfileTxt1: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 15,
        color: '#C3C3C3',
        marginBottom: -10
    },
    GuideProfileTxt2: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 15,
        color: 'black',
        marginTop: 4
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
        backgroundColor: '#00FF0000'
    },
    DdayTxt: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 16,
        color: '#8797FF',
        marginTop: 15
    },
})