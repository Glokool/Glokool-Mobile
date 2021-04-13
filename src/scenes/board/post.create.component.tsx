import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { PostCreateScreenProps } from '../../navigation/board.navigator'
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
  Linking,
  DeviceEventEmitter
} from 'react-native';
import {
  Button,
  Input,
  Layout,
  LayoutElement,
} from '@ui-kitten/components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

var ToastRef : any;

export const PostCreateScreen = (props: PostCreateScreenProps ): LayoutElement => {

    const Title = props.route.params;

    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    React.useEffect(() => {
      return () => {
        DeviceEventEmitter.emit('out');
      }
    }, []);

    const PressBack = () => {
      props.navigation.goBack()
    }

    const PressPost = () => {
      
      const user = auth().currentUser
      const data = {
        title: title,
        content: content,
        writer: user?.displayName,
        writerUID: user?.uid,
        writerAvatar: user?.photoURL,
        writeDate: new Date(),
        plus: [],
        comment: []
      }
      
      if(Title === 'Free Board'){
        
        const doc = firestore().collection("FreeBoard").doc();

        doc.set(data);
      }

      else if (Title === 'QnA Board'){
                
        const doc = firestore().collection("QnABoard").doc();

        doc.set(data);
      }

      props.navigation.goBack();
      
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
              <Text>{Title}</Text>
            </Layout>
            

            <Layout style={styles.rightIcon}>
              <Button
                size='small'
                onPress={() => PressPost()}
              >
                POST
              </Button>

            </Layout>

          </Layout>

          <Layout style={styles.mainContainer}>
          <ScrollView>
          <Input
            placeholder='Title'
            value={title}
            style={styles.titleInput}
            onChangeText={nextValue => setTitle(nextValue)}
          />

          <Input
            placeholder='Content'
            value={content}
            multiline={true}
            textStyle={{ minHeight: 256, textAlignVertical: 'top' }}
            style={styles.contentInput}
            onChangeText={nextValue => setContent(nextValue)}
          />

          </ScrollView>
          </Layout>

          


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