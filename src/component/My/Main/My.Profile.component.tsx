import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import { Korean, Traveler, Resident } from '../../../assets/icon/Common';
import { MyScreenProps } from '../../../navigation/ScreenNavigator/My.navigator';

export const MyProfile = (props: MyScreenProps) => {

    const [userType, setUserType] = useState();

    useEffect(() => {
        InitUserInfo();
    }, [])

    const InitUserInfo = async () => {
        const response = await firestore()
            .collection('Users')
            .doc(props.currentUser?.uid)
            .get();

        if (response.data() != undefined) {
            setUserType(response.data().type);
        }
    }

    return (
        <View style={styles.ProfileContainer}>
            {props.currentUser.photoURL === '' ||
                props.currentUser.photoURL === null ||
                props.currentUser.photoURL === undefined ? (
                <Image
                    source={require('../../assets/profile/profile_01.png')}
                    style={styles.profileImage}
                />
            ) : (
                <Image
                    source={{ uri: props.currentUser.photoURL }}
                    style={styles.profileImage}
                />
            )}

            <View style={{ marginTop: 10, }}>
                {userType === 'Korean' ? (
                    <Korean />
                ) : userType === 'Resident' ? (
                    <Resident />
                ) : (
                    <Traveler />
                )}
            </View>

            <Text style={styles.profileTitle}>
                {props.currentUser.displayName}
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