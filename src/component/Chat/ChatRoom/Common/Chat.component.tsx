import React, { useContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging'
import {
    SafeAreaView,
    Platform,
    AppState,
    AppStateStatus,
    Keyboard,
    Alert,
} from 'react-native';
import {
    Layout,
    LayoutElement,
} from '@ui-kitten/components';
import database, {
    FirebaseDatabaseTypes,
} from '@react-native-firebase/database';
import {
    GiftedChat,
    IMessage,
} from 'react-native-gifted-chat';
import { filterText } from '../../../../data/FilterChat';
import { ChatRoomSceneProps } from '../../../../navigation/SceneNavigator/Chat.navigator';
import { SERVER } from '../../../../server.component';
import axios from 'axios';
import { AuthContext } from '../../../../context/AuthContext';
import { ChatContext } from '../../../../context/ChatContext';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuVisiblityFalse } from '../../../../model/Chat/Chat.UI.model';
import {
    ImageModal,
    LocationModal,
    renderBubble,
    renderImage,
    renderTime,
    renderInputToolbar,
    renderLoading,
    renderSystemMessage,
    renderSound,
    ChatTopTabBarComponent,
    AudioRecordComponent,
    renderAvatar,
    renderCustomBubble,
    BottomTabBarComponent,
    renderLoadEarlier,
    EmojiKeyboardComponent,
    GuideModalComponent,
} from '../index';
import { setChatLoadingFalse, setChatLoadingTrue } from '../../../../model/Chat/Chat.Loading.model';
import { RootState } from '../../../../model';
import { cleanRoomName, setRoomName } from '../../../../model/Chat/Chat.Data.model';
import { setKeyboardHeight, cleanKeyboardHeight, setEmojiKeyboardFalse } from '../../../../model/Chat/Chat.Keyboard.model';
import { getBottomSpace, getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ChatComponent = (props: ChatRoomSceneProps): LayoutElement => {

    const day = props.route.params.day
    const Guide = props.route.params.guide;

    const { currentUser, setCurrentUser } = React.useContext(AuthContext);
    const { setChatIcon } = useContext(ChatContext);

    const dispatch = useDispatch();
    const roomName = useSelector((state: RootState) => state.ChatDataModel.roomName);
    const menuVisiblity = useSelector((state: RootState) => state.ChatUIModel.menuVisiblity);
    const keyboardHeight = useSelector((state: RootState) => state.ChatKeyboardModel.keyboardHeight);
    const emojiKeyboardVisiblity = useSelector((state: RootState) => state.ChatKeyboardModel.emojiKeyboardVisiblity);


    const [messagesCount, setMessagesCount] = React.useState<number>(50);
    const [ChatDB, setChatDB] = React.useState<FirebaseDatabaseTypes.Reference | undefined>(undefined);
    const [chatMessages, setChatMessages] = React.useState<Array<IMessage>>([]);
    const msgRef = database().ref(`chats/${roomName}/userUnreadCount`);

    const [iphoneXKeyboardPadding, setIphoneXKeyboardPadding] = useState<number>(getBottomSpace() - 34);
    const [iosKeyboardPadding, setIosKeyboardPadding] = useState<number>(-14);

    React.useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setIphoneXKeyboardPadding(getBottomSpace() - 34);
            setIosKeyboardPadding(-14);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setIphoneXKeyboardPadding(getBottomSpace() - 13);
            setIosKeyboardPadding(20);
        });

        getAccessToken();

        AsyncStorage.setItem(`ChatCheck_${props.route.params.id}`, "");

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const getAccessToken = async () => {
        try {
            const res = await axios.get(`${SERVER}/token`);
            setCurrentUser({ ...currentUser, ...res.data });
        } catch (e) {
            console.log('e', e);
        }
    };

    /* 앱 상태 파악 Background foreground */
    const appState = React.useRef(AppState.currentState);

    const resetUserUnreadMsgCount = () => {
        msgRef.transaction((userUnreadCount: number) => {
            if (userUnreadCount && userUnreadCount > 0) {
                userUnreadCount = 0;
            }
            return userUnreadCount;
        });
    };

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
        }
        if (
            appState.current.match(/inactive|active/) &&
            nextAppState === 'background'
        ) {
            resetUserUnreadMsgCount();
        }
        appState.current = nextAppState;
    };

    const LoadEarlierMessages = () => {

        // 50개씩 예전 메시지 로딩
        setChatMessages([]);

        ChatDB?.off('child_added'); // 먼저 기존 리스너 제거

        var tempMessages: Array<IMessage> = [];

        ChatDB?.orderByKey().limitToLast(1).on('child_added', (snapshot, previousKey) => {
            setChatMessages(value => GiftedChat.append(value, snapshot.val()));            
        });


        ChatDB?.orderByKey().limitToLast(messagesCount + 50).once('value', (snapshot) => {
            snapshot.forEach((data) => {
                tempMessages = GiftedChat.append(tempMessages, data.val());
            });
        });

        setChatMessages(tempMessages);
        setMessagesCount(messagesCount + 50);

    }

    const OfftheDB = (snapshot: FirebaseDatabaseTypes.DataSnapshot, response?: string | null | undefined): void => {
        setChatDB(undefined);
        dispatch(cleanRoomName())
    }

    const KeyboardShow = (e) => {
        if (keyboardHeight === 0) {
            dispatch(setKeyboardHeight(e.endCoordinates.height + 60));
        }
    }

    const ChatRoomMessageInit = async (): Promise<void> => {

        const travelDate = moment(props.route.params.day).format('yyyy-MM-DD');
        const DBURL = '/chats/' + travelDate + '/' + props.route.params.id + '/messages';

        const Chat = database().ref(DBURL);
        setChatDB(Chat);

        var tempMessages: Array<IMessage> = [];
        let newItems = false;

        Chat.orderByKey().limitToLast(1).on('child_added', (snapshot, previousKey) => {
            setChatMessages(value => GiftedChat.append(value, snapshot.val()));
        });


        Chat.orderByKey().limitToLast(messagesCount).once('value', (snapshot) => {
            snapshot.forEach((data) => {
                tempMessages = GiftedChat.append(tempMessages, data.val());
            });

            setChatMessages(tempMessages);
        });

    }


    React.useEffect(() => {

        const unsubscribe = props.navigation.addListener('focus', () => { ChatRoomMessageInit() });  // 앱 화면 포커스시 채팅방 초기화 실시

        AppState.addEventListener('change', handleAppStateChange); // 앱 상태 확인
        Keyboard.addListener('keyboardDidShow', KeyboardShow);

        setChatIcon(false);


        props.navigation.addListener('beforeRemove', () => { // 메시지 읽음 표시
            resetUserUnreadMsgCount();
        })

        if (!currentUser?.access_token) {
            getAccessToken();   /* check access token */
        }

        dispatch(setChatLoadingFalse());


        return () => {

            AppState.removeEventListener('change', handleAppStateChange);
            unsubscribe;

            if (ChatDB != undefined) {
                ChatDB.off('child_added', OfftheDB)
            };

            dispatch(setMenuVisiblityFalse());
            dispatch(setEmojiKeyboardFalse());
            dispatch(cleanKeyboardHeight());

        };

    }, []);


    const FCMSend = async (message: IMessage) => {

        const current = new Date().getTime();
        const url = 'https://fcm.googleapis.com/v1/projects/glokool-a7604/messages:send';

        if (currentUser.expiry_date < current) {
            await getAccessToken();
        }

        const data = JSON.stringify({
            message: {
                notification: {
                    title: message.user.name,
                    body: message.text,
                },
                data: {
                    time: new Date(Date.now()).toString(),
                    roomId: props.route.params.id,
                },
                topic: props.route.params.id,
                webpush: {
                    fcm_options: {
                        link: 'guide/main/chat',
                    },
                },
            },
        });


        const options = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser.access_token}`,
            }
        };

        console.log(currentUser);

        axios.post(url, data, options)
            .catch((e) => {
                if (e.response) {
                    console.log('FCM 전송 실패 : ', e.response.data);
                }
            });
    }

    const onSend = async (messages: IMessage[]) => {

        if (filterText(messages[0].text)) {

            const newMessage = ChatDB?.push();
            let message = {
                _id: newMessage?.key,
                user: {
                    _id: currentUser?.uid,
                    name: currentUser?.displayName
                },
                messageType: 'message',
                createdAt: new Date().getTime(),
                location: '',
                image: '',
                audio: '',
                text: messages[0].text
            }

            newMessage?.set(message, (e) => {
                if (e != null) { 
                    Alert.alert("", "The transmission failed. Please try again.");
                    console.log('채팅 전송 실패 : ', e) 
                }

                else {
                    FCMSend(message);
                    console.log('채팅 전송 성공')
                }
            });

            


        } else {
            Alert.alert("", "The message contains inappropriate languages. Please try again.");
        }

    };



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

            <Layout style={{ flex: 1 }} >

                <GiftedChat
                    messages={chatMessages}
                    textInputProps={{ autoFocus: true }}
                    bottomOffset={(isIphoneX()) ? -getBottomSpace() + 47 : (Platform.OS === 'ios') ? - 25 : 0}
                    onSend={(messages) => onSend(messages)}
                    infiniteScroll={true}
                    loadEarlier={true}
                    user={{
                        _id: currentUser?.uid,
                    }}
                    messagesContainerStyle={{
                        paddingBottom: Platform.OS === 'ios' ? (isIphoneX() ? iphoneXKeyboardPadding : iosKeyboardPadding) : 20,
                        paddingTop: isIphoneX() ? getStatusBarHeight() + 13 : 60
                    }}
                    onLoadEarlier={() => { LoadEarlierMessages() }}
                    alwaysShowSend={true}
                    showUserAvatar={false}
                    renderAvatarOnTop={true}
                    renderLoadEarlier={renderLoadEarlier}
                    renderAvatar={renderAvatar}
                    renderTime={renderTime}
                    renderInputToolbar={(props) => renderInputToolbar(props, day, dispatch, menuVisiblity, emojiKeyboardVisiblity)}
                    renderBubble={(props) => renderBubble(props, Guide)}
                    renderLoading={renderLoading}
                    renderSystemMessage={renderSystemMessage}
                    renderMessageImage={(props) => renderImage(props, dispatch)}
                    renderMessageAudio={(props) => renderSound(props, Guide)}
                    renderCustomView={(props) => renderCustomBubble(props, dispatch)}
                />

            </Layout>

            {/* 사이드바 컴포넌트 */}
            <BottomTabBarComponent ChatDB={ChatDB} ChatRoomID={props.route.params.id} TravelDate={props.route.params.day} />

            {/* 이모지 키보드 컴포넌트 */}
            <EmojiKeyboardComponent ChatDB={ChatDB} ChatRoomID={props.route.params.id} />

            {/* 이미지 클릭시 확대 이미지 창 출력 */}
            <ImageModal />

            {/* 지도 메시지 클릭시 확대 창 출력 */}
            <LocationModal />

            {/*채팅방 탑 탭바*/}
            <ChatTopTabBarComponent {...props} />

            {/* 녹음 펑션 화면 */}
            <AudioRecordComponent roomName={roomName} ChatDB={ChatDB} travelDate={props.route.params.day} />

            {/* 공지사항 화면 */}
            {/* <NoticeComponent /> */}

            {/* 가이드 모달 */}
            <GuideModalComponent guide={props.route.params.guide.uid} zone={props.route.params.zone} maxUser={props.route.params.maxUser} />

        </SafeAreaView>

    );
};