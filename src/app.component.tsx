import React from 'react';
import { LogBox, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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

export default (): React.ReactFragment => {
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
            if (user) {
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
                console.log('user logout');
            }
        });
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
                customMapping={mapping}>
                <SafeAreaProvider>
                    <AuthContext.Provider value={userValue}>
                        <ChatContext.Provider value={value}>
                            <NavigationContainer>
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
