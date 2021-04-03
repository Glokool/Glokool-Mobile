import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  Alert,
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
  Button
} from '@ui-kitten/components';
import { ImageIcon, VolumeUpIcon, MapIcon } from '../../component/icon'
import { GuideChatScreenProps } from '../../navigation/guide.navigator';
import database from '@react-native-firebase/database';
import { Bubble, InputToolbar, GiftedChat, Composer, Send, SystemMessage } from 'react-native-gifted-chat'
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

var ToastRef : any;

export const GuideChatScreen = (props: GuideChatScreenProps): LayoutElement => {

    //채팅 메시지 저장을 위한 정보
    const [ChatDB, setChatDB] = React.useState();
    const [guide, setGuide] = React.useState({});
    const [guideCheck, setGuideCheck] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [roomName, setRoomName] = React.useState();
    const [chatMessages, setChatMessages] = React.useState([]);
    const [mapvisible, setMapvisible] = React.useState(false);
    const [fechChat, setFetchChat] = React.useState(false);
    const [location, setLocation] = React.useState({
        lon: '',
        lat: ''
    })
    const user = auth().currentUser;


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


    //componentwillmount 대신 사용
    React.useEffect(() => {
        async function ChatRoomInit() {
            
            if (Platform.OS === 'android'){
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                      title: "Glokool Guide Location Permission",
                      message:
                        "If you want to share your current location with the guide, grant permission",
                      buttonNeutral: "Ask Me Later",
                      buttonNegative: "Cancel",
                      buttonPositive: "OK"
                    }
                );                
            }
            else {
                
            }

            await AsyncStorage.getItem('code').then((result) => {

                const chat = database().ref('/chats/' + result);
                setChatDB(chat);
                setRoomName(result);
    
                axios.get(SERVER + '/api/user/tour/chat/' + result)
    
                    .then((response) => {
                        const docRef = firestore().collection('Guides').doc(response.data.guideUID).get()
                            .then(function(doc) {
                                                            
                                if(doc._data == undefined){
                                    setGuideCheck(true);                                
                                }                            
                                else{
                                    setGuide(doc._data);
                                    setGuideCheck(false);
                                    ToastRef.show('Please refrain from any inappropriate or offensive conversations.', 2000);
                                }
                                
                            })
                            .catch((err) => {
                                ToastRef.show('Guide not yet assigned :(', 2000);
                                props.navigation.goBack();
                            })
                    });                  
                
            });
            
            await AsyncStorage.getItem('title').then((result)=> {
                setTitle(result);
            });
        }

        ChatRoomInit();

        return () => {
            AsyncStorage.setItem('code', null);
            AsyncStorage.setItem('id', null);
            AsyncStorage.setItem('title', null);
        };

        

        

        
    }, []);

    React.useEffect(() => {
        // 가이드 정보 받아오기
        
        if(ChatDB == undefined){
          //아직 초기화 되지 않은 값임
        }
        else{
          //Chat 값이 바뀌었을 경우 실행
          //채팅방 전환 작업 실행
          
    
          setChatMessages([]); //로컬 메시지 저장소 초기화
    
          ChatDB.on('value', snapshot => {
            if (!snapshot.val()) {
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
               
            setChatMessages([...messages])
          });;
        }
    
      }, [ChatDB]);
    
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

    //상단 컴포넌트를 위한 함수
    //상단 탭바 뒤로 버튼
    const PressBack = () => {
        props.navigation.goBack()
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
              <Icon
                name="paper-plane-outline"
                fill='#FFC043'
                style={styles.sendIcon}
              />
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
                <Icon style={styles.icon} fill='#FFC043' name='grid-outline'/>
            </TouchableOpacity>
        );
        
    }

    const renderActions = (props) => {
        return(    
            <OverflowMenu
                anchor={ActionButton}
                placement={'top'}
                appearance='noDivider'
                visible={visible2}
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

        ToastRef.show('Turning on GPS....', 2000);

        Geolocation.getCurrentPosition(
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
            error => Alert.alert('Error', JSON.stringify(error)),
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
            );        
    }
            
            
    // 대화창 
    const renderBubble = (props) => {
        return(
            <Bubble 
            {...props}
            wrapperStyle={{
                left:{
                    backgroundColor: '#F5F5F5',
                    fontColor: 'black',
                    fontWeight: 'bold'
                },
                right: {
                    backgroundColor: '#FFC043',
                    fontWeight: 'bold'
                }
            }}
            />
        );
    }

    const renderCustomBubble = (props) => {
        if(props.currentMessage.messageType == 'location'){
            return(
                <TouchableOpacity onPress={() => {displayMap(props.currentMessage)}}>
                    <Layout style={{backgroundColor: '#00FF0000', margin: 'auto', flexDirection: 'row', padding: 5}}>
                        <FontAwesomeIcon icon={faMap} size={20} style={{color: 'white', marginHorizontal: 5}}/>
                        <Text style={{color: 'white'}}>My Location</Text>
                    </Layout>
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
                containerStyle={{borderWidth: 0.5, borderColor: '#C9C9C9', borderRadius: 15, margin: 10}}
            />
        );
    }

    //입력창 정렬을 위한 코드
    const renderComposer = (props) => {
        return(
           <Composer
                {...props}
                placeholder='Chat Message'
                textInputStyle={{marginVertical: 2, padding: 10}}
                style={{}}
           />
        );
    }

    //대화 내용을 로딩하기 전 스피너 작동
    const renderLoading = () => {
        if(!chatMessages.length && !fechChat) {
            return(
                <Layout style={styles.loading}>
                    <Spinner status='warning' size='giant'/>
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
        (guideCheck) ? (
            //로그인 되지 않았을 경우
            <React.Fragment>
              <Layout style={styles.container}>
              <Modal
                visible={guideCheck}
                backdropStyle={styles.backdrop}
              >
                <Card disabled={true}>
                  <Text style={{marginVertical: 30}}>Guide not yet assigned :(</Text>
                  
                  <Layout style={{flexDirection: 'row'}}>
                    <Layout style={{margin: 15, flex: 1}}>
                      <Button style={styles.cancelButton} appearance='outline' onPress={() => {
                        props.navigation.goBack();
                        setGuideCheck(true);
                      }}>
                        BACK
                      </Button>
                    </Layout>
                   
                    
                  </Layout>
                  
                </Card>
              </Modal>
      
              </Layout>
            </React.Fragment>
          )
          :
        (
        <React.Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
        <Layout style={styles.Container}>

            {/*탭바 디자인*/}
            <Layout style={styles.TabBar}>
                <TouchableOpacity style={styles.IconContainer} onPress={PressBack}>
                    <Icon style={styles.icon} fill='black' name='arrow-back-outline'/>
                </TouchableOpacity>
     
                <Layout style={{flex: 5, flexDirection: 'row'}}>
                    <Layout style={styles.ImageContainer}>
                        <TouchableOpacity onPress={PressGuide}>
                        {(guide.avatar != '' || guide.avatar != undefined || guide.avatar != null)?
                            <Image source={{uri: guide.avatar}} style={styles.Profile}/>
                        :
                            <Image source={require('../../../assets/profile.jpg')} style={styles.Profile}/>
                        }
                        </TouchableOpacity>
                    </Layout>

                    <Layout style={styles.TitleContainer}>
                        <TouchableOpacity onPress={PressGuide}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.title}>{guide.name}</Text>
                        </TouchableOpacity>
                    </Layout>   
                </Layout>

                
                <TouchableOpacity style={styles.IconContainer} onPress={() => props.navigation.navigate(SceneRoute.GUIDE_ERROR, guide)}>
                    <Icon style={styles.icon} fill='black' name='info-outline'/>
                </TouchableOpacity>  
                                          
            </Layout>

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
                    alwaysShowSend={true}
                    renderUsernameOnMessage={false}
                    renderInputToolbar={renderInputToolbar}
                    renderSend={renderSend}
                    renderActions={renderActions}
                    renderBubble={renderBubble}
                    renderLoading={renderLoading}
                    renderComposer={renderComposer}
                    renderSystemMessage={onRenderSystemMessage}
                    renderMessageAudio={renderAudio}
                    renderAvatar={null}
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

            


            
        </Layout>
        

        <Toast ref={(toast) => ToastRef = toast} style={{backgroundColor:'#C9C9C9', margin : 10}} textStyle={{color:'black', textAlign: 'center'}} position={'center'}/>
        </React.Fragment>
        )
    );
};

const styles = StyleSheet.create({
    Container: {    
        flex: 1,
        backgroundColor: 'white',
    },
    TabBar:{        
        flexDirection: 'row',
      },
    MainContainer: {
        flex: 10,
        backgroundColor : '#FFC043',
    },
    IconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
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
        margin: 12,
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
        marginHorizontal: 5,
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
        flex: 5,
    },
    inputToolbar: {
        margin: 10
    },
    sendIcon: {
        width: 32,
        height: 32,
    },
    ActionButton: {
        marginLeft: 15,
        marginRight: 5,
        marginVertical: 8,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuContainer: {
        minHeight: 144,
    },
    sendButton: {
        justifyContent: 'center', 
        alignItems: 'center',
        borderWidth: 0,
        marginLeft: 15,
        marginRight: 5,
        marginBottom: 1,
        width: 40
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
});
