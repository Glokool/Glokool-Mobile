import React from 'react';
import { StyleSheet } from 'react-native';
import { Time } from 'react-native-gifted-chat';
import { Layout } from '@ui-kitten/components'

// 채팅 메세지에 달려있는 시간 표시
export const renderTime = (props: any) : React.ReactElement => {

    return (
        <Layout
            style={(props.position === 'right')? styles.BubbleRightTimeContainer : styles.BubbleLeftTimeContainer}>
                <Time
                    {...props}
                    containerStyle={{ backgroundColor: 'red' }}
                    timeTextStyle={{
                        left: styles.BubbleTimeText,
                        right: styles.BubbleTimeText
                    }}
                />
        </Layout>
    );
};
    


const styles = StyleSheet.create({


    BubbleTimeText: {
        color: '#AEAEAE',
        fontFamily: 'BrandonGrotesque-Medium',
    },

    BubbleLeftTimeContainer: {
        position: 'absolute',
        backgroundColor: '#00FF0000',
        right: -55,
        top: -15,
    },

    BubbleRightTimeContainer: {
        position: 'absolute',
        backgroundColor: '#00FF0000',
        left: -60,
        top: -10,
    },


})