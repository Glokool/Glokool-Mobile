import { Layout } from '@ui-kitten/components';
import React, { Dispatch } from 'react';
import { Pressable, StyleSheet, Keyboard } from 'react-native';
import { ActionsProps, Composer, ComposerProps, IMessage, InputToolbar, InputToolbarProps, Send, SendProps } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import { Chat_Exit, Chat_Menu, Send1 } from '../../../../assets/icon/Chat';
import { Emoji_Keyboard_Selected, Emoji_Keyboard_UnSelected } from '../../../../assets/icon/Chat/Emoji';
import { RootState } from '../../../../model';
import { cleanKeyboardComponent, setEmojiKeyboardFalse, setEmojiKeyboardTrue } from '../../../../model/Chat/Chat.Keyboard.model';
import { setMenuVisiblityFalse, setMenuVisiblityTrue } from '../../../../model/Chat/Chat.UI.model';





//입력 창 확인
export const renderInputToolbar = (props : InputToolbarProps, day : Date, dispatch : Dispatch<any>, menuVisiblity : boolean, emojiKeyboardVisiblity : boolean) : React.ReactElement => {
  
    const renderSend = (props : SendProps<IMessage>) => {
        return (
            <Layout style={styles.ButtonContainer}>
                {(emojiKeyboardVisiblity)?
                    <Pressable onPress={() => dispatch(setEmojiKeyboardFalse())}>
                        <Emoji_Keyboard_Selected />
                    </Pressable>
                    
                :
                    <Pressable onPress={() => {
                            Keyboard.dismiss();
                            dispatch(setMenuVisiblityFalse())
                            dispatch(setEmojiKeyboardTrue())                        
                        }}>
                        <Emoji_Keyboard_UnSelected/>
                    </Pressable>
                    
                }
                <Send {...props}>
                    <Send1 />
                </Send>
            </Layout>

        )
    }

    // Action 버튼 렌더링 및 함수 설정
    const renderActions = (props: ActionsProps): React.ReactElement => {

        const PressActionButton = () => {        
            if(menuVisiblity){
                dispatch(setMenuVisiblityFalse());
            
            }
            else {
                dispatch(setEmojiKeyboardFalse());
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
            dispatch(setEmojiKeyboardFalse());
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

    ButtonContainer: {
        position : 'absolute',
        right: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#00FF0000',
        width : 70
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
        paddingRight: 90,
        textDecorationLine: 'none',
        paddingBottom: 0,
        paddingTop: 0,
    },

});