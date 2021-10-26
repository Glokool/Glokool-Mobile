import React from 'react';
import auth from '@react-native-firebase/auth';
import { Pressable, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { ArrowLeft } from '../../../assets/icon/Common';
import { ChatReportSceneProps } from '../../../navigation/SceneNavigator/Chat.navigator';
import FastImage from 'react-native-fast-image';
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';
import { SERVER } from '../../../server.component';
import axios from 'axios';



export const ReportTopTabBar = (props : any) : React.ReactElement => {

    const prop : ChatReportSceneProps = props.props;
    const input = props.value;

    const PressBackButton = () => {
        prop.navigation.goBack();
    }

    const PressSend = () => {

        const ChatRoomID = prop.route.params.id;
        const userUID = prop.route.params.user.uid;
        
        
        if (input == '') { Alert.alert('Report Error','Please enter contents') }
        else {
            
            const AuthToken = auth().currentUser?.getIdToken()
                .then((token) => {

                    const data = {
                        content: input,
                        chatRoomCode: ChatRoomID,
                        user: userUID
                    }

                    const options = {
                        method : 'POST',
                        url : SERVER + '/api/reports',
                        data : JSON.stringify(data),
                        headers: {
                            Authorization: 'Bearer ' + token,
                        },
                    }

                    axios(options)
                        .then((response) => {
                            prop.navigation.goBack();
                        })
                        .catch((e) => {
                            console.log('신고 기능 서버 저장 실패 ! : ', e);
                        })
                })
                .catch((error) => {
                    console.log('Firebase Auth Token Error : ', error)
                })



        }
    }

    return (
        <Layout style={styles.TopTabBar}>

            <SafeAreaView style={{flex: 0}}/>

            <Layout style={styles.MainContainer}>            
                <Pressable
                    style={styles.LeftIcon}
                    onPress={() => {PressBackButton()}}>
                    <ArrowLeft />
                </Pressable>

                <Layout style={styles.TitleContainer}>
                    <Text style={styles.Title}>REPORT</Text>
                </Layout>

                <Pressable style={styles.RightIcon} onPress={() => {PressSend()}}>
                    <FastImage source={require('../../../assets/image/Chat/SendButton.png')} style={styles.RightButton}/>
                </Pressable>
            </Layout>     
        </Layout>
       

    );
}

const styles = StyleSheet.create({

    TopTabBar : {
        position: 'absolute',
        width: '100%',
        top: isIphoneX()? getStatusBarHeight() : 0,
        height: 60,
        justifyContent: 'center',
    },

    MainContainer : {
        flexDirection: 'row',
        position: 'absolute',
        width: '100%',
        top: 0,
        height: 60,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderBottomWidth : 1,
        borderBottomColor : '#F0F0F0'
    },

    TitleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    Title: {
        fontFamily : 'BrandonGrotesque-Bold',
        fontSize: 16,
        color: 'black',
        textAlign : 'center'
    },

    
    LeftIcon : {
        width: 64,
        height : 10,
        marginHorizontal: 5,
        padding : 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },

    RightIcon : {
        width: 64,
        height : 32,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },

    RightButton : {
        width : 64,
        height : 32
    }

})