import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  Dimensions
} from 'react-native';
import {
  Icon,
  Layout,
  LayoutElement,
  Spinner,
  MenuItem, 
  OverflowMenu,
  Modal,
  Card,
} from '@ui-kitten/components';
import { ImageIcon, VolumeUpIcon, MapIcon } from '../../component/icon'
import database, { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import { Bubble, InputToolbar, GiftedChat, Composer, Send, SystemMessage, Time, TimeProps } from 'react-native-gifted-chat'
import Sound from 'react-native-sound'
import { AudioRecorder, AudioUtils } from "react-native-audio";
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker/src'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes, faPlay, faStop, faMap } from '@fortawesome/free-solid-svg-icons';
import { SceneRoute } from '../../navigation/app.route';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SERVER } from '../../server.component';
import moment from 'moment';
import Toast from 'react-native-easy-toast';
import {filterText} from '../../data/filterChat';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { ChatRoomScreenProps } from '../../navigation/ScreenNavigator/Chat.navigator';
import { Help, Images, Menu, MyLocation, SendIcon, Voice } from '../../assets/icon/Chat';
import { AngleLeft_Color } from '../../assets/icon/Common';

var ToastRef : any;

export const ChatRoomScreen = (props: ChatRoomScreenProps): LayoutElement => {

    const user = auth().currentUser;

    //채팅 메시지 저장을 위한 정보
    const [ChatDB, setChatDB] = React.useState<FirebaseDatabaseTypes.Reference>();
    const [guide, setGuide] = React.useState({});
    const [guideCheck, setGuideCheck] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [roomName, setRoomName] = React.useState<string>();
    const [chatMessages, setChatMessages] = React.useState([]);
    const [mapvisible, setMapvisible] = React.useState(false);
    const [fechChat, setFetchChat] = React.useState(false);
    const [location, setLocation] = React.useState({
        lon: '',
        lat: ''
    })



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

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            console.log(props.route.params);
            ChatRoomInit(props.route.params.id);
        });
    
        return unsubscribe;
    }, []);

    async function ChatRoomInit(id : string) {

        const chat = database().ref('/chats/' + id);

        setChatMessages([]); //로컬 메시지 저장소 초기화
        setChatDB(chat);
        setRoomName(id);

        chat.on('value', snapshot => {
            if (!snapshot.val()) {
                setChatMessages([]);
                setFetchChat(true);
                return;
            }
            let { messages } = snapshot.val();
            messages = messages.map(node => {
                const message = {};
                message._id = node._id;
                message.text = node.messageType === "message" ? node.text : "";
                message.location = node.messageType === "location" ? node.location : {};
                message.createdAt = node.createdAt;
                message.user = {
                    _id: node.user._id,
                };
                message.image = node.messageType === "image" ? node.image : "";
                message.audio = node.messageType === "audio" ? node.audio : "";
                message.messageType = node.messageType;
                return message;
            });
            
            console.log('안녕 ',messages);
            setChatMessages([...messages]);
            setFetchChat(true);
        });;

    };
   
    const messageIdGenerator = () => {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            let r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }    

    //오디오 녹음 창
    const handleAudio = async() => {
       
        AudioRecorder.requestAuthorization().then((isAuthorised) => {});

        if(startAudio == false){ //오디오 버튼 시작

            setStartAudio(true);
            setAudioMessage(messageIdGenerator);
            
            await AudioRecorder.prepareRecordingAtPath(
                `${AudioUtils.DocumentDirectoryPath}/${audioMessage}test.aac`,
                {
                    SampleRate: 22050,
                    Channels: 1,
                    AudioQuality: "Low",
                    AudioEncoding: "aac",
                    MeteringEnabled: true,
                    IncludeBase64: true,
                    AudioEncodingBitRate: 32000
                }
            );
            await AudioRecorder.startRecording();
        }
        else{// 다시 눌렀을 경우 (녹음 종료후 바로 전달)
            setStartAudio(false);

            const recorder = await AudioRecorder.stopRecording();
            AudioRecorder.onFinished = (data) => {
                if (Platform.OS === 'ios') {
                    var path = data.audioFileURL;
                    setAudioPath(path);
                }

                else {
                    var path = `file://${data.audioFileURL}`
                    setAudioPath(path);
                }

            }
        }
            
    }


    const sendAudio = () => {
        const reference = storage().ref();
        const voiceRef = reference.child(`chat/${roomName}/voice/${audioMessage}.aac`); //xxxxx는 대화방 이름으로 변경

        voiceRef.putFile(audioPath)
            .then(response => {                                
                voiceRef.getDownloadURL()
                    .then((result) => {
                        const message = {
                            _id : audioMessage,
                            createdAt : new Date().getTime(),
                            user: {
                                _id: user?.uid,
                                name: user?.displayName,
                                avatar: user?.photoURL
                            },
                            audio : result,  //파일 경로만 전달
                            messageType : 'audio'
                        };

                        ChatDB.update({messages: [message, ...chatMessages]});
                        setAudioPath('');
                        setAudioVisible(false);
                    })                               
            })
            .catch(err => {
                setAudioPath('');
                setAudioVisible(false);
            })
    }
    //녹음 버튼을 클릭하고 다시 녹음 버튼을 누르지 않고 종료 버튼을 클릭했을 때
    const audioExit = async() => {
        setAudioPath('');
        setAudioVisible(false);
        
        if(startAudio == true){
            setStartAudio(false);
            await AudioRecorder.stopRecording();
        }
    }

    const PressReset = async() =>{
        setAudioPath('');

        if(startAudio == true){
            setStartAudio(false);
            await AudioRecorder.stopRecording();
        }
    }

    const renderAudio = (props) => {            
        return(
            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', padding: 10}} onPress={async() => {
                const sound = new Sound(props.currentMessage.audio, "", error => {
                    if (error){
                        console.log('보이스 파일 다운로드 실패')
                    }

                    //console.log('duration in seconds: ' + sound.getDuration() + ' number of channels: ' + sound.getNumberOfChannels());

                    sound.play((success) => {
                        if (success){
                            console.log('재생 성공')
                        }
                        else{
                            console.log('재생 실패')
                        }
                    });
                })
            }}>
               <FontAwesomeIcon icon={faPlay} size={16}/>
            </TouchableOpacity>
        );
    }

    //이미지 전송을 위한 버튼
    const ImageSend = async() => {
        await launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: true,
              quality: 0.8,
            },
            (response) => {
                if(response){
                    if(response.didCancel == true){
                        //중도 취소시
                    }
                    else {
                        const MessageID = messageIdGenerator();

                        const FileName = response.fileName;
                        var type = response.type

                        const imageType = type.split('/')
                        const reference = storage().ref();
                        
                        const picRef = reference.child(`chats/${roomName}/picture/${MessageID}.${imageType[1]}`).putFile(response.uri); //xxxxx는 대화방 이름으로 변경
                        picRef.on(storage.TaskEvent.STATE_CHANGED,
                            function(snapshot) {
                                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log('Upload is ' + progress + '% done');
                                switch (snapshot.state) {
                                case storage.TaskState.PAUSED:
                                    console.log('Upload is paused');
                                    break;
                                case storage.TaskState.RUNNING:
                                    console.log('Upload is running');
                                    break;
                                }
                            }, function(error) {
                                switch (error.code) {
                                    case 'storage/unauthorized':
                                    break;
                                
                                    case 'storage/canceled':
                                    break;

                                    case 'storage/unknown':
                                    break;
                            }
                            }, function() {
                                picRef.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                                    //업로드 완료
                                    const message = {
                                        _id : MessageID,
                                        createdAt : new Date().getTime(),
                                        user: {
                                            _id: user?.uid
                                        },
                                        image : downloadURL,  //다운로드URL 전달
                                        messageType : 'image'
                                    };

                                    ChatDB.update({messages: [message, ...chatMessages]});
                                });
                        })
                    }
                }
                else{

                }
            })
    }


    /*
        채팅 창 디자인을 위한 컴포넌트
    
    */ 

    const onSend = async(messages = []) => {
        messages[0].messageType = "message";
        messages[0].createdAt = new Date().getTime();

        if(filterText(messages[0].text)){
            await ChatDB.update({messages: [messages[0], ...chatMessages]});
        }
        else{
            ToastRef.show('Please refrain from any content that may offend the other person.' ,1000)
        }
        

        
    }        

    const renderSend = (props) => {
        return(
            <Send {...props} containerStyle={styles.sendButton}>
                <SendIcon />
            </Send>
        );        
    };

    const onRenderSystemMessage = (props) => (
        <SystemMessage
          {...props}
          containerStyle={{backgroundColor:'white'}}
          textStyle={{ color: "#c9c9c9", fontSize: 14, textAlign:'center', padding: 5}}
        />
    );

    
    // 하단 그리드 버튼 (이미지, 소리 전송)
    const ActionButton = () => {
        return(
            <TouchableOpacity style={styles.ActionButton} onPress={() => setVisible2(true)}>
                {(visible2 === true)?
                    <Image style={styles.MenuImage} source={require('../../assets/icon/Chat/Menu_S.png')} />
                :
                    <Image style={styles.MenuImage} source={require('../../assets/icon/Chat/Menu.png')} />
                }
            </TouchableOpacity>
        );
        
    }

    const renderActions = (props) => {
        return(    
            <OverflowMenu
                anchor={ActionButton}
                placement={'top'}
                appearance='noDivider'
                visible={false}
                selectedIndex={selectedIndex2}
                onSelect={onItemSelect2}
                onBackdropPress={() => setVisible2(false)}
                style={{borderWidth: 2, backgroundColor: '#C9C9C9'}}
                >
                <MenuItem title='Voice' accessoryLeft={VolumeUpIcon} onPress={() => {
                    setAudioVisible(true);
                    setVisible2(false);
                }}/>
                <MenuItem title='Image' accessoryLeft={ImageIcon} onPress={async() => {
                    await ImageSend();
                    setVisible2(false);
                }}/>
                <MenuItem title='My location' accessoryLeft={MapIcon} onPress={async() => {
                    await LocationMessage();
                    setVisible2(false);
                }}/>
            </OverflowMenu>
        );
    };


    // 현재 나의 위치 전송
    const LocationMessage = async() => {

        if (Platform.OS === 'android'){
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            
            if (granted === PermissionsAndroid.RESULTS.GRANTED){
                await Geolocation.getCurrentPosition(
                    position => {
                                       
                        const MessageID = messageIdGenerator();
                        const message = {
                            _id : MessageID,
                            createdAt : new Date().getTime(),
                            user: {
                                _id: user?.uid
                            },
                            location: {
                                lat: position.coords.latitude,
                                lon: position.coords.longitude
                            },
                            messageType : 'location'
                        };
        
                        ChatDB.update({messages: [message, ...chatMessages]});
        
                    },
                    error => {
                        console.log("The location could not be loaded because ", error.message),
                        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
                    });
            }
            else{
                ToastRef.show('GPS Permission Denied...', 2000);
            }
        }


        
    }
            
            
    // 대화창 
    const renderBubble = (props) => {
        return(
            <Bubble 
            {...props}
            wrapperStyle={{
                left:{
                    backgroundColor: '#7777FF',
                },
                right: {
                    backgroundColor: 'white',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.20,
                    shadowRadius: 1.41,
                    elevation: 2,
                }
            }}
            textStyle={{
                left : {
                    color: 'white',
                    fontFamily: 'IBMPlexSansKR-Medium'
                },
                right: {
                    color: '#4E4ED8',
                    fontFamily: 'IBMPlexSansKR-Medium'
                }
            }}
            tickStyle={{color: 'black'}}
            style
            />
        );
    }

    const renderTime = (props) => {
        return(
            <Time
                {...props}
                timeTextStyle={{
                    left: {
                        color: '#AEAEAE',
                        fontFamily: 'BrandonGrotesque-Medium'
                    },
                    right: {
                        color: '#AEAEAE',
                        fontFamily: 'BrandonGrotesque-Medium'
                    }
                }}
            />
        )
    }

    const renderCustomBubble = (props) => {
        if(props.currentMessage.messageType == 'location'){
            return(
                <TouchableOpacity>
                    <Text style={{textAlign: 'right', marginTop: 5, marginRight: 10, color: '#8C8C8C', fontFamily: 'BrandonGrotesque-Medium'}}>My Location</Text>
                    <MapView
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={{width: 250, height: 125, margin: 10}}
                            region={{
                                latitude: parseFloat(props.currentMessage.location.lat),
                                longitude: parseFloat(props.currentMessage.location.lon),
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                        }}
                        >
                            <Marker
                                coordinate={{ latitude : parseFloat(props.currentMessage.location.lat) , longitude : parseFloat(props.currentMessage.location.lon) }}
                                title={'My Location'}
                            />

                    </MapView>
                </TouchableOpacity>
            )
        }
    }

    const displayMap = (props) => {

        console.log(props)
        setLocation({
            lon: props.location.lon,
            lat: props.location.lat,            
        })
        setMapvisible(true);
    }

    //입력 창 확인
    const renderInputToolbar = (props) => {
        return(
            <InputToolbar
                {...props}
                containerStyle={{borderWidth: 1.5, borderColor: '#D1D1D1', borderRadius: 30, margin: 10, alignItems: 'center'}}
            />
        );
    }

    //입력창 정렬을 위한 코드
    const renderComposer = (props) => {
        return(
           <Composer
                {...props}
                placeholder='Chat Message'
                textInputStyle={{alignSelf: 'center'}}
                style={{borderRadius: 35}}
           />
        );
    }

    //대화 내용을 로딩하기 전 스피너 작동
    const renderLoading = () => {
            if(!chatMessages.length && !fechChat) {
                return(
                    <Layout style={styles.loading}>
                        <Spinner size='giant'/>
                    </Layout>
                );
            }        
    }

    //가이드 정보를 띄우는 모달
    const PressGuide = () => {
        setGuideVisible(true);
    }

    // 맵 뷰 헤더
    const Header = (props) => (
        <Layout style={{flexDirection: 'row', padding: 20}}>
          <Layout style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', alignItems: 'center'}}>My Location</Text>
          </Layout>
                      
          
          <Layout style={{flex: 1, alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={() => setMapvisible(false)}>
              <FontAwesomeIcon icon={faTimes} size={28}/>
            </TouchableOpacity> 
          </Layout>
          
        </Layout>      
    );
 
    //실제 렌더링
    return (
        <Layout style={{width: '100%', height: '100%'}}>
            <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
            
            <Layout style={styles.Container}>

                <Layout style={styles.mainContainer}>

                    <GiftedChat
                        messages={chatMessages}
                        onSend={messages => onSend(messages)}
                        infiniteScroll={true}
                        createdAt={new Date().getTime()}
                        user={{
                            _id: `${user?.uid}`,
                            name: user?.displayName,
                            avatar: user?.photoURL
                        }}
                        listViewProps={{
                            initialNumToRender: 15
                        }}
                        messagesContainerStyle={{paddingBottom: 50, paddingTop : 80}}
                        alwaysShowSend={true}
                        renderTime={renderTime}
                        renderUsernameOnMessage={false}
                        renderAvatar={null}
                        renderInputToolbar={renderInputToolbar}
                        renderSend={renderSend}
                        renderActions={renderActions}
                        renderBubble={renderBubble}
                        renderLoading={renderLoading}
                        renderComposer={renderComposer}
                        renderSystemMessage={onRenderSystemMessage}
                        renderMessageAudio={renderAudio}
                        renderCustomView={renderCustomBubble}     
                    />

                </Layout>
                

                {/* 녹음기 화면 */}
                <Modal
                    style={{position: 'absolute', top: '80%'}}
                    visible={audioVisible}
                    backdropStyle={styles.backdrop}
                    onBackdropPress={() => audioExit()}>                
                    <Layout style={{backgroundColor: 'white', borderRadius: 30, width: 200, height: 56, flexDirection: 'row'}}>
                        
                        {/*<TouchableOpacity style={styles.audioIconContainer} onPress={async()=> {
                            setAudioVisible(false);
                            if(startAudio) {
                                setStartAudio(false);
                                await AudioRecorder.stopRecording();
                            }
                        }}>
                            <Icon style={styles.icon} fill='white' name='close-outline'/>
                        </TouchableOpacity>*/}
                        
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
                </Modal>


                {/* 가이드 정보를 출력하는 모달 */}
                <Modal
                    visible={guideVisible}
                    backdropStyle={styles.backdrop}
                    onBackdropPress={() => setGuideVisible(false)}
                >                
                    <Layout style={{padding: 20, borderRadius: 15}}>

                        <Layout style={{flex: 1, alignItems: 'flex-end'}}>
                            <TouchableOpacity onPress={() => setGuideVisible(false)}>
                                <FontAwesomeIcon icon={faTimes} size={20}/>
                            </TouchableOpacity>
                        </Layout>

                        <Layout style={{alignItems: 'center', justifyContent: 'center', marginVertical: 10}}>
                            {(guide.avatar != '' || guide.avatar != undefined || guide.avatar != null)?
                                <Image source={{uri: guide.avatar}} style={{width: 165, height: 165, borderRadius: 100}}/>
                            :
                                <Image source={require('../../../assets/profile.jpg')} style={{width: 165, height: 165, borderRadius: 100}}/>
                            }                     
                        </Layout>

                        <Layout style={{alignItems: 'center', justifyContent: 'center', marginVertical: 10}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>{guide.name}</Text>
                        </Layout>

                        <Layout style={{alignItems: 'center', justifyContent: 'center', marginVertical: 10}}>
                            <Text style={{fontSize: 12, color: 'black'}}>{guide.gender} / {moment(guide.birthDate).toDate().getFullYear()}</Text>
                            <Text style={{fontSize: 12, color: 'black'}}></Text>
                        </Layout>


                    </Layout>
                    
                    
                </Modal>

                <Modal
                    visible={mapvisible}
                    backdropStyle={styles.backdrop}
                    onBackdropPress={() => setMapvisible(false)}
                >
                    <Card disabled={true} header={Header}>    

                        <MapView
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={{width: Dimensions.get('window').width * 0.9, height: Dimensions.get('window').height * 0.8}}
                            region={{
                                latitude: parseFloat(location.lat),
                                longitude: parseFloat(location.lon),
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                        }}
                        >
                            <Marker
                                coordinate={{ latitude : parseFloat(location.lat) , longitude : parseFloat(location.lon) }}
                                title={'My Location'}
                            />

                        </MapView>

                    </Card>
                </Modal>

                {/*탭바 디자인*/}
                <Layout style={styles.TabBar}>
                    
                    <TouchableOpacity style={styles.IconContainer} onPress={() => {props.navigation.goBack()}}>
                        <AngleLeft_Color />
                    </TouchableOpacity>
        
                    <Layout style={styles.profileContainer}>
                        <Image source={require('../../assets/profile/profile_01.png')} style={styles.Profile}/>
                        <Text style={styles.title}>{(props.route.params.guide.name === undefined)? `매칭중..` : `${props.route.params.guide.name}`}</Text>
                    </Layout>
                   
                    <TouchableOpacity style={styles.IconContainer} onPress={() => {
                        props.navigation.navigate(SceneRoute.CHAT_HELP, { id: props.route.params.id, guide: { uid : props.route.params.guide.uid, name: props.route.params.guide.name} })
                    }}>
                        <Help />
                    </TouchableOpacity>  
                                            
                </Layout>

                {/* 사이드 컨테이너 - 이미지, 음성, 위치 */}
                {(visible2 == true)?
                    <Layout style={styles.SideContainerBack} onTouchEnd={() => setVisible2(false)}>
                        <Layout style={styles.SideContainer}>
                            
                            <TouchableOpacity style={styles.SideButton} onPress={async() => await LocationMessage()}>
                                <MyLocation />
                                <Text style={styles.SideButtonTxt}>My Location</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.SideButton} onPress={() => setAudioVisible(true)}>
                                <Voice />
                                <Text style={styles.SideButtonTxt}>Voices</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.SideButton} onPress={async() => await ImageSend()}>
                                <Images />
                                <Text style={styles.SideButtonTxt}>Images</Text>
                            </TouchableOpacity>


                        </Layout>
                    </Layout>
                :
                    null
                }

                


                
            </Layout>
            
        </Layout>
    );
};

