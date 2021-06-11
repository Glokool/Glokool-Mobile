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
import moment from "moment";
import { SceneRoute } from '../../navigation/app.route';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoUp, GrayArrow } from '../../assets/icon/Common';

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
    const [Id, setId] = React.useState(props.route.params.Id);
    const [content, setContent] = React.useState<Series_Item>();
    const [contentInfo, setContentInfo] = React.useState<Array<Content_Item>>([]);
    const [carouselIndex, setCarouselIndex] = React.useState<number>(1);
    const [recommendation, setRecommendation] = React.useState<Array<recommendation_Item>>([]);



    React.useEffect(() => {
        InitSeries();
    }, []);

    async function InitSeries() {
        var Content = await axios.get(SERVER + '/api/blog/' + Id);
        setContent(Content.data);
        setContentInfo(Content.data.contents);
        setRecommendation(Content.data.recommendation);
        console.log(Content.data.recommendation)
        // setComments(Content.data.comments);
    }

    const RenderCarousel = (item : { item : ContentImg_Item, index : number }) => {
        return(
            <Layout>
                <Image source={{ uri : item.item.img }} style={styles.ImageContainer} />
            </Layout>    
        )
    }
    
    return (
        <Layout>
            <ScrollView style={{backgroundColor: '#ffffff'}} showsVerticalScrollIndicator = {false} ref={ScrollVewRef} >
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
                <Layout style={styles.CheckMoreContainerLayoutStyle}>
                    <Layout style={styles.CheckMoreLayoutStyle}><Text style={styles.CheckMoreTxtStyle}>{`Check out more`}</Text></Layout>
                    {/* {(recommendation.map((item) =>
                    <Layout style={styles.CheckMoreLayoutStyle}>
                        <TouchableOpacity onPress={() => {setId(item._id)}}>
                            <Image source={{ uri : item.image }} style={styles.RecommendationImg} />
                            <Text style={styles.RecommendationTxt}>{item.title}</Text>
                        </TouchableOpacity>
                    </Layout>
                    ))} */}
                </Layout>

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

            </ScrollView>
        </Layout>
    )
}

const styles = StyleSheet.create({
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
        // bottom : 8,
        backgroundColor: '#00FF0000',
        opacity: 40,
        alignSelf: 'center',
        marginVertical: -5,
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
})

