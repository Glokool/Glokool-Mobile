import React from 'react';
import { BubbleProps, IMessage } from 'react-native-gifted-chat';
import { Dispatch } from 'redux';
import { renderLocationMessage } from '..';
import { LocationBubbleMessage } from '../../../../types';
import { EmojiMessages } from './EmojiBubble.component';



export const renderCustomBubble = (props: BubbleProps<IMessage> & LocationBubbleMessage, dispatch : Dispatch<any>) => {

    if (props.currentMessage?.messageType === 'location') {
        return renderLocationMessage(props, dispatch)
    }

    else if (props.currentMessage?.messageType === 'emoji') {
        return EmojiMessages(props)
    }

    else {
        null
    }

}