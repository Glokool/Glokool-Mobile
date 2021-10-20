import React from 'react';
import auth from '@react-native-firebase/auth'
import {
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  NavigatorRoute,
} from '../../navigation/app.route'
import { PasswordData, PasswordSchema } from '../../data/Password.model';
import { Formik, FormikProps } from 'formik';
import { CommonActions } from '@react-navigation/native';
import {
  LayoutElement,
  Layout,
} from '@ui-kitten/components';
import { PasswordResetScreenProps } from '../../navigation/auth.navigator';
import { FormInput } from '../../component/form-input.component';

export const PasswordResetScreen = (props: PasswordResetScreenProps): LayoutElement => {

  const AuthNavigate = CommonActions.reset({
    index: 0,
    routes: [{ name: NavigatorRoute.AUTH }],
  });

  const PressBack = (): void => {
    auth().signOut();
    props.navigation.dispatch(AuthNavigate);
  };

  const onFormSubmit = (values: PasswordData): void => {
    if (values.email == '') {

    }
    else {
      auth().sendPasswordResetEmail(values.email)
        .then(function () {
          props.navigation.dispatch(AuthNavigate);
        })
        .catch((error) => {
          console.log(error)
        })

    }
  }

  const renderForm = (Props: FormikProps<PasswordData>): React.ReactFragment => (
    <React.Fragment>

      <Layout style={styles.InputContainer}>
        <Text style={styles.smallTitle}>E-mail</Text>
        <FormInput
          id='email'
          style={styles.formControl}
          placeholder='Write your E-mail'
          keyboardType='email-address'
        />
      </Layout>

      <TouchableOpacity style={styles.EmailButton} onPress={() => onFormSubmit(Props.values)}>
        <Text style={styles.EmailButtonTxt}>SEND TO E-MAIL</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.BackButton} onPress={() => props.navigation.goBack()}>
        <Text style={styles.BackButtonTxt}>BACK</Text>
      </TouchableOpacity>

    </React.Fragment>
  )


  React.useEffect(() => {

    return () => {
      auth().signOut;
    }

  }, [])

  return (
    <React.Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />

      <Layout style={styles.container}>

        <Image style={{ width: 200, height: 30, marginBottom: 100 }} source={require('../../assets/Glokool_Logo.png')} />

        <Text style={styles.TitleTxt}>Forgot your password?</Text>
        <Text style={styles.descTxt}>Glokool will send you a link to your email.</Text>

        <Layout style={styles.InputContainer}>
          <Formik
            initialValues={PasswordData.empty()}
            validationSchema={PasswordSchema}
            onSubmit={onFormSubmit}>
            {renderForm}
          </Formik>
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
  nextButton: {
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
  },
  formControl: {
    marginVertical: 8,
  },
  InputContainer: {
    margin: 10,
    width: '90%',
  },
  EmailButton: {
    borderRadius: 15,
    backgroundColor: '#7777FF',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 56,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 50
  },
  EmailButtonTxt: {
    fontFamily: 'BrandonGrotesque-BoldItalic',
    fontSize: 21,
    color: '#FFFFFF'
  },
  BackButton: {
    borderRadius: 15,
    width: '100%',
    height: 56,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    alignSelf: 'center',
    marginTop: 10
  },
  BackButtonTxt: {
    fontFamily: 'BrandonGrotesque-BoldItalic',
    fontSize: 21,
    color: '#7777FF'
  },
  smallTitle: {
    alignItems: 'flex-start',
    marginHorizontal: 10,
    marginVertical: 0,
    color: '#8797FF',
    fontSize: 12
  },
  TitleTxt: {
    fontFamily: 'IBMPlexSansKR-SemiBold',
    fontSize: 22,
    textAlign: 'center'
  },
  descTxt: {
    fontFamily: 'IBMPlexSansKR-Medium',
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 50,
    marginVertical: 20
  }
});