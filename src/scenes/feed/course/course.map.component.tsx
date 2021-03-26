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
import { CourseMapScreenProps } from '../../../navigation/feed.navigator';
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

import Feed from '../../assets/icon/feed.svg';
import Guide from '../../assets/icon/guide.svg';
import MyPage from '../../assets/icon/MyPage.svg';

export const CourseMapScreen = (props: CourseMapScreenProps): LayoutElement => {

    const data = props.route.params;
    const [courseData, setCourseData] = React.useState([]);

    React.useEffect(() => {
        axios.get(SERVER + '/api/user/tour/'+ data.params.tourCode +'/course/map')
            .then((response) => {
                setCourseData(response.data);
            })

    }, []);

    const PressBook = () => {
        props.navigation.navigate(NavigatorRoute.BOOK, {
            screen: SceneRoute.BOOK_DATE,
            params: {
                tourCode: data.params.tourCode
            }
        });
    }

    const PressBack = () => {
      props.navigation.goBack();
    }

    const PressGuide = () => {
        props.navigation.navigate(NavigatorRoute.MY_TOUR)
    }
  
    const PressSetting = () => {
        props.navigation.navigate(NavigatorRoute.MY_PAGE)
    }   
   
    const renderItem = ({item}) => (
        <Layout style={{width: Dimensions.get('window').width, height: (Dimensions.get('window').height - 1000)}}>
            <Image style={{width: '100%', height: '100%', resizeMode: 'stretch'}} source={{uri: item}}/>
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

              <Layout style={styles.tabbarContainer}>

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
      },bottomTabBar: {
        position: 'absolute', 
        bottom: 0, 
        backgroundColor: 'white', 
        flexDirection:'row', 
        height: 50, 
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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
  });