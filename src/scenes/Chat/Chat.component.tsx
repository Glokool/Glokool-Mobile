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
import { AngleDown, AngleUp_W, Discount } from '../../assets/icon/Common';

var ToastRef : any;

type PriceData = {
  active: boolean, 
  discountedPrice: number, 
  price: string,
  discount: number,
}

export const ChatScreen = (props: ChatScreenProps): LayoutElement => {
  
  const user = auth().currentUser;
  
  const [now, setNow] = React.useState<boolean>(true);
  const [ad, setAD] = React.useState<boolean>(true);
  const [price, setPrice] = React.useState<PriceData>();


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

  React.useEffect(() => {
    InitResSetting();
  }, [])

  async function InitResSetting() {
    
    var config = {
      Method: 'get',
      url: SERVER + '/api/price',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    };

    var result = await axios(config);
    setPrice({
      active: result.data.active,
      discountedPrice: result.data.discountedPrice, 
      price: result.data.price,
      discount: result.data.discount
    });

  }

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


      {(ad === true)? 
      <Layout style={styles.AdContainer}>        
        <Layout style={styles.AdContainer1}>

          <Layout>
            <Text style={styles.AdTitle}>Travel Assistant Service</Text>
          </Layout>
          

          <Layout style={styles.upDownButtonContainer}>
            <TouchableOpacity style={styles.upDownButton} onPress={() => setAD(false)}>
              <AngleDown />
            </TouchableOpacity>
          </Layout>

        </Layout>

        <Layout style={styles.AdContainer1}>
          
          <Layout style={styles.AdContainer2}>
            <Layout style={styles.DiscountContainer}>
              <Layout>
                <Discount/>
                <Layout style={styles.DiscountNotContainer}>
                  <Text style={styles.DiscountNot}>{price?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                </Layout>
              </Layout>
              <Text style={styles.DiscountPer}>{price?.discount}%</Text>
            </Layout>

            <Text style={styles.Cost}>{price?.discountedPrice}<Text style={styles.KRW}>KRW <Text style={styles.KRWElse}>/ Per DAY</Text></Text></Text>
          </Layout>

          <Layout style={styles.AdContainer2}>
            <TouchableOpacity style={styles.BookButton}>
              <Text style={styles.BookButtonText}>BOOK Glochat</Text>
            </TouchableOpacity>
          </Layout>
        </Layout>      
      
      </Layout>
        :

      <Layout style={styles.AdContainerDown}>
        
        <Text style={styles.AdTitle2}>Travel Assistant Service</Text>

        <TouchableOpacity style={styles.upButton} onPress={() => setAD(true)}>
          <AngleUp_W />
        </TouchableOpacity>

        
      </Layout>      

      }

      




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
      height: 150,
      bottom: 0,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10
    },
    AdContainerDown: {
      position: 'absolute',
      width: '100%',
      height: 70,
      bottom: 0,
      backgroundColor: '#7777FF',
      flexDirection: 'row',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10
    },
    AdContainer1: {
      flexDirection: 'row',
    },
    AdContainer2: {
      flex: 1,
      justifyContent: 'center'
    },
    AdTitle: {
      fontFamily: 'BrandonGrotesque-BoldItalic',
      fontSize: 23,
      color: '#7777FF',
      marginLeft: 30,
      marginVertical: 15,
    },
    AdTitle2: {
      fontFamily: 'BrandonGrotesque-BoldItalic',
      fontSize: 23,
      color: '#FFFFFF',
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
      marginRight: 20
    },
    BookButtonText: {
      fontFamily: 'BrandonGrotesque-BoldItalic',
      fontSize: 22,
      color: '#7777FF',
    },
    upDownButtonContainer: {
      flex: 1,
      justifyContent: 'center'
    },
    upDownButton: {
      padding: 10,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginRight: 30
    },
    upButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
      padding: 10,
      marginRight: 30
    }

});