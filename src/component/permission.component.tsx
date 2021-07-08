import { PermissionsAndroid, Platform } from 'react-native';

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
        }
    } catch (err) {
        console.warn(err);
    }
};

export { requestCameraPermission, requestStoragePermission };
