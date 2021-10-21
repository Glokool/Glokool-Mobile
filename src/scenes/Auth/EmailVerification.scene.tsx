import React from 'react';
import auth from '@react-native-firebase/auth'
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  NavigatorRoute,
} from '../../navigation/app.route'
import { CommonActions } from '@react-navigation/native';
import {
  LayoutElement,
  Layout,
} from '@ui-kitten/components';

import { EmailVerificationScreenProps } from '../../navigation/auth.navigator';
import { Email } from '../../assets/icon/Auth';


export const EmailVerificationScreen = (props: EmailVerificationScreenProps): LayoutElement => {

  const AuthNavigate = CommonActions.reset({
    index: 0,
    routes: [{ name: NavigatorRoute.AUTH }],
  });

  const SendEmailButton = async () => {

    const user = auth().currentUser;
    const EMail = await user?.sendEmailVerification();

  }

  React.useEffect(() => {

    SendEmailButton();

    return () => {
      auth().signOut;
    };

  }, [])

  return (
    <React.Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />

      <Layout style={styles.container}>

        <Email style={{ marginVertical: 10 }} />

        <Text style={styles.desc}>Please check your e-mail and click on the link we sent you to complete sign up.</Text>

        <TouchableOpacity style={styles.Button} onPress={() => { props.navigation.dispatch(AuthNavigate) }}>
          <Text style={styles.ButtonText}>Back to Login</Text>
        </TouchableOpacity>

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
  BackButton: {
    justifyContent: 'center',
    padding: 20
  },
  Button: {
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