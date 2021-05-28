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
import moment from 'moment';
import Toast from 'react-native-easy-toast'
import DateIcon from '../../assets/icon/date.svg';
import LocationIcon from '../../assets/icon/location.svg';

var ToastRef : any;

export const ChatScreen = (props: ChatScreenProps): LayoutElement => {
  const user = auth().currentUser;
  const [loginVisible, setLoginVisible] = React.useState(true);
  const [startTime, setStartTime] = React.useState([]);
  const [MyTourData, setMyTourData] = React.useState([]);
  const now = new Date();

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

    props.navigation.addListener('focus', () => {
      if(user == null){
        setLoginVisible(true);
      }
      else{
        setLoginVisible(false);
      }
    });

    axios.get( SERVER + '/api/user/tour/' + user?.uid )
      .then((response)=> {

        var temp = response.data;

        temp.forEach((item, index) => {
          var string = item.tourCode.split("-");
          var time = string[2][0] + string[2][1] + ':00'

          temp[index].time = time;
        })

        setMyTourData(temp);
      })
      .catch((err) => {
        console.log(err);
      })

   

    return () => {
      setLoginVisible(false);
    }
  }, [])
  
  const PressChat = item => () => {
    
    AsyncStorage.setItem('code', item.tourCode);
    AsyncStorage.setItem('id', item.tour_id);
    AsyncStorage.setItem('title', item.title);

    BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    props.navigation.navigate(SceneRoute.GUIDE_CHAT, item.tourCode);
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

  const renderItem = ({item}) => {

    var Day = moment(item.date).toDate();

    // <Image style={styles.Image} source={{uri : item.thumbnail}}/> 
    // <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>{item.title}</Text>
    // <Text style={{color: 'white', fontWeight: 'bold', fontSize: 12}}>{item.location}</Text>
    
    return(
        <TouchableOpacity onPress={PressChat(item)}>
        
        <Layout style={styles.GuideContainer}>
          <Layout style={{flex: 65, flexDirection: 'column'}}>
            
            <Layout style={{flex: 1, padding: 20, flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesomeIcon icon={faSquare} size={16} color={'#FDE2A1'} style={{marginRight: 5}}/>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>{item.title}</Text>
            </Layout>

            <Layout style={{flex: 1, padding: 20, paddingTop: 0, alignItems: 'flex-start'}}>

              <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
                <DateIcon width={12} height={12} style={{marginRight: 5}}/>
                <Text style={{color: 'black', fontSize: 12, fontWeight: 'bold'}}>{`${Day.getFullYear()}.${Day.getMonth() + 1}.${Day.getDate()} ${item.time} (4h)`}</Text>
              </Layout>
              
              <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
                <LocationIcon width={12} height={12} style={{marginRight: 5}}/>
                <Text style={{color: 'black', fontSize: 10, fontWeight: 'bold'}}>{item.location}</Text>
              </Layout>
              
            </Layout>
          </Layout>

          <Layout style={{flex: 35, alignItems: 'flex-end'}}>
            <Image style={styles.Image} source={{uri : item.thumbnail}}/> 
          </Layout>


        </Layout>
        </TouchableOpacity>
      );
    
    };

  return (
    (user == null) ? (
      //로그인 되지 않았을 경우
      <React.Fragment>
        <Layout style={styles.container}>
        <Modal
          visible={loginVisible}
          backdropStyle={styles.backdrop}
        >
          <Card disabled={true}>
            <Text style={{marginVertical: 30}}>Login is required. Would you like to login?</Text>
            
            <Layout style={{flexDirection: 'row'}}>
              <Layout style={{margin: 15, flex: 1}}>
                <Button style={styles.cancelButton} appearance='outline' onPress={() => {
                  props.navigation.goBack();
                  setLoginVisible(false);
                }}>
                  CANCLE
                </Button>
              </Layout>
              <Layout style={{margin: 15, flex: 1}}>
                <Button onPress={() => {
                  setLoginVisible(false);
                  props.navigation.replace(NavigatorRoute.AUTH);
                }}>
                  MOVE
                </Button>
              </Layout>
              
            </Layout>
            
          </Card>
        </Modal>

        </Layout>
      </React.Fragment>
    )
      :
    (
    <React.Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <Layout style={{backgroundColor: 'white', flex: 1}}>

        <Layout style={styles.mainContainer}>
          <Text style={styles.TextStyle}>{"Guide Chat"}</Text>
          <Divider/>
        </Layout>

        {(MyTourData.length == 0)?
          <Layout style={{flex: 9, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#C9C9C9'}}>There are no tours available :(</Text>
          </Layout>
        :
          <FlatList
            style={{backgroundColor: '##F5F5F5', width: '100%'}}
            data={MyTourData}
            contentContainerStyle={{paddingBottom: 300}}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />   
        }
      </Layout>
      <Toast ref={(toast) => ToastRef = toast} position={'center'}/>
    
      <Image style={styles.banner} source={require('../../assets/guide_banner.jpg')}/>
    </React.Fragment>
    )
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  TextStyle: {    
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  ListContainer: {
    width: '85%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  Image: {
    width: '100%',
    height: 128,
  },
  ImageContainer: {
    borderRadius: 20,
  },
  TitleContainer: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'center',
    
  },
  StatusContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  Profile: {
    width: 60,
    height: 60,
    borderRadius: 100,
    margin: 12,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  alert: {
    width: 10,
    height: 10,
    borderRadius: 100,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  container: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cancelButton: {
    borderColor: '#FFC043',
    backgroundColor: 'white',   
  },
  GuideContainer : {
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '100%',
    height: 130,
    borderTopWidth: 2,
    borderTopColor: '#FFD774',
    flexDirection: 'row',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  banner: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 130,
    resizeMode: 'stretch'
  }
});