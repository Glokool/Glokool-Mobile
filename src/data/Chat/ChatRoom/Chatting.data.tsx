import React from 'react';
import database, { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import { IMessage } from "react-native-gifted-chat";
import { AuthContext } from '../../../context/AuthContext';
import { filterText } from "../../FilterChat";
import axios from 'axios';


export const MessageOnSend = async (messages: IMessage[], chatMessages: Array<IMessage>, ChatDB: FirebaseDatabaseTypes.Reference): Promise<void> => {

    const { currentUser, setCurrentUser } = React.useContext(AuthContext);

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






    messages[0].messageType = 'message';
    messages[0].createdAt = new Date().getTime();
    messages[0].user.name = currentUser?.displayName;

    if (filterText(messages[0].text)) {

        try {
            ChatDB?.update({
                messages: [messages[0], ...chatMessages],
                guideUnreadCount: database.ServerValue.increment(1),
            }),
                sendMessage(messages[0]);
        }
        



    }
    else {



    }





}