import React from 'react';
import { StyleSheet } from 'react-native';
import { Bubble, BubbleProps, IMessage } from 'react-native-gifted-chat';


// 대화창 말풍선 
export const renderBubble = (props : BubbleProps<IMessage>) : JSX.Element => {
    
    return (
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
    );
};


const styles = StyleSheet.create({

    LeftBubbleWrapper : {
        backgroundColor: '#7777FF',
        borderRadius: 10,
        marginBottom: 3,
    },

    LeftBubbleText: {
        color: 'white',
        fontFamily: 'Pretendard-Medium',
    },

    RightBubbleWrapper : {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 3,
        shadowColor: '#222',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1.41,
        elevation: 2,
    },

    RightBubbleText: {
        color: '#4E4ED8',
        fontSize: 15,
        fontFamily: 'Pretendard-Medium',
    },

})