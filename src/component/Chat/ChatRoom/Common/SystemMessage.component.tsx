import React from 'react';
import { StyleSheet } from 'react-native';
import { IMessage, SystemMessage, SystemMessageProps } from 'react-native-gifted-chat';



export const renderSystemMessage = (props : SystemMessageProps<IMessage>) : React.ReactElement => {

    return (
        <SystemMessage
            {...props}
            containerStyle={{ backgroundColor: 'white' }}
            textStyle={styles.SystemMessageText}
        />
    )

}



const styles = StyleSheet.create({

    SystemMessageText : {
        color: '#c9c9c9',
        fontSize: 14,
        textAlign: 'center',
        padding: 5,
    }

})