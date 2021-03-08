import React from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import {
  Divider,
  Layout,
  LayoutElement,
  Modal,
  Card,
  Button,
} from '@ui-kitten/components';
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route';
import { MyTourScreenProps } from '../../navigation/myTour.navigator';
import axios from 'axios';
import { SERVER } from '../../server.component';
import moment from 'moment';

export const MyTourScreen = (props: MyTourScreenProps): LayoutElement => {
  const user = auth().currentUser;
  const [loginVisible, setLoginVisible] = React.useState(true);
  const [MyTourData, setMyTourData] = React.useState([]);
  const now = new Date();

  const ClickList = item => () => {
    
    AsyncStorage.setItem('code', item.tourCode);
    AsyncStorage.setItem('id', item.tour_id);
    AsyncStorage.setItem('title', item.title);
    props.navigation.navigate(SceneRoute.MY_TOUR_ALL_LOCATION, item);
  };

  const PressChat = item => () => {
    
    AsyncStorage.setItem('code', item.tourCode);
    AsyncStorage.setItem('id', item.tour_id);
    AsyncStorage.setItem('title', item.title);
    props.navigation.navigate(SceneRoute.MY_TOUR_CHAT, item.tourCode);
  }

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
        setMyTourData(response.data);
      })
      .catch((err) => {
        console.log(err);
      })

   

    return () => {
      setLoginVisible(false);
    }
  }, [])

  const renderItem = ({item}) => {

    var Day = (now.getTime() - moment(item.date).toDate().getTime())/ 1000 / 60 / 60 / 24;
    
    
    return(
      <Layout style={{alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={ClickList(item)}>
        <Layout style={{alignItems: 'center', justifyContent: 'center'}}>
          
          <Layout style={{alignItems: 'center', margin: 10}}>
            <Image style={styles.Image} source={{uri : item.thumbnail}}/>     
          </Layout>

          <Layout style={{position: 'absolute', backgroundColor: '#00FF0000', alignItems: 'center', top: 20}}>
            
          {((now.getDate()- moment(item.date).toDate().getDate()) == 0)? 
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, marginTop: 10}}>D - Day</Text> 
            :
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, marginTop: 10}}>D {((now - moment(item.date).toDate()) > 0)? '+' : '-'} {Math.abs(parseInt(Day))}</Text>
          }
          </Layout>  


          <Layout style={{position: 'absolute', backgroundColor: '#00FF0000', alignItems: 'center'}}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>{item.title}</Text>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 12}}>{item.location}</Text>
          </Layout>

              
        </Layout>      
      </TouchableOpacity>

        <Layout style={{position: 'absolute', bottom: 50, right: 40, backgroundColor: '#00FF0000'}}>
          <TouchableOpacity onPress={PressChat(item)}>
            <Image source={require('../../assets/chat_button.png')}/>
          </TouchableOpacity>
        </Layout>
      </Layout>
    )
    
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
          <Text style={styles.TextStyle}>{"MY TOUR"}</Text>
          <Divider/>
        </Layout>

        {(MyTourData.length == 0)?
          <Layout style={{flex: 9, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#C9C9C9'}}>There are no tours available :(</Text>
          </Layout>
        :
          <FlatList
            style={{backgroundColor: '##F5F5F5'}}
            data={MyTourData}
            renderItem={renderItem}
            keyExtractor={item => item.id}/>   
        }
        
              
      </Layout>
      
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
    margin: 10,
    borderRadius: 10,
    marginBottom: 15,
    width: 350,
    height: 350,
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
  }
});