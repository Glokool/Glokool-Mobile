import React, { Dispatch } from 'react';
import { Platform, Pressable, StyleSheet, Keyboard } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ActionsProps, Composer, ComposerProps, IMessage, InputToolbar, InputToolbarProps, Send, SendProps } from 'react-native-gifted-chat';
import { useDispatch, useSelector } from 'react-redux';
import { Chat_Exit, Chat_Menu, Send1 } from '../../../../assets/icon/Chat';
import { RootState } from '../../../../model';
import { setKeyboardFalse } from '../../../../model/Chat/Chat.Keyboard.model';
import { setMenuVisiblityFalse, setMenuVisiblityTrue } from '../../../../model/Chat/Chat.UI.model';


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
        <InputToolbar
            {...props}
            primaryStyle={styles.ToolBarContainer}
            containerStyle={styles.ChatInputToolBar}
            renderSend={renderSend}
        />
    )
};

const styles = StyleSheet.create({

    ToolBarContainer: {
        height: 70,
        backgroundColor : '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        width : '100%',
        paddingRight: 10,
    },

    sendButton : {
        position: 'absolute',
        paddingBottom: 0,
        right: 20,
        width: 36,
        height : 36
    },

    ChatInputToolBar : {
        height: 70,
        alignItems: 'center',
    },

});