import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Layout, LayoutElement, Text } from '@ui-kitten/components';
import { ReservationInfo } from '.';
import { PaidChatListProps } from '../../navigation/ScreenNavigator/My.navigator';
import { AngleLeft } from '../../assets/icon/Common';
import {Receipt, Receipt_Large} from '../../assets/icon/My';
import { PaidDetail } from '../../component/My';
import moment from 'moment'



export const PaidChatList = (props : PaidChatListProps) : LayoutElement => {

    const [data, setData] = React.useState<Array<ReservationInfo>>([

    ]);
    const [visible, setVisible] = React.useState<boolean>(false);
    const [refundCode, setRefundCode] = React.useState<string>('');

    function PressDetail(item : ReservationInfo){

        setRefundCode(item._id);
        setVisible(true);
        
    
        setTimeout(() => {
    
          setVisible(false);
    
        }, 1000)
      }
    

    return(
        <Layout style={styles.MainContainer}>

            <PaidDetail navigation={props.navigation} visible={visible} refundCode={refundCode} />
            
            <Layout style={styles.TopTabBar}>
                <TouchableOpacity style={styles.BackIconContainer} onPress={() => props.navigation.goBack()}>
                    <AngleLeft />
                </TouchableOpacity>

                <Receipt style={styles.ReceiptIcon}/>

                <Text style={styles.Title}>Paid Chat List</Text>                
            </Layout>

            <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#00FF0000'}}>

                <Layout style={{height: 90, backgroundColor: '#00FF0000'}}/>

                {(data.length === 0)? 
                    <Layout style={styles.emptyContainer}>
                        <Receipt_Large/>
                        <Text style={styles.emptyText}>There is no 'Paid list' .</Text>
                    </Layout>
                : 
                    (data.map((item, index) => (
                    <TouchableOpacity onPress={() => PressDetail(item)}>
                        <Layout style={(item.refund.complete === true)? styles.PaidContainerC : styles.PaidContainer}>     
                            <Layout style={styles.PaidInfoContainer}>
                                <Layout style={styles.PaidTitleContainer1}>
                                <Text style={styles.PaidTitle}>Payment</Text>
                                <Text style={styles.PaidTitle}>Trip Date</Text>                
                                </Layout>
    
                                <Layout style={styles.PaidTitleContainer2}>
                                <Text style={(item.refund.complete === true)? styles.PaidDescR : styles.PaidDesc}>{moment(item.paymentDate).format('YY . MM . DD')}</Text>
                                <Text style={(item.refund.check === true)? styles.PaidDescR : styles.PaidDesc}>{moment(item.paymentDate).format('YY . MM . DD')}</Text>
                                </Layout>
                            </Layout>
    
                                        
                            <Layout style={styles.PaidInfoContainer}>
                                <Layout style={styles.PaidTitleContainer1}>
                                <Text style={styles.PaidTitle}>{` `}</Text>
                                <Text style={(item.refund.complete === true)? styles.RefundCompleted : styles.RefundProgress}>{(item.refund.check === false)? '' : (item.refund.complete === true)? `Refund Completed` : `Refund in progress`}</Text>              
                                </Layout>         
                            </Layout>
                        </Layout>  
                    </TouchableOpacity>
                    )))
                }

            </ScrollView>










        </Layout>      
    )

}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1
    },
    TopTabBar: {
        width: '100%',
        height: 90,
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    BackIconContainer: {
        alignItems: 'center',
        justifyContent:'center',
        margin: 30
    },
    ReceiptIcon: {
        alignItems: 'center',
        justifyContent:'center',
        marginRight: 10
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
        flexDirection: 'column'
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
      }
});