import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  SafeAreaView,
  View,
} from 'react-native';
import {
  Layout,
  Button,
  LayoutElement,
  Text,
} from '@ui-kitten/components';
import { Formik, FormikProps } from 'formik';
import { EyeIcon, EyeOffIcon } from '../../component/icon';
import { FormInput } from '../../component/form-input.component';
import { SignInData, SignInSchema } from '../../data/sign-in.model';
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route'
import { CommonActions, StackActions } from '@react-navigation/native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SignInScreenProps } from '../../navigation/auth.navigator';
import Toast from 'react-native-easy-toast';


/*
  로그인 화면
*/
var toastRef;

export const SigninScreen = (props: SignInScreenProps): LayoutElement => {

  //비밀번호 보이기 안보이기
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const MainNavigate = CommonActions.reset({
    index: 0,
    routes: [{name: NavigatorRoute.MAIN}],
  });

  const onFormSubmit = (values: SignInData): void => {

    if(values.email == "" || values.password == ""){

    }
    
    else{
      toastRef.show("LOGIN...", 2000);

      auth().signInWithEmailAndPassword(values.email, values.password)
        .then((user) => {
  
  
          console.log('로그인 화면 - 이메일 인증여부 판단...');
          toastRef.show("Login Success!");
  
  
          if (user.user.emailVerified == true) {
            props.navigation.dispatch(MainNavigate);
          }
          else {
            props.navigation.reset({
              index: 0,
              routes: [{ name: SceneRoute.EMAIL_FAIL}]
            });
          }
        })
        .catch((error) => {
          var errorMessage = error.message;        
          console.log('로그인화면 - 로그인 실패',errorMessage);
          toastRef.show(error.code, 3000);
        });
    }
    
  };

  const navigateSignUp = (): void => {
    props.navigation.navigate(SceneRoute.SIGN_UP)
  };

  const navigateResetPassword = (): void => {    
    props.navigation.navigate(SceneRoute.PASSWORD);

  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordIcon = (props): React.ReactElement => {
    const IconComponent = passwordVisible ? EyeIcon : EyeOffIcon;
    return (
      <TouchableWithoutFeedback onPress={onPasswordIconPress}>
        <IconComponent {...props}/>
      </TouchableWithoutFeedback>
    );
  };
  
  const renderForm = (props: FormikProps<SignInData>): React.ReactFragment => (
    <React.Fragment>
      <Layout style={styles.InputContainer}>
        <Text style={styles.smallTitle}>E-Mail</Text>
        <FormInput
          id='email'
          style={styles.formControl}
          placeholder='Email'
          keyboardType='email-address'
        />
        <Text style={styles.smallTitle}>Password</Text>
        <FormInput
          id='password'
          style={styles.formControl}
          placeholder='Password'
          secureTextEntry={!passwordVisible}
          accessoryRight={renderPasswordIcon}
        />
        
      </Layout>
      <Layout style={styles.resetPasswordContainer}>
        <Button
          appearance='ghost'
          status='basic'
          onPress={navigateResetPassword}
          >
          Forget password?
        </Button>
      </Layout>
      <Layout style={styles.buttonContainer}>
        <Button
          style={styles.submitButton}
          onPress={props.handleSubmit}
          size='large'
          >
          SIGN IN
        </Button>
        <Button
          style={styles.noAccountButton}
          onPress={navigateSignUp}
          size='large'
          >
          SIGN UP
        </Button>
      </Layout>            
    </React.Fragment>
  );
    
  return (
    <React.Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/> 
      
        <Layout style={styles.formContainer}>    
            <Layout style={styles.titleContainer}>
              <Text style={styles.title}>GLOKOOL</Text>
            </Layout>
            <ScrollView style={{backgroundColor: '#FFC043',}}>
              <Formik
                initialValues={SignInData.empty()}
                validationSchema={SignInSchema}
                onSubmit={onFormSubmit}>
                {renderForm}
              </Formik>              
            </ScrollView>
            <Toast ref={(toast) => toastRef = toast} position={'bottom'}/>
        </Layout>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  formContainer:{
    flex: 1,
    backgroundColor: '#FFC043',
    width: '100%',
  },
  title:{
    color: 'white',
    fontSize: 40,
    marginVertical: 15,
  },
  resetPasswordContainer: {
    alignItems: 'flex-end',
    backgroundColor: '#FFC043',
  },
  formControl: {
    marginVertical: 8,
  },
  titleContainer: {
    backgroundColor: '#FFC043',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    backgroundColor: '#FFC043',
    flex:3,   
  },
  InputContainer: {
    backgroundColor: '#FFC043',
    margin: 10,
    width: '90%',
  },
  submitButton: {
    marginVertical: 8,
    width: '90%',
    height: '25%',
    backgroundColor: '#00ff0000',
    borderColor: '#FFFFFF',
  },
  noAccountButton: {
    marginVertical: 8,
    width: '90%',
    height: '25%',
    backgroundColor: '#00ff0000',
    borderColor: '#FFFFFF',
  },
  smallTitle :{
    alignItems: 'flex-start',
    marginHorizontal: 10,
    marginVertical: 5,
    color: '#FFFFFF',
    fontSize: 16
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#FFC043',
    alignItems: 'center',
    justifyContent: 'center',
  }
});