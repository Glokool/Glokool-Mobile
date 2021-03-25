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
import { CourseListScreenProps } from '../../../navigation/course.navigator';
import {
    faBook,
    faCommentDots,
    faUser,
    faBars,
    faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigatorRoute, SceneRoute } from '../../../navigation/app.route';
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { SERVER } from '../../../server.component';
import axios from 'axios';


export const CourseListScreen = (props: CourseListScreenProps): LayoutElement => {
    const user = auth().currentUser;
    const tripData = props.route.params;
    const [iconSelected, setIconSelected] = React.useState(true);
    const [data, setData] = React.useState([]); 
    const [title, setTitle] = React.useState('');

    React.useEffect(() => {
        axios.get(SERVER + '/api/user/tour/' + tripData.tourCode + '/course')
            .then((response) => {
                setData(response.data)
                setTitle(response.data[0].title)
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

    const PressMap = () => {
        props.navigation.navigate(SceneRoute.COURSE_MAP, tripData.tourCode);
    }

    const PressList = item => () => {
        props.navigation.navigate(NavigatorRoute.COURSE_DETAIL, {
            list: { 
                tourCode: tripData.tourCode,
                directory: item.directory
            },
           
        });
    }
    
    const renderItem = ({item}) => (
        <TouchableOpacity onPress={PressList(item)}>
            <Layout style={{marginVertical: 5, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{width: 304, height: 135}} source={{uri: item.banner}}/>
            </Layout>
        </TouchableOpacity>
        
    );

    

  
     
    return (
      <React.Fragment>
          <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
          
  
          {/* 내용물*/}
          <Layout style={{flex: 9, backgroundColor: 'white', flexDirection: 'row'}}>

            {/*사이드 바 스타일 */}
            <Layout style={{flex: 15, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center'}}>
                <Layout style={{flex: 1, backgroundColor: '#00FF0000', alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={PressBack}>
                        <FontAwesomeIcon icon={faAngleLeft} style={{color: 'black'}} size={32}/>
                    </TouchableOpacity>
                </Layout>

                <Layout style={{flex: 1, backgroundColor: '#00FF0000', alignItems: 'center', justifyContent: 'center',}}>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faHeart} style={{color: 'black'}} size={28}/>
                    </TouchableOpacity>
                </Layout>

                <Layout style={{flex: 9, backgroundColor: '#00FF0000', alignItems: 'flex-start', justifyContent: 'flex-start', paddingTop: 40}}>
                    <TouchableOpacity style={{marginBottom: 50, transform: [{rotate: '270deg'}],  width: 80}}  onPress={PressBack}>
                        <Text style={{fontSize: 12, fontWeight: 'bold', color: '#C9C9C9'}}>Locations</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 50, transform: [{rotate: '270deg'}], width: 80}}>
                        <Text style={{fontSize: 12, fontWeight: 'bold', color: '#FCCA67'}} numberOfLines={1}>Travel Styles</Text>
                    </TouchableOpacity>                 
                </Layout>
            </Layout>
            
            <Layout style={{flex: 85}}>
               
            {/*탑 탭바 */}
            <Layout style={styles.tabbar}>                
                <Layout style={styles.titleContainer}>
                    <Text style={styles.MainTitle}>{title}</Text>
                </Layout>
            </Layout>

            {/*맵으로 가는 버튼*/}
            <Layout style={{flex: 1, padding: 20}}>
                <TouchableOpacity onPress={PressMap}>
                    <Layout style={{borderRadius: 10, backgroundColor:'#FCCA67', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16, marginVertical: 15}}>Look up Full Map</Text>
                    </Layout>
                </TouchableOpacity>                
            </Layout>

            <Layout style={{flex: 9, padding: 10, backgroundColor: 'white'}}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </Layout>  
                {/*마지막 바텀바 위로 올리기 위한 것*/}
                <Layout style={{height: 70, backgroundColor: 'white'}}/>            
            </Layout>
          </Layout>

          {/* Bottom Bar */}
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
          flex: 1.1,
          flexDirection: 'row',
          backgroundColor: '#00FF0000',       
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