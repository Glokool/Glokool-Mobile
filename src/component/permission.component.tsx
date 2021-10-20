import { PermissionsAndroid, Platform } from 'react-native';
import { PERMISSIONS, check, request, RESULTS } from 'react-native-permissions'
import messaging from '@react-native-firebase/messaging';


const requestNotificationsPermission = async () => {
    try {
        if (Platform.OS === 'ios') {
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                console.log('Authorization status:', authStatus);
            }
        }
    } catch (err) {
        console.warn(err);
    }
}

const requestCameraPermission = async () => {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return { granted: 1 };
            } else {
                return { granted: 0 };
            }
        }
        else {
            const res = await check(PERMISSIONS.IOS.CAMERA);

            if (res === RESULTS.GRANTED) {
                return { granted: 1 };
            } else if (res === RESULTS.DENIED) {
                const res2 = await request(PERMISSIONS.IOS.CAMERA);
                if (res2 === RESULTS.GRANTED) {
                    return { granted: 1 }
                } else {
                    return { granted: 0 }
                }
            }
        }
    } catch (err) {
        console.warn(err);
    }
};

const requestStoragePermission = async () => {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'storage  Permission',
                    message: 'so you can select awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return { granted: 1 };
            } else {
                return { granted: 0 };
            }
        } else {
            const res = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);

            if (res === RESULTS.GRANTED) {
                return { granted: 1 };
            } else if (res === RESULTS.DENIED) {
                const res2 = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
                if (res2 === RESULTS.GRANTED) {
                    return { granted: 1 }
                } else {
                    return { granted: 0 }
                }
            }
        }
    } catch (err) {
        console.warn(err);
    }
};

export { requestCameraPermission, requestStoragePermission, requestNotificationsPermission };
