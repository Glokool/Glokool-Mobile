import React from 'react';
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
  Icon
} from '@ui-kitten/components';
import { MyPageCustomerServiceScreenProps } from '../../navigation/ScreenNavigator/My.navigator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faAngleLeft
} from '@fortawesome/free-solid-svg-icons';
import { SceneRoute } from '../../navigation/app.route';
import { TermsConditionCard } from '../../component/terms&Condition.component';
import { privacyPolicycard } from '../../component/privacyPolicy.component';


export const MyPageCustomerServiceScreen = (props: MyPageCustomerServiceScreenProps): LayoutElement => {
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
    
    const PressFAQ = () => {
      props.navigation.navigate(SceneRoute.MY_PAGE_FAQ);
    }
    
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

        {/*고객 서비스 부문 표현*/}
        
        <Layout style={styles.Container}>
          <ScrollView>        
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
                  <Text style={styles.aboutDesc}>Holeinone</Text>
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
            <Layout style={{padding: 10}}>
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
            <Layout style={{padding: 10}}>
              {privacyPolicycard()}
            </Layout>
            
          :
            <Layout/>
          }


          <TouchableOpacity onPress={PressFAQ}>
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
          </ScrollView>
        </Layout>
      </Layout>
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
  Container : {
    flex: 8,
    justifyContent: 'flex-start'
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
    fontSize: 16,
    fontWeight: 'bold'
  },
  aboutTitleContainer: {
    marginVertical: 15, 
    marginHorizontal: 30,
  },
  aboutTitle: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
  },
  aboutDesc: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});