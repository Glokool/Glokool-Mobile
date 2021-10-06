
import React from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import storage from '@react-native-firebase/storage';
import { IMessage, MessageImageProps, MessageVideoProps } from 'react-native-gifted-chat';
import { launchCamera } from 'react-native-image-picker/src';
import { messageIdGenerator } from '../../Common/MessageIdGenerator';
import { requestCameraPermission } from '../../permission.component';
import { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import { AuthContext } from '../../../context/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../../model';

const { currentUser, setCurrentUser } = React.useContext(AuthContext);
const guideToken = useSelector((state : RootState) => state.ChatDataModel.guideUID);
const ChatDB = useSelector((state : RootState) => state.ChatDataModel.DB);

/* 채팅창 이미지 컴포넌트 */
const ChatImage = ({ imgUrl }) => {
    return (
        <Pressable onPress={() => }>
            <FastImage
                source={{ uri: imgUrl }}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.ChatImageContainer}
            />
        </Pressable>
    );
};

/* gifted chat 이미지 렌더링 */
const renderImage = (props : Readonly<MessageImageProps<IMessage>>) => {

    const imageURL = props.currentMessage?.image;

    if (typeof imageURL === 'string') {
        return <ChatImage key={0} imgUrl={imageURL} />;
    } else {
        return (
            <>
                {imageURL.map((url: string, index: number) => (
                    <ChatImage key={index} imgUrl={url} />
                ))}
            </>
        );
    }
};


export const takePhoto = async() => {
  

    try {
        const granted = await requestCameraPermission();
        const CameraOptions = {
            mediaType: 'photo',
            includeBase64: true,
            quality: 0.5,
        };

        if (!granted) {
            throw Error('Take Photo Error : Camera permission denied');
        }

        launchCamera(CameraOptions,
            (response) => {

                if (response) {
                    
                    if (response.didCancel == true) {
                        return null
                    } 
                    
                    else {
                        const MessageID = messageIdGenerator();

                        const FileName = response.fileName;
                        var type = response.type;

                        const imageType = type?.split('/');
                        const reference = storage().ref();
                        const picRef = reference.child(`chats/${roomName}/picture/${MessageID}.${imageType[1]}`).putFile(response.uri);

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
                                picRef.snapshot?.ref.getDownloadURL()
                                    .then(function (downloadURL : string) {
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

    

//이미지 전송을 위한 버튼
export const ImageSend = async () => {
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

const styles = StyleSheet.create({

    ChatImageContainer: {
        width: 150,
        height: 100,
        borderRadius: 10,
        margin: 3,
    }

})
