import React from 'react';
import auth from '@react-native-firebase/auth'
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList
} from 'react-native';
import {
  Layout,
  LayoutElement,
  Text,
} from '@ui-kitten/components';
import { CourseDetailSpotsScreenProps } from '../../../navigation/course.navigator';
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



export const CourseDetailSpotsScreen = (props: CourseDetailSpotsScreenProps): LayoutElement => {
    const [iconSelected, setIconSelected] = React.useState(true);
    const [courseData, setCourseData] = React.useState([]);
    


    React.useEffect(() => {
        
        
        const course = props.navigation.dangerouslyGetParent().dangerouslyGetState().routes[1].params.list
        console.log(course)
            
        axios.get(SERVER + '/api/user/tour/' + course.tourCode + '/course/' + course.directory + '/spots')
            .then((response) => {
                setCourseData(response.data)
            })

        
    }, [])

    const PressBack = () => {
        props.navigation.pop(4);
    }
  
    const PressIcon = () => {
        if(iconSelected == true){
            props.navigation.navigate(SceneRoute.MY_TOUR_CHAT);
        }
        else{
          setIconSelected(!iconSelected);
        }      
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

    const PressOverview = (id) => {
        props.navigation.navigate(SceneRoute.COURSE_DETAIL_OVERVIEW, props.route.params);
    }


    const renderItem = ({item}) => (
        <Layout>
            <Image style={{width: (Dimensions.get('window').width), height: (Dimensions.get('window').height), resizeMode: 'stretch'}} source={{uri: item.image}}/>
        </Layout>           
    )
    
    return (
      <React.Fragment>
          <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
          
          {/* 내용물*/}
          <Layout style={{flex: 9, backgroundColor: 'white'}}>
            <FlatList
                style={{backgroundColor: 'white'}}
                initialNumToRender={8}
                horizontal={true}
                data={courseData}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
            />            
          </Layout>

          
  
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
                    <TouchableOpacity onPress={() => PressOverview()}>
                        <Text style={styles.Title}>Overview</Text>
                    </TouchableOpacity>
                </Layout>
                <Layout style={styles.tabbarContainer}>
                <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
                    <TouchableOpacity>
                        <Text style={styles.selectTitle}>Spots</Text>
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
  });