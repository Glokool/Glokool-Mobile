import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {
  Layout,
  LayoutElement,
  Button,
  Divider,
  Radio,
} from '@ui-kitten/components';
import {
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { NavigatorRoute } from '../../navigation/app.route';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { FeedBookThirdScreenProps } from '../../navigation/feed.navigator';
import { ScrollView } from 'react-native-gesture-handler';
import { 
  requestOneTimePayment,
  requestBillingAgreement,
  PaypalResponse,
} from 'react-native-paypal'; 
import axios from 'axios';
import { SERVER } from '../../server.component'

export const FeedBookThirdScreen = (props: FeedBookThirdScreenProps): LayoutElement => {
  const user = auth().currentUser;
  const Trip = props.route.params;
  const [promotion, setPromotion] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const [success, setSuccess] = React.useState<PaypalResponse>({
    nonce: '',
    payerId: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  });

  // 결제 선택창
  const [paypal, setPaypal] = React.useState(true);
  const [kakao, setKakao] = React.useState(false);

  // 페이팔 거래를 위한 정보 (나중에 지워서 깃허브에 올라감)
  const [token, setToken] = React.useState('sandbox_s9cw8cv5_99sqcyv5st4dpfr2');

  console.log(Trip.day)

  const paypalPayment = async() => {
    var date = new Date();
    date.setHours(date.getHours() + 9);
    console.log(Trip)
    await requestOneTimePayment(
      token,
      {
        amount: Trip.money, // 얼마 청구할래?
        currency: 'USD',
        localeCode: 'en_US', 
        shippingAddressRequired: false,
        userAction: 'commit', 
        intent: 'sale', 
      }      
    )
    .then((response) => {
      console.log(response);      
      axios.post(SERVER + '/api/tour/reservation', {
        tour_id: Trip.tourCode,
        email: Trip.email,
        name: Trip.name,
        uid: user?.uid,
        contactType: Trip.contactType,
        contact: Trip.contact,
        day: Trip.day,
        time: Trip.time,
        money: Trip.money,
        paymentID: response.nonce,
        paymentDate: date
      })
      .then((response) => {
        console.log(response)
        props.navigation.replace(NavigatorRoute.PAY);
      }) 
    })
    .catch((err) => {
        console.log('paypal Payment Error: ',err)
    })
  };

  const kakaoPayment = () => {
    var date = new Date();
    date.setHours(date.getHours() + 9);
    /*
    axios.post(SERVER + '/api/tour/reservation', {
      tour_id: Trip.tourCode,
      email: Trip.email,
      name: Trip.name,
      uid: user?.uid,
      contactType: Trip.contactType,
      contact: Trip.contact,
      day: Trip.day,
      time: Trip.time,
      money: Trip.money,
      paymentID: response.nonce,
      paymentDate: date
    })
    .then(() => {      
      props.navigation.replace(NavigatorRoute.PAY);
    })  
    .catch((err) => {
      console.log('Error: ',err)
    })
    */

    props.navigation.replace(NavigatorRoute.PAY);
  };

  
  const PressBack = () => {
    props.navigation.goBack();
  }

  const PressNext = async() => {
    if(paypal == true){
      
      paypalPayment();
    }
    else if (kakao == true) {
      kakaoPayment();
    }
  };


  return (
      <React.Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>

        {/*탭바 */}
        <Layout style={styles.TabBar}>
          <TouchableOpacity style={styles.IconContainer} onPress={PressBack}>
            <FontAwesomeIcon icon={faAngleLeft} style={{color: 'black'}} size={32}/>
          </TouchableOpacity>
          <Layout style={{flex: 5, backgroundColor: '#00ff0000',alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.title}>BOOKING</Text>
          </Layout>
          <TouchableOpacity style={styles.IconContainer}>              
          </TouchableOpacity>
        </Layout>

        {/*진행 바*/}
        <Layout style={styles.statusBar}>

        </Layout>

        {/*내 용*/}
        

        
        <Layout style={{flex: 9, overflow: 'hidden'}}>
          <ScrollView>
          {/*금액 표시*/}
          <Layout style={styles.billContainer}>
            <Text style={styles.payTitle}>Payment Notification</Text>
            <Text style={styles.payTitle2}>Basic Cost</Text>

            <Layout style={{flexDirection: 'row'}}>
              <Layout style={{flex: 3}}>
                <Text>[{Trip.tourName}] Guide fee</Text>
              </Layout>
              <Layout style={{}}>
                <Text style={{fontWeight: 'bold'}}>$20</Text>
              </Layout>
            </Layout>

            {((promotion == true)?
              <Layout style={{flexDirection: 'row', marginVertical: 5}}>
                <Layout style={{flex: 3}}>
                  <Text>[{Trip.tourName}] promotion</Text>
                </Layout>
                <Layout style={{}}>
                  <Text style={{fontWeight: 'bold'}}>-$10</Text>
                </Layout>
              </Layout>
            :
             null
            )}

            <Divider style={{height: 2, backgroundColor: 'gray', marginVertical: 30}}/>


            <Layout style={{flexDirection: 'row', marginVertical: 10}}>
              <Layout style={{flex: 1}}>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: '#FFC043'}}>Total</Text>
              </Layout>
              <Layout style={{flex: 5}}/>
              <Layout style={{flex: 2, alignItems: 'flex-end'}}>
                <Text style={{fontSize: 28, fontWeight: 'bold', color: '#FFC043'}}>$20</Text>
              </Layout>
            </Layout>       
          </Layout>

          {/*투어 정보란*/}

          <Layout style={{padding: 20}}>
            <Layout style={{flexDirection: 'row', marginVertical: 5, justifyContent: 'center'}}>
              <Layout style={{flex: 1}}>
                <Text style={{color: 'gray', fontWeight: 'bold', fontSize: 14}}>Tour Name</Text>
              </Layout>
              <Layout style={{flex: 3, alignItems: 'flex-end'}}>
                <Text style={{fontSize: 16}}>{Trip.tourName}</Text>
              </Layout>
            </Layout>

            <Layout style={{flexDirection: 'row', marginVertical: 5, justifyContent: 'center'}}>
              <Layout style={{flex: 1}}>
                <Text style={{color: 'gray', fontWeight: 'bold', fontSize: 14}}>Tour Day</Text>
              </Layout>
              <Layout style={{flex: 3, alignItems: 'flex-end'}}>
                <Text style={{fontSize: 16}}>{Trip.day.getFullYear()}.{Trip.day.getMonth() + 1}.{Trip.day.getDate()}</Text>
              </Layout>
            </Layout>

            <Layout style={{flexDirection: 'row', marginVertical: 5, justifyContent: 'center'}}>
              <Layout style={{flex: 1}}>
                <Text style={{color: 'gray', fontWeight: 'bold', fontSize: 14}}>Tour Time</Text>
              </Layout>
              <Layout style={{flex: 3, alignItems: 'flex-end'}}>
                <Text style={{fontSize: 16}}>{Trip.time}</Text>
              </Layout>
            </Layout>

            <Layout style={{flexDirection: 'row', marginVertical: 5, justifyContent: 'center'}}>
              <Layout style={{flex: 1}}>
                <Text style={{color: 'gray', fontWeight: 'bold', fontSize: 14}}>Guide Language</Text>
              </Layout>
              
              {((Trip.lang == 'English')?
              <Layout style={{flex: 2, alignItems: 'flex-end'}}>
                <Text style={{fontSize: 16}}>English</Text>
              </Layout>
              :
              <Layout style={{flex: 2, alignItems: 'flex-end'}}>
                <Text style={{fontSize: 16}}>中文</Text>
              </Layout>
              )}
                
            </Layout>

            {/*결제 수단*/}
            <Layout style={{borderColor: 'gray', borderWidth: 0.5, flexDirection: 'row', marginVertical: 20,}}>
              <Layout style={{flex: 1}}>
                <Radio
                  style={styles.radio}
                  checked={paypal}
                  onChange={nextChecked => {
                    setPaypal(nextChecked);
                    setKakao(false);
                  }}/>
              </Layout>

              <Layout style={{flex: 3}}>
                <Image style={{marginVertical: 15}}source={require('../../assets/Paypal_logo.png')}/>
                <Text style={{fontSize: 12, marginVertical:10}}>Your payment will be made in USD.</Text>
                <Text style={{fontSize: 12, marginTop: 5, marginBottom: 15}}>Use your balance in your PayPal account.{'\n'}PayPal account is required.</Text>
              </Layout>
            </Layout>

            
            {/* 카카오 페이지 */}
            {/*
            <Layout style={{borderColor: 'gray', borderWidth: 0.5, flexDirection: 'row', marginVertical: 20,}}>
              <Layout style={{flex: 1}}>
                <Radio
                  style={styles.radio}
                  checked={kakao}
                  onChange={nextChecked => {
                    setKakao(nextChecked);
                    setPaypal(false);
                  }}/>
              </Layout>

              <Layout style={{flex: 3}}>
                <Image style={{marginVertical: 15}}source={require('../../assets/kakaoPay_logo.png')}/>
                <Text style={{fontSize: 12, marginVertical:10}}>Your payment will be made in KRW.</Text>
                <Text style={{fontSize: 12, marginTop: 5, marginBottom: 15}}>Use your balance in your Kakao account.{'\n'}Kakao account is required.</Text>
              </Layout>
            </Layout>
            */}

              
          </Layout>

          </ScrollView>

        </Layout>

        {/*넥스트 버튼*/}
        <Layout style={styles.ButtonContainer}>
            <Button style={styles.Button} size='giant' onPress={PressNext}>NEXT</Button>
        </Layout>


      </React.Fragment>
  );
}

const styles = StyleSheet.create({
TabBar:{
  flex: 1,
  flexDirection: 'row',
  backgroundColor: 'white',
},
MainContainer: {
  flex: 9,
  backgroundColor: 'white'
},
IconContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  margin: 15,
  flex: 1,
},
title: {
  fontWeight: 'bold',
  fontSize: 16
},
statusBar: {
  justifyContent: 'center',
  alignItems: 'center',
},
ButtonContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10
},
Button: {
  width: '100%',
},
billContainer: {
  padding: 20,
  borderBottomRightRadius: 15,
  borderBottomLeftRadius: 15,
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 5,
},
payTitle: {
  fontSize: 16,
  marginVertical: 15,
  fontWeight: 'bold'
},
payTitle2: {
  fontSize: 16,
  marginVertical: 10,
},
radio: {
  margin: 30,
},
})