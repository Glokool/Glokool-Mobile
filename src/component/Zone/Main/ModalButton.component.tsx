import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { EnterIcon } from '../../../assets/icon/Zone';
import { windowHeight, windowWidth } from '../../../Design.component';
import LinearGradient from 'react-native-linear-gradient';

export const GroupAvailableButton = (props: { price: number, discountPrice: number }) => {
    return (
        <LinearGradient
            style={[
                styles.ButtonContainer,
                { backgroundColor: '#7777ff', justifyContent: 'space-between' }
            ]}
            colors={['#9668ef', '#7777ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <Layout style={styles.CostContainer}>
                <Text style={styles.OriginalPriceText}>$ {props.price}</Text>
                <Text style={[styles.PriceText, { color: '#7777ff' }]}>$ </Text>
                <Text style={styles.PriceText}>{props.discountPrice}</Text>
                <Text style={[styles.PriceText, { color: '#7777ff' }]}> / day</Text>
            </Layout>
            <Text style={styles.ButtonText}>Join a Chat Room</Text>
            <Layout style={styles.SideContainer}>
                <EnterIcon />
            </Layout>
        </LinearGradient>
    )
}

export const GroupDisabledButton = (props: { price: number, discountPrice: number }) => {
    return (
        <Layout
            style={[
                styles.ButtonContainer,
                {
                    backgroundColor: '#a2a2a2',
                    justifyContent: 'space-between'
                }
            ]}>
            <Layout style={styles.CostContainer}>
                <Text style={styles.OriginalPriceText}>$ {props.price}</Text>
                <Text style={styles.PriceText}> $ {props.discountPrice}</Text>
                <Text style={[styles.PriceText, { color: '#a2a2a2' }]}> / day</Text>
            </Layout>
            <Text style={[styles.ButtonText]}>The Group Chat is Full</Text>
            <Layout style={[styles.SideContainer, { width: windowWidth * 0.02 }]} />
        </Layout>
    )
}

export const PrivateAvailableButton = (props: { price: number, discountPrice: number }) => {
    return (
        <Layout style={[styles.ButtonContainer, { backgroundColor: '#7777ff', justifyContent: 'space-between' }]}>
            <Layout style={styles.CostContainer}>
                <Text style={styles.OriginalPriceText}>$ {props.price}</Text>
                <Text style={[styles.PriceText, { color: '#7777ff' }]}> $ </Text>
                <Text style={styles.PriceText}>{props.discountPrice}</Text>
                <Text style={[styles.PriceText, { color: '#7777ff' }]}> / day</Text>
            </Layout>
            <Text style={styles.ButtonText}>Join a Chat Room</Text>
            <Layout style={styles.SideContainer}>
                <EnterIcon />
            </Layout>
        </Layout>
    )
}

export const PrivateDisabledButton = (props: { price: number, discountPrice: number }) => {
    return (
        <Layout style={[styles.ButtonContainer, { backgroundColor: '#a2a2a2', justifyContent: 'space-between' }]}>
            <Layout style={styles.CostContainer}>
                <Text style={styles.OriginalPriceText}>$ {props.price}</Text>
                <Text style={styles.PriceText}> $ {props.discountPrice}</Text>
                <Text style={[styles.PriceText, { color: '#a2a2a2' }]}> / day</Text>
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
        width : windowWidth * 0.75
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