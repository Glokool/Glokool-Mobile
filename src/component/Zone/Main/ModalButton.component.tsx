import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Pressable, Text, Platform, FlatList } from 'react-native';
import { Layout, Modal } from '@ui-kitten/components';
import { EnterIcon } from '../../../assets/icon/Zone';
import { windowHeight, windowWidth } from '../../../Design.component';
import LinearGradient from 'react-native-linear-gradient';

export const FreeAvailableButton = () => {
    return (
        <LinearGradient
            style={[
                styles.ButtonContainer,
                { backgroundColor: '#7777ff', justifyContent: 'space-evenly' }
            ]}
            colors={['#9668ef', '#7777ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <Layout style={styles.SideContainer} />
            <Text style={styles.ButtonText}>Experience FREE Trial Now</Text>
            <Layout style={styles.SideContainer}>
                <EnterIcon />
            </Layout>
        </LinearGradient>
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
                <Text style={[styles.PriceText, { color: '#7777ff' }]}>$ </Text>
                <Text style={styles.OriginalPriceText}>14 </Text>
                <Text style={styles.PriceText}>6.99</Text>
                <Text style={[styles.PriceText, { color: '#7777ff' }]}> / day</Text>
            </Layout>
            <Text style={[styles.ButtonText, { fontSize: 12 }]}>Join a Chat Room</Text>
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
                <Text style={[styles.PriceText, { color: '#a2a2a2' }]}>$ </Text>
                <Text style={styles.OriginalPriceText}>14 </Text>
                <Text style={styles.PriceText}>6.99</Text>
                <Text style={[styles.PriceText, { color: '#a2a2a2' }]}> / day</Text>
            </Layout>
            <Text style={[styles.ButtonText, { fontSize: 12 }]}>The Group Chat is Full</Text>
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
        flexDirection: 'row',
        alignItems: 'center'
    },
    OriginalPriceText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 12,
        color: '#d4d4d4',
        textDecorationLine: 'line-through',
    },
    PriceText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 13,
    }
})