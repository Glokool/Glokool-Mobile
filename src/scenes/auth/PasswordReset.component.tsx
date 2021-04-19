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
import { PasswordData, PasswordSchema } from '../../data/password.model';
import { Formik, FormikProps } from 'formik';
import { FormInput } from '../../component/password.component';
import { CommonActions } from '@react-navigation/native';
import {
  Button,
  LayoutElement,
  Layout,
} from '@ui-kitten/components';
import { PasswordResetScreenProps } from '../../navigation/auth.navigator';

export const PasswordResetScreen = (props: PasswordResetScreenProps): LayoutElement => {

  const [sendbutton, setButton] = React.useState(false);

  const AuthNavigate = CommonActions.reset({
    index: 0,
    routes: [{name: NavigatorRoute.AUTH}],
  });

  const PressBack = (): void => {
    auth().signOut();
    props.navigation.dispatch(AuthNavigate);  
  };

  const onFormSubmit = (values: PasswordData): void => {
    if(values.email == ''){

    }
    else{
        auth().sendPasswordResetEmail(values.email)
          .then(function() {
            setButton(true);
            props.navigation.dispatch(AuthNavigate);
          })
          .catch((error) => {
            console.log(error)
          })

    }
  }

  const renderForm = (props: FormikProps<PasswordData>): React.ReactFragment => (
    <React.Fragment>
      <Layout style={styles.InputContainer}>
        <FormInput
          id='email'
          style={styles.formControl}
          placeholder='Email'
          keyboardType='email-address'
        />
      </Layout>

      <Layout style={{padding: 20}}>
        <Button style={styles.nextButton} disabled={sendbutton} onPress={props.handleSubmit}>
          SEND THE EMAIL
        </Button>
        <Button style={styles.nextButton} onPress={PressBack}>
          Back To Login
        </Button>
      </Layout>
    </React.Fragment>
  )


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
        <Text style={styles.title}>리셋을 원하는 이메일 주소를 입력하세요</Text>
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
});