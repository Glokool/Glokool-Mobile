import React, { ReactChild, Ref, useContext, useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Text,
    Platform,
    PermissionsAndroid,
    Pressable,
    AppState,
    Alert,
    AppStateStatus,
    Keyboard,
    KeyboardAvoidingView
} from 'react-native';
import {
    Layout,
    LayoutElement,
} from '@ui-kitten/components';
import database, {
    FirebaseDatabaseTypes,
} from '@react-native-firebase/database';
import {
    ActionsProps,
    Composer,
    ComposerProps,
    GiftedChat,
    IMessage,
} from 'react-native-gifted-chat';
import storage from '@react-native-firebase/storage';
import {
    launchCamera,
} from 'react-native-image-picker/src';
import { filterText } from '../../data/filterChat';
import Geolocation from '@react-native-community/geolocation';
import { ChatRoomScreenProps } from '../../navigation/ScreenNavigator/Chat.navigator';
import {
    Images,
    Camera,
    MyLocation,
    Record,
    Chat_Exit,
    Chat_Menu,
} from '../../assets/icon/Chat';
import ImagePicker from 'react-native-image-crop-picker';
import {
    requestCameraPermission,
    requestStoragePermission,
} from '../../component/permission.component';
import { SERVER } from '../../server.component';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { ProfileModal } from '../../component/Chat/chat.profile.component';
import { messageType } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { messageIdGenerator } from '../../component/Common/MessageIdGenerator';
import { setAudioVisiblityTrue, setMenuVisiblityFalse, setMenuVisiblityTrue } from '../../model/Chat/Chat.UI.model';
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
} from '../../component/Chat/ChatRoom';
import { setChatLoadingFalse, setChatLoadingTrue } from '../../model/Chat/Chat.Loading.model';
import { RootState } from '../../model';
import { cleanRoomName, setGuideUID, setRoomName } from '../../model/Chat/Chat.Data.model';
import { windowHeight, windowWidth } from '../../Design.component';
import { cleanKeyboardComponent, setKeyboardComponent, setKeyboardHeight, cleanKeyboardHeight } from '../../model/Chat/Chat.Keyboard.model';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getBottomSpace, getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';
import { string } from 'yup/lib/locale';

// 전체 UI 용 변수
var ToastRef: any;

type mappingMessage = {
    id : string, node : messageType
};

