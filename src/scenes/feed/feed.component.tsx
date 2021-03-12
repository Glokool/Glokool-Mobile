import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  BackHandler
} from 'react-native';
import {
  Layout,
  LayoutElement,
} from '@ui-kitten/components';
import { FeedScreenProps } from '../../navigation/feed.navigator';
import { SceneRoute } from '../../navigation/app.route';
import axios from 'axios';
import { SERVER } from '../../server.component';
import Toast from 'react-native-easy-toast'

var ToastRef;

export const FeedScreen = (props: FeedScreenProps): LayoutElement => {

  const user = auth().currentUser;
  const [FeedData, setFeedData] = React.useState([]);
  const [exit, setExit] = React.useState(false);
  
  var exitApp = undefined;  
  var timeout;
  

  React.useEffect(() => {
    
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    if(user != null || user != undefined){
      if(user.emailVerified == false){
        auth().signOut();
        console.log('이메일 비인증계정 로그아웃 완료')
      }
    }

    // 리스트 데이터 수집
    axios.get( SERVER + '/api/tour')
      .then((response)=> {
        setFeedData(response.data);
    })

    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
  }, [])


  const handleBackButton = () => {
    
    if (exitApp == undefined || !exitApp){
      // 한번만 더 누르면 종료

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
    

  const ClickList = item => () => {
    props.navigation.navigate(SceneRoute.FEED_PREVIEW, item.id)
  };

  const renderItem = ({item}) => (    
      <Layout style={styles.ListContainer}>        
        <TouchableOpacity onPress={ClickList(item)}>
          <Layout style={{alignItems: 'center', backgroundColor: '#00FF0000'}}>
            <Image style={styles.Image} source={{uri: item.banner}}/>
          </Layout>
          
          <Layout style={{marginHorizontal: 10, backgroundColor: '#00FF0000'}}>
            <Text style={styles.ListTitle}>{item.title}</Text>
            
            <Layout style={styles.IconContainer}>
              <Text style={styles.iconTitle}>📍 {item.location}</Text>
            </Layout>            
          </Layout>
        </TouchableOpacity> 
      
      </Layout>
      
  );


  return (
    <React.Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
      <ScrollView>
        <Layout style={styles.mainContainer}>
          <Text style={styles.TextStyle}>{"FEED"}</Text>
          <Text style={styles.Title}>{`Take your bag${"\n"}and find the${"\n"}hidden gems`}</Text>
          <Text style={styles.smallTitle}>{`English / Chinese Tour Available`}</Text>
        </Layout>

        <Layout style={{backgroundColor: '#00FF0000'}}>
          <FlatList
            style={{backgroundColor: '#00ff0000'}}
            data={FeedData}
            renderItem={renderItem}
            keyExtractor={item => item.key}
          />
        </Layout>             
      </ScrollView>

      <Toast ref={(toast) => ToastRef = toast} position={'center'}/>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
  },
  TextStyle: {    
    fontSize: 20,
    marginHorizontal: 20,
    marginVertical: 15,
    fontWeight: 'bold'
  },
  Title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 18
  },
  smallTitle: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  ListContainer:{
    borderRadius: 20,
    flex: 1,
    margin: 15,
    backgroundColor: '#FFFFFF'
  },
  Image: {
    margin: 10,
    borderRadius: 10,
    marginBottom: 15,
    width: '95%',
    height: 350,
    resizeMode: 'stretch'
  },
  ListTitle: {
    margin: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  IconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00FF0000'
  },
  Icon:{
    marginHorizontal: 10
  },
  iconTitle: {
    fontSize: 12,
    marginHorizontal: 5,
    marginBottom: 10
  },
  Desc: {
    fontSize: 12,
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 20,
  }
});