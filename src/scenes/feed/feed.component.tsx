import React from 'react';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  BackHandler,
  Dimensions,
  Linking
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
import Carousel from 'react-native-banner-carousel';

var ToastRef : any;

export const FeedScreen = (props: FeedScreenProps): LayoutElement => {

  const user = auth().currentUser;
  const [FeedData, setFeedData] = React.useState([]);
  const BannerWidth = Dimensions.get('window').width;
  const BannerHeight = 260;
  
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

    return () => {

    }
  }, []);

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
    props.navigation.navigate(SceneRoute.FEED_TOURBOOK, item.id)
  };

  const renderItem = ({item}) => (    
             
        <TouchableOpacity onPress={ClickList(item)} style={styles.ListContainer}>
          <Layout style={{alignItems: 'center', backgroundColor: '#00FF0000'}}>
            <Image style={styles.Image} source={{uri: item.banner}}/>
          </Layout>
          
          <Layout style={{backgroundColor: '#00FF0000', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.ListTitle}>{item.title}</Text>
            <Text style={styles.iconTitle}>{item.location}</Text>
          </Layout>
        </TouchableOpacity>     
      
  );


  return (
    <React.Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
      <ScrollView>
        <Layout style={styles.mainContainer}>
          <Carousel
              autoplay
              autoplayTimeout={5000}
              loop
              index={0}
              pageSize={BannerWidth}
          >
              <TouchableOpacity onPress={() => {Linking.openURL('https://glokool.com')}}>
                <Image style={{width: BannerWidth, height: BannerHeight, resizeMode: 'stretch'}} source={require('../../assets/feed_banner_01.jpg')}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {Linking.openURL('https://glokool.com')}}>
                <Image style={{width: BannerWidth, height: BannerHeight, resizeMode: 'stretch'}} source={require('../../assets/feed_banner_02.jpg')}/>
              </TouchableOpacity>
              

              <TouchableOpacity onPress={() => {Linking.openURL('https://www.youtube.com/channel/UC4oTkStEsZooHYGZlDkxp1Q')}}>
                <Image style={{width: BannerWidth, height: BannerHeight, resizeMode: 'stretch'}} source={require('../../assets/feed_banner_03.jpg')}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {Linking.openURL('https://www.instagram.com/glokool_official/')}}>
                <Image style={{width: BannerWidth, height: BannerHeight, resizeMode: 'stretch'}} source={require('../../assets/feed_banner_04.jpg')}/>
              </TouchableOpacity>

          </Carousel>
        </Layout>

        <Layout style={{backgroundColor: 'white'}}>
          <FlatList
            style={{backgroundColor: 'white'}}
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
    height: 230
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
    backgroundColor: '#00FF0000'
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
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
    fontSize: 14,
    marginHorizontal: 5,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  Desc: {
    fontSize: 12,
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 20,
  }
});