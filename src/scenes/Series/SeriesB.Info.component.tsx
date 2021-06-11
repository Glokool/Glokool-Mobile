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


    React.useEffect(() => {
        InitSeries();
    }, []);

    async function InitSeries() {
        var Content = await axios.get(SERVER + '/api/blog/' + Id);
        setContent(Content.data);
        setContentInfo(Content.data.contents);
        console.log(Content.data.contents[1])
        // setComments(Content.data.comments);
        // setRecommendation(Content.data.recommendation);
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
                <Layout>
                    <Text>Thank you ! </Text>
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
})

