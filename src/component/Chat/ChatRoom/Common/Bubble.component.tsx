import { Layout } from '@ui-kitten/components';
import React from 'react';
import auth from '@react-native-firebase/auth';
import { Platform, StyleSheet, Text } from 'react-native';
import { Bubble, BubbleProps, IMessage } from 'react-native-gifted-chat';


// 대화창 말풍선 
export const renderBubble = (props: BubbleProps<IMessage>, guide: any): JSX.Element => {

    const userID = auth().currentUser?.uid;

    return (
        <Layout style={styles.BubbleContainer}>
            {(props.currentMessage?.user._id === userID) ?
                null
                :
                (props.previousMessage == undefined) ?
                    <Text style={styles.UserNameText}></Text>
                    :
                    (props.currentMessage?.user._id === props.previousMessage?.user?._id) ?
                        null
                        :
                        <Text style={styles.UserNameText}></Text>
            }
            {(props.currentMessage.messageType === 'emoji') ?
                <Bubble
                    {...props}
                    wrapperStyle={{
                        left: styles.EmojiContainer,
                        right: styles.EmojiContainer
                    }}
                    textStyle={{
                        left: styles.LeftBubbleText,
                        right: styles.RightBubbleText
                    }}
                    tickStyle={{ color: 'black' }}
                />
                :
                <Bubble
                    {...props}
                    wrapperStyle={{
                        left: (props.currentMessage?.user._id === guide.uid) ? styles.LeftGuideBubbleWrapper : styles.LeftBubbleWrapper,
                        right: styles.RightBubbleWrapper
                    }}
                    textStyle={{
                        left: styles.LeftBubbleText,
                        right: styles.RightBubbleText
                    }}
                    tickStyle={{ color: 'black' }}
                />
            }

        </Layout>

    );
};


const styles = StyleSheet.create({

    BubbleContainer: {
        marginTop: 10
    },

    LeftBubbleWrapper: {
        backgroundColor: '#7777FF',
        borderTopStartRadius: 5,
        borderTopEndRadius: 15,
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 15,
        marginBottom: 3,
    },

    LeftBubbleText: {
        color: 'white',
        fontFamily: 'Pretendard-Medium',
    },

    LeftGuideBubbleWrapper: {
        backgroundColor: '#292434',
        borderTopStartRadius: 5,
        borderTopEndRadius: 15,
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 15,
        marginBottom: 3,
        borderColor: '#7676FE',
        borderWidth: 2,
    },


    RightBubbleWrapper: {
        backgroundColor: 'white',
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 5,
        marginBottom: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },


    RightBubbleText: {
        color: '#4E4ED8',
        fontSize: 15,
        fontFamily: 'Pretendard-Medium',
    },

    UserNameText: {
        position: 'absolute',
        top: - 25,
        fontFamily: 'Pretendard-Medium',
        fontSize: 14,
        color: 'black',
        left: 5
    },

    EmojiContainer: {
        marginBottom: 3,
        backgroundColor: 'white',
    }

})