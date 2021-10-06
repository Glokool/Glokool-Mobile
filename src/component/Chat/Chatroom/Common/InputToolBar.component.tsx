import React from 'react';
import { StyleSheet } from 'react-native';
import { InputToolbar, InputToolbarProps } from 'react-native-gifted-chat';


//입력 창 확인
export const renderInputToolbar = (props : InputToolbarProps, day : Date) : React.ReactElement => {

    return(
        <>
            {
                new Date(day).getFullYear() == new Date().getFullYear() &&
                new Date(day).getMonth() == new Date().getMonth() &&
                new Date(day).getDate() == new Date().getDate() ? 
                (
                    <InputToolbar
                        {...props}
                        containerStyle={styles.ChatInputToolBar}
                    />
                ) 
                : 
                    null
            }
        </>
    )
};

const styles = StyleSheet.create({


    ChatInputToolBar : {
        borderWidth: 1.5,
        borderColor: '#D1D1D1',
        borderRadius: 30,
        margin: 10,
        alignItems: 'center',
    },

});