const styles = StyleSheet.create({
    Container: {    
        flex: 1,
        backgroundColor: 'white',
    },
    TabBar:{        
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
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    ImageContainer: {
        flex : 1,
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
        justifyContent: 'center'
    },
    Profile: {
        width: 40,
        height: 40,
        borderRadius: 100,
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
        position: 'absolute', bottom: 0
    },
    input:{
        flex: 5,
    },
    icon: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainContainer:{
        width: '100%',
        height: '100%'
    },
    inputToolbar: {
        margin: 10
    },
    sendIcon: {
        width: 32,
        height: 32,
    },
    ActionButton: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginLeft: 15,
        marginBottom: 12
    },
    loading: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuContainer: {
        minHeight: 144,
    },
    sendButton: {
        justifyContent: 'center', 
        alignItems: 'center',
        margin : 5
    },
    container: {
        flex: 1,
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
        justifyContent: 'space-evenly'
    },
    MenuImage : {
        width: 30,
        height: 30,
        resizeMode: 'stretch'
    },
    SideContainerBack : {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        justifyContent: 'flex-end',
        top: 0,
        left: 0
    },
    SideContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: 100,
        backgroundColor: '#F8F8F8',
        marginVertical: 80
    },
    SideButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    SideButtonTxt: {
        fontFamily: 'IBMPlexSansKR-Medium',
        color: '#8C8C8C',
        fontSize: 16
    }
});
