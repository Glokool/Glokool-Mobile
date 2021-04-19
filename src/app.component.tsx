import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  IconRegistry,
} from '@ui-kitten/components';
import { default as mapping } from '../mapping.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation/app.navigator';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { default as theme } from './theme.json';
import SplashScreen from 'react-native-splash-screen'



const saveTokenToDatabase = async(token : any) => {

  const userId = auth().currentUser?.uid;

  // 토큰 정리 (firebase에 저장)
  await firestore()
    .collection('Users')
    .doc(userId)
    .update({
      tokens: firestore.FieldValue.arrayUnion(token),
    });
};

export default(): React.ReactFragment => {
  React.useEffect(() => {
    
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging()
      .getToken()
      .then(token => {
        return saveTokenToDatabase(token);
    });

    setTimeout(() => {
      SplashScreen.hide();
    }, 2000)
    
    return () => {
      unsubscribe;
      messaging().onTokenRefresh(token => {
        saveTokenToDatabase(token);
      });
    }
  }, [])
  
  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...theme}}
        customMapping={mapping}
        >
        <SafeAreaProvider>
          <NavigationContainer>
            <AppNavigator/>
          </NavigationContainer>
        </SafeAreaProvider>
      </ApplicationProvider>
    </React.Fragment>
  );
};

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreLogs(['WARN: ...']);