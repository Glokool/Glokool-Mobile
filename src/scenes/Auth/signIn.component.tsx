import React from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/firestore';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView, 
  TouchableWithoutFeedback,
  Image,
  Dimensions
} from 'react-native';
import {
  Layout,
  LayoutElement,
  Text,
} from '@ui-kitten/components';
import { Formik, FormikProps } from 'formik';
import { EyeIcon, EyeOffIcon } from '../../component/icon';
import { FormInput } from '../../component/form-input.component';
import { SignInData, SignInSchema } from '../../data/sign-in.model';
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route'
import { CommonActions } from '@react-navigation/native';
import { SignInScreenProps } from '../../navigation/auth.navigator';
import Toast from 'react-native-easy-toast';
import { AngleLeft_Color } from '../../assets/icon/Common';

var toastRef : any;
const WindowSize = Dimensions.get('window').width

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
    if(auth().currentUser != null){
      auth().signOut();
    }
    props.navigation.replace(NavigatorRoute.MAIN);
  }
  
  const renderForm = (props: FormikProps<SignInData>): React.ReactFragment => (
    <React.Fragment>
      
      <Layout style={styles.InputContainer}>
        <Text style={styles.smallTitle}>E-Mail</Text>
        <FormInput
          id='email'
          style={styles.formControl}
          placeholder='email'
          keyboardType='email-address'
        />
        <Text style={styles.smallTitle}>Password</Text>
        <FormInput
          id='password'
          style={styles.formControl}
          placeholder='Password'
          secureTextEntry={!passwordVisible}
        />
        
      </Layout>
      
      <Layout style={styles.resetPasswordContainer}>
        <TouchableOpacity onPress={() => {navigateResetPassword()}}>
          <Text style={styles.ForgetButtonText}>Forget password?</Text>
        </TouchableOpacity>
      </Layout>

      <Layout style={styles.buttonContainer}>
        
        <TouchableOpacity style={styles.CAButton} onPress={() => navigateSignUp()}>
          <Text style={styles.CAButtonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.LoginButton} onPress={() => onFormSubmit(props.values)}>
          <Text style={styles.LoginButtonText}>Login</Text>
        </TouchableOpacity>

      </Layout>            
    </React.Fragment>
  );
    
  return (
    <React.Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/> 
      
        <ScrollView style={styles.formContainer}>

          {/* 투명 탭바 */}
          <Layout style={styles.TabBar}>
              <Layout style={{flex: 1, backgroundColor: '#00ff0000'}}>
                <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
                <TouchableOpacity style={styles.IconContainer} onPress={() => PressBack()}>
                  <AngleLeft_Color />
                </TouchableOpacity>
              </Layout>
              
              <Layout style={{flex: 5, backgroundColor: '#00ff0000'}}/>

              <Layout style={{flex: 1, backgroundColor: '#00ff0000'}}>
                <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
              </Layout>
          </Layout>  

          <Layout style={styles.titleContainer}>
            <Image source={require('../../assets/Glokool_Logo.png')} style={{width: 193, height: 30}} resizeMode={'stretch'}/>
          </Layout>

          <Formik
            initialValues={SignInData.empty()}
            validationSchema={SignInSchema}
            
            onSubmit={onFormSubmit}>
            {renderForm}
          </Formik>              

            <Toast ref={(toast) => toastRef = toast} position={'center'}/>
            
        </ScrollView>

      
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  formContainer:{
    flex: 1,
    width: '100%',
    backgroundColor: 'white'
  },
  title:{
    color: 'white',
    fontSize: 40,
    marginVertical: 15,
  },
  resetPasswordContainer: {
    alignItems: 'flex-end',
    backgroundColor: '#00FF0000',
  },
  formControl: {
    marginVertical: 8,

  },
  titleContainer: {
    backgroundColor: '#00FF0000',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50
  },
  container: {
    backgroundColor: '#00FF0000',
    flex:3,   
  },
  InputContainer: {
    backgroundColor: '#00FF0000',
    margin: 10,
    width: '90%',
  },
  smallTitle :{
    alignItems: 'flex-start',
    marginHorizontal: 10,
    marginVertical: 5,
    color: '#8797FF',
    fontSize: 16
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#00FF0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TabBar:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#00ff0000',
  },
  IconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    padding: 20
  },
  CAButton: {
    width: WindowSize - 60,
    height: 50,
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5
  },
  LoginButton: {
    width: WindowSize - 60,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#7777FF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5
  },
  CAButtonText: {
    fontFamily: 'BrandonGrotesque-BoldItalic',
    fontSize: 21,
    color: '#7777FF'
  },
  LoginButtonText: {
    fontFamily: 'BrandonGrotesque-BoldItalic',
    fontSize: 21,
    color: 'white'
  },

  ForgetButtonText : {
    fontFamily: 'IBMPlexSansKR-Medium',
    color: '#7777FF',
    marginRight: 30,
    marginVertical: 10
  }
});