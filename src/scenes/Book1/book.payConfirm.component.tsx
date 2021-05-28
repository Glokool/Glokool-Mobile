import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  BackHandler
} from 'react-native';
import {
  Button,
  Layout,
  LayoutElement,
} from '@ui-kitten/components';
import { NavigatorRoute} from '../../navigation/app.route';
import { BookPayConfirmScreenProps } from '../../navigation/Pay.navigator';


export const BookPayConfirmScreen = (props: BookPayConfirmScreenProps): LayoutElement => {
  const user = auth().currentUser;

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
  })

  const handleBackButton = () => {
    // 뒤로 버튼을 눌러도 아무것도 안하게 하려고
    return true;
  }
    
  const PressConfirm = () => {
    props.navigation.replace(NavigatorRoute.MAIN);
  }

  return (
      <React.Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>

        {/*진행 바*/}
        <Layout style={styles.statusBar}>

        </Layout>

        {/*내 용*/}
        <Layout style={{flex: 5, alignItems: 'center', justifyContent:'center'}}>
          <Text>Your Reservation</Text>
          <Text style={{marginBottom: 30}}>has been confirmed!</Text>
          <Image source={require('../../assets/Verification.png')}/>
        </Layout>


        {/*넥스트 버튼*/}
        <Layout style={styles.ButtonContainer}>
          <Button size='giant' style={{width: '90%'}} onPress={PressConfirm}>CONFIRM</Button>
        </Layout>

      </React.Fragment>
  );
}

const styles = StyleSheet.create({
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
  flex: 2,
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: 20
}
})