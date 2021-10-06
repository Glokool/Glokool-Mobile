import React from 'react';
import { StyleSheet } from 'react-native';
import { Composer, ComposerProps } from 'react-native-gifted-chat';


export const renderComposer = (props : ComposerProps) : React.ReactElement => {

    return (
        <Composer
            {...props}
            textInputProps={{ autoFocus: true, selectTextOnFocus: false, numberOfLines: 5 }}
            placeholder="Chat Message"
            textInputStyle={styles.ChatComposer}
        />
    )
};


const styles = StyleSheet.create({
    ChatComposer : {
        alignSelf: 'center',
        marginBottom: -2,
        textDecorationLine: 'none',
        borderBottomWidth: 0,
        textAlignVertical: 'center',
        maxHeight: 90,
    },
});