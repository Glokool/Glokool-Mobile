import React from "react";
import { Layout, Text, } from '@ui-kitten/components'
import { StyleSheet, Pressable } from "react-native";
import { IMessage } from "react-native-gifted-chat";
import Sound from "react-native-sound";
import { Right_Play } from "../../../assets/icon/Chat";
import { useDispatch } from "react-redux";
import { ChatAudioComponent } from ".";

type ChatAudioMessage = {
    currentMessage : {
        audio : string
    }
}

export const renderSound = (message : IMessage & ChatAudioMessage) : React.ReactElement => {

    const PlaySoundMessage = async() => {
        const sound = new Sound(message.currentMessage.audio, '',
            (error) => {
                if (error) {
                    console.log('보이스 파일 다운로드 실패');
                }               
  
                sound.play((success) => {
                    if (success) {
                        console.log('재생 성공');
                        setInterval(sound.getCurrentTime((seconds) => console.log('at ' + seconds)), 1000);
                    } else {
                        console.log('재생 실패');
                    }
                });
            },
        );
    }

    return (
        <Layout style={styles.AudioMessageContainer}>            
            <ChatAudioComponent {...message} />
        </Layout>
    );
};

const styles = StyleSheet.create({
    AudioMessageContainer: {
        backgroundColor: '#00FF0000'
    }
})