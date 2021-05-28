import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  Layout,
  LayoutElement,
  Text,
  Toggle 
} from '@ui-kitten/components';
import { MyPageNotificationScreenProps } from '../../navigation/ScreenNavigator/My.navigator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faAngleLeft
} from '@fortawesome/free-solid-svg-icons';


export const MyPageNotificationScreen = (props: MyPageNotificationScreenProps): LayoutElement => {

  //앱 내 알림 켜기/끄기
  const useToggleState = (initialState = false) => {
    const [checked, setChecked] = React.useState(initialState);
  
    const onCheckedChange = (isChecked) => {
      setChecked(isChecked);
    };
  
    return { checked, onChange: onCheckedChange };
  };

  const inCheck = useToggleState();
  const backCheck = useToggleState();

    const PressBack = () => {
    props.navigation.goBack();
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

        {/* 세팅 내용물*/}
        <Layout style={styles.Container}>
      
          <Layout style={styles.buttonContainer}>
            <Layout style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Chat Notification (Background)</Text>
            </Layout>
            <Layout style={{flex: 1}}/>
            <Layout style={styles.buttonIconContainer}>
              <Toggle status='warning' {...inCheck}/>
            </Layout>
          </Layout>

          <Layout style={styles.buttonContainer}>
            <Layout style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Chat Notification (Inside App)</Text>
            </Layout>
            <Layout style={{flex: 1}}/>
            <Layout style={styles.buttonIconContainer}>
              <Toggle status='warning' {...backCheck}/>
            </Layout>
          </Layout>
          




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
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTextContainer: {
    flex: 8,
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
});