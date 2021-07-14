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
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { default as theme } from './theme.json';
import SplashScreen from 'react-native-splash-screen';
import { ChatContext } from './context/ChatContext';
import { AuthContext } from './context/AuthContext';
import { requestNotificationsPermission } from './component/permission.component';


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

    React.useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                const userInfo = {
                    displayName: user?.displayName,
                    email: user?.email,
                    photoURL: user?.photoURL,
                    uid: user?.uid,
                };

                setCurrentUser(userInfo);
            } else {
                console.log('user logout');
            }
        });
    }, []);

    const [onChat, setChatIcon] = React.useState(false);
    const value = { onChat, setChatIcon };

    React.useEffect(() => {

        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            setChatIcon(true);
            // Alert.alert(
            //     'A new FCM message arrived!',
            //     JSON.stringify(remoteMessage),
            // );
        });
        
        // Noti 권한 허용
        requestNotificationsPermission()

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
