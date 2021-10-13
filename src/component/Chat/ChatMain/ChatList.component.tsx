import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Layout, Text, Divider } from '@ui-kitten/components';
import { Arrow_Bottom, Chat_Book_Button } from '../../../assets/icon/Chat';


export const ChatList = () : React.ReactElement => {

    const [data, setData] = React.useState([]);

    // 비었을 때
    if (data.length === 0) {
        return(
            <Layout>

                <Text style={styles.Title}>MY GloChat</Text>

                <Layout style={styles.MainContainer}>
                    <Text style={styles.EmptyTextTitle}>No Message Yet</Text>
                    <Text style={styles.EmptyTextDesc}>
                        {`Start chatting with the travel assistant now!\n`}
                        {`choose your travel destination first.`}
                    </Text>

                    <Arrow_Bottom style={styles.BottomIcon}/>

                    <Pressable>
                        <Chat_Book_Button />
                    </Pressable>
                    
                </Layout>

                <Divider style={styles.Divider}/>

                <Text style={styles.Title}>START FREE TRIAL</Text>
                <Text style={styles.Desc}>with a local travel assistant!</Text>

                

            </Layout>

        )
    }


    return(
        <Layout style={styles.MainContainer}>

        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40
    },

    Title : {
        marginLeft : 20,
        fontFamily: 'Pretendard-Bold',
        fontSize: 17,
        marginVertical: 20
    },

    Desc : {
        marginLeft : 20,
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 17,
        marginTop : -20,
        color: '#A7A7A7'
    },

    EmptyTextTitle : {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 17,
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 20
    },

    EmptyTextDesc : {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#AAAAAA',
        textAlign: 'center',
        marginBottom: 20
    },

    BottomIcon : {
        marginBottom: 20
    },

    Divider : {
        backgroundColor: '#F8F8F8',
        height: 6,
        width: '100%'
    },
})