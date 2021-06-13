import React from 'react'
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
import { NavigatorRoute } from "../../navigation/app.route"
import { SERVER } from '../../server.component';
import axios from 'axios';
import { SeriesBDetailInfoProps } from '../../navigation/ScreenNavigator/Series.navigator';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import moment, { max } from "moment";
import { SceneRoute } from '../../navigation/app.route';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoUp, GrayArrow, AngleLeft } from '../../assets/icon/Common';
import { CommentSending, CountNum, Comments1, Comments2, Comments3, Comments4, Comments5, Comments6, Comments6_s } from '../../assets/icon/Series';
import qs from "query-string";


type recommendation_Item = {
    _id: string,
    image: string,
    title: string,
}

type Comments_Item = {
    writer: {
        uid: string,
        name: string,
        avatar: string,
        grade: string,
    },
    comment: string,
    parentComment: string,
    isDeleted: Boolean,
    createdAt: Date,
    updatedAt: Date,
    plus: Array<string>,
}

type ContentImg_Item = {
    _id: string,
    author: string,
    img: string,
}

type Content_Item = {
    _id: string,
    desc: string,
    images: Array<ContentImg_Item>,
    title: string,
}

type Series_Item = {
    count:string,
    cover: string,
    createdAt: Date,
    desc: string,
    plus: Array<string>,
    smallTitle: string,
    title: string,
    _id: string,
    comments: Array<Comments_Item>,
    content: Array<Content_Item>,
    recommendation: Array<recommendation_Item>
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const SeriesBInfoScreen = (props : SeriesBDetailInfoProps) : LayoutElement => {
    const ScrollVewRef = React.useRef(null);
    const [height, setHeight] = React.useState<number>(0);
    const [Id, setId] = React.useState(props.route.params.Id);
    const [content, setContent] = React.useState<Series_Item>();
    const [contentInfo, setContentInfo] = React.useState<Array<Content_Item>>([]);
    const [carouselIndex, setCarouselIndex] = React.useState<number>(1);
    const [recommendation, setRecommendation] = React.useState<Array<recommendation_Item>>([]);
    const [comments, setComments] = React.useState<Array<Comments_Item>>([]);
    const [nowComment, setNowComment] = React.useState('');
    const user = auth().currentUser;
    const uid = user?.uid;

    React.useEffect(() => {
        InitSeries();
    }, []);

    async function InitSeries() {
        var Content = await axios.get(SERVER + '/api/blog/' + Id);
        setContent(Content.data);
        setContentInfo(Content.data.contents);
        setRecommendation(Content.data.recommendation);
        console.log(Content.data.recommendation)
        setComments(Content.data.comments);
    }

    const RenderCarousel = (item : { item : ContentImg_Item, index : number }) => {
        return(
            <Layout>
                <Image source={{ uri : item.item.img }} style={styles.ImageContainer} />
            </Layout>    
        )
    }

    const CommentSendingPress = async() => {
        const authToken = await auth().currentUser?.getIdToken();
        
        const data = qs.stringify({
            content: Id,
            writer: uid,
            name: user?.displayName,
            avatar: user?.photoURL,
            grade: 'traveler',
            comment: nowComment, 
        });
    
        var config = {
          method: "post",
          url: SERVER + "/api/blog/comments",
          headers: {
            Authorization: "Bearer " + authToken,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data,
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setNowComment('');
                InitSeries();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const DeleteComment = async(id) => {
        const authToken = await auth().currentUser?.getIdToken();
        var config = {
            method: "delete",
            url: SERVER + "/api/blog/" + content?._id + "/comments/" + id ,
            headers: {
              Authorization: "Bearer " + authToken,
              "Content-Type": "application/x-www-form-urlencoded",
            },
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                InitSeries();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const LikeComment = async(id) => {
        console.log(id);
        const authToken = await auth().currentUser?.getIdToken();
        var config = {
            method: 'patch',
            url: SERVER + "/api/blog/" + content?._id + "/comments/" + id + "/like",
            headers: {
                Authorization: "Bearer " + authToken,
                "Content-Type": "application/x-www-form-urlencoded",
            },
          };

          axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                InitSeries();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    return (
        <Layout>
            <ScrollView style={{backgroundColor: '#ffffff'}} showsVerticalScrollIndicator = {false} ref={ScrollVewRef} onScroll={(e) => setHeight(e.nativeEvent.contentOffset.y)}>
            {height >= windowWidth - 100 ? 
                <Layout>
                    <SafeAreaView style={{flex:0, backgroundColor: '#00FF0000'}} />
                    <Layout style={{height: 50}}/>
                </Layout>
             : (null) }
            
                <Layout>
                    <Image source={{ uri : content?.cover }} style={styles.CoverImg} />
                </Layout>
                <Layout style={styles.TopTxtContainer}>
                    <Text style={styles.TitleTxt}>{content?.title}</Text>
                    <Text style={styles.SmallTitleTxt}>{content?.smallTitle}</Text>
                    <Text style={styles.descTxt}>{content?.desc}</Text>
                    <Text style={styles.LetsBeginTxt}>Let's Begin ! </Text>
                </Layout>

                {/* content carousel */}
                {(contentInfo.map((item) =>
                    <Layout style={styles.CarouselContainerLayout}>
                        <Carousel
                            data={item.images}
                            layout={'default'}
                            renderItem={RenderCarousel}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={windowWidth}
                            hasParallaxImages={false}
                            firstItem={0}
                            inactiveSlideScale={0.8}
                            inactiveSlideOpacity={0.7}
                            inactiveSlideShift={0}
                            // containerCustomStyle={styles.CarouselInsideContainer}
                            loop={true}
                            autoplay={false}
                            onSnapToItem={(index : number) => setCarouselIndex(index) }
                        />
                        <Pagination
                            dotsLength={item.images.length}
                            containerStyle={styles.CarouselDotContainer}
                            activeDotIndex={carouselIndex}
                            dotColor={'#7777FF'}
                            dotStyle={styles.CarouselDot}
                            inactiveDotColor={'#7777FF'}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={1}
                            
                        />
                        <Layout style={styles.ContentTxtLayout}>
                            <Text style={styles.ContentTitleTxt}>{item.title}</Text>
                            <Text style={styles.ContentDescTxt}>{item.desc}</Text>
                        </Layout>
                    </Layout>
                ))}
                
                {/* 땡큐 버튼 및 Go up 버튼 */}
                <Layout style={styles.FinalConatiner}>
                    <Text style={styles.ThankyouText}>Thank You!</Text>
                    
                    <TouchableOpacity style={styles.GoUpButton} onPress={() => ScrollVewRef.current.scrollTo({ x: 0, y: 0, animated: true })}>
                        <Text style={styles.ThankyouText}>Go Up <GoUp /></Text>
                    </TouchableOpacity>
                </Layout>


                {/* check out more */}
                {recommendation ? (
                    <Layout style={styles.CheckMoreContainerLayoutStyle}>
                    <Layout style={styles.CheckMoreLayoutStyle}><Text style={styles.CheckMoreTxtStyle}>{`Check out more`}</Text></Layout>
                    {(recommendation.map((item) =>
                    <Layout style={styles.CheckMoreLayoutStyle}>
                        <TouchableOpacity onPress={() => {setId(item._id)}}>
                            <Image source={{ uri : item.image }} style={styles.RecommendationImg} />
                            <Text style={styles.RecommendationTxt}>{item.title}</Text>
                        </TouchableOpacity>
                    </Layout>
                    ))}
                </Layout>
                ) : null}
                

                {/* 그레이색 배경 */}
                <Layout style={styles.PurpleContainerLayoutStyle} >
                    <GrayArrow style={styles.PurpleArrow} />
                    <Layout style={styles.PurpleTopLayoutStyle}>
                        <Text style={styles.PurpleTopTxtStyle}>
                            {`Can't find the information you need?`}
                            {"\n"}
                            {`Ask our travel assistants for more! `}
                        </Text>
                        <Layout style={styles.PurpleBottomContainerLayoutStyle}>
                            <Layout style={styles.PurpleBottomLayoutStyle} onTouchStart = {() => {props.navigation.navigate(NavigatorRoute.CHAT);}}>
                                <Text style={styles.PurpleBottomTxtStyle}>{`Go to Glochat >>`}</Text>
                            </Layout>
                        </Layout>
                    </Layout>
                </Layout>
                
                {/* Comments */}
                <Layout style={styles.CommentsConainer}>
                    <Layout style={styles.CommentsInnerConainer}>
                        {/* comments title */}
                        <Layout style={styles.CommentsTitleLayout}>
                            <Text style={styles.CommentsTitleTxt}>Comments</Text>
                        </Layout>
                        
                        {/* comments content */}
                        {(comments.map((item) =>
                            <Layout style={styles.CommentsListContainerLayout}>
                                <Layout style={styles.CommentsAuthorContainerLayout}>
                                    <Layout style={styles.CommentsAuthorInner01Layout}></Layout>
                                    <Layout style={styles.CommentsAuthorInner02Layout}>
                                        <Layout>
                                            <Text style={styles.CommentsAuthorInnerNameTxt02Layout}>{item.writer.name}</Text>
                                        </Layout>
                                        <Layout style={styles.CommentsAuthorInner02InnerLayout}>
                                            <Layout>
                                                <Text style={styles.CommentsAuthorInnerDateTxt02Layout}>{moment(item.createdAt).format("MM/DD hh:mm")}</Text>
                                            </Layout>
                                            {/* 좋아요 아이콘 & 갯수 표시 */}
                                            {item.plus.length != 0 ? (
                                                <Layout style= {styles.CommentsAuthorInner02PlusContainerLayout}>
                                                    <Comments6_s style= {styles.CommentsAuthorInner02PlusIconLayout} />
                                                    <Text style={styles.CommentsAuthorInnerPlusNum02Layout}>{item.plus.length}</Text>
                                                </Layout>
                                            ) : null}
                                            
                                        </Layout>
                                    </Layout>
                                    {uid == item.writer.uid ? (
                                    <Layout style={styles.CommentsAuthorInner03Layout}>
                                        <TouchableOpacity style={styles.CommentsAuthorInnerIcons03Layout} onPress={() => {DeleteComment(item._id)}}>
                                            <Comments4 />
                                        </TouchableOpacity>
                                        {/* <TouchableOpacity style={styles.CommentsAuthorInnerIcons03Layout}>
                                            <Comments5 />
                                        </TouchableOpacity> */}
                                    </Layout>
                                    ) : (
                                    <Layout style={styles.CommentsAuthorInner03Layout}>
                                          {/* <TouchableOpacity style={styles.CommentsAuthorInnerIcons03Layout}>
                                            <Comments1 />
                                        </TouchableOpacity> */}
                                        {item.plus.indexOf(uid) != -1 ?  (
                                        <TouchableOpacity style={styles.CommentsAuthorInnerIcons03Layout} onPress={() => {LikeComment(item._id)}}>
                                            <Comments6 />
                                        </TouchableOpacity>
                                        ) : (
                                        <TouchableOpacity style={styles.CommentsAuthorInnerIcons03Layout} onPress={() => {LikeComment(item._id)}}>
                                            <Comments2 />
                                        </TouchableOpacity>
                                        )}
                                        {/* <TouchableOpacity style={styles.CommentsAuthorInnerIcons03Layout}>
                                            <Comments3 />
                                        </TouchableOpacity> */}
                                    </Layout>
                                    )}
                                    
                                </Layout>
                                <Layout style={styles.CommentsContentContainerLayout}>
                                    <Text style={styles.CommentsContentTxtLayout}>
                                        {item.comment}
                                    </Text>
                                </Layout>
                            </Layout>
                        ))}
                    </Layout>

                    {/* 댓글 입력 */}
                    <Layout style={styles.CommentsTextLayout}>
                        <TextInput  style={styles.CommentsTextInput}
                        // underlineColorAndroid="transparent"
                        placeholder="Write your comment"
                        placeholderTextColor="#D1D1D1"
                        autoCapitalize="none" 
                        onChangeText={text => setNowComment(text)}
                        value = {nowComment}
                        ></TextInput>
                        <TouchableOpacity style ={styles.CommentSendingTouch} onPress={CommentSendingPress} >
                            <CommentSending  />
                        </TouchableOpacity>
                    </Layout>
                </Layout>

            </ScrollView>

            {/* 탑탭바 */}
            {height >= windowWidth - 100 ? (
                <Layout style={styles.ContainerLayoutAngleLeft}>
                    <SafeAreaView style={{flex:0, backgroundColor: '#00FF0000'}} />
                    <TouchableOpacity style={styles.ContainerAngleLeft} onPress={() => props.navigation.goBack()}>
                        <AngleLeft style={styles.AngleLeft} />
                    </TouchableOpacity>
                </Layout>
            ) : (null) }
            

        </Layout>
    )
}

const styles = StyleSheet.create({
    ContainerLayoutAngleLeft: {
        width: '100%',
        height: 50,
        position: 'absolute',
        top: 0,
        backgroundColor: '#ffffff',
        // borderWidth: 1,
        // borderColor:'red',
    },
    ContainerAngleLeft: {
        marginLeft: 20,
        padding: 20,
    },
    AngleLeft: {
    },

    CoverImg:{
        width: windowWidth,
        height: windowWidth,
    },
    TopTxtContainer: {
        marginLeft: 20,
        marginRight: 40,
    },
    TitleTxt: {
        marginTop: 20,
        fontFamily:'BrandonGrotesque-BoldItalic',
        fontSize:26,
        color: '#000000',
    },
    SmallTitleTxt: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 20,
        color: '#999999',
    },
    descTxt:{
        marginTop: 10,
        fontFamily:'IBMPlexSansKR-Text',
        fontSize:16,
        color: '#414141',
    },
    LetsBeginTxt: {
        marginTop: 20,
        marginBottom: 20,
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize:18,
        color: '#7777FF',
    },
    CarouselContainerLayout: {
        width: windowWidth,
        marginBottom: 30,
        // borderWidth: 1,
        // borderColor: 'red',
    },
    CarouselInsideContainer: {
        marginLeft: -16,
        alignItems: 'center',
        width: windowWidth,
        height: windowWidth,
    },
    CarouselDotContainer: {
        bottom : 8,
        backgroundColor: '#00FF0000',
        opacity: 40,
        alignSelf: 'center',
        // marginVertical: -5,
        // borderWidth: 1,
        // borderColor: 'red',
    },
    CarouselDot: {
        width: 13,
        height: 4,
        borderRadius: 30, 
    },
    ImageContainer: {
        width: windowWidth,
        height: windowWidth,
        resizeMode: 'cover',
        // borderWidth: 1,
        // borderColor: 'pink'
    },
    ContentTxtLayout: {
        marginLeft: 20,
        marginRight: 50,
        marginTop: 5,
        // borderWidth: 1,
        // borderColor: 'pink'
    },
    ContentTitleTxt: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize:23,
        color: '#000000',
    },
    ContentDescTxt: {
        fontFamily:'IBMPlexSansKR-Text',
        fontSize:16,
        color: '#414141',
        marginTop: 10,
    },
    // thank you btn
    FinalConatiner: {
        marginHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    ThankyouText: {
        color:'#7777FF',
        fontFamily:'BrandonGrotesque-BoldItalic',
        fontSize: 17,
    },
    GoUpButton: {
        borderRadius: 15,
        width: 100,
        height: 40,
        backgroundColor: '#F6F6F6',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    CheckMoreContainerLayoutStyle: {
        width: windowWidth,
        backgroundColor: '#F6F6F6',
        flexDirection: 'row',
        marginTop: 20,
        // borderWidth: 1,
        // borderColor: 'red',
    },
    CheckMoreLayoutStyle: {
        marginVertical: 30,
        marginRight: 10,
        backgroundColor: '#00FF0000',
        width: windowWidth * 0.3,
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'red',
    },
    CheckMoreTxtStyle: {
        fontFamily:'BrandonGrotesque-BoldItalic',
        fontSize:23,
        color: '#000000',
        marginLeft: 10,
    },
    RecommendationImg: {
        width: windowWidth * 0.27,
        height: windowWidth * 0.27,
        borderRadius: 10,
    },
    RecommendationTxt: {
        fontFamily:'IBMPlexSansKR-Medium',
        fontSize: 15,
        color: '#000000',
        marginTop: 5,
        marginLeft: 3,
    },
    PurpleContainerLayoutStyle: {
        backgroundColor: '#E4E4E4',
        width: windowWidth,
        height: 129,
        position: 'relative',
    },
    PurpleArrow:{
        position: 'absolute',
        top: -20,
        left: 20,
    },
    PurpleTopLayoutStyle: {
        backgroundColor: '#00FF0000',
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
    },
    PurpleTopTxtStyle: {
        color:'#FFFFFF',
        fontFamily:'BrandonGrotesque-Medium',
        fontSize:18,
    },
    PurpleBottomContainerLayoutStyle: {
        backgroundColor: '#00FF0000',
        alignItems: 'flex-end',
    },
    PurpleBottomLayoutStyle: {
        backgroundColor: '#ffffff',
        width: windowWidth * 0.46,
        height: 42,
        lineHeight: 42,
        marginTop: 5,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    PurpleBottomTxtStyle: {
        color:'#7777FF',
        fontFamily:'BrandonGrotesque-BoldItalic',
        fontSize:20,
    },
    CommentsConainer: {
    },
    CommentsInnerConainer:{
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15
    },
    CommentsTitleLayout: {
        marginBottom: 15,
    },
    CommentsTitleTxt:{
        fontFamily:'BrandonGrotesque-Bold',
        fontSize:20,
        color: '#000000',
    },
    CommentsListContainerLayout:{
        marginBottom: 10,
    },
    CommentsAuthorContainerLayout: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
        // borderWidth: 1,
        // borderColor: 'red',
    },
    CommentsAuthorInner01Layout:{
        
    },
    CommentsAuthorInner02Layout:{
        flex: 1,
    },
    CommentsAuthorInner02InnerLayout: {
        flexDirection: 'row',
    },
    CommentsAuthorInnerNameTxt02Layout:{
        fontFamily:'IBMPlexSansKR-SemiBold',
        fontSize:14,
        color: '#000000',
    },
    CommentsAuthorInnerDateTxt02Layout: {
        fontFamily:'IBMPlexSansKR-Text',
        fontSize:11,
        color: '#C2C2C2',
    },
    CommentsAuthorInner02PlusContainerLayout: {
        flexDirection: 'row',
        marginLeft: 10,
        // borderWidth: 1,
        // borderColor: 'blue',
    },
    CommentsAuthorInner02PlusIconLayout: {
        marginTop: 2,
    },
    CommentsAuthorInnerPlusNum02Layout: {
        fontFamily:'IBMPlexSansKR-Text',
        fontSize: 11,
        color: '#FFA757',
        marginLeft: 5,
        // borderWidth: 1,
        // borderColor: 'pink',
    },
    CommentsAuthorInner03Layout: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // borderWidth: 1,
        // borderColor: 'red',
    },
    CommentsAuthorInnerIcons03Layout: {
        padding: 6,
        margin: 4,
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: 'pink',
    },
    CommentsContentContainerLayout:{
        fontFamily:'IBMPlexSansKR-Medium',
        fontSize:15,
        color: '#5D5959',
    },
    CommentsContentTxtLayout:{
        fontFamily:'IBMPlexSansKR-Medium',
        fontSize:15,
        color: '#5D5959',
    },
    CommentsTextLayout:{
        margin: 15,
    },
    CommentsTextInput: {
        height: 49,
        borderColor: "#D1D1D1",
        borderWidth: 1.5,
        borderRadius: 30,
        paddingLeft: 20,
        fontFamily:'IBMPlexSansKR-Medium',
        fontSize:15,
        position: 'relative',
      },
    CommentSendingTouch: {
        position: 'absolute',
        right: 3,
        top: 3,
        // borderWidth: 1,
        // borderColor: 'red',
    },
})

