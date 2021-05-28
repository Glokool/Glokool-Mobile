import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {
  Layout,
  LayoutElement,
  Button,
  Calendar,
  Card,
  Modal
} from '@ui-kitten/components';
import {
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { BookDateScreenProps } from '../../navigation/Book.navigator';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import { SERVER } from '../../server.component'
import Toast  from 'react-native-easy-toast';

var toastRef : any;

export const BookDateScreen = (props: BookDateScreenProps): LayoutElement => {

    const now = new Date();
    const user = auth().currentUser;
    const [loginVisible, setLoginVisible] = React.useState(true);
    const [date, setDate] = React.useState(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2));
    const startDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
    const endDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 32);
    const [select, setSelect] = React.useState('0');
    
    const DATA = [
      {
        title: "0",
        startDate: "10AM",
        endDate: "14PM"
      },
      {
        title: "1",
        startDate: "14PM",
        endDate: "18PM"
      },
      {
        title: "2",
        startDate: "18PM",
        endDate: "22PM"
      }
    ]

    const PressBack = () => {
      props.navigation.goBack();
    };

    const PressNext = () => {
      
      var day = date;      
      
      var TripData = {
        tourCode: props.route.params.tourCode,
        day: day,
        time: `${DATA[select].startDate}~${DATA[select].endDate}`,
      };

      axios.post(SERVER + '/api/tour/reservation/verification', {
        tour_id: props.route.params.tourCode,
        day: date,
        time: `${DATA[select].startDate}~${DATA[select].endDate}`,
        uid: user?.uid
      }).then((response) => {
        if(response.data.responseKey == true){          
          //중복이 있을 경우
          toastRef.show('이미 같은시간대에 예약되었습니다.', 2000)
        }
        else{
          props.navigation.push(SceneRoute.BOOK_PROFILE, TripData);
        }
      })
      



      

      
    };

    const RenderItem = (item : any) => {

      return(
        ((item.title == select)? 
          <TouchableOpacity> 
            <Layout style={styles.selectContainer}>
              <Text style={{fontSize: 16, color: 'white'}}>{item.startDate} ~ {item.endDate}</Text>
            </Layout>
          </TouchableOpacity>
        :
          <TouchableOpacity onPress={() => setSelect(item.title)}> 
            <Layout style={styles.dateContainer}>
              <Text style={{fontSize: 16, color: 'black'}}>{item.startDate} ~ {item.endDate}</Text>
            </Layout>
          </TouchableOpacity>        
        )    
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
        <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>

          {/*탭바 */}
          <Layout style={styles.TabBar}>
            <TouchableOpacity style={styles.IconContainer} onPress={PressBack}>
              <FontAwesomeIcon icon={faAngleLeft} style={{color: 'black'}} size={32}/>
            </TouchableOpacity>
            <Layout style={{flex: 5, backgroundColor: '#00ff0000',alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.title}>BOOKING</Text>
            </Layout>
            <TouchableOpacity style={styles.IconContainer}>              
            </TouchableOpacity>
          </Layout>

          

          {/*내 용*/}
          <Layout style={{flex: 9}}>
            <ScrollView>

            {/*진행 바*/}
            <Layout style={styles.statusBar}>

            </Layout>

            <Layout style={{padding: 20}}>
              <Text style={{fontSize: 16}}>Select your tour date.</Text>
              <Text style={{fontSize: 12}}>*Reservations are available after two business days from today's date.</Text>
            </Layout>

            <Layout style={{padding: 10}}>
              <Calendar
                style={{width: '100%'}}
                date={date}
                min={startDay}
                max={endDay}
                onSelect={date => setDate(date)}
              />
            </Layout>

            <Layout style={{padding: 20}}>
              <Text style={{fontSize: 16}}>Select the time you want to start your tour.</Text>
              <Text style={{fontSize: 12}}>*Duration 4hr</Text>
            </Layout>

            <Layout style={{padding: 20}}>
              <FlatList
                data={DATA}
                keyExtractor={item => item.title}
                renderItem={({item}) => RenderItem(item)}
                horizontal={true}
              />
            </Layout>
          </ScrollView>
          </Layout>
          
          <Toast ref={(toast) => toastRef = toast} position={'bottom'}/>

          {/*넥스트 버튼*/}
          <Layout style={styles.ButtonContainer}>
            <Button style={styles.Button} size='giant' onPress={PressNext}>NEXT</Button>
          </Layout>

        </React.Fragment>
      )
    );
}

const styles = StyleSheet.create({
  TabBar:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  Button: {
    width: '100%',
  },
  dateContainer: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal : 3,
    backgroundColor: '#F5F5F5',
    width: 120,
    height: 50,
  },
  selectContainer: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal : 3,
    backgroundColor: '#FFC043',
    width: 120,
    height: 50,
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
})