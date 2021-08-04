import React from 'react';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    SafeAreaView,
    Text,
    TouchableOpacity,
    BackHandler,
} from 'react-native';
import { Layout, LayoutElement } from '@ui-kitten/components';
import { NavigatorRoute } from '../../navigation/app.route';
import { ChatScreenProps } from '../../navigation/ScreenNavigator/Chat.navigator';
import axios from 'axios';
import { SERVER } from '../../server.component';
import { LoginCheck } from '../../component/Common';
import { WeatherComponent } from '../../component/Chat/weather.component';
import { ChatListNow } from '../../component/Chat/chat.list.now.component';
import { ChatListRecent } from '../../component/Chat/chat.list.recent.component';
import { AngleDown, AngleUp_W, Discount } from '../../assets/icon/Common';
import Toast from 'react-native-easy-toast';
import { AuthContext } from '../../context/AuthContext';

var ToastRef: any;

type PriceData = {
    active: boolean;
    discountedPrice: number;
    price: string;
    discount: number;
};

export const ChatScreen = (props: ChatScreenProps): LayoutElement => {
    const { currentUser } = React.useContext(AuthContext);
    // useState 선언할때 <> 으로 타입을 초기화 시켜줌 
    const [now, setNow] = React.useState<boolean>(true);
    const [ad, setAD] = React.useState<boolean>(true);
    const [price, setPrice] = React.useState<PriceData>();

    var exitApp: any = undefined;
    var timeout: any;

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

    React.useEffect(() => {
        InitResSetting();
    }, []);

    async function InitResSetting() {
        var config = {
            Method: 'get',
            url: SERVER + '/api/price',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        // 여기서 price 랑 discount 등등 바뀌는데 아마.. config 에서 받아오는 것 같음
        var result = await axios(config);
        setPrice({
            active: result.data.active,
            discountedPrice: result.data.discountedPrice,
            price: result.data.price,
            discount: result.data.discount,
        });
    }

    const handleBackButton = () => {
        if (exitApp == undefined || !exitApp) {
            ToastRef.show('Press one more time to exit', 1000);
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

    return (
        <Layout style={styles.MainContainer}>
            <WeatherComponent />

            <Layout style={styles.TextButtonContainer}>
                <TouchableOpacity onPress={() => setNow(true)}>
                    <Text
                        style={
                            now === true
                                ? styles.TextButtonS
                                : styles.TextButton
                        }>
                        NOW
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setNow(false)}>
                    <Text
                        style={
                            now === false
                                ? styles.TextButtonS
                                : styles.TextButton
                        }>
                        RECENT
                    </Text>
                </TouchableOpacity>
            </Layout>

            {now === true ? (
                <ChatListNow
                    navigation={props.navigation}
                    route={props.route}
                />
            ) : (
                <ChatListRecent
                    navigation={props.navigation}
                    route={props.route}
                />
            )}

            {/* {ad === true ? ( */}
            <Layout style={styles.AdContainer}>
                <Layout style={styles.AdContainer2}>
                    {/* <Discount /> */}
                    <Text style={styles.DiscountNot}>
                        {' ' + price?.price
                            .toString()
                            .replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ',',
                            ) + ' '}
                    </Text>

                    <Text style={styles.Cost}>
                        {price?.discountedPrice}
                        <Text style={styles.KRW}>
                            KRW{' '}
                            <Text style={styles.KRWElse}>
                                / Per DAY
                            </Text>
                        </Text>
                    </Text>
                </Layout>

                <Layout style={styles.AdContainer3}>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate(
                                NavigatorRoute.BOOK,
                            );
                        }}>
                        <Text style={styles.BookButtonText}>
                            BOOK
                        </Text>
                    </TouchableOpacity>
                </Layout>
            </Layout>
            {/* ) : (
                <Layout style={styles.AdContainerDown}>
                    <Text style={styles.AdTitle2}>
                        Travel Assistant Service
                    </Text>

                    <TouchableOpacity
                        style={styles.upButton}
                        onPress={() => setAD(true)}>
                        <AngleUp_W />
                    </TouchableOpacity>

                    <SafeAreaView />
                </Layout>
            )} */}

            <Toast ref={(toast) => (ToastRef = toast)} position={'bottom'} />
        </Layout>
    );
};

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    TextButtonContainer: {
        marginLeft: 0,
        paddingLeft: 20,
        flexDirection: 'row',
        borderBottomWidth: 3,
        borderColor: "#f8f8f8",
    },
    TextButton: {
        padding: 10,
        color: '#D2D2D2',
        fontFamily: 'BrandonGrotesque-Medium',
        fontSize: 18,
    },
    TextButtonS: {
        padding: 10,
        color: 'black',
        fontFamily: 'BrandonGrotesque-Medium',
        fontSize: 18,
    },
    AdContainer: {
        position: 'absolute',
        width: '100%',
        marginBottom: 10,
        bottom: 0,
        flexDirection: 'row',
    },
    AdContainerDown: {
        position: 'absolute',
        width: '100%',
        height: 70,
        bottom: 0,
        backgroundColor: '#7777FF',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    AdContainer2: {
        borderTopWidth: 2,
        borderTopColor: '#eee',
        flex: 2,
        justifyContent: 'center',
        paddingVertical: 7,
    },
    AdContainer3: {
        backgroundColor: '#252525',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    AdTitle: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 23,
        color: '#7777FF',
        marginLeft: 30,
        marginVertical: 15,
    },
    AdTitle2: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 23,
        color: '#FFFFFF',
        marginLeft: 30,
        marginVertical: 15,
    },
    DiscountNot: {
        fontFamily: 'Pretendard-Medium',
        color: '#adadad',
        fontSize: 16,
        marginLeft: 30,
        textDecorationLine: 'line-through'
    },
    DiscountPer: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 25,
        color: '#7777FF',
        marginLeft: 10,
    },
    Cost: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 22,
        marginLeft: 30,
        color: '#7777ff',
    },
    KRW: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 14,
    },
    KRWElse: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 17,
        color: 'black',
    },
    BookButtonText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 22,
        color: '#7777FF',
    },
    upDownButtonContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    upDownButton: {
        padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: 30,
    },
    upButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 10,
        marginRight: 30,
    },
});
