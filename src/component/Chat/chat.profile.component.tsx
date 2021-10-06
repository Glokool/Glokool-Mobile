import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Pressable, View, Text, Platform, FlatList } from 'react-native';
import { Modal } from '@ui-kitten/components';
import { CloseButton } from '../../assets/icon/Series';
import { SceneRoute } from '../../navigation/app.route';
import { CDN, SERVER } from '../../server.component';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../model';
import { setGuideVisiblityFalse } from '../../model/Chat/Chat.UI.model';

export const ProfileModal = (props: any) => {

    const guideVisible = useSelector((state: RootState) => state.ChatUIModel.guideVisiblity);
    const dispatch = useDispatch();

    const helpButton = () => {
        props.navigation.navigate(SceneRoute.CHAT_HELP, {
            id: props.route.params.id,
            guide: {
                uid: props.route.params.guide.uid,
                name: props.route.params.guide.name,
            },
        });

        dispatch(setGuideVisiblityFalse());
    }

    // 주기적으로 서버에 요청하는 테스트 코드
    useEffect(() => {
        let interval: any;
        if (guideVisible) {
            interval = setInterval(() => {
                GetNumber();
            }, 3000)
        }
        return () => {
            clearInterval(interval);
        }
    }, [guideVisible])

    const GetNumber = () => {
        axios.get('https://glokool-guide.com/api/chat-rooms/615c02a248cce35ccaaad4be/check')
            .then((response) => console.log(response.data))
            .catch((e) => console.log(e));
    }

    const renderItem = (item: any) => {
        return (
            <View style={styles.keywordBox}>
                <Text style={styles.keywordText}>
                    {item.item}
                </Text>
            </View>
        )
    }

    return (
        <>
            < Modal
                style={{ padding: 20, width: '100%', }}
                visible={guideVisible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => dispatch(setGuideVisiblityFalse())}
            >

                <View style={{ padding: 20, borderRadius: 15, backgroundColor: 'white' }}>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable onPress={() => helpButton()}>
                            <View style={styles.helpButtonContainer}>
                                <Text style={{ fontSize: 14, color: '#9b9b9b' }}>HELP</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={() => dispatch(setGuideVisiblityFalse())}>
                            <CloseButton />
                        </Pressable>
                    </View>

                    <View style={styles.innerContainer}>
                        {props.guide.avatar != " " &&
                            props.guide.avatar != undefined &&
                            props.guide.avatar != null ? (
                            <Image
                                source={{ uri: CDN + props.guide.avatar }}
                                style={styles.profileImage}
                            />
                        ) : (
                            <Image
                                source={require('../../assets/image/Chat/guideGray.png')}
                                style={styles.profileImage}
                            />
                        )}
                        <Text
                            style={styles.guideNameText}>
                            {props.guide.name}
                        </Text>
                    </View>

                    <View style={styles.infoContainer}>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.keyTextStyle}>Language</Text>
                            <Text style={styles.valTextStyle}>
                                {props.guide.lang && (props.guide.lang[0] && 'English ')}
                                {props.guide.lang && (props.guide.lang[1] && '中文')}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 3, }}>
                            <Text style={styles.keyTextStyle}>Nationality</Text>
                            <Text style={styles.valTextStyle}>{props.guide.country}</Text>
                        </View>

                        <View style={styles.introContainer}>
                            <Text style={styles.oneLineIntro}>
                                {props.guide.oneLineIntro}
                            </Text>

                            <Text style={styles.intro}>
                                {props.guide.intro}
                            </Text>
                        </View>

                        <View style={{ marginTop: 20, }}>
                            <FlatList
                                data={props.guide.keyword}
                                renderItem={renderItem}
                                horizontal
                                scrollEnabled={false}
                            />
                        </View>

                    </View>

                </View>
            </Modal >
        </>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    innerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 35,
    },
    profileImage: {
        width: 73,
        height: 73,
        borderRadius: 100,
        borderColor: '#ccc',
        borderWidth: 0.5,
    },
    keyTextStyle: {
        fontFamily: 'Pretendard-Bold',
        fontSize: Platform.OS === 'ios' ? 14 : 12,
        color: '#7777ff',
        fontWeight: 'bold',
        flex: 1,
    },
    valTextStyle: {
        fontFamily: 'Pretendard-Regular',
        fontSize: Platform.OS === 'ios' ? 15 : 13,
        fontWeight: '400',
        flex: 2.5,
    },
    oneLineIntro: {
        fontFamily: 'Pretendard-Bold',
        fontSize: Platform.OS === 'ios' ? 20 : 18,
        color: '#7777ff',
        fontWeight: 'bold',
    },
    intro: {
        fontFamily: 'Pretendard-Regular',
        fontSize: Platform.OS === 'ios' ? 15 : 13,
        fontWeight: '400',
        marginTop: 15,
    },
    introContainer: {
        marginTop: 35,
    },
    infoContainer: {
        paddingHorizontal: 15,
        paddingBottom: 30,
    },
    guideNameText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 16,
        marginTop: 13,
        fontWeight: '500',
    },
    helpButtonContainer: {
        borderColor: '#f1f1f1',
        borderWidth: 0.7,
        borderRadius: 9,
        paddingHorizontal: 7,
        paddingVertical: 3,
    },
    keywordBox: {
        borderWidth: 1,
        borderColor: '#7777ff',
        borderRadius: 50,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 4,
    },
    keywordText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: Platform.OS === 'ios' ? 12 : 10,
    },
});