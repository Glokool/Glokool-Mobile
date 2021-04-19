import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native';
import { BoardScreenProps } from '../../navigation/board.navigator'
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
  DeviceEventEmitter
} from 'react-native';
import { 
  Button,
  Card,
  Divider,
  IndexPath, 
  Input, 
  Layout, 
  LayoutElement,
  Modal,
  Select, 
  SelectItem 
} from '@ui-kitten/components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCommentAlt, faPencilAlt, faSearch, faSyncAlt, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route';

import Refresh from '../../assets/board/refresh.svg';
import Search from '../../assets/board/search.svg';
import Post from '../../assets/board/post.svg';
import Comment from '../../assets/board/comment.svg';
import Good from '../../assets/board/good.svg';

var ToastRef : any;
var exitApp : any = undefined;
var timeout : any;



export const BoardScreen = (props: BoardScreenProps): LayoutElement => {

  
    const [selectedBoard, setSelectedBoard] = React.useState(new IndexPath(0));
    const BoardSelect = [
      'Gloo Board',
      'QnA Board'
    ];
    
    const [refresh, setRefresh] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [data, setData] = React.useState([]);
    const [freeBoard, setFreeBoard] = React.useState([]);
    const [qnaBoard, setQnaBoard] = React.useState([]);
    const [searchVisible, setSearchVisible] = React.useState(false);
    const [loginVisible, setLoginVisible] = React.useState(false);

    // 비동기 함수 실행을 위한 함수 분리
    // 보드 데이터 다운로드
    // 향후 바로 데이터로 교체할 것

    async function downloadFreeBoard() {
        const Free = await firestore().collection('FreeBoard').get();

        var FreeBoard = [];

        Free.forEach((doc) => {
          
          var tempData = doc.data();
          tempData.id = doc.id

          FreeBoard.push(tempData);
        });

        FreeBoard.sort(function(a, b) {
          var keyA = new Date(a.writeDate.toDate()),
              keyB = new Date(b.writeDate.toDate());
          // Compare the 2 dates
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });

        FreeBoard.reverse()

        setFreeBoard(FreeBoard);
        setData(FreeBoard);
    }

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

      PressRefresh(BoardSelect[selectedBoard.row]);

      DeviceEventEmitter.addListener('out', () => {
        const displayValue = AsyncStorage.getItem('table')
          .then((result) => {
            console.log(result)
            PressRefresh(result);
          })
          
      });
    }, []);

    React.useEffect(() => {

      if(BoardSelect[selectedBoard.row] === 'Gloo Board'){
        setData(freeBoard.filter(item => {return item.title.toLowerCase().indexOf(search.toLowerCase() ) != -1}));
      }
      
      else{
        setData(qnaBoard.filter(item => {return item.title.toLowerCase().indexOf(search.toLowerCase() ) != -1}));
      }


    }, [search])
  
    // 백핸들러 적용을 위한 함수
    const focusEvent = useFocusEffect(
        React.useCallback(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        }
        }, [])
    );
    

    const handleBackButton = () => {
    
        if (exitApp == undefined || !exitApp){
              
          ToastRef.show('Press one more time to exit', 1000);
          exitApp = true;
    
          timeout = setTimeout(() => {
            exitApp = false;
          }, 2000);
        }
    
        else{
          clearTimeout(timeout);
          BackHandler.exitApp();
        }
                   
        return true;
    };

    const PressRefresh = (value) => {

      if(value === 'Gloo Board'){
          downloadFreeBoard();
      }
      
      else{
          downloadQnABoard();
      }
    }

    const PressPost = (item) => {

      AsyncStorage.setItem('table', BoardSelect[selectedBoard.row]);
      props.navigation.navigate(SceneRoute.BOARD_POST_DETAIL,
      {
          item: item, 
          type: BoardSelect[selectedBoard.row]
      });      
    }

    const PressSelect = (value : IndexPath) => {
        setSelectedBoard(value);
        PressRefresh(BoardSelect[value.row]);
    }
      

    const PressWrite = () => {
      if(auth().currentUser != null){

        
        AsyncStorage.setItem('table', BoardSelect[selectedBoard.row]);
        props.navigation.navigate(SceneRoute.BOARD_POST_CREATE, BoardSelect[selectedBoard.row]);

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
            
            <Text style={styles.postTitle} numberOfLines={1}>
              {item.item.title}
            </Text>

            <Text style={styles.postContent} numberOfLines={1}>
              {item.item.content}
            </Text>

            <Layout style={styles.postFooter}>
              
              <Layout style={styles.footerSideContainer}>
                <Text style={styles.postContent}>
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

            <Divider style={{width: '100%', backgroundColor: 'gray', marginTop: 5}}/>
        </Layout>
        </TouchableOpacity>
      );
    }


    return(
       <React.Fragment>
          <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
           {/* Top Tab Bar - 자유게시판 등등 선택 기능 */}
           <Layout style={styles.TopTabBarContainer}>

              {/* 자유게시판 / QnA 게시판 선택 */}
              <Layout style={styles.SelectBoardContainer}>
                <Select
                  style={styles.BoardSelect}
                  size='large'
                  value={BoardSelect[selectedBoard.row]}
                  selectedIndex={selectedBoard}
                  onSelect={index => PressSelect(index)}>
                  <SelectItem title={'Gloo Board'} style={styles.selectItem}/>
                  <SelectItem title={'QnA Board'} style={styles.selectItem}/>
                </Select>
              </Layout>

              <Layout style={styles.SelectIconContainer}>
                <TouchableOpacity style={styles.TouchIcon} onPress={() => PressRefresh(BoardSelect[selectedBoard.row])}>
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
    padding: 10
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
    justifyContent: 'center'
  },
  post: {
    width: '100%',
    height: undefined,
    padding: 15,
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black'
  },
  postContent: {
    fontSize: 12,
    color: 'gray',
    marginVertical: 5  
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
    marginRight: 10
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