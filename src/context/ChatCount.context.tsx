import React from 'react';

export interface ChatCountState {
    ChatRoomID : string | undefined;
    lastUpdated : Date | undefined;
    count : number;
}

const ChatCount = {
    chatCount: [],
    setChatCount: (newState: Array<ChatCountState>) => { newState },
};

export const ChatCountContext = React.createContext(ChatCount);
