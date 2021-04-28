import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { PostReportScreenProps } from '../../navigation/board.navigator'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  DeviceEventEmitter
} from 'react-native';
import {
  Button,
  IndexPath,
  Input,
  Layout,
  LayoutElement,  
  Select, 
  SelectItem 
} from '@ui-kitten/components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Toast from 'react-native-easy-toast';

var ToastRef : any;

export const PostReportScreen = (props: PostReportScreenProps ): LayoutElement => {

    const ID = props.route.params.param.id;
    const [selectedBoard, setSelectedBoard] = React.useState(new IndexPath(0));
    const BoardSelect = [
      'Advertisement',
      'Use abusive language',
      'Do Spamming',
      'etc'
    ];
    const [content, setContent] = React.useState('');

    React.useEffect(() => {
      return () => {
        DeviceEventEmitter.emit('delete');
      }
    }, []);

    const PressBack = () => {
      props.navigation.goBack()
    }

    const PressReport = async() => {
      
      const user = auth().currentUser
      const data = {
        type: BoardSelect[selectedBoard.row],
        content: content,
        writer: user?.displayName,
        writerUID: user?.uid,
        writerAvatar: user?.photoURL,
        writeDate: new Date(),
      }
      const doc = firestore().collection('QnABoard').doc(ID);

      await doc.update({
        report: firestore.FieldValue.arrayUnion(data)
      })
        .then((result) => { 
          props.navigation.goBack();
        })
        .catch((err) => {
          ToastRef.show('This post has already been deleted', 2000);
          props.navigation.goBack();
        })

    }

    const PressSelect = (value : IndexPath) => {
      setSelectedBoard(value);     
    }


    return(
       <React.Fragment>

          <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
            {/* top Tab bar*/}
            <Layout style={styles.TopTabBar}>

              
            
            <TouchableOpacity style={styles.leftIcon} onPress={PressBack}>
              <FontAwesomeIcon icon={faAngleLeft} size={26}/>
            </TouchableOpacity>

            <Layout style={styles.titleContainer}>
              
            </Layout>
            

            <Layout style={styles.rightIcon}>
              <Button
                size='small'
                onPress={() => PressReport()}
              >
                REPORT
              </Button>

            </Layout>

          </Layout>

          <Layout style={styles.mainContainer}>
          <ScrollView>
          <Select
            style={styles.contentInput}
            size='large'
            value={BoardSelect[selectedBoard.row]}
            selectedIndex={selectedBoard}
            onSelect={index => PressSelect(index)}>
            <SelectItem title={'Advertisement'}/>
            <SelectItem title={'Use abusive language'}/>
            <SelectItem title={'Do Spamming'}/>
            <SelectItem title={ 'etc'}/>
          
          </Select>

          <Input
            placeholder='Please write down what you want to report'
            value={content}
            multiline={true}
            textStyle={{ minHeight: 256, textAlignVertical: 'top' }}
            style={styles.contentInput}
            onChangeText={nextValue => setContent(nextValue)}
          />

          </ScrollView>
          </Layout>

          <Toast ref={(toast) => ToastRef = toast} position={'center'}/>


       </React.Fragment>
    );
}


const styles = StyleSheet.create({
  TopTabBar: {
    flex: 5,
    flexDirection: 'row',
    padding: 20,
    width: '100%',
    backgroundColor: 'white'
  },
  leftIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  titleContainer:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  mainContainer: {
    flex: 95,
    padding: 20,
  },
  titleInput: {
    marginBottom: 5
  },
  contentInput: {
    marginTop: 5,
    
  }
});