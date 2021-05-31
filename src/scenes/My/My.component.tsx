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
  styled,
  Text,
} from '@ui-kitten/components';
import { MyScreenProps } from '../../navigation/ScreenNavigator/My.navigator';
import { LoginCheck } from '../../component/Common';
import { Traveler, Korean, Resident } from '../../assets/icon/Common';
import { Receipt } from '../../assets/icon/My';
import axios from 'axios';
import { SERVER } from '../../server.component';
import moment from 'moment';

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
    paymentDate: Date 
}

export const MYScreen = (props: MyScreenProps): LayoutElement => {

  const user = auth().currentUser;
  const [reservationInfo, setReservationInfo] = React.useState<Array<ReservationInfo>>([{
    user: {
      uid: '',
      name: '',
      email: '',
      contact: '',
    },
    refund: {
      check: false,
      complete : false,
      createdAt: new Date(),
      completedAt: new Date()
    },
    guide: {
        uid: '',
        name: '',
        score: 0
    },
    day: new Date(),
    lang: 'eng',
    money: 0,
    paymentID: '',
    paymentDate: new Date()
    }
  ]);
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

 





  return (
    (user == null) ? (
      <LoginCheck navigation={props.navigation} route={props.route} visible={(user === null)? true : false} />
    )
      :
    (
      <Layout>
        <SafeAreaView />
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
          
          <TouchableOpacity style={styles.Button}>
            <Text style={styles.ButtonText}>Setting</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.Button}>
            <Text style={styles.ButtonText}>Comment</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.Button}>
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

        {(reservationInfo.slice(0, 2).map((item, index) => (
          <Layout style={styles.PaidContainer}>
            <Layout style={styles.PaidContainer1}>
              <Layout style={styles.PaidTitleContainer1}>
                <Text style={styles.PaidTitle}>Payment</Text>
                <Text style={styles.PaidDesc}>{moment(item.paymentDate).format('YYYY . MM . DD')}</Text>
              </Layout>

              <Layout style={styles.PaidTitleContainer2}>
                <Text style={styles.PaidTitle}>Trip Date</Text>
                <Text style={styles.PaidDesc}>{moment(item.paymentDate).format('YYYY . MM . DD')}</Text>
              </Layout>
            </Layout>

            <Layout style={styles.PaidContainer2}>
            </Layout>
          </Layout>
        )))}

      </Layout>
    )
  );
};

const styles = StyleSheet.create({
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
    PaidContainer2: {

    },
    PaidTitleContainer1: {
      marginBottom: 1,
      flexDirection: 'row',
      marginLeft: 30
    },
    PaidTitleContainer2: {
      marginTop: 1,
      flexDirection: 'row',
      marginLeft: 30
    },
    PaidTitle: {
      fontSize: 16,
      fontFamily: 'IBMPlexSansKR-Medium',
      color: '#BCBCBC'
    },
    PaidDesc: {
      fontSize: 16,
      fontFamily: 'IBMPlexSansKR-Medium',
      color: 'black'
    }
});