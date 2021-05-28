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
import { GuideReportScreenProps } from '../../navigation/guide.navigator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

var ToastRef : any;

export const GuideReportScreen = (props: GuideReportScreenProps): LayoutElement => {
  const user = auth().currentUser;
  const guide = props.route.params;
  const [value, setValue] = React.useState('');

  const PressBack = () => {
      props.navigation.goBack();
  }

  React.useEffect(() => {

  }, [])

  const PressSend = () => {
    if(value == ''){
      ToastRef.show('Please enter contents', 3000)
    }
    else{
      const report = {
        guide: guide?.email,
        guideName: guide?.name,
        user: user?.email,
        userName: user?.displayName,
        value: value
      };

      const now = new Date();
      now.setHours(now.getHours() + 9);

      const reportDate = (`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}-${now.getHours()}:${now.getMinutes()}`);

      const docRef = firestore().collection("reportGuide").doc(`${guide.email}-${user.email}-${reportDate}`).set(report);

      props.navigation.goBack();
    }
  }


    return(
        <React.Fragment>
          <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
          
          {/*탭바 디자인*/}
          <Layout style={styles.TabBar}>
              <TouchableOpacity style={styles.IconContainer} onPress={PressBack}>
                  <FontAwesomeIcon icon={faAngleLeft} size={28}/>
              </TouchableOpacity>

              <Layout style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>      
                  <Text style={{fontSize: 16, fontWeight: 'bold',}}>HELP</Text>
              </Layout>

              <Layout style={styles.IconContainer}/>
          </Layout>

          {/* 내용물 */}
          <Layout style={{flex: 9, padding: 20, flexDirection: 'column'}}>
            <Text style={styles.desc}>If there is any problem, please report us and let us know.</Text>
            <Input
              placeholder='Please write what you need to report'
              style={styles.input}
              value={value}
              multiline={true}
              onChangeText={nextValue => setValue(nextValue)}
            />
            <Button
              style={styles.submitButton}
              onPress={PressSend}
              size='large'
            >
              SEND
            </Button>     
          </Layout>


          <Toast ref={(toast) => ToastRef = toast} style={{backgroundColor:'#C9C9C9'}} textStyle={{color:'black'}} position={'bottom'}/>
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
    fontSize: 16,
    marginVertical: 20,
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
});