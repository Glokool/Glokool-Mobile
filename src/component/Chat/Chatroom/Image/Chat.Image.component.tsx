
import { Layout, Modal, Text } from '@ui-kitten/components';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { IMessage, MessageImageProps } from 'react-native-gifted-chat';
import { useDispatch, useSelector } from 'react-redux';
import { windowHeight, windowWidth } from '../../../../Design.component';
import { RootState } from '../../../../model';
import { setImageURL, setImageVisiblityFalse, setImageVisiblityTrue } from '../../../../model/Chat/Chat.UI.model';



/* 채팅창 이미지 컴포넌트 */
export const ChatImage = ({ imgUrl } : any) : React.ReactElement => {

    const dispatch = useDispatch();

    const imageZoom = (imageUrl : string ) : void => {
        dispatch(setImageVisiblityTrue());
        dispatch(setImageURL(imageUrl));
    }

    return (
        <Pressable onPress={() => imageZoom(imgUrl)}>
            <FastImage
                source={{ uri: imgUrl }}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.ChatImageContainer}
            />
        </Pressable>
    );
};

/* gifted chat 이미지 렌더링 */
export const renderImage = (props : Readonly<MessageImageProps<IMessage>>) => {

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

export const ImageModal = (props : any) : React.ReactElement => {

    const dispatch = useDispatch();
    const imageVisiblity = useSelector((state : RootState) => state.ChatUIModel.imageVisiblity);
    const imageURL = useSelector((state : RootState) => state.ChatUIModel.imageUrl);

    return (
        <Modal
            visible={imageVisiblity}
            backdropStyle={styles.ModalBackgroundContainer}>
            <Layout style={styles.ModalContainer}>
                <Pressable
                    style={styles.ImageModalButtonContainer}
                    onPress={() => dispatch(setImageVisiblityFalse())}>
                    <Text style={styles.ImageModalButton}>X</Text>
                </Pressable>
                <FastImage
                    source={{ uri: imageURL }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={{
                        width: windowWidth,
                        height: Math.round((windowHeight * 9) / 16),
                    }}
                />
            </Layout>
        </Modal>
    );
}


const styles = StyleSheet.create({

    ChatImageContainer: {
        width: 150,
        height: 100,
        borderRadius: 10,
        margin: 3,
    },

    ImageModalButtonContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
    },

    ImageModalButton : {
        color: '#f1f1f1',
        fontSize: 30,
        fontWeight: 'bold',
    },

    ModalContainer: {
        width: windowWidth,
        height: windowHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 10)',
    },

    ModalBackgroundContainer: {
        backgroundColor: 'rgba(0, 0, 0, 10)',
    }



})
