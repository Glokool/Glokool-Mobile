
import React from 'react';
import auth from '@react-native-firebase/auth';
import { FlatList, Pressable, StyleSheet, Text  } from 'react-native';
import { Divider, Layout} from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
import { ChatRoomSettingSceneProps } from '../../../navigation/SceneNavigator/Chat.navigator';
import { Profile_Button, Report_Button } from '../../../assets/icon/Chat';
import { CDN, SERVER } from '../../../server.component';
import axios, { AxiosRequestConfig } from 'axios';
import { SceneRoute } from '../../../navigation/app.route';
import { useDispatch } from 'react-redux';
import { setGuideVisiblityTrue } from '../../../model/Chat/Chat.Setting.model';

type MemberInfo = {
    _id : string;
    avatar: string;
    name: string;
    uid: string;
}

type GuideInfo = {
    _id: string;
    avatar: string;
    name: string;
    uid: string;
}

export const MemberList = (props: ChatRoomSettingSceneProps): React.ReactElement => {

    const ChatRoomID = props.route.params.id;
    const dispatch = useDispatch();
    const [memberData, setMemberData] = React.useState<Array<MemberInfo>>([]);
    const [guide, setGuide] = React.useState<GuideInfo | undefined>();

    React.useEffect(() => {
        InitSetting();
    }, []);

    const InitSetting = async() => {
        const token = await auth().currentUser?.getIdToken();
        const url = SERVER + '/chat-rooms/' + props.route.params.id + '/people';
        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }

        axios.get(url, config)
            .then((response) => {
                setGuide(response.data.guide);
                setMemberData(response.data.users);
            })
            .catch((err) => {
                console.log('멤버 리스트 로드 실패 : ', err);
            })
    }

    const renderItem = ({ item }: { item: MemberInfo, index: number }) => {

        return (
            <Layout style={styles.MemberContainer}>

                <Layout style={styles.ProfileContainer}>
                    <FastImage source={{ uri: item.avatar }} style={styles.Avatar} />
                    <Text style={styles.NickName}>{item.name}</Text>
                </Layout>

                {(item.uid === auth().currentUser?.uid)? 
                    null
                :
                    <Pressable
                        onPress={() => {
                            props.navigation.navigate(SceneRoute.CHAT_REPORT, {
                                id: ChatRoomID,
                                user: {
                                    name: item.name,
                                    uid: item.uid
                                }
                            })
                        }}
                    >
                        <Report_Button style={styles.Button} />
                    </Pressable>
                }


            </Layout>
        )
    }


    return (
        <Layout style={styles.MainContainer}>
            <Layout style={styles.TitleContainer}>
                <Text style={styles.Title}>Travel Assistant</Text>
            </Layout>

            <Layout style={styles.GuideInfoContainer}>

                <Layout style={styles.GuideInfoContainer2}>
                    <FastImage source={{ uri: `${guide?.avatar}` }} style={styles.Avatar} />

                    <Text style={styles.Description}>{guide?.name}</Text>
                </Layout>

                <Layout style={styles.DoubleButtonContainer}>

                    <Pressable onPress={() => { dispatch(setGuideVisiblityTrue()) }}>
                        <Profile_Button style={styles.MainButton} />
                    </Pressable>

                    <Pressable onPress={() => {
                        props.navigation.navigate(SceneRoute.CHAT_REPORT, {
                            id: ChatRoomID,
                            user: {
                                name: guide?.name!,
                                uid: guide?.uid!
                            }
                        })
                    }}>
                        <Report_Button style={styles.MainButton} />
                    </Pressable>

                </Layout>

            </Layout>

            <Divider style={styles.Divider} />

            <Layout style={styles.TitleContainer}>
                <Text style={styles.Title}>Members</Text>
            </Layout>

            <FlatList
                keyExtractor={(item, index) => item.uid}
                data={memberData}
                renderItem={renderItem}
                scrollEnabled={false}
            />
        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%'
    },

    MemberContainer: {
        height: 52,
        width: '100%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10
    },

    ProfileContainer: {
        height: 52,
        flexDirection: 'row',
        alignItems: 'center'
    },

    Avatar: {
        width: 52,
        height: 52,
        borderRadius: 100,
        marginRight: 10
    },

    NickName: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 16
    },

    Button: {
        width: 64,
        height: 28
    },

    TitleContainer: {
        paddingLeft: 20,
        width: '100%',
        marginVertical: 15
    },

    Title: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 17
    },

    Divider: {
        width: '100%',
        height: 2,
        backgroundColor: '#F3F3F3'
    },

    GuideInfoContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 52,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 15
    },

    GuideInfoContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    Description: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 16
    },

    ButtonContainer: {
        marginVertical: 20
    },

    DoubleButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 140,
    },

    MainButton: {
        width: 64,
        height: 28
    },
})