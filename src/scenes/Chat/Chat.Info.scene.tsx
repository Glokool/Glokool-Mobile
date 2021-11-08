import React, { useCallback, useState } from 'react';
import { Layout, LayoutElement, } from '@ui-kitten/components';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { CommonTopTabBar } from '../../component/Common';
import { windowHeight, windowWidth } from '../../Design.component';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckIcon } from '../../assets/icon/Common';
import { GroupChat, PrivateChat } from '../../component/Chat/ChatMain/HowItWorks.component';

export const ChatInfoScene = () => {

    const [button, setButton] = useState(true);

    return (
        <ScrollView style={styles.ScrollViewContainer}>
            <Layout style={styles.MainContainer}>
                <CommonTopTabBar title={'HOW IT WORKS?'} />
                <Layout style={styles.TitleContainer}>
                    <Text style={styles.TitleText}>All About GloChat</Text>
                </Layout>
                <FastImage source={require('../../assets/image/Info/Image_01.png')} style={styles.Image_01} />

                <Layout style={styles.DescContainer}>
                    <Text style={styles.Describtion}>Ask anything about traveling in Korea.</Text>
                    <Text style={styles.Describtion}>Our friendly local travel assistant</Text>
                    <Text style={styles.Describtion}>will help you with...</Text>
                </Layout>

                <Layout style={styles.GroupContainer}>
                    <Text style={styles.KeyText}>RECOMMENDATION</Text>

                    <Text style={styles.ValueText}>Not sure where to go?</Text>
                    <Text style={styles.ValueText}>We will recommend you</Text>
                    <Text style={styles.ValueText}>the perfect hidden gems among locals!</Text>
                </Layout>

                <Layout style={styles.GroupContainer}>
                    <Text style={styles.KeyText}>INFORMATION</Text>

                    <Text style={styles.ValueText}>Ask for info about certain places or events!</Text>
                    <Text style={styles.ValueText}>You will get the most updated info from a local.</Text>
                </Layout>

                <Layout style={styles.GroupContainer}>
                    <Text style={styles.KeyText}>TRANSLATION</Text>

                    <Text style={styles.ValueText}>Have communication issues with locals?</Text>
                    <Text style={styles.ValueText}>Ask us to translate whatever you see or hear!</Text>
                </Layout>

                <Layout style={styles.GroupContainer}>
                    <Text style={styles.KeyText}>RESERVATION</Text>

                    <Text style={styles.ValueText}>Don't wait in a long line.</Text>
                    <Text style={styles.ValueText}>Let locals help you book</Text>
                    <Text style={styles.ValueText}>restaurants or anything that needs reservations.</Text>
                </Layout>

                <Layout style={styles.GroupContainer}>
                    <Text style={styles.KeyText}>DIRECTIONS</Text>

                    <Text style={styles.ValueText}>Are you lost? Don't be panic,</Text>
                    <Text style={styles.ValueText}>we will guide you through</Text>
                    <Text style={styles.ValueText}>the most effective way to get to your destination.</Text>
                </Layout>

                <Layout style={styles.GroupContainer}>
                    <Text style={styles.KeyText}>ITINERARY FEEDBACK</Text>

                    <Text style={styles.ValueText}>No more typical trip!</Text>
                    <Text style={styles.ValueText}>Ask locals for advice to</Text>
                    <Text style={styles.ValueText}>make your day more perfect and special.</Text>
                </Layout>

                <Text style={styles.MoreText}>And Any Other Questions</Text>

                <Layout style={styles.Divider} />
                <FastImage source={require('../../assets/image/Info/Image_02.png')} style={styles.Image_02} />
                <Layout style={styles.Divider} />

                <FastImage source={require('../../assets/image/Info/Image_03.png')} style={styles.Image_03} />

                <Layout style={styles.ButtonContainer}>
                    <Pressable onPress={() => setButton(true)} style={[button ? styles.SelectedButton : styles.UnselectedButton, { borderTopLeftRadius: 10 }]}>
                        <Text style={button ? styles.SelectedText : styles.UnselectedText}>GROUP CHAT</Text>
                    </Pressable>
                    <Pressable onPress={() => setButton(false)} style={[!button ? styles.SelectedButton : styles.UnselectedButton, { borderTopRightRadius: 10 }]}>
                        <Text style={!button ? styles.SelectedText : styles.UnselectedText}>PRIVATE CHAT</Text>
                    </Pressable>
                </Layout>

                {button ? <GroupChat /> : <PrivateChat />}

                <Text style={{ fontFamily: 'Pretendard-SemiBold', fontSize: 16, marginTop: windowHeight * 0.06 }}>Anywhere and Anytime</Text>
                <Text style={styles.LastText}>{'Wherever you go, we will back you up\nwith amazing local travel tips and information.'}</Text>

                <FastImage source={require('../../assets/image/Info/Image_05.png')} style={styles.Image_05} />

            </Layout>
            <Layout style={{ height: windowHeight * 0.05 }} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    ScrollViewContainer: {
        backgroundColor: 'white',
    },
    TitleContainer: {
        backgroundColor: '#F4F3FF',
        width: windowWidth,
        height: windowHeight * 0.12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    TitleText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 38,
        color: '#886BFF'
    },
    Image_01: {
        width: windowWidth * 0.9,
        height: windowWidth * 0.9 / 764 * 688,
        marginVertical: windowHeight * 0.05
    },
    DescContainer: {
        width: windowWidth * 0.9,

    },
    Describtion: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 16,
        color: '#4A4A5A',
    },
    GroupContainer: {
        width: windowWidth * 0.9,
        paddingLeft: windowWidth * 0.03,
        borderLeftColor: '#C9CEFD',
        borderLeftWidth: 3,
        marginVertical: windowHeight * 0.02
    },
    KeyText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 16,
        color: '#7777ff',
        marginBottom: windowHeight * 0.01
    },
    ValueText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 14,
        color: '#707070'
    },
    MoreText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 20,
        color: '#C9CEFD',
        alignSelf: 'flex-end',
        marginRight: windowWidth * 0.05,
        marginVertical: windowHeight * 0.03
    },
    Divider: {
        width: windowWidth,
        height: windowHeight * 0.03,
        backgroundColor: '#f5f5f5'
    },
    Image_02: {
        width: windowWidth,
        height: windowWidth / 828 * 5418,
        marginVertical: windowHeight * 0.05
    },
    Image_03: {
        width: windowWidth * 0.8,
        height: windowWidth * 0.8 / 1086 * 404,
        marginTop: windowHeight * 0.05,
        marginBottom: windowHeight * 0.02,
    },
    ButtonContainer: {
        flexDirection: 'row',
        marginBottom: windowHeight * 0.03
    },
    SelectedButton: {
        borderWidth: 2,
        borderColor: '#B3B3FF',
        backgroundColor: '#EFF3FF',
        width: windowWidth * 0.45,
        height: windowHeight * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
    },
    SelectedText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18,
        color: '#7777ff'
    },
    UnselectedButton: {
        borderWidth: 2,
        borderColor: '#E9E9E9',
        backgroundColor: '#fff',
        width: windowWidth * 0.45,
        height: windowHeight * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
    },
    UnselectedText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18,
        color: '#808080'
    },
    Image_04: {
        width: windowWidth * 0.9,
        height: windowWidth * 0.9 / 1110 * 48
    },
    LastText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 14,
        color: '#707070',
        textAlign: 'center',
        marginTop: windowHeight * 0.01,
    },
    Image_05: {
        width: windowWidth * 0.9,
        height: windowWidth * 0.9 / 1146 * 375,
        marginTop: windowHeight * 0.03
    },
});