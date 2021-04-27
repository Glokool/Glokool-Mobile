import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { BoardListScreenProps } from '../../navigation/board.navigator'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { 
  Button,
  Card,
  Divider,
  Input, 
  Layout, 
  LayoutElement,
  Modal,
} from '@ui-kitten/components';
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route';
import Refresh from '../../assets/board/refresh.svg';
import Search from '../../assets/board/search.svg';
import Post from '../../assets/board/post.svg';
import Comment from '../../assets/board/comment.svg';
import Good from '../../assets/board/good.svg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import KoreanMini from '../../assets/board/Korean_Mini.svg';
import ResidentMini from '../../assets/board/Resident_Mini.svg';
import TravelerMini from '../../assets/board/Travler_Mini.svg';


export const BoardListScreen = (props: BoardListScreenProps): LayoutElement => {

    const [search, setSearch] = React.useState('');
    const [data, setData] = React.useState([]);
    const [qnaBoard, setQnaBoard] = React.useState([]);
    const [searchVisible, setSearchVisible] = React.useState(false);
    const [loginVisible, setLoginVisible] = React.useState(false);

    async function downloadQnABoard() {

        const QnA = await firestore().collection('QnABoard').get();
        var QnABoard = [];
        
        QnA.forEach((doc) => {
          var tempData = doc.data();
          tempData.id = doc.id

          QnABoard.push(tempData);
        });    

        QnABoard.sort(function(a, b) {
          var keyA = new Date(a.writeDate.toDate()),
              keyB = new Date(b.writeDate.toDate());
          // Compare the 2 dates
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });

        QnABoard.reverse()

        setQnaBoard(QnABoard);
        setData(QnABoard);
    }

    React.useEffect(() => {

      downloadQnABoard();

    }, []);

    React.useEffect(() => {

      setData(qnaBoard.filter(item => {return item.title.toLowerCase().indexOf(search.toLowerCase() ) != -1}));     

    }, [search])
  


    const PressPost = (item : any) => {
      props.navigation.navigate(SceneRoute.BOARD_POST_DETAIL,
        {
          param: {
            item: item
          }          
        }
      );      
    }

    const PressWrite = () => {
      if(auth().currentUser != null){
        props.navigation.navigate(SceneRoute.BOARD_POST_CREATE);
      }
       
      else{
        setLoginVisible(true);
      }
      
    }

    const RenderBoard = (item : any) => {
      
      const day = item.item.writeDate.toDate();
         
      return(
        <TouchableOpacity onPress={() => PressPost(item)}>
        <Layout style={styles.post}>

            <Layout style={{ flexDirection: 'row', maxWidth: '80%' }}>

              <Layout style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                {(item.item.writerAvatar != '')?                  
                  <Image source={{ uri: item.item.writerAvatar }} style={{ width: 35, height: 35, resizeMode: 'stretch', borderRadius: 50 }}/>                
                :
                  <Image source={require('../../assets/profile/profile_04.png')} style={{ width: 35, height: 35, resizeMode: 'stretch', borderRadius: 50 }}/>
                }

                {(item.item.writerType === 'K')?
                  <KoreanMini style={{ position: 'absolute', bottom: 0, right: -10 }}/>
                :
                 (item.item.writerType === 'R')?
                  <ResidentMini style={{ position: 'absolute', bottom: 0, right: -10 }}/>
                :
                  <TravelerMini style={{ position: 'absolute', bottom: 0, right: -10 }}/>
                }
                

              </Layout>
              
              <Layout style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.postTitle} numberOfLines={1}>
                  {item.item.title}
                </Text>
              </Layout>
              
            </Layout>
            

            <Text style={styles.postContent} numberOfLines={1}>
              {item.item.content}
            </Text>

            <Layout style={styles.postFooter}>
              
              <Layout style={styles.footerSideContainer}>
                <Text style={styles.postInfo}>
                    {`${day.getMonth() + 1}.${day.getDate()} | ${item.item.writer}`}
                </Text>                
              </Layout>

              <Layout style={styles.footerSideContainer2}>
                 <Good style={styles.smallIcon}/>
                 <Text style={styles.iconNum}>{item.item.plus.length}</Text>
                 <Comment style={styles.smallIcon}/>
                 <Text style={styles.iconNum}>{item.item.comment.length}</Text>
              </Layout>              
            </Layout>

            <Divider style={{width: '100%', backgroundColor: '#EEEEEE', marginTop: 5}}/>
        </Layout>
        </TouchableOpacity>
      );
    }


    return(
       <React.Fragment>
          <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
           
           <Layout style={styles.TopTabBarContainer}>

              <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'flex-start', flex: 1 }} onPress={() => props.navigation.goBack()}>
                <FontAwesomeIcon icon={faAngleLeft} size={20} />
              </TouchableOpacity>
              
              <Layout style={{ justifyContent: 'center', alignItems: 'center', flex: 2, marginHorizontal: 10 }}>
                <Text style={{ fontFamily: 'BrandonGrotesque-Black', fontSize: 20, color: '#606060' }}>QnA Board</Text>
              </Layout>

              <Layout style={styles.SelectIconContainer}>
                <TouchableOpacity style={styles.TouchIcon} onPress={() => downloadQnABoard()}>
                  <Refresh/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.TouchIcon} onPress={() => setSearchVisible(true)}>
                  <Search/>
                </TouchableOpacity>

              </Layout>
           </Layout>

           {/* 게시판 내용 표기 Flat List */}
                     
            <Layout style={styles.BoardContainer}>
              
              {(data.length != 0)?
                <FlatList
                  data={data}
                  style={{backgroundColor: 'white', width: '100%'}}
                  contentContainerStyle={{paddingBottom: 300}}
                  renderItem={RenderBoard}
                  keyExtractor={item => item.index}
                />
              :
              
                <Text style={{fontSize: 16, color: 'gray', fontWeight: 'bold', textAlign: 'center'}}>There are no posts here yet. Why don't you try one?</Text>

              }
              
            </Layout>        
                    

          {/* 커스텀 바텀 바 (글쓰기 버튼) */}
          <TouchableOpacity style={styles.customBottomBar} onPress={() => PressWrite()}>
              <Post />
          </TouchableOpacity>
           
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
            visible={searchVisible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setSearchVisible(false)}
          >
          <Card disabled={true}>            
            <Input
              placeholder='Place your Text'              
              value={search}
              onChangeText={nextValue => setSearch(nextValue)}
            />                       
          </Card>
        </Modal>

       </React.Fragment>
    );
}


const styles = StyleSheet.create({
  TopTabBarContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cancelButton: {
    borderColor: '#FFC043',
    backgroundColor: 'white',   
  },
  SelectBoardContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  SelectIconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  TouchIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10
  },
  BoardSelect: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectItem: {
    backgroundColor: 'white',
    borderColor: '#00FF0000',
    borderWidth: 1
  },
  BoardContainer: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  post: {
    width: '100%',
    height: undefined,
    padding: 15,
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'IBMPlexSansKR-SemiBold', 
    color: '#878787'
  },
  postContent: {
    fontSize: 13,
    fontFamily: 'IBMPlexSansKR-Medium', 
    color: '#878787'
  },
  postInfo: {
    fontSize: 12,
    fontFamily: 'IBMPlexSansKR-Text', 
    color: '#878787'
  },
  postFooter: {
    flexDirection: 'row',
  },
  footerSideContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1
  },
  footerSideContainer2: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconNum: {
    marginLeft: 2,
    marginRight: 10,
    fontFamily: 'IBMPlexSansKR-Text', 
    color: '#878787'
  },
  customBottomBar: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallIcon: {
    width: 12,
    height: 12,
    marginRight: 5
  }
});