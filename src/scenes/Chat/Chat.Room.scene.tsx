import React, { useContext } from 'react';
import {
    SafeAreaView,
    Platform,
    AppState,
    AppStateStatus,
    Keyboard,
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
import { filterText } from '../../data/FilterChat';
import { ChatRoomSceneProps } from '../../navigation/SceneNavigator/Chat.navigator';
import { SERVER } from '../../server.component';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuVisiblityFalse } from '../../model/Chat/Chat.UI.model';
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
    NoticeComponent,
} from '../../component/Chat/ChatRoom';
import { setChatLoadingFalse, setChatLoadingTrue } from '../../model/Chat/Chat.Loading.model';
import { RootState } from '../../model';
import { cleanRoomName, setGuideUID, setRoomName } from '../../model/Chat/Chat.Data.model';
import { setKeyboardHeight, cleanKeyboardHeight } from '../../model/Chat/Chat.Keyboard.model';
import { getBottomSpace, getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';


// 전체 UI 용 변수
var ToastRef: any;

export const ChatRoomScene = (props: ChatRoomSceneProps): LayoutElement => {

    const { currentUser, setCurrentUser } = React.useContext(AuthContext);
    const { setChatIcon } = useContext(ChatContext);
    const dispatch = useDispatch();

    const guideToken = useSelector((state: RootState) => state.ChatDataModel.guideUID);
    const roomName = useSelector((state: RootState) => state.ChatDataModel.roomName);
    const day = props.route.params.day
    const menuVisiblity = useSelector((state: RootState) => state.ChatUIModel.menuVisiblity);
    const keyboardHeight = useSelector((state: RootState) => state.ChatKeyboardModel.keyboardHeight);

    const [ChatDB, setChatDB] = React.useState<FirebaseDatabaseTypes.Reference | undefined>(undefined);
    const [guide, setGuide] = React.useState({});
    const [chatMessages, setChatMessages] = React.useState<Array<IMessage>>([]);
    const msgRef = database().ref(`chats/${roomName}/userUnreadCount`);


    const getGuideToken = async (uid: string) => {
        const guideRef = database().ref(`/guide/${uid}`);

        guideRef.on('value', (snapshot) => {

            if (!snapshot.val()) {
                return;
            }
            const guideToken = snapshot.val();

            dispatch(setGuideUID(guideToken));
        });
    };

    const getAccessToken = async () => {
        try {
            const res = await axios.get(`${SERVER}/api/token`);
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


    const OfftheDB = (snapshot: FirebaseDatabaseTypes.DataSnapshot, response?: string | null | undefined): void => {
        setChatDB(undefined);
        dispatch(cleanRoomName())
    }

    const KeyboardShow = (e) => {
        if (keyboardHeight === 0) {
            dispatch(setKeyboardHeight(e.endCoordinates.height));
        }
    }

    const ChatRoomMessageInit = async() : Promise<void> => {

        const Chat = database().ref('/chats/' + 'testChat/messages');
        setChatDB(Chat);

        var tempMessages : Array<IMessage> = [];
        let newItems = false;

        Chat.orderByKey().limitToLast(1).on('child_added', (snapshot, previousKey) => {

            if(newItems === false){
                newItems = true;
            }

            else {
                setChatMessages(value => GiftedChat.append(value, snapshot.val()));
            }
            
        });

        
        Chat.orderByKey().limitToLast(50).once('value', (snapshot) => {            
            snapshot.forEach((data) => {
                tempMessages = GiftedChat.append(tempMessages, data.val());
            });

            setChatMessages(tempMessages);
        });



    }


    React.useEffect(() => {

        const unsubscribe = props.navigation.addListener('focus', () => { ChatRoomInit(props.route.params.id) });  // 앱 화면 포커스시 채팅방 초기화 실시

        AppState.addEventListener('change', handleAppStateChange); // 앱 상태 확인
        Keyboard.addListener('keyboardDidShow', KeyboardShow);

  
        setChatIcon(false);
        getGuideToken(props.route.params.guide.uid);

        ChatRoomMessageInit();

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
            dispatch(cleanKeyboardHeight());

        };

    }, []);


    const ChatRoomInit = (id: string): void => {

        dispatch(setChatLoadingTrue()) // 로딩 시작
        setChatMessages([]); //로컬 메시지 저장소 초기화       

        dispatch(setRoomName(id));
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
                console.log('채팅 전송 실패 : ', e)
            });

        } else {
            ToastRef.show(
                'Please refrain from any content that may offend the other person.',
                1000,
            );
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
                    user={{
                        _id: currentUser?.uid,
                    }}
                    messagesContainerStyle={{
                        paddingBottom: Platform.OS === 'ios'? getBottomSpace() - 13 : 20,
                        paddingTop: isIphoneX() ? getStatusBarHeight() + 13 : 60
                    }}
                    alwaysShowSend={true}
                    showUserAvatar={false}
                    renderAvatarOnTop={true}
                    renderAvatar={renderAvatar}
                    renderTime={renderTime}
                    renderInputToolbar={(props) => renderInputToolbar(props, day, dispatch, menuVisiblity)}
                    renderBubble={(prop) => renderBubble(prop, props.route.params.guide)}
                    renderLoading={renderLoading}
                    renderSystemMessage={renderSystemMessage}
                    renderMessageImage={(props) => renderImage(props, dispatch)}
                    renderMessageAudio={(prop) => renderSound(prop, props.route.params.guide)}
                    renderCustomView={(props) => renderCustomBubble(props, dispatch)}
                />

            </Layout>

            {/* 사이드바 컴포넌트 */}
            <BottomTabBarComponent ChatDB={ChatDB} ChatRoomID={props.route.params.id} />

            {/* 이미지 클릭시 확대 이미지 창 출력 */}
            <ImageModal />

            {/* 지도 메시지 클릭시 확대 창 출력 */}
            <LocationModal />

            {/*채팅방 탑 탭바*/}
            <ChatTopTabBarComponent {...props} />

            {/* 녹음 펑션 화면 */}
            <AudioRecordComponent roomName={roomName} ChatDB={ChatDB} />

            {/* 공지사항 화면 */}
            {/* <NoticeComponent /> */}

        </SafeAreaView>

    );
};
