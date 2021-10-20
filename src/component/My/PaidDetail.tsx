import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth'
import { LayoutElement, Layout, Modal, Divider } from "@ui-kitten/components";
import { SceneRoute } from "../../navigation/app.route";
import { StyleSheet, Dimensions, Text, TouchableOpacity, Alert } from 'react-native';
import { Delete } from '../../assets/icon/Common';
import { PaidDetailProps } from '../../navigation/ScreenNavigator/My.navigator';
import moment from 'moment';
import { ReservationInfo } from '../../types';
import { SERVER } from '../../server.component';
import axios, { AxiosRequestConfig } from 'axios';
import { MY_Refund_Policy } from '../../assets/icon/My';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../model';
import { setReceiptVisibleFalse } from '../../model/My/My.UI.model';

const windowWidth = Dimensions.get('window').width;

export const PaidDetail = (props: PaidDetailProps): LayoutElement => {

    const receiptVisible = useSelector((state: RootState) => state.MyUIModel.receiptVisible);
    const dispatch = useDispatch();

    const [refundCheck, setRefundCheck] = useState<boolean>(true);
    const [data, setData] = useState<ReservationInfo | undefined>({
        uid: '',
        name: 'hello',
        email: 'glokoolofficial@naver.com',
        contact: '010-xxxx-xxxx',
        refund: {
            check: true,
            complete: false,
            createdAt: new Date(),
            completedAt: new Date(),
        },
        guide: {
            uid: '',
            name: 'guide',
            score: 0,
        },
        day: new Date(),
        lang: 'eng',
        money: '10000',
        paymentID: '',
        paymentDate: new Date,
        _id: ''
    });

    useEffect(() => {

        if (receiptVisible === true) {
            setData(props.data);

            const today = moment(new Date());
            const subDate = moment(props.data?.day).subtract(1, 'days');
            setRefundCheck(subDate < today);
        }

    }, [props]);

    async function PressRefund() {
        const Token = await auth().currentUser?.getIdToken();
        const config: AxiosRequestConfig = {
            method: 'patch',
            url: SERVER + '/api/reservations/' + data?._id + '/refund',
            headers: {
                'Authorization': 'Bearer ' + Token
            }
        }

        axios(config);
        dispatch(setReceiptVisibleFalse())
    }

    function PressButton() {
        if (data?.refund.check === true) {
            return;
        } else {
            Alert.alert(
                "Are you Sure?",
                "Do you really want to Refund GloChat Service?",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log('canceled'),
                        style: "destructive",
                    }, {
                        text: "Refund",
                        onPress: () => PressRefund(),
                        style: "default",
                    },
                ],
                {
                    cancelable: true,
                    onDismiss: () =>
                        Alert.alert(
                            "This alert was dismissed by tapping outside of the alert dialog."
                        ),
                }
            );
        }
    }

    return (
        <Modal
            visible={receiptVisible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => dispatch(setReceiptVisibleFalse())}
            style={styles.ModalContainer}
        >
            <Layout style={styles.TitleContainer}>
                <Layout style={styles.TitleButton} />

                <Text style={styles.TitleText}>
                    PAYMENT DETAIL
                </Text>

                <TouchableOpacity style={styles.TitleButton} onPress={() => dispatch(setReceiptVisibleFalse())}>
                    <Delete />
                </TouchableOpacity>
            </Layout>

            {(data?.refund.complete !== true) && (
                <Layout style={styles.RefundTextContainer}>
                    <Text style={styles.RefundText}>Refund Completed</Text>
                </Layout>
            )}

            <Layout style={styles.BodyContainer}>

                <Layout style={styles.InfoContainer}>

                    <Layout style={styles.ItemContainer}>
                        <Text style={styles.InfoText}>Full Name</Text>
                        <Text style={styles.ValueText}>{data?.name}</Text>
                    </Layout>
                    <Layout style={styles.ItemContainer}>
                        <Text style={styles.InfoText}>E-mail</Text>
                        <Text style={styles.ValueText}>{data?.email}</Text>
                    </Layout>

                </Layout>

                <Divider style={styles.Divider} />

                <Layout style={styles.InfoContainer}>

                    <Layout style={styles.ItemContainer}>
                        <Text style={styles.InfoText}>Travel Destinaton</Text>
                        <Text style={styles.ValueText}>Gwanghwamun</Text>
                    </Layout>
                    <Layout style={styles.ItemContainer}>
                        <Text style={styles.InfoText}>Travel Date</Text>
                        <Text style={styles.ValueText}>{moment(data?.day).format('YYYY. MM. DD')}</Text>
                    </Layout>
                    <Layout style={styles.ItemContainer}>
                        <Text style={styles.InfoText}>Assistant Name</Text>
                        <Text style={styles.ValueText}>{(data?.guide?.name === '' || data?.guide?.name === undefined || data?.guide?.name === null) ? `` : `${data?.guide.name}`}</Text>
                    </Layout>
                    <Layout style={styles.ItemContainer}>
                        <Text style={styles.InfoText}>Assistant Language</Text>
                        <Text style={styles.ValueText}>{(data?.lang === 'eng') ? `English` : `Chinese`}</Text>
                    </Layout>

                </Layout>

                <Divider style={styles.Divider} />

                <Layout style={styles.InfoContainer}>

                    <Layout style={styles.ItemContainer}>
                        <Text style={styles.InfoText}>Booking Date</Text>
                        <Text style={styles.ValueText}>{moment(data?.day).format('YYYY. MM. DD')}</Text>
                    </Layout>
                    <Layout style={styles.ItemContainer}>
                        <Text style={styles.InfoText}>Total</Text>
                        <Text style={styles.ValueText}>{data?.money} USD</Text>
                    </Layout>

                </Layout>

            </Layout>

            <Layout style={styles.AdditionalInfo}>
                <Text style={[styles.AdditionalText, { color: 'black' }]}>glokoolofficial@gmail.com</Text>
                <Text style={[styles.AdditionalText, { color: '#bcbcbc' }]}>Please contact us if you have any questions.</Text>

                <TouchableOpacity style={styles.PolicyContainer} onPress={() => {
                    props.navigation.navigate(SceneRoute.REFUND_POLICY);
                    dispatch(setReceiptVisibleFalse())
                }}>
                    <Text style={styles.PolicyText}>Refund Policy</Text>
                    <MY_Refund_Policy />
                </TouchableOpacity>

            </Layout>

            <TouchableOpacity style={(refundCheck || data?.refund.check) ? styles.DisabledButton : styles.Button} onPress={() => PressButton()} disabled={refundCheck}>
                <Text style={(refundCheck || data?.refund.check) ? styles.DisabledText : styles.ButtonText}>Refund</Text>
            </TouchableOpacity>

        </Modal>

    )

}
const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    ModalContainer: {
        width: windowWidth * 0.9,
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: 'white',
        borderRadius: 20,
    },
    TitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    TitleText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 20,
        flex: 5,
        textAlign: 'center',
    },
    TitleButton: {
        width: 20,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    RefundTextContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    RefundText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 17,
        color: '#7777ff',
    },
    InfoContainer: {
        marginVertical: 5,
    },
    BodyContainer: {
        marginTop: 20,
    },
    ItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 2,
    },
    InfoText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#bcbcbc',
    },
    ValueText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: 'black',
    },
    Divider: {
        width: '95%',
        height: 1.5,
        backgroundColor: '#D5DBFF',
        alignSelf: 'center',
        marginVertical: 15
    },
    AdditionalInfo: {
        width: '100%',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        marginTop: 60,
    },
    AdditionalText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 14,
        marginTop: 5,
    },
    PolicyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    PolicyText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#7777ff',
        marginRight: 5,
    },
    Button: {
        width: '95%',
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 13,
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#8797FF',
    },
    DisabledButton: {
        width: '95%',
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#d2d2d2',
        paddingVertical: 13,
        marginTop: 20,
    },
    ButtonText: {
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: 'Pretendard-Medium',
        fontSize: 20,
        color: '#8797ff'
    },
    DisabledText: {
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: 'Pretendard-Medium',
        fontSize: 20,
        color: '#aeaeae'
    },
});