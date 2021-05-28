import React from 'react'
import firestore from '@react-native-firebase/firestore'
import { SeriesScreenProps } from '../../navigation/ScreenNavigator/Series.navigator';
import { Divider, Layout, LayoutElement,  } from '@ui-kitten/components'
import { 
    Dimensions,
    Image,
    ImageBackground,
    Linking,
    SafeAreaView, 
    StyleSheet, 
    Text, 
    TouchableOpacity,
    FlatList, 
    ScrollView
} from 'react-native';
import Carousel from 'react-native-banner-carousel';
import { SERVER } from '../../server.component';
import axios from 'axios';
import { SceneRoute } from '../../navigation/app.route';

import KoreanMini from '../../assets/board/Korean_Mini.svg';
import ResidentMini from '../../assets/board/Resident_Mini.svg';
import TravlerMini from '../../assets/board/Travler_Mini.svg';
import Comment from '../../assets/board/comment.svg';
import Good from '../../assets/board/good.svg';

interface Comment {
    content: string,
    writer: string,
    writerAvatar: string | null,
    writerDate: string
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

export const SeriesScreen = (props: SeriesScreenProps): LayoutElement => {

    const banner = [
        {
          url : 'https://glokool.com',
          image: require('../../assets/feed_banner_01.png'),
        },
        {
          url : 'https://glokool.com',
          image: require('../../assets/feed_banner_02.png'),
        },
        {
          url : 'https://www.youtube.com/channel/UC4oTkStEsZooHYGZlDkxp1Q',
          image: require('../../assets/feed_banner_03.png'),
        },
        {
          url : 'https://www.instagram.com/glokool_official/',
          image: require('../../assets/feed_banner_04.png'),
        },
    ];
    const BannerWidth = Dimensions.get('window').width * 0.8;
    const BannerHeight = 110;

    const [refresh, setRefresh] = React.useState(true);
    const [content, setContent] = React.useState([]);
    const [qnaBoard, setQnaBoard] = React.useState<Array<BoardDocument>>([]);

    async function init_BoardMain() {
        axios.get(SERVER + '/api/contents')
          .then((result) => {
            setContent(result.data);
          })
          .catch((err) => {
    
        })     
        
        const QnA = await firestore().collection('QnABoard').get();
        var QnABoard : Array<BoardDocument> = [];
        
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

          var data = [];
          data.push(QnABoard[0]);
          data.push(QnABoard[1]);
  
          setQnaBoard(data);
          setRefresh(!refresh);
    }


    React.useEffect(() => {    

        init_BoardMain();

    }, []);

    const renderContent = ({item}) => {

        const PressContent = (id : string) => {
            props.navigation.navigate(SceneRoute.CONTENT_DETAIL, { id })
        }

        return(
            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => {PressContent(item.id)}}>
                <Image source={{ uri : item.image}} style={{ width: 216, height: 216, borderRadius: 15, resizeMode: 'stretch'}}/>
            </TouchableOpacity>
        );
    }

    return(
        <ScrollView style={{backgroundColor : 'white'}} showsVerticalScrollIndicator={false}>
           
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    mainContainer:{
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        height: 140,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: '#FFD774',
        width: '81%',
        zIndex: 100
    },
    banner: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        width: Dimensions.get('window').width * 0.8,
        height: 110,
        padding: 2,
        zIndex: 0
    },
});
