import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  Dimensions, 
  Platform, 
  StatusBar
} from 'react-native';
import {
  Button,
  Divider,
  Layout,
  LayoutElement,
  Modal,
  Card,
} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import { faAngleLeft, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FeedPreviewScreenProps } from '../../navigation/feed.navigator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ScrollView } from 'react-native-gesture-handler';
import Tags from "react-native-tags";
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route';
import { SERVER } from '../../server.component'
import axios from 'axios';
import { FullWidthPicture } from '../../data/picture.model';

const window = Dimensions.get('window');

function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      (dimen.height === 896 || dimen.width === 896))
  );
}
export function getStatusBarHeight(skipAndroid) {
    return Platform.select({
        ios: isIphoneX() ? 44 : 20,
        android: skipAndroid ? 0 : StatusBar.currentHeight,
        default: 0
    })
}

export const FeedPreviewScreen = (props: FeedPreviewScreenProps): LayoutElement => {
  const user = auth().currentUser;
  const tourKey = props.route.params;
  
  const [DetailData, setDetailData] = React.useState({
    id: "",
    title: "",
    location: "",
    tags: [],
    description: "",
    thumbnail: "",
    fee: "",
    image: []
});
  const [loginVisible, setLoginVisible] = React.useState(false);
  const [discount, setDiscount] = React.useState(false);

  React.useEffect(() => {
    axios.get(SERVER + '/api/tour/' + tourKey)
      .then((response) => {
        setDetailData(response.data);
        console.log(response.data.image[9])
      })

  }, [])
  
 
  const PressBack = () => {
    props.navigation.goBack();
  }

  const PressBook = () => {
    if(user == null){
      setLoginVisible(true);
    }
    else{
      var TripData = {
        tourCode: tourKey,
        tourName: DetailData.title,
        day : new Date(),
        time : '',
        name: '',
        email: '',
        contact: '',
        lang: '',
        money: DetailData.fee,
        promotion: '',
      }
      
      props.navigation.push(SceneRoute.FEED_BOOK1, TripData);
    }
  }

  const PressCancel = () => {
    setLoginVisible(false);
  }

  const PressMove = () => {
    setLoginVisible(false);
    props.navigation.replace(NavigatorRoute.AUTH);
  }


  return (
    <React.Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
          
      <ScrollView>
      <Layout style={styles.MainContainer}>
        
                  
          {/*사진만 표시하는 */}              
            <Image style={{width: '100%', height: '2%',resizeMode: 'stretch'}} source={{uri: DetailData.thumbnail}}/>            
            <Layout style={styles.bottomBar}>
              <Layout style={styles.discountLayout}>
                <Image source={require('../../assets/discount.jpg')}/> 
              </Layout>
            </Layout>            
          
          
          <Layout style={styles.TextContainer}>
            <Text style={styles.Title}>{DetailData.title}</Text>
            <Text style={styles.subTitle}>📍 {DetailData.location}</Text>
          </Layout>
          

          {/*태그가 표시되는 뷰*/}
          <Layout style={styles.tagContainer}>
            <Tags
              initialTags={DetailData.tags}
              readonly={true}
              renderTag={({ tag }) => (
                <Layout style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>  
                </Layout>                          
              )}
            />
          </Layout>

          {/*상세 정보를 적는 뷰*/}
          <Layout style={styles.descContainer}>
            <Text style={styles.descText}>{DetailData.description}</Text>
          </Layout>

          <Divider style={{backgroundColor: 'gray', margin: 20}}/>
          
          <FullWidthPicture uri={DetailData?.image[0]}/>
          <FullWidthPicture uri={DetailData?.image[1]}/>
          <FullWidthPicture uri={DetailData?.image[2]}/>
          <FullWidthPicture uri={DetailData?.image[3]}/>
          <FullWidthPicture uri={DetailData?.image[4]}/>
          <FullWidthPicture uri={DetailData?.image[5]}/>
          <FullWidthPicture uri={DetailData?.image[6]}/>
          <FullWidthPicture uri={DetailData?.image[7]}/>
          <FullWidthPicture uri={DetailData?.image[8]}/>
          <FullWidthPicture uri={DetailData?.image[9]}/>

          <Layout style={{height: 300}}/>

          

          

          

        
      </Layout>
      </ScrollView>
      
      {/*로그인 확인창*/}
      <Modal
        visible={loginVisible}
        backdropStyle={styles.backdrop}
      >
        <Card disabled={true}>
          <Text style={{marginVertical: 30}}>Login is required. Move to the login page?</Text>
          
          <Layout style={{flexDirection: 'row'}}>
            <Layout style={{margin: 15, flex: 1}}>
              <Button style={styles.cancelButton} appearance='outline'onPress={PressCancel}>
                CANCLE
              </Button>
            </Layout>
            <Layout style={{margin: 15, flex: 1}}>
              <Button onPress={PressMove}>
                MOVE
              </Button>
            </Layout>
            
          </Layout>
          
        </Card>
      </Modal>



      {/*바텀 탭 바*/}
      <Layout style={styles.bottomTabBar}>        
        <Layout style={styles.feeContainer}>
          <Text style={{fontSize: 10, color: 'gray', marginTop: 10}}>Guide Fee</Text>
          <Text style={{fontSize: 30, fontWeight: 'bold', marginBottom: 5}}>$ {DetailData.fee}</Text>
        </Layout>

        <Layout style={styles.buttonContainer}>
          <Button style={styles.button} size='large' onPress={PressBook}>BOOK</Button>
        </Layout>            
      </Layout>


      {/* 투명 탭바 */}
      <Layout style={styles.TabBar}>
        <Layout style={{flex: 1, backgroundColor: '#00ff0000'}}>
          <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
          <TouchableOpacity style={styles.IconContainer} onPress={PressBack}>
            <FontAwesomeIcon icon={faAngleLeft} style={{color: 'white'}} size={32}/>
          </TouchableOpacity>
        </Layout>
        
        <Layout style={{flex: 5, backgroundColor: '#00ff0000'}}/>

        <Layout style={{flex: 1, backgroundColor: '#00ff0000'}}>
          <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
          <TouchableOpacity style={styles.IconContainer}>
            <FontAwesomeIcon icon={faEllipsisH} style={{color: 'white'}} size={32}/>
          </TouchableOpacity>
        </Layout>
      </Layout>

      
      

    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  TabBar:{
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#00ff0000',
  },
  MainContainer: {
    flex: 9,
    backgroundColor: 'white'
  },
  IconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15
  },
  imageContainer: {
    resizeMode: 'contain',
    width: ' 100%',
  },
  discountLayout: {
    position: 'relative',
    bottom: 0,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  TextContainer: {
    backgroundColor: '#00FF0000',
  },
  Title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginVertical: 0,
    marginRight: 50,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  bottomBar: {
    position: 'relative',
    height: 15,
    bottom: 15,
    backgroundColor: 'white',
    borderTopStartRadius: 15,
    alignItems: 'flex-end',
  },
  tagContainer: {
    marginHorizontal: 15,
    marginVertical: 20,
    padding: 5
  },
  tag: {
    borderColor: 'gray',
    borderWidth: 0.5,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
  },
  tagText: {
    marginHorizontal: 10,
    marginVertical: 5,
    fontSize: 12
  },
  descContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 5,
  },
  descText: {
    fontSize: 14
  },
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    borderTopStartRadius: 35,
    flexDirection: 'row',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    
    elevation: 14,
  },
  feeContainer: {
    alignItems: 'center',
    marginHorizontal: 40,
  },
  buttonContainer: {
    alignItems: 'center',
    flex: 3,
    marginTop: 0,
    marginBottom: 5,
    marginHorizontal: 10
  },
  button: {
    margin: 10,
    width: '100%',
    height: 48
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cancelButton: {
    borderColor: '#FFC043',
    backgroundColor: 'white',   
  },
  image: {   
    width: window.width,
    height: window.height
  }
});