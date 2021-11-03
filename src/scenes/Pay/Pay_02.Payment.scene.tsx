import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Text, StyleSheet, Platform, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Layout, LayoutElement, Divider, Radio } from '@ui-kitten/components';
import { PaySecondPage } from '../../assets/icon/Pay';
import { PaySecondSceneProps } from '../../navigation/Pay.navigator';
import { CommonTopTabBar } from '../../component/Common/TopTabBar.component';
import { windowHeight, windowWidth } from '../../Design.component';
import { PromotionBanner } from '../../assets/icon/Pay';
import { IMP_PAY_METHOD, PaymentData } from 'iamport-react-native';
import { Paypal } from '../../assets/icon/Pay';
import { SceneRoute } from '../../navigation/app.route';
import moment from 'moment';
import axios from 'axios';
import { SERVER } from '../../server.component';

interface State {
    paypalClicked: boolean;
    kakaoClicked: boolean;
}

const reducer = (state: State, action: any): State => {
    switch (action.type) {
        case 'paypal':
            return {
                paypalClicked: true,
                kakaoClicked: false,
            };
        case 'kakao':
            return {
                paypalClicked: false,
                kakaoClicked: true,
            };
        default:
            return state;
    }
};

export const PaySecondScene = (props: PaySecondSceneProps): LayoutElement => {

    const [state, dispatch] = React.useReducer(reducer, {
        paypalClicked: false,
        kakaoClicked: false,
    });

    const [price, setPrice] = useState<string>();
    const [discount, setDiscount] = useState<string>();
    const [discountedPrice, setDiscountedPrice] = useState<string>();

    useEffect(() => {
        InitMoney();
    }, [])

    const InitMoney = () => {
        axios.get(SERVER + '/api/price')
            .then((response) => {
                setPrice(response.data.price);
                setDiscountedPrice(response.data.discountedPrice);

                const discountNum = Number(response.data.price) - Number(response.data.discountedPrice);
                setDiscount(discountNum.toString())
            })
    }

    const Payment = async() => {

        const token = await auth().currentUser?.getIdToken();
        const URL = SERVER + '/chat-rooms/entrance';
        const data = JSON.stringify({
            chatRoomCode : props.route.params.ChatRoomID
        });
        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }

        axios.post(URL, data, config)
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            })





        state.paypalClicked ? PaypalMethod() : KakaoPayMethod();
    }

    const PaypalMethod = () => {
        const PayMethod: IMP_PAY_METHOD = 'card';
        // 테스트 중에는 결제금액 1로 설정
        const amount = 1;

        const params: PaymentData = {
            pg: 'paypal',
            pay_method: PayMethod,
            name: 'Glokool-Assistant-Service',
            merchant_uid: `mid_${new Date().getTime()}`,
            amount: amount,
            buyer_name: props.route.params.name,
            buyer_tel: '',
            buyer_email: props.route.params.email,
            buyer_addr: '서울시 강남구 역삼동 721-11 301호',
            buyer_postcode: '00000',
            app_scheme: 'Glokool',
        }

        const ReservationData = {
            name: props.route.params.name,
            email: props.route.params.email,
        }

        // 메신져 id , 전화번호는 optional 이라서 확인 후 전달
        if (props.route.params.snsID) {
            Object.assign(ReservationData, { snsID: props.route.params.snsID });
        }

        if (props.route.params.phone) {
            Object.assign(ReservationData, { snsID: props.route.params.phone });
        }
        props.navigation.navigate(SceneRoute.PAY_PROCESS, { params, ReservationData });

    }

    const KakaoPayMethod = async () => {
        const PayMethod: IMP_PAY_METHOD = 'card';
        // 테스트 중에는 결제금액 1로 설정
        const amount = 1;

        const params: PaymentData = {
            pg: 'kakaopay',
            pay_method: PayMethod,
            merchant_uid: `merchant_${new Date().getTime()}`,
            name: 'Glokool-Assistant-Service',
            amount: amount,
            buyer_email: props.route.params.email,
            buyer_name: props.route.params.name,
            buyer_tel: '', //contact 도 일단 공백
            buyer_addr: '서울시 강남구 역삼동 721-11 301호',
            buyer_postcode: '00000',
            app_scheme: 'Glokool',
        };

        // 메신져 id , 전화번호는 optional 이라서 확인 후 전달
        const ReservationData = {
            name: props.route.params.name,
            email: props.route.params.email,
            guide : props.route.params.guide,
            ChatRoomID : props.route.params.ChatRoomID,
            price : amount + '',
            PaymentPlatform : (state.kakaoClicked)? 'kakao' : 'paypal' 
        }

        if (props.route.params.snsID) {
            Object.assign(ReservationData, { snsID: props.route.params.snsID });
        }

        if (props.route.params.phone) {
            Object.assign(ReservationData, { snsID: props.route.params.phone });
        }
        props.navigation.navigate(SceneRoute.PAY_PROCESS, { params, ReservationData });
    }

    return (
        <Layout style={styles.MainContainer}>
            {/* top tap bar */}
            <CommonTopTabBar
                title={'PAYMENT INFORMATION'}
                child={
                    <Layout style={styles.Pagination}>
                        <PaySecondPage />
                    </Layout>
                }
            />

            <ScrollView style={styles.InnerContainer}>

                <Text style={styles.TitleText}>
                    {'REVIEW & PAY'}
                </Text>
                <Text style={[styles.SubTitleText, { marginTop: 10 }]}>
                    Type of Travel Assistance Service
                </Text>

                <Layout style={styles.TypeContainer}>

                    <Layout style={styles.TypeInnerContainer}>
                        <Text style={styles.ValueText}>Private Chat</Text>
                    </Layout>

                    <Layout style={[styles.TypeInnerContainer, { backgroundColor: '#0000' }]}>
                        <Text style={styles.ValueText}>
                            {moment(new Date()).format('YYYY.MM.DD')}
                        </Text>
                        <Layout style={styles.RowContainer}>
                            <Text style={styles.ValueText}>
                                10 AM ~ 7 PM
                            </Text>
                            <Text style={[styles.ValueText, { color: '#a1a1a1', marginLeft: 5 }]}>
                                (KST)
                            </Text>
                        </Layout>
                    </Layout>

                </Layout>

                <Layout style={styles.PairContainer}>
                    <Text style={styles.SubTitleText}>Travel Destination</Text>
                    <Text style={styles.ValueText}>Hongdae</Text>
                </Layout>
                <Layout style={styles.PairContainer}>
                    <Text style={styles.SubTitleText}>Travel Assistant Name</Text>
                    <Text style={styles.ValueText}>Glokool Official</Text>
                </Layout>
                <Layout style={styles.PairContainer}>
                    <Text style={styles.SubTitleText}>Service Language</Text>
                    <Text style={styles.ValueText}>English</Text>
                </Layout>

                <Layout style={styles.PaymentContainer}>
                    <Text style={styles.TitleText}>
                        PAYMENT DETAILS
                    </Text>
                    <Layout style={styles.PairContainer}>
                        <Text style={styles.SubTitleText}>Service Fees</Text>
                        <Text style={styles.ValueText}>{price} USD</Text>
                    </Layout>
                    <Layout style={styles.PairContainer}>
                        <Text style={styles.SubTitleText}>Promotion</Text>
                        <Text style={[styles.ValueText, { color: '#7777ff' }]}>-{discount} USD</Text>
                    </Layout>
                </Layout>

                {/* Banner */}
                <PromotionBanner width={windowWidth * 0.9} />

                {/* Divider */}
                <Divider style={styles.Divider} />

                <Layout style={styles.CostContainer}>
                    <Text style={styles.SubTitleText}>TOTAL</Text>
                    <Layout style={styles.RowContainer}>
                        <Text style={styles.CostText}>{discountedPrice}</Text>
                        <Text style={[styles.ValueText, { color: '#7777ff' }]}>USD</Text>
                    </Layout>
                </Layout>

                <Layout style={styles.MethodContainer}>
                    <Text style={styles.TitleText}>PAYMENT METHOD</Text>

                    <Layout
                        style={[
                            styles.PaymentMethod,
                            { borderColor: state.paypalClicked ? '#7777ff' : '#0000' }
                        ]}
                        onTouchEnd={() => dispatch({ type: 'paypal', paypalClicked: true })}
                    >
                        <Radio
                            checked={state.paypalClicked}
                            onChange={(nextChecked) => {
                                dispatch({ type: 'paypal', nextChecked })
                            }}
                            style={styles.Radio}
                        />
                        <Paypal />
                    </Layout>

                    <Layout
                        style={[
                            styles.PaymentMethod,
                            { borderColor: state.kakaoClicked ? '#7777ff' : '#0000' }
                        ]}
                        onTouchEnd={() => dispatch({ type: 'kakao', kakaoClicked: true })}
                    >
                        <Radio
                            checked={state.kakaoClicked}
                            onChange={(nextChecked) =>
                                dispatch({ type: 'kakao', nextChecked })
                            }
                            style={styles.Radio}
                        />
                        <Image
                            source={require('../../assets/icon/Pay/kakaopay.png')}
                            style={styles.Logo}
                            resizeMode={'contain'}
                        />
                    </Layout>
                </Layout>

                <TouchableOpacity
                    disabled={!state.kakaoClicked && !state.paypalClicked}
                    style={[styles.ButtonContainer, {
                        backgroundColor: !state.kakaoClicked && !state.paypalClicked ? '#aaa' : '#7777ff'
                    }]}
                    onPress={() => { Payment() }}
                >
                    <Text style={styles.ButtonText}>CONFIRM and PAY</Text>
                </TouchableOpacity>
            </ScrollView>

        </Layout>
    )
};

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    InnerContainer: {
        // paddingHorizontal: windowWidth * 0.05
        paddingTop: 20,
        width: '90%',
        backgroundColor: '#0000',
    },
    Pagination: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.5
    },
    TitleText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 16,
        color: '#7777ff'
    },
    SubTitleText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#a1a1a1'
    },
    ValueText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
    },
    PairContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    CostContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    RowContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: '#0000'
    },
    CostText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 26,
        color: '#7777ff',
        marginRight: 10,
        lineHeight: 30,
        textAlignVertical: 'bottom',
        bottom: Platform.OS === 'ios' ? -3 : 0
    },
    TypeContainer: {
        backgroundColor: '#f6f6f6',
        flexDirection: 'row',
        padding: 5,
        borderRadius: 10,
        height: windowHeight * 0.08,
        marginVertical: 10,
    },
    TypeInnerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    PaymentContainer: {
        marginVertical: 20,
    },
    Divider: {
        marginVertical: 20,
        backgroundColor: '#d9d9d9'
    },
    ButtonContainer: {
        height: windowHeight * 0.06,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: windowHeight * 0.1
    },
    ButtonText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        color: 'white',
        fontSize: 18
    },
    Radio: {
        marginLeft: 10,
        marginRight: 15,
    },
    Logo: {
        width: 90,
        height: 20,
    },
    PaymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 10,
        marginVertical: 5,
        width: '99%',
        height: windowHeight * 0.07,
        borderRadius: 10,
        borderWidth: 2,
        shadowColor: '#777',
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    MethodContainer: {
        marginTop: windowHeight * 0.05,
        marginBottom: windowHeight * 0.02
    }
})