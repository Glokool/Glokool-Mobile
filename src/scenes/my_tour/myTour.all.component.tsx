import React from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER } from '../../server.component';
import axios from 'axios'
import {
  StyleSheet,
  SafeAreaView,

  TouchableOpacity,
  Image,
  FlatList,
  Dimensions
} from 'react-native';
import {
    Divider,
    Text,
  Layout,
  LayoutElement,
} from '@ui-kitten/components';
import { MyTourAllLocationScreenProps } from '../../navigation/myTour.navigator';
import {
    faBook,
    faCommentDots,
    faBars,
    faUser,
    faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route';


export const MyTourAllLocationScreen = (props: MyTourAllLocationScreenProps): LayoutElement => {
  const tour = props.route.params;
  const user = auth().currentUser;
  const [title, setTitle] = React.useState('');
  const [iconSelected, setIconSelected] = React.useState(true);
  const [DATA, setDATA] = React.useState([]);
  const [data, setData] = React.useState([]);

  const [restaurant, setRestaurant] = React.useState(true);
  const [attraction, setAttraction] = React.useState(false);
  const [cafe, setCafe] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  

  React.useEffect(() => {
    axios.get(SERVER + '/api/user/tour/place/tour-id/' + tour?.tour_id)
        .then((response) => {
            setDATA(response.data);
            setData(response.data.filter(item => {return item.type == 'Restaurant'}));
        })
        .catch((err) => {
        });

    AsyncStorage.getItem('title').then((result) => {
            setTitle(result);
        });

  }, [])
  


  React.useEffect(() => {
    if (attraction == true){
        setData(DATA.filter(item => {return item.type == 'Attraction'}));
    }
    else if (restaurant == true){
        setData(DATA.filter(item => {return item.type == 'Restaurant'}));
    }
    else{
        setData(DATA.filter(item => {return item.type == 'Cafe'}));
    }

  }, [attraction, restaurant, cafe])

  const PressBack = () => {
    props.navigation.goBack();
  }

  const PressIcon = () => {
      if(iconSelected == true){
        props.navigation.navigate(SceneRoute.MY_TOUR_CHAT, tour.tourCode );
      }
      else{
        setIconSelected(!iconSelected);
      }      
  }

  const PressRight = () => {
    props.navigation.navigate(SceneRoute.MY_TOUR_MAP);
  }

  const PressRestaurant = () => {
    if(restaurant == false){
        setRestaurant(true);
    }


    setAttraction(false);
    setCafe(false);
    setRefresh(!refresh);
  }

  const PressAttraction = () => {
    if(attraction == false){
        setAttraction(true);
    }


    setRestaurant(false);
    setCafe(false);
    setRefresh(!refresh);
  }

  const PressCafe = () => {
    if(cafe == false){
        setCafe(true);
    }

    setAttraction(false);
    setRestaurant(false);
    setRefresh(!refresh);
  }



  const PressList = item => () => {

    if(item.type == 'Attraction'){
        props.navigation.navigate(NavigatorRoute.ATTRACTION, {
            screen: SceneRoute.ATTRACTION_INFO,
            params: { 
                code: item,
                tourCode: tour.tour_id
            },
        });
    }
    else if (item.type == 'Restaurant'){
        props.navigation.navigate(NavigatorRoute.RESTAURANT, {
            screen: SceneRoute.RESTAURANT_INFO,
            params: { 
                code: item,
                tourCode: tour.tour_id
            },
        });
    }
    else {
        props.navigation.navigate(NavigatorRoute.CAFE, {
            screen: SceneRoute.CAFE_INFO,
            params: { 
                code: item,
                tourCode: tour.tour_id
            },
        });
    }
  }

  const PressFeed = () => {
      props.navigation.navigate(NavigatorRoute.FEED)
  }

  const PressSetting = () => {
      props.navigation.navigate(NavigatorRoute.MY_PAGE)
  }

  const PressTravelStyles = () => {
      props.navigation.navigate(NavigatorRoute.COURSE, {
        screen: SceneRoute.COURSE_LIST,
        params: { 
            tourCode: tour.tour_id
        },
    });
  }


  //Flat List 렌더링
  const renderItem = ({item}) => (
        <TouchableOpacity onPress={PressList(item)}>
          <Layout style={{flexDirection: 'column', padding: 10}}>
             <Layout style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{width: (Dimensions.get('window').width * 0.75), height: (Dimensions.get('window').height * 0.15), resizeMode: 'stretch', borderRadius: 1}}source={{uri: item.banner}}/>
             </Layout> 

             <Layout style={{flexDirection: 'column', flex: 2, alignItems: 'flex-start', justifyContent: 'center',padding: 10}}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.desc}>{item.description}</Text>
             </Layout>                       
          </Layout>
          <Divider style={{backgroundColor: '#C9C9C9', marginHorizontal: 10}}/>
        </TouchableOpacity>
  );

  
  return (
    <React.Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
        
        <Layout style={{flex: 8, backgroundColor: 'white', flexDirection: 'row'}}>

            {/*사이드 바 스타일 */}
            <Layout style={{flex: 15, backgroundColor: '#FEE8AD', alignItems: 'center', justifyContent: 'center'}}>
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
                    <TouchableOpacity style={{marginBottom: 50, transform: [{rotate: '270deg'}],  width: 80}}>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>Locations</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 50, transform: [{rotate: '270deg'}], width: 80}} onPress={PressTravelStyles}>
                        <Text style={{fontSize: 12, fontWeight: 'bold', color: '#C9C9C9'}} numberOfLines={1}>Travel Styles</Text>
                    </TouchableOpacity>                 
                </Layout>
            </Layout>
            
            
            <Layout style={{flex: 85}}>
                {/*탑 탭바 */}
                <Layout style={styles.tabbar}>
                    <Text style={styles.title}>{title}</Text>
                </Layout> 

                <Layout style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white',overflow: 'hidden'}}>
                    {((attraction)? 
                    /*Bubble Tab bar attraction Selected*/
                    <Layout style={{flexDirection: 'row', padding: 20}}>
                        <TouchableOpacity style={styles.touchContainer} onPress={PressAttraction}>
                            <Layout style={styles.bubbleSelectedTab}>
                                <Text style={styles.bubbleSelectedText}>Attraction</Text>
                            </Layout>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchContainer} onPress={PressRestaurant}>
                            <Layout style={styles.bubbleTab}>
                                <Text style={styles.bubbleText}>Restaurant</Text>
                            </Layout>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchContainer} onPress={PressCafe}>
                            <Layout style={styles.bubbleTab}>
                                <Text style={styles.bubbleText}>Café</Text>
                            </Layout>
                        </TouchableOpacity>                
                    </Layout>   
                    : 
                    null)}

                    {((restaurant)? 
                    /*Bubble Tab bar restaurant Selected*/
                    <Layout style={{flexDirection: 'row', padding: 20}}>
                        <TouchableOpacity style={styles.touchContainer} onPress={PressAttraction}>
                            <Layout style={styles.bubbleTab}>
                                <Text style={styles.bubbleText}>Attraction</Text>
                            </Layout>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchContainer} onPress={PressRestaurant}>
                            <Layout style={styles.bubbleSelectedTab}>
                                <Text style={styles.bubbleSelectedText}>Restaurant</Text>
                            </Layout>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchContainer} onPress={PressCafe}>
                            <Layout style={styles.bubbleTab}>
                                <Text style={styles.bubbleText}>Café</Text>
                            </Layout>
                        </TouchableOpacity>                
                    </Layout>   
                    : 
                    null)}

                    {((cafe)? 
                    /*Bubble Tab bar cafe Selected*/
                    <Layout style={{flexDirection: 'row', padding: 20}}>
                        <TouchableOpacity style={styles.touchContainer} onPress={PressAttraction}>
                            <Layout style={styles.bubbleTab}>
                                <Text style={styles.bubbleText}>Attraction</Text>
                            </Layout>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchContainer} onPress={PressRestaurant}>
                            <Layout style={styles.bubbleTab}>
                                <Text style={styles.bubbleText}>Restaurant</Text>
                            </Layout>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchContainer} onPress={PressCafe}>
                            <Layout style={styles.bubbleSelectedTab}>
                                <Text style={styles.bubbleSelectedText}>Café</Text>
                            </Layout>
                        </TouchableOpacity>                
                    </Layout>   
                    : 
                    null)}
                </Layout>
                <Layout style={{flex: 9}}>
                    <FlatList
                        style={{backgroundColor: 'white'}}
                        contentContainerStyle={{ paddingBottom: 78 }}
                        data={data}
                        extraData={refresh}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </Layout>
                
            </Layout>            
        </Layout>

        {/*Bottom Tab Bar */}
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
        backgroundColor: 'white'
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
    dateTitle: {
        fontSize: 12,
        color: '#FFC043'
    },
    dateTitle2: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFC043'
    },
    title1: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    title2: {
        fontSize: 12,
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
    bubbleTab: {
        borderRadius: 30,
        backgroundColor: '#F5F5F5'
    },
    bubbleSelectedTab: {
        borderRadius: 30,
        backgroundColor: '#FFC043'
    },
    bubbleSelectedText: {
        fontSize: 12,
        color: 'white',
        marginVertical: 5,
        marginHorizontal: 20,
    },
    bubbleText: {
        fontSize: 12,
        color: '#C9C9C9',
        marginVertical: 5,
        marginHorizontal: 20,
    },
    touchContainer: {
        marginHorizontal: 5
    },
    type: {
        fontSize: 10
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10
    },
    desc: {
        fontSize: 12
    }
});