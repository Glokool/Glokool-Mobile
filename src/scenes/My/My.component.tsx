import React, { useContext } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { getFocusedRouteNameFromRoute, useFocusEffect, useLinkTo } from '@react-navigation/native';
import {
    StyleSheet,
    Image,
    BackHandler,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    ActivityIndicator,
    Button,
    Linking,
    Platform
} from 'react-native';
import { Divider, Layout, LayoutElement, Text } from '@ui-kitten/components';
import { Korean, Resident, Traveler } from '../../assets/icon/UserType';
import { MyScreenProps } from '../../navigation/ScreenNavigator/My.navigator';
import { LoginCheck } from '../../component/Common';
import {
    Receipt,
    Receipt_Large,
    Setting_Btn,
    Comment_Btn,
    Bookmark_Btn,
} from '../../assets/icon/My';
import { HomeBG, } from '../../assets/icon/Home';
import axios from 'axios';
import { SERVER } from '../../server.component';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import { PaidDetail } from '../../component/My/PaidDetail';
import { ReservationInfo } from '../../types';
import { SceneRoute } from '../../navigation/app.route';
import Toast from 'react-native-easy-toast';
import { FirebaseUserInfo } from '../../types';
import { AuthContext } from '../../context/AuthContext';
import { alertWindow } from '../../component/Common/LoginCheck.component';

var toastRef: any;

const Screen = Dimensions.get('window').width;

