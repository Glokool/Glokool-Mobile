import React from 'react';
import auth from '@react-native-firebase/auth'
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { CommonActions  } from '@react-navigation/native';
import {
  Layout,
  LayoutElement,
  Text
} from '@ui-kitten/components';
import { MyPageSettingScreenProps } from '../../navigation/myPage.navigator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faAngleLeft, faBell, faQuestionCircle, faSignOutAlt, faUnlockAlt, faUserAlt
} from '@fortawesome/free-solid-svg-icons';
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route';
import Toast from 'react-native-easy-toast';
var toastRef;


export const MyPageSettingScreen = (props: MyPageSettingScreenProps): LayoutElement => {
  const PressBack = () => {
    props.navigation.goBack();
  }

  const PressProfile = () => {
    props.navigation.navigate(SceneRoute.MY_PAGE_PROFILE);
  }

  const PressNotification = () => {
    toastRef.show(`It's under development.`, 2000)
    //props.navigation.navigate(SceneRoute.MY_PAGE_NOTIFICATION);
  }

  const PressPrivacy = () => {
    props.navigation.navigate(SceneRoute.MY_PAGE_PRIVACY_LOGIN);
  }

  const PressCustomer = () => {
    props.navigation.navigate(SceneRoute.MY_PAGE_CUSTOMERSERVICE);
  }

  const PressLogout = () => {
    console.log('로그아웃 후 앱 재시동');
    auth().signOut();
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: NavigatorRoute.MAIN },
        ],
      })
    );
    //RNRestart.Restart();
  }

  return (
    <React.Fragment>      
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
          
          <Layout style={styles.TouchLayout}>
            <TouchableOpacity style={styles.TouchableComponent} onPress={PressProfile}>   
              <FontAwesomeIcon icon={faUserAlt} size={20} style={styles.IconStyle}/>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Profile</Text>
            </TouchableOpacity> 
          </Layout>

          {/* <Layout style={styles.TouchLayout}>
            <TouchableOpacity style={styles.TouchableComponent} onPress={PressNotification}>   
              <FontAwesomeIcon icon={faBell} size={20} style={styles.IconStyle}/>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Notification</Text>
            </TouchableOpacity> 
          </Layout> */}

          <Layout style={styles.TouchLayout}>
            <TouchableOpacity style={styles.TouchableComponent} onPress={PressPrivacy}>   
              <FontAwesomeIcon icon={faUnlockAlt} size={20} style={styles.IconStyle}/>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Privacy</Text>
            </TouchableOpacity> 
          </Layout>

          <Layout style={styles.TouchLayout}>
            <TouchableOpacity style={styles.TouchableComponent} onPress={PressCustomer}>   
              <FontAwesomeIcon icon={faQuestionCircle} size={20} style={styles.IconStyle}/>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Customer Service</Text>
            </TouchableOpacity> 
          </Layout>

          <Layout style={styles.TouchLayout}>
            <TouchableOpacity style={styles.TouchableComponent} onPress={PressLogout}>   
              <FontAwesomeIcon icon={faSignOutAlt} size={20} style={styles.IconStyle}/>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Logout</Text>
            </TouchableOpacity> 
          </Layout>

          <Layout style={{flex:8, flexDirection: 'column'}}/>
          
        </Layout>
        
      </Layout>
      <Toast ref={(toast) => toastRef = toast} position={'center'}/>
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
  Container:{
    flex: 8,
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  TextStyle: {    
    fontSize: 20,
    fontWeight: 'bold'
  },
  TouchLayout: {
    flex:1, 
    flexDirection: 'column', 
    marginHorizontal: 5, 
    marginVertical: 10
  },
  TouchableComponent: {
    flex:1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-start'
  },
  IconStyle: {
    marginHorizontal: 25, 
    justifyContent: 'center'
  }
});