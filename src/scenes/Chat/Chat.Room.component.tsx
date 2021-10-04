import React, { useContext } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Text,
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
    InputToolbarProps,
    ComposerProps,
    BubbleProps,
    IMessage,
} from 'react-native-gifted-chat';
import Sound from 'react-native-sound';
import storage from '@react-native-firebase/storage';
import FastImage from 'react-native-fast-image';
import {
    launchCamera,
} from 'react-native-image-picker/src';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faTimes,
    faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { filterText } from '../../data/filterChat';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { ChatRoomScreenProps } from '../../navigation/ScreenNavigator/Chat.navigator';
import {
    Images,
    Camera,
    MyLocation,
    SendIcon,
    Record,
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
import { AudioComponent } from '../../component/Chat';
import { messageType } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { ChatTopTabBarComponent } from '../../component/Chat/Chatroom/Chat.TopTabBar.component';
import { messageIdGenerator } from '../../component/Common/MessageIdGenerator';
import { setAudioVisiblityTrue } from '../../model/Chat/Chat.UI.model';
import { renderBubble, renderComposer, renderCustomBubble, renderTime } from '../../component/Chat/Chatroom';
import { setChatLoadingFalse, setChatLoadingTrue } from '../../model/Chat/Chat.Loading.model';
import { RootState } from '../../model';
import { renderLoading } from '../../component/Chat/Chatroom/Chat.Custom.component';


var ToastRef: any;
const WindowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ChatRoomScreen = (props: ChatRoomScreenProps): LayoutElement => {

    const { currentUser, setCurrentUser } = React.useContext(AuthContext);
    const { setChatIcon } = useContext(ChatContext);
    const dispatch = useDispatch();
    
    const [ChatDB, setChatDB] = React.useState<FirebaseDatabaseTypes.Reference | undefined>(undefined); // Realtime Database 연결을 위한 React Hook
    const [guide, setGuide] = React.useState({});
    const [ENG, setENG] = React.useState(false);
    const [CHN, setCHN] = React.useState(false);
    const [roomName, setRoomName] = React.useState<string>();
    const [chatMessages, setChatMessages] = React.useState<Array<IMessage>>([]);
    const [mapvisible, setMapvisible] = React.useState(false);
    const [location, setLocation] = React.useState({ lon: '', lat: '' });    
    const [visible2, setVisible2] = React.useState(false);  //하단 오버플로우 메뉴 (이미지, 보이스)
    const [imageZoomVisible, setImageZoomVisible] = React.useState(false);
    const [guideToken, setGuideToken] = React.useState('');
    const [imageURL, setImageURL] = React.useState('');

    const msgRef = database().ref(`chats/${roomName}/userUnreadCount`);

    const renderAudio = (item) => {
        return (
            <TouchableOpacity
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20,
                }}
                onPress={async () => {
                    const sound = new Sound(  
                        item.currentMessage.audio,
                        '',
                        (error) => {
                            if (error) {
                                console.log('보이스 파일 다운로드 실패');
                            }

                            sound.play((success) => {
                                if (success) {
                                    console.log('재생 성공');
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

            if (ChatDB != undefined) ChatDB.off('value');
        };

    }, []);


    // 채팅방으로 넘어갈 때 기존 채팅 기록들 받아와서 init
    // 채팅 데이터들은 Firebase RTDB 에서 받아온다
    async function ChatRoomInit(id: string) {
        const chat = database().ref('/chats/' + id);

        dispatch(setChatLoadingTrue()) // 로딩 시작
        setChatMessages([]); //로컬 메시지 저장소 초기화
        setChatDB(chat);
        setRoomName(id);

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


    // param으로 받은 채팅 날짜
    const [day, setDay] = React.useState(props.route.params.day);


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
    const onSend = async (messages : IMessage[]) => {
        
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
                onPress={() => {
                    setVisible2(true);
                    Keyboard.dismiss();
                }}>
                {/* visible2 state 에 따라서 바뀜 */}
                {visible2 === true ? (
                    <FastImage
                        style={styles.MenuImage}
                        source={require('../../assets/icon/Chat/Menu_S.png')}
                    />
                ) : (
                    <FastImage
                        style={styles.MenuImage}
                        source={require('../../assets/icon/Chat/Menu_S.png')}
                    />
                )}
            </Pressable>
        );
    };

    // Android용 위치 (Location 전송)
    const LocationMessageAndroid = async() => {

        if(!PermissionsAndroid.RESULTS.GRANTED) return console.log('위치정보 받아오기 실패');

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
                ChatDB.update({
                    messages: [Message, ...chatMessages],
                    guideUnreadCount: database.ServerValue.increment(
                        1,
                    ),
                }),
                sendMessage(push),
            ]);            
        
        },(error) => {       
            console.log(error);
        })
    }

    // iOS용 위치 (Location 전송)
    const LocationMessageIos = () => {
        
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
        });

    }   

    const LocationMessage = () => {

        if (Platform.OS === 'android') {
           LocationMessageAndroid();
        } else {
            LocationMessageIos();
        }

    };

    //입력 창 확인
    const renderInputToolbar = (props : InputToolbarProps) : React.ReactElement => (
        <>
            {
                new Date(day).getFullYear() == new Date().getFullYear() &&
                new Date(day).getMonth() == new Date().getMonth() &&
                new Date(day).getDate() == new Date().getDate() ? 
                (
                    <InputToolbar
                        {...props}
                        containerStyle={styles.ChatInputToolBar}
                    />
                ) 
                : 
                    null
            }
        </>
        
    );



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

        >
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />

            <KeyboardAvoidingView
                style={styles.Container}
                behavior={Platform.OS === 'android' ? 'height' : 'padding'}
                keyboardVerticalOffset={Platform.OS === 'android' ? 30 : -230}
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
                        renderAvatar={() => {return null}}
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
                <ProfileModal guide={guide} ENG={ENG} CHN={CHN} navigation={props.navigation} route={props.route} />

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
                <ChatTopTabBarComponent msgRef={msgRef} ChatDB={ChatDB} props={props} guide={guide} />
                

                {/* 사이드 컨테이너 - 이미지, 음성, 위치 */}
                {visible2 == true ? (
                    <Layout
                        style={styles.SideContainerBack}
                        onTouchEnd={() => setVisible2(false)}>
                        <Layout style={styles.SideContainer}>
                            <Pressable
                                style={styles.SideButton}
                                onPress={() => dispatch(setAudioVisiblityTrue())}>
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
    ChatComposer : {
        alignSelf: 'center',
        marginBottom: -2,
        textDecorationLine: 'none',
        borderBottomWidth: 0,
        textAlignVertical: 'center',
        maxHeight: 90,
    },
    ChatInputToolBar : {
        borderWidth: 1.5,
        borderColor: '#D1D1D1',
        borderRadius: 30,
        margin: 10,
        alignItems: 'center',
    }
});


