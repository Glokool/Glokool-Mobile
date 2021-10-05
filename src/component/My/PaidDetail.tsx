import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth'
import { LayoutElement, Layout, Modal, Card, Text, Button, Divider } from "@ui-kitten/components";
import { SceneRoute } from "../../navigation/app.route";
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Delete } from '../../assets/icon/Common';
import { PaidDetailProps } from '../../navigation/ScreenNavigator/My.navigator';
import moment from 'moment';
import { ReservationInfo } from '../../types';
import { SERVER } from '../../server.component';
import axios from 'axios';
import { MY_Refund_Policy } from '../../assets/icon/My';

const windowWidth = Dimensions.get('window').width;

export const PaidDetail = (props: PaidDetailProps): LayoutElement => {

    const [visible, setVisible] = useState<boolean>(false);
    const [visible2, setVisible2] = useState<boolean>(false);
    const [refundCheck, setRefundCheck] = useState<boolean>(true);
    const [data, setData] = useState<ReservationInfo>({
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

        if (props.visible === true) {
            setData(props.data);
            setVisible(props.visible);

            const today = moment(new Date());
            const subDate = moment(props.data.day).subtract(1, 'days');
            setRefundCheck(subDate < today);
            console.log(subDate < today)
        }

    }, [props]);

    async function PressRefund() {
        const Token = await auth().currentUser?.getIdToken();
        const config = {
            method: 'patch',
            url: SERVER + '/api/reservations/' + data._id + '/refund',
            headers: {
                'Authorization': 'Bearer ' + Token
            }
        }

        const result = await axios(config);
        setVisible(false);
    }

    function PressButton() {
        if (data.refund.check === true) {
            return null
        } else {
            setVisible2(true)
        }

    }

    if (visible == true) {
        return (
            <Layout style={{ backgroundColor: '#00FF0000', width: '100%', height: '100%' }}>

                <Modal
                    visible={visible}
                    backdropStyle={styles.backdrop}
                    style={styles.ModalContainer}
                >
                    <Layout style={styles.TitleContainer}>
                        <Layout style={styles.TitleButton} />

                        <Text style={styles.TitleText}>
                            PAYMENT DETAIL
                        </Text>

                        <TouchableOpacity style={styles.TitleButton} onPress={() => setVisible(false)}>
                            <Delete />
                        </TouchableOpacity>
                    </Layout>

                    {(data.refund.complete !== true) && (
                        <Layout style={styles.RefundTextContainer}>
                            <Text style={styles.RefundText}>Refund Completed</Text>
                        </Layout>
                    )}

                    <Layout style={styles.BodyContainer}>

                        <Layout style={styles.InfoContainer}>

                            <Layout style={styles.ItemContainer}>
                                <Text style={styles.InfoText}>Full Name</Text>
                                <Text style={styles.ValueText}>{data.name}</Text>
                            </Layout>
                            <Layout style={styles.ItemContainer}>
                                <Text style={styles.InfoText}>E-mail</Text>
                                <Text style={styles.ValueText}>{data.email}</Text>
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
                                <Text style={styles.ValueText}>{moment(data.day).format('YYYY. MM. DD')}</Text>
                            </Layout>
                            <Layout style={styles.ItemContainer}>
                                <Text style={styles.InfoText}>Assistant Name</Text>
                                <Text style={styles.ValueText}>{(data.guide?.name === '' || data.guide?.name === undefined || data.guide?.name === null) ? `` : `${data.guide.name}`}</Text>
                            </Layout>
                            <Layout style={styles.ItemContainer}>
                                <Text style={styles.InfoText}>Assistant Language</Text>
                                <Text style={styles.ValueText}>{(data.lang === 'eng') ? `English` : `Chinese`}</Text>
                            </Layout>

                        </Layout>

                        <Divider style={styles.Divider} />

                        <Layout style={styles.InfoContainer}>

                            <Layout style={styles.ItemContainer}>
                                <Text style={styles.InfoText}>Booking Date</Text>
                                <Text style={styles.ValueText}>{moment(data.day).format('YYYY. MM. DD')}</Text>
                            </Layout>
                            <Layout style={styles.ItemContainer}>
                                <Text style={styles.InfoText}>Total</Text>
                                <Text style={styles.ValueText}>{data.money} USD</Text>
                            </Layout>

                        </Layout>

                    </Layout>

                    <Layout style={styles.AdditionalInfo}>
                        <Text style={[styles.AdditionalText, { color: 'black' }]}>glokoolofficial@gmail.com</Text>
                        <Text style={[styles.AdditionalText, { color: '#bcbcbc' }]}>Please contact us if you have any questions.</Text>

                        <TouchableOpacity style={styles.PolicyContainer} onPress={() => {
                            props.navigation.navigate(SceneRoute.REFUND_POLICY);
                            setVisible(false);
                        }}>
                            <Text style={styles.PolicyText}>Refund Policy</Text>
                            <MY_Refund_Policy />
                        </TouchableOpacity>

                    </Layout>

                    <TouchableOpacity style={(refundCheck || data.refund.check) ? styles.DisabledButton : styles.Button} onPress={() => PressButton()} disabled={refundCheck}>
                        <Text style={(refundCheck || data.refund.check) ? styles.DisabledText : styles.ButtonText}>Refund</Text>
                    </TouchableOpacity>

                </Modal>

                <Modal
                    visible={visible2}
                    backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                    <Card disabled={true} style={{ backgroundColor: '#F8F8F8' }}>

                        <Text style={styles.modalTitle}>Are you Sure?</Text>

                        <Text style={styles.modalDesc}>{`Do you really want to Refund GloChat Service?`}</Text>

                        <Layout style={{ flexDirection: 'row' }}>

                            <TouchableOpacity style={styles.StayButon} onPress={() => setVisible2(false)}>
                                <Text style={styles.StayButonText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.WithdrawalButton} onPress={() => { PressRefund() }}>
                                <Text style={styles.WithdrawalButtonText}>Refund</Text>
                            </TouchableOpacity>

                        </Layout>

                    </Card>
                </Modal>

            </Layout>
        )
    }

    else {
        return (<Layout></Layout>);
    }


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
        height: 20,
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
    modalTitle: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 22,
        color: '#8797FF',
        textAlign: 'center'
    },
    modalDesc: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 15,
        color: '#AEAEAE',
        marginTop: 10,
        marginBottom: 10,
    },
    StayButon: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#8797FF',
        borderRadius: 10,
        height: 50,
        marginRight: 5,
        flex: 1
    },
    StayButonText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 22,
        color: '#8797FF'
    },
    WithdrawalButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#292434',
        borderRadius: 10,
        height: 50,
        marginLeft: 5,
        flex: 1
    },
    WithdrawalButtonText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 22,
        color: '#8797FF'
    },
});