import React from 'react';
import auth from '@react-native-firebase/auth'
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Layout,
  LayoutElement,
  Text,
  Button
} from '@ui-kitten/components';
import { Formik, FormikProps } from 'formik';
import { PrivacyData, PrivacySchema } from '../../../data/privacy.model';
import { FormInput } from '../../../component/privacy.component';
import { EyeIcon, EyeOffIcon } from '../../../component/icon';
import Toast from 'react-native-easy-toast';
import { PrivacyLoginProps } from '../../../navigation/ScreenNavigator/My.navigator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { CommonActions } from '@react-navigation/native';
import { SceneRoute } from '../../../navigation/app.route'

var toastRef : any;

export const PrivacyLogin = (props: PrivacyLoginProps): LayoutElement => {

  //뒤로 돌아가지 못하게
  const PrivacyNavigator = CommonActions.reset({
    index: 0,
    routes: [{name: SceneRoute.MY_PAGE_PRIVACY_CONFIRM}],
  });

  //비밀번호 보이기 안보이기
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const renderPasswordIcon = (props): React.ReactElement => {
    const IconComponent = passwordVisible ? EyeIcon : EyeOffIcon;
    return (
      <TouchableWithoutFeedback onPress={onPasswordIconPress}>
        <IconComponent {...props}/>
      </TouchableWithoutFeedback>
    );
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  
  const PressBack = () => {
    props.navigation.goBack();
  }

  const renderForm = (props: FormikProps<PrivacyData>): React.ReactFragment => (
    <React.Fragment>
      <Layout style={styles.inputContainer}>
        <FormInput
          id='password'
          placeholder='Password'
          secureTextEntry={!passwordVisible}
          accessoryRight={renderPasswordIcon}
        />

        <Button
          style={styles.submitButton}
          onPress={props.handleSubmit}
          size='large'
        >
          NEXT
        </Button>
        
        </Layout>
    </React.Fragment>
  );

  const onFormSubmit = (values: PrivacyData): void => {

    toastRef.show('Login...', 3000);

    if(values.password == ""){

    }    
    else{
      const user = auth().currentUser
      
      auth().signInWithEmailAndPassword(user?.email, values.password)
        .then(response => {
          toastRef.show('Login Success', 3000);
          props.navigation.dispatch(PrivacyNavigator);
        })
        .catch((error) => {
          console.log(error)
          toastRef.show(error.code, 3000);
        })
    }
    
  };

  return (
    <React.Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <Layout style={styles.mainContainer}>

        {/*탭바 표현*/}
        <Layout style={styles.Tabbar}>
          <Layout style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={PressBack}>
              <FontAwesomeIcon icon={faAngleLeft} size={24}/>
            </TouchableOpacity>
          </Layout>
          <Layout style={{flex:3, alignItems:'center', justifyContent: 'center', marginHorizontal: 25}}>
            <Text style={styles.TextStyle}>SETTINGS</Text>
          </Layout>
          <Layout style={{flex:1}}/>         
        </Layout>

        {/* 세팅 내용물*/}

        <Layout style={styles.container}>
          <Text style={styles.mainTitle}>Privacy</Text>
          <Text style={styles.mainDesc}>Please enter your current password before entering a new password.</Text>
          <Formik
              initialValues={PrivacyData.empty()}
              validationSchema={PrivacySchema}
              onSubmit={onFormSubmit}>
              {renderForm}
          </Formik>
          
        </Layout>      
      </Layout>

      <Toast ref={(toast) => toastRef = toast} style={{backgroundColor:'#C9C9C9'}} textStyle={{color:'black'}} position={'bottom'}/>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    backgroundColor: 'white',
  },
  Tabbar: {
    flex: 1,
    flexDirection: 'row',
  },
  TextStyle: {    
    fontSize: 20,
    fontWeight: 'bold'
  },
  container: {
    flex: 9,
    padding: 20
  },
  mainTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20
  },
  mainDesc: {
    fontSize: 16,
    marginBottom: 15,
  },
  inputContainer: {    
    alignItems: 'center'
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#FFC043',
    width: '100%',
  },
  submitButton: {
    marginVertical: 30,
    width: '100%',
    height: '20%',
  },
  toast: {
    backgroundColor : '#C9C9C9',

  }
});