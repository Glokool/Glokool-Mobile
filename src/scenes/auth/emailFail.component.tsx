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
import { EmailFailScreenProps } from '../../navigation/auth.navigator';



export const EmailFailScreen = (props: EmailFailScreenProps): LayoutElement => {

  const [button, setButton] = React.useState(false);


  const AuthNavigate = CommonActions.reset({
    index: 0,
    routes: [{name: NavigatorRoute.AUTH}],
  });

  const SendEmailButton = (): void => {
    const user = auth().currentUser;

    user?.sendEmailVerification()
      .then(function() { 
        console.log('이메일 전송 성공')
    })
      .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
    });

    setButton(true);
  }
  
  const NextButton = (): void => {
    auth().signOut();
    props.navigation.dispatch(AuthNavigate);  
  };


  React.useEffect(() => {

    return () => {
      auth().signOut;
    }
  }, [])

  return (
    <React.Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
      <Layout style={styles.container}>
        <Image style={{marginVertical: 20}}source={require('../../assets/Verification.png')}/>
        <Text style={styles.title}>Please check your e-mail and click </Text>
        <Text style={styles.title}>the link we sent to complete sign up.</Text>

        <Layout>
          <Button style={styles.nextButton} disabled={button} onPress={SendEmailButton}>
            SEND THE EMAIL
          </Button>
          <Button style={styles.nextButton} onPress={NextButton}>
            BACK TO LOGIN
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
    width: 360,
    height: 56,
    backgroundColor: '#FFC043',
    borderColor: '#FFC043',
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  }
});