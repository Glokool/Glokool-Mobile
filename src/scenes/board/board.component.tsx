import React from 'react';
import auth from '@react-native-firebase/auth';
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
  Linking
} from 'react-native';
import { 
  IndexPath, 
  Layout, 
  LayoutElement,
  Select, 
  SelectItem 
} from '@ui-kitten/components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

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

    const [freeBoard, setFreeBoard] = React.useState([{
      title: '',
      content: '',
      writer: '',
      writerAvatar: '',
      writeDate: new Date(),
      comment: [
        {
          writer: '',
          writeDate: new Date(),
          writerAvatar: ''
        }
      ]
    }])
    

    React.useEffect(() => {
        
    }, [])

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

    }


    return(
       <React.Fragment>
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
                  <FontAwesomeIcon icon={faSearch} size={20}/>
                </TouchableOpacity>

              </Layout>
           </Layout>

           {/* 게시판 내용 표기 Flat List */}

           <Layout style={styles.BoardContainer}>

           </Layout>
           

        


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
    alignItems: 'center'
  },
  BoardContainer: {
    flex: 9
  }



});