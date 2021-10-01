import React from 'react';

const chat = {
    onChat: false,
    setChatIcon: (newState : boolean) => {newState},
};

export const ChatContext = React.createContext(chat);
