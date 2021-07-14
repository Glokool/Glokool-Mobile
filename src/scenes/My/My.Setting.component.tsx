import React, { useContext } from 'react';
import auth from '@react-native-firebase/auth';
import {
    Platform,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { Layout, LayoutElement, Text, Modal } from '@ui-kitten/components';
import { MYSettingProps } from '../../navigation/ScreenNavigator/My.navigator';
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route';
import {
    Profile,
    Logout,
    CustomerService,
    Privacy,
} from '../../assets/icon/My';
import { AngleLeft } from '../../assets/icon/Common';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/AuthContext';
const windowWidth = Dimensions.get('window').width;

export const MySetting = (props: MYSettingProps): LayoutElement => {
    const { setCurrentUser } = useContext(AuthContext);

    const [logoutvisible, setLogoutvisible] = React.useState(false);

    const PressBack = () => {
        props.navigation.goBack();
    };

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
        setLogoutvisible(true);
    };

    return (
        <Layout style={styles.mainContainer}>
            <Layout style={{ height: 100 }} />

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

            {/*탭바 표현*/}
            <Layout style={{ position: 'absolute', top: 0, width: '100%' }}>
                <SafeAreaView style={{ flex: 0 }} />

                <Layout
                    style={
                        Platform.OS === 'android'
                            ? styles.TabbarAndroid
                            : styles.Tabbar
                    }>
                    <TouchableOpacity
                        onPress={() => PressBack()}
                        style={{
                            padding: 15,
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <SafeAreaView />
                        <AngleLeft style={{ padding: 10 }} />
                    </TouchableOpacity>

                    <Layout
                        style={{
                            flex: 3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: 25,
                        }}>
                        <SafeAreaView />
                        <Text style={styles.TextStyle}>SETTINGS</Text>
                    </Layout>

                    <Layout style={{ flex: 1 }} />
                </Layout>
            </Layout>

            <Modal visible={logoutvisible} backdropStyle={styles.backdrop}>
                <Layout style={styles.ModalLayout}>
                    <Text style={styles.ModalTxt}>
                        Are you sure {'\n'} you want to log out?
                    </Text>
                    <Layout style={styles.ModalBtnContainer}>
                        <TouchableOpacity
                            style={styles.ModalBtnCancel}
                            onPress={() => {
                                setLogoutvisible(false);
                            }}>
                            <Text style={styles.ModalTxtCancel}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.ModalBtnLogout}
                            onPress={() => PressLogout()}>
                            <Text style={styles.ModalTxtLogout}>Logout</Text>
                        </TouchableOpacity>
                    </Layout>
                </Layout>
            </Modal>
        </Layout>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    Tabbar: {
        position: 'absolute',
        top: 0,
        height: 50,
        width: '100%',
        flexDirection: 'row',
    },
    TabbarAndroid: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
    },
    Container: {
        flex: 10,
        backgroundColor: 'white',
        flexDirection: 'column',
        marginHorizontal: 30,
    },
    TextStyle: {
        fontFamily: 'IBMPlexSansKR-SemiBold',
        fontSize: 20,
    },
    TouchLayout: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 5,
        marginVertical: 15,
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
    ModalLayout: {
        width: windowWidth * 0.85,
        height: windowWidth * 0.85 * 0.57,
        borderRadius: 10,
        alignItems: 'center',
    },
    ModalTxt: {
        color: '#8797FF',
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 22,
        textAlign: 'center',
        marginTop: '10%',
        lineHeight: 27,
    },
    ModalBtnContainer: {
        flexDirection: 'row',
        height: windowWidth * 0.85 * 0.41 * 0.36,
        alignItems: 'flex-end',
        flex: 1,
        marginBottom: '5%',
        justifyContent: 'center',
        // borderWidth: 1,
    },
    ModalBtnCancel: {
        borderWidth: 1,
        borderColor: '#8797FF',
        borderRadius: 10,
        width: windowWidth * 0.85 * 0.41,
        height: windowWidth * 0.85 * 0.41 * 0.36,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ModalTxtCancel: {
        color: '#8797FF',
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 22,
    },
    ModalBtnLogout: {
        borderRadius: 10,
        backgroundColor: '#292434',
        width: windowWidth * 0.85 * 0.41,
        height: windowWidth * 0.85 * 0.41 * 0.36,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ModalTxtLogout: {
        textAlign: 'center',
        color: '#8797FF',
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 22,
    },
});
