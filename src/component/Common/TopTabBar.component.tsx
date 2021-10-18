import React from 'react';
import { StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { ArrowLeft } from '../../assets/icon/Common';
import { windowWidth } from '../../Design.component';

export const CommonTopTabBar = (props: any) => {
    return (
        <Layout style={styles.TopTabContainer}>
            <Layout style={styles.TopTabItems}>

                <TouchableOpacity
                    style={styles.BackButton}
                    onPress={() => props.navigation.pop()}
                >
                    <ArrowLeft />
                </TouchableOpacity>

                <Text style={styles.TopTabText}>{props.title}</Text>

                <Layout style={{ flex: 1,}} />
            </Layout>
            {props.child}
        </Layout>
    )
}

const styles = StyleSheet.create({
    TopTabContainer: {
        width: windowWidth,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        backgroundColor: '#fff',
    },
    TopTabItems: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    TopTabText: {
        flex: 5,
        fontFamily: 'BrandonGrotesque-Bold',
        textAlign: 'center',
        fontSize: 18,
    },
    BackButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})