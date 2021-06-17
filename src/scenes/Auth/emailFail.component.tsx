import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';
import { 
  SceneRoute,
} from '../../navigation/app.route'
import {
  LayoutElement,
  Layout,
} from '@ui-kitten/components';
import { EmailFailScreenProps } from '../../navigation/auth.navigator';
import { Alert, Email } from '../../assets/icon/Auth';
import { AngleLeft } from '../../assets/icon/Common';

export const EmailFailScreen = (props: EmailFailScreenProps): LayoutElement => {
  
  const [button, setButton] = React.useState(false);

  const SendEmailButton = () => {

    auth().signInWithEmailAndPassword(props.route.params.email, props.route.params.passward)
      .then((result) => {
        
          result.user.sendEmailVerification().then(function() {
            console.log('이메일 전송 성공');
            setButton(true);
          }).catch(function(error) {
            console.log('이메일 전송 에러 : ',error);
          });
    
        // auth().onAuthStateChanged(function(user) {
        //   if (user) {
        //   } else {
        //     console.log('로그인 안됌');
        //   }
        // })



      })
      .catch((err) => {
        console.log('이메일 전송을 위한 로그인 실패 : ', err)
      })

  }

  const PressBack = () => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: SceneRoute.SIGN_IN}]
    })
  }
  
  return (
    <React.Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>

        <Layout style={styles.TopTabBar}>
          
          <Layout style={{flex : 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity style={styles.BackButton} onPress={() => {PressBack()}}>
             <AngleLeft />
            </TouchableOpacity>
          </Layout>


          <Layout style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../../assets/Glokool_Logo.png')} style={{width: 129, height: 20}} resizeMode={'stretch'}/>
          </Layout>

          <Layout style={{flex: 1}} />
        </Layout>


        {(button)? 

        <Layout style={styles.container}>
                  
          <Email style={{marginVertical: 10}}/>

          <Text style={styles.desc}>Please check your e-mail and click on the link we sent you to complete sign up.</Text>

          <TouchableOpacity style={styles.Button} onPress={() => {props.navigation.goBack()}}>
            <Text style={styles.ButtonText}>Back to Login</Text>
          </TouchableOpacity>

        </Layout>
        
        : 
         
        <Layout style={styles.container}>
          
          <Alert style={{marginVertical: 10}}/>
          
          <Text style={styles.title}>E-mail check error</Text>
          <Text style={styles.desc}>Sorry, failed to verify your membership. Please check your e-mail again.</Text>

          <TouchableOpacity style={styles.Button} onPress={() => {SendEmailButton()}}>
            <Text style={styles.ButtonText}>Resend Verification Code</Text>
          </TouchableOpacity>
          
        </Layout>
        
        }
        

        


    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  nextButton: {
    width: 360,
    height: 56,
    backgroundColor: '#FFC043',
    borderColor: '#FFC043',
    marginVertical: 10,
  },
  title: {
    fontFamily: 'IBMPlexSansKR-SemiBold',
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 10,
  },
  desc: {
    fontFamily: 'IBMPlexSansKR-SemiBold',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  TopTabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 60
  },
  BackButton : {
    justifyContent: 'center',
    padding : 20
  },
  Button : {
    width: 350,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7777FF',
    borderRadius: 15
  },
  ButtonText: {
    fontFamily: 'BrandonGrotesque-BoldItalic',
    fontSize: 21,
    textAlign: 'center',
    marginVertical: 10,
    color: 'white'
  }
});