import React from 'react';
import { Layout, Text, } from '@ui-kitten/components';
import { StyleSheet, } from 'react-native';
import { GlokoolService } from '../../../assets/icon/Series';

export const GlokoolServiceButton = () => {

    return (
        <Layout style={styles.GlochatContainer}>
            <Text style={styles.GloChatText}>Glo-Chat Services{' '}</Text>
            <GlokoolService />
        </Layout>
    )
}

const styles = StyleSheet.create({
    GlochatContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 20,
        marginHorizontal: 30,
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
    },
    GloChatText: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 14,
        color: '#8797ff',
    },
})