import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Pressable, StyleSheet, SafeAreaView, Alert, Text } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { ArrowLeft } from '../../../assets/icon/Common';
import { ChatReportSceneProps } from '../../../navigation/SceneNavigator/Chat.navigator';
import FastImage from 'react-native-fast-image';
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';
import { SERVER } from '../../../server.component';
import axios from 'axios';
import { windowHeight } from '../../../Design.component';
import { SendIcon_Text } from '../../../assets/icon/Chat';

export const ReportTopTabBar = (props: any): React.ReactElement => {

    const prop: ChatReportSceneProps = props.props;
    const input = props.value;

    const PressBackButton = () => {
        prop.navigation.goBack();
    }

    const PressSend = async() => {

        const ChatRoomID = prop.route.params.id;
        const userUID = prop.route.params.user.uid;

        if (input != '') { 
            const Reportdoc = await firestore().collection('Reports').doc(ChatRoomID)
            .update({
                users : firestore.FieldValue.arrayUnion({
                    user : prop.route.params.user.uid,
                    repoter : auth().currentUser?.uid, 
                    desc : input
                })
            })
                .then((result) => {
                    setTimeout(() => {
                        prop.navigation.goBack();
                    }, 2000)
                })
                .catch((err) => {
                    if(err.code === 'firestore/not-found') { 
                        firestore().collection('Reports').doc(ChatRoomID)
                            .set({
                                users : firestore.FieldValue.arrayUnion({
                                    user : prop.route.params.user.uid,
                                    repoter : auth().currentUser?.uid, 
                                    desc : input
                                })
                            })
                            .then((result) => {
                                setTimeout(() => {
                                    prop.navigation.goBack();
                                }, 2000)
                            })
                    }
                })
        
        }

        else { Alert.alert('Report Error', 'Please enter contents') }
    }

    return (
        <Layout style={styles.TopTabBar}>

            <SafeAreaView style={{ flex: 0 }} />

            <Layout style={styles.MainContainer}>
                <Pressable
                    style={styles.LeftIcon}
                    onPress={() => { PressBackButton() }}>
                    <ArrowLeft />
                </Pressable>

                <Layout style={styles.TitleContainer}>
                    <Text style={styles.Title}>REPORT</Text>
                </Layout>

                <Pressable style={styles.RightIcon} onPress={() => { PressSend() }}>
                    {/* <FastImage source={require('../../../assets/image/Chat/SendButton.png')} style={styles.RightButton}/> */}
                    <SendIcon_Text />
                </Pressable>
            </Layout>
        </Layout>

    );
}

const styles = StyleSheet.create({

    TopTabBar: {
        // position: 'absolute',
        width: '100%',
        // top: isIphoneX()? getStatusBarHeight() : 0,
        height: 60,
        justifyContent: 'center',
    },

    MainContainer: {
        flexDirection: 'row',
        position: 'absolute',
        width: '100%',
        top: 0,
        height: 60,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0'
    },

    TitleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    Title: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 18,
        color: 'black',
        textAlign: 'center'
    },


    LeftIcon: {
        width: 64,
        height: 10,
        marginHorizontal: 5,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },

    RightIcon: {
        width: 64,
        height: 32,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },

    RightButton: {
        width: 64,
        height: 32
    },
})