import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Pressable, View, Text, Platform, FlatList } from 'react-native';
import { Modal } from '@ui-kitten/components';
import { CloseButton } from '../../../assets/icon/Series';
import { SceneRoute } from '../../../navigation/app.route';
import { CDN, SERVER } from '../../../server.component';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../model';
import { setGuideVisiblityFalse } from '../../../model/Zone/Zone.UI.model';
import { Location } from '../../../assets/icon/Common';
import { PersonIcon } from '../../../assets/icon/Zone';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EnterIcon } from '../../../assets/icon/Zone';

export const ZoneChatModal = (props: any) => {

    const guideVisible = useSelector((state: RootState) => state.ZoneUIModel.guideVisiblity);
    const dispatch = useDispatch();

    const chatState = 'free';
    const chatLimit = 0;

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
        // axios.get('https://glokool-guide.com/api/chat-rooms/615c02a248cce35ccaaad4be/check')
        //     .then((response) => console.log(response.data))
        //     .catch((e) => console.log(e));
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

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

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
                                source={require('../../../assets/image/Chat/guideGray.png')}
                                style={styles.profileImage}
                            />
                        )}
                        <View style={styles.nameContainer}>
                            <View style={styles.locationContainer}>
                                <Location />
                                <Text style={styles.locationText}>HONGDAE</Text>
                            </View>
                            <Text
                                style={styles.guideNameText}>
                                {props.guide.name}
                            </Text>
                        </View>
                    </View>


                    <View style={styles.infoContainer}>

                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={styles.keyTextStyle}>Language</Text>
                            <Text style={styles.valTextStyle}>
                                {props.guide.lang && (props.guide.lang[0] && 'English ')}
                                {props.guide.lang && (props.guide.lang[1] && '中文')}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 3, alignItems: 'flex-end' }}>
                            <Text style={styles.keyTextStyle}>Nationality</Text>
                            <Text style={styles.valTextStyle}>{props.guide.country}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 3, alignItems: 'flex-end' }}>
                            <Text style={styles.keyTextStyle}>Group Chat Limit</Text>
                            <Text style={styles.valTextStyle}>
                                10
                            </Text>
                        </View>

                        <View style={styles.introContainer}>
                            <Text style={styles.oneLineIntro}>
                                {props.guide.oneLineIntro}
                            </Text>

                            <Text style={styles.intro}>
                                {props.guide.intro}
                            </Text>
                        </View>

                        <View style={{ marginTop: 20, alignItems: 'center' }}>
                            <FlatList
                                data={props.guide.keyword}
                                renderItem={renderItem}
                                horizontal
                                scrollEnabled={false}
                            />
                        </View>

                        <View style={styles.limitContainer}>
                            <PersonIcon />
                            <Text style={styles.limitNumber}>5 </Text>
                            <Text style={styles.limitText}>more people can join this chat</Text>
                        </View>

                        {chatLimit > 0 && (
                            <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: '#7777ff', }]}>
                                {chatState == 'free' ? (
                                    <>
                                        <View style={styles.sideSpace} />
                                        <Text style={styles.buttonText}>Experience FREE Trial Now</Text>
                                        <View style={styles.sideSpace}>
                                            <EnterIcon />
                                        </View>
                                    </>
                                ) : (
                                    <>
                                        <View style={styles.costInfo}>
                                            <Text>$5 / day</Text>
                                        </View>
                                        <Text style={styles.buttonText}>Join a Chat Room</Text>
                                        <View style={styles.sideSpace}>
                                            <EnterIcon />
                                        </View>
                                    </>
                                )}
                            </TouchableOpacity>
                        )}

                        {chatLimit == 0 && (
                            <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: '#a2a2a2', }]}>
                                {chatState == 'free' ? (
                                    <>
                                        <Text style={styles.buttonText}>The group chat is full. Please try it later.</Text>
                                    </>
                                ) : (
                                    <>
                                        <View style={styles.costInfo}>
                                            <Text>$8 / day</Text>
                                        </View>
                                        <Text style={styles.buttonText}>The Group Chat is Full</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        )}


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
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    profileImage: {
        width: 73,
        height: 73,
        borderRadius: 100,
        borderColor: '#ccc',
        borderWidth: 0.5,
    },
    keyTextStyle: {
        fontFamily: 'Pretendard-Medium',
        fontSize: Platform.OS === 'ios' ? 14 : 12,
        color: '#a2a2a2',
        flex: 1,
    },
    valTextStyle: {
        fontFamily: 'Pretendard-Regular',
        fontSize: Platform.OS === 'ios' ? 15 : 13,
        flex: 1,
    },
    oneLineIntro: {
        fontFamily: 'Pretendard-Bold',
        fontSize: Platform.OS === 'ios' ? 20 : 18,
        color: '#8797ff',
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
        marginTop: 20,
    },
    guideNameText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 20,
        marginTop: 5,
    },
    keywordBox: {
        borderRadius: 50,
        paddingHorizontal: 17,
        paddingVertical: 8,
        marginRight: 5,
        backgroundColor: '#efefef'
    },
    keywordText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: Platform.OS === 'ios' ? 14 : 12,
    },
    locationText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 15,
        marginLeft: 5,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameContainer: {
        marginLeft: 15,
    },
    limitContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    limitText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 14,
    },
    limitNumber: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 14,
        marginLeft: 5,
    },
    buttonText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 14,
        color: 'white',
    },
    buttonContainer: {
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        marginTop: 10,
        justifyContent: 'space-evenly'
    },
    sideSpace: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    costInfo: {
        backgroundColor: 'white',
        borderRadius: 50,
        paddingVertical: 7,
        paddingHorizontal: 4,
    }
});