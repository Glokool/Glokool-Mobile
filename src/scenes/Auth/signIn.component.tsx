import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from "@react-native-firebase/app";
import 'firebase/auth';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView, 
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Button,
  Platform,
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
import { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginButton, AccessToken, LoginManager, Profile, AuthenticationToken } from 'react-native-fbsdk-next';
import { GoogleLogin, AppleLogin, FbLogin } from '../../assets/icon/Auth';
import { FirebaseStorageTypes } from '@react-native-firebase/storage';


GoogleSignin.configure({
  webClientId: '',
});

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
          
          firestore().collection('Users').doc(user.user.uid).get()
              .then((result) => {
                  if (user.user.emailVerified == true) {
                    toastRef.show("Login Success!");
                    props.navigation.dispatch(MainNavigate);
                  }
                  else {
                    props.navigation.navigate(SceneRoute.EMAIL_FAIL, { email : values.email, passward: values.password });
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


  // SNS login 

  // apple login 
  async function onAppleButtonPress() {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw 'Apple Sign-In failed - no identify token returned';
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential);
  }


  // Google login 
  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log('googleCredential : ' +  googleCredential.token)
    // Sign-in the user with the credential
    await auth().signInWithCredential(googleCredential);

    const user = auth().currentUser;

    firestore().collection('Users').doc(user?.uid).get()
    .then((result) => {
      if(result.data()){
        return props.navigation.dispatch(MainNavigate);
        console.log('result --> ' + result.data());
      }
      return props.navigation.navigate(SceneRoute.SNS_SIGN_UP);
    })

  }


  // Facebook login
   const onFacebookButtonPress = async() => {

      // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    // Sign-in the user with the credential
    await auth().signInWithCredential(facebookCredential);

    const user = auth().currentUser;

    firestore().collection('Users').doc(user?.uid).get()
    .then((result) => {
      if(result.data()){
        return props.navigation.dispatch(MainNavigate);
        console.log('result --> ' + result.data());
      }
      return props.navigation.navigate(SceneRoute.SNS_SIGN_UP);
    })


    }

     




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

            <TouchableOpacity onPress={() => onGoogleButtonPress()} style={styles.SnsLoginLogo}>
              <GoogleLogin />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))} style={styles.SnsLoginLogo}>
              <AppleLogin />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onFacebookButtonPress()}  style={styles.SnsLoginLogo}>
              <FbLogin />
            </TouchableOpacity>
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
    marginVertical: 50,
  },
  SnsLoginLogo: {
    alignItems: 'center',
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