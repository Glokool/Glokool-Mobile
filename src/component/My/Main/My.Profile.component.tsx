import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import { Korean, Traveler, Resident } from '../../../assets/icon/Common';
import { MyScreenProps } from '../../../navigation/ScreenNavigator/My.navigator';
import { SceneRoute } from '../../../navigation/app.route';

export const MyProfile = (props: MyScreenProps) => {

    const [userType, setUserType] = useState();

    useEffect(() => {
        InitUserInfo();
    }, [])

    // userinfo 에서 usertype 알기 위해서 받아옴
    const InitUserInfo = async () => {
        const response = await firestore()
            .collection('Users')
            .doc(props.currentUser?.uid)
            .get();

        if (response.data() != undefined) {
            setUserType(response.data()?.type);
        }
    }

    return (
        <TouchableOpacity onPress={()=>props.navigation.navigate(SceneRoute.MY_PROFILE)}>
            <View style={styles.ProfileContainer}>
                {/* 프로필 이미지 */}
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

                {/* 유저 타입 */}
                <View style={{ marginTop: 10, }}>
                    {userType === 'Korean' ? (
                        <Korean />
                    ) : userType === 'Resident' ? (
                        <Resident />
                    ) : (
                        <Traveler />
                    )}
                </View>

                {/* 이름 */}
                <Text style={styles.profileTitle}>
                    {props.currentUser.displayName}
                </Text>

            </View>
        </TouchableOpacity>
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
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 23,
        color: 'black',
        marginTop: 10,
    },
});