import React from 'react';
import { Text, StyleSheet, Platform, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Layout, LayoutElement, Divider, Radio } from '@ui-kitten/components';
import { PaySecondPage } from '../../assets/icon/Pay';
import { PaySecondSceneProps } from '../../navigation/Pay.navigator';
import { CommonTopTabBar } from '../../component/Common/TopTabBar.component';
import { windowHeight, windowWidth } from '../../Design.component';
import { PromotionBanner } from '../../assets/icon/Pay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Paypal } from '../../assets/icon/Booking';

interface State {
    paypalClicked: boolean;
    kakaoClicked: boolean;
}

const reducer = (state: State, action): State => {
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

    return (
        <Layout style={styles.MainContainer}>
            {/* top tap bar */}
            <CommonTopTabBar
                title={'PAYMENT INFORMATION'}
                navigation={props.navigation}
                child={
                    <Layout style={styles.Pagination}>
                        <PaySecondPage />
                    </Layout>
                } />

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
                            2021.08.20
                        </Text>
                        <Layout style={styles.RowContainer}>
                            <Text style={styles.ValueText}>
                                10 AM ~ 8 PM
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
                        <Text style={styles.ValueText}>20.00 USD</Text>
                    </Layout>
                    <Layout style={styles.PairContainer}>
                        <Text style={styles.SubTitleText}>Promotion</Text>
                        <Text style={[styles.ValueText, { color: '#7777ff' }]}>- 10.01 USD</Text>
                    </Layout>
                </Layout>

                {/* Banner */}
                <PromotionBanner />

                {/* Divider */}
                <Divider style={styles.Divider} />

                <Layout style={styles.CostContainer}>
                    <Text style={styles.SubTitleText}>TOTAL</Text>
                    <Layout style={styles.RowContainer}>
                        <Text style={styles.CostText}>9.99</Text>
                        <Text style={[styles.ValueText, { color: '#7777ff' }]}>USD</Text>
                    </Layout>
                </Layout>

                <Layout style={styles.MethodContainer}>
                    <Text style={styles.TitleText}>PAYMENT METHOD</Text>

                    <Layout style={styles.PaymentMethod}>
                        <Radio
                            checked={state.paypalClicked}
                            onChange={(nextChecked) =>
                                dispatch({ type: 'paypal', nextChecked })
                            }
                            style={styles.Radio}
                        />
                        <Paypal />
                    </Layout>

                    <Layout style={styles.PaymentMethod}>
                        <Radio
                            checked={state.kakaoClicked}
                            onChange={(nextChecked) =>
                                dispatch({ type: 'kakao', nextChecked })
                            }
                            style={styles.Radio}
                        />
                        <Image
                            source={require('../../assets/icon/Booking/kakaopay.png')}
                            style={styles.Logo}
                            resizeMode={'contain'}
                        />
                    </Layout>
                </Layout>

                <TouchableOpacity
                    disabled={!state.kakaoClicked && !state.paypalClicked}
                    style={[styles.ButtonContainer, {
                        backgroundColor: !state.kakaoClicked && !state.paypalClicked ? '#aaa':'#7777ff'
                    }]}
                    onPress={() => { }}
                >
                    <Text style={styles.ButtonText}>CONFIRM and PAY</Text>
                </TouchableOpacity>
                <SafeAreaView />
            </ScrollView>

        </Layout>
    )
};

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    InnerContainer: {
        paddingHorizontal: windowWidth * 0.05
    },
    Pagination: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
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
    },
    ButtonText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        color: 'white',
        fontSize: 18
    },
    Radio: {
        marginRight: 10
    },
    Logo: {
        width: 90,
        height: 20,
    },
    PaymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        height: windowHeight * 0.07,
        borderRadius: 10,
        shadowColor: '#777',
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    MethodContainer: {
        marginTop: windowHeight * 0.05,
        marginBottom: windowHeight * 0.02
    }
})