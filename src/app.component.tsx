import React, { useEffect } from 'react';
import { LogBox, Alert, Linking } from 'react-native';
import { CommonActions, NavigationContainer, useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';
import {
    ApplicationProvider,
    IconRegistry,
    Layout,
} from '@ui-kitten/components';
import { default as mapping } from '../mapping.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation/app.navigator';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { default as theme } from './theme.json';
import SplashScreen from 'react-native-splash-screen';
import { ChatContext } from './context/ChatContext';
import { AuthContext } from './context/AuthContext';
import { requestNotificationsPermission } from './component/permission.component';
import axios from 'axios';
import { SERVER } from './server.component';
import linking from './linking';

const saveTokenToDatabase = async (token: any) => {

    const userId = auth().currentUser?.uid;

    // 토큰 정리 (firebase에 저장)
    await firestore()
        .collection('Users')
        .doc(userId)
        .update({
            tokens: firestore.FieldValue.arrayUnion(token),
        });
};

export default (props: any): React.ReactFragment => {
    const [currentUser, setCurrentUser] = React.useState(null);
    const userValue = { currentUser, setCurrentUser };
    const [onChat, setChatIcon] = React.useState(false);
    const value = { onChat, setChatIcon };

    const InitNowList = async () => {
        const user = auth().currentUser;

        const Token = await user?.getIdToken(true);
        const AxiosConfig = {
            method: 'get',
            url: SERVER + '/api/users/reservations/future',
            headers: {
                Authorization: 'Bearer ' + Token,
            },
        };
        const resData = await axios(AxiosConfig);
        if (resData.data.length > 0) {
            const chatID = resData.data[0]._id;

            database()
                .ref(`/chats/${chatID}/userUnreadCount`)
                .once('value')
                .then((snapshot) => {
                    const unreadMsgCount = snapshot.val();
                    if (unreadMsgCount > 0) {
                        setChatIcon(true);
                    }
                });
        }
    };

    React.useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if(user?.providerData[0].providerId == "password" || user?.providerData[0].providerId == null){
                if (user && user?.emailVerified) {
                    const userInfo = {
                        displayName: user?.displayName,
                        email: user?.email,
                        photoURL: user?.photoURL,
                        uid: user?.uid,
                        access_token: null,
                    };
    
                    setCurrentUser(userInfo);
    
                    InitNowList();
                } else {
                    auth().signOut;
                }
            }else{
                const userInfo = {
                    displayName: user?.displayName,
                    email: user?.email,
                    photoURL: user?.photoURL,
                    uid: user?.uid,
                    access_token: null,
                };

                setCurrentUser(userInfo);

                InitNowList();
            }
        });
        console.log('app.component end');
    }, []);

    const testURL = () => {
        Linking.getInitialURL()
            .then((url) => {
                console.log(url);
                Linking.openURL(url);
            })
    }


    React.useEffect(() => {
        //IOS && ANDROID : 앱이 딥링크로 처음 실행될때, 앱이 열려있지 않을 때
        // testURL();

        // // //IOS : 앱이 딥링크로 처음 실행될때, 앱이 열려있지 않을 때 && 앱이 실행 중일 때
        // // //ANDROID : 앱이 실행 중일 때
        // // // Linking.addEventListener('url', addListenerLink);
        // Linking.addEventListener('url', (e) => {// 앱이 실행되어있는 상태에서 요청이 왔을 때 처리하는 이벤트 등록
        //     const route = e.url.replace(/.*?:\/\//g, '');
        //     Alert.alert('add e.url', e.url);
        //     Linking.openURL(e.url);
        //     return;
        // });

        // return () => {
        //     Linking.removeEventListener('url', (e) => {		// 이벤트 해제
        //         console.log('remove')
        //     });
        // };
    }, []);

    React.useEffect(() => {
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            setChatIcon(true);
            // Alert.alert(
            //     'A new FCM message arrived!',
            //     JSON.stringify(remoteMessage),
            // );
        });

        // Noti 권한 허용
        requestNotificationsPermission();

        messaging()
            .getToken()
            .then((token) => {
                return saveTokenToDatabase(token);
            });

        setTimeout(() => {
            SplashScreen.hide();
        }, 2000);

        return () => {
            unsubscribe;
            messaging().onTokenRefresh((token) => {
                saveTokenToDatabase(token);
            });
        };
    }, []);

    return (
        <React.Fragment>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider
                {...eva}
                theme={{ ...eva.light, ...theme }}
                customMapping={mapping}

            >
                <SafeAreaProvider>
                    <AuthContext.Provider value={userValue}>
                        <ChatContext.Provider value={value}>
                            <NavigationContainer linking={linking}>
                                <AppNavigator />
                            </NavigationContainer>
                        </ChatContext.Provider>
                    </AuthContext.Provider>
                </SafeAreaProvider>
            </ApplicationProvider>
        </React.Fragment>
    );
};

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreLogs(['WARN: ...']);
