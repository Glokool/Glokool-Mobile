import React from 'react';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../model';
import { Layout } from '@ui-kitten/components';
import { windowWidth } from '../../../../Design.component';
import { setEmojiKeyboardFalse } from '../../../../model/Chat/Chat.Keyboard.model';
import FastImage from 'react-native-fast-image';
import { GREAT, THANK_YOU, QUESTION, WOW, YAMMY, UH_OH, HELP_ME, HI, GOOD_BYE } from '../../../../assets/image/Chat/Emoji'
import { AuthContext } from '../../../../context/AuthContext';
import { IMessage } from 'react-native-gifted-chat';

export const EmojiKeyboardComponent = (props : any) : React.ReactElement => {

    const ChatDB = props.ChatDB;
    const ChatRoomID = props.ChatRoomID;
    const { currentUser , setCurrentUser } = React.useContext(AuthContext);

    const dispatch = useDispatch();
    const keyboardHeight = useSelector((state : RootState) => state.ChatKeyboardModel.keyboardHeight);
    const emojiKeyboardVisiblity = useSelector((state : RootState) => state.ChatKeyboardModel.emojiKeyboardVisiblity);

    const emoji = [GREAT, THANK_YOU, QUESTION, WOW, YAMMY, UH_OH, HELP_ME, HI, GOOD_BYE];
    const data = ['GREAT', 'THANK_YOU', 'QUESTION', 'WOW', 'YAMMY', 'UH_OH', 'HELP_ME', 'HI', 'GOOD_BYE'];

    
    const FCMSend = async(message : IMessage, messageType : string) => {
          
        const token = await auth().currentUser?.getIdToken();
        const url = 'https://fcm.googleapis.com/v1/projects/glokool-a7604/messages:send';

        const data = JSON.stringify({
            message: {
                notification: {
                    title: message.user.name,
                    body: messageType,
                },
                data: {
                    time: new Date(Date.now()).toString(),
                    roomId: ChatRoomID,
                },
                topic : ChatRoomID,
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
                Authorization: `Bearer ${token}`,
            }
        };

    
        axios.post(url , data, options).catch((e) => {
            if (e.response) {
                console.log(e.response.data);
            }
        });
        
    }


    const PressIcon = async(icon : string) => {

        dispatch(setEmojiKeyboardFalse());

        const newMessage = ChatDB.push();

        let message = {
            _id : newMessage.key,
            user : {
                _id : currentUser?.uid,
                name : currentUser?.displayName
            },
            messageType : 'emoji',
            createdAt : new Date().getTime(),
            location : '',
            image : '',
            audio : '',
            text : '',
            emoji : icon
        };

        newMessage?.set(message, (e) => {
            console.log('이미지 메시지 전송 실패 : ', e);
        });

        FCMSend(message, icon);
        
    }


    const renderItem = ( item  : { item : string, index : number}) : React.ReactElement => {


        return(
            <Pressable style={styles.EmojiContainer} onPress={() => {PressIcon(item.item)}}>
                <FastImage source={emoji[item.index]} style={styles.Emoji} />
            </Pressable>
        )
    }

   

    return(
        <>
            {(emojiKeyboardVisiblity)? 
                <Layout style={{ justifyContent: 'center', backgroundColor: '#F8F8F8', height: keyboardHeight, minHeight: 180}}>
                    <FlatList
                        style={styles.EmojiKeyboardContainer}
                        contentContainerStyle={styles.EmojiKeyboardInnerContainer}
                        columnWrapperStyle={{justifyContent: 'space-between'}}
                        data={data}
                        renderItem={renderItem}
                        numColumns={3}
                    />
                </Layout>
            :
                null
            }
        </>
    )
}

const styles = StyleSheet.create({
    EmojiKeyboardContainer : {
        width: '100%',
    },

    EmojiKeyboardInnerContainer: {
        paddingBottom: 20,
        paddingHorizontal: 20
    },

    EmojiContainer: {   
        width : windowWidth * 0.28,
        height : windowWidth * 0.28,
        borderRadius: 10,
        marginBottom: 10
    },

    Emoji : {
        width : windowWidth * 0.28,
        height : windowWidth * 0.28,
    }
})