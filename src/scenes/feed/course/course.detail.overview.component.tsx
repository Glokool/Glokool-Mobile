import React from 'react';
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
} from '@ui-kitten/components';
import { CourseDetailOverviewScreenProps } from '../../../navigation/course.detail.navigator';
import {
    faAngleLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigatorRoute, SceneRoute } from '../../../navigation/app.route';
import { SERVER } from '../../../server.component';
import axios from 'axios';
import Toast from 'react-native-easy-toast';

import Feed from '../../assets/icon/feed.svg';
import Guide from '../../assets/icon/guide.svg';
import MyPage from '../../assets/icon/MyPage.svg';

var toastRef : any;

export const CourseDetailOverviewScreen = (props: CourseDetailOverviewScreenProps): LayoutElement => {

    const [iconSelected, setIconSelected] = React.useState(true);
    const [CourseData, setCourseData] = React.useState({});
    const [overview, setOverview] = React.useState();

    React.useEffect(() => {
        const courseData = props.navigation.dangerouslyGetParent()?.dangerouslyGetState().routes[2].params.list;
        setCourseData(courseData);
        
        axios.get(SERVER + '/api/user/tour/' + courseData.tourCode + '/course/' + courseData.directory + '/overview')
            .then((response) => {
                setOverview(response.data.overview);
        })
      


    }, [])
  
    const PressBack = () => {
        props.navigation.navigate(SceneRoute.FEED_TOURBOOK);
    }

    const PressBook = () => {
        props.navigation.navigate(NavigatorRoute.BOOK, {
            screen: SceneRoute.BOOK_DATE,
            params: {
                tourCode: CourseData.tourCode
            }
        });
    }   

    const PressGuide = () => {
        props.navigation.navigate(NavigatorRoute.MY_TOUR)
    }
  
    const PressSetting = () => {
        props.navigation.navigate(NavigatorRoute.MY_PAGE)
    }
  

    const PressReview = () => {
        toastRef.show(`The service has just started and there is no review yet :(`, 2000);
        //props.navigation.navigate(SceneRoute.COURSE_DETAIL_REVIEW, props.route.params);
    }

    const PressSpots = () => {
        props.navigation.navigate(SceneRoute.COURSE_DETAIL_SPOTS);
    }


  
     
    return (
      <React.Fragment>
          <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
          
  
          {/* 내용물*/}
          <Layout style={{flex: 9, backgroundColor: 'white'}}>            
            <Image style={styles.image} source={{uri: overview}}/>  
          </Layout>


          {/*Bottom Tab Bar */}
        <Layout style={styles.bottomTabBar}>            
            <Layout style={styles.bottomTab}>
                <TouchableOpacity onPress={PressGuide}>
                    <Guide width={20} height={20}/>
                </TouchableOpacity>
            </Layout>

            <Layout style={{flex: 1}} />     

            <Layout style={styles.bottomTab}>
                <TouchableOpacity onPress={PressSetting}>
                    <MyPage width={20} height={20}/>
                </TouchableOpacity>
            </Layout>
        </Layout>

        <Layout style={styles.bottomBar}>
            <Layout style={{backgroundColor: 'white', borderRadius: 40, flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10}}>
              <TouchableOpacity onPress={() => {PressGuide}}>
                  <Layout style={{width: 30, height: 30, justifyContent: 'center', alignItems: 'center'}}>
                    <Feed width={20} height={20}/>
                  </Layout>                  
              </TouchableOpacity>
            </Layout>
           
            <TouchableOpacity onPress={() => {PressBook()}}>
                <Layout style={{backgroundColor: '#FFD774', borderRadius: 50, justifyContent: 'center', alignItems: 'center', padding: 10, width: 100, height: 40, marginRight: 10}}>
                    <Text style={{fontWeight: 'bold', fontSize: 14, color: 'white'}}>BOOK</Text>
                </Layout>
            </TouchableOpacity>
            
        </Layout>

          {/*탑 탭바 */}
          <Layout style={styles.tabbar}>
          <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
            <Layout style={styles.tabbarContainer}>
            <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
                <TouchableOpacity onPress={PressBack}>
                    <FontAwesomeIcon icon={faAngleLeft} style={{color: '#C9C9C9'}} size={28}/>
                </TouchableOpacity>
            </Layout>
            <Layout style={styles.tabbarContainer}>
            <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
                <TouchableOpacity>
                    <Text style={styles.selectTitle}>Overview</Text>
                </TouchableOpacity>
            </Layout>
            <Layout style={styles.tabbarContainer}>
            <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
                <TouchableOpacity onPress={() => PressSpots()}>
                    <Text style={styles.Title}>Spots</Text>
                </TouchableOpacity>
            </Layout>
            <Layout style={styles.tabbarContainer}>
            <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
                <TouchableOpacity onPress={() => PressReview()}>
                    <Text style={styles.Title}>Review</Text>
                </TouchableOpacity>
            </Layout>








        </Layout>
        
        <Toast ref={(toast) => toastRef = toast} position={'center'}/>
      </React.Fragment>
    );
  };
  
  const styles = StyleSheet.create({
    tabbar: {
        width: '100%',
        height: 80,
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        top: 0,
        backgroundColor: '#00ff0000',
      },
      tabbarContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#00ff0000',
      },
      titleContainer: {
          flex: 5,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white'
      },
      title: {
          fontSize : 16,
          fontWeight: 'bold'
      },
      smallTitle: {
          fontSize : 14,
          fontWeight: 'bold'
      },
      
      iconSelectContainer: {
          borderRadius: 100,
          width: 40,
          height: 40,
          backgroundColor: '#FFC043',
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 10,
      },   
      iconContainer: {
          borderRadius: 100,
          width: 40,
          height: 40,
          backgroundColor: 'white',
          marginHorizontal: 10,
          alignItems: 'center',
          justifyContent: 'center',
      },
      selectTitle: {
          fontSize: 12,
          color: '#FFC043',
          fontWeight: 'bold'
      },
      Title: {
          fontSize: 12,
          color: '#C9C9C9',
          fontWeight: 'bold'
      },
      MainTitle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: 'black',
          textAlign: 'center'
      },
      textContainer: {
          backgroundColor: '#00FF0000',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          width: '70%'
      },
      icon: {
          position: 'absolute', 
          top: 0, 
          right: 0, 
          padding: 30, 
          backgroundColor: '#00FF0000'
      },
      buttonText: {
          fontSize: 12,
          fontWeight: 'bold',
          textAlign: 'center'
      },
      navigationTitle1: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#FFC043',
        textAlign: 'center'
    },
      navigationTitle2: {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'gray',
        textAlign: 'center'
      },
      image: {
        width: (Dimensions.get('window').width), 
        height: (Dimensions.get('window').height), 
        resizeMode: 'stretch'
      },
      bottomTab: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        width : 170,
        height: 55,
        marginBottom: 5,
        borderRadius: 40,
        flexDirection: 'row',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        zIndex: 5
    },
    bottomTabBar: {
        position: 'absolute', 
        bottom: 0, 
        backgroundColor: 'white', 
        flexDirection:'row', 
        height: 50, 
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});