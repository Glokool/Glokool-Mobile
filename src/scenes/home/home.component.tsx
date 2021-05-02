import React from "react"
import { Button, Card, Layout, LayoutElement, Modal } from "@ui-kitten/components"
import { HomeScreenProps } from "../../navigation/home.navigator"
import { 
  Dimensions, 
  Image, 
  ImageBackground, 
  Linking, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  PermissionsAndroid, 
  Platform, 
  BackHandler 
} from "react-native"
import Carousel from "react-native-banner-carousel"
import { SafeAreaView } from "react-native-safe-area-context"
import axios from "axios"
import { SERVER } from "../../server.component"
import auth from '@react-native-firebase/auth';
import { NavigatorRoute, SceneRoute } from "../../navigation/app.route"
import { useFocusEffect } from "@react-navigation/native";
import Toast from 'react-native-easy-toast'

var ToastRef : any;

export const HomeScreen = (props: HomeScreenProps): LayoutElement => {

  const [content, setContent] = React.useState([]);
  const [tour, setTour] = React.useState([]);
  const [permissionVisible, setPermissionVisible] = React.useState(false);
  const BannerWidth = Dimensions.get('window').width * 0.8;
  const BannerHeight = 110;
  const banner = [
    {
      url : 'https://glokool.com',
      image: require('../../assets/feed_banner_01.png'),
    },
    {
      url : 'https://glokool.com',
      image: require('../../assets/feed_banner_02.png'),
    },
    {
      url : 'https://www.youtube.com/channel/UC4oTkStEsZooHYGZlDkxp1Q',
      image: require('../../assets/feed_banner_03.png'),
    },
    {
      url : 'https://www.instagram.com/glokool_official/',
      image: require('../../assets/feed_banner_04.png'),
    },
  ];

  var exitApp : any = undefined;  
  var timeout : any;

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


  async function initHomeScreen() {
    axios.get(SERVER + '/api/contents')
    .then((result) => {
      setContent(result.data);
    })
    .catch((err) => {

    })

  axios.get(SERVER + '/api/tour/recommend')
    .then((result) => {
      setTour(result.data);
      console.log(result.data)
    })
    .catch((err) => {

    })
    
  // await AsyncStorage.getItem('PermissionCheck')
  //   .then((result) => {
  //     if(result == 'check'){
  //       setPermissionVisible(false);
  //     }
  //     else{
  //       if(Platform.OS === 'android'){
  //         setPermissionVisible(true);
  //       }        
  //     }
  //   });

  }
  

  React.useEffect(() => {
    initHomeScreen();
  }, []);

  const PressLogin = () => {
    if(auth().currentUser){
      null;
    }
    else{
      props.navigation.replace(NavigatorRoute.AUTH)
    }
  }

  const PressQnA = () => {
    props.navigation.navigate('BOARD', {
      screen: SceneRoute.BOARD_LIST
    });


  }


  const renderTour = ({item}) => {

    const PressTour = (id: string) => {
      props.navigation.navigate('FEED', {
        screen: SceneRoute.FEED_TOURBOOK,
        params: {
          params:{
            tourCode: id
          }
        }
      });
    }

    return(
      <Layout style={{ padding: 10, justifyContent: 'center', alignItems: 'center'}}>
        
        <TouchableOpacity onPress={() => PressTour(item.id)}>
          <Image source={{ uri : item.banner}} style={{ width: 250, height: 330, resizeMode: 'stretch', borderRadius: 5 }}/>
        </TouchableOpacity>

        <Layout style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center',bottom: 20, backgroundColor: '#00FF0000'}}>
          <Text style={{ fontSize: 25, fontFamily: 'BrandonGrotesque-Black', color: 'white' }}>{item.title}</Text>
        </Layout>


      </Layout>
    )

  }

  const renderContent = ({item}) => {

    const PressContent = (id : string) => {
      props.navigation.navigate('BOARD', {
        screen: SceneRoute.CONTENT_DETAIL,
        params: { id : id}
      })
    }

    return(
      <TouchableOpacity style={{ margin: 10 }} onPress={() => {PressContent(item.id)}}>
        <Image source={{ uri : item.image}} style={{ width: 216, height: 216, borderRadius: 15, resizeMode: 'stretch'}}/>
      </TouchableOpacity>
    );
  }

  const PermissionRequest = async() => {

    if (Platform.OS === "android") {
      await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]).then((result)=>{
          if (result['android.permission.CAMERA']
          && result['android.permission.WRITE_EXTERNAL_STORAGE']
          && result['android.permission.READ_EXTERNAL_STORAGE']
          && result['android.permission.RECORD_AUDIO']
          && result['android.permission.ACCESS_FINE_LOCATION']
          && result['android.permission.ACCESS_COARSE_LOCATION']
          === 'granted') {
              console.log("모든 권한 획득");
          } else{
              console.log("권한거절");
          }
      })   
    }
    else{
      console.log('ios 는 권한설정 안함');
    }
    
  }




  return(
    <Layout style={{ alignItems : 'flex-start', width : '100%' }}>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width : '100%' }}
      >
        <Layout style={{ width: '100%', height: 80 }} />

          <ImageBackground source={require('../../assets/home/background.png')} style={{ width: '100%' }} resizeMode={'stretch'}>
            
          {/* 최초 채팅 */}
          <Layout style={{ backgroundColor: '#00FF0000', justifyContent: 'center', alignItems: 'center', width: '100%' }}>    

            <Layout style={{ backgroundColor: '#00FF0000', width: '90%'}}>
              <Image source={require('../../assets/home/Home_Chat_01.png')} style={{ width: '100%', resizeMode: 'stretch' }} />
            </Layout>

            <TouchableOpacity style={{ backgroundColor: '#00FF0000', width: '90%', marginRight: -10 }} 
                onPress={() => {props.navigation.navigate('BOARD', {
                                    screen: SceneRoute.CONTENT_DETAIL,
                                    params: { id : '1'}
                })}}>
                <Image source={require('../../assets/home/Home_Chat_02.png')} style={{ width: '100%', resizeMode: 'stretch' }} />
            </TouchableOpacity>

          </Layout>

          {/* 투어 추천 */}
          <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30, marginVertical: 10, backgroundColor: '#00FF0000' }}>

            <Layout style={{ flex: 1,  backgroundColor: '#00FF0000' }}>
              <Text style={{ fontSize: 25, fontFamily: 'BrandonGrotesque-Black' }}>Find Your Tour</Text>
            </Layout>

            <TouchableOpacity style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: '#00FF0000'}} onPress={() => props.navigation.navigate('FEED', {
              screen: SceneRoute.FEED
            })}>
              <Text style={{ fontSize: 15, fontFamily: 'BrandonGrotesque-Black', color: '#FFD878' }}>SEE MORE</Text>
            </TouchableOpacity>      

          </Layout>          

          <Layout style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>

            <FlatList
              style={{backgroundColor: '#00FF0000'}}
              data={tour}
              renderItem={renderTour}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              initialNumToRender={3}
              keyExtractor={item => item.id}
              getItemLayout={(data, index) => (
                {length: 350, offset: 270 * index, index}
              )}
              initialScrollIndex={0.8}
            />

          </Layout>
          

          {/* 캐러셀 */}
          <Layout style={styles.mainContainer}>
            <Carousel
                autoplay
                autoplayTimeout={5000}
                loop
                index={0}
                pageSize={BannerWidth}
            >
              {(banner.map((item) =>   
                <TouchableOpacity onPress={() => {Linking.openURL(item.url)}} style={styles.banner}>
                  <Image style={{width: BannerWidth, height: BannerHeight, resizeMode: 'stretch', borderRadius: 5 }} source={item.image}/>
                </TouchableOpacity>
              ))}
                
            </Carousel>

          </Layout>
        


        {/* 컨텐츠 */}
        <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30, marginVertical: 10, backgroundColor: '#00FF0000' }}>

          <Layout style={{ flex: 3, backgroundColor: '#00FF0000' }}>
            <Text style={{ fontSize: 25, fontFamily: 'BrandonGrotesque-Black' }}>Must See Contents</Text>
          </Layout>

          <TouchableOpacity style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 15, fontFamily: 'BrandonGrotesque-Black', color: '#FFD878' }} onPress={() => props.navigation.navigate('BOARD', { screen: SceneRoute.CONTENT_LIST })}>SEE MORE</Text>
          </TouchableOpacity>       

        </Layout>

        <Layout style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingRight: 30, marginVertical: 10 }}>

          <FlatList
            style={{backgroundColor: '#00FF0000'}}
            data={content}
            renderItem={renderContent}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />

        </Layout>

        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10, width: '100%' }} onPress={() => {PressQnA()}}>

          <Image source={require('../../assets/home/Home_QnA_Banner.png')} style={{ width: '100%', resizeMode: 'stretch' }}/>

        </TouchableOpacity>


        </ImageBackground>

      </ScrollView>
      

      {/* 탑 탭 바 */}
      <Layout style={{ position: 'absolute', top: 0, width: '100%', height: 80, paddingVertical: 20, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: 'white' }}>
          
          <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
            <SafeAreaView style={{flex: 0}} />
            <Image source={require('../../assets/glokoolLogo.png')} style={{ width: Dimensions.get('window').width * 0.35, marginVertical: 10 }} resizeMode={'stretch'}/>
          </Layout>
          
          <Layout style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#00FF0000', marginVertical: 10}}>
            <SafeAreaView style={{flex: 0}} />
              <Layout style={{ flexDirection: 'row', backgroundColor: '#00FF0000' }}>

                <Layout style={styles.loginContainer} onTouchStart={() => {PressLogin()}}>
                  {(auth().currentUser)? 
                    <Text style={{ fontSize: 16, fontFamily: 'BrandonGrotesque-Medium', marginHorizontal: 15}} numberOfLines={1}>{`Hi ! I'm ${auth().currentUser?.displayName}`}</Text>
                  :
                    <Text style={{ fontSize: 16, fontFamily: 'BrandonGrotesque-Medium', color: '#B8B7B5', marginHorizontal: 15}}>{`Login`}</Text>
                  }                  
                </Layout>



                <TouchableOpacity onPress={() => props.navigation.navigate('MY PAGE')} style={{ backgroundColor: '#00FF0000'}}>
                  {(auth().currentUser)?
                    (auth().currentUser?.photoURL != '')?
                    <Image source={{uri : auth().currentUser?.photoURL}} style={{ width: 34, height: 34, borderRadius: 50, backgroundColor: '#00FF0000' }}/>
                    :
                    <Image source={require('../../assets/profile/profile_05.png')} style={{ width: 34, height: 34, backgroundColor: '#00FF0000' }}/>
                  :
                    <Image source={require('../../assets/profile/profile_06.png')} style={{ width: 34, height: 34, backgroundColor: '#00FF0000' }}/>
                  }
                </TouchableOpacity>
                
              </Layout>
              
          </Layout>

      </Layout>

      <Modal
          visible={permissionVisible}
          backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          style={{ padding: 10 }}
        >
          <Card disabled={true} style={{borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>

            <Layout style={{ alignItems: 'center'}}>
              <Image source={require('../../assets/home/PermissionLogo.png')} style={{marginVertical: 10 }}/>
            </Layout>
            

            <Layout style={{justifyContent: 'center', alignItems: 'flex-start', padding: 10}}>              

              <Text style={{marginVertical: 10, textAlign: 'center', fontSize: 24, fontFamily: 'IBMPlexSansKR-Medium'}}>Glokool needs access to permissions below</Text>


              <Layout style={{ flexDirection:'row', justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>

                <Image source={require('../../assets/home/Places.png')} />

                <Layout style={{marginLeft: 10}}>
                  <Text style={{fontFamily: 'IBMPlexSansKR-SemiBold', fontSize: 18, marginVertical: -5}}>Location</Text>
                  <Text style={{fontFamily: 'IBMPlexSansKR-Medium', fontSize: 15, color: '#A1A1A1', marginVertical: -5}}>Share your location with guide</Text>
                </Layout>

              </Layout>

              <Layout style={{ flexDirection:'row', justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>

                <Image source={require('../../assets/home/Photos.png')} />

                <Layout style={{marginLeft: 10}}>
                  <Text style={{fontFamily: 'IBMPlexSansKR-SemiBold', fontSize: 18, marginVertical: -5}}>Files</Text>
                  <Text style={{fontFamily: 'IBMPlexSansKR-Medium', fontSize: 15, color: '#A1A1A1', marginVertical: -5}}>{`Share images to Q&A board`}</Text>
                </Layout>

              </Layout>

              <Layout style={{ flexDirection:'row', justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>

                <Image source={require('../../assets/home/Camera.png')} />

                <Layout style={{marginLeft: 10}}>
                  <Text style={{fontFamily: 'IBMPlexSansKR-SemiBold', fontSize: 18, marginVertical: -5}}>Camera</Text>
                  <Text style={{fontFamily: 'IBMPlexSansKR-Medium', fontSize: 15, color: '#A1A1A1', marginVertical: -5}}>Send pictures to chat</Text>
                </Layout>

              </Layout>

              <Layout style={{ flexDirection:'row', justifyContent: 'center', alignItems: 'center', marginVertical: 5, marginBottom: 10}}>

                <Image source={require('../../assets/home/Microphone.png')} />

                <Layout style={{marginLeft: 10}}>
                  <Text style={{fontFamily: 'IBMPlexSansKR-SemiBold', fontSize: 18, marginVertical: -5}}>Microphone</Text>
                  <Text style={{fontFamily: 'IBMPlexSansKR-Medium', fontSize: 15, color: '#A1A1A1', marginVertical: -5}}>Send voice message to chat</Text>
                </Layout>

              </Layout>

            </Layout>

            <Layout style={{flexDirection: 'row'}}>
              <Layout style={{margin: 15, flex: 1}}>
                <Button style={{ borderColor: '#D2D2D2', backgroundColor: '#D2D2D2', borderRadius: 10 }} onPress={() => {
                  setPermissionVisible(false);
                  //AsyncStorage.setItem('PermissionCheck', JSON.stringify('check'));
                }}>
                  Skip
                </Button>
              </Layout>
              <Layout style={{margin: 15, flex: 1}}>
                <Button 
                style={{ borderRadius: 10 }}
                onPress={() => {
                  setPermissionVisible(false);
                  //AsyncStorage.setItem('PermissionCheck',  JSON.stringify('check'));
                  PermissionRequest();
                }}>
                  Continue
                </Button>
              </Layout>
              
            </Layout>
            
          </Card>
        </Modal>
      
      <Toast ref={(toast) => ToastRef = toast} position={'center'}/>

    </Layout>

  )
}

const styles = StyleSheet.create({
  mainContainer:{
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#00FF0000',
    borderRadius: 15,
    height: 120,
    width : Dimensions.get('window').width,
    marginVertical: 10,
  },
  banner: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: Dimensions.get('window').width * 0.8,
    height: 110,
    padding: 2,
  },
  loginContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,    
    elevation: 6,
    padding: 5, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 10,  
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    borderBottomStartRadius: 15,
    maxWidth: 140
  }
});