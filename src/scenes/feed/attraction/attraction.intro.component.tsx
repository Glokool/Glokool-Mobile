import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions
} from 'react-native';
import {
  Layout,
  LayoutElement,
} from '@ui-kitten/components';
import { AttractionIntroScreenProps } from '../../../navigation/attraction.navigator';
import {
    faLongArrowAltLeft,
    faArrowRight,
    faArrowLeft,
    faGripLines,
    faAngleLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigatorRoute, SceneRoute } from '../../../navigation/app.route';
import axios from 'axios';
import { SERVER } from '../../../server.component';
import Drawer from 'react-native-draggable-view';

import Feed from '../../../assets/icon/feed.svg';
import Guide from '../../../assets/icon/guide.svg';
import MyPage from '../../../assets/icon/MyPage.svg';



export const AttractionIntroScreen = (props: AttractionIntroScreenProps): LayoutElement => {
  const info = props.route.params;
  const [desc, setDesc] = React.useState('');
  const [Attraction, setAttraction] = React.useState([]);


  React.useEffect(() => {
        axios.get(SERVER + '/api/attraction/'+ info.code.code +'/intro/tour/' + info.code.tour_id)
            .then((response) =>{
                setAttraction(response.data.image);
                setDesc(response.data.description);
            })

  }, [])

    const PressBook = () => {
        props.navigation.navigate(NavigatorRoute.BOOK, {
            screen: SceneRoute.BOOK_DATE,
            params: {
                tourCode: info.code.tour_id
            }
        });
    }
  
    const PressBack = () => {
        props.navigation.navigate(SceneRoute.FEED_TOURBOOK);
    }

    const PressInfo = () => {
        props.navigation.navigate(SceneRoute.ATTRACTION_INFO, info);
    }

    const PressPhoto = () => {
        props.navigation.navigate(SceneRoute.ATTRACTION_PHOTO, info);
    }

    const PressFeed = () => {
        props.navigation.navigate(NavigatorRoute.FEED);
    }

    const PressSetting = () => {
        props.navigation.navigate(NavigatorRoute.MY_PAGE)
    }

    const PressGuide = () => {
        props.navigation.navigate(NavigatorRoute.GUIDE);
    }

    const renderItem = ({item}) => (
        <Layout style={{width: Dimensions.get('window').width, height: (Dimensions.get('window').height * 0.8)}}>
            <Layout style={{ width: Dimensions.get('window').width, height: (Dimensions.get('window').height * 0.6)}}>
                <Image style={{width: (Dimensions.get('window').width), height: (Dimensions.get('window').height * 0.6), resizeMode: 'stretch'}} source={{uri: item}}/>
                <FontAwesomeIcon icon={faArrowLeft} style={{position: 'absolute', top: '50%', left: '2%', color: 'white'}} size={16}/>
                <FontAwesomeIcon icon={faArrowRight}  style={{position: 'absolute', top: '50%', right: '2%', color: 'white'}} size={16}/>          
            </Layout>
        </Layout>        
    )
   
  return (
    <React.Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
        {/*탑 탭바 */}
        <Layout style={styles.tabbar}>
            <Layout style={styles.tabbarContainer}>
                <TouchableOpacity onPress={PressBack}>
                    <FontAwesomeIcon icon={faAngleLeft} style={{color: 'black'}} size={28}/>
                </TouchableOpacity>
            </Layout>
            <Layout style={styles.tabbarContainer}>
                <TouchableOpacity onPress={PressInfo}>
                    <Text style={styles.Title}>Information</Text>
                </TouchableOpacity>
            </Layout>
            <Layout style={styles.tabbarContainer}>
                <TouchableOpacity>
                    <Text style={styles.selectTitle}>Introduction</Text>
                </TouchableOpacity>
            </Layout>
            <Layout style={styles.tabbarContainer}>
                <TouchableOpacity onPress={PressPhoto}>
                    <Text style={styles.Title}>Insta worthy</Text>
                </TouchableOpacity>
            </Layout>
        </Layout>

        {/* 내용물*/}
        <Layout style={{flex: 9, backgroundColor: 'white'}}>

            <Drawer
                initialDrawerSize={0.4}
                autoDrawerUp={1} // 1 to auto up, 0 to auto down
                isInverseDirection={true}
                finalDrawerHeight={300}
                
                renderInitDrawerView={() => (  
                   <Layout style={{width: '100%', height: 20, padding: 10, position: 'absolute', backgroundColor: '#00FF0000', zIndex: 20, justifyContent: 'center', alignItems:'center'}}>
                       <FontAwesomeIcon icon={faGripLines} size={20} color={'gray'}/>
                    </Layout>
                )}

                renderDrawerView={() => (                    
                    <Layout>
                        <Text style={{fontSize: 14, margin: 20}}>{desc}</Text>
                    </Layout>
                )}

                renderContainerView={() => (
                    <FlatList
                        style={{backgroundColor: 'white'}}
                        horizontal={true}
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 78 }}
                        data={Attraction}
                        renderItem={renderItem}
                    />
                )}
            />          

            <Layout style={{height: 78}}/>
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
    canvas: {
        flex: 1,
        marginVertical: 10,
    },
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
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
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
    tagContainer: {
        marginHorizontal: 15,
        marginVertical: 20,
        padding: 5,
        alignItems: 'center'
    },
    tag: {
        borderColor: 'gray',
        borderWidth: 0.5,
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 10,
        alignItems: 'center'
    },
      tagText: {
        marginHorizontal: 10,
        marginVertical: 5,
        fontSize: 12
    },
    desc: {
        fontSize: 14,
        textAlign: 'center'
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
});