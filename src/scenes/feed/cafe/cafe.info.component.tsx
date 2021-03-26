import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Dimensions
} from 'react-native';
import {
  Divider,
  Layout,
  LayoutElement,
} from '@ui-kitten/components';
import { CafeInfoScreenProps } from '../../../navigation/cafe.navigator';
import {
    faHeart,
    faLongArrowAltLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SceneRoute, NavigatorRoute } from '../../../navigation/app.route';
import Tags from "react-native-tags";
import axios from 'axios';
import { SERVER } from '../../../server.component';

import Feed from '../../../assets/icon/feed.svg';
import Guide from '../../../assets/icon/guide.svg';
import MyPage from '../../../assets/icon/MyPage.svg';


export const CafeInfoScreen = (props: CafeInfoScreenProps): LayoutElement => {
  const user = auth().currentUser;
  const info = props.route.params;
  const [cafe, setCafe] = React.useState({});
  const [iconSelected, setIconSelected] = React.useState(true);

  React.useEffect(() => {
    axios.get(SERVER + '/api/cafe/info/' + info.code.code + '/tour/' + info.code.tour_id)
        .then((response) => {
            setCafe(response.data)
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
    props.navigation.navigate(SceneRoute.FEED_TOURBOOK);
  }

  const PressIcon = () => {
      if(iconSelected == true){
        props.navigation.navigate(SceneRoute.MY_TOUR_CHAT);
      }
      else{
        setIconSelected(!iconSelected);
      }      
  }

  const PressIntro = () => {
    props.navigation.navigate(SceneRoute.CAFE_INTRO, info);
  }

  const PressPhoto = () => {
    props.navigation.navigate(SceneRoute.CAFE_MENU, info);
  }

  const PressFeed = () => {
    props.navigation.navigate(NavigatorRoute.FEED)
  }

    const PressSetting = () => {
    props.navigation.navigate(NavigatorRoute.MY_PAGE)
  }

  const renderItem = ({item}) => (
    <Layout style={{flex: 1, flexDirection: 'column', margin: 10}}>
        <Image style={{width: 110, height: 110, marginBottom: 5}} source={{uri : item.image}}/>
        <Text style={{fontSize: 16, marginBottom: 5, textAlign:'left'}}>{item.name}</Text>
        <Text style={{fontSize: 12}}>{item.cost}</Text>
    </Layout>
  );

   
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
                    <Text style={styles.Title}>Menu</Text>
                </TouchableOpacity>
            </Layout>
        </Layout>

        {/* 내용물*/}
        <Layout style={{flex: 9, backgroundColor: 'white'}}>
            <ScrollView>
                <Layout style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Image style={{width: (Dimensions.get('window').width), height: (Dimensions.get('window').height * 0.6), resizeMode: 'stretch'}} source={{uri : cafe.thumbnail}}/>
                    <Layout style={styles.textContainer}>
                        <Text style={styles.MainTitle}>{cafe.name}</Text>
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
                    initialTags={cafe.tags}
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
                    <Text style={styles.desc}>{cafe.description}</Text>
                </Layout>

                <Layout style={{padding: 10, marginVertical: 20}}>
                    <Divider style={{backgroundColor: 'gray'}}/>
                </Layout>

                {/*운영 시간 뷰*/}
                <Layout style={{padding: 20}}>
                    <Text style={{fontSize: 12, color: 'gray', fontWeight: 'bold'}}>Time</Text>
                    <Text style={{fontSize: 16}}>{cafe.time}</Text>
                </Layout>

                {/*Location View*/}
                <Layout style={{padding: 20, overflow: 'hidden'}}>
                    <Text style={{fontSize: 12, color: 'gray', fontWeight: 'bold'}}>Location</Text>
                    <Text style={{fontSize: 16}}>{cafe.location}</Text>
                    <Image style={{width: (Dimensions.get('window').width * 0.9), height: (Dimensions.get('window').height * 0.2), resizeMode: 'stretch'}}  source={{uri: cafe.mapImage}}/>                                                     
                </Layout>

                {/*컨택트 뷰*/}
                <Layout style={{padding: 20}}>
                    <Text style={{fontSize: 12, color: 'gray', fontWeight: 'bold'}}>Contact</Text>
                    <Text style={{fontSize: 16}}>{cafe.contact}</Text>
                    <Text style={{fontSize: 16}}>{cafe.snsContact}</Text>
                </Layout>

                {/*노트뷰*/}
                <Layout style={{padding: 20}}>
                    <Text style={{fontSize: 12, color: 'gray', fontWeight: 'bold'}}>Note</Text>
                    <Text style={{fontSize: 16}}>{cafe.note}</Text>
                </Layout>

                {/*시그니처 메뉴 뷰*/}
                <Layout>
                    <FlatList
                        style={{backgroundColor: '##F5F5F5'}}
                        data={cafe.signature_menu}
                        renderItem={renderItem}
                        numColumns={3}
                    />            
                </Layout>

                {/*마지막 바텀바 위로 올리기 위한 것*/}
                <Layout style={{height: 70, backgroundColor: 'white'}}/>
            </ScrollView>            
        </Layout>

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
              <TouchableOpacity onPress={() => {PressFeed}}>
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