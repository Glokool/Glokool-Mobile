import React from 'react';
import auth from '@react-native-firebase/auth'
import { StyleSheet, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import { Layout, LayoutElement, Text } from '@ui-kitten/components';
import { ReservationInfo } from '../../types';
import { PaidChatListProps } from '../../navigation/ScreenNavigator/My.navigator';
import { ArrowLeft, Location } from '../../assets/icon/Common';
import { Receipt, Receipt_Large } from '../../assets/icon/My';
import { PaidDetail } from '../../component/My';
import moment from 'moment'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios, { AxiosRequestConfig } from 'axios';
import { SERVER } from '../../server.component';

const windowWidth = Dimensions.get('window').width;

export const PaidChatList = (props: PaidChatListProps): LayoutElement => {
    const [data, setData] = React.useState<Array<ReservationInfo>>([]);
    const [detailData, setDetailData] = React.useState<ReservationInfo>();
    const [visible, setVisible] = React.useState<boolean>(false);
    const [refundCode, setRefundCode] = React.useState<string>('');

    React.useEffect(() => {
        InitPaidChatList();
    }, [])



    async function InitPaidChatList() {

        const Token = await auth().currentUser?.getIdToken(true);

        const AxiosConfig: AxiosRequestConfig = {
            method: 'get',
            url: SERVER + '/api/users/reservations',
            headers: {
                'Authorization': 'Bearer ' + Token
            }
        }
        const RevData = await axios(AxiosConfig);
        setData(RevData.data);

    }


    const PressDetail = (item: ReservationInfo) => {

        setRefundCode(item._id);
        setDetailData(item);
        setVisible(true);

        setTimeout(() => {

            setVisible(false);

        }, 1000)
    }

    const renderItem = (item) => {

        return (
            <TouchableOpacity onPress={() => PressDetail(item.item)}>
                <Layout style={styles.ItemContainer}>
                    <Layout style={styles.InfoContainer}>
                        <Layout style={styles.LocationContainer}>
                            <Location />
                            <Text style={styles.LocationText}>LOCATION</Text>
                        </Layout>
                        <Layout style={styles.InfoItem}>
                            <Text style={[styles.InfoText, { color: '#b4b4b4' }]}>Travel Assistant</Text>
                            <Text style={styles.InfoText}>Glokool Official</Text>
                        </Layout>
                        <Layout style={styles.InfoItem}>
                            <Text style={[styles.InfoText, { color: '#b4b4b4' }]}>Booking Date</Text>
                            <Text style={styles.InfoText}>{moment(item.item.paymentDate).format('YYYY.MM.DD')}</Text>
                        </Layout>
                    </Layout>
                </Layout>
            </TouchableOpacity>
        )
    }

    return (
        <Layout style={styles.MainContainer}>

            {/* Top Tab Bar */}
            <Layout style={styles.TopTabContainer}>
                <SafeAreaView />
                <Layout style={styles.TopTabItems}>

                    <TouchableOpacity style={styles.BackButton} onPress={() => props.navigation.pop()}>
                        <ArrowLeft />
                    </TouchableOpacity>

                    <Text style={styles.TopTabText}>RECEIPTS</Text>

                    <Layout style={{ flex: 1 }} />
                </Layout>
            </Layout>

            {(data.length === 0) ?
                <Layout style={styles.emptyContainer}>
                    <Receipt_Large />
                    <Text style={styles.emptyText}>There is no 'Paid list' .</Text>
                </Layout>
                :
                <FlatList
                    data={data}
                    renderItem={renderItem}
                />
            }

            <PaidDetail navigation={props.navigation} visible={visible} data={detailData} />

        </Layout>
    )

}

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%'
    },
    TopTabContainer: {
        width: windowWidth,
        paddingBottom: 10,
        backgroundColor: 'white'
    },
    TopTabItems: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    TopTabText: {
        flex: 5,
        fontFamily: 'BrandonGrotesque-Bold',
        textAlign: 'center',
        fontSize: 20,
    },
    BackButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    TopTabBar: {
        width: '100%',
        height: 50,
        position: 'absolute',

    },
    TopTabBarButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    BackIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginLeft: 30
    },
    ReceiptIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20
    },
    Title: {
        fontFamily: 'IBMPlexSansKR-SemiBold',
        fontSize: 20,
        color: 'black'
    },
    PaidContainer: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    PaidContainerC: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#F8F8F8',
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    PaidInfoContainer: {
        flexDirection: 'row',
        backgroundColor: '#00FF0000',
        flex: 1
    },
    PaidTitleContainer1: {
        flex: 1,
        backgroundColor: '#00FF0000',
        marginLeft: 30,
        marginBottom: 10,
        marginTop: 10,
        flexDirection: 'column'
    },
    PaidTitleContainer2: {
        flex: 1,
        backgroundColor: '#00FF0000',
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'column',
    },
    PaidTitle: {
        fontSize: 14,
        fontFamily: 'IBMPlexSansKR-Medium',
        color: '#BCBCBC'
    },
    PaidTitleR: {
        fontSize: 14,
        fontFamily: 'IBMPlexSansKR-Medium',
        color: '#AEAEAE'
    },
    PaidDesc: {
        fontSize: 14,
        fontFamily: 'IBMPlexSansKR-Medium',
        color: 'black'
    },
    PaidDescR: {
        fontSize: 14,
        fontFamily: 'IBMPlexSansKR-Medium',
        color: '#AEAEAE'
    },
    RefundProgress: {
        fontSize: 14,
        fontFamily: 'IBMPlexSansKR-Medium',
        color: '#7777FF'
    },
    RefundCompleted: {
        fontSize: 14,
        fontFamily: 'IBMPlexSansKR-Medium',
        color: '#AEAEAE'
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    emptyText: {
        marginTop: 10,
        textAlign: 'center',
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 16,
        color: '#AEAEAE'
    },
    ItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#e4e4e4'
    },
    ImageItem: {
        width: 60,
        height: 60,
        borderWidth: 0.3,
        borderRadius: 100,
    },
    InfoItem: {
        flexDirection: 'row',
        width: windowWidth * 0.7,
        alignItems: 'center',
        marginBottom: 5,
    },
    InfoText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 16,
        flex: 1,
    },
    LocationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    LocationText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 16,
        marginLeft: 5,
    },
    InfoContainer: {
        marginLeft: 10
    },
});