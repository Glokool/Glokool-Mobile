import React from "react";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet, TouchableOpacity } from "react-native";
import { IMessage } from "react-native-gifted-chat";
import Sound from "react-native-sound";

type ChatAudioMessage = {
    currentMessage : {
        audio : string
    }
}

export const renderSound = (message : IMessage & ChatAudioMessage ) : React.ReactElement => {

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
        <TouchableOpacity
        
            style={styles.AudioMessageContainer}
            onPress={() => PlaySoundMessage()}>

            <FontAwesomeIcon icon={faPlay} size={16} />

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    AudioMessageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    }
})