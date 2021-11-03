import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Divider, Layout, Toggle } from '@ui-kitten/components';
import { GuideModal, MemberList, SettingTopTabBarComponent } from '../../component/Chat/ChatRoomSetting';
import { ChatRoomSettingSceneProps } from '../../navigation/SceneNavigator/Chat.navigator';
import { useDispatch } from 'react-redux';
import { setGuideVisiblityTrue } from '../../model/Chat/Chat.Setting.model';
import { SceneRoute } from '../../navigation/app.route';
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';
import { windowWidth } from '../../Design.component';

export const ChatRoomSettingScene = (props: ChatRoomSettingSceneProps): React.ReactElement => {

    const dispatch = useDispatch();
    const ChatRoomID = props.route.params.id;

    const [users, setUsers] = React.useState<Array<any>>([]);
    const [mute, setMute] = React.useState(false);

    React.useEffect(() => {

        AsyncStorage.getItem(`${ChatRoomID}_fcm`)
            .then((value) => {
                if (value === null) {
                    // 한번도 저장되지 않은 값이므로
                    setMute(false);
                    AsyncStorage.setItem(`${ChatRoomID}_fcm`, 'false');
                }
                else if (value === 'true') {
                    setMute(true);
                }
                else {
                    setMute(false);
                }

            })
            .catch((reason) => {
                console.log('Async Storage Load Error : ', reason);
            })

    }, [])

    const PressLeave = () => {
        console.log(props)
    }

    const PressMute = () => {
        // 반대로 저장
        if (mute === true) {
            messaging().unsubscribeFromTopic(ChatRoomID)
                .then(() => {
                    console.log('FCM 토픽 구독 해제 성공 : ', ChatRoomID);
                    setMute(!mute)
                    AsyncStorage.setItem(`${ChatRoomID}_fcm`, 'false');
                })
                .catch((err) => {
                    console.log('FCM 토픽 구독 해제 실패 : ', err);
                })
        }
        else {
            messaging().subscribeToTopic(ChatRoomID)
                .then(() => {
                    console.log('FCM 토픽 구독 성공 : ', ChatRoomID);
                    setMute(!mute)
                    AsyncStorage.setItem(`${ChatRoomID}_fcm`, 'true');
                })
                .catch((err) => {
                    console.log('FCM 토픽 구독 실패 : ', err);
                })
        }
    }

    const PressProfile = () => {
        dispatch(setGuideVisiblityTrue());
    }

    const PressReport = () => {
        props.navigation.navigate(SceneRoute.CHAT_REPORT, {
            id: 'charRoomID', // 채팅방 id
            user: {
                name: '가이드 이름',
                uid: '1234'
            }
        })
    }

    return (
        <SafeAreaView style={styles.MainContainer}>

            <SettingTopTabBarComponent {...props} />

            <ScrollView style={styles.ScrollViewStyle}>
                <Layout style={styles.MuteButtonContainer}>
                    <Text style={styles.Title}>Mute Message Notifications</Text>
                    <Toggle checked={mute} onChange={PressMute} />
                </Layout>

                <Divider style={styles.Divider} />

                <Layout style={styles.MemberContainer}>
                    <MemberList {...props} />
                </Layout>
            </ScrollView>

            {/* 가이드 모달 */}
            <GuideModal guide={props.route.params.guide} zone={props.route.params.zone} maxUser={props.route.params.maxUser}/>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        // paddingTop: isIphoneX() ? getStatusBarHeight() + 60 : 60
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

    LeaveButton: {
        width: 140,
        height: 40
    },

    MuteButtonContainer: {
        width: '100%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20
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

    Avatar: {
        width: 52,
        height: 52,
        borderRadius: 100,
        marginRight: 10
    },

    Description: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 16
    },

    MainButton: {
        width: 64,
        height: 28
    },

    MemberContainer: {
        width: '100%',
        flex: 1,
    },

    ScrollViewStyle: {
        width: windowWidth
    }

})