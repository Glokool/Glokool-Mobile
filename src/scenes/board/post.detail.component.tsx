import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
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
  Linking,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Button,
  Card,
  Icon,
  Input,
  Layout,
  LayoutElement,
  Modal,
} from '@ui-kitten/components';
import { EditIcon } from '../../component/icon'
import { faAngleLeft, faExclamationTriangle, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import moment from 'moment';
import { NavigatorRoute } from '../../navigation/app.route';

var ToastRef : any;

export const PostDetailScreen = (props: PostDetailScreenProps): LayoutElement => {
    
    
    const type = props.route.params.type;

    const [content, setContent] = React.useState(props.route.params.item.item);
    const [value, setValue] = React.useState('');
    const [loginVisible, setLoginVisible] = React.useState(false);

    const day = moment(content.date).toDate();

    console.log(content)

    React.useEffect(() => {

    }, [])


    const PressBack = () => {
      props.navigation.goBack()
    }

    const PressReport = () => {

    }

    const PressComment = async() => {
      
      if(auth().currentUser === null){
        setLoginVisible(true);
      }
      else{



        if(type === 'Free Board'){
          const comment = firestore().collection('FreeBoard').doc(content.index + '');

          console.log(content)

          await comment.update({
            comment: firestore.FieldValue.arrayUnion({
              writer: auth().currentUser?.displayName,
              writerDate: new Date(),
              writerAvatar: auth().currentUser?.photoURL,
              content: value
            })
          })
            .then((result) => {
              //console.log(result);
              setValue('');

              comment.get()
                .then((response) => {
                  console.log(response)
                  setContent(response.data());
                })
            })
            .catch((err) => {
              //console.log(err)
            })
  
        }
        else{
          const comment = firestore().collection('QnABoard').doc(content.index);

          await comment.update({
            comment: firestore.FieldValue.arrayUnion({
              writer: auth().currentUser?.displayName,
              writerDate: new Date(),
              writerAvatar: auth().currentUser?.photoURL,
              content: value
            })
          })
            .then((result) => {
              //console.log(result);
              setValue('');

              comment.get()
                .then((response) => {
                  console.log(response)
                  setContent(response.data());
                })
            })
            .catch((err) => {
              
            })
  
        }
        
      }
    }

    const RenderIcon = (props) => (
      <TouchableWithoutFeedback onPress={() => PressComment()}>
        <Icon {...props} name={'edit-outline'}/>
      </TouchableWithoutFeedback>
    );



    return(
       <React.Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
         {/* top Tab bar*/}
        <Layout style={styles.TopTabBar}>
          
          <TouchableOpacity style={styles.leftIcon} onPress={PressBack}>
            <FontAwesomeIcon icon={faAngleLeft} size={26}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rightIcon} onPress={PressReport}>
            <FontAwesomeIcon icon={faExclamationTriangle} size={24}/>
          </TouchableOpacity>
        </Layout>

        {/* 메인 컨텐츠 컨테이너 */}

        
        <Layout style={styles.mainContainer}>
          
          <ScrollView>

          <Layout style={styles.profileContainer} >

            
            <Image style={styles.profileImage} source={require('../../assets/profile/profile_01.png')}/>

            <Layout style={styles.profileTextContainer}>
              <Text style={styles.nickname}>{content.writer}</Text>
              <Text style={styles.date}>{`${day.getMonth() + 1}/${day.getDate()} ${day.getHours()}:${day.getMinutes()}`}</Text>
            </Layout>

            <Layout style={styles.iconContainer}>

              <TouchableOpacity style={styles.touchIconLeft}>
                <FontAwesomeIcon icon={faThumbsUp} size={20} color={'black'}/>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.touchIconRight}>
                <FontAwesomeIcon icon={faThumbsDown} size={20} color={'black'}/>
              </TouchableOpacity>                 
              
            </Layout>
          </Layout>

          <Layout style={styles.contentContainer}>
            <Text>
              {content.content}
            </Text>

            
          </Layout>


          {content.comment.map((item, idx) => 

            <Layout style={styles.commentContainer}>

              <Layout style={styles.commentProfileContainer}>
                <Image style={styles.commentProfileImage} source={require('../../assets/profile/profile_02.png')}/>
                <Text style={styles.commentProfileText}>{item.writer}</Text>
              </Layout>

              <Layout>
                <Text style={styles.commentContent}>{item.content}</Text>
                <Text style={styles.commentDate}>{`${moment(item.writeDate).toDate().getMonth() + 1}/${moment(item.writeDate).toDate().getDate()} ${moment(item.writeDate).toDate().getHours()}:${moment(item.writeDate).toDate().getMinutes()}`}</Text>
              </Layout>
            </Layout>          
          )}

          <Layout style={styles.inputContainer}>
            <Input
              placeholder='Place your Text'
              value={value}
              accessoryRight={RenderIcon}
              onChangeText={nextValue => setValue(nextValue)}
            />
          </Layout>


   

          </ScrollView>
        </Layout>

        <Modal
          visible={loginVisible}
          backdropStyle={styles.backdrop}
        >
          <Card disabled={true}>
            <Text style={{marginVertical: 30}}>Login is required. Would you like to login?</Text>
            
            <Layout style={{flexDirection: 'row'}}>
              <Layout style={{margin: 15, flex: 1}}>
                <Button style={styles.cancelButton} appearance='outline' onPress={() => {
                  setLoginVisible(false);
                }}>
                  CANCLE
                </Button>
              </Layout>
              <Layout style={{margin: 15, flex: 1}}>
                <Button onPress={() => {
                  setLoginVisible(false);
                  props.navigation.replace(NavigatorRoute.AUTH);
                }}>
                  MOVE
                </Button>
              </Layout>
              
            </Layout>
            
          </Card>
        </Modal>
        

 




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
  rightIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  mainContainer: {
    flex: 95,
    zIndex:9,
    backgroundColor: 'white'
  },
  profileContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 20,

  },
  profileImage: {
    width: 42,
    height: 42,
    resizeMode: 'stretch',
    justifyContent: 'center'
  },
  profileTextContainer:{
    height: 42,
    marginLeft: 10,
    justifyContent: 'center'
  },
  nickname: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  date: {
    fontSize: 10,
    color: 'gray'
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  touchIconLeft: {
    marginRight: 5,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchIconRight: {
    marginLeft: 5,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 9,
    padding: 30
  },
  commentContainer: {
    paddingHorizontal: 30,
    paddingVertical: 5
  },
  commentProfileContainer:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  commentProfileImage: {
    width: 28,
    height: 28,
    resizeMode: 'stretch',
    justifyContent: 'center'
  },
  commentProfileText:{
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 10
  },
  commentContent: {
    fontSize: 12,
    marginVertical: 5,
  },
  commentDate: {
    fontSize: 12,
    color: 'gray'
  },
  inputContainer: {
    width: '100%',
    padding: 30,

  },
  input: {
    width: '100%'
  }
})
