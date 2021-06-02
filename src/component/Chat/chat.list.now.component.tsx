import React from 'react';
import {
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import {
    Layout,
    Text,
    LayoutElement 
} from '@ui-kitten/components';
import { ChatListNowProps } from '../../navigation/ScreenNavigator/Chat.navigator';


export const ChatListNow = (props : ChatListNowProps) : LayoutElement => {

    const [data, setData] = React.useState([]);

    return(
        <Layout>
            {(data.length === 0)? 
                <Layout style={styles.EmptyContainer}>
                    <Text style={styles.EmptyText}>Empty</Text>
                    <TouchableOpacity style={styles.EmptyButton}>
                        <Text style={styles.EmptyButtonText}>How to use Glochat?!</Text>
                    </TouchableOpacity>
                </Layout>            
            :
                <Layout/>
            }

        </Layout>
    );
}

const styles = StyleSheet.create({
    EmptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    EmptyText: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 16,
        color: '#C3C3C3',
        marginBottom: 20,
        marginTop: 50,
    },
    EmptyButton: {
        width: 250,
        height: 60,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    EmptyButtonText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 20,
        color: '#7777FF'
    }
})