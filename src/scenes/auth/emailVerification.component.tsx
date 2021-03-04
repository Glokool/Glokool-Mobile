import React from 'react';
import auth from '@react-native-firebase/auth'
import {
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { 
  NavigatorRoute,
} from '../../navigation/app.route'
import { CommonActions } from '@react-navigation/native';
import {
  Button,
  LayoutElement,
  Layout,
} from '@ui-kitten/components';
import Toast from 'react-native-simple-toast';
import { EmailVerificationScreenProps } from '../../navigation/auth.navigator';



export const EmailVerificationScreen = (props: EmailVerificationScreenProps): LayoutElement => {

  const AuthNavigate = CommonActions.reset({
    index: 0,
    routes: [{name: NavigatorRoute.AUTH}],
  });

  const user = auth().currentUser;
  
  
  user?.sendEmailVerification().then(function() {    
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
  });
  
  const NextButton = (): void => {
    props.navigation.dispatch(AuthNavigate);  
  }

  return (
    <React.Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
      <Layout style={styles.container}>
        <Image style={{marginVertical: 20}}source={require('../../assets/Verification.png')}/>
        <Text style={styles.title}>Please check your e-mail {user?.email} and click</Text>
        <Text style={styles.title}>the link we sent to complete sign up.</Text>

        <Layout>
          <Button style={styles.nextButton} onPress={NextButton}>
            Check Your Email? Go to the Next Page
          </Button>
        </Layout>
        
      </Layout>
      
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
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nextButton: {
    width: '90%',
    height: '25%',
    backgroundColor: '#FFC043',
    borderColor: '#FFC043',
    marginVertical: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  }
});