import React from 'react';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
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
} from '@ui-kitten/components';
import { faAngleLeft, faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import moment from 'moment';
import { NavigatorRoute, SceneRoute } from '../../../navigation/app.route';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Toast from 'react-native-easy-toast';

import Korean from '../../../assets/board/Korean.svg';
import Resident from '../../../assets/board/Resident.svg';
import Travler from '../../../assets/board/Travler.svg';
import Good from '../../assets/board/good.svg';
import Comment from '../../assets/board/comment.svg';
import KoreanMini from '../../../assets/board/Korean_Mini.svg';
import ResidentMini from '../../../assets/board/Resident_Mini.svg';
import TravlerMini from '../../../assets/board/Travler_Mini.svg';
import Good_Default from '../../assets/board/Good_default.svg';
import Modify from '../../assets/board/Modify.svg';
import Delete from '../../assets/board/Delete.svg';
import Report from '../../assets/board/Report.svg';
import { UrlTile } from 'react-native-maps';

var ToastRef : any;

interface Comment {
  content: string,
  writer: string,
  writerAvatar: string | null,
  writerDate: string,
  writerUID: string,
}

interface Report {
  content: string,
  type: string,
  writeDate: string,
  writer: string,
  writerAvatar: string | null,
  writerUID: string
}

interface BoardDocument {
  comment: Array<Comment>,
  plus: Array<string>,
  report: Array<Report>,
  title: string,
  writeDate: string,
  writer: string,
  writerAvatar: string,
  writerUID: string,
  content: string,
  writerType: string
}

export const PostDetailScreen = (props: PostDetailScreenProps): LayoutElement => {
        
    const user = auth().currentUser;
    const ID = props.route.params.id
    const [content, setContent] = React.useState<BoardDocument>(props.route.params);
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [value, setValue] = React.useState('');
    const [loginVisible, setLoginVisible] = React.useState(false);
    const [deleteVisible, setDeleteVisible] = React.useState(false);
    const [menuVisible, setMenuVisible] = React.useState(false);
    const day = new Date(content.writeDate.seconds * 1000);

    async function ModifyEnd() {
      const doc = await firestore().collection('QnABoard').doc(ID).get()
          .then((response) => {
            setContent(response.data());
          })
          .catch((err => {
            console.log(err)
          }))
    }

    React.useEffect(() => {      
      
      DeviceEventEmitter.addListener('ModifyEnd', () => {
        ModifyEnd();
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

        const comment = firestore().collection('QnABoard').doc(ID);

        const user = firestore().collection('Users').doc(auth().currentUser.uid).get()
          .then((result) => {

            const type = result.data().type

            comment.update({
              comment: firestore.FieldValue.arrayUnion({
                writer: auth().currentUser?.displayName,
                writerUID: auth().currentUser?.uid,
                writerDate: new Date(),
                writerAvatar: auth().currentUser?.photoURL,
                type: type,
                content: value
              })
            })
              .then((res) => {
    
                setValue('');    
                comment.get()
                  .then((response) => {
                    console.log(response)
                    setContent(response.data());
                  })

              })
              .catch((err) => {
                console.log(err);
                ToastRef.show('Error!!', 2000);
              })        
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

    const PressModify = () => {
      props.navigation.navigate(SceneRoute.BOARD_POST_MODIFY,
        {
          param: {
            id: content.id,
          }              
        }
      );
    }

    const DeletePost = () => {      
      const Doc = firestore().collection('QnABoard').doc(content.id).delete();
      props.navigation.goBack();          
    }

    const PressReport = () => {
      props.navigation.navigate(SceneRoute.BOARD_POST_REPORT,
        {
          param: {
            id: content.id,
          }              
        }
      );
    }


    function renderImage(uid: string) {

      var imageRef = storage().ref(`profile/${uid}`);
      var url : string = '';

      console.log('이미지 검색 시작', uid);

      return imageRef.getDownloadURL()
        .then((result) => {
            console.log('결과', result);
        })
        .catch((err) => {
            console.log(err);
        })
      
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
            <Layout style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              
              <TouchableOpacity style={{marginHorizontal: 5}} onPress={() => {PressModify()}}>
                <Modify width={20} />
              </TouchableOpacity>

              <TouchableOpacity style={{marginHorizontal: 5}} onPress={() => {setDeleteVisible(true)}}>
                <Delete width={20} />
              </TouchableOpacity>
            
            </Layout>
          :
            <Layout style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                
              <TouchableOpacity style={{marginHorizontal: 5}} onPress={() => {PressReport()}}>
                <Report width={20} height={20}/>
              </TouchableOpacity>

            </Layout>
          }
                   
        </Layout>

        {/* 메인 컨텐츠 컨테이너 */}

        
        <Layout style={styles.mainContainer}>
          
          <ScrollView>

          <Layout style={styles.profileContainer} >

            {(content.writerAvatar === '')? 
              <Image style={styles.profileImage} source={require('../../assets/profile/profile_01.png')}/>
            : 
              <Image style={styles.profileImage} source={{ uri : content.writerAvatar }}/>
            }
            
            <Layout style={styles.profileTextContainer}>
              
              <Text style={styles.nickname}>{content.writer}</Text>

              <Layout style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                {(content.writerType === 'Korean')?
                  <Korean/>
                :
                (content.writerType === 'Resident')?
                  <Resident/>
                :
                  <Travler />
                }
                <Text style={styles.date}>{`${((day.getMonth() + 1) >= 10 ? (day.getMonth() + 1) : '0' + (day.getMonth() + 1))}/${((day.getDate()) >= 10 ? (day.getDate()) : '0' + (day.getDate()))} ${((day.getHours()) >= 10 ? (day.getHours()) : '0' + (day.getHours()))}:${((day.getMinutes()) >= 10 ? (day.getMinutes()) : '0' + (day.getMinutes()))}`}</Text>
              </Layout>
              
            </Layout>

            <Layout style={styles.iconContainer}>

              <TouchableOpacity style={styles.touchIconLeft} onPress={() => PressPlus()}>
                <Good width={20} height={20}/>
                <Text style={{marginLeft: 10, color: '#FFA757', fontWeight: 'bold'}}>{content.plus.length}</Text>
              </TouchableOpacity>
              
              <Layout style={styles.touchIconRight}>
                <Comment width={20} height={20}/>
                <Text style={{marginLeft: 10, color: '#9FDFFF', fontWeight: 'bold'}}>{content.comment.length}</Text>
              </Layout>                 
              
            </Layout>
          </Layout>

          <Layout style={styles.contentContainer}>
            <Text style={{fontSize: 19, fontFamily: 'IBMPlexSansKR-SemiBold', marginBottom: 10}}>{content.title}</Text>
            <Text style={{fontSize: 15, fontFamily: 'IBMPlexSansKR-Medium'}}>
              {content.content}
            </Text>

            
          </Layout>


          {content.comment.map((item, idx) => 

            <Layout style={styles.commentContainer}>

              <Layout style={styles.commentProfileContainer}>
                
                <Layout>
                  <Layout style={(item.writerUID === content.writerUID)? { borderWidth: 1, borderColor: '#FFD774', borderRadius: 50, padding: 2, overflow: 'hidden' } : { padding : 2}}>                
                    {(item.writerAvatar === '')? 
                      <Layout>
                        <Image style={styles.profileImage} source={require('../../assets/profile/profile_03.png')}/>
                      </Layout>
                    : 
                      <Layout>
                        <Image style={styles.profileImage} source={{ uri: item.writerAvatar}}/> 
                      </Layout>
                    }
                  </Layout>

                  <Layout style={{ position: 'absolute', bottom: 0, right: -10, backgroundColor: '#00FF0000' }}>
                    {(item.type === 'Korean')? 
                      <KoreanMini /> 
                    : 
                      (item.type === 'Resident')?
                      <ResidentMini />
                    :
                      <TravlerMini />
                    }
                  </Layout>
                </Layout>

                <Layout style={{ justifyContent: 'center', marginLeft: 15}}>
                  <Text style={styles.commentProfileText}>{item.writer}</Text>
                  <Text style={styles.commentDate}>
                    {`${((moment(item.writeDate).toDate().getMonth() + 1) >= 10 ? (moment(item.writeDate).toDate().getMonth() + 1) : '0' + (moment(item.writeDate).toDate().getMonth() + 1))}/${((moment(item.writeDate).toDate().getDate()) >= 10 ? (moment(item.writeDate).toDate().getDate()) : '0' + (moment(item.writeDate).toDate().getDate()))} ${((moment(item.writeDate).toDate().getHours()) >= 10 ? (moment(item.writeDate).toDate().getHours()) : '0' + (moment(item.writeDate).toDate().getHours()))}:${((moment(item.writeDate).toDate().getMinutes()) >= 10 ? (moment(item.writeDate).toDate().getMinutes()) : '0' + (moment(item.writeDate).toDate().getMinutes()))}`}
                  </Text>  
                </Layout>
              </Layout>

              <Layout>
                <Text style={styles.commentContent}>{item.content}</Text>           
              </Layout>
            </Layout>          
          )}          
          </ScrollView>

          <KeyboardAwareScrollView>
          <Layout style={styles.inputContainer}>
            <Input
              placeholder='Place your Text'
              value={value}
              accessoryRight={RenderIcon}
              style={styles.input}
              onChangeText={nextValue => setValue(nextValue)}
            />
          </Layout>
          </KeyboardAwareScrollView>

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
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 50,
    resizeMode: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#00FF0000'
  },
  profileTextContainer:{
    height: 60,
    marginLeft: 10,
    justifyContent: 'center',
  },
  nickname: {
    fontSize: 14,
    fontFamily: 'IBMPlexSansKR-SemiBold',
  },
  date: {
    fontSize: 10,
    color: 'gray',
    marginLeft: 5
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
    flexDirection: 'row'
  },
  contentContainer: {
    flex: 9,
    padding: 30
  },
  commentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  commentProfileContainer:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentProfileImage: {
    width: 28,
    height: 28,
    resizeMode: 'stretch',
    justifyContent: 'center'
  },
  commentProfileText:{
    fontFamily: 'IBMPlexSansKR-SemiBold',
    fontSize: 14,
    marginBottom: 0
  },
  commentContent: {
    fontFamily: 'IBMPlexSansKR-Text',
    fontSize: 12,
    marginVertical: 5,
    marginLeft: 3
  },
  commentDate: {
    fontFamily: 'IBMPlexSansKR-Text',
    fontSize: 12,
    color: 'gray'
  },
  inputContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#00FF0000'
  },
  input: {
    width: '100%',
    borderColor:'#00FF0000',
    borderRadius: 15,
    marginTop: 0,
    marginBottom: 10
  }
})
