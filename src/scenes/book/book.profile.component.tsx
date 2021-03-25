import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import { Formik, FormikProps } from 'formik';
import {
  Layout,
  LayoutElement,
  Button,
  Input,
  Text,
  Modal,
  Card,
  Select,
  IndexPath,
  SelectItem
} from '@ui-kitten/components';
import { FeedData, FeedSchema } from '../../data/feed.model';
import { FormInput } from '../../component/feed.component';
import {
  faAngleLeft,
  faAngleDown,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { SceneRoute } from '../../navigation/app.route';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { BookProfileScreenProps } from '../../navigation/book.navigator';
import Toast from 'react-native-easy-toast';
import { TermsConditionCard } from '../../component/terms&Condition.component'


var toastRef : any;

export const BookProfileScreen = (props: BookProfileScreenProps): LayoutElement => {
  const user = auth().currentUser;
  
  const contactType = [
    'Phone Number',
    'Facebook',
    'Instagram',
    'Kakao Talk',
    'Line',
  ];
  
  const [contact, setContact] = React.useState('');
  const [eng, setEng] = React.useState(true);
  const [precaution, setPrecation] = React.useState(false);
  const [cancellation, setCancellation] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));  
  const displayValue = contactType[selectedIndex.row];
  const renderOption = (title : String) => (
    <SelectItem title={title}/>
  );

  const PressX = () => {
    setPrecation(false);
    setCancellation(false);
  }
    
  const PressBack = () => {
    props.navigation.goBack();
  }

  const PressCancellation = () => {
    setCancellation(true)
  }

  const PressPrecaution = () => {
    setPrecation(true);
  }

  const PrecautionHeader = (props) => (
    <Layout style={{flexDirection: 'row', padding: 20}}>
      <Layout style={{flex: 1, alignItems: 'flex-start'}}>
        <Text style={{fontSize: 14, fontWeight: 'bold', alignItems: 'center'}}>Precaution</Text>
      </Layout>                  
      
      <Layout style={{flex: 1, alignItems: 'flex-end'}}>
        <TouchableOpacity onPress={PressX}>
          <FontAwesomeIcon icon={faTimes} size={28}/>
        </TouchableOpacity> 
      </Layout>
      
    </Layout>      
  );

  const CancellationHeader = (props) => (
    <Layout style={{flexDirection: 'row', padding: 20}}>
      <Layout style={{flex: 2, alignItems: 'flex-start'}}>
        <Text style={{fontSize: 14, fontWeight: 'bold', alignItems: 'center'}}>Cancellation Policy</Text>
      </Layout>                  
      
      <Layout style={{flex: 1, alignItems: 'flex-end'}}>
        <TouchableOpacity onPress={PressX}>
          <FontAwesomeIcon icon={faTimes} size={28}/>
        </TouchableOpacity> 
      </Layout>
      
    </Layout>      
  );

  const onFormSubmit = (values: FeedData): void => {

    if(values.name == '' || values.email == ''){
      toastRef.show(`Please enter your Name and Email!`,2000)
    }
    else {
      var TripData = props.route.params;
      TripData.name = values.name;
      TripData.email = values.email;
      TripData.contactType = displayValue;
      TripData.contact = contact;

      if(eng == true){
        TripData.lang = 'English';
      }
      else{
        TripData.lang = 'Chinese';
      }


      props.navigation.push(SceneRoute.FEED_BOOK3, TripData);
    }
   

  }

  const renderForm = (props: FormikProps<FeedData>): React.ReactFragment => (
    <React.Fragment>
      <ScrollView>
      <Layout style={{padding: 20}}>
          <Text style={styles.titleText}>Fill in your Information</Text>
          <FormInput
            id='name'
            label='Name'
            defaultValue={user?.displayName}
          />
          <FormInput
            id='email'
            label='Email Address to receive tour Voucher'
            defaultValue={user?.email}
            keyboardType='email-address'
          />
          <Text>Contact</Text>
          <Layout style={{flexDirection: 'row'}}>            
            <Layout style={{flex: 1}}>
              <Select
                style={styles.inputContainer2}
                placeholder='Default'
                value={displayValue}
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}>
                {contactType.map(renderOption)}
              </Select>
            </Layout>
            <Layout style={{flex: 1}}>
              <Input
                value={contact}
                placeholder='Your ID / Number'
                onChangeText={nextValue => setContact(nextValue)}
                style={styles.inputContainer}
              />
            </Layout>
          </Layout>
          
        </Layout>
        
        <Layout style={{padding: 20, marginVertical: 10}}>
            <Text style={styles.titleText}>Select Your Language.</Text>

          {((eng == true)?
              <Layout style={{flexDirection: 'row'}}>
                <TouchableOpacity>
                  <Layout style={styles.selectLangButton}>
                    <Text style={styles.selectLangText}>English</Text>
                  </Layout>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => setEng(false)}>
                  <Layout style={styles.langButton}>
                    <Text style={styles.langText}>中 文</Text>
                  </Layout>
                </TouchableOpacity>
              </Layout>              
            : //chinese를 선택했을때
              <Layout style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => setEng(true)}>
                  <Layout style={styles.langButton}>
                    <Text style={styles.langText}>English</Text>
                  </Layout>
                </TouchableOpacity>
                
                <TouchableOpacity>
                  <Layout style={styles.selectLangButton}>
                    <Text style={styles.selectLangText}>中 文</Text>
                  </Layout>
                </TouchableOpacity>
            </Layout>
          )}   
          </Layout>

          <Layout style={{padding: 20}}>
            <Text style={styles.titleText}>By proceeding, you agree to our Terms of service, Privacy Policy & Cancellation Policy.</Text>
            
            <Layout style={{flexDirection: 'row'}}>    
              <Layout style={{flex:2, flexDirection: 'row', marginTop: 10}}>
                <Layout style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
                  <Text style={{fontWeight: 'bold'}}>Precautions and Cancellation Policy</Text>
                </Layout>
                <TouchableOpacity onPress={PressPrecaution}>
                      <FontAwesomeIcon icon={faAngleDown} style={{color: 'black'}} size={20}/>    
                </TouchableOpacity>
              </Layout>
            </Layout>

            {/* 
            <Layout style={{flexDirection: 'row'}}>              
              <Layout style={{flex:2, flexDirection: 'row', marginTop: 10}}>
                <Layout style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
                  <Text style={{fontWeight: 'bold'}}>Cancellation Policy</Text>
                </Layout>
                <Layout style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={PressCancellation}>
                      <FontAwesomeIcon icon={faAngleDown} style={{color: 'black'}} size={20}/>    
                    </TouchableOpacity>                                
                </Layout>
              </Layout>         
            </Layout>
            
            */}
            


          </Layout>


        </ScrollView>

         {/*넥스트 버튼*/}
         <Layout style={styles.ButtonContainer}>
            <Button 
              style={styles.Button}
              disabled={(props.isValid) ? false : true}               
              size='giant' 
              onPress={props.handleSubmit}>
                NEXT
            </Button>
        </Layout>
    </React.Fragment>
  );


  return (
      <React.Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>

        {/*탭바 */}
        <Layout style={styles.TabBar}>
          <TouchableOpacity style={styles.IconContainer} onPress={PressBack}>
            <FontAwesomeIcon icon={faAngleLeft} style={{color: 'black'}} size={32}/>
          </TouchableOpacity>
          <Layout style={{flex: 5, backgroundColor: '#00ff0000',alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.title}>BOOKING</Text>
          </Layout>
          <TouchableOpacity style={styles.IconContainer}>              
          </TouchableOpacity>
        </Layout>

        {/*진행 바*/}
        <Layout style={styles.statusBar}>

        </Layout>

        {/*내 용*/}
        <Layout style={{flex: 9}}>        
          <Formik
            initialValues={FeedData.empty()}
            validationSchema={FeedSchema}
            onSubmit={onFormSubmit}>
            {renderForm}
          </Formik>     
          
          {/* 주의 규정 모달창 */}
          <Modal
            visible={precaution}
            backdropStyle={styles.backdrop}
          >
            <Card disabled={true} header={PrecautionHeader} style={{width: (Dimensions.get('window').width * 0.8), height: (Dimensions.get('window').height * 0.8)}}>
              {TermsConditionCard()}         
            </Card>
          </Modal>

          {/* 취소 규정 모달창 */}
          <Modal
            visible={cancellation}
            backdropStyle={styles.backdrop}
          >
            <Card disabled={true} header={CancellationHeader} style={{width: (Dimensions.get('window').width * 0.8), height: (Dimensions.get('window').height * 0.8)}}>
              <ScrollView style={{flex: 1}}> 
                <Text>

                </Text>
              </ScrollView>            
            </Card>
          </Modal>
          <Toast ref={(toast) => toastRef = toast} position={'center'}/>
        
        </Layout>

       

      </React.Fragment>
  );
}

