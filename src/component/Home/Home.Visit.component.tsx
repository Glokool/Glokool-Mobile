import React from 'react';
import { Layout, } from '@ui-kitten/components';
import { StyleSheet, Text } from 'react-native';
import { windowWidth, windowHeight } from '../../Design.component';

export const HomeVisitComponent = () => {
    return (
        <Layout style={styles.VisitContainer}>
            <Text style={styles.VisitText}>I WANT TO VISIT...</Text>
            <Layout style={styles.VisitItemContainer}>
                <Layout style={styles.VisitItem} />
                <Layout style={styles.VisitItem} />
            </Layout>
        </Layout>
    )
}

const styles = StyleSheet.create({
    VisitContainer: {
        width: windowWidth * 0.9,
        alignSelf: 'center',
        marginTop: windowHeight * 0.025,
        padding: windowWidth * 0.05,
        borderRadius: 10,
    },
    VisitText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18,
    },
    VisitItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: windowHeight * 0.015
    },
    VisitItem: {
        width: windowWidth * 0.39,
        height: windowWidth * 0.39,
        borderRadius: 10,
        borderWidth: 0.5,
        marginHorizontal: windowWidth * 0.01
    },
})