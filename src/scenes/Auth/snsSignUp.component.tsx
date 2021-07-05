import React from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from "@react-native-firebase/app";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView, 
  TouchableWithoutFeedback,
  TextInput
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
import CountryPicker from 'react-native-country-picker-modal'
import { CountryCode, Country } from '../../data/countryTypes'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft, faTimes}  from '@fortawesome/free-solid-svg-icons';
import { TermsConditionCard } from '../../component/terms&Condition.component'
import { privacyPolicycard } from '../../component/privacyPolicy.component'

import { AngleLeft } from '../../assets/icon/Common';
import { Mini_K, Mini_R, Mini_T } from '../../assets/icon/UserType';
import Toast from 'react-native-easy-toast';
import { SnsSignUpScreenProps } from '../../navigation/auth.navigator';

const useDatepickerState = (initialDate = null) => {
    const [date, setDate] = React.useState(initialDate);
    return { date, onSelect: setDate };
  };

export const SnsSignupScreen = (props: SnsSignUpScreenProps): LayoutElement => {
      

        const minMaxPickerState = useDatepickerState();
      
        //내부 로직용 (비밀번호 디스플레이), 
        const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
        
        //약관 확인했는지 
        const [TermsConditions, TermsConditionsChecked] = React.useState(false);
        const [Privacy, PrivacyChecked] = React.useState(false);
      
        //약관용
        const [termsCondition, setTermsCondition] = React.useState(false);
        const [privacyPolicy, setPrivacyPolicy] = React.useState(false);
      
        const [startDay, setStartDay] = React.useState(new Date(1900, 1, 1));
        const [yesterDay, setYesterDay] = React.useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1));
        
      
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
      
        // const TermsConditionsHeader = (props : any) => (
        //   <Layout style={{flexDirection: 'row', padding: 20}}>
        //     <Layout style={{flex: 1, alignItems: 'flex-start'}}>
        //       <Text style={{fontSize: 14, fontWeight: 'bold', alignItems: 'center'}}>Terms and Conditions</Text>
        //     </Layout>
                        
            
        //     <Layout style={{flex: 1, alignItems: 'flex-end'}}>
        //       <TouchableOpacity onPress={PressX}>
        //         <FontAwesomeIcon icon={faTimes} size={28}/>
        //       </TouchableOpacity> 
        //     </Layout>
            
        //   </Layout>      
        // );
      
        const PrivacyPolicyHeader = (props : any) => (
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
        
        //Type
        const [selectedTypeIndex, setSelectedTypeIndex] = React.useState<IndexPath>(new IndexPath(0));
        const type = [
          'Travler',
          'Resident',
          'Korean'
        ];
        const displayTypeValue = type[selectedTypeIndex.row];
      
        const TravelIcon = () => (
          <Mini_T />
        )
      
        const KoreanIcon = () => (
          <Mini_K />
        )
      
        const ResidentIcon = () => (
          <Mini_R />
        )
      
        //Sex
        const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
        const gender = [ 'Male', 'Female', 'ETC'];
        const displayValue = gender[selectedIndex.row]; // 성별 정하기 (0 : male, 1: female)
      
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


          // Set an initializing state whilst Firebase connects
        const [initializing, setInitializing] = React.useState(true);
        const [user, setUser] = React.useState(null);


        // Handle user state changes
        function onAuthStateChanged(user) {
          setUser(user);
          if (initializing) setInitializing(false);
        }

        React.useEffect(() => {
          const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
          console.log('user: ' + user);
          InitSnsSign();
         console.log('snspage: ' + auth().currentUser?.displayName);
          return subscriber; // unsubscribe on unmount
        }, []);


        const [name, setName] = React.useState<string>();
        const [email, setEmail] = React.useState<string>();


         const InitSnsSign = () => {
           const user = auth().currentUser;
           if (user !== null) {
              user.providerData.forEach((profile) => {
                console.log("Sign-in provider: " + profile?.providerId);
                console.log("  Provider-specific UID: " + profile?.uid);
                console.log("  Name: " + profile?.displayName);
                console.log("  Email: " + profile?.email);
                console.log("  Photo URL: " + profile?.photoURL);
                console.log("login 정보 end ");
                setName(profile.displayName);
                setEmail(profile.email);
              });
            }
          }
        // React.useEffect(() => {
        //   InitSnsSign();
        //   console.log(name);

        // }, [])

  
  return (
    <React.Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>

        <Layout style={{ height: 50 }} />

        <Layout style={styles.container}>
                
        <Layout style={styles.formContainer}>
        <View style={{flex: 1, marginBottom: 56}}>
        <Text style={styles.smallTitle}>Name</Text>
        {auth().currentUser?.displayName ? (
          <TextInput
          style={styles.formControl}
          placeholder='Name'
          value={name}
        />
        ) : (
          <TextInput
            style={styles.formControl}
            placeholder='Name'
          />
        )}
          
          <Text style={styles.smallTitle}>E-Mail</Text>
          <TextInput
            style={styles.formControl}
            placeholder='Email'
            keyboardType='email-address'
            value={email}
          />
          <Text style={styles.smallTitle}>Type</Text>
          <Select
            selectedIndex={selectedTypeIndex}
            onSelect={index => setSelectedTypeIndex(index)}
            placeholder={'Please select a Type'}
            value={displayTypeValue}
          >
            <SelectItem accessoryLeft={TravelIcon} title='Traveler'/>
            <SelectItem accessoryLeft={ResidentIcon} title='Resident'/>
            <SelectItem accessoryLeft={KoreanIcon} title='Korean'/>
          </Select>

          <Text style={styles.smallTitle}>Gender</Text>
          <Select
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}
            placeholder={'Please select a gender'}
            value={displayValue}
          >
            <SelectItem title='Male'/>
            <SelectItem title='Female'/>
            <SelectItem title='ETC'/>
          </Select>
          
          <Text style={styles.smallTitle}>Date of Birth</Text>
          <Datepicker
            placeholder='Date of Birth'
            min={startDay}
            max={yesterDay}
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

        </View>   
        </Layout>
        
        <TouchableOpacity style={styles.SaveButton} onPress={() => PressChange()}>
            <Text style={styles.ButtonText2}>Save the Profile</Text>             
        </TouchableOpacity> 

        <Modal
            visible={termsCondition}
            backdropStyle={styles.backdrop}
        >
            {/* <Card disabled={true} header={TermsConditionsHeader} style={{width: (Dimensions.get('window').width * 0.8), height: (Dimensions.get('window').height * 0.8)}}>
            {TermsConditionCard()}
            </Card> */}
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

        <Layout style={styles.TopTabBar}>

        <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>

        <Layout style={styles.TopInfoContainer}>
            <TouchableOpacity style={{ padding: 20 }} onPress={() => {props.navigation.goBack()}}>
            <AngleLeft />
            </TouchableOpacity>

            <Text style={{ marginLeft : 10, marginVertical: 10, fontSize: 20, fontFamily: 'BrandonGrotesque-Bold', justifyContent: 'center' }}>SIGN UP</Text>

            <TouchableOpacity style={{ padding: 20 }} />

        </Layout>
        

        </Layout>

<Toast ref={(toast) => toastRef = toast} position={'center'}/>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  terms:{
    fontSize: 12,
    textAlign: 'left'
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
  formControl: {
    marginVertical: 4,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderBottomColor: '#C9C9C9'
  },
  submitButton: {
    marginVertical: 10,
    backgroundColor: '#FFC043',
    borderColor: '#FFC043',
  },
  smallTitle :{
    marginVertical: 10,
    color: '#7777FF',
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
  countrypicker: {
    borderRadius: 3,
    borderColor: '#c9c9c9',
    borderWidth: 0.5,
    padding: 8
  },
  Button : {
    width: '100%',
    height: 56,
    borderRadius: 15,
    backgroundColor: '#7777FF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Button_Disable : {
    width: '100%',
    height: 56,
    borderRadius: 15,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center'
  },
  SaveButton: {
    width: Dimensions.get('window').width - 60,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    height: 50,
    borderWidth: 1.5,
    borderColor: '#8797FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  ButtonText2: {
    fontFamily: 'BrandonGrotesque-Bold',
    fontSize: 22,
    color: '#8797FF'
  },
  ButtonText: {
    fontFamily: 'BrandonGrotesque-BoldItalic',
    fontSize: 18,
    color: 'white'
  },
  ButtonText_Disable: {
    fontFamily: 'BrandonGrotesque-BoldItalic',
    fontSize: 18,
    color: '#AEAEAE'
  },
  ButtonContainer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#00FF0000',
    bottom : 10,
    left: 15
  },
  TopTabBar : {
    position: 'absolute', 
    top: 0,  
    width: '100%',  
    height: 50, 
  },
  TopInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between' 
  }
});
