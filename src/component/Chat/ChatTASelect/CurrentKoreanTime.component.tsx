import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Calendar, Time } from '../../../assets/icon/Chat';
import { windowWidth } from '../../../Design.component';
import moment from 'moment';


export const CurrentKoreanTimeComponent = (props: any): React.ReactElement => {

    return (
        <Layout style={styles.container}>

            <Text style={styles.Title}>Current time in Korea</Text>

            <Layout style={styles.TimeContainer}>

                <Layout style={styles.TimeTextContainer}>
                    <Calendar />
                    <Text style={styles.TimeText}>
                        {moment(props.time).format('YYYY')}
                        <Text style={styles.TimeTextComma}> . </Text>
                        {moment(props.time).format('MM')}
                        <Text style={styles.TimeTextComma}> . </Text>
                        {moment(props.time).format('DD')}
                    </Text>
                </Layout>

                <Layout style={styles.TimeTextContainer}>
                    <Time />
                    <Text style={styles.TimeText}>
                        {moment(props.time).format('hh')}
                        <Text style={styles.TimeTextComma}> : </Text>
                        {moment(props.time).format('mm')}
                    </Text>
                </Layout>

            </Layout>

        </Layout>
    )
}


const styles = StyleSheet.create({

    container: {
        width: windowWidth * 0.9,
        height: 85,
        borderRadius: 15,
        backgroundColor: '#F1F1FF',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10,
    },

    TimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '65%',
        backgroundColor: '#00FF0000'
    },

    TimeTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00FF0000'
    },

    Title: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 17,
        color: '#7777FF'
    },

    TimeText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18,
        color: 'black',
        marginLeft: 5
    },

    TimeTextComma: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18,
        color: '#7777FF'
    }
})

