import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, Pressable, } from 'react-native';
import { Layout, Text, Modal } from '@ui-kitten/components';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export const ProfileModal = (props: any) => {
    // props => guide. ENG CHN isVisible
    const [guideVisible, setGuideVisible] = useState(false);

    useEffect(() => {
        if (props.isVisible) {
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
                    </Layout>

                    <Layout
                        style={styles.innerContainer}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: 'black',
                            }}>
                            {props.guide.name}
                        </Text>

                    </Layout>

                    <Layout
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginVertical: 10,
                        }}>
                        <Text style={styles.textStyle}>
                            {props.guide.gender} /{' '}
                            {props.guide.country} /{' '}
                            {moment(props.guide.birthDate).toDate().getFullYear()}
                        </Text>
                        <Text style={styles.textStyle}>
                            Language : {props.ENG ? 'props.ENG' : null} {props.ENG && props.CHN ? ' / props.CHN' : props.CHN ? 'props.CHN' : null}
                        </Text>
                        <Text style={styles.textStyle}>
                            Intro : {props.guide.intro}
                        </Text>
                        <Text style={styles.textStyle}>
                            oneLineIntro : {props.guide.oneLineIntro}
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
    },
    textStyle: {
        fontSize: 12,
        color: 'black',
    }
});