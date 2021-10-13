import React from 'react';
import { StyleSheet, Image, Pressable, Text, Platform } from 'react-native';
import { Layout, Modal } from '@ui-kitten/components';
import { CloseButton } from '../../../assets/icon/Series';

import { CDN, SERVER } from '../../../server.component';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../model';
import { setGuideVisiblityFalse } from '../../../model/Chat/Chat.Setting.model';
import { Location } from '../../../assets/icon/Common';

export const GuideModal = (props: any) => {

    const guideVisible = useSelector((state: RootState) => state.ChatSettingUIModel.guideVisiblity);
    const dispatch = useDispatch();

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
            <Modal
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

                        <Image
                            source={require('../../../assets/image/Chat/guideGray.png')}
                            style={styles.profileImage}
                        />

                        <Layout style={styles.nameContainer}>
                            <Layout style={styles.locationContainer}>
                                <Location />
                                <Text style={styles.locationText}>HONGDAE</Text>
                            </Layout>
                            <Text style={styles.guideNameText}>
                                Sarah
                            </Text>
                        </Layout>
                    </Layout>


                    <Layout style={styles.infoContainer}>

                        <Layout style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={styles.keyTextStyle}>Language</Text>
                            <Text style={styles.valTextStyle}>English</Text>
                        </Layout>

                        <Layout style={{ flexDirection: 'row', marginTop: 3, alignItems: 'flex-end' }}>
                            <Text style={styles.keyTextStyle}>Nationality</Text>
                            <Text style={styles.valTextStyle}>South Korea</Text>
                        </Layout>

                        <Layout style={{ flexDirection: 'row', marginTop: 3, alignItems: 'flex-end' }}>
                            <Text style={styles.keyTextStyle}>Chat Type</Text>
                            <Text style={[styles.valTextStyle, { flex: 1 }]}>
                                Group Chat
                            </Text>
                            <Layout style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
                                <Text style={styles.keyTextStyle}>Max</Text>
                                <Text style={styles.valTextStyle}>10</Text>
                            </Layout>
                        </Layout>

                        <Layout style={styles.introContainer}>
                            <Text style={styles.oneLineIntro}>
                                안녕하세요 이제 꺼져요
                            </Text>

                            <Text style={styles.intro}>
                                제곧내
                            </Text>
                        </Layout>

                        {/* keyword 에 다른 값이 들어와서 잠시 주석처리 */}
                        {/* <Layout style={{ marginTop: 20, alignItems: 'center' }}>
                            <FlatList
                                data={props.guide.keyword.slice(0,2)}
                                renderItem={renderItem}
                                horizontal
                                scrollEnabled={false}
                            />
                        </Layout> */}


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
    }
});