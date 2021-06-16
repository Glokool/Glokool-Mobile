import React from 'react';
import { Loading } from '../../../component/Common/Loading';
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
    ScrollView,
    View,
    TextInput
} from 'react-native';
import { BookmarkListProps } from '../../../navigation/ScreenNavigator/My.navigator';
import { SERVER } from '../../../server.component';
import { AngleLeft, Bookmark_PL } from '../../../assets/icon/Common';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import qs from "query-string";
import { NavigatorRoute, SceneRoute } from '../../../navigation/app.route';


type Detail_Item = {
    _id: string,
    id: string,
    image: string,
    title: string,
}

type Bookmark_Item = {
    _id: string,
    tours: Array<Detail_Item>,
    blog: Array<Detail_Item>,
    contents: Array<Detail_Item>,
    createdAt: string,
    uid: string,
}


const SeriesImgW = Dimensions.get('window').width;
const SeriesImgH = Dimensions.get('window').height;

export const BookmarkList = (props : BookmarkListProps) : LayoutElement => {
    const [bookmarkList, setBookmarkList] = React.useState<Array<Bookmark_Item>>([]);
    const [tours, setTours] = React.useState<Array<Detail_Item>>([]);
    const [contents, setContents] = React.useState<Array<Detail_Item>>([]);
    const [blog, setBlog] = React.useState<Array<Detail_Item>>([]);
    React.useEffect(() => {
        InitSeries();
    }, []);

    async function InitSeries() {
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
            setBookmarkList(response.data);
            setTours(response.data.tours);
            setContents(response.data.contents);
            setBlog(response.data.blog);
            console.log(response.data.blog.length);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const PressContent = (id: string) => {
        
        props.navigation.navigate(NavigatorRoute.SERIES, {
            screen: SceneRoute.SERIES_A_DETAIL, params: {Id: id}
        })
    }

    const PressTours = (id: string) => {
        props.navigation.navigate(NavigatorRoute.SERIES, {
            screen: SceneRoute.SERIES_HIDDEN_GEM_DETAIL, params: {TourCode: id}
        })
    }


    const renderTour = (item : {index: number, item: Detail_Item}) => {
        return(
            <TouchableOpacity style={styles.ImageContainer} onPress={() => {PressTours(item.item.id)}}>
              <Image source={{uri : item.item.image}} style={styles.Image} resizeMode={'stretch'}/>
              <Layout style={styles.TitleContainer}>
                <Text style={styles.TitleText}>{item.item.title}</Text>
              </Layout>
            </TouchableOpacity>
        )
      };

    const renderContent = (item : {index: number, item: Detail_Item}) => {
        return(
            <TouchableOpacity style={styles.SeriesStyle} onPress={() => {PressContent(item.item.id)}}>
              <Image source={{ uri: item.item.image }} style={styles.SeriesImgStyle} />
              <Text style={styles.SeriesTxtStyle} numberOfLines={3}>{item.item.title}</Text>
            </TouchableOpacity>
        )
      };
    
    const renderBlog = (item : {index: number, item: Detail_Item}) => {
    return(
        <TouchableOpacity style={styles.SeriesStyle} onPress={() => {props.navigation.navigate(SceneRoute.SERIES_B_DETAIL, {Id : item.item.id})}}>
            <Image source={{ uri: item.item.image }} style={styles.SeriesImgStyle} />
            <Text style={styles.SeriesTxtStyle} numberOfLines={3}>{item.item.title}</Text>
        </TouchableOpacity>
    )
    };


    return(
        <Layout style = {{backgroundColor: '#ffffff', height: SeriesImgH}}>
            {/* Top tab bar */}
            <SafeAreaView style={{flex:0, backgroundColor: '#00FF0000'}} />
            <Layout style={styles.TabBarLayout}>
                <TouchableOpacity style={styles.AngleLeftLayout} onPress={() => props.navigation.goBack()}>
                    <AngleLeft />
                </TouchableOpacity>
                <Layout style={styles.TabBarIconLayout}>
                    <Bookmark_PL />
                </Layout>
                <Text style={styles.TabBarTitleTxt}>Bookmark List</Text>
            </Layout>

            {tours.length == 0 && contents.length == 0 && blog.length == 0 ? (
                <Layout style={styles.EmptyLayout}>
                    <Text style={styles.EmptyTxt}>Empty</Text>
                </Layout>
            ) : (
                <ScrollView style={{backgroundColor: '#ffffff'}} showsVerticalScrollIndicator = {false} >

                    {/* hidden gem list */}
                    <Layout
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginLeft: 35,
                        marginTop: 5,
                    }}>
                        <FlatList
                        data={tours}
                        renderItem={renderTour}
                        contentContainerStyle={{paddingRight: 20}}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        />
                    </Layout>

                    {/* content */}
                    <Layout  
                    style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginLeft: 35,
                    marginTop: 5,
                    }}>
                        <FlatList
                        data={contents}
                        renderItem={renderContent}
                        contentContainerStyle={{paddingRight: 20}}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        />
                    </Layout>

                    {/* blog */}
                    <Layout  
                    style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginLeft: 35,
                    marginTop: 5,
                    marginBottom: 100,
                    }}>
                        <FlatList
                        data={blog}
                        renderItem={renderBlog}
                        contentContainerStyle={{paddingRight: 20}}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        />
                    </Layout>
                </ScrollView>
            )}
        </Layout>
    )
}

const styles = StyleSheet.create({
    EmptyLayout: {
        width: SeriesImgW,
        height: SeriesImgH,
        alignItems: 'center',
        marginTop: 100,
        backgroundColor: '#ffffff',
    },
    EmptyTxt: {
        fontFamily:'IBMPlexSansKR-Medium',
        fontSize: 16,
        color: '#AEAEAE',
    },
    TabBarLayout:{
        flexDirection: 'row',
        marginLeft: 30,
        alignItems: 'center',
        marginBottom: 30,
    },
    AngleLeftLayout: {
        marginRight: 20,
    },
    TabBarIconLayout: {
        marginRight: 20
    },
    TabBarTitleTxt: {
        fontFamily:'IBMPlexSansKR-Semibold',
        fontSize: 20,
        color: '#000000',
    },

    // data 
    SeriesStyle: {
        justifyContent: "center", 
        alignItems: "center",
        marginRight: 10,
        marginBottom: 10,
      },
      SeriesImgStyle: {
        width: SeriesImgW*0.34,
        height: SeriesImgW*0.34,
        borderRadius: 10,
        position:'relative'
      },
      SeriesTxtStyle:{
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 15,
        width: SeriesImgW*0.27,
        color: '#000000',
        marginVertical: 0,
        justifyContent: 'flex-start'
      },
      ImageContainer: {
        width: SeriesImgW * 0.42,
        height: SeriesImgW * 0.42,
        borderRadius: 10,
        marginRight: 5,
        marginBottom: 30,
      },
      Image: {
        width: SeriesImgW * 0.42,
        height: SeriesImgW * 0.42,
        borderRadius: 10,
      },
      TitleContainer: {
        position: 'absolute',
        bottom: 10,
        marginLeft: 15,
        backgroundColor: '#00FF0000'
      },
      TitleText: {
        fontFamily : 'BrandonGrotesque-BoldItalic',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
      },
      
})