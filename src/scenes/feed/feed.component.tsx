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
  Linking,
  Platform
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
import { getStatusBarHeight } from 'react-native-status-bar-height';
import LocationIcon from '../../assets/icon/location.svg';

var ToastRef : any;
const statusBarHeight = (Platform.OS === 'ios')? getStatusBarHeight() : getStatusBarHeight(true);

export const FeedScreen = (props: FeedScreenProps): LayoutElement => {

  const user = auth().currentUser;
  const [FeedData, setFeedData] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [selectButton, setSelectButton] = React.useState('all');
  const BannerWidth = Dimensions.get('window').width;
  const BannerHeight = 200;
  
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
        console.log(response.data)
        setData(response.data);
    })

    return () => {

    }
  }, []);

  React.useEffect(() => {

    if(selectButton === 'seoul'){
      setData(FeedData.filter(item => {return item.region === 'seoul'}));
    }
    else if (selectButton === 'jeolla'){
      setData(FeedData.filter(item => {return item.region === 'jeolla'}));
    }
    else {
      setData(FeedData)
    }
    



  }, [selectButton])





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
            
            <Layout style={{flexDirection: 'row', backgroundColor: '#00FF0000', justifyContent: 'center', alignItems: 'center'}}>
              <LocationIcon width={12} height={12} style={{marginRight: 5, marginHorizontal: 5, marginBottom: 10,}}/>
              <Text style={styles.iconTitle}>{item.location}</Text>
            </Layout>
            
          </Layout>
        </TouchableOpacity>     
      
  );


  return (
    <React.Fragment>
      

      <ScrollView>
        

          {(statusBarHeight >= 40)? 
            <Layout style={styles.mainContainer}>
              
              <Carousel
                  autoplay
                  autoplayTimeout={5000}
                  loop
                  index={0}
                  pageSize={BannerWidth}
              >
                  <TouchableOpacity onPress={() => {Linking.openURL('https://glokool.com')}}>
                    <Image style={{width: BannerWidth, height: BannerHeight, resizeMode: 'stretch'}} source={require('../../assets/notchCarousel/1.png')}/>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {Linking.openURL('https://glokool.com')}}>
                    <Image style={{width: BannerWidth, height: BannerHeight, resizeMode: 'stretch'}} source={require('../../assets/notchCarousel/2.png')}/>
                  </TouchableOpacity>
                  

                  <TouchableOpacity onPress={() => {Linking.openURL('https://www.youtube.com/channel/UC4oTkStEsZooHYGZlDkxp1Q')}}>
                    <Image style={{width: BannerWidth, height: BannerHeight, resizeMode: 'stretch'}} source={require('../../assets/notchCarousel/3.png')}/>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {Linking.openURL('https://www.instagram.com/glokool_official/')}}>
                    <Image style={{width: BannerWidth, height: BannerHeight, resizeMode: 'stretch'}} source={require('../../assets/notchCarousel/4.png')}/>
                  </TouchableOpacity>

              </Carousel>
            </Layout>
          
          :

            <Layout style={styles.mainContainer}>
              <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
              <Carousel
                  autoplay
                  autoplayTimeout={5000}
                  loop
                  index={0}
                  pageSize={BannerWidth}
              >
                  <TouchableOpacity onPress={() => {Linking.openURL('https://glokool.com')}}>
                    <Image style={{width: BannerWidth, height: BannerHeight, resizeMode: 'stretch'}} source={require('../../assets/feed_banner_01.png')}/>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {Linking.openURL('https://glokool.com')}}>
                    <Image style={{width: BannerWidth, height: BannerHeight, resizeMode: 'stretch'}} source={require('../../assets/feed_banner_02.png')}/>
                  </TouchableOpacity>
                  

                  <TouchableOpacity onPress={() => {Linking.openURL('https://www.youtube.com/channel/UC4oTkStEsZooHYGZlDkxp1Q')}}>
                    <Image style={{width: BannerWidth, height: BannerHeight, resizeMode: 'stretch'}} source={require('../../assets/feed_banner_03.png')}/>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {Linking.openURL('https://www.instagram.com/glokool_official/')}}>
                    <Image style={{width: BannerWidth, height: BannerHeight, resizeMode: 'stretch'}} source={require('../../assets/feed_banner_04.png')}/>
                  </TouchableOpacity>
              </Carousel>
            </Layout>
          }
          
        

        <Layout style={styles.seperateContainer}>
          <Image source={require('../../assets/polygon_yellow.png')}/>

          <TouchableOpacity style={styles.selectContainer} onPress={() => setSelectButton('all')}>
            <Text style={(selectButton === 'all')? styles.selectTitle : styles.unSelectTitle}>All</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.selectContainer} onPress={() => setSelectButton('seoul')}>
            <Text style={(selectButton === 'seoul')? styles.selectTitle : styles.unSelectTitle}>Seoul</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.selectContainer} onPress={() => setSelectButton('jeolla')}>
            <Text style={(selectButton === 'jeolla')? styles.selectTitle : styles.unSelectTitle}>Jeolla</Text>
          </TouchableOpacity>







        </Layout>

        <Layout style={{backgroundColor: 'white'}}>
          <FlatList
            style={{backgroundColor: 'white'}}
            data={data}
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
    height: 200
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
  },
  seperateContainer: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    padding: 5,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  selectContainer:{
    marginHorizontal: 15
  },
  selectTitle:{
    color: 'black'
  },
  unSelectTitle:{
    color: 'gray'
  }
});