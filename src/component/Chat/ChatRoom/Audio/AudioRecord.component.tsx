import React, { useRef, useState } from 'react';
import auth from '@react-native-firebase/auth';
import {
    StyleSheet,
    Text,
    Platform,
    Dimensions,
    Pressable,
} from 'react-native';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import storage from '@react-native-firebase/storage';

import {
    Layout,
    Modal,
} from '@ui-kitten/components';
import {
    Chat_Voice_End,
    Chat_Voice_Start,
    Chat_Voice_Stop,
} from '../../../../assets/icon/Chat';
import { Exit_C } from '../../../../assets/icon/Common';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../model';
import { countAudioDuration, resetAudioDuration } from '../../../../model/Chat/Chat.Audio.model';
import { setAudioVisiblityFalse } from '../../../../model/Chat/Chat.UI.model';
import { AuthContext } from '../../../../context/AuthContext';
import { messageIdGenerator } from '../../../Common/MessageIdGenerator';
import axios from 'axios';
import { IMessage } from 'react-native-gifted-chat';
import { SERVER } from '../../../../server.component';
import moment from 'moment';


const WindowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const AudioRecordComponent = (props : any) => {
    
    const ChatDB = props.ChatDB;
    const { currentUser, setCurrentUser } = React.useContext(AuthContext);

    const audioVisiblity = useSelector((state : RootState) => state.ChatUIModel.audioVisiblity);
    const duration = useSelector((state: RootState) => state.AudioDurationModel.duration);
    const dispatch = useDispatch();

    const [startAudio, setStartAudio] = useState(false);
    const [audioPath, setAudioPath] = useState('');
    const increment = useRef<NodeJS.Timeout | any>();

    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    const getAccessToken = async () => {
        try {
            const res = await axios.get(`${SERVER}/token`);
            setCurrentUser({ ...currentUser, ...res.data });
        } catch (e) {
            console.log('e', e);
        }
    };


    const FCMSend = async(message : IMessage, messageType : string) => {
          
        const url = 'https://fcm.googleapis.com/v1/projects/glokool-a7604/messages:send';
        const current = new Date().getTime();

        if (currentUser.expiry_date < current) {
            await getAccessToken();
        }

        const data = JSON.stringify({
            message: {
                notification: {
                    title: message.user.name,
                    body: messageType,
                },
                data: {
                    time: new Date(Date.now()).toString(),
                    roomId: props.roomName,
                },
                topic : props.roomName,
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

    
        axios.post(url , data, options).catch((e) => {
            if (e.response) {
                console.log(e.response.data);
            }
        });
        
    }

    const formatTime = () => {
        const getSeconds = `0${(duration % 60)}`.slice(-2)
        const minutes = `0${Math.floor(duration / 60)}`
        const getMinutes = `${Number(minutes) % 60}`.slice(-2)

        return `${getMinutes}:${getSeconds}`
    }

    const audioStopwatchStart = () => {
        setIsActive(true)
        setIsPaused(true)
        increment.current = setInterval(() => {
            dispatch(countAudioDuration());
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
        dispatch(resetAudioDuration());
    }

    const handleAudio = async () => {
        
        AudioRecorder.requestAuthorization().then(async(isAuthorised) => { 
            if(isAuthorised) { 
                if (startAudio == false) {
                    //오디오 버튼 시작
        
                    setStartAudio(true);
        
                    await AudioRecorder.prepareRecordingAtPath(
                        `${AudioUtils.DocumentDirectoryPath}/${messageIdGenerator()}.aac`,
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
            }
            else { console.log('아니') }
        });

        
    };

    const sendAudio = () => {

        const travelDate = props.travelDate;
        const newMessage = ChatDB.push();
        const reference = storage().ref();
        const voiceRef = reference.child(`chats/${travelDate}/${props.roomName}/voice/${newMessage.key}.aac`,); //xxxxx는 대화방 이름으로 변경

        voiceRef.putFile(audioPath) 
            .then((response) => {

                voiceRef.getDownloadURL().then((result) => {

                    let message = {
                        _id : newMessage.key,
                        user : {
                            _id : currentUser?.uid,
                            name : currentUser?.displayName,
                            avatar : currentUser.photoURL
                        },
                        messageType : 'audio',
                        createdAt : new Date().getTime(),
                        location : '',
                        image : '',
                        audio : result,
                        text : ''
                    };
        
                    newMessage?.set(message, (e) => {
                        console.log('이미지 메시지 전송 실패 : ', e)
                    });

                    FCMSend(message, "Sent a Voice");

                    setAudioPath('');
                    dispatch(setAudioVisiblityFalse());
                });
            })
            .catch((err) => {
                setAudioPath('');
                dispatch(setAudioVisiblityFalse());
            });
        audioStopwatchReset();

    };


    //녹음 버튼을 클릭하고 다시 녹음 버튼을 누르지 않고 종료 버튼을 클릭했을 때
    const audioExit = async () => {
        audioStopwatchReset();
        setAudioPath('');
        dispatch(setAudioVisiblityFalse());

        if (startAudio == true) {
            setStartAudio(false);
            await AudioRecorder.stopRecording();
        }
    };

    return (
        <Modal style={styles.SideContainerBack} visible={audioVisiblity}>
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
        </Modal>
    )

}

const styles = StyleSheet.create({
    SideContainerBack: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        justifyContent: 'flex-end',
        top: 0,
        left: 0,
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
        fontFamily: 'Pretendard-SemiBold',
        color: '#D2D2D2',
        fontSize: 16,
        textAlign: 'center',
    },
    RecordingStatusTxt_ing: {
        fontFamily: 'Pretendard-SemiBold',
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
        fontFamily: 'Pretendard-Medium',
        fontSize: 16,
        marginHorizontal: 20,
        marginVertical: 5,
        color: 'white',
        textAlign: 'center',
    },
})