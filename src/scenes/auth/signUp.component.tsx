import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {
  CheckBox,
  Layout,
  Button,
  Text,
  IndexPath,
  Select,
  SelectItem,
  Datepicker,
  LayoutElement,
  Divider,
  Modal,
  Card
} from '@ui-kitten/components';
import { SceneRoute } from '../../navigation/app.route'
import { Formik, FormikProps } from 'formik';
import { EyeIcon, EyeOffIcon } from '../../component/icon';
import { FormInformation } from '../../component/form-information.component';
import { SignUpData, SignUpSchema } from '../../data/sign-up.model';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import CountryPicker from 'react-native-country-picker-modal'
import { CountryCode, Country } from '../../data/countryTypes'
import { SignUpScreenProps } from '../../navigation/auth.navigator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes}  from '@fortawesome/free-solid-svg-icons';
import { TermsConditionCard } from '../../component/terms&Condition.component'
import { privacyPolicycard } from '../../component/privacyPolicy.component'

const useDatepickerState = (initialDate = null) => {
  const [date, setDate] = React.useState(initialDate);
  return { date, onSelect: setDate };
};


export const SignupScreen = (props: SignUpScreenProps): LayoutElement => {

  //내부 로직용 (비밀번호 디스플레이), 
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  
  //약관 확인했는지 
  const [TermsConditions, TermsConditionsChecked] = React.useState(false);
  const [Privacy, PrivacyChecked] = React.useState(false);

  //약관용
  const [termsCondition, setTermsCondition] = React.useState(false);
  const [privacyPolicy, setPrivacyPolicy] = React.useState(false);

  const PressTerms = () => {
     setTermsCondition(true)
  }

  const PressPrivacy = () => {
    setPrivacyPolicy(true);
  }

  const PressX = () => {
    setTermsCondition(false);
    setPrivacyPolicy(false);
  }

  const TermsConditionsHeader = (props) => (
    <Layout style={{flexDirection: 'row', padding: 20}}>
      <Layout style={{flex: 1, alignItems: 'flex-start'}}>
        <Text style={{fontSize: 14, fontWeight: 'bold', alignItems: 'center'}}>Terms and Conditions</Text>
      </Layout>
                  
      
      <Layout style={{flex: 1, alignItems: 'flex-end'}}>
        <TouchableOpacity onPress={PressX}>
          <FontAwesomeIcon icon={faTimes} size={28}/>
        </TouchableOpacity> 
      </Layout>
      
    </Layout>      
  );

  const PrivacyPolicyHeader = (props) => (
    <Layout style={{flexDirection: 'row', padding: 20}}>
      <Layout style={{flex: 1, alignItems: 'flex-start'}}>
        <Text style={{fontSize: 14, fontWeight: 'bold', alignItems: 'center'}}>Privacy Policy</Text>
      </Layout>
                  
      
      <Layout style={{flex: 1, alignItems: 'flex-end'}}>
        <TouchableOpacity onPress={PressX}>
          <FontAwesomeIcon icon={faTimes} size={28}/>
        </TouchableOpacity> 
      </Layout>
      
    </Layout>      
  );
  



  //Date of Birth
  const startDay = new Date(1900, 1, 1);
  const now = new Date();
  const minMaxPickerState = useDatepickerState();
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

  //Sex
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const gender = [
    '-',
    'Male',
    'Female',
    'Prefer not to say'
  ];

  const displayValue = gender[selectedIndex.row]; // 성별 정하기 (0 : male, 1: female)

  

  // 프로필용 사진 업로드
  const [picCheck, setPicCheck] = React.useState<boolean>(false);
  const [imageUrl, setImageUrl] = React.useState('');
  const defaultImage = require('../../assets/profile.jpg')

  // 나라 선택용 플래그
  const [countryCode, setCountryCode] = React.useState<CountryCode>(null)
  const [country, setCountry] = React.useState<Country>(null);
  const [withCountryNameButton, setWithCountryNameButton] = React.useState<boolean>(true,)
  const [withFlag, setWithFlag] = React.useState<boolean>(true)
  const [withEmoji, setWithEmoji] = React.useState<boolean>(true)
  const [withFilter, setWithFilter] = React.useState<boolean>(true)
  const [withAlphaFilter, setWithAlphaFilter] = React.useState<boolean>(false)
  const [withCallingCode, setWithCallingCode] = React.useState<boolean>(false)
  const onSelect = (country: Country) => {
    setCountryCode(country.cca2)
    setCountry(country)
  }

  const profileUpdate = (user, values: SignUpData) => {

    var profile = user.updateProfile({
      displayName : values.name,
      photoURL: ''          
    })
    .then(() => {
      console.log('프로필 업데이트 성공')
    })
    .catch(() => {      
      console.log('프로필 업데이트 실패')
    })
  };

  const profileDocUpdate = (user, values: SignUpData) => {

    var userDocument = firestore()
      .collection('Users')
      .doc(user?.uid)
      .set({
        name : values.name,
        email : values.email,
        gender : gender[selectedIndex.row],
        country : country.name,
        signupDate : new Date(),  //가입한 날짜
        birthDate : minMaxPickerState.date
      })
      .then(() => {
        console.log('프로필 문서 업데이트 성공')
      })
      .catch(() => {
        console.log('프로필 문서 업데이트 성공')
      })

  };


  function onFormSubmit(values: SignUpData) { // Firebase에 회원가입 (이메일, 비밀번호만 전송)
    auth().createUserWithEmailAndPassword(values.email, values.password)
      .then((response) => {
        profileDocUpdate(response.user, values);
        profileUpdate(response.user, values);      
        props.navigation.reset({
          index: 0,
          routes: [{ name: SceneRoute.EMAIL_VERIFICATION}]
        });
        console.log(response);
      })
      .catch((error) => {
        console.log(error)
      });
  };
      

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordIcon = (props): React.ReactElement => {
    const IconComponent = passwordVisible ? EyeIcon : EyeOffIcon;
    return (
      <TouchableWithoutFeedback onPress={onPasswordIconPress}>
        <IconComponent {...props} />
      </TouchableWithoutFeedback>
    );
  };

  const renderPasswordIcon2 = (props): React.ReactElement => {
    const IconComponent = passwordVisible ? EyeIcon : EyeOffIcon;
    return (
      <TouchableWithoutFeedback onPress={onPasswordIconPress}>
        <IconComponent {...props} />
      </TouchableWithoutFeedback>
    );
  };
  
  const renderForm = (props: FormikProps<SignUpData>): React.ReactFragment => (
    // 
    <React.Fragment>
      <ScrollView>     
      <View style={{flex: 1}}>
        <Text style={styles.smallTitle}>Name</Text>
        <FormInformation
          id='name'
          style={styles.formControl}
          placeholder='Name'
        />
        <Text style={styles.smallTitle}>E-Mail</Text>
        <FormInformation
          id='email'
          style={styles.formControl}
          placeholder='Email'
          keyboardType='email-address'
        />
        <Text style={styles.smallTitle}>Password</Text>
        <FormInformation
          id='password'
          style={styles.formControl}
          placeholder='Password'
          secureTextEntry={!passwordVisible}
          accessoryRight={renderPasswordIcon}
        />
        <Text style={styles.smallTitle}>Repeat Password</Text>
        <FormInformation
          id='passwordConfirm'
          style={styles.formControl}
          placeholder='Password Confirm'
          secureTextEntry={!passwordVisible}
          accessoryRight={renderPasswordIcon2}
        />

        <View style={{justifyContent: 'center', marginVertical: 15}}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              style={{marginRight: 10}}
              checked={TermsConditions}
              onChange={nextChecked => TermsConditionsChecked(nextChecked)}/>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 16}}>I agree to the Terms and Conditions.</Text>
              <TouchableOpacity onPress={PressTerms}>
                <Text style={{fontWeight: 'bold', fontSize: 12}}>Terms and Conditions</Text>
              </TouchableOpacity>              
            </View>          
          </View>

          <View style={styles.checkboxContainer}>
            <CheckBox
              style={{marginRight: 10}}
              checked={Privacy}
              onChange={nextChecked => PrivacyChecked(nextChecked)}/>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 16}}>I agree to the I agree to the Privacy Policy.</Text>
              <TouchableOpacity onPress={PressPrivacy}>
                <Text style={{fontWeight: 'bold', fontSize: 12, marginTop: 5}}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>    
        </View>

        <Divider style={{backgroundColor: '#C9C9C9', marginVertical: 10}}/>
      </View>   
      
      <View style={{flex:1}}>
        <Text style={styles.title}>Optional</Text>
        
        <Text style={styles.smallTitle}>Sex</Text>
        <Select
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}
          placeholder={'Please select a gender'}
          value={displayValue}
        >
          <SelectItem title='-'/>
          <SelectItem title='Male'/>
          <SelectItem title='Female'/>
          <SelectItem title='Prefer not to say'/>
        </Select>
        
        <Text style={styles.smallTitle}>Date of Birth</Text>
        <Datepicker
          placeholder='Date of Birth'
          min={startDay}
          max={yesterday}
          {...minMaxPickerState}
        />
        
        <Text style={styles.smallTitle}>Nationality</Text>
        <Layout style={styles.countrypicker}>
          <CountryPicker
            {...{
              countryCode,
              withFilter,
              withFlag,
              withCountryNameButton,
              withAlphaFilter,
              withCallingCode,
              withEmoji,
              onSelect,
            }}     
          />
        </Layout>        
      </View>         
      
    </ScrollView>

    <Button
        style={styles.submitButton}
        onPress={props.handleSubmit}
        disabled={(Privacy && TermsConditions && props.isValid) ? false : true}
        >
        Click to Get the Verification Code
      </Button>

    </React.Fragment>
  );
  
   
  return (
    <React.Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
      <Layout style={styles.container}>
        <Layout style={styles.formContainer}>
          <Formik
            initialValues={SignUpData.empty()}
            validationSchema={SignUpSchema}
            onSubmit={onFormSubmit}>
            {renderForm}
          </Formik>
        </Layout>


        <Modal
          visible={termsCondition}
          backdropStyle={styles.backdrop}
        >
          <Card disabled={true} header={TermsConditionsHeader} style={{width: (Dimensions.get('window').width * 0.8), height: (Dimensions.get('window').height * 0.8)}}>
            {TermsConditionCard()}
          </Card>
        </Modal>

        <Modal
          visible={privacyPolicy}
          backdropStyle={styles.backdrop}
        >
          <Card disabled={true} header={PrivacyPolicyHeader} style={{width: (Dimensions.get('window').width * 0.8), height: (Dimensions.get('window').height * 0.8)}}>
            {privacyPolicycard()}
          </Card>
        </Modal>
      </Layout>
           
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  terms:{
    fontSize: 12,
    textAlign: 'left'
  },
  termsTitle: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 'bold',
    marginVertical: 4,
  },
  termsSmallTitle: {
    fontSize: 13,
    textAlign: 'left',
    fontWeight: 'bold',
    marginVertical: 2,
  },
  appBar: {
    height: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 16,
    fontWeight : 'bold',
    marginVertical : 20,
  },
  ViewContainer1: {
    backgroundColor: '#FFFFFF',
    flex:1,
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF',
    flex:1,
    alignItems: 'center',    
  },
  formContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    width: '95%',
  },
  resetPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formControl: {
    marginVertical: 4,
  },
  submitButton: {
    marginVertical: 10,
    backgroundColor: '#FFC043',
    borderColor: '#FFC043',
  },
  noAccountButton: {
    alignSelf: 'center',
  },
  textStyle: {
    fontWeight: 'bold', 
    fontSize: 18, 
    margin: 8
  },
  smallTitle :{
    marginVertical: 10,
    color: '#000000',
    fontSize: 12
  },
  checkbox: {
    marginVertical: 5
  },
  checkboxContainer: {
    flexDirection: "row",
    marginVertical: 15,
  },
  image: {
    marginVertical: 10,
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  pictureButton: {
    width: 90,
    height: 40,
    margin: 10,
    backgroundColor: '#FFC043',
    borderColor: '#FFC043',
  },
  countrypicker: {
    borderRadius: 3,
    borderColor: '#c9c9c9',
    borderWidth: 0.5,
    padding: 8
  }
});