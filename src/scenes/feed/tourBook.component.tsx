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
  ScrollView,
} from 'react-native';
import {
  Layout,
  LayoutElement,
} from '@ui-kitten/components';
import { TourBookScreenProps } from '../../navigation/feed.navigator';
import { TourBookBottomBar } from '../../component/tourBook.bottombar.components'
import {
    faAngleLeft,
    faEllipsisH,
    faEllipsisV,
    faMap,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route';
import Drawer from 'react-native-draggable-view';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import BAR from '../../assets/icon/bar.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/core';

export const TourBookScreen = (props: TourBookScreenProps): LayoutElement => {
  
  const tour = props.route.params.params.tourCode;  
  const [title, setTitle] = React.useState({
      title: '',
      description: '',
  });
  const [overflowVisible, setOverflowVislbe] = React.useState(false);  
  const [tag, setTag] = React.useState([]);
  const [DATA, setDATA] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [category, setCategory] = React.useState('Attraction');
  const [courseData, setCourseData] = React.useState([]);
  const isFocused = useIsFocused();
  const statusBarHeight = (Platform.OS === 'ios')? getStatusBarHeight() : getStatusBarHeight(true);


  async function getHeight() {        
    await axios.get(SERVER + '/api/user/tour/place/tour-id/' + tour)
    .then((response) => {
        setDATA(response.data);
        setTitle(response.data[0]);
        setData(response.data.filter(item => {return item.type == 'Attraction'}));


        var tag = response.data[0].tags.toString().replace(/#/g,'');
        tag = tag.split(',')
        setTag(tag);           
        
    })

    
    await axios.get(SERVER + '/api/user/tour/' + tour + '/course')
        .then((response) => {
            setCourseData(response.data)
        })                
}



  React.useEffect(() => {   
    
    getHeight();

  }, []);

  React.useEffect(() => {

    getHeight();

  }, [isFocused])

  



  React.useEffect(() => {
    if (category === 'Attraction'){
        setData(DATA.filter(item => {return item.type == 'Attraction'}));
    }
    else if (category === 'Restaurant'){
        setData(DATA.filter(item => {return item.type == 'Restaurant'}));
    }
    else if (category === 'Cafe'){
        setData(DATA.filter(item => {return item.type == 'Cafe'}));
    }

  }, [category]);





  const PressList = (item : any) => () => {

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

  const PressCourse = (item : any) => () => {

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
  const renderItem = ({item} : any) => (
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
  const renderCourseItem = ({item} : any) => (
    <TouchableOpacity onPress={PressCourse(item)}>
        <Layout style={{marginVertical: 5, alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{width: (Dimensions.get('window').width * 0.9), height: (Dimensions.get('window').height * 0.2), resizeMode: 'stretch',}} source={{uri: item.banner}}/>
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

                        <TouchableOpacity style={{ position: 'absolute', top: 10, left: 10, justifyContent: 'center', alignItems: 'center'}} onPress={() => props.navigation.goBack()}>
                            <SafeAreaView style={{flex: 0, backgroundColor: '#00FF0000'}} />
                            <FontAwesomeIcon icon={faAngleLeft} size={32} color={'white'}/>
                        </TouchableOpacity>      
                    </Layout>
                )}
                
                renderInitDrawerView={() => (
                    <Layout style={styles.dragBar}>    
                        <BAR width={25} height={15}/>
                    </Layout>
                )}

                renderDrawerView={() => (
                    <Layout style={styles.drawBar}>

                        <Layout style={styles.topRaiusContainer2}>

                            <Layout style={{flex: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: 'white', marginTop: 10, borderTopStartRadius: 15 ,borderTopEndRadius: 15}}>
                            
                                <Layout style={{flexDirection: 'row', padding: 10 }}>

                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    
                                    <TouchableOpacity style={styles.touchContainer} onPress={() => PressMap()}>
                                        <Layout style={{backgroundColor: '#00FF0000', justifyContent: 'center', alignItems: 'center', padding: 10,borderRadius: 20, borderWidth: 1, borderColor: '#FFD774', height: 32}}>
                                            <FontAwesomeIcon icon={faMap} size={15} color={'#FFD774'} />
                                        </Layout>
                                    </TouchableOpacity>

                                    
                                    <TouchableOpacity style={styles.touchContainer} onPress={() => setCategory('Course')}>
                                        <Layout style={(category === 'Course')? styles.bubbleSelectedTab : styles.bubbleTab}>
                                            <Text style={(category === 'Course')? styles.bubbleSelectedText : styles.bubbleText}>Course</Text>
                                        </Layout>
                                    </TouchableOpacity>
                                                
                                    <TouchableOpacity style={styles.touchContainer} onPress={() => setCategory('Attraction')}>
                                        <Layout style={(category === 'Attraction')? styles.bubbleSelectedTab : styles.bubbleTab}>
                                            <Text style={(category === 'Attraction')? styles.bubbleSelectedText : styles.bubbleText}>Attraction</Text>
                                        </Layout>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.touchContainer} onPress={() => setCategory('Restaurant')}>
                                        <Layout style={(category === 'Restaurant')? styles.bubbleSelectedTab : styles.bubbleTab}>
                                            <Text style={(category === 'Restaurant')? styles.bubbleSelectedText : styles.bubbleText}>Restaurant</Text>
                                        </Layout>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.touchContainer} onPress={() => setCategory('Cafe')}>
                                        <Layout style={(category === 'Cafe')? styles.bubbleSelectedTab : styles.bubbleTab}>
                                            <Text style={(category === 'Cafe')? styles.bubbleSelectedText : styles.bubbleText}>Cafe</Text>
                                        </Layout>
                                    </TouchableOpacity>       

                                    </ScrollView>   
                                </Layout>

                            </Layout>

                            
                                {(category === 'Course')? 
                                    <Layout style={{flex: 9}}>
                                        <FlatList
                                            data={courseData}
                                            renderItem={renderCourseItem}
                                            keyExtractor={item => item.id}
                                            contentContainerStyle={{ paddingBottom: 500 }}
                                        />
                                    </Layout>
                                : 
                                    <Layout style={{flex: 9}}>                                        
                                        <FlatList
                                            style={{backgroundColor: 'white'}}
                                            contentContainerStyle={{ paddingBottom: 500 }}
                                            data={data}
                                            renderItem={renderItem}
                                            keyExtractor={item => item.id}
                                        />
                                    </Layout>                                
                                }

                    
                        </Layout>        

                    </Layout> 
                )}   
            />

       
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
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        height: 32,
    },
    bubbleSelectedTab: {
        borderRadius: 20,
        backgroundColor: '#FFC043',
        height: 32,
    },
    bubbleSelectedText: {
        fontSize: 12,
        color: 'white',
        marginVertical: 8,
        marginHorizontal: 15,
        fontWeight: 'bold'
    },
    bubbleText: {
        fontSize: 12,
        color: '#C9C9C9',
        marginVertical: 8,
        marginHorizontal: 15,
        fontWeight: 'bold'
    },
    touchContainer: {
        marginHorizontal: 8
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