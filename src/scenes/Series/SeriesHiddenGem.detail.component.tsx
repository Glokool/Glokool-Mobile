import React from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import { SeriesHiddenGemDetailProps } from '../../navigation/ScreenNavigator/Series.navigator';
import { 
    LayoutElement,
    Layout,
    Text,
} from '@ui-kitten/components';
import axios from 'axios';
import { SERVER } from '../../server.component';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { AngleLeft_W, Bookmark_W, Map, Plus_W } from '../../assets/icon/Common';
import { HiddenGemInKoreaFlatList } from '../../component/Series';

const ImageSize = Dimensions.get('window').width;

// // {"__v": 49, 
// "_id": "60b82e5c71a060226da193f4", 
// "banner": "https://glokool-api.s3.ap-northeast-2.amazonaws.com/tour/60b82e5c71a060226da193f4/preview/1622683228659e7431384-d35e.png", 
// "count": 4,
//  "cover": "https://glokool-api.s3.ap-northeast-2.amazonaws.com/tour/60b82e5c71a060226da193f4/preview/1622683228666be4d13ce-1c88.png", 
//  "createdAt": "2021-06-03T01:20:28.546Z", "desc": "Day and night of Songnidan-gil: Where green nature welcomes you                    
//   ", "isDeleted": false, 
//   "lat": 37.509082, 
//   "loc": "23, Baekjegobun-ro 43-gil, Songpa-gu, Seoul, Korea",
//    "lon": 127.10825, 
//    "rate": 0, 
//    "rateCount": 0, 
//    "region": "seoul",
//     "tag": ["picnic", "trendy", "cityview"], 
//     "title": "Songnidan-gil", 
//     "visible": true}
// 

type TourData = {
    _id : string,
    banner: string,
    count: number,
    cover: string,
    createdAt: string,
    desc : string,
    isDeleted: boolean,
    lat: string,
    lon: string,
    loc: string,
    rate: string,
    rateCount: string,
    region: string,
    tag: Array<string>,
    title: string,
    visible: boolean
}

export const SeriesHiddenGemDetailScreen = (props : SeriesHiddenGemDetailProps) : LayoutElement => {

    const TourCode = props.route.params.TourCode;
    const [loading, setLoading] = React.useState<boolean>(false);
    const [data, setData] = React.useState<TourData>();
    const [Height, setHeight] = React.useState<number>(0);
    const [selectedButton, setSelectedButton] = React.useState<number>(0);

    React.useEffect(() => {
        InitHiddenGemDetail();
    }, []);

    async function InitHiddenGemDetail() {
        const HiddenGemDetailData = await axios.get(SERVER + '/api/tours/' + TourCode);
        setData(HiddenGemDetailData.data);
    }

    async function PressPlus() {

    }

    return(
        <Layout style={styles.MainContainer}>

            <ScrollView showsVerticalScrollIndicator={false} onScroll={(e) => setHeight(e.nativeEvent.contentOffset.y)}>
                {/* 탑 이미지 */}
                <Layout style={styles.TopImageContainer}>
                    <Image source={{ uri : data?.banner }} style={styles.TopImageContainer} resizeMode={'stretch'}/>

                    <Layout style={styles.DescContainer}>
                        <Text style={styles.DescText}>{data?.desc}</Text>
                    </Layout>
                </Layout>

                {/* 버튼 컨테이너 */}
                <Layout style={styles.ButtonContainer}>

                    <TouchableOpacity style={styles.TextButton}>
                        <Map />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.TextButton} onPress={() => setSelectedButton(0)}>
                        <Text style={(selectedButton === 0)? styles.TextButtonText_S : styles.TextButtonText}>Attraction</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.TextButton} onPress={() => setSelectedButton(1)}>
                        <Text style={(selectedButton === 1)? styles.TextButtonText_S : styles.TextButtonText}>Restaurant</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.TextButton} onPress={() => setSelectedButton(2)}>
                        <Text style={(selectedButton === 2)? styles.TextButtonText_S : styles.TextButtonText}>Cafe</Text>
                    </TouchableOpacity>

                </Layout>




            </ScrollView>

            


            {/* 탑 탭 바 */}
            <Layout style={styles.TopTabBar}>

                <Layout style={styles.TopTabBarContainer}>
                    
                    <TouchableOpacity style={styles.BackButton} onPress={() => props.navigation.goBack()}>
                        <AngleLeft_W />
                    </TouchableOpacity>

                    <Text style={styles.TitleText}>{data?.title}</Text>

                </Layout>

                <Layout style={styles.TopTabBarContainer2}>
                    <SafeAreaView style={{flex:0, backgroundColor: '#00FF0000'}} />
                    <TouchableOpacity style={styles.BookmarkButton}>
                        <Bookmark_W />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.PlusButton}>
                        <Plus_W />
                    </TouchableOpacity>

                </Layout>
                
            </Layout>


        </Layout>
    );
}

const styles = StyleSheet.create({

    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    TopImageContainer: {
        width: ImageSize,
        height: ImageSize,
    },
    TopTabBar: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 50,
        backgroundColor: '#00FF0000',
        alignItems: 'center',
        flexDirection: 'row',
    },
    TopTabBarContainer: {
        flexDirection: 'row',
        backgroundColor: '#00FF0000',
        flex: 1
    },
    TopTabBarContainer2: {
        flexDirection: 'row',
        backgroundColor: '#00FF0000',
        flex: 1,
        justifyContent: 'flex-end'
    },
    BackButton: {
        padding: 10,
        marginLeft: 20,
    },
    TitleText:{
        color: 'white',
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 23,
        marginLeft: 30
    },
    BookmarkButton: {
        padding: 10,
        marginRight: 10
    },
    PlusButton: {
        padding: 10,
        marginRight: 20
    },
    DescContainer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        backgroundColor: '#00FF0000'
    },
    DescText: {
        fontFamily: 'IBMPlexSansKR-Text',
        color: 'white',
        fontSize: 15,
    },
    ButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 15
    },
    TextButton: {
        padding: 10,
        alignItems: 'center'
    },
    TextButtonText: {
        fontFamily: 'BrandonGrotesque-Medium',
        fontSize: 18,
        color: '#AEAEAE'
    },
    TextButtonText_S : {
        fontFamily: 'BrandonGrotesque-Medium',
        fontSize: 18,
        color: 'black'
    }

});