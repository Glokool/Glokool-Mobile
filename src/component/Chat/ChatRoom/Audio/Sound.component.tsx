import React from "react";
import { Layout } from '@ui-kitten/components'
import { StyleSheet } from "react-native";
import { IMessage } from "react-native-gifted-chat";
import { ChatAudioComponent } from "..";

type ChatAudioMessage = {
    currentMessage : {
        audio : string
    }
}

export const renderSound = (message : IMessage & ChatAudioMessage, guide : any) : React.ReactElement => {

    return (
        <Layout style={styles.AudioMessageContainer}>            
            <ChatAudioComponent message={message} guide={guide.uid}/>
        </Layout>
    );
};

const styles = StyleSheet.create({
    AudioMessageContainer: {
        backgroundColor: '#00FF0000'
    }
})