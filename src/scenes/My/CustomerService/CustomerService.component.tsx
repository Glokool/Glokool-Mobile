import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {
  Layout,
  LayoutElement,
  Text,
  Icon,
  Modal,
  Card,
  Button
} from '@ui-kitten/components';
import { CustomerServiceProps } from '../../../navigation/ScreenNavigator/My.navigator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faAngleLeft
} from '@fortawesome/free-solid-svg-icons';
import { SceneRoute } from '../../../navigation/app.route';
import { TermsConditionCard } from '../../../component/terms&Condition.component';
import { CustomerService } from '../../../assets/icon/My'
import { privacyPolicycard } from '../../../component/privacyPolicy.component';
import { AngleLeft } from '../../../assets/icon/Common';


export const CustomerServiceComponent = (props: CustomerServiceProps): LayoutElement => {

  const [visible, setVisible] = React.useState(false);
  const [aboutUsVisible, setAboutUsVisible] = React.useState(false);
  const [termsofService, setTermsofService] = React.useState(false);
  const [privacy, setPrivacy] = React.useState(false);

    const PressBack = () => {
      props.navigation.goBack();
    }

    const PressAboutUs = () => {
      setAboutUsVisible(!aboutUsVisible);
    }

    const PressTermsOfService = () => {
      setTermsofService(!termsofService)
    }

    const PressPrivacyPolicy = () => {
      setPrivacy(!privacy)
    }
    
    async function Withdrawal() {
      


    }
    
    return (
    <React.Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <Layout style={styles.mainContainer}>

        {/*탭바 표현*/}
        <Layout style={styles.Tabbar}>

          <Layout style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={PressBack} style={{padding : 10}}>
              <AngleLeft />
            </TouchableOpacity>
          </Layout>

          <Layout style={{flex:3, alignItems:'center', justifyContent: 'flex-start', flexDirection: 'row'}}>
            <CustomerService style={{marginHorizontal: 10}}/>
            <Text style={styles.TextStyle}>Customer Service</Text>
          </Layout>
  
        </Layout>

        {/*고객 서비스 부문 표현*/}
        
        <Layout style={styles.Container}>
          <ScrollView style={{marginHorizontal: 15}}>        
          <TouchableOpacity onPress={PressAboutUs}>
            <Layout style={styles.buttonContainer}>
              <Layout style={styles.buttonTextContainer}>
                <Text style={styles.buttonText}>About Us</Text>
              </Layout>
              <Layout style={{flex: 5}}/>
              <Layout style={styles.buttonIconContainer}>
                <Icon style={{width: 30, height: 30}} fill='black' name='arrow-ios-downward-outline'/>
              </Layout>
            </Layout>
          </TouchableOpacity>

          {aboutUsVisible? 
            <Layout>              
                <Layout style={styles.aboutTitleContainer}>
                  <Text style={styles.aboutTitle}>Buiness Name</Text>
                  <Text style={styles.aboutDesc}>Glokool</Text>
                </Layout>

                <Layout style={styles.aboutTitleContainer}>
                  <Text style={styles.aboutTitle}>CEO</Text>
                  <Text style={styles.aboutDesc}>Sung soo, Park / Min ki, Choi</Text>
                </Layout>

                <Layout style={styles.aboutTitleContainer}>
                  <Text style={styles.aboutTitle}>Address</Text>
                  <Text style={styles.aboutDesc}>1929-9, Nambusunhwan-ro, Gwanak-gu,{'\n'}Seoul, Republic of Korea</Text>
                </Layout>

                <Layout style={styles.aboutTitleContainer}>
                  <Text style={styles.aboutTitle}>Homepage</Text>
                  <Text style={styles.aboutDesc}>glokool.com</Text>
                </Layout>

                <Layout style={styles.aboutTitleContainer}>
                  <Text style={styles.aboutTitle}>Business Registration No.</Text>
                  <Text style={styles.aboutDesc}>257-61-00529</Text>
                </Layout>

                <Layout style={styles.aboutTitleContainer}>
                  <Text style={styles.aboutTitle}>Contact</Text>
                  <Text style={styles.aboutDesc}>glokoolofficial@gmail.com</Text>
                  <Text style={styles.aboutDesc}>070-4300-0833</Text>
                  <Text style={styles.aboutDesc}>@glokool_official</Text>
                </Layout>
              
              
            </Layout>
          :
            <Layout/>
          }
          
          
          <TouchableOpacity onPress={PressTermsOfService}>
            <Layout style={styles.buttonContainer}>
              <Layout style={styles.buttonTextContainer}>
                <Text style={styles.buttonText}>Terms of Service</Text>
              </Layout>
              <Layout style={{flex: 5}}/>
              <Layout style={styles.buttonIconContainer}>
                <Icon style={{width: 30, height: 30}} fill='black' name='arrow-ios-downward-outline'/>
              </Layout>
            </Layout>
          </TouchableOpacity>

          {termsofService?
            <Layout style={{marginHorizontal: 30}}>
              {TermsConditionCard()}
            </Layout>
            
          :
            <Layout/>
          }

          <TouchableOpacity onPress={PressPrivacyPolicy}>
            <Layout style={styles.buttonContainer}>
              <Layout style={styles.buttonTextContainer}>
                <Text style={styles.buttonText}>Privacy Policy</Text>
              </Layout>
              <Layout style={{flex: 5}}/>
              <Layout style={styles.buttonIconContainer}>
                <Icon style={{width: 30, height: 30}} fill='black' name='arrow-ios-downward-outline'/>
              </Layout>
            </Layout>
          </TouchableOpacity>

          {privacy?
            <Layout style={{marginHorizontal: 30}}>
              {privacyPolicycard()}
            </Layout>
            
          :
            <Layout/>
          }


          <TouchableOpacity onPress={() => props.navigation.navigate(SceneRoute.FAQ)}>
            <Layout style={styles.buttonContainer}>
              <Layout style={styles.buttonTextContainer}>
                <Text style={styles.buttonText}>FAQ</Text>
              </Layout>
              <Layout style={{flex: 5}}/>
              <Layout style={styles.buttonIconContainer}>
                <Icon style={{width: 30, height: 30}} fill='black' name='arrow-ios-downward-outline'/>
              </Layout>
            </Layout>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <Layout style={styles.buttonContainer}>
              <Layout style={styles.buttonTextContainer}>
                <Text style={styles.buttonText}>Withdrawal</Text>
              </Layout>
              <Layout style={{flex: 5}}/>
              <Layout style={styles.buttonIconContainer}>
                <Icon style={{width: 30, height: 30}} fill='black' name='arrow-ios-downward-outline'/>
              </Layout>
            </Layout>
          </TouchableOpacity>


          </ScrollView>
        </Layout>
      </Layout>

      <Modal
        visible={visible}
        backdropStyle={{backgroundColor : 'rgba(0, 0, 0, 0.5)'}}  
      >
            <Card disabled={true} style={{backgroundColor: '#F8F8F8'}}>
              
              <Text style={styles.modalTitle}>Are you sure?</Text>

              <Text style={styles.modalDesc}>{`Do you really want to withdrawal 'Glokool'?${'\n'}Your account will disappear :(`}</Text>
              
              <Layout style={{flexDirection: 'row'}}>

                <TouchableOpacity style={styles.StayButon} onPress={() => setVisible(false)}>
                  <Text style={styles.StayButonText}>Stay</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.WithdrawalButton}>
                  <Text style={styles.WithdrawalButtonText}>WithDrawal</Text>
                </TouchableOpacity>
                    
              </Layout>
                    
            </Card>
      </Modal>
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
    fontFamily: 'IBMPlexSans-SemiBold',
    fontSize: 20,
  },
  Container : {
    flex: 8,
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    width: '100%', 
    flexDirection: 'row',
  },
  buttonTextContainer: {
    alignItems: 'flex-start', 
    justifyContent: 'center',
    marginVertical: 15, 
    marginHorizontal: 30,
  },
  buttonIconContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginVertical: 15,
    marginHorizontal: 15,
  },
  buttonText: {
    fontFamily: 'IBMPlexSansKR-Medium',
    fontSize: 20,
  },
  aboutTitleContainer: {
    marginVertical: 15, 
    marginHorizontal: 30,
  },
  aboutTitle: {
    fontFamily: 'IBMPlexSansKR-Medium',
    color: 'gray',
    fontSize: 16,
  },
  aboutDesc: {
    fontFamily: 'IBMPlexSansKR-Text',
    fontSize: 16,
  },
  StayButon: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#8797FF',
    borderRadius: 10,
    height: 50,
    marginRight: 5,
    flex: 1
  },
  modalTitle: {
    fontFamily : 'BrandonGrotesque-Bold',
    fontSize: 22,
    color: '#8797FF'
  },
  modalDesc: {
    fontFamily : 'IBMPlexSansKR-Medium',
    fontSize: 15,
    color: '#AEAEAE',
    marginTop: 10,
    marginBottom: 30,
  },
  StayButonText: {
    fontFamily : 'BrandonGrotesque-Bold',
    fontSize: 22,
    color: '#8797FF'
  },
  WithdrawalButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292434',
    borderRadius: 10,
    height: 50,
    marginLeft: 5,
    flex: 1
  },
  WithdrawalButtonText: {
    fontFamily : 'BrandonGrotesque-Bold',
    fontSize: 22,
    color: '#8797FF'
  },
});