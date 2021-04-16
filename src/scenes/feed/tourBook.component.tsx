import React from 'react';
import { SERVER } from '../../server.component';
import axios from 'axios'
import {
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Text,
} from 'react-native';
import {
    IndexPath,
  Layout,
  LayoutElement,
  MenuItem, 
  OverflowMenu
} from '@ui-kitten/components';
import { TourBookScreenProps } from '../../navigation/feed.navigator';
import { TourBookBottomBar } from '../../component/tourBook.bottombar.components'
import {
    faEllipsisH,
    faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route';
import Drawer from 'react-native-draggable-view';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import Feed from '../../assets/icon/feed.svg';
import Guide from '../../assets/icon/guide.svg';
import MyPage from '../../assets/icon/MyPage.svg';
import BAR from '../../assets/icon/bar.svg';

const overflowData = [
    { title: 'Locations' },
    { title: 'Travel Styles' },
];


export const TourBookScreen = (props: TourBookScreenProps): LayoutElement => {
  const tour = props.route.params;
  const [title, setTitle] = React.useState({});
  const [overflowVisible, setOverflowVislbe] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  
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

  const statusBarHeight = (Platform.OS === 'ios')? getStatusBarHeight() : getStatusBarHeight(true);

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



  //Flat List 렌더링 (레스토랑/카페/어트랙션)
  const renderItem = ({item}) => (
        <TouchableOpacity onPress={PressList(item)}>
          <Layout style={{flexDirection: 'column', padding: 10}}>
             <Layout style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{width: (Dimensions.get('window').width * 0.9), height: (Dimensions.get('window').height * 0.2), resizeMode: 'stretch', borderRadius: 5}}source={{uri: item.banner}}/>
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
            <Image style={{width: 340, height: 140}} source={{uri: item.banner}}/>
        </Layout>
    </TouchableOpacity>        
  );

  //오버플로우 메뉴 토글 버튼
  const OverflowRenderToggle = () => (
    <TouchableOpacity style={{justifyContent: 'center', alignItems: 'flex-end', marginHorizontal: 5}} onPress={() => setOverflowVislbe(!overflowVisible)}>
        {(overflowVisible)?
            <Layout style={styles.touchIcon}>
                <FontAwesomeIcon icon={faEllipsisV} width={20} height={20} color={'#FFD774'}/>
            </Layout>  
            :
            <Layout style={styles.touchIcon}>
                <FontAwesomeIcon icon={faEllipsisH} width={20} height={20} color={'#FFD774'}/>
            </Layout>
        }                                  
    </TouchableOpacity>
  )

  const onItemSelect = (index) => {
    setSelectedIndex(index);
    setOverflowVislbe(false);
  };
  
  return (
    <React.Fragment>
            <Drawer
                initialDrawerSize={0.8}
                autoDrawerUp={0} // 1 to auto up, 0 to auto down
                isInverseDirection={true}
                finalDrawerHeight={statusBarHeight}
                style={{backgroundColor: 'white'}}
                
                renderContainerView={() => (
                    
                    <Layout style={{position: 'relative',width: '100%', height: '100%', backgroundColor: 'white'}}>
                        
                        <Layout style={{position : 'relative', width: '100%', height: (Dimensions.get('window').height* 0.6), top: 0, backgroundColor: 'white'}}>
                            <Image style={{width: (Dimensions.get('window').width), height: (Dimensions.get('window').height* 0.6), resizeMode: 'stretch', borderBottomLeftRadius: 15, borderBottomRightRadius: 15}} source={{uri: title.thumbnail}}/>
                        </Layout>

                        <Layout style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', width: '100%', height: (Dimensions.get('window').height* 0.6), backgroundColor: '#00FF0000'}}>
                            
                            <Layout style={{flex: 1, backgroundColor: '#00FF0000', paddingHorizontal: 10, paddingTop: 10, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 20, color: 'white', textAlign: 'center', fontFamily: 'BrandonGrotesque-Black'}}>{title.title}</Text>
                            </Layout>

                            <Layout style={{flex: 2, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#00FF0000', justifyContent: 'center', marginVertical: 20,}}>
                                <Text style={{fontWeight: "700", fontSize: 16, color: 'white', textAlign: 'center', paddingHorizontal: 5}}>{title.description}</Text>
                            </Layout> 

                            <Layout style={{flex: 1, backgroundColor: '#00FF0000', flexWrap: 'wrap', padding: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                                {(tag.map((item, idx) =>                                  
                                        <Text style={{fontWeight: "700", fontSize: 16, color: '#FFD774', textAlign: 'center', marginTop: 0}}>
                                            {`#`}<Text style={{fontWeight: "700", fontSize: 16, color: 'white', textAlign: 'center', marginTop: 20}}>{item}</Text> <Text> </Text>
                                        </Text>                                                               
                                ))}
                            </Layout>
                           
                        </Layout>           
                    </Layout>
                )}
                
                renderInitDrawerView={() => (
                    <Layout style={styles.dragBar}>    
                        <BAR width={25} height={15}/>
                    </Layout>
                )}

                renderDrawerView={() => (
                    <Layout style={styles.drawBar}>
                                  
                        {(selectedIndex.row === 1)? 
                            
                            <Layout style={styles.topRaiusContainer2}>        
                                <Layout style={{flex: 1, padding: 10, paddingBottom: 0, flexDirection: 'row', borderTopStartRadius: 25, borderTopEndRadius: 25,}}>
                                
                                    <OverflowMenu
                                        anchor={OverflowRenderToggle}
                                        backdropStyle={styles.backdrop}
                                        visible={overflowVisible}
                                        placement={'bottom end'}
                                        selectedIndex={selectedIndex}
                                        onSelect={onItemSelect}                                    
                                        onBackdropPress={() => setOverflowVislbe(false)}>
                                        <MenuItem title='Locations'/>
                                        <MenuItem title='Travel Styles'/>
                                    </OverflowMenu>

                                    <TouchableOpacity onPress={() => {PressMap()}} style={{flex: 8, justifyContent: 'center', marginHorizontal: 5}}>
                                        <Layout style={{borderRadius: 10, backgroundColor:'#FCCA67', alignItems: 'center', justifyContent: 'center'}}>
                                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16, marginVertical: 15}}>Look up Full Map</Text>
                                        </Layout>
                                    </TouchableOpacity>
                                               
                                </Layout>

                                <Layout style={{flex: 9, padding: 10, backgroundColor: 'white'}}>
                                    <FlatList
                                        data={courseData}
                                        renderItem={renderCourseItem}
                                        keyExtractor={item => item.id}
                                        contentContainerStyle={{ paddingBottom: 500 }}
                                    />
                                </Layout>

                            </Layout>          

                            :

                            /* 기본 투어 내용  어트랙션 - 레스토랑 - 카페*/

                            <Layout style={styles.topRaiusContainer2}>

                                <Layout style={{flex: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: 'white', marginTop: 10, borderTopStartRadius: 15 ,borderTopEndRadius: 15}}>
            
                                    
                                    {((attraction)? 
                                    /*Bubble Tab bar attraction Selected*/
                                    <Layout style={{flexDirection: 'row'}}>
                                        
                                        <OverflowMenu
                                            anchor={OverflowRenderToggle}
                                            backdropStyle={styles.backdrop}
                                            visible={overflowVisible}
                                            placement={'bottom end'}
                                            selectedIndex={selectedIndex}
                                            onSelect={onItemSelect}                                    
                                            onBackdropPress={() => setOverflowVislbe(false)}>
                                            <MenuItem title='Locations'/>
                                            <MenuItem title='Travel Styles'/>
                                        </OverflowMenu>
                                        
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

                                    null  // 어트랙션을 고르지 않았을 때 공백

                                    )}

                                    {((restaurant)? 
                                    /*Bubble Tab bar restaurant Selected*/
                                    <Layout style={{flexDirection: 'row', padding: 20}}>
                                        
                                        <OverflowMenu
                                            anchor={OverflowRenderToggle}
                                            backdropStyle={styles.backdrop}
                                            visible={overflowVisible}
                                            placement={'bottom end'}
                                            selectedIndex={selectedIndex}
                                            onSelect={onItemSelect}                                    
                                            onBackdropPress={() => setOverflowVislbe(false)}>
                                            <MenuItem title='Locations'/>
                                            <MenuItem title='Travel Styles'/>
                                        </OverflowMenu>
                                                  
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

                                    null // 레스토랑을 고르지 않았을 때 공백
                                    
                                    )}

                                    {((cafe)? 
                                        /*Bubble Tab bar cafe Selected*/
                                        <Layout style={{flexDirection: 'row', padding: 20}}> 
                                            <OverflowMenu
                                                anchor={OverflowRenderToggle}
                                                backdropStyle={styles.backdrop}
                                                visible={overflowVisible}
                                                placement={'bottom end'}
                                                selectedIndex={selectedIndex}
                                                onSelect={onItemSelect}                                    
                                                onBackdropPress={() => setOverflowVislbe(false)}>
                                                <MenuItem title='Locations'/>
                                                <MenuItem title='Travel Styles'/>
                                            </OverflowMenu>

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

                                        null //카페를 고르지 않았을 때 공백

                                        )}
                                </Layout>

                                <Layout style={{flex: 9}}>
                                    <FlatList
                                        style={{backgroundColor: 'white'}}
                                        contentContainerStyle={{ paddingBottom: 500 }}
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
        <TourBookBottomBar>
            {tour}
        </TourBookBottomBar>

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
        
    },
    bubbleSelectedTab: {
        borderRadius: 30,
        backgroundColor: '#FFC043',        
    },
    bubbleSelectedText: {
        fontSize: 13,
        color: 'white',
        marginVertical: 8,
        marginHorizontal: 20,
        fontWeight: 'bold'
    },
    bubbleText: {
        fontSize: 13,
        color: '#C9C9C9',
        marginVertical: 8,
        marginHorizontal: 20,
        fontWeight: 'bold'
    },
    touchContainer: {
        marginHorizontal: 10
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
    topRadiusContainer1:{
        flex: 85,
        borderTopEndRadius: 15
    },
    topRaiusContainer2:{
        flex: 85, 
        borderTopStartRadius: 15, 
        borderTopEndRadius: 15,
        

        
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dragBar: {
        width: '100%', 
        height: 20, 
        position: 'absolute', 
        backgroundColor: '#00FF0000', 
        zIndex: 20, 
        justifyContent: 'center', 
        alignItems:'center',
    },
    drawBar : {
        height: (Dimensions.get('window').height),
        backgroundColor: '#00FF0000',
        flexDirection: 'row',
    }

    
});