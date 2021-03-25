import React from 'react';
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
import { CafeIntroScreenProps } from '../../../navigation/cafe.navigator';
import {
    faBook,
    faCommentDots,
    faLongArrowAltLeft,
    faBars,
    faUser,
    faArrowRight,
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigatorRoute, SceneRoute } from '../../../navigation/app.route';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER } from '../../../server.component';
import axios from 'axios';




export const CafeIntroScreen = (props: CafeIntroScreenProps): LayoutElement => {
  const user = auth().currentUser;
  const [iconSelected, setIconSelected] = React.useState(true);
  const info = props.route.params;
  const [cafe, setCafe] = React.useState([]);

  React.useEffect(() => {

    axios.get(SERVER + '/api/cafe/intro/' + info.code.code + '/tour/' + info.code.tour_id)
        .then((response) => {
            setCafe(response.data);
        });
  }, []);
  
  

    const PressBack = () => {
        props.navigation.navigate(SceneRoute.MY_TOUR_ALL_LOCATION);
    }

    const PressIcon = () => {
        if(iconSelected == true){
            props.navigation.navigate(SceneRoute.MY_TOUR_CHAT);
        }
        else{
            setIconSelected(!iconSelected);
        }      
    }

    const PressInfo = () => {
        props.navigation.navigate(SceneRoute.CAFE_INFO, info);
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
        <Layout style={{width: Dimensions.get('window').width, height: (Dimensions.get('window').height * 0.8)}}>
            <Layout style={{ width: Dimensions.get('window').width, height: (Dimensions.get('window').height * 0.6)}}>
                <Image style={{width: (Dimensions.get('window').width), height: (Dimensions.get('window').height * 0.6), resizeMode: 'stretch'}} source={{uri: item.image}}/>
                <FontAwesomeIcon icon={faArrowLeft} style={{position: 'absolute', top: '50%', left: '2%', color: 'white'}} size={16}/>
                <FontAwesomeIcon icon={faArrowRight}  style={{position: 'absolute', top: '50%', right: '2%', color: 'white'}} size={16}/>          
            </Layout>
            <Layout>
                <Text style={{fontSize: 14, margin: 20}}>{item.description}</Text>
            </Layout>
            <Layout style={{height: 78}}/>
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
                    <Text style={styles.Title}>Menu</Text>
                </TouchableOpacity>
            </Layout>
        </Layout>

        {/* 내용물*/}
        <Layout style={{flex: 9, backgroundColor: 'white'}}>
            <FlatList
                style={{backgroundColor: 'white'}}
                horizontal={true}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 78 }}
                data={cafe}
                renderItem={renderItem}
            />
        </Layout>

        <Layout style={{position: 'absolute', bottom: 0, backgroundColor: '#00FF0000', padding: 20, flexDirection:'row'}}>
            <TouchableOpacity onPress={PressFeed}>
                <FontAwesomeIcon icon={faBars} style={{color: 'gray'}} size={20}/>
            </TouchableOpacity>

            <Layout style={{flex: 5}}/>

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
    }
});