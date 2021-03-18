import React from 'react';
import auth from '@react-native-firebase/auth'
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
    faBook,
    faCommentDots,
    faUser,
    faBars,
    faAngleLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigatorRoute, SceneRoute } from '../../../navigation/app.route';
import { SERVER } from '../../../server.component';
import axios from 'axios';
import Toast from 'react-native-easy-toast';
var toastRef;


export const CourseDetailOverviewScreen = (props: CourseDetailOverviewScreenProps): LayoutElement => {
    const user = auth().currentUser;
    const [iconSelected, setIconSelected] = React.useState(true);
    const [CourseData, setCourseData] = React.useState({});
    const [overview, setOverview] = React.useState();



    React.useEffect(() => {
        const courseData = props.navigation.dangerouslyGetParent().dangerouslyGetState().routes[1].params.list
        

        axios.get(SERVER + '/api/user/tour/' + courseData.tourCode + '/course/' + courseData.directory + '/overview')
            .then((response) => {
                setOverview(response.data.overview);
            })
      


    }, [])
  
    const PressBack = () => {
      props.navigation.goBack();
    }
  
    const PressIcon = () => {
        if(iconSelected == true){
            props.navigation.navigate(SceneRoute.MY_TOUR_CHAT);
        }
        else{
          setIconSelected(!iconSelected);
        }      
    }

    const PressLike = () => {

    }

    const PressFeed = () => {
      props.navigation.navigate(NavigatorRoute.FEED)
    }
  
      const PressSetting = () => {
      props.navigation.navigate(NavigatorRoute.MY_PAGE)
    }


    const PressReview = (id) => {
        toastRef.show(`It's Under development.`, 2000);
        //props.navigation.navigate(SceneRoute.COURSE_DETAIL_REVIEW, props.route.params);
    }

    const PressSpots = (id) => {
        props.navigation.navigate(SceneRoute.COURSE_DETAIL_SPOTS);
    }


  
     
    return (
      <React.Fragment>
          <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
          
          

  
          {/* 내용물*/}
          <Layout style={{flex: 9, backgroundColor: 'white'}}>            
            <Image style={styles.image} source={{uri: overview}}/>  
          </Layout>


          {/*Bottom Tab bar */}
          <Layout style={{position: 'absolute', bottom: 0, backgroundColor: '#00FF0000', padding: 20, flexDirection:'row'}}>
              <TouchableOpacity onPress={PressFeed}>
                  <FontAwesomeIcon icon={faBars} style={{color: 'gray'}} size={20}/>
              </TouchableOpacity>
  
              <Layout style={{flex: 5, backgroundColor: '#00FF0000'}}/>
  
              <TouchableOpacity onPress={PressSetting}>
                  <FontAwesomeIcon icon={faUser} style={{color: 'gray'}} size={20}/>
              </TouchableOpacity>
          </Layout>
  
  
          {/*Bottom Tab Bar*/}
          {((iconSelected)?
          <Layout style={styles.bottomBar}>
              <Layout style={styles.iconSelectContainer}>
                  <TouchableOpacity>
                      <FontAwesomeIcon icon={faBook} style={{color: 'white'}} size={20}/>
                  </TouchableOpacity>                
              </Layout>
              <Layout style={styles.iconContainer}>
                  <TouchableOpacity onPress={PressIcon}>
                      <FontAwesomeIcon icon={faCommentDots} style={{color: 'gray'}} size={20}/>
                  </TouchableOpacity>                
              </Layout>
              </Layout>
          :
          <Layout style={styles.bottomBar}>
              <Layout style={styles.iconContainer}>
                  <TouchableOpacity  onPress={PressIcon}>
                      <FontAwesomeIcon icon={faBook} style={{color: 'gray'}} size={20}/>
                  </TouchableOpacity>                
              </Layout>
              <Layout style={styles.iconSelectContainer}>
                  <TouchableOpacity>
                      <FontAwesomeIcon icon={faCommentDots} style={{color: 'white'}} size={20}/>
                  </TouchableOpacity>                
              </Layout>
              </Layout>
          )}

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
                <TouchableOpacity onPress={() => PressSpots(CourseData.id)}>
                    <Text style={styles.Title}>Spots</Text>
                </TouchableOpacity>
            </Layout>
            <Layout style={styles.tabbarContainer}>
            <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
                <TouchableOpacity onPress={() => PressReview(CourseData.id)}>
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
      bottomBar: {
          position: 'absolute',
          bottom: 0,
          flex: 1,
          width: 130,
          height: 58,
          marginBottom: 10,
          flexDirection: 'row',
          borderRadius: 40,
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
      }
});