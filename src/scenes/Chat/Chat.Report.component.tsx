import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Layout,
  LayoutElement,
  Input,
  Button,
} from '@ui-kitten/components';
import Toast from 'react-native-easy-toast';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { ChatReportScreenProps } from '../../navigation/ScreenNavigator/Chat.navigator';
import { AngleLeft } from '../../assets/icon/Common';
import { Report } from '../../assets/icon/Chat';

var ToastRef : any;

export const ChatReportScreen = (props: ChatReportScreenProps): LayoutElement => {

  const user = auth().currentUser;
  const guide = props.route.params.guide;
  const [value, setValue] = React.useState('');

  const PressSend = () => {
    
    if(value == ''){
      ToastRef.show('Please enter contents', 3000)
    }
    else{
      const report = {
        id : props.route.params.id,
        guideUid: guide?.uid,
        guideName: guide?.name,
        user: user?.email,
        userName: user?.displayName,
        value: value
      };

      const now = new Date();
      now.setHours(now.getHours() + 9);

      const reportDate = (`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}-${now.getHours()}:${now.getMinutes()}`);

      const docRef = firestore().collection("ReportAssistant").doc(`${guide.uid}-${user?.uid}-${reportDate}`).set(report);

      props.navigation.goBack();
    }
  }


    return(
        <React.Fragment>
          <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
          
          {/*탭바 디자인*/}
          <Layout style={styles.TabBar}>
              <TouchableOpacity style={styles.IconContainer} onPress={() => props.navigation.goBack()}>
                  <AngleLeft />
              </TouchableOpacity>

              <Report />

              <Text style={{fontSize: 18, fontFamily: 'IBMPlexSansKR-Medium', marginLeft: 10}}>Report Travel Assistant</Text>

              <Layout style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>      
                  
              </Layout>

              <Layout style={styles.IconContainer}/>
          </Layout>

          {/* 내용물 */}
          <Layout style={{flex: 9, padding: 20, flexDirection: 'column'}}>

            <Layout style={styles.SendContainer}>
              <Text style={styles.desc}>If there is any problem, please report us and let us know.</Text>
              <TouchableOpacity style={styles.SendButton} onPress={() => PressSend()}>
                <Text style={styles.SendButtonTxt}>Send</Text>
              </TouchableOpacity>
            </Layout>
            
            <Input
              placeholder='Please write what you need to report'
              style={styles.input}
              value={value}
              multiline={true}
              onChangeText={nextValue => setValue(nextValue)}
            />
 
          </Layout>

        </React.Fragment>
    );
}


const styles = StyleSheet.create({
  Container: {    
      flex: 1,
      backgroundColor: 'white',
  },
  TabBar:{        
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1
  },
  MainContainer: {
      flex: 10,
      backgroundColor : '#FFC043',
  },
  IconContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 15,
  },
  icon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon2: {
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    flexDirection: 'row',
    marginVertical: 15
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  desc: {
    fontFamily: 'IBMPlexSansKR-Medium',
    fontSize: 16,
    marginVertical: 20,
    flex: 7
  },
  input: {
    width: '100%',
    height: '50%'
  },
  submitButton: {
    marginVertical: 30,
    width: '100%',
    height: '10%',
  },
  SendContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  SendButton: {
    width: 100,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#292434',
    alignItems: 'center',
    justifyContent: 'center'
  },
  SendButtonTxt: {
    color: '#8797FF',
    fontFamily: 'BrandonGrotesque-Bold',
    fontSize: 19
  }
});