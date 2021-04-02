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
  Text,
} from 'react-native';
import {
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
import BAR from '../../assets/icon/bar.svg';


export const TourBookScreen = (props: TourBookScreenProps): LayoutElement => {
  const tour = props.route.params;
  const [title, setTitle] = React.useState({});
  const [iconSelected, setIconSelected] = React.useState(true);
  const [tag, setTag] = React.useState([]);
  const [DATA, setDATA] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [sideBar, setSideBar] = React.useState(true);
  const [course, setCourse] = React.useState(false); // 트래블 스타일을 클릭했는지 검사
  const [courseData, setCourseData] = React.useState([]);

  const [restaurant, setRestaurant] = React.useState(false);
  const [attraction, setAttraction] = React.useState(true); // 어트랙션부터 표기
  const [cafe, setCafe] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [thumbnailHeight, setThumbnailHeight] = React.useState(0);

  React.useEffect(() => {   

    async function getHeight() {
        
        await axios.get(SERVER + '/api/user/tour/place/tour-id/' + tour)
        .then((response) => {
            setDATA(response.data);
            setTitle(response.data[0]);
            setData(response.data.filter(item => {return item.type == 'Attraction'}));


            var tag = response.data[0].tags.toString().replace(/#/g,'');
            tag = tag.split(',')
            setTag(tag);
            
            setThumbnailHeight(Dimensions.get('window').height * 0.4)
        })
        .catch((err) => {

        });
        
        await axios.get(SERVER + '/api/user/tour/' + tour + '/course')
            .then((response) => {
                setCourseData(response.data)
            })        
        
    }

    getHeight();

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

  const PressGuide = () => {
      props.navigation.navigate(NavigatorRoute.GUIDE);
  }

  const PressSetting = () => {
      props.navigation.navigate(NavigatorRoute.MY_PAGE);
  }

  const PressCourse = item => () => {

    props.navigation.navigate(NavigatorRoute.COURSE_DETAIL, {
        list: { 
            tourCode: tour,
            directory: item.directory
        }        
    });
  }

  const PressMap = () => {
      props.navigation.navigate(SceneRoute.COURSE_MAP, {
            params: {
                tourCode: tour
            }
      }
      )
  }

  const PressBook = () => {
      props.navigation.navigate(NavigatorRoute.BOOK, {
          screen: SceneRoute.BOOK_DATE,
          params: {
              tourCode: tour
          }
      });
  }

  const PressFeed = () => {
    props.navigation.navigate(SceneRoute.FEED);
  }

  //Flat List 렌더링 (레스토랑/카페/어트랙션)
  const renderItem = ({item}) => (
        <TouchableOpacity onPress={PressList(item)}>
          <Layout style={{flexDirection: 'column', padding: 10}}>
             <Layout style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{width: (Dimensions.get('window').width * 0.75), height: (Dimensions.get('window').height * 0.15), resizeMode: 'stretch', borderRadius: 5}}source={{uri: item.banner}}/>
             </Layout> 

             <Layout style={{flexDirection: 'column', flex: 2, alignItems: 'flex-start', justifyContent: 'center',padding: 10}}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.desc}>{item.description}</Text>
             </Layout>                       
          </Layout>
        </TouchableOpacity>
  );

  //Flat List 렌더링 (코스)
  const renderCourseItem = ({item}) => (
    <TouchableOpacity onPress={PressCourse(item)}>
        <Layout style={{marginVertical: 5, alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{width: 304, height: 135}} source={{uri: item.banner}}/>
        </Layout>
    </TouchableOpacity>        
  );

  
  return (
    <React.Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
            <Drawer
                initialDrawerSize={0.7}
                autoDrawerUp={0} // 1 to auto up, 0 to auto down
                isInverseDirection={true}
                finalDrawerHeight={thumbnailHeight}

                renderContainerView={() => (
                    
                    <Layout style={{position: 'relative',width: '100%'}}>
                        
                        <Layout style={{position : 'relative', width: '100%', height: (Dimensions.get('window').height* 0.6), top: 0, backgroundColor: '#00FF0000'}}>
                            <Image style={{width: (Dimensions.get('window').width), height: (Dimensions.get('window').height* 0.6), resizeMode: 'stretch'}} source={{uri: title.thumbnail}}/>
                        </Layout>

                        <Layout style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', width: '100%', height: (Dimensions.get('window').height* 0.6), backgroundColor: '#00FF0000'}}>
                            
                            <Layout style={{flex: 1, backgroundColor: '#00FF0000', padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontWeight: "700", fontSize: 20, color: 'white', textAlign: 'center'}}>{title.title}</Text>
                                                               
                                <Layout style={{flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#00FF0000', justifyContent: 'center', marginVertical: 10}}>
                                    {(tag.map((item, idx) =>                                  
                                            <Text style={{fontWeight: "700", fontSize: 16, color: '#FFD774', textAlign: 'center', marginTop: 0}}>
                                                {`#`}<Text style={{fontWeight: "700", fontSize: 16, color: 'white', textAlign: 'center', marginTop: 20}}>{item}</Text> <Text> </Text>
                                            </Text>                                                               
                                    ))}
                                </Layout> 
                            </Layout>

                            <Layout style={{flex: 1, backgroundColor: '#00FF0000', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontWeight: "700", fontSize: 16, color: 'white', textAlign: 'center', padding: 5}}>{title.description}</Text>
                            </Layout>
                           
                        </Layout>           
                    </Layout>
                )}
                
                renderInitDrawerView={() => (  
                   <Layout style={{width: '100%', height: 20, position: 'absolute', backgroundColor: '#00FF0000', zIndex: 20, justifyContent: 'center', alignItems:'center'}}>
                        <BAR width={25} height={15}/>
                    </Layout>
                )}
                renderDrawerView={() => (
                    <Layout style={{height: (Dimensions.get('window').height) ,backgroundColor: '#00FF0000', flexDirection: 'row'}}>
                        
                        {/*사이드 바 스타일 */}            
                        {(sideBar)?
                        
                            (course)?
                            
                            <Layout style={{flex: 15, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center'}}>
                                <Layout style={{flex: 1, backgroundColor: '#00FF0000', alignItems: 'center', justifyContent: 'center'}}>
                                    <TouchableOpacity onPress={() => setSideBar(false)}>
                                        <FontAwesomeIcon icon={faEllipsisH} style={{color: '#FFD774'}} size={20}/>
                                    </TouchableOpacity>
                                </Layout>

                                <Layout style={{flex: 9, backgroundColor: '#00FF0000', alignItems: 'flex-start', justifyContent: 'flex-start', paddingTop: 10}}>
                                    <TouchableOpacity style={{marginBottom: 60, transform: [{rotate: '270deg'}],  width: 120}} onPress={() => setCourse(false)}>
                                        <Text style={{fontSize: 15, fontWeight: 'bold', color: '#D3D3D3'}}>Locations</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{marginTop: 60, transform: [{rotate: '270deg'}], width: 120}}>
                                        <Text style={{fontSize: 15, fontWeight: 'bold', color: '#FFD774'}} numberOfLines={1}>Travel Styles</Text>
                                    </TouchableOpacity>                 
                                </Layout>
                            </Layout>                        
                            
                            :

                            <Layout style={{flex: 15, backgroundColor: '#FEE8AD', alignItems: 'center', justifyContent: 'center'}}>
                                <Layout style={{flex: 1, backgroundColor: '#00FF0000', alignItems: 'center', justifyContent: 'center', padding: 20}}>
                                    <TouchableOpacity onPress={() => setSideBar(false)}>
                                        <FontAwesomeIcon icon={faEllipsisH} style={{color: '#FFD774'}} size={20}/>
                                    </TouchableOpacity>
                                </Layout>

                                <Layout style={{flex: 9, backgroundColor: '#00FF0000', alignItems: 'flex-start', justifyContent: 'flex-start', paddingTop: 10}}>
                                    <TouchableOpacity style={{marginBottom: 60, transform: [{rotate: '270deg'}],  width: 120}}>
                                        <Text style={{fontSize: 15, fontWeight: 'bold', color: '#FFD774'}}>Locations</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{marginTop: 60, transform: [{rotate: '270deg'}], width: 120}} onPress={() => setCourse(true)}>
                                        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}} numberOfLines={1}>Travel Styles</Text>
                                    </TouchableOpacity>                 
                                </Layout>
                            </Layout>                        
                        
                        : 
                            null
                        }
                    

                      

                            {(course)? 
                                <Layout style=
                                    {(sideBar)?
                                        {flex: 85, borderTopEndRadius: 10}
                                    :
                                        {flex: 85, borderTopStartRadius: 10, borderTopEndRadius: 10}
                                    }
                                >

                                    {(sideBar)? 
                                        <Layout style={{flex: 1, padding: 20, paddingBottom: 0, borderTopStartRadius: 25, borderTopEndRadius: 25,}}>                                           
                                            <TouchableOpacity onPress={() => {PressMap()}} >
                                                <Layout style={{borderRadius: 10, backgroundColor:'#FCCA67', alignItems: 'center', justifyContent: 'center'}}>
                                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16, marginVertical: 15}}>Look up Full Map</Text>
                                                </Layout>
                                            </TouchableOpacity>                
                                        </Layout>
                                    :
                                        <Layout style={{flex: 1, padding: 20, paddingBottom: 0, flexDirection: 'row', borderTopStartRadius: 25, borderTopEndRadius: 25,}}>
                                            <TouchableOpacity style={{flex: 2}} onPress={() => setSideBar(true)}>
                                                <Layout style={styles.touchIcon}>
                                                    <FontAwesomeIcon icon={faEllipsisH} width={20} height={20} color={'#FFD774'}/>
                                                </Layout>                            
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => {PressMap()}} style={{flex: 9}}>
                                                <Layout style={{borderRadius: 10, backgroundColor:'#FCCA67', alignItems: 'center', justifyContent: 'center'}}>
                                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16, marginVertical: 15}}>Look up Full Map</Text>
                                                </Layout>
                                            </TouchableOpacity>                
                                        </Layout>
                                    }
                                 
                                    

                                    <Layout style={{flex: 9, padding: 10, backgroundColor: 'white'}}>
                                        <FlatList
                                            data={courseData}
                                            renderItem={renderCourseItem}
                                            keyExtractor={item => item.id}
                                            contentContainerStyle={{ paddingBottom: 300 }}
                                        />
                                    </Layout>  

                                </Layout>                               


                                :
                                <Layout style=
                                    {(sideBar)?
                                        {flex: 85, borderTopEndRadius: 10}
                                    :
                                        {flex: 85, borderTopStartRadius: 10, borderTopEndRadius: 10}
                                    }
                                >

                                <Layout style={{flex: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: 'white', marginTop: 10}}>
                                {((attraction)? 
                                /*Bubble Tab bar attraction Selected*/
                                    <Layout style={{flexDirection: 'row', padding: 20}}>
                                        {(sideBar)?
                                            null
                                        :
                                            <TouchableOpacity style={{marginVertical: 5, marginHorizontal: 15}} onPress={() => setSideBar(true)}>
                                                <Layout style={styles.touchIcon}>
                                                    <FontAwesomeIcon icon={faEllipsisV} width={20} height={20} color={'#FFD774'}/>
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
                                            <FontAwesomeIcon icon={faEllipsisV} width={20} height={20} color={'#FFD774'}/>
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
                                                <FontAwesomeIcon icon={faEllipsisV} width={20} height={20} color={'#FFD774'}/>
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
                                        contentContainerStyle={{ paddingBottom: 300 }}
                                        data={data}
                                        extraData={refresh}
                                        renderItem={renderItem}
                
                                        keyExtractor={item => item.id}
                                    />
                                </Layout>
                            
                                </Layout>        
                            }
            
        
                           
                        



                    </Layout>        
                    
                )}
               
                
                
        />

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
              <TouchableOpacity onPress={() => {PressFeed()}}>
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
        padding: 5
    },
    bubbleSelectedTab: {
        borderRadius: 30,
        backgroundColor: '#FFC043',
        padding: 5
    },
    bubbleSelectedText: {
        fontSize: 13,
        color: 'white',
        marginVertical: 5,
        marginHorizontal: 15,
        fontWeight: 'bold'
    },
    bubbleText: {
        fontSize: 13,
        color: '#C9C9C9',
        marginVertical: 5,
        marginHorizontal: 15,
        fontWeight: 'bold'
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
        padding: 5
    },
});