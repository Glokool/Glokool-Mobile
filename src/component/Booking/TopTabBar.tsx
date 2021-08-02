
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AngleLeft } from '../../assets/icon/Common';
import { Layout, LayoutElement, Text } from '@ui-kitten/components';
import { Book_1, Book_2, Book_3, Book_4 } from '../../assets/icon/Booking';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface TopTabBarProps {
    index : number;
}

export const TopTabBar = (props : TopTabBarProps) : LayoutElement => {

    const Navigation = useNavigation();

    return(
        <Layout style={styles.TopTabBarContainer}>

            <SafeAreaView style={{flex : 0, backgroundColor: '#00FF0000'}} />

            <Layout style={styles.TopTabBarContainer2}>
                <TouchableOpacity style={styles.BackButton} onPress={() => Navigation.goBack()}>
                    <AngleLeft />
                </TouchableOpacity>

                <Layout style={styles.TitleContainer}>
                    <Text style={styles.TitleText}>BOOKING</Text>
                </Layout>

                <TouchableOpacity style={styles.BackButton}/>

            </Layout>

            {(props.index === 1)? <Book_1 /> : (props.index === 2)? <Book_2 /> : (props.index === 3)? <Book_3 /> : <Book_4 /> }

        </Layout>
    )
}

const styles = StyleSheet.create({
    TopTabBarContainer: {
        position: 'absolute',
        top: 0,
        height: 80,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    TopTabBarContainer2: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    BackButton: {
        padding: 20,
        flex: 1
    },
    TitleContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TitleText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 20,
        color: 'black'
    }
    
})