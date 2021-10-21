import React, { Dispatch } from 'react';
import { Pressable, StyleSheet, Keyboard } from 'react-native';
import { ActionsProps, Composer, ComposerProps, IMessage, InputToolbar, InputToolbarProps, Send, SendProps } from 'react-native-gifted-chat';
import { Chat_Exit, Chat_Menu, Send1 } from '../../../../assets/icon/Chat';
import { cleanKeyboardComponent } from '../../../../model/Chat/Chat.Keyboard.model';
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

    // Action 버튼 렌더링 및 함수 설정
    const renderActions = (props: ActionsProps): React.ReactElement => {

        const PressActionButton = () => {        
            if(menuVisiblity){
                dispatch(setMenuVisiblityFalse());
            }
            else {
                Keyboard.dismiss();
                setTimeout(() => {
                    dispatch(setMenuVisiblityTrue());
                }, 100)            
            }
        }

        return (
            <Pressable
                style={styles.ActionButton}
                onPress={PressActionButton}
            >
                {menuVisiblity ?
                    <Chat_Exit />
                    :
                    <Chat_Menu />
                }

            </Pressable>
        );
    };

    const renderComposer = (props: ComposerProps): React.ReactElement => {
     
        const TouchStartPlatform = () => {
            dispatch(cleanKeyboardComponent());
            dispatch(setMenuVisiblityFalse());
        }
    
        return (
            <Composer
                {...props}
                textInputProps={{ 
                    onTouchStart: () => TouchStartPlatform(),
                }}
                placeholder="Ask anything about travel"
                textInputStyle={styles.ChatComposer}
                textInputAutoFocus
                multiline={false}
                composerHeight={40}
            />
        )
    };

    return(
        <InputToolbar
            {...props}
            primaryStyle={styles.ToolBarContainer}
            containerStyle={styles.ChatInputToolBar}
            renderSend={renderSend}
            renderComposer={renderComposer}
            renderActions={renderActions}
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
        alignContent : 'center',
        justifyContent: 'center',
    },

    ActionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },

    ChatComposer: {
        backgroundColor: 'white',
        borderRadius: 32,
        paddingLeft: 20,
        paddingRight: 50,
        textDecorationLine: 'none',
        paddingBottom: 0,
        paddingTop: 0,
    },

});