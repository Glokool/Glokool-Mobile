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
import { CourseMapScreenProps } from '../../../navigation/course.navigator';
import {
    faLongArrowAltLeft,
    faBook,
    faCommentDots,
    faUser,
    faBars
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigatorRoute, SceneRoute } from '../../../navigation/app.route';
import { SERVER } from '../../../server.component';
import axios from 'axios';


export const CourseMapScreen = (props: CourseMapScreenProps): LayoutElement => {
    const user = auth().currentUser;
    const data = props.route.params
    const [iconSelected, setIconSelected] = React.useState(true);
    const [courseData, setCourseData] = React.useState([]);

    React.useEffect(() => {
        axios.get(SERVER + '/api/user/tour/'+ data +'/course/map')
            .then((response) => {
                setCourseData(response.data);
                console.log(response.data)
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

    const renderItem = ({item}) => (
        <Layout style={{width: Dimensions.get('window').width, height: (Dimensions.get('window').height - 80)}}>
            <Image style={{width: (Dimensions.get('window').width), height: (Dimensions.get('window').height * 0.8), resizeMode: 'stretch'}} source={{uri: item}}/>  
        </Layout>        
    )
  
     
    return (
      <React.Fragment>
          <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
          {/*탑 탭바 */}
          <Layout style={styles.tabbar}>
              <Layout style={styles.tabbarContainer}>
                  <TouchableOpacity onPress={PressBack}>
                      <FontAwesomeIcon icon={faLongArrowAltLeft} style={{color: 'black'}} size={28}/>
                  </TouchableOpacity>
              </Layout>

              <Layout style={styles.titleContainer}>
                  <Text style={styles.MainTitle}>{courseData.title}'s Map</Text>
              </Layout>


              
          </Layout>
  
          {/* 내용물*/}
          <Layout style={{flex: 9, backgroundColor: 'white'}}>
            <FlatList
                    style={{backgroundColor: 'white'}}
                    horizontal={true}
                    data={courseData.course}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
            />    
  
            {/*마지막 바텀바 위로 올리기 위한 것*/}
            <Layout style={{height: 70, backgroundColor: 'white'}}/>
        
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
          
  
      </React.Fragment>
    );
  };
  
  const styles = StyleSheet.create({
      tabbar: {
          flex: 1,
          flexDirection: 'row',
          backgroundColor: 'white',       
      },
      tabbarContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white'
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
      }
  });