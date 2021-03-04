import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Dimensions,
  Linking
} from 'react-native';
import {
  Layout,
  LayoutElement,
  Modal,
  Card,
  Divider,
  Button,
} from '@ui-kitten/components';
import Clipboard from '@react-native-community/clipboard';
import { MyTourReportErrorScreenProps } from '../../../navigation/myTour.navigator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFlag, faAngleLeft, faComment } from '@fortawesome/free-solid-svg-icons';
import { SceneRoute } from '../../../navigation/app.route';
import Toast from 'react-native-easy-toast';
var toastRef;

export const MyTourReportErrorScreen = (props: MyTourReportErrorScreenProps): LayoutElement => {
    const [modal, setModal] = React.useState(false);
    const guide = props.route.params;

    const PressBack = () => {
      props.navigation.goBack();
    }

    const PressGuide = () => {
      props.navigation.navigate(SceneRoute.MY_TOUR_REPORT_GUIDE, guide);
    }

    const PressReport = () => {
      props.navigation.navigate(SceneRoute.MY_TOUR_REPORT);
    }

    const PressEmergency = () => {
      setModal(!modal);
    }

    const PressCopy = () => {
      Clipboard.setString('070-4300-0833');
      toastRef.show('Copied!', 2000);
    }

    const PressLink = () => {
      Linking.openURL('https://www.instagram.com/glokool_official/');
    }

    return(
        <React.Fragment>
          <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
          
          {/*탭바 디자인*/}
          <Layout style={styles.TabBar}>
              <TouchableOpacity style={styles.IconContainer} onPress={PressBack}>
                  <FontAwesomeIcon icon={faAngleLeft} size={28}/>
              </TouchableOpacity>

              <Layout style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>      
                  <Text style={{fontSize: 16, fontWeight: 'bold',}}>HELP</Text>
              </Layout>

              <Layout style={styles.IconContainer}/>
          </Layout>

          {/* 내용물 */}
          <Layout style={{flex: 9, padding: 20, flexDirection: 'column'}}>
            <TouchableOpacity onPress={PressGuide}>
              <Layout style={styles.banner}>
                <FontAwesomeIcon icon={faFlag} size={16} style={styles.icon2}/>
                <Text style={styles.text}>Report Guide</Text>
              </Layout>
            </TouchableOpacity>

            {/*
            <TouchableOpacity onPress={PressReport}>
              <Layout style={styles.banner}>
                <FontAwesomeIcon icon={faExclamation} size={16} style={styles.icon2}/>
                <Text style={styles.text}>Report Error</Text>
              </Layout>
            </TouchableOpacity>
             */}


            <TouchableOpacity onPress={PressEmergency}>
              <Layout style={styles.banner}>
                <FontAwesomeIcon icon={faComment} size={16} style={styles.icon2}/>
                <Text style={styles.text}>Emergency Call with Manager</Text>
              </Layout>
            </TouchableOpacity>
            
            
          </Layout>

          <Modal
            visible={modal}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setModal(!modal)}
          >
          <Card disabled={true} style={{width: (Dimensions.get('window').width * 0.8)}}>
           
           <Layout>
            <Text style={{fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginVertical: 10}}>Call</Text>
            <Text style={{fontSize: 16, textAlign: 'center', marginBottom: 20}}>070-4300-0833</Text>
            <Button onPress={PressCopy}>Copy</Button>
           </Layout>
           <Divider style={{marginVertical:50, backgroundColor: '#C9C9C9'}}/>

           <Layout>
            <Text style={{fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginVertical: 10}}>Instagram Direct</Text>
            <Text style={{fontSize: 16, textAlign: 'center', marginBottom: 20}}>@glokool_official</Text>
            <Button onPress={PressLink}>Link</Button>
           </Layout>


          </Card>

        </Modal>

        <Toast ref={(toast) => toastRef = toast} position={'center'}/>
        </React.Fragment>
    );
}


const styles = StyleSheet.create({
  Container: {    
      flex: 1,
      backgroundColor: 'white',
  },
  TabBar:{        
      flexDirection: 'row',
      flex: 1
  },
  MainContainer: {
      flex: 10,
      backgroundColor : '#FFC043',
  },
  IconContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 15,
  },
  icon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon2: {
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    flexDirection: 'row',
    marginVertical: 15
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});