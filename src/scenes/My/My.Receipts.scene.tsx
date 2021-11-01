import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth'
import { StyleSheet, TouchableOpacity, FlatList, Dimensions, Text } from 'react-native';
import { Layout, LayoutElement } from '@ui-kitten/components';
import { ReceiptDetailInfo } from '../../types';
import { PaidChatListProps } from '../../navigation/SceneNavigator/My.navigator';
import { Location } from '../../assets/icon/Common';
import { Receipt_Large } from '../../assets/icon/My';
import { PaidDetail } from '../../component/My';
import moment from 'moment'
import axios, { AxiosRequestConfig } from 'axios';
import { SERVER } from '../../server.component';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../model';
import { setMyLoadingTrue, setMyLoadingFalse } from '../../model/My/My.Loading.model';
import { setReceiptVisibleTrue } from '../../model/My/My.UI.model';
import { CommonTopTabBar } from '../../component/Common';
import { Loading } from '../../component/Common';

const windowWidth = Dimensions.get('window').width;

export const PaidChatList = (props: PaidChatListProps): LayoutElement => {
    const [data, setData] = useState<Array<ReceiptDetailInfo>>([]);
    const [detailData, setDetailData] = useState<ReceiptDetailInfo>();
    const [refundCode, setRefundCode] = useState<string>('');

    const loading = useSelector((state: RootState) => state.MyLoadingModel.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setMyLoadingTrue())
        InitPaidChatList();
    }, [])

    const InitPaidChatList = async () => {

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
        dispatch(setMyLoadingFalse());
    }


    const PressDetail = (item: ReceiptDetailInfo) => {
        setRefundCode(item._id);
        setDetailData(item);
        console.log(item);
        dispatch(setReceiptVisibleTrue());
    }

    const renderItem = (item: { item: ReceiptDetailInfo }) => {

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

    return loading ? (
        <Loading />
    ) : (
        <Layout style={styles.MainContainer}>

            {/* Top Tab Bar */}
            <CommonTopTabBar title={'RECEIPTS'} child={<Layout style={{ borderBottomWidth: 0.5, borderBottomColor: '#ddd' }} />} />

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

            <PaidDetail data={detailData} />

        </Layout>
    )

}

const styles = StyleSheet.create({
    LoadingContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
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
        fontFamily: 'Pretendard-SemiBold',
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
        fontFamily: 'Pretendard-Medium',
        color: '#BCBCBC'
    },
    PaidTitleR: {
        fontSize: 14,
        fontFamily: 'Pretendard-Medium',
        color: '#AEAEAE'
    },
    PaidDesc: {
        fontSize: 14,
        fontFamily: 'Pretendard-Medium',
        color: 'black'
    },
    PaidDescR: {
        fontSize: 14,
        fontFamily: 'Pretendard-Medium',
        color: '#AEAEAE'
    },
    RefundProgress: {
        fontSize: 14,
        fontFamily: 'Pretendard-Medium',
        color: '#7777FF'
    },
    RefundCompleted: {
        fontSize: 14,
        fontFamily: 'Pretendard-Medium',
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
        fontFamily: 'Pretendard-Medium',
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
        fontFamily: 'Pretendard-Medium',
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