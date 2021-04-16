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
    faAngleLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigatorRoute, SceneRoute } from '../../../navigation/app.route';
import axios from 'axios';
import { SERVER } from '../../../server.component';
import Drawer from 'react-native-draggable-view';
import { TourBookBottomBar } from '../../../component/tourBook.bottombar.components';

import Left from '../../../assets/icon/leftArrow.svg';
import Right from '../../../assets/icon/rightArrow.svg';
import BAR from '../../assets/icon/bar.svg';


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

    const PressBack = () => {
        props.navigation.navigate(SceneRoute.FEED_TOURBOOK);
    }

    const PressInfo = () => {
        props.navigation.navigate(SceneRoute.ATTRACTION_INFO, info);
    }

    const PressPhoto = () => {
        props.navigation.navigate(SceneRoute.ATTRACTION_PHOTO, info);
    }

    const renderItem = ({item}) => (
        <Layout style={{width: Dimensions.get('window').width, height: (Dimensions.get('window').height * 0.8)}}>
            <Layout style={{ width: Dimensions.get('window').width, height: (Dimensions.get('window').height * 0.6)}}>
                <Image style={{width: (Dimensions.get('window').width), height: (Dimensions.get('window').height * 0.6), resizeMode: 'stretch'}} source={{uri: item}}/>
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
                isInverseDirection={false}
                finalDrawerHeight={100}
                onDragDown={() => {
                    console.log('드래그 다운')
                }}
                onRelease={()=> {
                    console.log('릴리즈')
                }}
                
                
                renderInitDrawerView={() => (  
                   <Layout style={{width: '100%', height: 20, padding: 10, position: 'absolute', backgroundColor: '#00FF0000', zIndex: 20, justifyContent: 'center', alignItems:'center'}}>
                       <BAR width={25} height={15}/>
                    </Layout>
                )}

                renderDrawerView={() => (                    
                    <Layout style={{height: Dimensions.get('window').height}}>
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