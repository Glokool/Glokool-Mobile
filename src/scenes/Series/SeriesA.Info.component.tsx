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
} from 'react-native';
import { NavigatorRoute } from "../../navigation/app.route"
import { SERVER } from '../../server.component';
import axios from 'axios';
import { AngleLeft, PurpleArrow } from '../../assets/icon/Common';
import { SeriesADetailInfoProps } from '../../navigation/ScreenNavigator/Series.navigator';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import moment from "moment";


type Series_Item = {
    images: Array<string> ,
    comments: string,
    _id: string,
    count:string,
    desc: string,
    gloPick: string,
    plus: Array<string>,
    title: string,
    createdAt: Date,
}
const windowWidth = Dimensions.get('window').width;
export const SeriesAInfoScreen = (props : SeriesADetailInfoProps) : LayoutElement => {
    const Id = props.route.params.Id;
    const [content, setContent] = React.useState<Series_Item>();
    const [image, setImage] = React.useState<Array<string>>([]);

    React.useEffect(() => {
        InitSeries();
    }, []);

    async function InitSeries() {
        var Content = await axios.get(SERVER + '/api/contents/' + Id);
        setContent(Content.data);
        setImage(Content.data.images)
        console.log(Content.data.createdAt)
    }

    const RenderCarousel = ({item}) => {
        return(
            <TouchableOpacity style={styles.ItemContainer}>
                <Image source={{ uri : item }} style={styles.ImageContainer} />
            </TouchableOpacity>    
        )
    }

    return (
        <ScrollView style={{backgroundColor: '#ffffff'}}>
            <Layout style={styles.TopContainerLayout}>
                <AngleLeft style={styles.AngleLeft} onPress={() => props.navigation.goBack()} />
            </Layout>
            <Layout>
                <Carousel
                    data={image}
                    layout={'default'}
                    renderItem={RenderCarousel}
                    style={styles.Carousel}
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
                    // onSnapToItem={(index : number) => setCarouselIndex(index) }
                />
            </Layout>
            <Layout style={styles.SeriesBottomLayout}>
                <Layout style={styles.SeriesDateLayoutStyle}>
                    <Text style={styles.SeriesDateTxtStyle}>{moment(content?.createdAt).format("YYYY-MM-DD")}</Text>
                </Layout>
                <Layout style={styles.SeriesCountLayoutStyle}>
                    <Text style={styles.SeriesCountTxtStyle}>{content?.count}</Text>
                </Layout>
            </Layout>
            <Layout style={styles.SeriesTitleLayoutStyle}>
                <Text style={styles.SeriesTitleTxtStyle}>{content?.title}</Text>
            </Layout>
            <Layout style={styles.SeriesDescLayoutStyle}>
                <Text style={styles.SeriesDescTxtStyle}>{content?.desc}</Text>
            </Layout>

            {/* check out more */}
            <Layout style={styles.CheckMoreContainerLayoutStyle}>
                <Layout style={styles.CheckMoreLayoutStyle}><Text style={styles.CheckMoreTxtStyle}>{`Check out more`}</Text></Layout>
                <Layout style={styles.CheckMoreLayoutStyle}></Layout>
                <Layout style={styles.CheckMoreLayoutStyle}></Layout>
            </Layout>

            {/* 보라색 배경 */}
            <Layout style={styles.PurpleContainerLayoutStyle} >
                <PurpleArrow style={styles.PurpleArrow} />
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

            {/* 보라색 배경 아래 얇은 그레이 선 */}
            <Layout style={styles.GrayLineContainerLayoutStyle}>

            </Layout>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    TopContainerLayout: {
        height: 100
    },
    AngleLeft: {
      marginTop: 60,
      marginLeft: 20,
      justifyContent: 'center',
    },
    SeriesInfoImg: {
        width: 110,
    },
    ItemContainer: {
        width: windowWidth,
        height: windowWidth,
    },
    Carousel: {
        height: windowWidth,
        backgroundColor: '#00FF0000',
    },
    ImageContainer: {
        width: windowWidth,
        height: windowWidth,
        resizeMode: 'cover',
    },
    SeriesBottomLayout: {
        flexDirection:'row',
        marginLeft: 30,
        marginTop: 20,
        alignItems: 'flex-end',
    },
    SeriesDateLayoutStyle: {
        flexDirection: 'row',
    },
    SeriesCountLayoutStyle: {
        marginLeft: 30,
        flexDirection:'row',
    },   
    SeriesDateTxtStyle: {
        color:'#B5B5B5',
        fontFamily:'IBMPlexSansKR-Medium',
        fontSize:15,
    },
    SeriesCountTxtStyle: {
        color:'#B5B5B5',
        fontFamily:'IBMPlexSansKR-Medium',
        fontSize:15,
    },
    SeriesTitleLayoutStyle: {
        marginLeft: 30,
        marginRight: 50,
        marginTop: 10,
        marginBottom: 20,
    },
    SeriesDescLayoutStyle: {
        marginLeft: 30,
        marginRight: 50,
        marginBottom: 30
    },
    SeriesTitleTxtStyle: {
        fontFamily:'BrandonGrotesque-BoldItalic',
        fontSize:26,
        color: '#000000',
    },
    SeriesDescTxtStyle: {
        fontFamily:'IBMPlexSansKR-Medium',
        fontSize:16,
        color: '#414141',
    },
    CheckMoreContainerLayoutStyle: {
        width: windowWidth,
        height: 231,
        backgroundColor: '#F6F6F6',
        flexDirection: 'row',
    },
    CheckMoreLayoutStyle: {
        marginLeft: 30,
        backgroundColor: '#00FF0000',
        marginTop: 50,
        width: windowWidth * 0.3,
        borderWidth: 1,
        borderColor: 'red',
    },
    CheckMoreTxtStyle: {
        fontFamily:'BrandonGrotesque-BoldItalic',
        fontSize:23,
        color: '#000000',
    },
    PurpleContainerLayoutStyle: {
        backgroundColor: '#7777FF',
        width: windowWidth,
        height: 122,
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
        // lineHeight: 42,
        // height: 42,
    },
    GrayLineContainerLayoutStyle:{
        width: windowWidth,
        backgroundColor: '#EBEBEB',
        height: 12,
    },
})

