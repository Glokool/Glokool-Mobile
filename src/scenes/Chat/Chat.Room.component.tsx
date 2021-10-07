import React, { useContext, useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Text,
    Platform,
    PermissionsAndroid,
    Dimensions,
    KeyboardAvoidingView,
    Pressable,
    AppState,
    Alert,
    AppStateStatus,
    Keyboard,
    View,
    TouchableOpacity
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
    BubbleProps,
    ActionsProps,
    AvatarProps,
    Avatar,
    Composer, ComposerProps
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
    LocationTitle,
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
import { LocationBubbleMessage, messageType } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { messageIdGenerator } from '../../component/Common/MessageIdGenerator';
import { setAudioVisiblityTrue, setLocationVisiblityTrue, setMenuVisiblityFalse, setMenuVisiblityTrue } from '../../model/Chat/Chat.UI.model';
import {
    ImageModal,
    LocationModal,
    renderBubble,
    renderImage,
    renderTime,
    renderInputToolbar,
    renderLoading,
    renderSend,
    renderSystemMessage,
    renderSound,
    ChatTopTabBarComponent,
    AudioComponent
} from '../../component/Chat/Chatroom';
import { setChatLoadingFalse, setChatLoadingTrue } from '../../model/Chat/Chat.Loading.model';
import { RootState } from '../../model';
import { cleanRoomName, setGuideUID, setRoomName } from '../../model/Chat/Chat.Data.model';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { setLocation } from '../../model/Chat/Chat.Location.model';
import FastImage from 'react-native-fast-image';
import { windowWidth } from '../../Design.component';

// keyboard

import {
    Keyboard as UIKeyboard,
} from 'react-native-ui-lib';
import _ from 'lodash';

const KeyboardAccessoryView = UIKeyboard.KeyboardAccessoryView;
const KeyboardUtils = UIKeyboard.KeyboardUtils;
const KeyboardRegistry = UIKeyboard.KeyboardRegistry;

const keyboards = [
    {
        id: 'unicorn.ImagesKeyboard',
        name: 'Action',
    },
    {
        id: 'unicorn.CustomKeyboard',
        name: 'Emoji',
    }
];

var ToastRef: any;
const WindowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ChatRoomScreen = (props: ChatRoomScreenProps): LayoutElement => {


    const { currentUser, setCurrentUser } = React.useContext(AuthContext);
    const { setChatIcon } = useContext(ChatContext);
    const dispatch = useDispatch();

    const guideToken = useSelector((state: RootState) => state.ChatDataModel.guideUID);
    const roomName = useSelector((state: RootState) => state.ChatDataModel.roomName);
    const day = props.route.params.day
    const menuVisiblity = useSelector((state: RootState) => state.ChatUIModel.menuVisiblity);

    const [ChatDB, setChatDB] = React.useState<FirebaseDatabaseTypes.Reference | undefined>(undefined);
    const [guide, setGuide] = React.useState({});
    const [chatMessages, setChatMessages] = React.useState<Array<IMessage>>([]);

    const msgRef = database().ref(`chats/${roomName}/userUnreadCount`);

    // ADDED KEYBOARD VIEW 키보드 부분 
    const [customKeyboard, setCustomKeyboard] = useState({
        component: undefined,
        initialProps: undefined,
    });
    const [textInputRef, setTextInputRef] = useState();

    const ImagesKeyboard = () => {
        return (
            <View style={styles.SideContainerBack}>
                <View style={styles.SideContainer}>
                    <TouchableOpacity
                        style={styles.SideButton}
                        onPress={() => {
                            dispatch(setAudioVisiblityTrue());
                            KeyboardUtils.dismiss()
                        }}>
                        <Record />
                        <Text style={styles.SideButtonTxt}>Voices</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.SideButton}
                        onPress={() => ImageSend()}>
                        <Images />
                        <Text style={styles.SideButtonTxt}>Images</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.SideButton}
                        onPress={() => takePhoto()}>
                        <Camera />
                        <Text style={styles.SideButtonTxt}>Camera</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.SideButton}
                        onPress={() => LocationMessage()}>
                        <MyLocation />
                        <Text style={styles.SideButtonTxt}>
                            My Location
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }

    const CustomKeyboard = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'cornflowerblue' }}>
                <TouchableOpacity>
                    <Text style={{ padding: 10, }}>Click Me!</Text>
                </TouchableOpacity>
            </View>
        );
    }

    KeyboardRegistry.registerKeyboard(
        'unicorn.ImagesKeyboard',
        () => ImagesKeyboard
    );
    KeyboardRegistry.registerKeyboard(
        'unicorn.CustomKeyboard',
        () => CustomKeyboard
    );

    const showKeyboardView = (component, title) => {
        setCustomKeyboard({
            component,
            initialProps: { title }
        });

    }

    const renderKeyboardAccessoryViewContent = () => {
        return (
            <View style={styles.keyboardContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, }}>
                    <View style={{ flexDirection: 'row' }}>
                        {keyboards.map(keyboard => (
                            <TouchableOpacity onPress={() => showKeyboardView(keyboard.id, keyboard.id)} key={keyboard.id} style={{ marginRight: 10 }}>
                                <Text>{keyboard.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => setCustomKeyboard({})}>
                            <Text>[Reset]</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={KeyboardUtils.dismiss} style={{ paddingLeft: 10 }}>
                            <Text>[Close]</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <SafeAreaView />
            </View>
        );
    };

    const renderKeyboardLine = () => {
        return (
            <View style={{ height: 5, backgroundColor: '#eee' }} />
        )
    }

    const onRequestShowKeyboard = componentID => {
        setCustomKeyboard({
            component: componentID,
            initialProps: { title: 'Keyboard 1 opened by button' }
        });
    };
    // 키보드 끝 //

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


    React.useEffect(() => {

        setChatIcon(false);

        const unsubscribe = props.navigation.addListener('focus', () => { ChatRoomInit(props.route.params.id) });  // 앱 화면 포커스시 채팅방 초기화 실시
        getGuideToken(props.route.params.guide.uid);
        initGuide();

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

        };

    }, []);


    const ChatRoomInit = (id: string): void => {

        const chat = database().ref('/chats/' + id);

        dispatch(setChatLoadingTrue()) // 로딩 시작
        setChatMessages([]); //로컬 메시지 저장소 초기화
        setChatDB(chat);

        dispatch(setRoomName(id));


        chat.on('value', (snapshot) => {

            if (!snapshot.val()) {
                setChatMessages([]);
                dispatch(setChatLoadingFalse());
                return;
            }

            let { messages } = snapshot.val();

            if (!messages) {
                return;
            }

            messages = messages.map((node: messageType) => {
                const message: messageType = {
                    _id: node._id,
                    text: node.messageType === 'message' ? node.text : '',
                    location: node.messageType === 'location' ? node.location : '',
                    createdAt: node.createdAt,
                    user: {
                        _id: node.user._id,
                    },
                    image: node.messageType === 'image' ? node.image : '',
                    audio: node.messageType === 'audio' ? node.audio : '',
                    messageType: node.messageType,
                }
                return message;
            });

            setChatMessages([...messages]);
            dispatch(setChatLoadingFalse());
        });

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

    /* 갤러리 열기*/
    //이미지 전송을 위한 버튼
    const openGallery = async (options) => {
        return await ImagePicker.openPicker(options);
    };

    //이미지 전송을 위한 버튼
    const ImageSend = async (): void => {

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

            const images = await openGallery(pickerOptions);

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

    /* 채팅 창 디자인을 위한 컴포넌트 */
    const onSend = async (messages: IMessage[]) => {

        messages[0].messageType = 'message';
        messages[0].createdAt = new Date().getTime();
        messages[0].user.name = currentUser?.displayName;

        if (filterText(messages[0].text)) {
            await Promise.all([
                ChatDB?.update({
                    messages: [messages[0], ...chatMessages],
                    guideUnreadCount: database.ServerValue.increment(1),
                }),
                sendMessage(messages[0]),
            ]);
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

    const renderComposer = (props: ComposerProps): React.ReactElement => {

        return (
            <Composer
                {...props}
                textInputProps={{ autoFocus: true, selectTextOnFocus: false, numberOfLines: 5 }}
                placeholder="Chat Message"
                textInputStyle={styles.ChatComposer}
                ref={r => { setTextInputRef(r) }}
            />
        )
    };

    const renderCustomBubble = (props: BubbleProps<IMessage> & LocationBubbleMessage) => {

        // Mapview (My Location) 출력을 위한 코드
        if (props.currentMessage.messageType === 'location') {
            return (
                <Pressable
                    onPress={() => {
                        dispatch(setLocationVisiblityTrue());
                        dispatch(setLocation({ lat: props.currentMessage.location.lat, lon: props.currentMessage.location.lon }))
                    }}
                >
                    <Layout style={styles.MyLocationHeaderContainer}>
                        <LocationTitle />
                        <Text style={styles.MyLocationHeaderText}>My Location</Text>
                    </Layout>

                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={{ width: 250, height: 125, margin: 10 }}
                        region={{
                            latitude: parseFloat(
                                props.currentMessage.location.lat,
                            ),
                            longitude: parseFloat(
                                props.currentMessage.location.lon,
                            ),
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}>
                        <Marker
                            coordinate={{
                                latitude: parseFloat(
                                    props.currentMessage.location.lat,
                                ),
                                longitude: parseFloat(
                                    props.currentMessage.location.lon,
                                ),
                            }}
                            title={'My Location'}
                        />
                    </MapView>
                </Pressable>
            );
        }
    };


    const renderActions = (props: ActionsProps): React.ReactElement => {
        return (
            <Pressable
                style={styles.ActionButton}
                onPress={() => {
                    dispatch(setMenuVisiblityTrue());
                    Keyboard.dismiss();
                }}
            >
                <FastImage
                    style={styles.MenuImage}
                    source={require('../../assets/icon/Chat/Menu_S.png')}
                />
            </Pressable>
        );
    };


    // 아바타 렌더링
    const renderAvatar = (props: AvatarProps<IMessage>): React.ReactElement => {

        if (props.currentMessage?.user.avatar == undefined) {

            return (
                <Layout style={{ width: windowWidth * 0.08, height: windowWidth * 0.08, marginRight: 5 }}>
                    <FastImage source={require('../../assets/image/Chat/guideGray.png')} style={{ width: windowWidth * 0.08, height: windowWidth * 0.08 }} resizeMode={'stretch'} />
                </Layout>
            )
        }

        return (
            <Avatar
                {...props}
            />
        )
    }



    //실제 렌더링
    return (
        <Layout
            style={{ width: '100%', height: '100%' }}

        >
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />

            <KeyboardAvoidingView
                style={styles.Container}
                behavior={Platform.OS === 'android' ? 'height' : 'padding'}
                keyboardVerticalOffset={Platform.OS === 'android' ? 60 : -230}
            >
                <Layout style={styles.mainContainer}>

                    <GiftedChat
                        messages={chatMessages}
                        textInputProps={{ autoFocus: true }}
                        onSend={(messages) => onSend(messages)}
                        infiniteScroll={true}
                        createdAt={new Date().getTime()}
                        user={{
                            _id: currentUser?.uid,
                        }}
                        isAnimated
                        messagesContainerStyle={{
                            paddingBottom: 30,
                            paddingTop: 80,
                        }}
                        renderUsernameOnMessage={false}
                        alwaysShowSend={true}
                        showUserAvatar={false}
                        renderAvatarOnTop={true}
                        renderAvatar={renderAvatar}
                        renderTime={renderTime}
                        renderSend={renderSend}
                        renderInputToolbar={(props) => renderInputToolbar(props, day)}
                        renderBubble={renderBubble}
                        renderLoading={renderLoading}
                        renderComposer={renderComposer}
                        renderSystemMessage={renderSystemMessage}
                        renderMessageImage={renderImage}
                        renderMessageAudio={renderSound}
                        renderCustomView={renderCustomBubble}
                        renderActions={renderActions}
                        // 키보드 accessory view
                        renderAccessory={renderKeyboardAccessoryViewContent}
                    />

                    <KeyboardAccessoryView
                        renderContent={renderKeyboardLine}
                        trackInteractive={true}
                        kbInputRef={textInputRef}
                        kbComponent={customKeyboard.component}
                        kbInitialProps={customKeyboard.initialProps}
                        onKeyboardResigned={() => setCustomKeyboard({})}
                        revealKeyboardInteractive
                        onRequestShowKeyboard={onRequestShowKeyboard}
                        useSafeArea={true}
                    />
                </Layout>

                {/* 가이드 정보를 출력하는 모달 */}
                <ProfileModal guide={guide} navigation={props.navigation} route={props.route} />

                {/* 이미지 클릭시 확대 이미지 창 출력 */}
                <ImageModal />

                {/* 지도 메시지 클릭시 확대 창 출력 */}
                <LocationModal />

                {/*채팅방 탑 탭바*/}
                <ChatTopTabBarComponent msgRef={msgRef} ChatDB={ChatDB} props={props} guide={guide} />


                {/* 사이드 컨테이너 - 이미지, 음성, 위치 */}
                {menuVisiblity == true ? (
                    <Layout
                        style={styles.SideContainerBack}
                        onTouchEnd={() => dispatch(setMenuVisiblityFalse())}>
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
                    </Layout>
                ) : null}

            </KeyboardAvoidingView>

            <AudioComponent
                roomName={roomName}
                currentUser={currentUser}
                ChatDB={ChatDB}
                chatMessages={chatMessages}
                messageIdGenerator={messageIdGenerator}
                createPushNoti={createPushNoti}
            />

        </Layout>
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
    mainContainer: {
        width: '100%',
        height: '100%',
    },
    inputToolbar: {
        margin: 10,
    },
    sendIcon: {
        width: 32,
        height: 32,
    },
    ActionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 17,
        marginBottom: 17,
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
        height: 100,
        backgroundColor: '#F8F8F8',
        marginBottom: 100,
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
    BackDropContainer: {
        width: WindowWidth,
        height: windowHeight * 0.7,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    AudioContainer: {
        width: WindowWidth,
        height: windowHeight * 0.3,
        borderTopWidth: 5,
        borderColor: '#7676FE',
        backgroundColor: '#F8F8F8',
    },
    VoiceContainerExitButton: {
        alignSelf: 'flex-end',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    AudioCenterContainer: {
        backgroundColor: "#00FF0000",
    },
    AudioCenterStopwatch: {
        paddingRight: 3,
        textAlign: 'center',
        fontFamily: 'BrandonGrotesque-Bold',
        color: '#7777FF',
        fontSize: 18,
        marginBottom: 15,
    },
    VoiceRecorder: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#00FF0000',
    },
    RecordingStatusTxt: {
        fontFamily: 'IBMPlexSansKR-SemiBold',
        color: '#D2D2D2',
        fontSize: 16,
        textAlign: 'center',
    },
    RecordingStatusTxt_ing: {
        fontFamily: 'IBMPlexSansKR-SemiBold',
        color: '#7777FF',
        fontSize: 16,
        textAlign: 'center',
    },
    RecordingButton: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    SendButton: {
        borderRadius: 35,
        backgroundColor: '#7777FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    SendButton_D: {
        borderRadius: 35,
        backgroundColor: '#D2D2D2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    SendButtonTxt: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 16,
        marginHorizontal: 20,
        marginVertical: 5,
        color: 'white',
        textAlign: 'center',
    },
    ChatComposer: {
        alignSelf: 'center',
        marginBottom: -2,
        textDecorationLine: 'none',
        borderBottomWidth: 0,
        textAlignVertical: 'center',
        maxHeight: 90,
    },
    ChatInputToolBar: {
        borderWidth: 1.5,
        borderColor: '#D1D1D1',
        borderRadius: 30,
        margin: 10,
        alignItems: 'center',
    },
    MyLocationHeaderContainer: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    MyLocationHeaderText: {
        textAlign: 'right',
        marginTop: 5,
        marginRight: 10,
        color: '#8C8C8C',
        fontFamily: 'BrandonGrotesque-Medium',
        fontSize: 17,
        marginLeft: 5
    },
    keyboardContainer: {
        backgroundColor: 'white',
        paddingVertical: 5,
        width: WindowWidth
    },
    ChatComposer: {
        alignSelf: 'center',
        marginBottom: -2,
        textDecorationLine: 'none',
        borderBottomWidth: 0,
        textAlignVertical: 'center',
        maxHeight: 90,
    },
});


