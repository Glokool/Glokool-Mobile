/* 
    Welcome to the Glokool Application Source Code
    Made By KBS

    Start Date : 2020.12.01

    Subscriped By Typescript
*/

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import App from './src/app.component';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('백그라운드에서 메시지를 받습니다', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