export const ChatRoomScreen = (props: ChatRoomScreenProps): LayoutElement => {

    const { currentUser, setCurrentUser } = React.useContext(AuthContext);
    const { setChatIcon } = useContext(ChatContext);
    const dispatch = useDispatch();

    const guideToken = useSelector((state: RootState) => state.ChatDataModel.guideUID);
    const roomName = useSelector((state: RootState) => state.ChatDataModel.roomName);
    const day = props.route.params.day
    const menuVisiblity = useSelector((state: RootState) => state.ChatUIModel.menuVisiblity);
    const keyboardHeight = useSelector((state : RootState) => state.ChatKeyboardModel.keyboardHeight);

    const [ChatDB, setChatDB] = React.useState<FirebaseDatabaseTypes.Reference | undefined>(undefined);
    const [guide, setGuide] = React.useState({});
    const [chatMessages, setChatMessages] = React.useState<Array<IMessage>>([]);
    const msgRef = database().ref(`chats/${roomName}/userUnreadCount`);
    const insets = useSafeAreaInsets();

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
            // console.log('foreground');
        }
        if (
            appState.current.match(/inactive|active/) &&
            nextAppState === 'background'
        ) {
            resetUserUnreadMsgCount();
        }
        appState.current = nextAppState;
    };

    const initGuide = async (guideInfo = props.route.params.guide) => {
        if (guideInfo.uid != '') {
            try {
                const res = await axios.get(`${SERVER}/api/guides/` + guideInfo.uid);
                setGuide(res.data)

            } catch (e) {
                console.log('e', e);
            }
        }
        else {
            Alert.alert('Sorry,', 'Guide Not Matched!');
        }
    }

    const OfftheDB = (snapshot: FirebaseDatabaseTypes.DataSnapshot, response?: string | null | undefined): void => {
        setChatDB(undefined);
        dispatch(cleanRoomName())
    }

    const KeyboardShow = (e) => {
        if (keyboardHeight === 0){
            dispatch(setKeyboardHeight(e.endCoordinates.height));
        }
    }

    React.useEffect(() => {

        Keyboard.addListener('keyboardDidShow', KeyboardShow);
        setChatIcon(false);
        const unsubscribe = props.navigation.addListener('focus', () => { ChatRoomInit(props.route.params.id) });  // 앱 화면 포커스시 채팅방 초기화 실시
        getGuideToken(props.route.params.guide.uid);

        const chat = database().ref('/chats/' + 'testChat/messages');
        setChatDB(chat);

        dispatch(setChatLoadingFalse());
        

        // 채팅방 초기화
        chat.orderByKey().limitToLast(50).on('child_added', (snapshot) => {
            setChatMessages(value => GiftedChat.append(value, snapshot.val()));
        });

        AppState.addEventListener('change', handleAppStateChange); // 앱 상태 확인

        props.navigation.addListener('beforeRemove', () => { // 메시지 읽음 표시

            resetUserUnreadMsgCount();
        })

        if (!currentUser?.access_token) {
            getAccessToken();   /* check access token */
        }

        return () => {

            AppState.removeEventListener('change', handleAppStateChange);
            unsubscribe;

            if (ChatDB != undefined) {
                ChatDB.off('value', OfftheDB)
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



    const createPushNoti = (message: string): IMessage => {

        return {
            user: {
                name: currentUser?.displayName,
            },
            text: message,
        };

    };

    /*이미지 촬영 */
    const takePhoto = async () => {

        dispatch(setMenuVisiblityFalse());

        try {
            const { granted } = await requestCameraPermission();
            if (!granted) {
                throw Error('Camera permission denied');
            }

            launchCamera(
                {
                    mediaType: 'photo',
                    includeBase64: true,
                    quality: 0.5,
                },
                (response) => {
                    if (response != undefined) {
                        if (response.didCancel == true) {
                            //중도 취소시
                        } else {
                            const MessageID = messageIdGenerator();

                            const FileName = response.fileName;
                            var type = response.type;

                            const imageType = type.split('/');
                            const reference = storage().ref();

                            const picRef = reference.child(`chats/${roomName}/picture/${MessageID}.${imageType[1]}`,).putFile(response.uri);

                            picRef.on(
                                storage.TaskEvent.STATE_CHANGED,
                                function (snapshot) {
                                    var progress =
                                        (snapshot.bytesTransferred /
                                            snapshot.totalBytes) *
                                        100;
                                    switch (snapshot.state) {
                                        case storage.TaskState.PAUSED:
                                            console.log('Upload is paused');
                                            break;
                                        case storage.TaskState.RUNNING:
                                            console.log('Upload is running');
                                            break;
                                    }
                                },
                                function (error) {
                                    switch (error.code) {
                                        case 'storage/unauthorized':
                                            break;

                                        case 'storage/canceled':
                                            break;

                                        case 'storage/unknown':
                                            break;
                                    }
                                },
                                function () {
                                    picRef.snapshot?.ref
                                        .getDownloadURL()
                                        .then(function (downloadURL) {
                                            //업로드 완료
                                            const message = {
                                                _id: MessageID,
                                                createdAt: new Date().getTime(),
                                                user: {
                                                    _id: currentUser?.uid,
                                                },
                                                image: downloadURL,
                                                messageType: 'image',
                                            };

                                            const push = createPushNoti(
                                                '이미지를 보냈습니다',
                                            );

                                            Promise.all([
                                                ChatDB?.update({
                                                    messages: [
                                                        message,
                                                        ...chatMessages,
                                                    ],
                                                    guideUnreadCount: database.ServerValue.increment(
                                                        1,
                                                    ),
                                                }),
                                                sendMessage(push),
                                            ]);
                                        });
                                },
                            );
                        }
                    }
                },
            );
        } catch (e) {
            console.log('사진 촬영 에러', e);
        }
    };

    /* FB에 이미지 저장하기위해서 아이디와 이미지 타입 반환*/
    const createAdditionalInfo = async (imgArr) => {
        return imgArr.map((img) => {
            const MessageID = messageIdGenerator();
            const imageType = img.mime.split('/');

            const additionalInfo = {
                MessageID: MessageID,
                imageType: imageType[1],
            };
            return additionalInfo;
        });
    };

    /* FB storage에 이미지 배열 업로드 */
    const uploadImgArr = async (images, info) => {

        const reference = storage().ref();

        const promises = images.map((image: string, idx: number) => {
            const picRef = reference.child(
                `chats/${roomName}/picture/${info[idx].MessageID}.${info[idx].imageType}`,
            );
            return picRef
                .putFile(image.path)
                .then(() => picRef.getDownloadURL());
        });

        return await Promise.all(promises).catch((e) => console.log(e.code));
    };

    //이미지 전송을 위한 버튼
    const ImageSend = async () => {

        dispatch(setMenuVisiblityFalse());

        try {
            const { granted } = await requestStoragePermission();
            if (!granted) {
                throw Error('Storage permission denied');
            }

            const pickerOptions = {
                multiple: true,
            };

            if (Platform.OS === 'ios') {
                Object.assign(pickerOptions, {
                    forceJpg: true,
                });
            }

            const images = await ImagePicker.openPicker(pickerOptions);

            if (images?.length) {
                const additionalInfo = await createAdditionalInfo(images);
                const imgArr = await uploadImgArr(images, additionalInfo);
                if (!imgArr) {
                    throw Error('Upload denied');
                }

                const push = createPushNoti('이미지를 보냈습니다',);

                const message = {
                    _id: additionalInfo[0]?.MessageID,
                    createdAt: new Date().getTime(),
                    user: {
                        _id: currentUser?.uid,
                    },
                    image: imgArr, //다운로드URL 전달
                    messageType: 'image',
                };

                Promise.all([
                    ChatDB?.update({
                        messages: [message, ...chatMessages],
                        guideUnreadCount: database.ServerValue.increment(1),
                    }),
                    sendMessage(push),
                ]);
            }
        } catch (e) {
            console.log('갤러리 참조 에러', e);
        }
    };

    /* FCM 백엔드 메시지 전송*/
    const sendMessage = async (message: IMessage) => {

        try {
            const chatRoomID = props.route.params.id;
            const currentDate = new Date().getTime();

            if (currentUser.expiry_date < currentDate) {
                await getAccessToken();
            }

            const data = JSON.stringify({
                message: {
                    token: guideToken,
                    notification: {
                        title: message.user.name,
                        body: message.text,
                    },
                    data: {
                        time: new Date(Date.now()).toString(),
                        roomId: chatRoomID,
                    },
                    webpush: {
                        fcm_options: {
                            link: 'guide/main/chat',
                        },
                    },
                },
            });

            const options = {
                method: 'post',
                url:
                    'https://fcm.googleapis.com/v1/projects/glokool-a7604/messages:send',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currentUser.access_token}`,
                },
                data: data,
            };
            await axios(options).catch((e) => {
                if (e.response) {
                    console.log(e.response.data);
                }
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

    const onSend = async(messages: IMessage[]) => {

        if (filterText(messages[0].text)) {

            const newMessage = ChatDB?.push();
            let message = {
                _id : newMessage?.key,
                user : {
                    _id : currentUser?.uid,
                    name : currentUser?.displayName
                },
                messageType : 'message',
                createdAt : new Date().getTime(),
                location : '',
                image : '',
                audio : '',
                text : messages[0].text
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

    const LocationMessage = () => {

        dispatch(setMenuVisiblityFalse());

        if (Platform.OS === 'android') {


            if (!PermissionsAndroid.RESULTS.GRANTED) return console.log('위치정보 받아오기 실패');

            Geolocation.getCurrentPosition((position) => {
                const MessageID = messageIdGenerator();
                const Message = {
                    _id: MessageID,
                    createdAt: new Date().getTime(),
                    user: {
                        _id: currentUser?.uid,
                    },
                    location: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    },
                    messageType: 'location',
                };

                const push = createPushNoti('지도위치를 보냈습니다.');

                Promise.all([
                    ChatDB?.update({
                        messages: [Message, ...chatMessages],
                        guideUnreadCount: database.ServerValue.increment(
                            1,
                        ),
                    }),
                    sendMessage(push),
                ]);

            }, (error) => {
                console.log(error);
            })

        } else {
            // iOS용 위치 서비스
            Geolocation.getCurrentPosition(
                (position) => {
                    const MessageID = messageIdGenerator();
                    const message = {
                        _id: MessageID,
                        createdAt: new Date().getTime(),
                        user: {
                            _id: currentUser?.uid,
                        },
                        location: {
                            lat: position.coords.latitude,
                            lon: position.coords.longitude,
                        },
                        messageType: 'location',
                    };

                    ChatDB?.update({
                        messages: [message, ...chatMessages],
                        guideUnreadCount: database.ServerValue.increment(1),
                    });
                },
                (error) => {
                    console.log(
                        'The location could not be loaded because ',
                        error.message,
                    ),
                    {
                        enableHighAccuracy: false,
                        timeout: 20000,
                        maximumAge: 1000,
                    };
                });


        }

    };

   
    return (
        <SafeAreaView style={{ flex : 1 , backgroundColor: 'white'}}>

            <Layout style={{ flex : 1 }} >

                <GiftedChat
                    messages={chatMessages}
                    textInputProps={{ autoFocus: true }}
                    bottomOffset={(isIphoneX())? -getBottomSpace() + 47 : (Platform.OS === 'ios')?  - 25 : 0}
                    onSend={(messages) => onSend(messages)}
                    infiniteScroll={true}
                    createdAt={new Date().getTime()}
                    user={{
                        _id: currentUser?.uid,
                    }}
                    isAnimated
                    messagesContainerStyle={{
                        paddingBottom: 30,
                        paddingTop: isIphoneX()? (getStatusBarHeight() + 60) :  60,
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
                {/* 사이드바 컴포넌트 (분리 예정) */}
                {(menuVisiblity)?
                <Layout style={{ justifyContent: 'center', backgroundColor: '#F8F8F8', height: keyboardHeight, minHeight: 180}}>
                    <Layout style={styles.SideContainer}>
                        <Pressable
                            style={styles.SideButton}
                            onPress={() => dispatch(setAudioVisiblityTrue())}>
                            <Record />
                            <Text style={styles.SideButtonTxt}>Voices</Text>
                        </Pressable>
        
                        <Pressable
                            style={styles.SideButton}
                            onPress={() => ImageSend()}>
                            <Images />
                            <Text style={styles.SideButtonTxt}>Images</Text>
                        </Pressable>
        
                        <Pressable
                            style={styles.SideButton}
                            onPress={() => takePhoto()}>
                            <Camera />
                            <Text style={styles.SideButtonTxt}>Camera</Text>
                        </Pressable>
        
                        <Pressable
                            style={styles.SideButton}
                            onPress={() => LocationMessage()}>
                            <MyLocation />
                            <Text style={styles.SideButtonTxt}>
                                My Location
                            </Text>
                        </Pressable>
                    </Layout>
        
                    <Layout style={styles.SideContainer}></Layout>
                </Layout>
                :
                    null
                }

                {/* 이미지 클릭시 확대 이미지 창 출력 */}
                <ImageModal />

                {/* 지도 메시지 클릭시 확대 창 출력 */}
                <LocationModal />

                {/*채팅방 탑 탭바*/}
                <ChatTopTabBarComponent msgRef={msgRef} ChatDB={ChatDB} props={props} guide={guide} />

                <AudioRecordComponent
                    roomName={roomName}
                    currentUser={currentUser}
                    ChatDB={ChatDB}
                    chatMessages={chatMessages}
                    messageIdGenerator={messageIdGenerator}
                    createPushNoti={createPushNoti}
                />

        </SafeAreaView>

    );
};

const styles = StyleSheet.create({

    // modal
    Container: {
        flex: 1,
        backgroundColor: 'white',
    },



    TabBar: {
        flexDirection: 'row',
        position: 'absolute',
        width: '100%',
        top: 0,
        height: 80,
        alignItems: 'center',
    },
    MainContainer: {
        flex: 10,
    },
    IconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        marginRight: 15,
    },
    IconHelpContainer: {
        flex: 1,
        paddingLeft: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    ImageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    TitleContainer: {
        flex: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    StatusContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    Profile: {
        width: 40,
        height: 40,
        borderRadius: 100,
        marginRight: 15,
    },
    title: {
        fontFamily: 'Pretendard-Medium',
        fontSize: Platform.OS === 'ios' ? 18 : 15,
    },
    alert: {
        width: 10,
        height: 10,
        borderRadius: 100,
        marginHorizontal: 10,
        marginVertical: 5,
    },
    InputContainer: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
    },
    input: {
        flex: 5,
    },
    icon: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },


    menuContainer: {
        minHeight: 144,
    },
    sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    container: {
        flex: 1,
        paddingBottom: 30,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    cancelButton: {
        borderColor: '#FFC043',
        backgroundColor: 'white',
    },
    audioIconContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        margin: 5,
    },
    profileContainer: {
        flex: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    MenuImage: {
        width: 20,
        height: 20,
        resizeMode: 'stretch',
    },

    AccessoryKeyboardContainer: {
        justifyContent: 'flex-end',
    },

    SideContainerBack: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        justifyContent: 'flex-end',
        top: 0,
        left: 0,
    },

    SideContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: '50%',
        backgroundColor: '#F8F8F8',

    },
    SideButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 86,
        height: 65,
        marginTop: 10,
    },
    SideButtonTxt: {
        fontFamily: 'IBMPlexSansKR-Medium',
        color: '#8C8C8C',
        fontSize: 12,
    },
});