import React from 'react';
import auth from '@react-native-firebase/auth';
import { PostDetailScreenProps } from '../../navigation/board.navigator'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  BackHandler,
  Dimensions,
  Linking
} from 'react-native';
import {
  Layout,
  LayoutElement,
} from '@ui-kitten/components';
import { faAngleLeft, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

var ToastRef : any;

export const PostDetailScreen = (props: PostDetailScreenProps): LayoutElement => {
    
    const content = props.route.params.item;
    const type = props.route.params.type;

    const day = content.item.title;

    console.log(day);


    React.useEffect(() => {
        
    }, [])


    const PressBack = () => {
      props.navigation.goBack()
    }

    const PressReport = () => {

    }



    return(
       <React.Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
         {/* top Tab bar*/}
        <Layout style={styles.TopTabBar}>
          
          <TouchableOpacity style={styles.leftIcon}>
            <FontAwesomeIcon icon={faAngleLeft} size={32}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rightIcon}>
            <FontAwesomeIcon icon={faExclamationTriangle} size={30}/>
          </TouchableOpacity>
        </Layout>

        {/* 메인 컨텐츠 컨테이너 */}

        <Layout style={styles.mainContainer}>
          
          <Layout style={{flex: 1}}/>
          
          <Layout style={styles.profileContainer}>
            <Image style={styles.profileImage} source={require('../../assets/profile/profile_01.png')}/>

            <Layout>

              <Text>{content.item.writer}</Text>
              <Text></Text>
            </Layout>
          </Layout>


        </Layout>

 




       </React.Fragment>
    );
}

const styles = StyleSheet.create({
  TopTabBar: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 10,
    backgroundColor: 'white'
  },
  leftIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  rightIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  mainContainer: {
    flex: 9,
    zIndex:9,
    backgroundColor: 'white'
  },
  profileContainer: {
    flexDirection: 'row',
    flex: 1,
    padding: 30
  },
  profileImage: {
    width: 42,
    height: 42,
    resizeMode: 'stretch'
  }
})
