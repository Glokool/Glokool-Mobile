import React from 'react';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  Image,
  BackHandler,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {
  Divider,
  Layout,
  LayoutElement,
  Text,
} from '@ui-kitten/components';
import { MyScreenProps } from '../../navigation/ScreenNavigator/My.navigator';
import { LoginCheck } from '../../component/Common';
import { Traveler, Korean, Resident } from '../../assets/icon/Common';
import { Receipt, Receipt_Large, Setting_Btn, Comment_Btn, Bookmark_Btn } from '../../assets/icon/My';
import axios from 'axios';
import { SERVER } from '../../server.component';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import { PaidDetail } from '../../component/My/PaidDetail';
import { ReservationInfo } from '.';
import { SceneRoute } from '../../navigation/app.route';

var ToastRef : any;

const Screen = Dimensions.get('window').width;

type FirebaseUserInfo = {
  type : string,
  avatar: string,
  birthDate: Date,
  country: string,
  email : string,
  gender: string,
  name: string,
  signupDate: Date,  
}

export const MYScreen = (props: MyScreenProps): LayoutElement => {

  const user = auth().currentUser;
  const [visible, setVisible] = React.useState<boolean>(false);
  const [refundCode, setRefundCode] = React.useState<string>('');
  const [reservationInfo, setReservationInfo] = React.useState<Array<ReservationInfo>>([]);
  const [userInfo, setUserInfo] = React.useState<FirebaseUserInfo>({
    type : '',
    avatar: '',
    birthDate: new Date(),
    country: '',
    email : '',
    gender: '',
    name: '',
    signupDate: new Date(),  
  });

  var exitApp : any = undefined;  
  var timeout : any;

  // 백핸들러 적용을 위한 함수
  const focusEvent = useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
      
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      }
    }, [])
  );

  async function InitMyScreen() {

    var UserInfo = await firestore().collection('Users').doc(user?.uid).get();    
    setUserInfo(UserInfo._data);

    var PaymentData = await axios.get(SERVER + '/api/reservation');
  }
   
  React.useEffect(() => {

      InitMyScreen();

  }, []);

  const handleBackButton = () => {
    
    if (exitApp == undefined || !exitApp){
      // 한번만 더 누르면 종료

      ToastRef.show('Press one more time to exit', 1000);
      exitApp = true;

      timeout = setTimeout(() => {
        exitApp = false;
      }, 2000);
    }

    else{
      clearTimeout(timeout);
      BackHandler.exitApp();
    }       
    
    return true;
  }

  function PressDetail(item : ReservationInfo){

    console.log('눌렀다!')
    setRefundCode(item._id);
    setVisible(true);
    

    setTimeout(() => {

      setVisible(false);

    }, 1000)
  }

  console.log('렌더링', visible);

  return (
    (user == null) ? (
      <LoginCheck navigation={props.navigation} route={props.route} visible={(user === null)? true : false} />
    )
      :
    (
      <Layout>
        <SafeAreaView />      

        <PaidDetail navigation={props.navigation} visible={visible} refundCode={refundCode} />

        <Layout style={styles.MainContainer}>
          
          <Layout style={styles.Container}>

            <Layout style={styles.ProfileContainer}>
              {(user.photoURL === '')?
                <Image source={require('../../assets/profile/profile_01.png')} style={styles.profileImage} /> 
              :
                <Image source={{uri : user.photoURL}} style={styles.profileImage} /> 
              }
              
              <Text style={styles.profileTitle}>{user.displayName}</Text>
              
              {(userInfo.type === 'Korean')? <Korean/> : (userInfo.type === 'Resident')? <Resident /> : <Traveler />}

            </Layout>

          </Layout>

          <Layout style={styles.ButtonContainer}>
            
            <TouchableOpacity style={styles.Button} onPress={() => props.navigation.navigate(SceneRoute.MY_SETTING)}>
              <Setting_Btn style={styles.ButtonIcon}/>
              <Text style={styles.ButtonText}>Setting</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Button}>
              <Comment_Btn style={styles.ButtonIcon}/>
              <Text style={styles.ButtonText}>Comment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Button} onPress={() => props.navigation.navigate(SceneRoute.BOOKMARK_LIST)}>
              <Bookmark_Btn style={styles.ButtonIcon}/>
              <Text style={styles.ButtonText}>Bookmark</Text>
            </TouchableOpacity>

          </Layout>

          <Layout style={styles.SmallTitleContainer}>

            <Layout style={styles.TextTitleContainer}>
              <Receipt style={styles.TextTitleIcon}/>
              <Text style={styles.TextTitle}>Paid Chat List</Text>
            </Layout>

            <Layout style={styles.DividerContainer}>
              <Divider style={styles.Divider} />
            </Layout>

          </Layout>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                {(reservationInfo.length === 0)? 
                    <Layout style={styles.emptyContainer}>
                        <Receipt_Large/>
                        <Text style={styles.emptyText}>There is no 'Paid list' .</Text>
                    </Layout>
                : 
                    (reservationInfo.slice(0,3).map((item, index) => (
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
                )))}
              </ScrollView>

          <TouchableOpacity style={styles.ViewPaymentButton} onPress={() => props.navigation.navigate(SceneRoute.PAID_CHAT_LIST)}>
              <Text style={styles.ViewPaymentButtonText}>{`View previous payments >`}</Text>
          </TouchableOpacity>


        </Layout>
      </Layout>
    )
  );
};

const styles = StyleSheet.create({
    MainContainer: {
      backgroundColor: 'white'
    },
    Container: {
      marginHorizontal: 30,
      alignItems: 'center',
      justifyContent: 'center'
    },
    ProfileContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30
    },
    profileImage: {
      width: 75,
      height: 75,
      borderRadius: 50
    },
    profileTitle: {
      fontFamily: 'BrandonGrotesque-Bold',
      fontSize: 23,
      color: 'black'
    },
    ButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
    },
    Button : {
      width: Screen * 0.25,
      height: Screen * 0.25,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginHorizontal: 10,
      shadowColor: "#000",
      backgroundColor: 'white',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      elevation: 2,
    },
    ButtonIcon: {
      marginTop: 10
    },
    ButtonText: {
      fontFamily: 'IBMPlexSansKR-Medium',
      fontSize: 16,
      color: '#8797FF'
    },
    SmallTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',

    },
    TextTitleContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    TextTitleIcon : {
      marginLeft: 30,
      marginRight: 5,
    },
    TextTitle: {
      fontFamily : 'IBMPlexSansKR-SemiBold',
      fontSize: 20,
    },
    DividerContainer: {
      flex: 1
    },
    Divider: {
      marginRight: 30,
      backgroundColor: '#8797FF'
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
    ViewPaymentButton: {
      alignSelf: 'flex-end',
      marginRight: 32,
      marginTop: 10,
      marginBottom: 50
    },
    ViewPaymentButtonText: {
      fontSize: 17,
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
    scroll: {
      maxHeight: 180,
    }
});