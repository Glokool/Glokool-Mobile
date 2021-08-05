import React, { useCallback, useContext, useRef, useState } from 'react';

import {
    StyleSheet,
    SafeAreaView,
    Text,
    Image,
    Platform,
    PermissionsAndroid,
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    Pressable,
    TouchableOpacity,
    AppState,
    Alert,
} from 'react-native';
import {
    Layout,
    Spinner,
    Modal,
    Card,
    LayoutElement,
} from '@ui-kitten/components';
import database, {
    FirebaseDatabaseTypes,
} from '@react-native-firebase/database';
import {
    Bubble,
    InputToolbar,
    GiftedChat,
    Composer,
    Send,
    SystemMessage,
    Time,
} from 'react-native-gifted-chat';
import Sound from 'react-native-sound';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import storage from '@react-native-firebase/storage';
import FastImage from 'react-native-fast-image';
import {
    launchCamera,
    launchImageLibrary,
} from 'react-native-image-picker/src';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faTimes,
    faPlay,
    faPlayCircle,
} from '@fortawesome/free-solid-svg-icons';
import { SceneRoute } from '../../navigation/app.route';
import moment from 'moment';
import { filterText } from '../../data/filterChat';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { ChatRoomScreenProps } from '../../navigation/ScreenNavigator/Chat.navigator';
import {
    Chat_Voice_End,
    Chat_Voice_Start,
    Chat_Voice_Stop,
    Help,
    Images,
    Camera,
    MyLocation,
    SendIcon,
    Record,
} from '../../assets/icon/Chat';
import { AngleLeft_Color, Exit_C } from '../../assets/icon/Common';
import messaging from '@react-native-firebase/messaging';
import ImagePicker from 'react-native-image-crop-picker';
import {
    requestCameraPermission,
    requestStoragePermission,
} from '../../component/permission.component';
import { SERVER } from '../../server.component';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
// import { Alert } from '../../assets/icon/Auth';
// 안쓰여서 일단 주석처리

import { ProfileModal } from '../../component/Chat/chat.profile.component';


