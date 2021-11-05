import React, { useEffect, useContext } from 'react';
import { StyleSheet, Image, Pressable, Text, Platform, FlatList, Alert } from 'react-native';
import { Layout, Modal } from '@ui-kitten/components';
import { CloseButton } from '../../../assets/icon/Series';
import { CDN } from '../../../server.component';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../model';
import { setGuideVisiblityFalse } from '../../../model/Zone/Zone.UI.model';
import { Location } from '../../../assets/icon/Common';
import { PersonIcon } from '../../../assets/icon/Zone';
import { AuthContext } from '../../../context/AuthContext';

import { GroupAvailableButton, GroupDisabledButton, PrivateAvailableButton, PrivateDisabledButton } from '..';
import { loginAlertWindow } from '../../Common/LoginCheck.component';
import { GuideInfoType } from '../../../types';
import { useNavigation } from '@react-navigation/core';
import { NavigatorRoute, SceneRoute } from '../../../navigation/app.route';
import { windowWidth } from '../../../Design.component';

export const ZoneChatModal = (props: { guideInfo: any }) => {

    const navigation = useNavigation();

    const guideVisible = useSelector((state: RootState) => state.ZoneUIModel.guideVisiblity);
    const dispatch = useDispatch();

    const { currentUser } = useContext(AuthContext);

    const availableUsers = props.guideInfo.maxUserNum - props.guideInfo.users.length;
    const price = props.guideInfo.price;

    const onPressEnterButton = () => {
        if (!currentUser) {
            loginAlertWindow(navigation);
            dispatch(setGuideVisiblityFalse());
        } else {
            if (isInChatRoom()) {
                Alert.alert(
                    "Chat Room Rules",
                    "\n- Quality and content about Korean traveling only\n- No hate speech or bullying\n- No ads, promotions, or spam\n-Be civil, kind, and respect others\n- Service hours are from 10AM ~ 7PM\n\n* If you violate above rules, you may be removed from the chat room",
                    [{
                        text: "Cancel",
                        onPress: () => console.log("press canceled"),
                        style: "destructive"
                    }, {
                        text: "Confirm",
                        onPress: () => navigateChatroom(),
                        style: "default"
                    }],
                )
            } else {
                Alert.alert(
                    "Payment Required",
                    "Payment is required to enter the chat room. Would you like to go to the payment page?",
                    [{
                        text: "Cancel",
                        onPress: () => console.log("press canceled"),
                        style: "destructive"
                    }, {
                        text: "Confirm",
                        onPress: () => navigatePayment(),
                        style: "default"
                    }],
                )
            }

        }
    }

    const isInChatRoom = () => {
        var list: string[] = [];
        props.guideInfo.users.map((item: any) => {
            list.push(item.uid);
        });

        if (list.includes(currentUser.uid)) {
            return true;
        } else {
            return false;
        }
    }

    const navigateChatroom = () => {
        dispatch(setGuideVisiblityFalse());
        navigation.navigate(
            SceneRoute.CHATROOM,
            {
                id: props.guideInfo._id,
                guide: {
                    name: props.guideInfo.guide.name,
                    uid: props.guideInfo.guide.uid,
                    avatar: props.guideInfo.guide.avatar,
                },
                zone: props.guideInfo.zone,
                maxUser: props.guideInfo.maxUserNum,
                day: props.guideInfo.travelDate,
                finish: true,
            }
        )
    }

    const navigatePayment = () => {
        dispatch(setGuideVisiblityFalse());
        navigation.navigate(NavigatorRoute.PAY, {
            screen: SceneRoute.PAY_FIRST,
            params: {
                ChatRoomID: props.guideInfo._id,
                guide: props.guideInfo.guide._id,
                price: price,
                guideName: props.guideInfo.guide.name,
                zone: props.guideInfo.zone,
                maxUserNum: props.guideInfo.maxUserNum,
            }
        })
    }

    const renderItem = (item: any) => {
        return (
            <Layout style={styles.keywordBox}>
                <Text style={styles.keywordText}>
                    {item.item}
                </Text>
            </Layout>
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

                <Layout style={{ padding: 20, borderRadius: 15, backgroundColor: 'white' }}>

                    <Layout style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

                        <Pressable onPress={() => dispatch(setGuideVisiblityFalse())}>
                            <CloseButton />
                        </Pressable>
                    </Layout>

                    <Layout style={styles.innerContainer}>
                        {props.guideInfo.avatar != " " &&
                            props.guideInfo.avatar != undefined &&
                            props.guideInfo.avatar != null ? (
                            <Image
                                source={{ uri: CDN + props.guideInfo.avatar }}
                                style={styles.profileImage}
                            />
                        ) : (
                            <Image
                                source={require('../../../assets/image/Chat/guideGray.png')}
                                style={styles.profileImage}
                            />
                        )}
                        <Layout style={styles.nameContainer}>
                            <Layout style={styles.locationContainer}>
                                <Location />
                                <Text style={styles.locationText}>HONGDAE</Text>
                            </Layout>
                            <Text
                                style={styles.guideNameText}>
                                {props.guideInfo.guide.name}
                            </Text>
                        </Layout>
                    </Layout>


                    <Layout style={styles.infoContainer}>

                        <Layout style={styles.infoItemContainer}>
                            <Text style={styles.keyTextStyle}>Language</Text>
                            <Text style={styles.valTextStyle}>
                                {props.guideInfo.guide.lang && (props.guideInfo.guide.lang[0] && 'English ')}
                                {props.guideInfo.guide.lang && (props.guideInfo.guide.lang[1] && '中文')}
                            </Text>
                        </Layout>

                        <Layout style={styles.infoItemContainer}>
                            <Text style={styles.keyTextStyle}>Nationality</Text>
                            <Text style={styles.valTextStyle}>{props.guideInfo.guide.country}</Text>
                        </Layout>

                        <Layout style={styles.infoItemContainer}>
                            <Text style={styles.keyTextStyle}>Chat Type</Text>
                            <Text style={[styles.valTextStyle, { flex: 1 }]}>
                                Group Chat
                            </Text>
                            <Layout style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
                                <Text style={styles.keyTextStyle}>Max</Text>
                                <Text style={styles.valTextStyle}>{props.guideInfo.maxUserNum}</Text>
                            </Layout>
                        </Layout>

                        <Layout style={styles.infoItemContainer}>
                            <Text style={styles.keyTextStyle}>Service Time</Text>
                            <Layout style={{ flex: 2, flexDirection: 'row' }}>
                                <Text style={styles.valTextStyle}>10 AM ~ 7 PM</Text>
                                <Text style={[styles.valTextStyle, { flex: 2, color: '#ccc' }]}>(GMT+9)</Text>
                            </Layout>
                        </Layout>

                        <Layout style={styles.introContainer}>
                            <Text style={styles.oneLineIntro}>
                                {props.guideInfo.oneLineIntro}
                            </Text>

                            <Text style={styles.intro}>
                                {props.guideInfo.intro}
                            </Text>
                        </Layout>

                        {(props.guideInfo.guide.keyword) && (
                            <Layout style={{ marginTop: 20, alignItems: 'center' }}>
                                <FlatList
                                    data={props.guideInfo.guide.keyword}
                                    renderItem={renderItem}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    scrollEnabled={false}
                                />
                            </Layout>
                        )}

                        <Layout style={styles.limitContainer}>
                            <PersonIcon />
                            <Text style={styles.limitNumber}>{props.guideInfo.maxUserNum - props.guideInfo.users.length} </Text>
                            <Text style={styles.limitText}>more people can join this chat</Text>
                        </Layout>

                        <Pressable disabled={availableUsers == 0} style={styles.buttonContainer} onPress={() => onPressEnterButton()}>
                            {price.discountPrice == 0 ? (
                                availableUsers == 0 ?
                                    // 무료방 꽉찼을때
                                    <GroupDisabledButton price={price.price} discountPrice={price.discountPrice} />
                                    :
                                    <GroupAvailableButton price={price.price} discountPrice={price.discountPrice} />
                            ) : (
                                availableUsers == 0 ?
                                    <PrivateDisabledButton price={price.price} discountPrice={price.discountPrice} />
                                    :
                                    <PrivateAvailableButton price={price.price} discountPrice={price.discountPrice} />
                            )}
                        </Pressable>


                    </Layout>

                </Layout>
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
        paddingHorizontal: windowWidth * 0.05,
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
        fontSize: Platform.OS === 'ios' ? 14 : 12,
        flex: 2,
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
        backgroundColor: '#efefef',
        width: windowWidth * 0.35,
        alignItems: 'center',
        justifyContent: 'center'
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
        marginTop: 30,
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
        marginTop: 10,
    },
    sideSpace: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0000'
    },
    costInfo: {
        backgroundColor: 'white',
        borderRadius: 50,
        paddingVertical: 7,
        paddingHorizontal: 4,
    },
    infoItemContainer: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'flex-end'
    }
});