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
import { MYSettingProps } from '../../navigation/ScreenNavigator/My.navigator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faAngleLeft, faQuestionCircle, faSignOutAlt, faUnlockAlt, faUserAlt
} from '@fortawesome/free-solid-svg-icons';
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route';
import { Profile, Logout, CustomerService, Privacy} from '../../assets/icon/My'
import { AngleLeft } from '../../assets/icon/Common';
import { SafeAreaView } from 'react-native-safe-area-context';

export const MySetting = (props: MYSettingProps): LayoutElement => {
  const PressBack = () => {
    props.navigation.goBack();
  }

  const PressProfile = () => {
    props.navigation.navigate(SceneRoute.MY_PROFILE);
  }

  const PressPrivacy = () => {
    props.navigation.navigate(SceneRoute.PRIVACY_LOGIN);
  }

  const PressCustomer = () => {
    props.navigation.navigate(SceneRoute.CUSTOMER_SERVICE);
  }

  const PressLogout = () => {

    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: NavigatorRoute.MAIN },
        ],
      })
    );

    auth().signOut();

  }

  return (
    <React.Fragment>

      <Layout style={styles.mainContainer}>

        <Layout style={{height: 70}} />

        {/* 세팅 내용물*/}
        <Layout style={styles.Container}>
          
          <Layout style={styles.TouchLayout}>
            <TouchableOpacity style={styles.TouchableComponent} onPress={PressProfile}> 
              <Layout style={styles.ButtonIcon}>
                <Profile />
              </Layout> 
              
              <Text style={styles.ButtonText}>Profile</Text>
            </TouchableOpacity> 
          </Layout>

          <Layout style={styles.TouchLayout}>
            <TouchableOpacity style={styles.TouchableComponent} onPress={PressPrivacy}>
              <Layout style={styles.ButtonIcon}>
                <Privacy />
              </Layout>
              
              <Text style={styles.ButtonText}>Privacy</Text>
            </TouchableOpacity> 
          </Layout>

          <Layout style={styles.TouchLayout}>
            <TouchableOpacity style={styles.TouchableComponent} onPress={PressCustomer}>   
              <Layout style={styles.ButtonIcon}>
                <CustomerService />
              </Layout>
              <Text style={styles.ButtonText}>Customer Service</Text>
            </TouchableOpacity> 
          </Layout>

          <Layout style={styles.TouchLayout}>
            <TouchableOpacity style={styles.TouchableComponent} onPress={PressLogout}>   
              <Layout style={styles.ButtonIcon}>
                <Logout />
              </Layout>
              <Text style={styles.ButtonText}>Logout</Text>
            </TouchableOpacity> 
          </Layout>

          <Layout style={{flex:8, flexDirection: 'column'}}/>
          
        </Layout>
        
      </Layout>

      {/*탭바 표현*/}
      <Layout style={{position: 'absolute', top: 0, width: '100%'}}>

        <SafeAreaView />

        <Layout style={styles.Tabbar}>

          <Layout style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={PressBack} style={{padding: 10}}>
              <SafeAreaView />
              <AngleLeft />
            </TouchableOpacity>
          </Layout>

          <Layout style={{flex:3, alignItems:'center', justifyContent: 'center', marginHorizontal: 25}}>
            <SafeAreaView />
            <Text style={styles.TextStyle}>SETTINGS</Text>
          </Layout>

          <Layout style={{flex:1}}/> 

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
    position: 'absolute',
    top: 0,
    height: 50,
    width: '100%',
    flexDirection: 'row',
  },
  Container:{
    flex: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    marginHorizontal: 30
  },
  TextStyle: {
    fontFamily: 'IBMPlexSansKR-SemiBold',
    fontSize: 20,
  },
  TouchLayout: {
    flex:1, 
    flexDirection: 'column', 
    marginHorizontal: 5, 
    marginVertical: 15
  },
  TouchableComponent: {
    flex:1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-start'
  },
  ButtonIcon: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 20,
    alignItems: 'center'
  },
  ButtonText: {
    flex: 9,
    fontFamily: 'IBMPlexSansKR-Medium',
    fontSize: 20
  },  
  IconStyle: {
    marginHorizontal: 25, 
    justifyContent: 'center'
  }
});