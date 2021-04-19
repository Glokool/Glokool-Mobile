import React from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/firestore';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView, 
  TouchableWithoutFeedback
} from 'react-native';
import {
  Layout,
  Button,
  LayoutElement,
  Text,
} from '@ui-kitten/components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Formik, FormikProps } from 'formik';
import { EyeIcon, EyeOffIcon } from '../../component/icon';
import { FormInput } from '../../component/form-input.component';
import { SignInData, SignInSchema } from '../../data/sign-in.model';
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route'
import { CommonActions } from '@react-navigation/native';
import { SignInScreenProps } from '../../navigation/auth.navigator';
import Toast from 'react-native-easy-toast';

var toastRef : any;

export const SigninScreen = (props: SignInScreenProps): LayoutElement => {

  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const MainNavigate = CommonActions.reset({
    index: 0,
    routes: [{name: NavigatorRoute.MAIN}],
  });

  const onFormSubmit = (values: SignInData): void => {

    if(values.email == "" || values.password == ""){
      toastRef.show("Email or Password is Empty!");  
    }
    
    else{
      toastRef.show("LOGIN...", 2000);

      auth().signInWithEmailAndPassword(values.email, values.password)
        .then((user) => {    
          console.log('로그인 화면 - 이메일 인증여부 판단...');
          

          firebase().collection('Users').doc(user.user.uid).get()
              .then((result) => {
                  if(result.exists == false){
                    // 유저가 아닌 가이드 회원 (어드민일수 있지만 제외)
                    toastRef.show(`We're sorry, but you can't log in to the guide account`, 2000)
                  }
                  else{

                    if (user.user.emailVerified == true) {
                      toastRef.show("Login Success!");
                      props.navigation.dispatch(MainNavigate);
                    }

                    else {
                      props.navigation.reset({
                        index: 0,
                        routes: [{ name: SceneRoute.EMAIL_FAIL}]
                      });
                    }

                  }
              })
              .catch((err) => {

              })  
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

  const renderPasswordIcon = (props : any) : React.ReactElement => {
    const IconComponent = passwordVisible ? EyeIcon : EyeOffIcon;
    return (
      <TouchableWithoutFeedback onPress={onPasswordIconPress}>
        <IconComponent {...props}/>
      </TouchableWithoutFeedback>
    );
  };

  const PressBack = () => {
    props.navigation.replace(NavigatorRoute.MAIN);
  }
  
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

      {/* 투명 탭바 */}
      <Layout style={styles.TabBar}>
          <Layout style={{flex: 1, backgroundColor: '#00ff0000'}}>
            <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
            <TouchableOpacity style={styles.IconContainer} onPress={PressBack}>
              <FontAwesomeIcon icon={faAngleLeft} style={{color: 'white'}} size={32}/>
            </TouchableOpacity>
          </Layout>
          
          <Layout style={{flex: 5, backgroundColor: '#00ff0000'}}/>

          <Layout style={{flex: 1, backgroundColor: '#00ff0000'}}>
            <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
          </Layout>
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
  },
  TabBar:{
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#00ff0000',
    zIndex : 3
  },
  IconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15
  },
});