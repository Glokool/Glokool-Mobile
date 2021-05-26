import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  Layout,
  LayoutElement,
  Text
} from '@ui-kitten/components';
import { MyPagePrivacyScreenProps } from '../../navigation/ScreenNavigator/My.navigator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faAngleLeft
} from '@fortawesome/free-solid-svg-icons';


export const MyPagePrivacyScreen = (props: MyPagePrivacyScreenProps): LayoutElement => {
  
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
});