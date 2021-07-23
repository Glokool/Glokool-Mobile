import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, FlatList, TouchableOpacity, Image, Pressable, Alert } from 'react-native';
import { Layout, Text, LayoutElement, Modal } from '@ui-kitten/components';
import { ChatListNowProps } from '../../navigation/ScreenNavigator/Chat.navigator';
import axios from 'axios';
import { SERVER } from '../../server.component';
import { GloChatData } from '.';
import moment from 'moment';
import { SceneRoute } from '../../navigation/app.route';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export const ProfileModal = ({ guide, ENG, CHN, isVisible }) => {

    const [guideVisible, setGuideVisible] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setGuideVisible(true);
        }
    })

    return (
        <>
            < Modal
                visible={guideVisible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setGuideVisible(false)}>
                <Layout style={{ padding: 20, borderRadius: 15 }}>
                    <Layout style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Pressable onPress={() => setGuideVisible(false)}>
                            <FontAwesomeIcon icon={faTimes} size={20} />
                        </Pressable>
                    </Layout>

                    <Layout
                        style={styles.innerContainer}>
                        {guide.avatar != " " &&
                            guide.avatar != undefined &&
                            guide.avatar != null ? (
                            <Image
                                source={{ uri: guide.avatar }}
                                style={styles.profileImage}
                            />
                        ) : (
                            <Image
                                source={require('../../assets/profile/profile_01.png')}
                                style={styles.profileImage}
                            />
                        )}
                    </Layout>

                    <Layout
                        style={styles.innerContainer}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: 'black',
                            }}>
                            {guide.name}
                        </Text>

                    </Layout>

                    <Layout
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginVertical: 10,
                        }}>
                        <Text style={{ fontSize: 12, color: 'black' }}>
                            {guide.gender} /{' '}
                            {guide.country} /{' '}
                            {moment(guide.birthDate).toDate().getFullYear()}
                        </Text>
                        <Text
                            style={{ fontSize: 12, color: 'black' }}>
                            Language : {ENG ? 'ENG' : null} {ENG && CHN ? ' / CHN' : CHN ? 'CHN' : null}
                        </Text>
                        <Text
                            style={{ fontSize: 12, color: 'black' }}>
                            Intro : {guide.intro}
                        </Text>
                        <Text
                            style={{ fontSize: 12, color: 'black' }}>
                            oneLineIntro : {guide.oneLineIntro}
                        </Text>
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
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    profileImage: {
        width: 165,
        height: 165,
        borderRadius: 100,
        borderColor: '#ccc',
        borderWidth: 0.5,
    }
});