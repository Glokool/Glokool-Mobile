import React, { useContext } from 'react';
import auth from '@react-native-firebase/auth';
import {
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Alert,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { Layout, LayoutElement, Text } from '@ui-kitten/components';
import { MYSettingProps } from '../../navigation/ScreenNavigator/My.navigator';
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route';
import {
    Profile,
    Logout,
    CustomerService,
    Privacy,
} from '../../assets/icon/My';
import { AuthContext } from '../../context/AuthContext';
import { CommonTopTabBar } from '../../component/Common';

const windowWidth = Dimensions.get('window').width;

export const MySetting = (props: MYSettingProps): LayoutElement => {
    const { setCurrentUser } = useContext(AuthContext);

    const PressProfile = () => {
        props.navigation.navigate(SceneRoute.MY_PROFILE);
    };

    const PressPrivacy = () => {
        props.navigation.navigate(SceneRoute.PRIVACY_LOGIN);
    };

    const PressCustomer = () => {
        props.navigation.navigate(SceneRoute.CUSTOMER_SERVICE);
    };

    const PressLogout = () => {
        props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: NavigatorRoute.MAIN }],
            }),
        );

        setCurrentUser(null);
        auth().signOut();
    };

    const PressLogoutModal = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [{
                text: "Cancel",
                onPress: () => console.log("logout canceled"),
                style: "destructive"
            }, {
                text: "Logout",
                onPress: () => PressLogout(),
                style: "default"
            }]
        );
    };

    return (
        <Layout style={styles.mainContainer}>
            {/*탭바 표현*/}
            <CommonTopTabBar title={'SETTINGS'} navigation={props.navigation} />

            {/* 세팅 내용물*/}
            <Layout style={styles.Container}>
                <Layout style={styles.TouchLayout}>
                    <TouchableOpacity
                        style={styles.TouchableComponent}
                        onPress={PressProfile}>
                        <Layout style={styles.ButtonIcon}>
                            <Profile />
                        </Layout>

                        <Text style={styles.ButtonText}>Profile</Text>
                    </TouchableOpacity>
                </Layout>

                <Layout style={styles.TouchLayout}>
                    <TouchableOpacity
                        style={styles.TouchableComponent}
                        onPress={PressPrivacy}>
                        <Layout style={styles.ButtonIcon}>
                            <Privacy />
                        </Layout>

                        <Text style={styles.ButtonText}>Privacy</Text>
                    </TouchableOpacity>
                </Layout>

                <Layout style={styles.TouchLayout}>
                    <TouchableOpacity
                        style={styles.TouchableComponent}
                        onPress={PressCustomer}>
                        <Layout style={styles.ButtonIcon}>
                            <CustomerService />
                        </Layout>
                        <Text style={styles.ButtonText}>Customer Service</Text>
                    </TouchableOpacity>
                </Layout>

                <Layout style={styles.TouchLayout}>
                    <TouchableOpacity
                        style={styles.TouchableComponent}
                        onPress={PressLogoutModal}>
                        <Layout style={styles.ButtonIcon}>
                            <Logout />
                        </Layout>
                        <Text style={styles.ButtonText}>Logout</Text>
                    </TouchableOpacity>
                </Layout>

                <Layout style={{ flex: 8, flexDirection: 'column' }} />
            </Layout>

        </Layout>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    Tabbar: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    TabbarAndroid: {
        flexDirection: 'row',
        height: 50,
        width: '100%',
        marginBottom: 10,
    },
    Container: {
        flex: 10,
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    TextStyle: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 20,
    },
    TouchLayout: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 35,
        paddingVertical: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#f3f3f3',
    },
    TouchableComponent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    ButtonIcon: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 20,
        alignItems: 'center',
    },
    ButtonText: {
        flex: 9,
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 20,
    },
    IconStyle: {
        marginHorizontal: 25,
        justifyContent: 'center',
    },
    // modal
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
