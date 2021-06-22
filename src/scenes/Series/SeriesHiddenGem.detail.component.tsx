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
import { AngleLeft, AngleLeft_W, Bookmark, Bookmark_P, Bookmark_W, Map, Plus, Plus_W, Plus_P } from '../../assets/icon/Common';
import { HiddenGemInKoreaFlatList } from '../../component/Series';
import { HiddenGemInKoreaDetailList } from '../../component/Series/HiddenGemInKoreaDetail.List';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import qs from "query-string";

const ImageSize = Dimensions.get('window').width;

type TourData = {
    tourCode : string;
    title : string;
    cover: string;
    desc : string;
    tag: Array<string>;
    plus: Array<string>;
    lat: string;
    lon: string;
}

type DetailData = {
    banner: string;
    desc: string;
    visible: boolean;
    title: string;
    placeCode: string;
    lat: string;
    lon: string;
}

type GlokoolTourData = {
    tour : TourData;
    attraction : Array<DetailData>;
    restaurant: Array<DetailData>;
    cafe : Array<DetailData>;
    lat: string;
    lon: string;
}


export const SeriesHiddenGemDetailScreen = (props : SeriesHiddenGemDetailProps) : LayoutElement => {

    const TourCode = props.route.params.TourCode;
    const [loading, setLoading] = React.useState<boolean>(false);
    const [map, setMap] = React.useState<boolean>(false);
    const [ListData, setListData] = React.useState<DetailData>();
    const [content, setContent] = React.useState<GlokoolTourData>();
    const [Height, setHeight] = React.useState<number>(0);
    const [selectedButton, setSelectedButton] = React.useState<number>(0);
    const [bookmarkList, setBookmarkList] = React.useState([]);

    const user = auth().currentUser;
    const uid = user?.uid;

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {

        });
    
        return unsubscribe;
    }, [props.navigation]);

    React.useEffect(() => {
        InitHiddenGemDetail();
    }, []);

    async function InitHiddenGemDetail() {

        const HiddenGemDetailData = await axios.get(SERVER + '/api/tours/' + TourCode + '/places');
        setContent(HiddenGemDetailData.data);


        // 북마크 조회 하기 위한 함수 
        const authToken = await auth().currentUser?.getIdToken();
        var config = {
            method: 'get',
            url: SERVER + '/api/users/bookmark',
            headers: { 
                'Authorization': 'Bearer ' + authToken,
                }
            };
    
        axios(config)
        .then(function (response) {
            let data = response.data.tours;
            let dataTemp = [];
            
            data.forEach(item => {
                dataTemp.push(item.id);
            });

            setBookmarkList(dataTemp);
        })
        .catch(function (error) {
            console.log(error);
        });

    }
    const PressBookmark = async() => {
        const authToken = await auth().currentUser?.getIdToken();
        var axios = require('axios');
        var data = qs.stringify({
            tourCode: content?.tour.tourCode,
        });
        var config = {
        method: 'post',
        url: SERVER + '/api/users/bookmark',
        headers: { 
            Authorization: 'Bearer ' + authToken, 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
        };

        axios(config)
        .then((response) => {
            InitHiddenGemDetail();
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    const PressPlus = async() => {
        const authToken = await auth().currentUser?.getIdToken();
        var config = {
            method: 'patch',
            url: SERVER + "/api/tours/" + content?.tour.tourCode + "/like" ,
            headers: {
                Authorization: "Bearer " + authToken,
                "Content-Type": "application/x-www-form-urlencoded",
            },
          };
    
        axios(config)
        .then((response) => {
            InitHiddenGemDetail();
        })
        .catch((error) => {
            console.log(error);
        });
    }



    return(
        <Layout style={styles.MainContainer}>

            <ScrollView showsVerticalScrollIndicator={false} onScroll={(e) => setHeight(e.nativeEvent.contentOffset.y)}>
                {/* 탑 이미지 */}
                <Layout style={styles.TopImageContainer}>
                    <Image source={{ uri : content?.tour.cover }} style={styles.TopImageContainer} resizeMode={'stretch'}/>

                    <Layout style={styles.DescContainer}>
                        <Text style={styles.DescText}>{content?.tour.desc}</Text>
                    </Layout>
                </Layout>

                {/* 버튼 컨테이너 */}
                <Layout style={styles.ButtonContainer}>

                    <TouchableOpacity style={styles.TextButton} onPress={() => setMap(true)}>
                        <Map />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.TextButton} onPress={() => {
                        setSelectedButton(0) 
                        setMap(false)
                    }}
                    >
                        <Text style={(selectedButton === 0)? styles.TextButtonText_S : styles.TextButtonText}>Attraction</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.TextButton} onPress={() => {
                        setSelectedButton(1) 
                        setMap(false)
                    }}
                    >
                        <Text style={(selectedButton === 1)? styles.TextButtonText_S : styles.TextButtonText}>Restaurant</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.TextButton} onPress={() => {
                        setSelectedButton(2) 
                        setMap(false)
                    }}
                    >
                        <Text style={(selectedButton === 2)? styles.TextButtonText_S : styles.TextButtonText}>Cafe</Text>
                    </TouchableOpacity>

                </Layout>

                {/* 리스트 뷰 */}

                {(map === true)?                
                    <Layout style={styles.MapContainer}>
                        <MapView
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={{width: ImageSize - 60, height: ImageSize}}
                            region={{
                                latitude: parseFloat(content?.tour.lat),
                                longitude: parseFloat(content?.tour.lon),
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            }}
                        >

                        <Marker
                            coordinate={{ latitude : parseFloat(content?.tour.lat) , longitude : parseFloat(content?.tour.lon) }}
                            image={require('../../assets/icon/Map/Glokool.png')}
                        />

                        {(content?.attraction.map((item, index) => 
                            <Marker
                                coordinate={{ latitude : parseFloat(item.lat) , longitude : parseFloat(item.lon)}}
                                image={require('../../assets/icon/Map/Attraction.png')}
                                title={item.title}
                            />
                        ))}

                        {(content?.restaurant.map((item, index) => 
                            <Marker
                                coordinate={{ latitude : parseFloat(item.lat) , longitude : parseFloat(item.lon)}}
                                image={require('../../assets/icon/Map/Restaurant.png')}
                                title={item.title}
                            />
                        ))}

                        {(content?.cafe.map((item, index) => 
                            <Marker
                                coordinate={{ latitude : parseFloat(item.lat) , longitude : parseFloat(item.lon)}}
                                image={require('../../assets/icon/Map/Cafe.png')}
                                title={item.title}
                            />
                        ))}
                        </MapView>
                    </Layout>
                :
                    <Layout style={styles.DetailDataContainer}>
                        {(selectedButton === 0)? // 어트랙션을 선택했을 때                        
                            <HiddenGemInKoreaDetailList navigation={props.navigation} route={props.route} data={content?.attraction} type={'attr'} />
                        :
                        (selectedButton === 1)? // 레스토랑을 선택했을 때
                            <HiddenGemInKoreaDetailList navigation={props.navigation} route={props.route} data={content?.restaurant} type={'rest'} />
                        :
                            <HiddenGemInKoreaDetailList navigation={props.navigation} route={props.route} data={content?.cafe} type={'cafe'} />
                        }

                    </Layout>
                }
                
            </ScrollView>


            {/* 탑 탭 바 */}
            {(Height >= ImageSize - 100)? 
            <Layout style={styles.TopTabBar_B}>

                    <Layout style={styles.TopTabBarContainer}>
                        
                        <TouchableOpacity style={styles.BackButton} onPress={() => props.navigation.goBack()}>
                            <SafeAreaView style={{flex:0, backgroundColor: '#00FF0000'}} />
                            <AngleLeft />
                        </TouchableOpacity>

                        <Layout style={{backgroundColor: '#00ff0000'}}>
                            <SafeAreaView style={{flex:0, backgroundColor: '#00FF0000'}} />
                            <Text style={styles.TitleText_B}>{content?.tour.title}</Text>
                        </Layout>
                        
                    </Layout>

                <SafeAreaView />

                <Layout style={styles.TopTabBar_B}>

                        <Layout style={styles.TopTabBarContainer}>
                            
                            <TouchableOpacity style={styles.BackButton} onPress={() => props.navigation.goBack()}>
                                <SafeAreaView style={{flex:0, backgroundColor: '#00FF0000'}} />
                                <AngleLeft />
                            </TouchableOpacity>

                            <Layout style={{backgroundColor: '#00ff0000'}}>
                                <SafeAreaView style={{flex:0, backgroundColor: '#00FF0000'}} />
                                <Text style={styles.TitleText_B}>{content?.tour.title}</Text>
                            </Layout>
                            

                        </Layout>

                        <Layout style={styles.TopTabBarContainer2}>
                            
                            <TouchableOpacity style={styles.BookmarkButton} onPress={() => PressBookmark()}>
                                <SafeAreaView style={{flex:0, backgroundColor: '#00FF0000'}} />
                                {bookmarkList.indexOf(TourCode) == -1 ? 
                                    <Bookmark />
                                    :
                                    <Bookmark_P />
                                }
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.PlusButton} onPress={() => PressPlus()}>
                                <SafeAreaView style={{flex:0, backgroundColor: '#00FF0000'}} />
                                {content?.tour.plus == null ? (
                                    <Plus />
                                ) : (
                                    content?.tour.plus.indexOf(uid) == -1 ? (
                                        <Plus />
                                    ) : (
                                        <Plus_P />
                                    )
                                )}
                            </TouchableOpacity>

                        </Layout>

                </Layout>

            </Layout>

            :

            <Layout style={styles.TopTabBar}>

                <Layout style={styles.TopTabBarContainer}>
                    
                    <TouchableOpacity style={styles.BackButton} onPress={() => props.navigation.goBack()}>
                        <SafeAreaView style={{flex:0, backgroundColor: '#00FF0000'}} />
                        <AngleLeft_W />
                    </TouchableOpacity>

                    <Layout style={{backgroundColor: '#00ff0000'}}>
                        <SafeAreaView style={{flex:0, backgroundColor: '#00FF0000'}} />
                        <Text style={styles.TitleText}>{content?.tour.title}</Text>
                    </Layout>

                </Layout>

                <Layout style={styles.TopTabBarContainer2}>

                    <TouchableOpacity style={styles.BookmarkButton} onPress={() => PressBookmark()}>
                        <SafeAreaView style={{flex:0, backgroundColor: '#00FF0000'}} />
                        {bookmarkList.indexOf(TourCode) == -1 ? 
                            <Bookmark_W />
                            :
                            <Bookmark_P />
                        }
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.PlusButton} onPress={() => PressPlus()}>
                         <SafeAreaView style={{flex:0, backgroundColor: '#00FF0000'}} />
                        {content?.tour.plus == null ? (
                                <Plus_W />
                            ) : (
                                content?.tour.plus.indexOf(uid) == -1 ? (
                                    <Plus_W />
                                ) : (
                                    <Plus_P />
                                )
                            )}
                    </TouchableOpacity>

                </Layout>
                
            </Layout>
            }
            

           


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
    TopTabBar_B: {
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
    TitleText_B:{
        color: 'black',
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
    },
    DetailDataContainer: {
        width: '100%',
        backgroundColor: '#00FF0000',
        marginBottom: 100
    },
    MapContainer: {
        alignItems: 'center',
        marginBottom: 50
    }

});