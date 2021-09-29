import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text
} from 'react-native';
import { AuthContext } from '../../../context/AuthContext';

import firestore from '@react-native-firebase/firestore';
import { FirebaseUserInfo } from '../../../types';

import { Korean, Traveler, Resident } from '../../../assets/icon/Common';

export const MyProfile = () => {

    const { currentUser } = useContext(AuthContext);

    const [userInfo, setUserInfo] = useState<FirebaseUserInfo>({
        type: '',
        avatar: '',
        birthDate: new Date(),
        country: '',
        email: '',
        gender: '',
        name: '',
        signupDate: new Date(),
    });

    useEffect(() => {
        InitUserInfo();
    }, [])

    const InitUserInfo = async () => {
        const response = firestore()
            .collection('Users')
            .doc(currentUser?.uid)
            .get();

        if (response._data != undefined) {
            setUserInfo(response._data);
        }
    }

    return (
        <View style={styles.ProfileContainer}>
            {currentUser.photoURL === '' ||
                currentUser.photoURL === null ||
                currentUser.photoURL === undefined ? (
                <Image
                    source={require('../../assets/profile/profile_01.png')}
                    style={styles.profileImage}
                />
            ) : (
                <Image
                    source={{ uri: currentUser.photoURL }}
                    style={styles.profileImage}
                />
            )}

            <View style={{ marginTop: 10, }}>
                {userInfo.type === 'Korean' ? (
                    <Korean />
                ) : userInfo.type === 'Resident' ? (
                    <Resident />
                ) : (
                    <Traveler />
                )}
            </View>

            <Text style={styles.profileTitle}>
                {currentUser.displayName}
            </Text>


        </View>
    )
}

const styles = StyleSheet.create({
    ProfileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    profileImage: {
        width: 75,
        height: 75,
        borderRadius: 50,
    },
    profileTitle: {
        fontSize: 23,
        color: 'black',
        marginTop: 10,
    },
});