var ToastRef: any;
const WindowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ChatRoomScreen = (props: ChatRoomScreenProps): LayoutElement => {

    const { currentUser, setCurrentUser } = React.useContext(AuthContext);
    const { setChatIcon } = useContext(ChatContext);
    setChatIcon(false);

    //채팅 메시지 저장을 위한 정보
    const [
        ChatDB,
        setChatDB,
    ] = React.useState<FirebaseDatabaseTypes.Reference>();

    const [guide, setGuide] = React.useState({});
    const [ENG, setENG] = useState(false);
    const [CHN, setCHN] = useState(false);

    const [roomName, setRoomName] = React.useState<string>();
    const [chatMessages, setChatMessages] = React.useState([]);
    const [mapvisible, setMapvisible] = React.useState(false);
    const [fechChat, setFetchChat] = React.useState(false);
    const [location, setLocation] = React.useState({
        lon: '',
        lat: '',
    });
    //가이드 정보 모달
    const [guideVisible, setGuideVisible] = React.useState(false);

    //하단 오버플로우 메뉴 (이미지, 보이스)
    const [selectedIndex2, setSelectedIndex2] = React.useState(null);
    const [visible2, setVisible2] = React.useState(false);
    const onItemSelect2 = (index) => {
        setSelectedIndex2(null);
        setVisible2(false);
    };

    //오디오 녹음 관련 함수 및 변수
    //오디오 녹음 창
    const [audioVisible, setAudioVisible] = React.useState(false);
    const [startAudio, setStartAudio] = React.useState(false);
    const [audioMessage, setAudioMessage] = React.useState('');
    const [audioPath, setAudioPath] = React.useState('');

    const [imageZoomVisible, setImageZoomVisible] = React.useState(false);

    const [guideToken, setGuideToken] = React.useState('');

    const msgRef = database().ref(`chats/${roomName}/userUnreadCount`);
    const [timer, setTimer] = React.useState(0);
    const [isActive, setIsActive] = React.useState(false);
    const [isPaused, setIsPaused] = React.useState(false)
    const increment = React.useRef(null);

    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `0${Math.floor(timer / 60)}`
        const getMinutes = `${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

        return `${getMinutes}:${getSeconds}`
    }

    const audioStopwatchStart = () => {
        // setIsActive(true)
        // console.log('stopwatchstart')
        // increment.current = setInterval(() => {
        // setTimer((timer) => timer + 1)
        // }, 10)
        // clearInterval(increment.current)
        setIsActive(true)
        setIsPaused(true)
        increment.current = setInterval(() => {
            setTimer((timer) => timer + 1)
            console.log(timer)
        }, 1000)
    }

    const audioStopwatchStop = () => {
        clearInterval(increment.current)
        setIsPaused(false)
    }

    const audioStopwatchReset = () => {
        clearInterval(increment.current)
        setIsActive(false)
        setIsPaused(false)
        setTimer(0)
    }

    const getGuideToken = async (uid: string) => {
        const guideRef = database().ref(`/guide/${uid}`);

        guideRef.on('value', (snapshot) => {

            if (!snapshot.val()) {
                return;
            }
            const guideToken = snapshot.val();
            setGuideToken(guideToken);
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

    const [imageURL, setImageURL] = React.useState('');

    /* 이미지 클릭시 modal Activation */
    const imageZoom = (imageUrl: string): void => {
        setImageZoomVisible(true);
        setImageURL(imageUrl);
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

    const handleAppStateChange = (nextAppState) => {
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

    /* 앱 상태 확인 useEffect */
    React.useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        };
    }, []);

    /* check access token */
    React.useEffect(() => {
        if (!currentUser?.access_token) {
            getAccessToken();
        }
    }, []);

    React.useEffect(() => {
        getGuideToken(props.route.params.guide.uid);
        initGuide();
    }, []);

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            ChatRoomInit(props.route.params.id);
        });

        return unsubscribe;
    }, []);

    /* navigation 삭제 전 메시지 읽음표시 */
    React.useEffect(() =>
        props.navigation.addListener('beforeRemove', () => {
            ChatDB.off('value');
            resetUserUnreadMsgCount();
        }),
    );

    // 가이드 프로필 모달 컴포넌트에 true 전달 후 바로 false
    React.useEffect(() => {
        if (guideVisible) {
            setGuideVisible(false);
        }
    }, [guideVisible])

    /* 뒤로가기 버튼 */
    const backAction = () => {
        ChatDB.off('value');
        resetUserUnreadMsgCount();
        props.navigation.goBack();

        return true;
    };

    // 채팅방으로 넘어갈 때 기존 채팅 기록들 받아와서 init
    // 채팅 데이터들은 Firebase RTDB 에서 받아온다
    // [...messages] 에 type 처럼 저장됨
    async function ChatRoomInit(id: string) {
        const chat = database().ref('/chats/' + id);

        setChatMessages([]); //로컬 메시지 저장소 초기화
        setChatDB(chat);
        setRoomName(id);

        chat.on('value', (snapshot) => {
            if (!snapshot.val()) {
                setChatMessages([]);
                setFetchChat(true);
                return;
            }

            let { messages } = snapshot.val();
            messages = messages.map((node) => {
                const message = {};
                message._id = node._id;
                message.text = node.messageType === 'message' ? node.text : '';
                message.location =
                    node.messageType === 'location' ? node.location : {};
                message.createdAt = node.createdAt;
                message.user = {
                    _id: node.user._id,
                };
                message.image = node.messageType === 'image' ? node.image : '';
                message.audio = node.messageType === 'audio' ? node.audio : '';
                message.messageType = node.messageType;
                return message;
            });

            setChatMessages([...messages]);
            setFetchChat(true);
        });

    }

    const messageIdGenerator = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    };

    // param으로 받은 채팅 날짜
    const [day, setDay] = React.useState(props.route.params.day);

    //오디오 녹음 창
    const handleAudio = async () => {
        AudioRecorder.requestAuthorization().then((isAuthorised) => { });

        if (startAudio == false) {
            //오디오 버튼 시작

            setStartAudio(true);
            setAudioMessage(messageIdGenerator);

            await AudioRecorder.prepareRecordingAtPath(
                `${AudioUtils.DocumentDirectoryPath}/${audioMessage}test.aac`,
                {
                    SampleRate: 22050,
                    Channels: 1,
                    AudioQuality: 'Low',
                    AudioEncoding: 'aac',
                    MeteringEnabled: true,
                    IncludeBase64: true,
                    AudioEncodingBitRate: 32000,
                },
            );
            await AudioRecorder.startRecording();
            audioStopwatchReset();
            audioStopwatchStart();
            console.log('start?');
        } else {
            // 다시 눌렀을 경우 (녹음 종료후 바로 전달)
            setStartAudio(false);
            audioStopwatchStop();
            console.log('stop?');

            const recorder = await AudioRecorder.stopRecording();
            AudioRecorder.onFinished = (data) => {

                if (Platform.OS === 'ios') {
                    var path = data.audioFileURL;
                    setAudioPath(path);
                } else {
                    var path = `file://${data.audioFileURL}`;
                    setAudioPath(path);
                }
            };
        }
    };

    const sendAudio = () => {
        const reference = storage().ref();
        const voiceRef = reference.child(
            `chat/${roomName}/voice/${audioMessage}.aac`,
        ); //xxxxx는 대화방 이름으로 변경

        voiceRef
            .putFile(audioPath)
            .then((response) => {
                voiceRef.getDownloadURL().then((result) => {
                    const message = {
                        _id: audioMessage,
                        createdAt: new Date().getTime(),
                        user: {
                            _id: currentUser?.uid,
                            name: currentUser?.displayName,
                            avatar: currentUser?.photoURL,
                        },
                        audio: result, //파일 경로만 전달
                        messageType: 'audio',
                    };
                    const push = createPushNoti('음성메시지를 보냈습니다.');

                    Promise.all([
                        ChatDB.update({
                            messages: [message, ...chatMessages],
                            guideUnreadCount: database.ServerValue.increment(1),
                        }),
                        sendMessage(push),
                    ]);

                    setAudioPath('');
                    setAudioVisible(false);
                });
            })
            .catch((err) => {
                setAudioPath('');
                setAudioVisible(false);
            });
        audioStopwatchReset();

    };
    //녹음 버튼을 클릭하고 다시 녹음 버튼을 누르지 않고 종료 버튼을 클릭했을 때
    const audioExit = async () => {
        audioStopwatchReset();
        setAudioPath('');
        setAudioVisible(false);

        if (startAudio == true) {
            setStartAudio(false);
            await AudioRecorder.stopRecording();
        }
    };

    const PressReset = async () => {
        setAudioPath('');

        if (startAudio == true) {
            setStartAudio(false);
            await AudioRecorder.stopRecording();
        }
    };

    /* 채팅창 이미지 컴포넌트 */
    const ChatImg = ({ imgUrl }) => {
        return (
            <Pressable onPress={() => imageZoom(imgUrl)}>
                <FastImage
                    source={{ uri: imgUrl }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={{
                        width: 150,
                        height: 100,
                        borderRadius: 10,
                        margin: 3,
                    }}
                />
            </Pressable>
        );
    };

    /* gifted chat 이미지 렌더링 */
    const renderImage = (props) => {
        const imageURL = props.currentMessage.image;
        if (typeof imageURL === 'string') {
            return <ChatImg key={0} imgUrl={imageURL} />;
        } else {
            return (
                <>
                    {imageURL.map((url: string, index: number) => (
                        <ChatImg key={index} imgUrl={url} />
                    ))}
                </>
            );
        }
    };

    const renderAudio = (props) => {
        return (
            <TouchableOpacity
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20,
                }}
                onPress={async () => {
                    const sound = new Sound(
                        props.currentMessage.audio,
                        '',
                        (error) => {
                            if (error) {
                                console.log('보이스 파일 다운로드 실패');
                            }

                            sound.play((success) => {
                                if (success) {
                                    console.log('재생 성공');
                                    // console.log(sound.getDuration())
                                } else {
                                    console.log('재생 실패');
                                }
                            });
                        },
                    );
                }}>
                <FontAwesomeIcon icon={faPlay} size={16} />
            </TouchableOpacity>
        );
    };

    const createPushNoti = (message: string): object => {
        return {
            user: {
                name: currentUser?.displayName,
            },
            text: message,
        };
    };

    /*이미지 촬영 */
    const takePhoto = async () => {
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
                    if (response) {
                        if (response.didCancel == true) {
                            //중도 취소시
                        } else {
                            const MessageID = messageIdGenerator();

                            const FileName = response.fileName;
                            var type = response.type;

                            const imageType = type.split('/');
                            const reference = storage().ref();

                            const picRef = reference
                                .child(
                                    `chats/${roomName}/picture/${MessageID}.${imageType[1]}`,
                                )
                                .putFile(response.uri); //xxxxx는 대화방 이름으로 변경
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
                                    picRef.snapshot.ref
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
                                                ChatDB.update({
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
    const ImageSend = async () => {
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

                const push = createPushNoti('이미지를 보냈습니다');

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
                    ChatDB.update({
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
    const sendMessage = async (message) => {
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
    const onSend = async (messages = []) => {
        messages[0].messageType = 'message';
        messages[0].createdAt = new Date().getTime();
        messages[0].user.name = currentUser?.displayName;

        if (filterText(messages[0].text)) {
            await Promise.all([
                ChatDB.update({
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

    const renderSend = (props) => {
        return (
            <Send {...props} containerStyle={styles.sendButton}>
                <SendIcon />
            </Send>
        );
    };

    const onRenderSystemMessage = (props) => (
        <SystemMessage
            {...props}
            containerStyle={{ backgroundColor: 'white' }}
            textStyle={{
                color: '#c9c9c9',
                fontSize: 14,
                textAlign: 'center',
                padding: 5,
            }}
        />
    );
    // 컨텐츠 전송 시 나타나는 창
    // 채팅 창 좌측 버튼
    const renderActions = (props) => {
        return (
            // 버튼
            <Pressable
                style={styles.ActionButton}
                onPress={() => setVisible2(true)}>
                {/* visible2 state 에 따라서 바뀜 */}
                {visible2 === true ? (
                    <FastImage
                        style={styles.MenuImage}
                        source={require('../../assets/icon/Chat/Menu_S.png')}
                    />
                ) : (
                    <FastImage
                        style={styles.MenuImage}
                        source={require('../../assets/icon/Chat/Menu.png')}
                    />
                )}
            </Pressable>
        );
    };

    // 현재 나의 위치 전송
    const LocationMessage = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
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

                        // 지도 주소 전송하는 방식으로 변경
                        const push = createPushNoti('지도위치를 보냈습니다.');

                        Promise.all([
                            ChatDB.update({
                                messages: [message, ...chatMessages],
                                guideUnreadCount: database.ServerValue.increment(
                                    1,
                                ),
                            }),
                            sendMessage(push),
                        ]);
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
                    },
                );
            } else {
                ToastRef.show('GPS Permission Denied...', 2000);
            }
        } else {
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

                    ChatDB.update({
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
                },
            );
        }
    };

    // 대화창 말풍선 
    const renderBubble = (props) => {

        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#7777FF',
                        borderRadius: 10,
                        marginBottom: 3,
                    },
                    right: {
                        backgroundColor: 'white',
                        borderRadius: 10,
                        marginBottom: 3,
                        padding: 5,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 1.41,
                        elevation: 2,
                    },
                }}
                textStyle={{
                    left: {
                        color: 'white',
                        fontFamily: 'IBMPlexSansKR-Medium',
                    },
                    right: {
                        color: '#4E4ED8',
                        fontFamily: 'IBMPlexSansKR-Medium',
                    },
                }}
                tickStyle={{ color: 'black' }}
            />
        );
    };
    // 채팅 메세지에 달려있는 시간 표시
    const renderTime = (props: any) => {
        if (props.position === 'right') {
            return (
                <Layout
                    style={{
                        position: 'absolute',
                        backgroundColor: '#00FF0000',
                        left: -60,
                        top: -10,
                    }}>
                    <Time
                        {...props}
                        containerStyle={{ backgroundColor: 'red' }}
                        timeTextStyle={{
                            left: {
                                color: '#AEAEAE',
                                fontFamily: 'BrandonGrotesque-Medium',
                            },
                            right: {
                                color: '#AEAEAE',
                                fontFamily: 'BrandonGrotesque-Medium',
                            },
                        }}
                    />
                </Layout>
            );
        } else {
            return (
                <Layout
                    style={{
                        position: 'absolute',
                        backgroundColor: '#00FF0000',
                        right: -55,
                        top: -15,
                    }}>
                    <Time
                        {...props}
                        containerStyle={{ backgroundColor: 'red' }}
                        timeTextStyle={{
                            left: {
                                color: '#AEAEAE',
                                fontFamily: 'BrandonGrotesque-Medium',
                            },
                            right: {
                                color: '#AEAEAE',
                                fontFamily: 'BrandonGrotesque-Medium',
                            },
                        }}
                    />
                </Layout>
            );
        }
    };
    // MapView 가 들어가는 말풍선인듯 싶음
    const renderCustomBubble = (props) => {
        if (props.currentMessage.messageType === 'location') {
            return (
                <Pressable>
                    <Text
                        style={{
                            textAlign: 'right',
                            marginTop: 5,
                            marginRight: 10,
                            color: '#8C8C8C',
                            fontFamily: 'BrandonGrotesque-Medium',
                        }}>
                        My Location
                    </Text>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
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

    const displayMap = (props) => {
        setLocation({
            lon: props.location.lon,
            lat: props.location.lat,
        });
        setMapvisible(true);
    };

    //입력 창 확인
    const renderInputToolbar = (props) => {
        return (
            <>
                {new Date(day).getFullYear() == new Date().getFullYear() &&
                    new Date(day).getMonth() == new Date().getMonth() &&
                    new Date(day).getDate() == new Date().getDate() ? (
                    <InputToolbar
                        {...props}
                        containerStyle={{
                            borderWidth: 1.5,
                            borderColor: '#D1D1D1',
                            borderRadius: 30,
                            margin: 10,
                            alignItems: 'center',
                        }}
                    />
                ) : null}
            </>
        );
    };

    //입력창 정렬을 위한 코드
    const renderComposer = (props) => {
        return (
            <Composer
                {...props}
                textInputProps={{ autoFocus: true, selectTextOnFocus: false }}
                placeholder="Chat Message"
                textInputStyle={{
                    alignSelf: 'center',
                    marginBottom: -2,
                    textDecorationLine: 'none',
                    borderBottomWidth: 0,
                    textAlignVertical: 'center',
                }}
                style={{ borderRadius: 35 }}
            />
        );
    };

    //대화 내용을 로딩하기 전 스피너 작동
    const renderLoading = () => {
        if (!chatMessages.length && !fechChat) {
            return (
                <Layout style={styles.loading}>
                    <Spinner size="giant" />
                </Layout>
            );
        }
    };

    //가이드 정보를 띄우는 모달
    const PressGuide = () => {
        setGuideVisible(true);
    };

    // 맵 뷰 헤더
    const Header = (props) => (
        <Layout style={{ flexDirection: 'row', padding: 20 }}>
            <Layout style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        alignItems: 'center',
                    }}>
                    My Location
                </Text>
            </Layout>

            <Layout style={{ flex: 1, alignItems: 'flex-end' }}>
                <Pressable onPress={() => setMapvisible(false)}>
                    <FontAwesomeIcon icon={faTimes} size={28} />
                </Pressable>
            </Layout>
        </Layout>
    );

    const initGuide = async (guideInfo = props.route.params.guide) => {
        if (guideInfo.uid != '') {
            try {
                const res = await axios.get(`${SERVER}/api/guides/` + guideInfo.uid);
                console.log(res.data);

                await setGuide({
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

            } catch (e) {
                console.log('e', e);
            }
        }
        else {
            Alert.alert('Sorry,', 'Guide Not Matched!');
        }
    }

    // 재훈 함수 !!
    // 가이드 프로필 띄워보기
    const showGuideProfile = async (guideInfo: any) => {
        if (guideInfo.uid != '') {
            try {
                const res = await axios.get(`${SERVER}/api/guides/` + guideInfo.uid);
                console.log(res.data);

                await setGuide({
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

    //실제 렌더링
    return (
        <Layout
            style={{ width: '100%', height: '100%' }}
            onTouchStart={Keyboard.dismiss}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />

            <KeyboardAvoidingView
                style={styles.Container}
                behavior={Platform.OS === 'android' ? 'height' : 'padding'}
                keyboardVerticalOffset={Platform.OS === 'android' ? 30 : -230}>
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
                        renderAvatar={null}
                        alwaysShowSend={true}
                        renderUsernameOnMessage={false}
                        renderTime={renderTime}
                        renderInputToolbar={renderInputToolbar}
                        renderSend={renderSend}
                        renderActions={renderActions}
                        renderBubble={renderBubble}
                        renderLoading={renderLoading}
                        renderComposer={renderComposer}
                        renderSystemMessage={onRenderSystemMessage}
                        renderMessageImage={renderImage}
                        renderMessageAudio={renderAudio}
                        renderCustomView={renderCustomBubble}
                    />
                </Layout>

                {/* 가이드 정보를 출력하는 모달 */}
                <ProfileModal guide={guide} ENG={ENG} CHN={CHN} isVisible={guideVisible} navigation={props.navigation} route={props.route} />

                <Modal
                    visible={imageZoomVisible}
                    backdropStyle={styles.imageZoomBackGround}>
                    <Layout style={styles.ModalLayout}>
                        <Pressable
                            style={{
                                position: 'absolute',
                                top: 50,
                                left: 20,
                            }}
                            onPress={() =>
                                setImageZoomVisible(!imageZoomVisible)
                            }>
                            <Text
                                style={{
                                    color: '#f1f1f1',
                                    fontSize: 30,
                                    fontWeight: 'bold',
                                }}>
                                X
                            </Text>
                        </Pressable>
                        <FastImage
                            source={{ uri: imageURL }}
                            resizeMode={FastImage.resizeMode.cover}
                            style={{
                                width: WindowWidth,
                                height: Math.round((windowHeight * 9) / 16),
                            }}
                        />
                    </Layout>
                </Modal>

                <Modal
                    visible={mapvisible}
                    backdropStyle={styles.backdrop}
                    onBackdropPress={() => setMapvisible(false)}>
                    <Card disabled={true} header={Header}>
                        <MapView
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={{
                                width: Dimensions.get('window').width * 0.9,
                                height: Dimensions.get('window').height * 0.8,
                            }}
                            region={{
                                latitude: parseFloat(location.lat),
                                longitude: parseFloat(location.lon),
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            }}>
                            <Marker
                                coordinate={{
                                    latitude: parseFloat(location.lat),
                                    longitude: parseFloat(location.lon),
                                }}
                                title={'My Location'}
                            />
                        </MapView>
                    </Card>
                </Modal>

                {/*탭바 디자인*/}
                <Layout style={styles.TabBar}>
                    <Pressable
                        style={styles.IconContainer}
                        onPress={() => backAction()}>
                        <AngleLeft_Color />
                    </Pressable>

                    {/* 가이드 프로필 나타내는 부분 */}
                    {/* TouchableOpacity 를 Layout 바깥쪽으로 추가하니까 버튼 위치가 바뀜 */}
                    {/* 이미지, 텍스트에 각각 씌워주니 해결됨 */}
                    <Layout style={styles.profileContainer}>
                        <TouchableOpacity onPress={() => showGuideProfile(props.route.params.guide)}>
                            {guide.avatar != " " &&
                                guide.avatar != undefined &&
                                guide.avatar != null ? (
                                <Image
                                    source={{ uri: guide.avatar }}
                                    style={styles.Profile}
                                />
                            ) : (
                                <Image
                                    source={require('../../assets/profile/profile_01.png')}
                                    style={styles.Profile}
                                />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => showGuideProfile(props.route.params.guide)}>
                            <Text style={styles.title}>
                                {props.route.params.guide.name === undefined
                                    ? `매칭중..`
                                    : `${props.route.params.guide.name}`}
                            </Text>
                        </TouchableOpacity>
                    </Layout>

                    <Pressable
                        style={styles.IconContainer}
                        onPress={() => {
                            props.navigation.navigate(SceneRoute.CHAT_HELP, {
                                id: props.route.params.id,
                                guide: {
                                    uid: props.route.params.guide.uid,
                                    name: props.route.params.guide.name,
                                },
                            });
                        }}>
                        <Help />
                    </Pressable>
                </Layout>

                {/* 사이드 컨테이너 - 이미지, 음성, 위치 */}
                {visible2 == true ? (
                    <Layout
                        style={styles.SideContainerBack}
                        onTouchEnd={() => setVisible2(false)}>
                        <Layout style={styles.SideContainer}>
                            <Pressable
                                style={styles.SideButton}
                                onPress={() => setAudioVisible(true)}>
                                <Record />
                                <Text style={styles.SideButtonTxt}>Voices</Text>
                            </Pressable>

                            <Pressable
                                style={styles.SideButton}
                                onPress={async () => await ImageSend()}>
                                <Images />
                                <Text style={styles.SideButtonTxt}>Images</Text>
                            </Pressable>

                            <Pressable
                                style={styles.SideButton}
                                onPress={async () => takePhoto()}>
                                <Camera />
                                <Text style={styles.SideButtonTxt}>Camera</Text>
                            </Pressable>

                            <Pressable
                                style={styles.SideButton}
                                onPress={async () => await LocationMessage()}>
                                <MyLocation />
                                <Text style={styles.SideButtonTxt}>
                                    My Location
                                </Text>
                            </Pressable>
                        </Layout>
                    </Layout>
                ) : null}
            </KeyboardAvoidingView>

            {audioVisible === true ? (
                <Layout style={styles.SideContainerBack}>
                    <Layout
                        style={styles.BackDropContainer}
                        onTouchStart={() => audioExit()}
                    />
                    <Layout style={styles.AudioContainer}>
                        <Pressable
                            style={styles.VoiceContainerExitButton}
                            onPress={() => audioExit()}>
                            <Exit_C />
                        </Pressable>

                        <Layout style={styles.VoiceRecorder}>
                            <Text
                                style={
                                    startAudio
                                        ? styles.RecordingStatusTxt_ing
                                        : styles.RecordingStatusTxt
                                }>{`Re-${'\n'}recording`}</Text>
                            <Layout style={styles.AudioCenterContainer}>
                                <Text style={styles.AudioCenterStopwatch}>
                                    {formatTime()}
                                </Text>
                                <Pressable
                                    style={styles.RecordingButton}
                                    onPress={handleAudio}>
                                    {audioPath == '' ? (
                                        startAudio === true ? (
                                            <Chat_Voice_Stop />
                                        ) : (
                                            <Chat_Voice_Start />
                                        )
                                    ) : (
                                        <Chat_Voice_End />
                                    )}
                                </Pressable>
                            </Layout>

                            <Pressable
                                style={
                                    audioPath === ''
                                        ? styles.SendButton_D
                                        : styles.SendButton
                                }
                                onPress={() => {
                                    if (audioPath != '') {
                                        sendAudio();
                                    }
                                }}>
                                <Text style={styles.SendButtonTxt}>Send</Text>
                            </Pressable>
                        </Layout>
                    </Layout>
                </Layout>
            ) : null}

            {/* 녹음기 화면
            <Modal
                style={{position: 'absolute', bottom: 0, width: '100%', height: 182 }}
                visible={audioVisible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => audioExit()}
            >
                <Layout style={{backgroundColor: 'white', width: '100%', height: 56, flexDirection: 'row'}}>

                    <Layout style={{flex: 1, borderRadius: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 10}}>
                        <TouchableOpacity onPress={PressReset}>
                            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#FCCA67'}}>RESET</Text>
                        </TouchableOpacity>
                    </Layout>

                    <Layout style={{flex: 1, borderRadius: 120, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderColor: 'black', borderWidth: 1, margin: 10}}>
                        <TouchableOpacity onPress={handleAudio}>
                            {startAudio? <FontAwesomeIcon icon={faStop} size={16}/> : <FontAwesomeIcon icon={faPlay} size={16}/> }
                        </TouchableOpacity>
                    </Layout>

                    <Layout style={{flex: 1, borderRadius: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 10}}>
                        <TouchableOpacity onPress={() => {
                            if(audioPath != ''){
                                sendAudio();
                            }
                        }}>
                            {(audioPath != '')? <Text style={{fontSize: 12, fontWeight: 'bold', color: '#FCCA67'}}>SEND</Text> : <Text style={{fontSize: 12, fontWeight: 'bold', color: '#C9C9C9'}}>SEND</Text> }
                        </TouchableOpacity>
                    </Layout>
                </Layout>
            </Modal> */}
        </Layout>
    );
};

const styles = StyleSheet.create({
    // modal
    imageZoomBackGround: {
        backgroundColor: 'rgba(0, 0, 0, 10)',
    },
    ModalLayout: {
        width: WindowWidth,
        height: windowHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 10)',
    },
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
        fontSize: 12,
        fontWeight: 'bold',
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
        marginLeft: 15,
        marginBottom: 12,
    },
    loading: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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
        justifyContent: 'center',
    },
    MenuImage: {
        width: 30,
        height: 30,
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
});
