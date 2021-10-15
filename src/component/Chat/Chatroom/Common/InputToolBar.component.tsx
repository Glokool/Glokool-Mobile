import React, { Dispatch } from 'react';
import { StyleSheet } from 'react-native';
import {  IMessage, InputToolbar, InputToolbarProps, Send, SendProps } from 'react-native-gifted-chat';
import { Send1 } from '../../../../assets/icon/Chat';


//입력 창 확인
export const renderInputToolbar = (props : InputToolbarProps, day : Date, dispatch : Dispatch<any>, menuVisiblity : boolean) : React.ReactElement => {


    const renderSend = (props : SendProps<IMessage>) => {

        return (
            <Send {...props} containerStyle={styles.sendButton}>
                <Send1 />
            </Send>
        )

    }

    return(
        <>
            {
                new Date(day).getFullYear() == new Date().getFullYear() &&
                new Date(day).getMonth() == new Date().getMonth() &&
                new Date(day).getDate() == new Date().getDate() ? 
                (
                    <InputToolbar
                        {...props}
                        primaryStyle={styles.ToolBarContainer}
                        containerStyle={styles.ChatInputToolBar}
                        renderSend={renderSend}
                    />
                ) 
                : 
                    null
            }
        </>
    )
};

const styles = StyleSheet.create({

    ToolBarContainer: {
        height: 70,
        paddingRight: 15,
        backgroundColor : '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        width : '100%',
    },

    sendButton : {
        width: 40,
        height : 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 20
    },


    ChatInputToolBar : {
        height: 70,
        alignItems: 'center',
    },

});