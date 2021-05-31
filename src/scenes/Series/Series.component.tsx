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
import { SERVER } from '../../server.component';
import axios from 'axios';
import { SceneRoute } from '../../navigation/app.route';

import KoreanMini from '../../assets/board/Korean_Mini.svg';
import ResidentMini from '../../assets/board/Resident_Mini.svg';
import TravlerMini from '../../assets/board/Travler_Mini.svg';
import Comment from '../../assets/board/comment.svg';
import Good from '../../assets/board/good.svg';
import Carousel from 'react-native-snap-carousel';

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

    React.useEffect(() => {    

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
           <Layout style={styles.seriesHidden}>
               <Layout >
                    <Text style={styles.seriesHiddenTxt}>{`Hidden Gems in Korea`}</Text>
               </Layout>
               <Layout style={styles.moreBtnLayout}>
                    <Text style={styles.moreBtnTxt}>{`More`}</Text>
               </Layout>
           </Layout>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    seriesHidden:{
        width: Dimensions.get('window').width * 0.8,
        alignSelf:'center',
        marginTop:250,
        flexDirection:'row',
        alignItems:'center'
    },
    seriesHiddenTxt:{
        fontFamily:'IBMPlexSansKR-SemiBold',
        fontSize:17,
        color: '#000000',
    },
    moreBtnLayout:{
        // marginLeft:30
        textAlign:'right'
    },
    moreBtn:{
        textAlign:'right',
        width:'30%'
    },
    moreBtnTxt:{
        color:'#AFAFAF',
        fontFamily:'IBMPlexSansKR-Medium',
        fontSize:15,
    }

});
