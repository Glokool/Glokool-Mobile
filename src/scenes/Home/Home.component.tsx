import React from "react"
import { Button, Card, Layout, LayoutElement, Modal } from "@ui-kitten/components"
import { HomeScreenProps } from "../../navigation/ScreenNavigator/Home.navigator"
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
import axios from "axios"
import { SERVER } from "../../server.component"
import { AngleRightDouble } from '../../assets/icon/Home';
import { NavigatorRoute, SceneRoute } from "../../navigation/app.route"
import { useFocusEffect } from "@react-navigation/native";
import Toast from 'react-native-easy-toast'
import { HomeTopTabBar, HomeCarousel } from "../../component/Home"
import { AdBanner } from "../../component/Common/AdBanner.component"

var ToastRef : any;

export const HomeScreen = (props: HomeScreenProps): LayoutElement => {

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

  function PressGloChatAD() {
    props.navigation.navigate(NavigatorRoute.CHAT);
  }





  return(
    <Layout style={{ alignItems : 'flex-start', width : '100%' }}>

      <Toast ref={(toast) => ToastRef = toast} position={'center'}/>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width : '100%' }}
      >
          <Layout style={{ width: '100%', height: 80 }} /> 

          {/* 타이틀 텍스트 */}
          <Layout style={styles.TitleTextContainer}>
            <Text style={styles.TitleText1}>
              {`Ask us whatever, whenever`}
            </Text>
            
            <Text style={styles.TitleText2}>
              {`Glokool gets you goin' in Korea.`}
            </Text>
          </Layout>

          <HomeCarousel navigation={props.navigation} route={props.route}/>

          {/* 글로챗 광고 */}
          <Layout style={styles.GloChatADContainer}>

            <Layout style={styles.GloChatContainer1}>
              <Text style={styles.GloChat1}>{`What are some popular${`\n`}restaurants nearby?`}</Text>
            </Layout>

            <Layout style={styles.GloChatContainer2}>
              <Text style={styles.GloChat2}>{`There are..`}</Text>
            </Layout>

            <Layout style={styles.GloChatContainer3} onTouchStart={() => PressGloChatAD()}>
              <Text style={styles.GloChat3}>{`Click to Start `}</Text>
              <Text style={styles.GloChat3_1}>{`Glo-Chat`}</Text>
              <Text style={styles.GloChat3}>{`!   `}</Text>
              <AngleRightDouble style={styles.GloChatIcon} />
            </Layout>

          </Layout>

          <AdBanner />
        
      </ScrollView>

      <HomeTopTabBar navigation={props.navigation} route={props.route}></HomeTopTabBar>
      
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
  TitleTextContainer: {
    marginHorizontal: 40,
    marginVertical: 20
  },
  TitleText1: {
    fontFamily: 'BrandonGrotesque-BoldItalic',
    fontSize: 23
  },
  TitleText2: {
    fontFamily: 'BrandonGrotesque-BoldItalic',
    fontSize: 26
  },
  GloChatADContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 30,
  },
  GloChatContainer1: {
    alignSelf: 'flex-start',
    marginLeft: 30,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 15,
    padding: 10,
    width: '55%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  GloChat1 : {
    fontFamily: 'BrandonGrotesque-Medium',
    fontSize: 21
  },
  GloChatContainer2: {
    alignSelf: 'flex-end',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    marginRight: 30,
    marginTop : -10,
    padding: 10,
    width: '30%',
    backgroundColor: '#F7F7F7',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  GloChat2 : {
    fontFamily: 'BrandonGrotesque-Medium',
    fontSize: 21
  },

  GloChatContainer3: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 5,
    marginRight: 30,
    marginTop : -10,
    padding: 10,
    width: '60%',
    backgroundColor: '#292434',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  GloChat3 : {
    fontFamily: 'BrandonGrotesque-BoldItalic',
    fontSize: 21,
    color: '#8797FF',
  },
  GloChat3_1 : {
    fontFamily: 'BrandonGrotesque-BoldItalic',
    fontSize: 21,
    color: '#FFFFFF',
  },
  GloChatIcon : {
    alignSelf: 'center',
  },


  CarouselContainer: {
    justifyContent:'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#00FF0000'
  },
  Carousel: {
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  CarouselImage: {
    width: Dimensions.get('window').width * 0.8,
    height: 110,
    resizeMode: 'stretch',
    borderRadius: 10,
  }
});