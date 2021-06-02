import React from 'react';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  BackHandler
} from 'react-native';
import {
  Divider,
  Layout,
  LayoutElement,
  Modal,
  Card,
  Button,
} from '@ui-kitten/components';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route';
import { ChatScreenProps } from '../../navigation/ScreenNavigator/Chat.navigator';
import axios from 'axios';
import { SERVER } from '../../server.component';
import { LoginCheck } from '../../component/Common';
import { WeatherComponent } from '../../component/Chat/weather.component';
import { ChatListNow } from '../../component/Chat/chat.list.now.component';
import { ChatListRecent } from '../../component/Chat/chat.list.recent.component';
import { Discount } from '../../assets/icon/Common';

var ToastRef : any;

export const ChatScreen = (props: ChatScreenProps): LayoutElement => {
  
  const user = auth().currentUser;
  
  const [now, setNow] = React.useState<boolean>(true);


  var exitApp : any = undefined;  
  var timeout : any;

  // 백핸들러 적용을 위한 함수
  const focusEvent = useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
      
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      }
    }, [])
  );

  const handleBackButton = () => {
    
    if (exitApp == undefined || !exitApp){
      
      ToastRef.show('Press one more time to exit', 1000);
      exitApp = true;

      timeout = setTimeout(() => {
        exitApp = false;
      }, 2000);
    }

    else{
      clearTimeout(timeout);
      BackHandler.exitApp();
    }
    
    return true;
  }

  return (
    (user == null) ? (
      <LoginCheck navigation={props.navigation} route={props.route} visible={(user === null)? true : false} />
    )
      :
    (
    <Layout style={styles.MainContainer}>

      <WeatherComponent />

      <Layout style={styles.TextButtonContainer}>

        <TouchableOpacity onPress={() => setNow(true)}>
          <Text style={(now === true)? styles.TextButtonS : styles.TextButton }>NOW</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setNow(false)}>
          <Text style={(now === false)? styles.TextButtonS : styles.TextButton }>RECENT</Text>
        </TouchableOpacity>

      </Layout>

      {(now === true)?
        <ChatListNow navigation={props.navigation} route={props.route}/>
        :
        <ChatListRecent navigation={props.navigation} route={props.route}/>
      }

      <Layout style={styles.AdContainer}>
        <Text style={styles.AdTitle}>Travel Assistant Service</Text>

        <Layout style={styles.AdContainer1}>
          
          <Layout style={styles.AdContainer2}>
            <Layout style={styles.DiscountContainer}>
              <Layout>
                <Discount/>
                <Layout style={styles.DiscountNotContainer}>
                  <Text style={styles.DiscountNot}>20,000</Text>
                </Layout>
              </Layout>
              <Text style={styles.DiscountPer}>75%</Text>
            </Layout>

            <Text style={styles.Cost}>5,000<Text style={styles.KRW}>KRW <Text style={styles.KRWElse}>/ Per DAY</Text></Text></Text>
          </Layout>

          <Layout style={styles.AdContainer2}>
            <TouchableOpacity style={styles.BookButton}>

            </TouchableOpacity>
          </Layout>
        </Layout>
        
        
        
      </Layout>




    </Layout>
    )
  );
};

const styles = StyleSheet.create({
    MainContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: 'white'
    },
    TextButtonContainer: {
      marginLeft: 20,
      flexDirection: 'row'
    },
    TextButton: {
      padding: 10,
      color: '#D2D2D2',
      fontFamily: 'BrandonGrotesque-Medium',
      fontSize: 18,
    },
    TextButtonS: {
      padding: 10,
      color: 'black',
      fontFamily: 'BrandonGrotesque-Medium',
      fontSize: 18,
    },
    AdContainer: {
      position: 'absolute',
      width: '100%',
      height: 140,
      bottom: 0,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
      borderTopRightRadius: 10
    },
    AdContainer1: {
      flexDirection: 'row'
    },
    AdContainer2: {
      flex: 1
    },
    AdTitle: {
      fontFamily: 'BrandonGrotesque-BoldItalic',
      fontSize: 23,
      color: '#7777FF',
      marginLeft: 30,
      marginVertical: 15,
    },
    DiscountContainer: {
      flexDirection: 'row',
      marginLeft: 30,
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    DiscountNotContainer: {
      position: 'absolute',
      top: '-25%',
      backgroundColor: '#00FF0000'
    },
    DiscountNot: {
      fontFamily: 'BrandonGrotesque-Bold',
      fontSize : 16,
      marginLeft: 5
    },
    DiscountPer: {
      fontFamily: 'BrandonGrotesque-Bold',
      fontSize: 25,
      color: '#7777FF',
      marginLeft: 10
    },
    Cost: {
      fontFamily: 'BrandonGrotesque-Bold',
      fontSize: 22,
      marginLeft: 30
    },
    KRW : {
      fontFamily: 'BrandonGrotesque-Bold',
      fontSize: 16,
    },
    KRWElse: {
      fontFamily: 'IBMPlexSansKR-SemiBold',
      fontSize: 17,
    },
    BookButton: {
      borderRadius: 15,
      borderWidth: 2,
      borderColor: '#8596FF',
      backgroundColor: '#252525',
      justifyContent: 'center',
      alignItems: 'center',
      width: 160,
      height: 50,
      alignSelf: 'flex-end',
      marginRight: 30
    },

});