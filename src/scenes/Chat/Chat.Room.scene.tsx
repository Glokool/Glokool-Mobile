import React from 'react';
import { ChatComponent } from '../../component/Chat/ChatRoom';
import { ChatRoomSceneProps } from '../../navigation/SceneNavigator/Chat.navigator';

export const ChatRoomScene = (props: ChatRoomSceneProps): React.ReactElement => {

    return (
        <ChatComponent {...props} />
    );
};
