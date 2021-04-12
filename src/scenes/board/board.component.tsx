import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
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
} from 'react-native';
import { 
  Divider,
  IndexPath, 
  Layout, 
  LayoutElement,
  Select, 
  SelectItem 
} from '@ui-kitten/components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCommentAlt, faPencilAlt, faSearch, faSyncAlt, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { SceneRoute } from '../../navigation/app.route';

var ToastRef : any;
var exitApp : any = undefined;
var timeout : any;



export const BoardScreen = (props: BoardScreenProps): LayoutElement => {

    const [selectedBoard, setSelectedBoard] = React.useState(new IndexPath(0));
    const BoardSelect = [
      'Free Board',
      'QnA Board'
    ];
    const displayValue = BoardSelect[selectedBoard.row];
    const [refresh, setRefresh] = React.useState(false);
    const [freeBoard, setFreeBoard] = React.useState([]);
    const [qnaBoard, setQnaBoard] = React.useState([]);

    // const [freeBoard, setFreeBoard] = React.useState([{
    //   index: 0,
    //   title: '',
    //   content: '',
    //   writer: '',
    //   writerAvatar: '',
    //   writeDate: new Date(),
    //   plus: 0,
    //   minus: 0,
    //   comment: [
    //     {
    //       writer: '',
    //       writeDate: new Date(),
    //       writerAvatar: '',
    //       content: ''
    //     }
    //   ]
    // }]);
    // const [qnaBoard, setQnaBoard] = React.useState([{
    //   title: '',
    //   content: '',
    //   writer: '',
    //   writerAvatar: '',
    //   writeDate: new Date(),
    //   plus: 0,
    //   minus: 0,
    //   comment: [
    //     {
    //       writer: '',
    //       writeDate: new Date(),
    //       writerAvatar: '',
    //       content: ''
    //     }
    //   ]
    // }]);

    // 비동기 함수 실행을 위한 함수 분리
    // 보드 데이터 다운로드
    // 향후 바로 데이터로 교체할 것
    async function downloadFreeBoard() {
        const Free = await firestore().collection('FreeBoard').get();
        const QnA = await firestore().collection('QnABoard').get();

        var FreeBoard = [];

        Free.forEach((doc) => {
          
          FreeBoard.push(doc.data());
        });

        setFreeBoard(FreeBoard.reverse()); 
    }

    async function downloadQnABoard() {
        const QnA = await firestore().collection('QnABoard').get();
        var QnABoard = [];
        
        QnA.forEach((doc) => {
          QnABoard.push(doc);
        });    

        setQnaBoard(QnABoard.reverse());
    }

    React.useEffect(() => {
        
        downloadFreeBoard();

    }, []);


   

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

    const PressSearch = () => {

    };

    const PressRefresh = () => {
      if(displayValue === 'Free Board'){
          downloadFreeBoard();
      }
      
      else{
          downloadQnABoard();
      }
    }

    const PressPost = (item) => {
      props.navigation.navigate(SceneRoute.BOARD_POST_DETAIL,
        {
          item: item, 
          type: displayValue
        });
    }

    const PressWrite = () => {
      props.navigation.navigate(SceneRoute.BOARD_POST_CREATE);
    }

    const RenderBoard = (item) => {
      
      const day = moment(item.item.date).toDate();
          
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
                 <FontAwesomeIcon icon={faThumbsUp} size={10} color={'#FFD774'}/>
                 <Text style={styles.iconNum}>{item.item.plus}</Text>
                 <FontAwesomeIcon icon={faCommentAlt} size={10} color={'#C9C9C9'}/>
                 <Text style={styles.iconNum}>{item.item.comment.length}</Text>
              </Layout>              
            </Layout>

            <Divider style={{width: '100%', backgroundColor: 'gray', marginVertical: 5}}/>
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
                  status='primary'
                  value={displayValue}
                  selectedIndex={selectedBoard}
                  onSelect={index => setSelectedBoard(index)}>
                  <SelectItem title={'Free Board'}/>
                  <SelectItem title={'QnA Board'}/>
                </Select>
              </Layout>

              <Layout style={styles.SelectIconContainer}>
                <TouchableOpacity style={styles.TouchIcon} onPress={() => PressRefresh()}>
                  <FontAwesomeIcon icon={faSyncAlt} size={20}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.TouchIcon} onPress={() => PressSearch()}>
                  <FontAwesomeIcon icon={faSearch} size={20} />
                </TouchableOpacity>

              </Layout>
           </Layout>

           {/* 게시판 내용 표기 Flat List */}
           
               
          {(displayValue === 'Free Board')? 
            <Layout style={styles.BoardContainer}>
              
              {(freeBoard.length != 0)?
                <FlatList
                  data={freeBoard}
                  style={{backgroundColor: 'white', width: '100%'}}
                  contentContainerStyle={{paddingBottom: 300}}
                  renderItem={RenderBoard}
                  keyExtractor={item => item.index}
                />
              :
              
                <Text style={{fontSize: 16, color: 'gray', fontWeight: 'bold', textAlign: 'center'}}>There are no posts here yet. Why don't you try one?</Text>

              }
              
            </Layout>        
          : 
            null
          }

          {(displayValue === 'QnA Board')? 
            
            <Layout style={styles.BoardContainer}>
              {(qnaBoard.length != 0)?
                  <FlatList
                  data={qnaBoard}
                  style={{backgroundColor: 'white', width: '100%'}}
                  contentContainerStyle={{paddingBottom: 300}}
                  renderItem={RenderBoard}
                  keyExtractor={item => item.index}
                  />

                :
                
                <Text style={{fontSize: 16, color: 'gray', fontWeight: 'bold', textAlign: 'center'}}>There are no posts here yet. Why don't you try one?</Text>

            
              }
              
            </Layout>           
          : 
            null
          }
               

           

           {/* 커스텀 바텀 바 (글쓰기 버튼) */}
           <TouchableOpacity style={styles.customBottomBar} onPress={() => PressWrite()}>
                <FontAwesomeIcon icon={faPencilAlt} size={16} color={'#FFD774'} style={{marginRight: 15}}/>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: '#9C9C9C'}}>Writing</Text>
           </TouchableOpacity>
           



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
    marginHorizontal: 20
  },
  BoardSelect: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
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
    flexDirection: 'row',
    position: 'absolute',
    bottom: 25,
    left: '32.5%',
    borderRadius: 15,
    width: '35%',
    height: '5%',
    backgroundColor: '#C9C9C9',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#9C9C9C',
    borderWidth: 0.5
  }



});