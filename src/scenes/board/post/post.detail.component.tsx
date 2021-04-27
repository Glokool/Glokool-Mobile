import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { PostDetailScreenProps } from '../../../navigation/board.navigator'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  DeviceEventEmitter
} from 'react-native';
import {
  Button,
  Card,
  Icon,
  Input,
  Layout,
  LayoutElement,
  Modal,
  MenuItem, 
  OverflowMenu,
  IndexPath
} from '@ui-kitten/components';
import { faAngleLeft, faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import moment from 'moment';
import { NavigatorRoute, SceneRoute } from '../../../navigation/app.route';
import Good from '../../assets/board/good.svg';
import Toast from 'react-native-easy-toast';

var ToastRef : any;

export const PostDetailScreen = (props: PostDetailScreenProps): LayoutElement => {
        
    const user = auth().currentUser;
    const [content, setContent] = React.useState(props.route.params.param.item);
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [value, setValue] = React.useState('');
    const [loginVisible, setLoginVisible] = React.useState(false);
    const [deleteVisible, setDeleteVisible] = React.useState(false);
    const [menuVisible, setMenuVisible] = React.useState(false);
    const day = new Date(content.writeDate.seconds * 1000);

    React.useEffect(() => {
      
      DeviceEventEmitter.addListener('ModifyEnd', () => {

        const doc = firestore().collection('QnABoard').doc(content.id).get()
          .then((response) => {
            setContent(response.data());
          })
        
      });

    }, []);

    const PressBack = () => {
      props.navigation.goBack()
    }

    const PressComment = async() => {

      if(value === ''){
        return false
      }
      
      if(auth().currentUser === null){
        setLoginVisible(true);
      }
      else{       

        const comment = firestore().collection('QnABoard').doc(content.id);

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
            ToastRef.show('This post has already been deleted', 2000);
            props.navigation.goBack();
          })        
        
      }
    }

    const RenderIcon = (props) => (
      <TouchableWithoutFeedback onPress={() => PressComment()}>
        <Icon {...props} name={'edit-outline'}/>
      </TouchableWithoutFeedback>
    );
    

    const PressPlus = async() => {

      const user = auth().currentUser;

      if(user === null){
        setLoginVisible(true);
      }
      else{

        
        if(content.plus.indexOf(user.uid) === -1){
          
          const plus = firestore().collection('QnABoard').doc(content.id);

          await plus.update({
            plus: firestore.FieldValue.arrayUnion(user.uid)
          })
            .then((result) => {  
              plus.get()
                .then((response) => {
                  console.log(response)
                  setContent(response.data());
                })
            })
            .catch((err) => {
              ToastRef.show('This post has already been deleted', 2000);
              props.navigation.goBack();
            })
        }
      }
    }

    const renderOverflow = () => (
      <TouchableOpacity style={styles.rightIcon} onPress={() => setMenuVisible(true)}>
            <FontAwesomeIcon icon={faEllipsisV} size={24} color={'#FFD774'}/>
      </TouchableOpacity>
    );

    const onItemSelect = (index) => {
      setMenuVisible(false);

      if(content.writerUID === user?.uid){// 0번 : 수정 1번 : 삭제
        if(index.row === 0){
          console.log('수정')
          props.navigation.navigate(SceneRoute.BOARD_POST_MODIFY,
            {
              param: {
                id: content.id,
              }              
            }
          );
        }
        else{
          setDeleteVisible(true);
        }
      }
      else{ //0번 신고
          
          props.navigation.navigate(SceneRoute.BOARD_POST_REPORT,
            {
              param: {
                id: content.id,
              }              
            }
          );
      }
    };

    const DeletePost = () => {      
      const Doc = firestore().collection('QnABoard').doc(content.id).delete();
      props.navigation.goBack();          
    }


    return(
       <React.Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
         {/* top Tab bar*/}
        <Layout style={styles.TopTabBar}>
          
          <TouchableOpacity style={styles.leftIcon} onPress={PressBack}>
            <FontAwesomeIcon icon={faAngleLeft} size={26} color={'#FFD774'}/>
          </TouchableOpacity>

          <Layout style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>QnA Board</Text>
          </Layout>

          {(content.writerUID === user?.uid)? 
            <OverflowMenu
              anchor={renderOverflow}
              backdropStyle={styles.backdrop}
              visible={menuVisible}
              placement={'bottom end'}
              selectedIndex={selectedIndex}
              onSelect={onItemSelect}                                    
              onBackdropPress={() => setMenuVisible(false)}>
              <MenuItem title='Modify'/>
              <MenuItem title='Delete'/>
            </OverflowMenu> 
          :
            <OverflowMenu
              anchor={renderOverflow}
              backdropStyle={styles.backdrop}
              visible={menuVisible}
              placement={'bottom end'}
              selectedIndex={selectedIndex}
              onSelect={onItemSelect}                                    
              onBackdropPress={() => setMenuVisible(false)}>
              <MenuItem title='Report'/>
            </OverflowMenu> 
          }
                   
        </Layout>

        {/* 메인 컨텐츠 컨테이너 */}

        
        <Layout style={styles.mainContainer}>
          
          <ScrollView>

          <Layout style={styles.profileContainer} >

            {(content.writerAvatar === '')? 
              <Image style={styles.profileImage} source={require('../../assets/profile/profile_01.png')}/>
            : 
              <Image style={styles.profileImage} source={{uri: content.writerAvatar}}/>
            }
            
            <Layout style={styles.profileTextContainer}>
              <Text style={styles.nickname}>{content.writer}</Text>
              <Text style={styles.date}>{`${day.getMonth() + 1}/${day.getDate()} ${day.getHours()}:${day.getMinutes()}`}</Text>
            </Layout>

            <Layout style={styles.iconContainer}>

              <TouchableOpacity style={styles.touchIconLeft} onPress={() => PressPlus()}>
                <Good width={20} height={20}/>
                <Text style={{marginLeft: 10, color: '#FFA757', fontWeight: 'bold'}}>{content.plus.length}</Text>
              </TouchableOpacity>
              
              <Layout style={styles.touchIconRight}>

              </Layout>                 
              
            </Layout>
          </Layout>

          <Layout style={styles.contentContainer}>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 15}}>{content.title}</Text>
            <Text>
              {content.content}
            </Text>

            
          </Layout>


          {content.comment.map((item, idx) => 

            <Layout style={styles.commentContainer}>

              <Layout style={styles.commentProfileContainer}>
                
                {(item.writerAvatar === '')? 
                  <Image style={styles.profileImage} source={require('../../assets/profile/profile_03.png')}/>
                : 
                  <Image style={styles.profileImage} source={{uri: item.writerAvatar}}/>
                }
                <Text style={styles.commentProfileText}>{item.writer}</Text>
                
              </Layout>

              <Layout>
                <Text style={styles.commentContent}>{item.content}</Text>
                <Text style={styles.commentDate}>{`${moment(item.writeDate).toDate().getMonth() + 1}/${moment(item.writeDate).toDate().getDate()} ${moment(item.writeDate).toDate().getHours()}:${moment(item.writeDate).toDate().getMinutes()}`}</Text>
              </Layout>
            </Layout>          
          )}          
          </ScrollView>

          <Layout style={styles.inputContainer}>
            <Input
              placeholder='Place your Text'
              value={value}
              accessoryRight={RenderIcon}
              style={styles.input}
              onChangeText={nextValue => setValue(nextValue)}
            />
          </Layout>

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

        <Modal
            visible={deleteVisible}
            backdropStyle={styles.backdrop}
          >
          <Card disabled={true}>
            <Text style={{marginVertical: 30}}>Are you sure you want to delete it?</Text>
            
            <Layout style={{flexDirection: 'row'}}>
              <Layout style={{margin: 10, flex: 1}}>
                <Button style={styles.cancelButton} 
                  appearance='outline'
                  size='small'
                  onPress={() => {
                    setDeleteVisible(false);
                  }}>
                  CANCLE
                </Button>
              </Layout>
              <Layout style={{margin: 10, flex: 1}}>
                <Button
                  size='small'
                  onPress={() => {
                    setDeleteVisible(false);
                    DeletePost();
                  }}>
                  DELETE
                </Button>
              </Layout>
              
            </Layout>
            
          </Card>
        </Modal>
        
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
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cancelButton: {
    borderColor: '#FFC043',
    backgroundColor: 'white',   
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
    borderRadius: 50,
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
    flexDirection: 'row'
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
    padding: 20,
  },
  input: {
    width: '100%',
    borderColor:'#00FF0000',
    borderRadius: 15
  }
})
