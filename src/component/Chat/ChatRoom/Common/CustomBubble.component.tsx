import React from 'react';
import { BubbleProps, IMessage } from 'react-native-gifted-chat';
import { Dispatch } from 'redux';
import { renderLocationMessage } from '..';
import { LocationBubbleMessage } from '../../../../types';



export const renderCustomBubble = (props: BubbleProps<IMessage> & LocationBubbleMessage, dispatch : Dispatch<any>) => {

    if (props.currentMessage?.messageType === 'location') {
        return renderLocationMessage(props, dispatch)
    }

    else if (props.currentMessage?.messageType === 'icon') {
        return null
    }    

}