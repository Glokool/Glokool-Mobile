import React, { useContext, } from 'react';
import {
    TouchableOpacity,
    Image,
    StyleSheet,
    Platform,
} from 'react-native';
import { Layout, LayoutElement, Text } from '@ui-kitten/components';
import { NavigatorRoute } from '../../navigation/app.route';
import { AuthContext } from '../../context/AuthContext';
import { TextLogo, LoginIcon } from '../../assets/icon/Home';
import { useNavigation } from '@react-navigation/core';

export const HomeTopTabBar = (): LayoutElement => {

    const navigation = useNavigation();
    const { currentUser } = useContext(AuthContext);

    const name =
        currentUser?.displayName === null || currentUser?.displayName === ''
            ? 'Glokool'
            : currentUser?.displayName;

    function PressLoginButton() {
        if (currentUser === null) {
            navigation.navigate(NavigatorRoute.AUTH);
        } else {
            navigation.navigate(NavigatorRoute.MY);
        }
    }

    return (
        <Layout style={styles.TopTabBarContainer}>

            <TextLogo />

            <Layout style={styles.UserContainer}>
                <Layout style={styles.LoginButtonContainer} onTouchEnd={() => PressLoginButton()}>
                    {currentUser != null ? (
                        <Text style={styles.UserText} numberOfLines={1}>
                            {`${name}`}
                        </Text>
                    ) : (
                        <Text
                            style={[styles.UserText, { color: '#B8B7B5' }]}>{`LOGIN`}</Text>
                    )}
                </Layout>

                <TouchableOpacity
                    onPress={() => PressLoginButton()}
                    style={{ backgroundColor: '#00FF0000' }}>
                    {currentUser != null ? (
                        currentUser?.photoURL === '' ||
                            currentUser.photoURL === null ||
                            currentUser.photoURL === undefined ? (
                            <LoginIcon />
                        ) : (
                            <Image
                                source={{ uri: currentUser.photoURL }}
                                style={[styles.UserImage, { backgroundColor: '#00ff0000' }]}
                            />
                        )
                    ) : (
                        <LoginIcon />
                    )}
                </TouchableOpacity>
            </Layout>
        </Layout >
    );
};

const styles = StyleSheet.create({
    TopTabBarContainer: {
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        paddingHorizontal: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#00ff0000',
    },
    LoginButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        backgroundColor: '#00ff0000'
    },
    UserText: {
        fontSize: 16,
        fontFamily: 'BrandonGrotesque-Medium',
        marginHorizontal: 5,
    },
    UserContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00FF0000',
        marginVertical: 10,
        flexDirection: 'row',
    },
    UserImage: {
        width: 34,
        height: 34,
        borderRadius: 50,
    }
});
