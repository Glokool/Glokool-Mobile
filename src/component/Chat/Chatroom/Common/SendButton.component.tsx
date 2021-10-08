import React from 'react';
import { StyleSheet } from 'react-native';
import { IMessage, Send, SendProps } from 'react-native-gifted-chat';

import { SendIcon } from '../../../../assets/icon/Chat';


export const renderSend = (props : SendProps<IMessage>) => {
    return (
        <Send {...props} containerStyle={styles.sendButton}>
            <SendIcon />
        </Send>
    );
};

const styles = StyleSheet.create({
    sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width : 40,
        height : 40,
        margin : 10,
    }
})