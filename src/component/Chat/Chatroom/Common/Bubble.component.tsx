import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import auth from '@react-native-firebase/auth';
import { Platform, StyleSheet } from 'react-native';
import { Bubble, BubbleProps, IMessage } from 'react-native-gifted-chat';


// 대화창 말풍선 
export const renderBubble = (props : BubbleProps<IMessage>) : JSX.Element => {
    
    const userID = auth().currentUser?.uid;

    return (
        <Layout style={styles.BubbleContainer}>
            {(props.currentMessage?.user._id == userID)? 
                null
            :
                <Text style={styles.UserNameText}>닉네임</Text>
            }
            <Bubble
                {...props}
                wrapperStyle={{
                    left: styles.LeftBubbleWrapper,
                    right: styles.RightBubbleWrapper
                }}
                textStyle={{
                    left: styles.LeftBubbleText,
                    right: styles.RightBubbleText
                }}
                tickStyle={{ color: 'black' }}
            />
        </Layout>

    );
};


const styles = StyleSheet.create({

    BubbleContainer: {
    },

    LeftBubbleWrapper : {
        backgroundColor: '#7777FF',
        borderTopStartRadius : 5,
        borderTopEndRadius : 15,
        borderBottomStartRadius : 15,
        borderBottomEndRadius: 15,
        marginBottom: 3,

        ...Platform.select({
            ios: {
                shadowColor: '#000',
                
                shadowOffset: {width: 1, height: 3},
                shadowOpacity: 0.2,
            },
            android: {
                elevation: 8,                
            },
        }),
    },

    LeftBubbleText: {
        color: 'white',
        fontFamily: 'Pretendard-Medium',
    },

    RightBubbleWrapper : {
        backgroundColor: 'white',
        borderTopStartRadius : 15,
        borderTopEndRadius : 15,
        borderBottomStartRadius : 15,
        borderBottomEndRadius: 5,
        marginBottom: 3,

        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {width: 1, height: 3},
                shadowOpacity: 0.2,
            },
            android: {
                elevation: 8,
                
            },
        })
    },

    RightBubbleText: {
        color: '#4E4ED8',
        fontSize: 15,
        fontFamily: 'Pretendard-Medium',
    },

    UserNameText: {
        position: 'absolute',
        top : - 25,
        fontFamily: 'Pretendard-Medium',
        fontSize: 14,
        color: 'black',
        left: 5
    }

})