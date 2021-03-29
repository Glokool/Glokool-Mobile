import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';
import {
  Divider,
  Layout,
  LayoutElement,
} from '@ui-kitten/components';
import { AttractionInfoScreenProps } from '../../../navigation/attraction.navigator';
import {
    faHeart,
    faLongArrowAltLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SceneRoute, NavigatorRoute } from '../../../navigation/app.route';
import Tags from "react-native-tags";
import { SERVER } from '../../../server.component';
import axios from 'axios'

import Feed from '../../../assets/icon/feed.svg';
import Guide from '../../../assets/icon/guide.svg';
import MyPage from '../../../assets/icon/MyPage.svg';

export const AttractionInfoScreen = (props: AttractionInfoScreenProps): LayoutElement => {
  const [Attraction, setAttraction] = React.useState({});
  const info = props.route.params;
  const [iconSelected, setIconSelected] = React.useState(true);


  React.useEffect(() => {

    axios.get(SERVER + '/api/attraction/info/' + info.code.code + '/tour/' + info.code.tour_id)
        .then((response) => {
            setAttraction(response.data)
        })

  }, []);

  const PressBook = () => {
    props.navigation.navigate(NavigatorRoute.BOOK, {
        screen: SceneRoute.BOOK_DATE,
        params: {
            tourCode: info.code.tour_id
        }
    });
    }
    
  const PressBack = () => {
    props.navigation.goBack();
  }

  const PressIntro = () => {
    props.navigation.navigate(SceneRoute.ATTRACTION_INTRO, info);
  }

  const PressPhoto = () => {
    props.navigation.navigate(SceneRoute.ATTRACTION_PHOTO, info);
  }

  const PressFeed = () => {
    props.navigation.navigate(NavigatorRoute.FEED);
  }

  const PressGuide = () => {
    props.navigation.navigate(NavigatorRoute.GUIDE);
  }

  const PressSetting = () => {
    props.navigation.navigate(NavigatorRoute.MY_PAGE)
  }

   
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
            <Layout style={styles.tabbarContainer}>
                <TouchableOpacity>
                    <Text style={styles.selectTitle}>Information</Text>
                </TouchableOpacity>
            </Layout>
            <Layout style={styles.tabbarContainer}>
                <TouchableOpacity onPress={PressIntro}>
                    <Text style={styles.Title}>Introduction</Text>
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
            <ScrollView>
                <Layout style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Image style={{width: (Dimensions.get('window').width), height: (Dimensions.get('window').width), resizeMode: 'stretch', marginBottom: 10}} source={{uri: Attraction.thumbnail}}/>
                    <Layout style={styles.textContainer}>
                        <Text style={styles.MainTitle}>{Attraction.name}</Text>
                    </Layout>
                    <Layout style={styles.icon}>
                        <TouchableOpacity>
                            <FontAwesomeIcon icon={faHeart} style={{color: 'white', borderColor: 'white'}} size={24}/>
                        </TouchableOpacity>                        
                    </Layout>
                </Layout>

                 {/*태그가 표시되는 뷰*/}
                <Layout style={styles.tagContainer}>
                    <Tags                    
                    initialTags={Attraction.tags}
                    readonly={true}
                    renderTag={({ tag }) => (
                        <Layout style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>  
                        </Layout>                          
                    )}
                    />
                </Layout>

                {/*디스크립션 뷰*/}
                <Layout style={{padding: 10}}>
                    <Text style={styles.desc}>{Attraction.description}</Text>
                </Layout>

                <Layout style={{padding: 10, marginVertical: 20}}>
                    <Divider style={{backgroundColor: 'gray'}}/>
                </Layout>

                {/*Location View*/}
                <Layout style={{padding: 20}}>
                    <Text style={{fontSize: 12, color: 'gray', fontWeight: 'bold'}}>Location</Text>
                    <Text style={{fontSize: 16, marginBottom: 5}}>{Attraction.location}</Text>
                    <Image style={{width: (Dimensions.get('window').width * 0.9), height:(Dimensions.get('window').width * 0.3), resizeMode: 'stretch'}}  resizeMode='contain' source={{uri: Attraction.mapImage}}/>                                
                </Layout>

                <Layout style={{padding: 20}}>
                    <Text style={{fontSize: 12, color: 'gray', fontWeight: 'bold'}}>Entrance Fee</Text>
                    <Text style={{fontSize: 16}}>{Attraction.entranceFee}</Text>
                </Layout>

                <Layout style={{padding: 20}}>
                    <Text style={{fontSize: 12, color: 'gray', fontWeight: 'bold'}}>Note</Text>
                    <Text style={{fontSize: 16, textAlign:'left'}}>{Attraction.note}</Text>
                </Layout>

                {/*마지막 바텀바 위로 올리기 위한 것*/}
                <Layout style={{height: 70, backgroundColor: 'white'}}/>
            </ScrollView>            
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