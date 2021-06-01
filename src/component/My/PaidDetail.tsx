import React from 'react';
import { LayoutElement, Layout, Modal, Card, Text, Button, Divider } from "@ui-kitten/components";
import { NavigatorRoute, SceneRoute } from "../../navigation/app.route";
import { StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Delete } from '../../assets/icon/Common';
import { PaidDetailProps } from '../../navigation/ScreenNavigator/My.navigator';
import moment from 'moment';

const WindowSize = Dimensions.get('window').width;

type ReservationInfo = {
    user: {
      uid: String, 
      name: String, 
      email: String, 
      contact: String, 
    },
    refund: {
      check: Boolean, 
      complete :  Boolean,
      createdAt: Date,
      completedAt: Date, 
    },
    guide: {
        uid: String, 
        name:  String,
        score: Number, 
    },
    day: Date,
    lang: String,
    money: String,
    paymentID: String,
    paymentDate: Date,
    _id: string
}

export const PaidDetail = (props : PaidDetailProps) : LayoutElement => {

   
    const RefundCode = props.refundCode;
    const [visible, setVisible] = React.useState<boolean>(false);
    const [data, setData] = React.useState<ReservationInfo>({
        user: {
            uid: '', 
            name: 'hello', 
            email: 'glokoolofficial@naver.com', 
            contact: '010-xxxx-xxxx', 
          },
          refund: {
            check: true, 
            complete :  false,
            createdAt: new Date(),
            completedAt: new Date(), 
          },
          guide: {
              uid: '', 
              name:  'guide',
              score: 0, 
          },
          day: new Date(),
          lang: 'eng',
          money: '10000',
          paymentID: '',
          paymentDate: new Date,
          _id: ''
    });

    React.useEffect(() => {

        if(props.visible === true){
            setVisible(props.visible);       
        } 

    }, [props])

    async function PressRefund() {

    }

    return(

        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            style={styles.DetailContainer}
        >
            <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: "#00FF0000"}}>

                <Layout style={styles.titleContainer}>

                    <Layout style={styles.emptyContainer}/>
                    
                    <Layout style={styles.TitleContainer}>
                        <Text style={styles.DetailTitle}>Details</Text>
                    </Layout>

                    <Layout style={styles.emptyContainer} onTouchStart={() => setVisible(false)}>
                            <Delete style={styles.DeleteIcon}/>
                    </Layout>

                </Layout>

                <Layout>
                    {(data.refund.complete === true)? <Text style={styles.policyText}>Refund Completed</Text> : <Text></Text>}
                </Layout>

                <Layout style={styles.InfoContainer}>
                    
                    <Layout>
                        <Text style={styles.infoTitle}>Trip Date</Text>
                        <Text style={styles.infoTitle}>Assistant Name</Text>
                        <Text style={styles.infoTitle}>Assistant Language</Text>
                    </Layout>

                    <Layout style={styles.InfoContainer2}>
                        <Text style={styles.info}>{moment(data.day).format('YYYY . MM . DD')}</Text>
                        <Text style={styles.info}>{data.guide.name}</Text>
                        <Text style={styles.info}>{(data.lang === 'eng')? `English` : `Chinese`}</Text>
                    </Layout>

                </Layout>

                <Divider style={styles.Divider} />

                <Layout style={styles.InfoContainer}>
                    
                    <Layout>
                        <Text style={styles.infoTitle}>Name</Text>
                        <Text style={styles.infoTitle}>E-Mail</Text>
                        <Text style={styles.infoTitle}>Contact</Text>
                    </Layout>

                    <Layout style={styles.InfoContainer2}>
                        <Text style={styles.info}>{data.user.name}</Text>
                        <Text style={styles.info} numberOfLines={1}>{data.user.email}</Text>
                        <Text style={styles.info}>{data.user.contact}</Text>
                    </Layout>

                </Layout>

                <Divider style={styles.Divider} />

                <Layout style={styles.InfoContainer}>
                    
                    <Layout>
                        <Text style={styles.infoTitle}>Amount Cost</Text>
                        <Text style={styles.infoTitle}>Payment Day</Text>
                        <Text style={styles.infoTitle}>Card Number</Text>
                    </Layout>

                    <Layout style={styles.InfoContainer2}>
                        <Text style={styles.info}>{data.money}</Text>
                        <Text style={styles.info}>{moment(data.paymentDate).format('YYYY . MM . DD')}</Text>
                        <Text style={styles.info}>{}</Text>
                    </Layout>

                </Layout>

                <Layout style={styles.emailContainer}>
                    <Text style={styles.email}>glokooloffical@gmail.com</Text>
                    <Text style={styles.emailInfo}>Please Contact us if you have any questions</Text>
                </Layout>

                <TouchableOpacity style={styles.policyContainer} onPress={() => {
                    props.navigation.navigate(SceneRoute.REFUND_POLICY);
                    setVisible(false);
                }}>
                    <Text style={styles.policyText}>Refund Policy</Text>
                    <Delete />
                </TouchableOpacity>

                <TouchableOpacity style={(data.refund.check === false)? styles.RefundButton : styles.RefundButtonC}  onPress={() => PressRefund()}>
                    <Text style={(data.refund.check === false)? styles.RefundButtonText : styles.RefundButtonTextC}>Refund</Text>
                </TouchableOpacity>

            </ScrollView>
        </Modal>


    )
}
const styles = StyleSheet.create({  
    container: {
      flex: 1
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    cancelButton: {
      borderColor: '#FFC043',
      backgroundColor: 'white',   
    },
    DetailContainer: {
      borderRadius: 10,
      backgroundColor: 'white',
      width: WindowSize - 60,
      height: Dimensions.get('window').height * 0.9
    },
    titleContainer: {
        flexDirection: 'row',
        backgroundColor: '#00FF0000',
        marginTop: 10,
        marginBottom: 20
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#00FF0000',
    },
    DeleteIcon: {
        marginRight: 15
    },
    TitleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#00FF0000',

    },
    DetailTitle: {
        fontFamily : 'BrandonGrotesque-Bold',
        fontSize: 23,
        textAlign: 'center',
    },
    InfoContainer: {
        marginHorizontal: 25,
        flexDirection: 'row',
        backgroundColor: '#00FF0000'
    },
    InfoContainer2 : {
        flex: 1,
        alignItems: 'flex-end',
    },
    infoTitle: {
        fontFamily: 'IBMPlexSansKR-Text',
        fontSize: 15,
        color: '#BCBCBC',
        textAlign: 'left'
    },
    info : {
        fontFamily: 'IBMPlexSansKR-Text',
        fontSize: 15,
        color: 'black',
        textAlign: 'right'
    },
    Divider: {
        width: '90%',
        height: 2,
        backgroundColor: '#D5DBFF',
        alignSelf: 'center',
        marginVertical: 15
    },
    emailContainer : {
        marginTop : 30,
        alignItems: 'flex-end',
        marginRight: 20,
        backgroundColor: '#00FF0000'
    },
    email: {
        fontFamily: 'IBMPlexSansKR-Text',
        fontSize: 15,
        color: 'black',
        textAlign: 'right',
        marginBottom: -5,
    },
    emailInfo: {
        fontFamily: 'IBMPlexSansKR-Text',
        fontSize: 15,
        color: '#BCBCBC',
        textAlign: 'right',
        marginTop: -10,
    },
    policyContainer: {
        marginTop : 30,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#00FF0000',
        flexDirection: 'row',
        marginRight: 20
    },
    policyText: {
        fontFamily: 'IBMPlexSansKR-Text',
        fontSize: 15,
        color: '#8797FF',
        textAlign: 'right',
        marginRight: 10,
    },
    RefundButton: {
        width: '80%',
        borderRadius: 10,
        marginVertical: 20,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#00FF0000',
        borderColor: '#00FF0000',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    RefundButtonC: {
        width: '80%',
        borderRadius: 10,
        marginVertical: 20,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#D2D2D2',
        borderColor: '#00FF0000',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    RefundButtonText: {
        textAlign:'center',
        justifyContent: 'center',
        marginVertical: 10,
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize : 22,
        color: '#8797FF'
    },
    RefundButtonTextC: {
        textAlign:'center',
        justifyContent: 'center',
        marginVertical: 10,
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize : 22,
        color: '#AEAEAE'
    }
});