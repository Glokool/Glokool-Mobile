import { Layout, LayoutElement, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AngleLeft } from '../../assets/icon/Common';

interface TopTabBarProps {
    index : number;
}

export const TopTabBar = (props : TopTabBarProps) : LayoutElement => {



    return(
        <Layout style={styles.TopTabBarContainer}>

            <Layout>
                <TouchableOpacity style={styles.BackButton}>
                    <AngleLeft />
                </TouchableOpacity>

                <Layout style={styles.TitleContainer}>
                    <Text style={styles.TitleText}>Booking</Text>
                </Layout>

                <TouchableOpacity style={styles.BackButton}/>

            </Layout>

        </Layout>
    )
}

const styles = StyleSheet.create({
    TopTabBarContainer: {
        position: 'absolute',
        top: 0,
        height: 80,
        width: '100%',
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
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TitleText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 20,
        color: 'black'
    }
    
})