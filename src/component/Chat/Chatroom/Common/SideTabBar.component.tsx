import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../model';
import { Layout, Text } from '@ui-kitten/components';
import { setAudioVisiblityTrue } from '../../../../model/Chat/Chat.UI.model';
import { Images, Record, Camera, MyLocation } from '../../../../assets/icon/Chat';


export const SideTabBarComponent = (props) : React.ReactElement => {

    const menuVisiblity = useSelector((state : RootState) => state.ChatUIModel.menuVisiblity);
    const keyboardHeight = useSelector((state : RootState) => state.ChatKeyboardModel.keyboardHeight);

    const dispatch = useDispatch();

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



    return(
        <>
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
        </>
    )
}

const styles = StyleSheet.create({    
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
})