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
import { AttractionPhotoScreenProps } from '../../../navigation/attraction.navigator';
import {
    faAngleLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigatorRoute, SceneRoute } from '../../../navigation/app.route';
import axios from 'axios'; 
import { SERVER } from '../../../server.component';
import { TourBookBottomBar } from '../../../component/tourBook.bottombar.components'


export const AttractionPhotoScreen = (props: AttractionPhotoScreenProps): LayoutElement => {

    const info = props.route.params;
    const [Attraction, setAttraction] = React.useState([]);

    React.useEffect(() => {
            axios.get(SERVER + '/api/attraction/photo-spot/' + info.code.code + '/tour/' + info.code.tour_id)      
            .then((response) => {
                setAttraction(response.data)
            })
    }, [])


    const PressBack = () => {
        props.navigation.navigate(SceneRoute.FEED_TOURBOOK);
    }



    const PressInfo = () => {
        props.navigation.navigate(SceneRoute.ATTRACTION_INFO, info);
    }

    const PressIntro = () => {
        props.navigation.navigate(SceneRoute.ATTRACTION_INTRO, info);
    }



    const InsideRenderItem = ({item}) => {
        return(
        <Layout style={{width: (Dimensions.get('window').width), height: (Dimensions.get('window').height * 0.5), alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{width: (Dimensions.get('window').width * 0.9), height: (Dimensions.get('window').height * 0.5), resizeMode: 'stretch'}} source={{uri: item.url}}/>       
        </Layout>
        );
    }

    const renderItem = ({item}) => {       

        return(
            <Layout style={{width: (Dimensions.get('window').width), paddingVertical: 20}}>
                <FlatList
                    style={{marginVertical: 15}}
                    data={item.image}
                    horizontal={true}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    renderItem={InsideRenderItem}
                />
                <Layout style={{flexDirection: 'row', paddingHorizontal: 15}}>
                    <Layout>
                        <Text style={{fontSize: 14, marginVertical: 5}}>📌</Text>
                    </Layout>
                    <Layout>
                        <Text style={{fontSize: 14, marginLeft: 2}}>{item.location}</Text>
                    </Layout>
                </Layout>
                <Layout style={{flexDirection: 'row', paddingHorizontal: 15}}>
                    <Layout>
                        <Text style={{fontSize: 14 }} numberOfLines={1}>✔️</Text>
                    </Layout>
                    <Layout>
                        <Text style={{fontSize: 14, marginLeft: 2}}>{item.description}</Text>
                    </Layout>
                </Layout>         
            </Layout>
        );
    }
   
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
                    <TouchableOpacity onPress={PressIntro}>
                        <Text style={styles.Title}>Introduction</Text>
                    </TouchableOpacity>
                </Layout>
                <Layout style={styles.tabbarContainer}>
                    <TouchableOpacity>
                        <Text style={styles.selectTitle}>Insta worthy</Text>
                    </TouchableOpacity>
                </Layout>
            </Layout>

            {/* 내용물*/}
            <Layout style={{flex: 9, backgroundColor: 'white'}}>  
                <Text style={{fontSize: 16, fontWeight: 'bold', marginVertical: 10, marginLeft: 20}}>Photo Spot Recommendations</Text>
                <Text style={{fontSize: 14, marginBottom: 10, marginLeft: 20}}>Take your best photo refer to our recommendation!</Text>                    
                <FlatList
                    style={{backgroundColor: 'white'}}
                    contentContainerStyle={{paddingBottom: 200}}
                    data={Attraction}
                    renderItem={renderItem}
                />
            </Layout>

            

            <TourBookBottomBar>
                {info.code.tour_id}
            </TourBookBottomBar>   

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