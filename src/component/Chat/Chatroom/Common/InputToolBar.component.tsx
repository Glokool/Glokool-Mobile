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

    const renderComposer = (props: ComposerProps): React.ReactElement => {
     
        const TouchStartPlatform = () => {
            if (Platform.OS === 'android') {
                dispatch(setKeyboardFalse());
            } else {
                dispatch(setMenuVisiblityFalse());
            }
        }
    
        return (
            <Composer
                {...props}
                textInputProps={{ autoFocus: true, selectTextOnFocus: false, numberOfLines: 5, onTouchStart: () => TouchStartPlatform()}}
                placeholder="Ask anything about travel"
                textInputStyle={styles.ChatComposer}
            />
        )
    };

    
    // Action 버튼 렌더링 및 함수 설정
    const renderActions = (props: ActionsProps): React.ReactElement => {

        return (
            <Pressable
                style={styles.ActionButton}
                onPress={() => {

                    if (menuVisiblity) {
                        dispatch(setMenuVisiblityFalse());
                    }

                    else {
                        dispatch(setMenuVisiblityTrue());
                        dispatch(setKeyboardFalse());
                        Keyboard.dismiss();
                    }

                }}
            >
                {menuVisiblity ?
                    <Chat_Exit />
                    :
                    <Chat_Menu />
                }

            </Pressable>
        );
    };

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
                        renderComposer={renderComposer}
                        renderActions={renderActions}
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
        backgroundColor : '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        width : '100%',
        paddingRight: 10
    },

    sendButton : {
        position: 'absolute',
        paddingBottom: 2,
        right: 20,
        width: 36,
        height : 36
    },


    ChatInputToolBar : {
        height: 70,
        alignItems: 'center',
    },

    ChatComposer: {
        alignSelf: 'center',
        textDecorationLine: 'none',
        borderBottomWidth: 0,
        textAlignVertical: 'center',
        height: 70,
        backgroundColor: 'white',
        borderRadius: 32,
        paddingLeft: 25,
    },

    ActionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },

    MenuImage: {
        width: 20,
        height: 20,
        resizeMode: 'stretch',
    },

});