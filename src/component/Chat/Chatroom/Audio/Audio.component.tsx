import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Sound from 'react-native-sound';
import { Left_Play, Right_Play, Right_Stop } from '../../../../assets/icon/Chat';
import { AuthContext } from '../../../../context/AuthContext';
import { useInterval } from './Timer.component';

function pad(n : number, width : number, z='0') {
    const time = n + '';
    return time.length >= width ? n : new Array(width - time.length + 1).join(z) + n;
}

export const ChatAudioComponent = (props : any) : React.ReactElement => {

    const message = props.message;
    const guide = props.guide;

    const { currentUser, setCurrentUser } = React.useContext(AuthContext);
    const [sound, setSound] = React.useState<Sound | undefined>(new Sound(message.currentMessage.audio));
    const [play, setPlay] = React.useState<boolean>(false);
    const [time, setTime] = React.useState<number>(0);

    const minutes = pad(Math.floor((time / 60)), 1);
    const seconds = pad(Math.floor(time), 2);

    useInterval(() => {
        if(sound && play && sound.isPlaying()){
            sound.getCurrentTime((seconds : number, isPlaying : boolean) => {
                setTime(seconds);
            })
        }

        if(sound && play && !sound.isPlaying()){
            console.log('끝?');
        }
    }, 1000)


    const PlaySoundMessage = async() => {
        setPlay(!play)

        if(!play){
            sound?.play((success) => {
                if (success) {
                    setPlay(false);
                } else {
                    console.log('재생 실패');
                }
            });
        }
        else{
            sound?.stop();
        }        

    }

    if(message.currentMessage.user._id === currentUser.uid){
        return(
            <Layout style={styles.AudioMessageContainer}>            
                <Layout style={styles.ButtonContainer}>
                    <Pressable onPress={() => PlaySoundMessage()}>
                        {play? 
                            <Right_Stop />
                            
                        :
                            <Right_Play />
                        }                    
                    </Pressable>                
                </Layout>
    
                <Layout style={styles.TextContainer}>
                    <Text style={styles.TimeText}>{minutes}:{seconds}</Text>
                </Layout>
            </Layout>
        )

    }

    else if (guide === message.currentMessage.user._id) {
        return(
            <Layout style={styles.AudioGuideMessageContainer}>            
                <Layout style={styles.ButtonContainer}>
                    <Pressable onPress={() => PlaySoundMessage()}>
                        {play? 
                            <Right_Stop />
                            
                        :
                            <Left_Play />
                        }                    
                    </Pressable>                
                </Layout>

                <Layout style={styles.TextContainer}>
                    <Text style={styles.TimeText2}>{minutes}:{seconds}</Text>
                </Layout>
            </Layout>
        )
    }

    return(
        <Layout style={styles.AudioElseMessageContainer}>            
            <Layout style={styles.ButtonContainer}>
                <Pressable onPress={() => PlaySoundMessage()}>
                    {play? 
                        <Right_Stop />
                        
                    :
                        <Left_Play />
                    }                    
                </Pressable>                
            </Layout>

            <Layout style={styles.TextContainer}>
                <Text style={styles.TimeText2}>{minutes}:{seconds}</Text>
            </Layout>
        </Layout>
    )
}

const styles = StyleSheet.create({

    AudioMessageContainer: {
        width: 120,
        height : 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopStartRadius : 15,
        borderTopEndRadius : 15,
        borderBottomStartRadius : 15,
        borderBottomEndRadius: 5,
    },

    AudioGuideMessageContainer: {
        width: 120,
        height : 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopStartRadius : 5,
        borderTopEndRadius : 15,
        borderBottomStartRadius : 15,
        borderBottomEndRadius: 15,
        backgroundColor: '#292434',

    },

    AudioElseMessageContainer: {
        width: 120,
        height : 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopStartRadius : 5,
        borderTopEndRadius : 15,
        borderBottomStartRadius : 15,
        borderBottomEndRadius: 15,
        backgroundColor: '#7F7FEF',
    },
  
    ButtonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00FF0000'
    },

    TextContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#00FF0000'
    },

    TimeText:{
        fontFamily : 'BrandonGrotesque-Medium',
        fontSize: 18,
        color: '#4E4ED8',
        textAlign: 'left',
        marginLeft: 0
    },

    TimeText2:{
        fontFamily : 'BrandonGrotesque-Medium',
        fontSize: 18,
        color: 'white',
        textAlign: 'left',
        marginLeft: 0
    },

    TimeText3:{
        fontFamily : 'BrandonGrotesque-Medium',
        fontSize: 18,
        color: '#4E4ED8',
        textAlign: 'left',
        marginLeft: 0
    }
})