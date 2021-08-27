import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Pressable, View, Text } from 'react-native';
import { Modal } from '@ui-kitten/components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { SceneRoute } from '../../navigation/app.route';

export const ProfileModal = (props: any) => {
    // props => guide. ENG CHN isVisible
    const [guideVisible, setGuideVisible] = useState(false);

    useEffect(() => {
        if (props.isVisible) {
            setGuideVisible(true);
        }
    })

    const helpButton = () => {
        props.navigation.navigate(SceneRoute.CHAT_HELP, {
            id: props.route.params.id,
            guide: {
                uid: props.route.params.guide.uid,
                name: props.route.params.guide.name,
            },
        });
        setGuideVisible(false);
    }

    return (
        <>
            < Modal
                style={{ padding: 20, width: '100%', }}
                visible={guideVisible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setGuideVisible(false)}
            >

                <View style={{ padding: 20, borderRadius: 15, backgroundColor: 'white' }}>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable onPress={() => helpButton()}>
                            <View style={styles.helpButtonContainer}>
                                <Text style={{ fontSize: 14, color: '#9b9b9b' }}>HELP</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={() => setGuideVisible(false)}>
                            <FontAwesomeIcon icon={faTimes} size={20} />
                        </Pressable>
                    </View>

                    <View style={styles.innerContainer}>
                        {props.guide.avatar != " " &&
                            props.guide.avatar != undefined &&
                            props.guide.avatar != null ? (
                            <Image
                                source={{ uri: props.guide.avatar }}
                                style={styles.profileImage}
                            />
                        ) : (
                            <Image
                                source={require('../../assets/profile/profile_01.png')}
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
                            <Text style={styles.valTextStyle}>{props.ENG ? 'English' : null} {props.CHN || props.CHN != '' ? '中文' : null} {props.CHN}</Text>
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
        fontSize: 14,
        color: '#7777ff',
        fontWeight: 'bold',
        flex: 1,
    },
    valTextStyle: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 15,
        fontWeight: '400',
        flex: 2.5,
    },
    oneLineIntro: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 20,
        color: '#7777ff',
        fontWeight: 'bold',
    },
    intro: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 15,
        fontWeight: '400',
        marginTop: 15,
    },
    introContainer: {
        marginTop: 35,
    },
    infoContainer: {
        paddingHorizontal: 15,
        paddingBottom: 45,
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
    }
});