const styles = StyleSheet.create({
TabBar:{
  flex: 1,
  flexDirection: 'row',
  backgroundColor: 'white',
},
MainContainer: {
  flex: 9,
  backgroundColor: 'white'
},
IconContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  margin: 15,
  flex: 1,
},
title: {
  fontWeight: 'bold',
  fontSize: 16
},
statusBar: {
  justifyContent: 'center',
  alignItems: 'center',
},
ButtonContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  },
Button: {
  width: '100%',
},
titleText: {
  fontSize: 16
},
inputContainer:{
  backgroundColor: '#00ff0000',
  borderColor: '#00ff0000',
  borderBottomColor: '#C9C9C9',
  marginLeft: 5,
  marginVertical: 20,
  width: '90%',
},
inputContainer2:{
  backgroundColor: '#00ff0000',
  borderColor: '#00ff0000',
  borderBottomColor: '#C9C9C9',
  marginRight: 5,
  marginVertical: 20,
  width: '90%',
},
langButton: {
  backgroundColor: '#F5F5F5',
  borderRadius: 20,
  width: 108,
  height: 36,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 10,
  marginTop: 15,
},
langText: {
  fontSize: 14,
  color: 'black',
  fontWeight: 'bold'
},
backdrop: {
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
selectLangButton: {
  backgroundColor: '#FFC043',
  borderRadius: 20,
  width: 108,
  height: 36,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 10,
  marginTop: 15,
},
selectLangText: {
  fontSize: 14,
  color: 'white',
  fontWeight: 'bold'
}
})