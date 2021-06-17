import React from 'react';
import auth from '@react-native-firebase/auth'
import { LayoutElement, Layout, Modal, Card, Text, Button, Divider } from "@ui-kitten/components";
import { NavigatorRoute, SceneRoute } from "../../navigation/app.route";
import { StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Delete } from '../../assets/icon/Common';
import { PaidDetailProps } from '../../navigation/ScreenNavigator/My.navigator';
import moment from 'moment';
import { ReservationInfo } from '../../scenes/My';
import { SERVER } from '../../server.component';
import axios from 'axios';
import { MY_Refund_Policy } from '../../assets/icon/My';

const WindowSize = Dimensions.get('window').width;

export const PaidDetail = (props : PaidDetailProps) : LayoutElement => {
   

    const [visible, setVisible] = React.useState<boolean>(false);
    const [visible2, setVisible2] = React.useState<boolean>(false);
    const [data, setData] = React.useState<ReservationInfo>({
          uid: '', 
          name: 'hello', 
          email: 'glokoolofficial@naver.com', 
          contact: '010-xxxx-xxxx',
          refund: {
            check: true, 
            complete : false,
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
            setData(props.data);
            console.log(props.data);
            setVisible(props.visible);
        } 

    }, [props]);

    async function PressRefund() {

        const Token = await auth().currentUser?.getIdToken();

        const config = {
            method: 'patch',
            url : SERVER + '/api/reservations/' + data._id + '/refund',
            headers: { 
                'Authorization': 'Bearer ' + Token 
            }
        }

        const result = await axios(config);
        setVisible(false);

    }

    if(visible == true){
        return (
            <Layout style={{backgroundColor: '#00FF0000', width: '100%', height: '100%'}}>

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
                        {(data.refund.complete != false)? <Text style={styles.policyText}>Refund Completed</Text> : <Text></Text>}
                    </Layout>

                    <Layout style={styles.InfoContainer}>
                        
                        <Layout>
                            <Text style={styles.infoTitle}>Trip Date</Text>
                            <Text style={styles.infoTitle}>Assistant Name</Text>
                            <Text style={styles.infoTitle}>Assistant Language</Text>
                        </Layout>

                        <Layout style={styles.InfoContainer2}>
                            <Text style={styles.info}>{moment(data.day).format('YYYY . MM . DD')}</Text>
                            <Text style={styles.info}>{(data.guide.name === '')? ` ` : `${data.guide.name}` }</Text>
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
                            <Text style={styles.info}>{data.name}</Text>
                            <Text style={styles.info} numberOfLines={1}>{data.email}</Text>
                            <Text style={styles.info}>{data.contact}</Text>
                        </Layout>

                    </Layout>

                    <Divider style={styles.Divider} />

                    <Layout style={styles.InfoContainer}>
                        
                        <Layout>
                            <Text style={styles.infoTitle}>Amount Cost</Text>
                            <Text style={styles.infoTitle}>Payment Day</Text>

                        </Layout>

                        <Layout style={styles.InfoContainer2}>
                            <Text style={styles.info}>{data.money}</Text>
                            <Text style={styles.info}>{moment(data.paymentDate).format('YYYY . MM . DD')}</Text>
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
                        <MY_Refund_Policy />
                    </TouchableOpacity>

                    <Layout style={styles.RefundButtonContainer}>
                        <TouchableOpacity style={(data.refund.check === false)? styles.RefundButton : styles.RefundButtonC}  onPress={() => setVisible2(true)}>
                            <Text style={(data.refund.check === false)? styles.RefundButtonText : styles.RefundButtonTextC}>Refund</Text>
                        </TouchableOpacity>
                    </Layout>

                </ScrollView>
            </Modal>

            <Modal
                visible={visible2}
                backdropStyle={{backgroundColor : 'rgba(0, 0, 0, 0.5)'}}  
            >
                    <Card disabled={true} style={{backgroundColor: '#F8F8F8'}}>
                    
                    <Text style={styles.modalTitle}>Are you Sure?</Text>

                    <Text style={styles.modalDesc}>{`Do you really want to Refund GloChat Service?`}</Text>
                    
                    <Layout style={{flexDirection: 'row'}}>

                        <TouchableOpacity style={styles.StayButon} onPress={() => setVisible2(false)}>
                        <Text style={styles.StayButonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.WithdrawalButton} onPress={() => {PressRefund()}}>
                        <Text style={styles.WithdrawalButtonText}>Refund</Text>
                        </TouchableOpacity>
                            
                    </Layout>
                            
                    </Card>
                </Modal>

            </Layout>
        )
    }

    else{
        return(<Layout></Layout>);
    }
        

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
        marginBottom: 10,
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
    RefundButtonContainer : {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        width: 280,
        height: 54,
        borderRadius: 15,
        marginHorizontal: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 50
    },
    RefundButton: {
        width: 280,
        height: 54,
        borderRadius: 10,
        marginVertical: 50,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#00FF0000',
        borderColor: '#00FF0000',
    },
    RefundButtonC: {
        width: 280,
        height: 54,
        borderRadius: 10,
        marginVertical: 50,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#D2D2D2',
        borderColor: '#00FF0000',
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
    },
    modalTitle: {
        fontFamily : 'BrandonGrotesque-Bold',
        fontSize: 22,
        color: '#8797FF',
        textAlign: 'center'
    },
    modalDesc: {
        fontFamily : 'IBMPlexSansKR-Medium',
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
        fontFamily : 'BrandonGrotesque-Bold',
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
        fontFamily : 'BrandonGrotesque-Bold',
        fontSize: 22,
        color: '#8797FF'
    },
});