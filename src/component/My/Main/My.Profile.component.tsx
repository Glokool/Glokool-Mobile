import React, { useContext, useState } from 'react';
import {
    StyleSheet,
    Image,
} from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { AuthContext } from '../../../context/AuthContext';
import { Korean, Traveler, Resident } from '../../../assets/icon/Common';
import firestore from '@react-native-firebase/firestore';

export const MyProfile = (props) => {

    const { currentUser } = useContext(AuthContext);

    const [userInfo, setUserInfo] = useState();

    const InitUserInfo = async () => {
        const response = await firestore()
            .collection('Users')
            .doc(currentUser?.uid)
            .get();
        
        response._data && setUserInfo(response._data);
    }

    return (
        <Layout style={styles.ProfileContainer}>
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

            {/* <Layout style={{ marginTop: 10, }}>
                {props.userInfo.type === 'Korean' ? (
                    <Korean />
                ) : props.userInfo.type === 'Resident' ? (
                    <Resident />
                ) : (
                    <Traveler />
                )}
            </Layout> */}

            <Text style={styles.profileTitle}>
                {currentUser.displayName}
            </Text>


        </Layout>
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