export const MYScreen = (props: MyScreenProps): LayoutElement => {
    const { currentUser } = useContext(AuthContext);

    const [visible, setVisible] = React.useState<boolean>(false);
    const [detailData, setDetailData] = React.useState<ReservationInfo>();
    const [reservationInfo, setReservationInfo] = React.useState<
        Array<ReservationInfo>
    >([]);
    const [userInfo, setUserInfo] = React.useState<FirebaseUserInfo>({
        type: '',
        avatar: '',
        birthDate: new Date(),
        country: '',
        email: '',
        gender: '',
        name: '',
        signupDate: new Date(),
    });

    var exitApp: any = undefined;
    var timeout: any;

    const [loading, setLoading] = React.useState<boolean>(true);

    const [response, setResponse] = React.useState({});

    const seriesURL = "glokool://app/main/series";

    const linkTo = useLinkTo();

    const testOpenURL = async (route = props.route) => {
        //linkTo('/main');

        const flag = await Linking.openURL(seriesURL);
        console.log(flag);

        // const routeName = getFocusedRouteNameFromRoute(route);
        // console.log(props.navigation.goBack());
    }



    // 백핸들러 적용을 위한 함수
    const focusEvent = useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);

            return () => {
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    handleBackButton,
                );
            };
        }, []),
    );

    async function InitMyScreen() {
        var UserInfo = await firestore()
            .collection('Users')
            .doc(currentUser?.uid)
            .get();

        if (UserInfo._data != undefined) {
            setUserInfo(UserInfo._data);
        }
    }

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            InitMyScreen();
        });

        return unsubscribe;
    }, []);

    /* 예약정보 가져오기 */
    React.useEffect(() => {
        auth()
            .currentUser?.getIdToken(true)
            .then(async (res) => {
                const AxiosConfig = {
                    method: 'get',
                    url: SERVER + '/api/users/reservations',
                    headers: {
                        Authorization: 'Bearer ' + res,
                    },
                };
                try {
                    const RevData = await axios(AxiosConfig);
                    setReservationInfo(RevData.data);
                } catch (e) {
                    /* receive 404 error */
                    // console.log('e', e);
                }
                setLoading(false);
            });
    }, []);

    const handleBackButton = () => {
        if (exitApp == undefined || !exitApp) {
            // 한번만 더 누르면 종료
            exitApp = true;

            timeout = setTimeout(() => {
                exitApp = false;
            }, 2000);
        } else {
            clearTimeout(timeout);
            BackHandler.exitApp();
        }

        return true;
    };

    function PressDetail(item: ReservationInfo) {
        setDetailData(item);
        setVisible(true);

        setTimeout(() => {
            setVisible(false);
        }, 1000);
    }

    function PressComment() {
        toastRef.show('Not Developed yet', 1000);
    }

    return currentUser === null ? (
        <Layout>
            <Toast ref={(toast) => (toastRef = toast)} position={'bottom'} />
            <LoginCheck
                navigation={props.navigation}
                route={props.route}
                visible={currentUser === null ? true : false}
            />
        </Layout>
    ) : (
        <Layout style={styles.SuperContainer}>

            <SafeAreaView />
            {Platform.OS === 'ios' ? (
                <HomeBG style={styles.backgroundStyle} />
            ) : (
                <Image
                    source={require('../../assets/icon/Home/HomeBGimg.png')}
                    style={styles.backgroundStyle} />
            )}

            <PaidDetail
                navigation={props.navigation}
                visible={visible}
                data={detailData}
            />
            <Layout style={styles.MainContainer}>
                <Layout style={styles.Container}>
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

                        <Text style={styles.profileTitle}>
                            {currentUser.displayName}
                        </Text>

                        {userInfo.type === 'Korean' ? (
                            <Korean />
                        ) : userInfo.type === 'Resident' ? (
                            <Resident />
                        ) : (
                            <Traveler />
                        )}
                    </Layout>

                    <Layout style={styles.ButtonContainer}>
                        <TouchableOpacity
                            style={styles.Button}
                            onPress={() =>
                                props.navigation.navigate(SceneRoute.MY_SETTING)
                            }>
                            <Setting_Btn style={styles.ButtonIcon} />
                            <Text style={styles.ButtonText}>Settings</Text>
                        </TouchableOpacity>
                        <Layout style={styles.VerticalLine} />

                        <TouchableOpacity
                            style={styles.Button}
                            onPress={() =>
                                props.navigation.navigate(
                                    SceneRoute.BOOKMARK_LIST,
                                )
                            }>
                            <Bookmark_Btn style={styles.ButtonIcon} />
                            <Text style={styles.ButtonText}>Bookmark</Text>
                        </TouchableOpacity>
                    </Layout>
                </Layout>

                <Layout style={styles.SmallTitleContainer}>
                    <Layout style={styles.TextTitleContainer}>
                        <Receipt style={styles.TextTitleIcon} />
                        <Text style={styles.TextTitle}>Paid Chat List</Text>
                    </Layout>

                    <Layout style={styles.DividerContainer}>
                        <Divider style={styles.Divider} />
                    </Layout>
                </Layout>
                {loading ? (
                    <ActivityIndicator color={'grey'} />
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={styles.scroll}>
                        {reservationInfo?.length ? (
                            reservationInfo.slice(0, 3).map((item, index) => (
                                <TouchableOpacity
                                    key={index.toString()}
                                    onPress={() => PressDetail(item)}>
                                    <Layout
                                        style={
                                            item.refund.complete === true
                                                ? styles.PaidContainerC
                                                : styles.PaidContainer
                                        }>
                                        <Layout style={styles.PaidInfoContainer}>

                                            <Layout style={styles.PaidTitleContainer1}>
                                                <Text style={styles.PaidTitle}>Payment</Text>
                                                <Text style={styles.PaidTitle}>Trip Date</Text>
                                            </Layout>

                                            <Layout style={styles.PaidTitleContainer2}>
                                                <Text style={item.refund.complete === true ? styles.PaidDescR : styles.PaidDesc}>
                                                    {moment(item.paymentDate,).format('YY . MM . DD')}
                                                </Text>
                                                <Text style={item.refund.check === true ? styles.PaidDescR : styles.PaidDesc}>
                                                    {moment(item.day).format('YY . MM . DD',)}
                                                </Text>
                                            </Layout>

                                        </Layout>

                                        <Layout style={styles.PaidInfoContainer}>
                                            <Layout style={styles.PaidTitleContainer1}>
                                                <Text style={styles.PaidTitle}>{` `}</Text>
                                                <Text style={item.refund.complete === true ? styles.RefundCompleted : styles.RefundProgress}>
                                                    {item.refund.check === false ? '' : item.refund.complete === true ? `Refund Completed` : `Refund in progress`}
                                                </Text>
                                            </Layout>
                                        </Layout>
                                    </Layout>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Layout style={styles.emptyContainer}>
                                <Receipt_Large />
                                <Text style={styles.emptyText}>
                                    There is no 'Paid list' .
                                </Text>
                            </Layout>
                        )}
                    </ScrollView>
                )}
                <TouchableOpacity
                    style={styles.ViewPaymentButton}
                    onPress={() =>
                        props.navigation.navigate(SceneRoute.PAID_CHAT_LIST)
                    }>
                    <Text
                        style={
                            styles.ViewPaymentButtonText
                        }>{`View previous payments >`}</Text>
                </TouchableOpacity>
            </Layout>

            <Toast ref={(toast) => (toastRef = toast)} position={'center'} />
        </Layout>
    );
};

const styles = StyleSheet.create({
    SuperContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#00000000'
    },
    MainContainer: {
        backgroundColor: '#00000000',
    },
    Container: {
        marginHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000000'
    },
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
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 23,
        color: 'black',
    },
    VerticalLine: {
        backgroundColor: '#8797ff55',
        width: 2,
        height: '60%',
    },
    ButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        alignSelf: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    Button: {
        width: Screen * 0.25,
        height: Screen * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 10,
        backgroundColor: 'white',
    },
    ButtonIcon: {
        marginTop: 10,
    },
    ButtonText: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 16,
        color: '#8797FF',
    },
    SmallTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    TextTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    TextTitleIcon: {
        marginLeft: 30,
        marginRight: 5,
    },
    TextTitle: {
        fontFamily: 'IBMPlexSansKR-SemiBold',
        fontSize: 20,
    },
    DividerContainer: {
        flex: 1,
    },
    Divider: {
        marginRight: 30,
        backgroundColor: '#8797FF',
    },
    PaidContainer: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    PaidContainerC: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#F8F8F8',
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    PaidInfoContainer: {
        flexDirection: 'row',
        backgroundColor: '#00ff0000',
    },
    PaidTitleContainer1: {
        backgroundColor: '#00ff0000',
        marginLeft: 30,
        marginBottom: 10,
        marginTop: 10,
        flexDirection: 'column',
    },
    PaidTitleContainer2: {
        backgroundColor: '#00ff0000',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15,
        flexDirection: 'column',
    },
    PaidTitle: {
        fontSize: 14,
        fontFamily: 'IBMPlexSansKR-Medium',
        color: '#BCBCBC',
    },
    PaidTitleR: {
        fontSize: 14,
        fontFamily: 'IBMPlexSansKR-Medium',
        color: '#AEAEAE',
    },
    PaidDesc: {
        fontSize: 14,
        fontFamily: 'IBMPlexSansKR-Medium',
        color: 'black',
    },
    PaidDescR: {
        fontSize: 14,
        fontFamily: 'IBMPlexSansKR-Medium',
        color: '#AEAEAE',
    },
    RefundProgress: {
        fontSize: 14,
        fontFamily: 'IBMPlexSansKR-Medium',
        color: '#7777FF',
    },
    RefundCompleted: {
        fontSize: 14,
        fontFamily: 'IBMPlexSansKR-Medium',
        color: '#AEAEAE',
    },
    ViewPaymentButton: {
        alignSelf: 'flex-end',
        marginRight: 32,
        marginTop: 10,
        marginBottom: 50,
    },
    ViewPaymentButtonText: {
        fontSize: 17,
        fontFamily: 'IBMPlexSansKR-Medium',
        color: '#AEAEAE',
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        marginTop: 10,
        textAlign: 'center',
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 16,
        color: '#AEAEAE',
    },
    scroll: {
        maxHeight: 200,
    },
    backgroundStyle: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
