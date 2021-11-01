import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as mapping } from '../mapping.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation/App.navigator';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { default as theme } from './theme.json';
import SplashScreen from 'react-native-splash-screen';
import { ChatContext } from './context/ChatContext';
import { AuthContext } from './context/AuthContext';
import { requestNotificationsPermission } from './component/Permissions.component';
import linking from './linking';
import { createStore } from 'redux';
import rootReducer from './model';
import { Provider } from 'react-redux';
import { ChatCountContext, ChatCountState } from './context/ChatCount.context';


const saveTokenToDatabase = async (token: any) => {

    const userId = auth().currentUser?.uid;

    if (userId != undefined) {
        firestore()
            .collection('Users')
            .doc(userId)
            .update({
                tokens: firestore.FieldValue.arrayUnion(token),
            });
    }

};

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});


export default (props: any): React.ReactFragment => {

    const [currentUser, setCurrentUser] = React.useState(null);
    const userValue = { currentUser, setCurrentUser };

    const [onChat, setChatIcon] = React.useState(false);
    const value = { onChat, setChatIcon };

    const [chatCount, setChatCount ] = React.useState<Array<ChatCountState>>([]);
    const count = { chatCount, setChatCount };

    const store = createStore(rootReducer);

    
    React.useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user?.providerData[0].providerId == "password" || user?.providerData[0].providerId == null) {
                if (user && user?.emailVerified) {
                    const userInfo = {
                        displayName: user?.displayName,
                        email: user?.email,
                        photoURL: user?.photoURL,
                        uid: user?.uid,
                        access_token: null,
                    };

                    setCurrentUser(userInfo);

                } else {
                    auth().signOut;
                }
            } else {
                const userInfo = {
                    displayName: user?.displayName,
                    email: user?.email,
                    photoURL: user?.photoURL,
                    uid: user?.uid,
                    access_token: null,
                };

                setCurrentUser(userInfo);

            }
        });
    }, []);

    React.useEffect(() => {
        const unsubscribe = messaging().onMessage(async(remoteMessage) => {

            AsyncStorage.setItem('ChatCheck', 'true');
            AsyncStorage.setItem(`ChatCheck_${remoteMessage.data?.roomId}`, remoteMessage.data?.time);

            setChatIcon(true);
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
        }, 500);

        return () => {
            unsubscribe;
            messaging().onTokenRefresh((token) => {
                saveTokenToDatabase(token);
            });
        };
    }, []);

    return (
        <Provider store={store}>
            <React.Fragment>
                <IconRegistry icons={EvaIconsPack} />
                <StatusBar barStyle={Platform.OS === 'ios' ? "dark-content" : "default"}/>
                <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }} customMapping={mapping} >
                    <SafeAreaProvider>
                        <AuthContext.Provider value={userValue}>
                            <ChatCountContext.Provider value={count}>
                            <ChatContext.Provider value={value}>
                                <NavigationContainer linking={linking}>
                                    <AppNavigator key={'App'} type={'Glokool'} props={undefined} />
                                </NavigationContainer>
                            </ChatContext.Provider>
                            </ChatCountContext.Provider>
                        </AuthContext.Provider>
                    </SafeAreaProvider>
                </ApplicationProvider>
            </React.Fragment>
        </Provider>
    );
};

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    'Require cycle',
    'VirtualizedLists should never be nested',
    'VirtualizedList: missing keys for items',
    'No stops in gradient',
]);