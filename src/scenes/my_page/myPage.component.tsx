import React, { useEffect, useReducer } from 'react';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import {
  Layout,
  LayoutElement,
  Text,
  Button,
  Card,
  Modal,
  Divider,
} from '@ui-kitten/components';
import { MyPageScreenProps } from '../../navigation/myPage.navigator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faCog,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import {SERVER} from '../../server.component';
import moment from 'moment'

export const MyPageScreen = (props: MyPageScreenProps): LayoutElement => {

  const [user,setUser] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [detailData, setDetailData] = React.useState({
    id: 2,
    tourCode: "GG1001-20210213-16AM-example",
    tour_id: "GG1001",
    uid: "example",
    name: "ffeewo",
    email: "example@example.com",
    contactType: "",
    contact: "010-xxxx-xxx1",
    day: new Date(),
    time: "16AM",
    lang: "english",
    money: 50,
    paymentID: "14010",
    paymentDate: new Date(),
    guideUID: "",
    title: "Gyeongchun Line Forest Path"
});
  const [day, setDay] = React.useState(new Date());
  const [payment, setPayment] = React.useState(new Date());
  const [loginVisible, setLoginVisible] = React.useState(true);
  const [detailVisible, setDetailVisible] = React.useState(false);
  const [guide, setGuide] = React.useState('');

  

  React.useEffect(() => {

    if (auth().currentUser != null || auth().currentUser != undefined){
      const unsubscribe = props.navigation.addListener('focus', () => {
        setUser(auth().currentUser);
      });

      axios.get(SERVER + '/api/user/tour/' + auth().currentUser.uid)
      .then((response) => {
        setData(response.data)
      })
    }

  }, [])

  React.useEffect(() => {

    console.log(payment)
    console.log(payment.getFullYear());
    console.log(payment.getMonth());
    console.log(payment.getDate());

  }, [payment])

  const PressSetting = () => {
    props.navigation.navigate(SceneRoute.MY_PAGE_SETTING)
  }

  const PressDetail = item => () => {
    setDetailVisible(true);

    axios.get(SERVER + '/api/user/tour/detail/' + item.tourCode)
      .then((response) => {
        console.log(response.data)
        setDetailData(response.data);
        setDay(moment(response.data.day,'YYYY-MM-DD').toDate());
        setPayment(moment(response.data.paymentDate,'YYYY-MM-DD').toDate());

        

        const docRef = firestore()
          .collection('Guides')
          .doc(response.data.guideUID)
          .get()
          .then((response) => {
            console.log(response._data)
            setGuide(response._data.name);
          })
          .catch(() => {
            console.log('실패')
          })
      })

    console.log(item)


  }

  const Header = (props) => (
    <Layout style={{flexDirection: 'row', padding: 20}}>
      <Layout style={{flex: 1, alignItems: 'flex-start'}}>
        <Text style={{fontSize: 16, fontWeight: 'bold', alignItems: 'center'}}>DETAILS</Text>
      </Layout>
                  
      
      <Layout style={{flex: 1, alignItems: 'flex-end'}}>
        <TouchableOpacity onPress={PressX}>
          <FontAwesomeIcon icon={faTimes} size={28}/>
        </TouchableOpacity> 
      </Layout>
      
    </Layout>      
  );

  const Footer = (props) => (
    <Layout style={{padding: 20}}>
      <Text style={{fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginBottom: 5}}>glokoolofficial@gmail.com</Text>
      <Text style={{fontSize: 12, textAlign: 'center'}}>Please Contact us if you have any questions</Text>
    </Layout>  
  )

  const PressX = () => {
    setDetailVisible(false);
  }

  React.useEffect(() => {
    props.navigation.addListener('focus', () => {
      if(user == null || user == undefined){
        setLoginVisible(true);
      }
      else{
        setLoginVisible(false);
      }
    });

    return () => {
      setLoginVisible(false);
    }
  }, [])

  const renderItem = ({item}) => {
    return(      
        <Layout style={styles.tour}>
          <TouchableOpacity onPress={PressDetail(item)}>
            <Layout>
              <Image style={styles.tourImage} source={{uri: item.thumbnail}}/>
            </Layout>            
            <Layout style={styles.nestedContainer}>
              <Text style={styles.nestedTitle}>{item.title}</Text>
            </Layout>
          </TouchableOpacity> 
        </Layout>
      
    );
  }

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
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
      <Layout style={styles.mainContainer}>

        <Layout style={styles.Tabbar}>
          <Layout style={{flex:3, alignItems:'flex-start', justifyContent: 'center', marginHorizontal: 25}}>
            <Text style={styles.TextStyle}>My Page</Text>
          </Layout>
          <Layout style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={PressSetting}>
              <FontAwesomeIcon icon={faCog} size={24}/>
            </TouchableOpacity>
          </Layout>
        </Layout>

        <Layout style={styles.Container}>
          <Layout style={styles.profileContainer}>
            <Image style={styles.profile} source={
                ((user?.photoURL == '' || user?.photoURL == null)? 
                  require('../../assets/profile.jpg')
                :
                  {uri : user?.photoURL})
                }/>
            <Text style={styles.profileName}>{user.displayName}</Text>
          </Layout>

          <Layout style={styles.TourContainer}>
            <Layout style={styles.TitleContainer}>
              <Text style={styles.tourTitle}>Your Previous Tours</Text>
            </Layout>
            
            {data.length == 0 ? 
            <Layout style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>There are no tours</Text>
            </Layout>
            :
            <Layout style={styles.listContainer}>
              <FlatList
                style={{backgroundColor: '#00FF0000', }}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
              />
            </Layout>            
            }

          </Layout>

        </Layout>

        <Modal
          visible={detailVisible}
          backdropStyle={styles.backdrop}
        >
          <Card disabled={true} header={Header} footer={Footer} style={{width: (Dimensions.get('window').width * 0.8)}}>
              <Layout style={{flexDirection: 'row'}}>
                <Layout style={{flex: 1, alignItems: 'flex-start'}}>
                  <Text style={styles.detailTitle}>Tour Name</Text>
                  <Text style={styles.detailTitle}>Tour Day</Text>
                  <Text style={styles.detailTitle}>Tour Time</Text>
                  <Text style={styles.detailTitle}>Guide Name</Text>
                  <Text style={styles.detailTitle}>Guide Language</Text>
                </Layout>
                <Layout style={{flex: 2, alignItems: 'flex-end'}}>
                  <Text style={styles.detailDesc}>{detailData.title}</Text>
                  <Text style={styles.detailDesc}>{day.getFullYear()}.{day.getMonth() + 1}.{day.getDate()}</Text>
                  <Text style={styles.detailDesc}>{detailData.time}</Text>
                  <Text style={styles.detailDesc}>{guide}</Text>
                  <Text style={styles.detailDesc}>{detailData.lang}</Text>
                </Layout>
              </Layout>

              <Divider style={{backgroundColor: '#9C9C9C', marginVertical: 15}}/>

              <Layout style={{flexDirection: 'row'}}>
                <Layout style={{flex: 1, alignItems: 'flex-start'}}>
                  <Text style={styles.detailTitle}>Name</Text>
                  <Text style={styles.detailTitle}>E-Mail for Voucher</Text>
                  <Text style={styles.detailTitle}>Contact</Text>

                </Layout>
                <Layout style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text style={styles.detailDesc}>{detailData.name}</Text>
                  <Text style={styles.detailDesc}>{detailData.email}</Text>
                  <Text style={styles.detailDesc}>{detailData.contact}</Text>
                </Layout>
              </Layout>

              <Divider style={{backgroundColor: '#9C9C9C', marginVertical: 15}}/>

              <Layout style={{flexDirection: 'row'}}>
                <Layout style={{flex: 1, alignItems: 'flex-start'}}>
                  <Text style={styles.detailTitle}>Amount Cost</Text>
                  <Text style={styles.detailTitle}>Payment Date</Text>
                </Layout>
                <Layout style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text style={styles.detailDesc}>{detailData.money} USD</Text>
                  <Text style={styles.detailDesc}>{payment.getFullYear()}.{payment.getMonth() + 1}.{payment.getDate()}</Text>
                </Layout>
              </Layout>


          </Card>

        </Modal>

      </Layout>
      </React.Fragment>
    )    
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    backgroundColor: 'white',
  },
  Tabbar: {
    flex: 1,
    flexDirection: 'row'
  },
  Container:{
    flex: 8,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  TextStyle: {    
    fontSize: 20,
    fontWeight: 'bold'
  },
  profileContainer: {
    flex : 2,
    alignItems: 'center'
  },
  profile: {
    borderRadius: 100,
    width: 80,
    height: 80,
    marginVertical: 10
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  TourContainer: {
    flex: 5, 
  },
  tourTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFC043',
    marginTop: 15,
    marginBottom: 10,
   
  },
  tourImage: {
    width: 170,
    height: 170,
    borderRadius: 15,
    resizeMode: 'contain'
  },
  TitleContainer: {
    alignItems: 'center',
  },
  tour: {
    margin: 5,
  },
  listContainer:{
    flex: 5,
  },
  nestedContainer: {
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00FF0000'
  },
  nestedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  emptyContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray'
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
  detailTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color : '#9C9C9C',
    marginVertical: 5
  },
  detailDesc: {
    fontSize: 12,
    color : 'black',
    marginVertical: 5
  }
});