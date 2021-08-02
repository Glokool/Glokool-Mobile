import React from 'react';
import { Layout, LayoutElement, Radio, Text } from '@ui-kitten/components';
import { BookThirdScreenProps } from '../../navigation/Book.navigator';
import {
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { TopTabBar } from '../../component/Booking';
import { SERVER } from '../../server.component';
import IMP, { IMP_PAY_METHOD, IMP_PG } from 'iamport-react-native';
import axios from 'axios';
import { Divide_Spot } from '../../assets/icon/Booking';
import moment from 'moment';
import { requestOneTimePayment, PaypalResponse } from 'react-native-paypal';
import { PaymentLoading } from '../../component/Booking/PaymentLoading';
import { SceneRoute } from '../../navigation/app.route';
import { number } from 'yup';
import { AuthContext } from '../../context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';

type PriceData = {
    active: boolean;
    discountedPrice: number;
    price: number;
    discount: number;
};

interface State {
    paypalClicked: boolean;
    kakaoClicked: boolean;
}

const reducer = (state: State, action): State => {
    switch (action.type) {
        case 'paypal':
            return {
                paypalClicked: action.nextChecked,
                kakaoClicked: !state.kakaoClicked,
            };
        case 'kakao':
            return {
                paypalClicked: !state.paypalClicked,
                kakaoClicked: action.nextChecked,
            };
        default:
            return state;
    }
};

export const BookThirdScreen = (props: BookThirdScreenProps): LayoutElement => {
    const { currentUser } = React.useContext(AuthContext);

    const data = props.route.params;
    const [price, setPrice] = React.useState<PriceData>();

    const [state, dispatch] = React.useReducer(reducer, {
        paypalClicked: true,
        kakaoClicked: false,
    });

    const token = 'sandbox_s9cw8cv5_99sqcyv5st4dpfr2';

    React.useEffect(() => {
        InitBookThird();
    }, []);

    async function InitBookThird() {
        var config = {
            Method: 'get',
            url: SERVER + '/api/price',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        var result = await axios(config);
        setPrice({
            active: result.data.active,
            discountedPrice: result.data.discountedPrice,
            price: result.data.price,
            discount: result.data.discount,
        });
    }

    function Payment() {
        if (state.paypalClicked) {
            PaypalPayment();
        } else {
            KaKaoPayment();
        }
    }

    async function PaypalPayment() {
        const PayMethod: IMP_PAY_METHOD = 'card';
        const amount = price?.active
            ? price?.price / 1000 -
              (price?.discount * price?.price) / 100 / 1000
            : price?.price / 1000;

        const params = {
            pg: 'paypal',
            pay_method: PayMethod,
            name: 'Glokool-Assistant-Service',
            merchant_uid: `mid_${new Date().getTime()}`,
            amount: amount,
            buyer_name: data.Name,
            buyer_tel: '',
            buyer_email: data.Email,
            buyer_addr: '서울시 강남구 역삼동 721-11 301호',
            buyer_postcode: '00000',
            app_scheme: 'Glokool',
        };

        props.navigation.navigate(SceneRoute.PAYMENT, { params, data });
    }

    async function KaKaoPayment() {
        const PayMethod: IMP_PAY_METHOD = 'card';
        const amount = price?.active
            ? price?.price - (price?.discount * price?.price) / 100
            : price?.price;

        let contact = '';
        if (data.Contact.type === 'Phone Number') {
            contact = data.Contact?.info;
        }

        const params = {
            pg: 'kakaopay',
            pay_method: PayMethod,
            merchant_uid: `merchant_${new Date().getTime()}`,
            name: 'Glokool-Assistant-Service',
            amount: amount,
            buyer_email: data.Email,
            buyer_name: data.Name,
            buyer_tel: contact,
            buyer_addr: '서울시 강남구 역삼동 721-11 301호',
            buyer_postcode: '00000',
            app_scheme: 'Glokool',
        };

        props.navigation.navigate(SceneRoute.PAYMENT, { params, data });
    }

    return (
        <Layout style={styles.Container}>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#00FF0000' }} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.MainContainer}>
                <Text style={styles.TitleText}>{`Payment Notification`}</Text>

                <Text style={styles.SmallTitleText}>Basic Cost</Text>

                {state.paypalClicked ? (
                    <Layout>
                        <Layout style={styles.priceContainer}>
                            <Text style={styles.PriceTitle}>
                                Travel Assistance Service Fee
                            </Text>
                            <Text style={styles.Price}>{`${(price?.price / 1000)
                                .toString()
                                .replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ',',
                                )} USD`}</Text>
                        </Layout>

                        {price?.active ? (
                            <Layout style={styles.priceContainer}>
                                <Text style={styles.PriceTitle}>Promotion</Text>
                                <Text style={styles.PromotionPrice}>{`- ${(
                                    (price?.discount * price?.price) /
                                    100 /
                                    1000
                                )
                                    .toString()
                                    .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ',',
                                    )} USD`}</Text>
                            </Layout>
                        ) : null}

                        <Divide_Spot style={{ marginVertical: 30 }} />

                        <Layout style={styles.priceContainer}>
                            <Text style={styles.TotalText}>Total</Text>
                            {price?.active ? (
                                <Text style={styles.TotalKRWext}>
                                    <Text style={styles.TotalPriceText}>
                                        {price?.price / 1000 -
                                            (price?.discount * price?.price) /
                                                100 /
                                                1000}
                                    </Text>{' '}
                                    USD
                                </Text>
                            ) : (
                                <Text style={styles.TotalKRWext}>
                                    <Text style={styles.TotalPriceText}>
                                        {price?.price / 1000}
                                    </Text>{' '}
                                    USD
                                </Text>
                            )}
                        </Layout>
                    </Layout>
                ) : (
                    <Layout>
                        <Layout style={styles.priceContainer}>
                            <Text style={styles.PriceTitle}>
                                Travel Assistance Service Fee
                            </Text>
                            <Text
                                style={
                                    styles.Price
                                }>{`${price?.price
                                .toString()
                                .replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ',',
                                )} KRW`}</Text>
                        </Layout>

                        {price?.active ? (
                            <Layout style={styles.priceContainer}>
                                <Text style={styles.PriceTitle}>Promotion</Text>
                                <Text style={styles.PromotionPrice}>{`- ${(
                                    (price?.discount * price?.price) /
                                    100
                                )
                                    .toString()
                                    .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ',',
                                    )} KRW`}</Text>
                            </Layout>
                        ) : null}

                        <Divide_Spot style={{ marginVertical: 30 }} />

                        <Layout style={styles.priceContainer}>
                            <Text style={styles.TotalText}>Total</Text>
                            {price?.active ? (
                                <Text style={styles.TotalKRWext}>
                                    <Text style={styles.TotalPriceText}>
                                        {(
                                            price?.price -
                                            (price?.discount * price?.price) /
                                                100
                                        )
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ',',
                                            )}
                                    </Text>{' '}
                                    KRW
                                </Text>
                            ) : (
                                <Text style={styles.TotalKRWext}>
                                    <Text style={styles.TotalPriceText}>
                                        {price?.price}
                                    </Text>{' '}
                                    KRW
                                </Text>
                            )}
                        </Layout>
                    </Layout>
                )}

                <Layout style={{ marginVertical: 15 }} />

                <Layout style={styles.priceContainer}>
                    <Text style={styles.PriceTitle2}>Trip Date</Text>
                    <Text style={styles.Price2}>{`${moment(data.date).format(
                        'YYYY . MM . DD',
                    )}`}</Text>
                </Layout>

                <Layout style={styles.priceContainer}>
                    <Text style={styles.PriceTitle2}>Assistant Language</Text>
                    <Text style={styles.Price2}>{`English`}</Text>
                </Layout>

                <Layout style={{ marginVertical: 10 }} />

                <Text style={styles.SmallTitleText}>Payment Method</Text>
                <Layout style={styles.Payment}>
                    <Radio
                        checked={state.paypalClicked}
                        onChange={(nextChecked) =>
                            dispatch({ type: 'paypal', nextChecked })
                        }
                        style={styles.Radio}
                    />

                    <Layout style={styles.LogoContainer}>
                        <Image
                            source={require('../../assets/Paypal_logo.png')}
                            style={styles.Logo}
                            resizeMode={'stretch'}
                        />
                        <Text style={styles.PaymentText1}>
                            Your payment will be made in{' '}
                            <Text style={styles.PaymentText2}>USD{'\n'}</Text>
                            <Text style={styles.PaymentText2}>
                                Credit or debit cards issued {'\n'}
                                in Korea are not accepted
                            </Text>
                            {'\n\n'}Use your balance in your PayPal account.
                            {'\n'}PayPal account is required.
                        </Text>
                    </Layout>
                </Layout>
                <Layout style={{ marginVertical: 15 }} />
                {currentUser.email === 'glokooltest@gmail.com' ? (
                    <Layout style={styles.Payment}>
                        <Radio
                            checked={state.kakaoClicked}
                            onChange={(nextChecked) =>
                                dispatch({ type: 'kakao', nextChecked })
                            }
                            style={styles.Radio}
                        />

                        <Layout style={styles.LogoContainer}>
                            <Image
                                source={require('../../assets/kakaoPay_logo.png')}
                                style={styles.Logo}
                                resizeMode={'stretch'}
                            />
                            <Text style={styles.PaymentText1}>
                                Your payment will be made in{' '}
                                <Text style={styles.PaymentText2}>
                                    KRW{'\n'}
                                </Text>
                                <Text style={styles.PaymentText2}></Text>
                                {'\n'}Use your balance in your Kakao account.
                                {'\n'}Kakao account is required.
                            </Text>
                        </Layout>
                    </Layout>
                ) : null}
                <Layout style={{ marginVertical: 100 }} />
            </ScrollView>

            <Layout style={styles.NextButtonContainer}>
                <LinearGradient colors={['#ffffff00', 'white','white', 'white', '#ffffff00']} style={styles.LinearGradient}>
                <TouchableOpacity
                    style={styles.Button}
                    onPress={() => Payment()}>
                    <Text style={styles.ButtonText}>PAY NOW</Text>
                </TouchableOpacity>

                <SafeAreaView
                    style={{ flex: 0, backgroundColor: '#00FF0000' }}
                />
                </LinearGradient>
            </Layout>

            <TopTabBar index={3} />
        </Layout>
    );
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    MainContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 80,
        marginHorizontal: 30,
    },
    TitleText: {
        fontFamily: 'IBMPlexSansKR-SemiBold',
        fontSize: 18,
        textAlign: 'center',
    },
    SmallTitleText: {
        fontFamily: 'IBMPlexSansKR-SemiBold',
        fontSize: 18,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginTop: 50,
        marginBottom: 30,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    PriceTitle: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 16,
        flex: 2,
        textAlign: 'left',
    },
    PriceTitle2: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 15,
        flex: 2,
        textAlign: 'left',
        color: '#BCBCBC',
    },
    Price: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 16,
        flex: 1,
        textAlign: 'right',
    },
    Price2: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 15,
        flex: 1,
        textAlign: 'right',
    },
    PromotionPrice: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 16,
        flex: 1,
        color: '#7777FF',
        textAlign: 'right',
    },
    TotalText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 16,
        color: '#7777FF',
        textAlign: 'left',
        flex: 2,
    },
    TotalPriceText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 26,
        color: '#7777FF',
        textAlign: 'right',
        flex: 1,
    },
    TotalKRWext: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 16,
        color: '#7777FF',
        textAlign: 'right',
        flex: 1,
    },
    Payment: {
        width: '95%',
        alignSelf: 'center',
        height: 180,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        flexDirection: 'row',
        padding: 10,
    },
    Logo: {
        width: 100,
        height: 25,
        marginBottom: 10,
    },
    Radio: {
        flex: 1,
        alignSelf: 'flex-start',
        marginTop: 10,
        marginLeft: 10,
    },
    LogoContainer: {
        flex: 9,
        marginLeft: 20,
        marginTop: 8,
    },
    PaymentText1: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 12,
        color: 'black',
        textAlign: 'left',
    },
    PaymentText2: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 12,
        color: '#7777FF',
        textAlign: 'left',
    },
    NextButtonContainer: {
        position: 'absolute',
        width: '100%',
        height: 120,
        bottom: 0,
        backgroundColor: '#00ff0000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    LinearGradient: {
        width: '100%',
        alignItems:'center',
        height: 120,
        justifyContent: 'center',
    },
    Button: {
        backgroundColor: '#7777FF',
        borderRadius: 10,
        width: 350,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        color: 'white',
    },
});
