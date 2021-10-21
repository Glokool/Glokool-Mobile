import React from 'react';
import axios from 'axios';
import { SERVER } from '../../../server.component';
import { IMessage } from "react-native-gifted-chat";
import { AuthContext } from '../../../context/AuthContext';

export const FCMData = async (message: IMessage, ChatRoomID : string): Promise<void> => {

    const { currentUser, setCurrentUser } = React.useContext(AuthContext);
    const currentDate = new Date().getTime();

    const getAccessToken = async () => {
        try {
            const res = await axios.get(`${SERVER}/api/token`);
            setCurrentUser({ ...currentUser, ...res.data });
        } catch (e) {
            console.log('e', e);
        }
    };


    try {
          
        if (currentUser.expiry_date < currentDate) {
            await getAccessToken();
        }

        const data = JSON.stringify({
            message: {
                notification: {
                    title: message.user.name,
                    body: message.text,
                },
                data: {
                    time: new Date(Date.now()).toString(),
                    roomId: ChatRoomID,
                },
                to : ChatRoomID,
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


