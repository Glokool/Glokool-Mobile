import React from 'react'
import firestore from '@react-native-firebase/firestore'
import { BoardScreenProps } from '../../navigation/board.navigator';
import { Layout, LayoutElement } from '@ui-kitten/components'
import { 
    Dimensions,
    Image,
    ImageBackground,
    Linking,
    SafeAreaView, 
    StyleSheet, 
    Text, 
    TouchableOpacity 
} from 'react-native';
import Carousel from 'react-native-banner-carousel';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
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

export const BoardScreen = (props: BoardScreenProps): LayoutElement => {

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

        }

        return(
            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => {PressContent(item.id)}}>
                <Image source={{ uri : item.image}} style={{ width: 216, height: 216, borderRadius: 15, resizeMode: 'stretch'}}/>
            </TouchableOpacity>
        );
    }

    return(
        <ScrollView style={{backgroundColor : 'white'}}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            
            {/* 캐러셀 */}
            <Layout style={styles.mainContainer}>
                <Carousel
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={BannerWidth}
                >
                {(banner.map((item) =>   
                    <TouchableOpacity onPress={() => {Linking.openURL(item.url)}} style={styles.banner}>
                        <Image style={{width: BannerWidth, height: BannerHeight, resizeMode: 'stretch', borderRadius: 5 }} source={item.image}/>
                    </TouchableOpacity>
                ))}
                    
                </Carousel>

            </Layout>

                   

            <ImageBackground source={require('../../assets/board/background.png')}  style={{ width: '100%' }} resizeMode={'stretch'}>

                <Layout style={{ padding: 30, backgroundColor: '#00FF0000' }}>

                    {/* 컨텐츠 표시 */}
                    <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10, backgroundColor: '#00FF0000' }}>

                        <Layout style={{ flex: 3, backgroundColor: '#00FF0000' }}>
                            <Text style={{ fontSize: 22, fontFamily: 'BrandonGrotesque-Black', color: '#F9D783' }}>Contents to See</Text>
                        </Layout>

                        <TouchableOpacity style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#00FF0000', borderWidth: 1, borderColor: '#F9D783', borderRadius: 20 }}>
                            <Text style={{ fontSize: 15, fontFamily: 'BrandonGrotesque-Medium', color: '#FFD878', backgroundColor: '#00FF0000' }} onPress={() => props.navigation.navigate(SceneRoute.CONTENT_LIST)}>MORE</Text>
                        </TouchableOpacity>       

                    </Layout>

                    <Layout style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10, backgroundColor: '#00FF0000' }}>

                        <FlatList
                            style={{backgroundColor: '#00FF0000', padding: 0}}
                            data={content}
                            renderItem={renderContent}
                            keyExtractor={item => item.id}
                            horizontal={true}
                            contentContainerStyle={{ backgroundColor: '#00FF0000', padding: 0 }}
                        />

                    </Layout>


                {/* Q&A 게시판 확인 */}
                <Layout style={{ borderWidth: 1, borderColor: '#F9D783', borderRadius: 10, marginVertical: 10, padding: 20, backgroundColor: 'white' }}>
                    
                    <Layout style= {{ flexDirection: 'row', marginBottom: 10 }}>
                        <Layout style={{ flex: 3, backgroundColor: '#00FF0000' }}>
                            <Text style={{ fontSize: 22, fontFamily: 'BrandonGrotesque-Black', color: '#F9D783' }}>{`Newest Q&A`}</Text>
                        </Layout>

                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', backgroundColor: '#00FF0000' }}>
                            <Text style={{ fontSize: 15, fontFamily: 'BrandonGrotesque-Medium', color: '#FFD878', backgroundColor: '#00FF0000' }} onPress={() => props.navigation.navigate(SceneRoute.BOARD_LIST)}>MORE</Text>
                        </TouchableOpacity>                        
                   </Layout>

                   
                   {qnaBoard.map((item, index) => 
                        <Layout style={{ marginVertical: 10, backgroundColor: '#00FF0000' }}>
                    
                            <Layout style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', maxWidth: '80%', backgroundColor: '#00FF0000' }}>
                                    <Layout>
                                        {(item.writerAvatar != '')?
                                            <Image source={{ uri : item.writerAvatar }} style={{ borderRadius: 50, width: 30, height: 30 }}/>
                                        :
                                            <Image source={require('../../assets/profile/profile_01.png')} style={{ borderRadius: 50, width: 30, height: 30 }}/>
                                        }

                                        {(item.writerType == 'K')}

                                        {(item.writerType === 'K')?
                                            <KoreanMini style={{ position: 'absolute', bottom: 0, right: -10 }}/>
                                        :
                                        (item.writerType === 'R')?
                                            <ResidentMini style={{ position: 'absolute', bottom: 0, right: -10 }}/>
                                        :
                                            <TravlerMini style={{ position: 'absolute', bottom: 0, right: -10 }}/>
                                        }

                                    </Layout>
        
                                    <Layout style={{ marginLeft: 15 }}>
                                        <Text style={{ fontSize: 16, fontFamily: 'IBMPlexSansKR-SemiBold' }} numberOfLines={1} >{item.title}</Text>
                                    </Layout>                        
                            </Layout>
 
                            <Layout style={{ backgroundColor: '#00FF0000' }}>
                                <Text style={{ fontSize: 14, fontFamily: 'IBMPlexSansKR-Medium' }} numberOfLines={2}>{item.content}</Text>
                            </Layout>

                            <Layout style={{ flexDirection: 'row', backgroundColor: '#00FF0000' }}>

                                <Layout style={{ flexDirection: 'row', alignItems: 'center', flex: 1, backgroundColor: '#00FF0000'}}>
                                    <Text style={{ fontSize: 10, fontFamily: 'IBMPlexSansKR-Text', color: '#878787', marginRight: 10 }} >{`${item.writeDate.toDate().getMonth() + 1}/${item.writeDate.toDate().getDate()}`}</Text>                                    
                                    <Text style={{ fontSize: 10, fontFamily: 'IBMPlexSansKR-Text', color: '#878787', marginRight: 10 }} >{item.writer}</Text>     
                                </Layout>

                                <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#00FF0000' }}>
                                    
                                    <Good style={{ backgroundColor: '#00FF0000' }}/>
                                    <Text style={{ fontSize: 11, fontFamily: 'IBMPlexSansKR-Text', color: '#878787', marginHorizontal: 5, backgroundColor: '#00FF0000' }} >{item.plus.length}</Text>

                                    <Comment style={{ backgroundColor: '#00FF0000' }}/>
                                    <Text style={{ fontSize: 11, fontFamily: 'IBMPlexSansKR-Text', color: '#878787', marginHorizontal: 5, backgroundColor: '#00FF0000' }} >{item.comment.length}</Text>

                                </Layout>

                            </Layout> 

                        </Layout>
                    )}
                  

                   


                   <Layout>
                       





                   </Layout>

                </Layout>


                
                </Layout>

            </ImageBackground> 
            


            
            



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
        marginVertical: 10
    },
    banner: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        width: Dimensions.get('window').width * 0.8,
        height: 110,
        padding: 2,
    },
});
