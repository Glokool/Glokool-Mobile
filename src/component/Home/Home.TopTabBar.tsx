import React, { useContext } from 'react';
import {
    TouchableOpacity,
    SafeAreaView,
    Image,
    StyleSheet,
    Platform,
} from 'react-native';
import { Layout, LayoutElement, Text } from '@ui-kitten/components';
import { Logo } from '../../assets/icon/Home';
import { NavigatorRoute } from '../../navigation/app.route';
import { HomeTopTabBarProps } from '../../navigation/ScreenNavigator/Home.navigator';
import { AuthContext } from '../../context/AuthContext';
import { TextLogo } from '../../assets/icon/Home';

export const HomeTopTabBar = (props: HomeTopTabBarProps): LayoutElement => {
    
    const { currentUser } = useContext(AuthContext);
    
    const name =
        currentUser?.displayName === null || currentUser?.displayName === ''
            ? 'Glokool'
            : currentUser?.displayName;

    function PressLoginButton() {
        if (currentUser === null) {
            props.navigation.navigate(NavigatorRoute.AUTH);
        } else {
            props.navigation.navigate(NavigatorRoute.MY);
        }
    }

    function PressUserPhoto() {
        props.navigation.navigate(NavigatorRoute.MY);
    }

    return (
        <Layout style={styles.TopTabBarContainer}>
            
            {/* <Image source={require('../../assets/icon/Home/textLogo.png')}/> */}
            <TextLogo/>
           

            <Layout
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#00FF0000',
                    marginVertical: 10,
                }}>
                {/* <SafeAreaView style={{ flex: 0 }} /> */}
                <Layout
                    style={{
                        flexDirection: 'row',
                        backgroundColor: '#00FF0000',
                    }}>
                    <Layout
                        style={styles.LoginButtonContainer}
                        onTouchStart={() => PressLoginButton()}>
                        {currentUser != null ? (
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'BrandonGrotesque-Medium',
                                    marginHorizontal: 5,
                                    maxWidth: 120,
                                }}
                                numberOfLines={1}>{`${name}`}</Text>
                        ) : (
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'BrandonGrotesque-Medium',
                                    color: '#B8B7B5',
                                    marginHorizontal: 5,
                                }}>{`LOGIN`}</Text>
                        )}
                    </Layout>

                    <TouchableOpacity
                        onPress={() => PressUserPhoto()}
                        style={{ backgroundColor: '#00FF0000' }}>
                        {currentUser != null ? (
                            currentUser.photoURL === '' ||
                            currentUser.photoURL === null ||
                            currentUser.photoURL === undefined ? (
                                <Layout
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 50,
                                        backgroundColor: '#D2D2D2',
                                    }}
                                />
                            ) : (
                                <Image
                                    source={{ uri: currentUser.photoURL }}
                                    style={{
                                        width: 34,
                                        height: 34,
                                        borderRadius: 50,
                                        backgroundColor: '#00FF0000',
                                    }}
                                />
                            )
                        ) : (
                            <Layout
                                style={{
                                    width: 34,
                                    height: 34,
                                    borderRadius: 50,
                                    backgroundColor: '#D2D2D2',
                                }}
                            />
                        )}
                    </TouchableOpacity>
                </Layout>
            </Layout>
        </Layout>
    );
};

const styles = StyleSheet.create({
    TopTabBarContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        paddingHorizontal: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#00ff0000',
    },
    LogoContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#00FF0000',
    },
    LoginButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        backgroundColor:'#00ff0000'
    },
});
