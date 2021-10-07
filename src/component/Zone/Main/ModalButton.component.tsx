import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Pressable, Text, Platform, FlatList } from 'react-native';
import { Layout, Modal } from '@ui-kitten/components';
import { EnterIcon } from '../../../assets/icon/Zone';
import { windowHeight, windowWidth } from '../../../Design.component';

export const FreeAvailableButton = () => {
    return (
        <Layout
            style={[
                styles.ButtonContainer,
                { backgroundColor: '#7777ff', justifyContent: 'space-evenly' }]}
        >
            <Layout style={styles.SideContainer} />
            <Text style={styles.ButtonText}>Experience FREE Trial Now</Text>
            <Layout style={styles.SideContainer}>
                <EnterIcon />
            </Layout>
        </Layout>
    )
}

export const FreeDisabledButton = () => {
    return (
        <Layout
            style={[
                styles.ButtonContainer,
                {
                    backgroundColor: '#a2a2a2',
                    justifyContent: 'center'
                }
            ]}>
            <Text
                style={[styles.ButtonText, { fontSize: 12 }]}
            >
                The group chat is full. Please try it later.
            </Text>
        </Layout>
    )
}

export const PayAvailableButton = () => {
    return (
        <Layout style={[styles.ButtonContainer, { backgroundColor: '#7777ff', justifyContent: 'space-between' }]}>
            <Layout style={styles.CostContainer}>
                <Text>$5 / day</Text>
            </Layout>
            <Text style={styles.ButtonText}>Join a Chat Room</Text>
            <Layout style={styles.SideContainer}>
                <EnterIcon />
            </Layout>
        </Layout>
    )
}

export const PayDisabledButton = () => {
    return (
        <Layout style={[styles.ButtonContainer, { backgroundColor: '#a2a2a2', justifyContent: 'space-between' }]}>
            <Layout style={styles.CostContainer}>
                <Text>$8 / day</Text>
            </Layout>
            <Text style={styles.ButtonText}>The Group Chat is Full</Text>
            <Layout style={[styles.SideContainer, { width: windowWidth * 0.02 }]} />
        </Layout>
    )
}

const styles = StyleSheet.create({
    ButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'cornflowerblue',
        borderRadius: 100,
        height: windowHeight * 0.06,
        paddingHorizontal: 10,
    },
    ButtonText: {
        fontFamily: 'Pretendard-Regular',
        color: 'white',
        textAlign: 'center'
    },
    SideContainer: {
        width: windowWidth * 0.07,
        height: windowWidth * 0.07,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0000'
    },
    CostContainer: {
        borderRadius: 50,
        paddingHorizontal: 10,
        height: windowHeight * 0.04,
        justifyContent: 'center',
    }
})