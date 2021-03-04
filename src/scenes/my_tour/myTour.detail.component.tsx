import React from 'react';
import auth from '@react-native-firebase/auth'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Layout,
  LayoutElement,
} from '@ui-kitten/components';
import { MyTourDetailScreenProps } from '../../navigation/myTour.navigator';
import {
    faAngleLeft,
    faAngleRight,
    faBook,
    faCommentDots,
    faUser,
    faBars
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route';


export const MyTourDetailScreen = (props: MyTourDetailScreenProps): LayoutElement => {
  const user = auth().currentUser;
  const [iconSelected, setIconSelected] = React.useState(true);

  const date = new Date();
  const week = ['Sunday', 'Monday', 'Tuesday', 'Wendnesday', 'Thursday','Friday', 'Saturday']
  const day = week[date.getDay()];


  const TourName = 'Gyeongchun Line Forest Path ';
  const TourLocation = '272-2, Gongneung-dong, Nowon-gu';
  const Desc = 'From the rustic train station to the rising tourist spot, referred to as ‘Gongtral Park’, Lets explore everywhere in Gongneung-dong.'

  const PressBack = () => {
    props.navigation.goBack();
  }

  const PressIcon = () => {
      if(iconSelected == true){
        props.navigation.navigate(SceneRoute.MY_TOUR_CHAT);
      }
      else{
        setIconSelected(!iconSelected);
      }      
  }

  const PressRight = () => {
    props.navigation.navigate(SceneRoute.MY_TOUR_ALL_LOCATION);
  }

  const PressFeed = () => {
    props.navigation.navigate(NavigatorRoute.FEED)
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
                    <FontAwesomeIcon icon={faAngleLeft} style={{color: 'black'}} size={32}/>
                </TouchableOpacity>
            </Layout>
            <Layout style={styles.titleContainer}>
                <Text style={styles.title}>Title</Text>
            </Layout>
            <Layout style={styles.tabbarContainer}>
                <TouchableOpacity>
                    <Text style={styles.smallTitle}>LIKE</Text>
                </TouchableOpacity>
            </Layout>
        </Layout>

        {/* 내용물*/}
        <Layout style={{flex: 9, alignItems: 'center', justifyContent: 'flex-start'}}>
            <Layout style={{alignItems: 'center', marginVertical: 60}}>
                <Text style={styles.dateTitle}>Your tour is scheduled on</Text>
                <Text style={styles.dateTitle2}>{date.getFullYear()}.{date.getMonth()}.{date.getDate()}.{day}</Text>
            </Layout>

            <Layout style={{alignItems: 'center', marginVertical: 40}}>
                <Text style={styles.title1}>{TourName}</Text>
                <Text style={styles.title2}>📍 {TourLocation}</Text>
            </Layout>

            <Layout style={{alignItems: 'center', marginVertical: 40, padding: 30}}>
                <Text style={styles.title2}>{Desc}</Text>
            </Layout>

            <Layout style={{alignItems: 'center', marginVertical: 10, padding: 10}}>
                <TouchableOpacity  onPress={PressRight}>
                    <FontAwesomeIcon icon={faAngleRight} style={{color: 'gray'}} size={40}/>
                </TouchableOpacity>
            </Layout>

        </Layout>


        <Layout style={{position: 'absolute', bottom: 0, backgroundColor: '#00FF0000', padding: 20, flexDirection:'row'}}>
            <TouchableOpacity onPress={PressFeed}>
                <FontAwesomeIcon icon={faBars} style={{color: 'gray'}} size={20}/>
            </TouchableOpacity>

            <Layout style={{flex: 5, backgroundColor: '#00FF0000'}}/>

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
    tabbar: {
        flex: 1,
        flexDirection: 'row'
    },
    tabbarContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    titleContainer: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center'
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
        width: 130,
        height: 58,
        bottom: 0,
        margin : 20,
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
    }
});