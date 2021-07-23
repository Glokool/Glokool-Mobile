import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import {
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    Pressable
} from 'react-native';
import {
    Layout,
    Text,
    LayoutElement,
    Modal,
} from '@ui-kitten/components';
import { ChatListRecentProps } from '../../navigation/ScreenNavigator/Chat.navigator';
import moment from 'moment';
import { GloChatData } from '.';
import axios from 'axios';
import { SERVER } from '../../server.component';
import { SceneRoute } from '../../navigation/app.route';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ProfileModal } from './chat.profile.component';

export const ChatListRecent = (props: ChatListRecentProps): LayoutElement => {
    // RECENT 에서는 지난 예약들을 볼 수 있습니당
    const user = auth().currentUser;
    const [data, setData] = React.useState<Array<GloChatData>>([]);

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
            url: SERVER + '/api/users/reservations/past',
            headers: {
                'Authorization': 'Bearer ' + Token
            }
        }
        const RevData = await axios(AxiosConfig);
        setData(RevData.data);
        console.log(RevData.data)
    }

    function PressChatRoom(item: GloChatData) {
        console.log('go to chat ');
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

    const RenderItem = (item: { item: GloChatData, index: number }) => {

        return (
            <TouchableOpacity style={styles.ChatContainer}
                onPress={() => PressChatRoom(item.item)}>

                <Layout style={styles.GuideContainer}>
                    <TouchableOpacity onPress={() => showGuideProfile(item.item)}>
                        <Layout style={styles.GuideAvatarContainer}>
                            <Image source={require('../../assets/profile/profile_01.png')} style={styles.GuideAvatar} resizeMode={'stretch'} />
                        </Layout>
                    </TouchableOpacity>

                    <Layout style={styles.GuideProfileContainer}>
                        <Text style={styles.GuideProfileTxt1}>Travel Assistant</Text>
                        <Text style={styles.GuideProfileTxt2}>{item.item.guide.name}</Text>
                    </Layout>

                </Layout>

                <Layout style={styles.DateContainer}>
                    <Text style={styles.DdayTxt}>{moment(item.item.day).format('YYYY.MM.DD')}</Text>
                </Layout>

            </TouchableOpacity>
        )
    }

    return (
        <Layout>
            {(data.length === 0) ?
                <Layout style={styles.EmptyContainer}>
                    <Text style={styles.EmptyText}>Empty</Text>
                    <TouchableOpacity style={styles.EmptyButton} onPress={() => props.navigation.navigate(SceneRoute.SERIES_A_DETAIL, { Id: '60cc01e0ee8b3104211971b4' })}>
                        <Text style={styles.EmptyButtonText}>How to use GloChat?!</Text>
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
                    <ProfileModal guide={guide} ENG={ENG} CHN={CHN} isVisible={guideVisible} />

                </Layout>
            }
        </Layout>
    );
}

const styles = StyleSheet.create({
    EmptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    EmptyText: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 16,
        color: '#C3C3C3',
        marginBottom: 20,
        marginTop: 50,
    },
    EmptyButton: {
        width: 250,
        height: 60,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    EmptyButtonText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 20,
        color: '#7777FF'
    },
    Container: {
        width: '100%',
        height: '100%'
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
        borderRadius: 50
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
    dateTxt: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 12,
        color: 'black',
        marginVertical: 0
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
})