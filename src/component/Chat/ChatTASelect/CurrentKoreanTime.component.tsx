import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { Calendar, Time } from '../../../assets/icon/Chat';


export const CurrentKoreanTimeComponent = (props : any) : React.ReactElement => {

    return(

        <Layout style={styles.MainContainer}>
            <Layout style={styles.container}>

                <Text style={styles.Title}>Current time in Korea</Text>

                <Layout style={styles.TimeContainer}>

                    <Layout style={styles.TimeTextContainer}>
                        <Calendar />
                        <Text style={styles.TimeText}>{props.year} <Text style={styles.TimeTextComma}>.</Text>{props.month}<Text style={styles.TimeTextComma}>.</Text> {props.day}</Text>
                    </Layout>

                    <Layout style={styles.TimeTextContainer}>
                        <Time />
                        <Text style={styles.TimeText}>{props.hour}<Text style={styles.TimeTextComma}>:</Text>{props.minutes}</Text>
                    </Layout>

                </Layout>

            </Layout>
        </Layout>

    )
}


const styles = StyleSheet.create({

    MainContainer: {
        paddingHorizontal: 16
    },

    container: {
        width: '100%',
        height : 85,
        borderRadius: 15,
        backgroundColor: '#F1F1FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },

    TimeContainer: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '60%',
        backgroundColor: '#00FF0000'
    },

    TimeTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00FF0000'
    },

    Title : {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 17,
        color: '#7777FF'
    },

    TimeText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18,
        color: 'black',
        marginLeft: 10
    },

    TimeTextComma : {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18,
        color: '#7777FF'
    }
})

