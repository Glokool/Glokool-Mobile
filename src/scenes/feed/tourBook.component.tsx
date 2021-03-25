import React from 'react';

import { SERVER } from '../../server.component';
import axios from 'axios'
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import {
  Divider,
  Text,
  Layout,
  LayoutElement,
} from '@ui-kitten/components';
import { TourBookScreenProps } from '../../navigation/feed.navigator';
import {
    faEllipsisH,
    faEllipsisV,
    faGripLines
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route';
import Drawer from 'react-native-draggable-view';


import Feed from '../../assets/icon/feed.svg';
import Guide from '../../assets/icon/guide.svg';
import MyPage from '../../assets/icon/MyPage.svg';

export const TourBookScreen = (props: TourBookScreenProps): LayoutElement => {
  const tour = props.route.params;
  const [title, setTitle] = React.useState({});
  const [iconSelected, setIconSelected] = React.useState(true);
  const [DATA, setDATA] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [sideBar, setSideBar] = React.useState(false);

  const [restaurant, setRestaurant] = React.useState(true);
  const [attraction, setAttraction] = React.useState(false);
  const [cafe, setCafe] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  React.useEffect(() => {
    axios.get(SERVER + '/api/user/tour/place/tour-id/' + tour)
        .then((response) => {
            setDATA(response.data);
            setTitle(response.data[0]);
            setData(response.data.filter(item => {return item.type == 'Restaurant'}));
        })
        .catch((err) => {
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
        
            <Drawer
                initialDrawerSize={0.7}
                autoDrawerUp={1} // 1 to auto up, 0 to auto down
                isInverseDirection={false}
                finalDrawerHeight={0}
                
                renderInitDrawerView={() => (  
                   <Layout style={{width: '100%', height: 10, padding: 10, position: 'absolute', backgroundColor: '#00FF0000', zIndex: 10, justifyContent: 'center', alignItems:'center', borderRadius: 10}}>
                       <FontAwesomeIcon icon={faGripLines} size={20} color={'gray'}/>
                    </Layout>
                )}
                renderDrawerView={() => (
                    <Layout style={{height: (Dimensions.get('window').height * 1) ,backgroundColor: '#00FF0000', flexDirection: 'row'}}>
                    {/*사이드 바 스타일 */}            
                    {(sideBar)? 
                        <Layout style={{flex: 15, backgroundColor: '#FEE8AD', alignItems: 'center', justifyContent: 'center'}}>
                            <Layout style={{flex: 1, backgroundColor: '#00FF0000', alignItems: 'center', justifyContent: 'center'}}>
                                <TouchableOpacity onPress={() => setSideBar(false)}>
                                    <FontAwesomeIcon icon={faEllipsisV} style={{color: '#FFD774'}} size={20}/>
                                </TouchableOpacity>
                            </Layout>

                            <Layout style={{flex: 9, backgroundColor: '#00FF0000', alignItems: 'flex-start', justifyContent: 'flex-start', paddingTop: 40}}>
                                <TouchableOpacity style={{marginBottom: 60, transform: [{rotate: '270deg'}],  width: 90}}>
                                    <Text style={{fontSize: 15, fontWeight: 'bold', color: '#FFD774'}}>Locations</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginTop: 60, transform: [{rotate: '270deg'}], width: 90}} onPress={PressTravelStyles}>
                                    <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}} numberOfLines={1}>Travel Styles</Text>
                                </TouchableOpacity>                 
                            </Layout>
                        </Layout>
                    : 
                        null
                    }
                    

                        <Layout style={{flex: 85, borderTopStartRadius: 50, borderTopEndRadius: 50}}>
            
                            <Layout style={{flex: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden',  borderTopRightRadius: 25, borderTopLeftRadius: 25, backgroundColor: 'white'}}>
                                {((attraction)? 
                                /*Bubble Tab bar attraction Selected*/
                                    <Layout style={{flexDirection: 'row', padding: 20}}>
                                    {(sideBar)?
                                        null
                                    :
                                        <TouchableOpacity style={{marginVertical: 5, marginHorizontal: 15}} onPress={() => setSideBar(true)}>
                                            <Layout style={styles.touchIcon}>
                                                <FontAwesomeIcon icon={faEllipsisH} width={20} height={20} color={'#FFD774'}/>
                                            </Layout>                            
                                        </TouchableOpacity>
                                    }


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
                                    
                                    {(sideBar)?
                                        null
                                    :
                                    <TouchableOpacity style={{marginVertical: 5, marginHorizontal: 15}} onPress={() => setSideBar(true)}>
                                        <Layout style={styles.touchIcon}>
                                            <FontAwesomeIcon icon={faEllipsisH} width={20} height={20} color={'#FFD774'}/>
                                        </Layout>                            
                                    </TouchableOpacity>
                                    }
                                    

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

                                    {(sideBar)?
                                        null
                                    :
                                    <TouchableOpacity style={{marginVertical: 5, marginHorizontal: 15}} onPress={() => setSideBar(true)}>
                                        <Layout style={styles.touchIcon}>
                                            <FontAwesomeIcon icon={faEllipsisH} width={20} height={20} color={'#FFD774'}/>
                                        </Layout>                            
                                    </TouchableOpacity>
                                    }

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
                    
                )}
                renderContainerView={() => (
                    
                    <Layout style={{width: '100%', height: 600, position: 'absolute', top: 0, backgroundColor: 'yellow'}}/>
                )}
                
                
        />
        
        
        

        


        {/*Bottom Tab Bar */}
        <Layout style={styles.bottomTabBar}>            
            <Layout style={styles.bottomTab}>
                <TouchableOpacity onPress={PressFeed}>
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
              <TouchableOpacity>
                  <Layout style={{width: 30, height: 30, justifyContent: 'center', alignItems: 'center'}}>
                    <Feed width={20} height={20}/>
                  </Layout>                  
              </TouchableOpacity>
            </Layout>
           
            <TouchableOpacity>
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
        backgroundColor: '#F5F5F5',
        padding: 5,
    },
    bubbleSelectedTab: {
        borderRadius: 30,
        backgroundColor: '#FFC043',
        padding: 5,
    },
    bubbleSelectedText: {
        fontSize: 13,
        color: 'white',
        marginVertical: 5,
        marginHorizontal: 15,

    },
    bubbleText: {
        fontSize: 13,
        color: '#C9C9C9',
        marginVertical: 5,
        marginHorizontal: 15,
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
    },
    touchIcon: {
        width: 30, 
        height: 30, 
        justifyContent: 'center', 
        alignItems:'center'
    },
});