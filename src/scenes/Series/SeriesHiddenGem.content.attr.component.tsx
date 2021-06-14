
import React from 'react';
import { SeriesHiddenGemContentAttrProps } from '../../navigation/ScreenNavigator/Series.navigator';
import { Divider, Layout, LayoutElement, Text } from '@ui-kitten/components';
import { StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import { AngleDown, AngleLeft, AngleUp, GoUp, PurpleArrow } from '../../assets/icon/Common';
import axios from 'axios';
import { SERVER } from '../../server.component';
import { Contact, EditorNote, EditorNote_Check, GlokoolService, Location, PhotoSpot, Sns, Time } from '../../assets/icon/Series';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { PhotoDetailFlatlist, PhotoSpotFlatlist } from '../../component/Series';
import { NavigatorRoute } from '../../navigation/app.route';


const WindowSize = Dimensions.get('window').width

type IntroData = {
    _id : string;
    author: string;
    img: string;
}

type photoSpot = {
    _id : string;
    desc: string;
    images: Array<photoSpotImage>;
    location : string;
}

type photoSpotImage = {
    _id : string;
    author: string;
    img : string;
}

type AttractionData = {
    _id : string;
    banner : string;
    count : number;
    cover : string;
    cretedAt : Date;
    desc : string;
    editorNote: Array<string>;
    entryFee: string;
    glokoolService: Array<string>;
    intro : Array<IntroData>;
    lat: string;
    lon: string;
    loc: string;
    note: string;
    phone: string;
    plus: Array<string>;
    sns: string;
    tag: Array<string>;
    time: {
        breakTime: string;
        everyTime: string;
    }
    title: string;
    visible: boolean;
    photoSpot: Array<photoSpot>;

}

export const SeriesHiddenGemContentAttr = (props : SeriesHiddenGemContentAttrProps) : LayoutElement => {

    const TourCode = props.route.params.TourCode;
    const PlaceCode = props.route.params.PlaceCode;
    const ScrollVewRef = React.useRef(null);

    const [data, setData] = React.useState<AttractionData>();
    const [selectedButton, setSelectedButton] = React.useState<number>(0);
    const [Glochat, setGlochat] = React.useState<boolean>(true);

    const [infoPos, setInfoPos] = React.useState<number>(0);
    const [detailPos, setDetailPos] = React.useState<number>(0);
    const [instaPos, setInstaPos] = React.useState<number>(0);

    React.useEffect(() => {

        InitContentAttr();

    }, [])





    async function InitContentAttr() {

        var ContentAttr = await axios.get(SERVER + '/api/tours/' + TourCode + '/attractions/' + PlaceCode);
        setData(ContentAttr.data);    

    }

    function PressTopTabBarButton(index : number) {
        setSelectedButton(index);

        if(selectedButton === 0) {
            ScrollVewRef.current.scrollTo({ x: 0, y: infoPos - 100, animated: true });
        }

        else if(selectedButton === 1) {
            ScrollVewRef.current.scrollTo({ x: 0, y: detailPos - 100, animated: true });
        }

        else if(selectedButton === 2) {
            ScrollVewRef.current.scrollTo({ x: 0, y: instaPos - 100, animated: true });
        }
          
    }


    return(

        <Layout style={styles.MainContainer}>
        
            <ScrollView ref={ScrollVewRef} style={styles.MainContainer} showsVerticalScrollIndicator={false}>
            <SafeAreaView style={{flex:0, backgroundColor: '#00FF0000'}} />

                {/* 썸네일 이미지 */}
                <Image source={{uri : data?.banner}} style={styles.Thumbnail} resizeMode={'stretch'} />

                {/* 타이틀 컨테이너 */}
                <Layout style={styles.TitleContainer}>
                    <Text style={styles.TitleText}>{data?.title}</Text>
                    <Text style={styles.DescText}>{data?.desc}</Text>
                </Layout>

                {/* 글로챗 컨테이너 */}
                <Layout style={styles.GlochatContainer}>

                    <TouchableOpacity style={styles.GlochatButtonContainer} onPress={() => setGlochat(!Glochat)}>

                        <Layout style={styles.GlochatTextContainer}>
                            <GlokoolService />
                            <Text style={styles.GloChatText}>  Glo-Chat Service</Text>
                        </Layout>

                        {Glochat? 
                            <AngleDown />
                        :
                            <AngleUp />
                        }                        

                    </TouchableOpacity>

                    {Glochat? 

                        data?.glokoolService.map((item, index) => (
                            <Text style={styles.IndexText}>{index + 1}<Text>{`    ${item}`}</Text> </Text>
                        ))                    
                    :
                        null
                    }

                </Layout>

                {/* 글로챗 광고 컨테이너 */}
                <Layout style={styles.GloChatADContainer}>
                    
                    <Text style={styles.GloChatADText}>Book Glo-Chat and enjoy all thee services!</Text>

                    <TouchableOpacity style={styles.GloChatButton}>
                        <Text style={styles.GloChatButtonText}>{`Go to Glochat >>`}</Text>
                    </TouchableOpacity>

                </Layout>


                {/* 인포메이션 컨테이너 */}
                <Layout style={styles.InfoContainer} onLayout={(e) => {setInfoPos(e.nativeEvent.layout.y)}}>

                    <Layout style={styles.ContainerTitle}>
                        <Text style={styles.ContainerTitleText}>Info</Text>
                        <Divider style={styles.Divider}/>
                    </Layout>


                    <Layout style={styles.LocationContainer}>
                        <Location />  
                        <Text style={styles.InfoDetailText}>{`  ${data?.loc}`}</Text>
                    </Layout>


                    {(data === undefined)? 
                        null                    
                    :
                        <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={{width: WindowSize - 60, height : WindowSize * 0.38, borderRadius: 15, marginBottom: 20}}
                        region={{
                            latitude: parseFloat(data?.lat),
                            longitude: parseFloat(data?.lon),
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                        >
                            <Marker
                                coordinate={{ latitude : parseFloat(data?.lat), longitude : parseFloat(data?.lon) }}
                                title={data.title}
                            />
                        </MapView>
                    }
                    
                    <Layout style={styles.InfoDetailContainer5}>
                        <Time />
                        <Layout style={styles.InfoDetailContainer3}>
                            <Text style={styles.InfoDetailText}>  EveryDay</Text>
                            <Text style={styles.InfoDetailText}>  Break Time</Text>
                        </Layout>

                        <Layout style={styles.InfoDetailContainer4}>
                            <Text style={styles.InfoDetailText}>{`${data?.time.everyTime}`}</Text>
                            <Text style={styles.InfoDetailText}>{`${data?.time.everyTime}`}</Text>
                        </Layout>     
                    </Layout>

                    
                    <Layout style={styles.InfoDetailContainer}>
                        <Layout style={styles.InfoDetailContainer1}>
                            <Contact />
                            <Text style={styles.InfoDetailText}>  Call</Text>
                        </Layout>

                        <Layout style={styles.InfoDetailContainer2}>
                            <Text style={styles.InfoDetailText}> {`${data?.phone}`}</Text>
                        </Layout>     
                    </Layout>

                    
                    <Layout style={styles.InfoDetailContainer}>
                        <Layout style={styles.InfoDetailContainer1}>
                            <Sns />
                            <Text style={styles.InfoDetailText}>  Sns</Text>
                        </Layout>

                        <Layout style={styles.InfoDetailContainer2}>
                            <Text style={styles.InfoDetailText}> {`${data?.sns.slice(2,)}`}</Text>
                        </Layout>     
                    </Layout>

                    
                    <Layout style={styles.InfoDetailContainer}>
                        <Layout style={styles.InfoDetailContainer1}>
                            <Contact />
                            <Text style={styles.InfoDetailText}>  Entrance</Text>
                        </Layout>

                        <Layout style={styles.InfoDetailContainer2}>
                            <Text style={styles.InfoDetailText}> {`${data?.entryFee}  KRW`}</Text>
                        </Layout>     
                    </Layout>

                    {(data?.note === '' || data?.note === 'undefined')? 
                        null
                    :
                        <Layout style={styles.NoteContainer}>
                            <Text style={styles.NoteText}>{data?.note}</Text>                    
                        </Layout>    
                    }  

                </Layout>

                {/* 디테일 컨테이너 */}
                <Layout style={styles.DetailContainer} onLayout={(e) => {setDetailPos(e.nativeEvent.layout.y)}}>

                    <Layout style={styles.ContainerTitle}>
                        <Text style={styles.ContainerTitleText}>Detail</Text>
                        <Divider style={styles.Divider}/>
                    </Layout>

                    <PhotoDetailFlatlist data={data?.intro}/>

                </Layout>

                {/* 에디터 노트 */}
                <Layout style={styles.InfoContainer}>
                    
                    <Layout style={styles.EditorNoteTitleContainer}>                        
                        <EditorNote />
                        <Text style={styles.EditorNoteTitle}>  Editor's Note</Text>
                    </Layout>

                    {(data?.editorNote.map((item, index) => (
                    <Layout>
                        <Layout style={styles.EditorNoteContainer}>
                            <EditorNote_Check />
                            <Text style={styles.EditorNoteText}>{item}</Text>
                        </Layout>

                        <Divider style={styles.EditorNoteDivider} />
                    </Layout>
                    )))}                    

                </Layout>

                {/* 포토스팟 컨테이너 */}
                <Layout onLayout={(e) => {setInstaPos(e.nativeEvent.layout.y)}}>

                    <Layout style={styles.ContainerTitle2}>
                        <Text style={styles.ContainerTitleText}>Insta-Worthy</Text>
                        <Divider style={styles.Divider}/>
                    </Layout>

                    <Layout style={styles.InfoDetailContainer6}>
                        <PhotoSpot style={{marginRight: 10}}/>
                        <Layout style={styles.InfoDetailContainer7}>
                            <Text style={styles.PhotoSpotTitle}>Photo Spot</Text>
                            <Text style={styles.PhotoSpotDesc}>{`Take yout Best Photo${'\n'}refer to our recommendation!`}</Text>
                        </Layout>
                    </Layout>
                    
                    <PhotoSpotFlatlist data={data?.photoSpot}/>

                </Layout>

                {/* 땡큐 버튼 및 Go up 버튼 */}
                <Layout style={styles.FinalConatiner}>
                    <Text style={styles.ThankyouText}>Thank You!</Text>
                    
                    <TouchableOpacity style={styles.GoUpButton} onPress={() => ScrollVewRef.current.scrollTo({ x: 0, y: 0, animated: true })}>
                        <Text style={styles.ThankyouText}>Go Up <GoUp /></Text>
                    </TouchableOpacity>

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



            </ScrollView>

            <Layout style={styles.TopTabBar}>
                <SafeAreaView style={{flex:0, backgroundColor: '#ffffff'}} />
                <Layout style={styles.TopTabBarInner}>

                    <Layout>
                        <SafeAreaView style={{flex: 0, backgroundColor: '#ffffff'}} />
                        <TouchableOpacity style={styles.Button} onPress={() => props.navigation.goBack()}>
                            <AngleLeft />
                        </TouchableOpacity>
                    </Layout>
                    
                    <Layout>
                        <SafeAreaView style={{flex: 0, backgroundColor: '#ffffff'}} />
                        <TouchableOpacity style={styles.Button} onPress={() => PressTopTabBarButton(0)}>
                            <Text style={(selectedButton === 0)? styles.TextButton_S : styles.TextButton}>Info</Text>
                        </TouchableOpacity>
                    </Layout>

                    <Layout>
                        <SafeAreaView style={{flex: 0, backgroundColor: '#ffffff'}} />
                        <TouchableOpacity style={styles.Button} onPress={() => PressTopTabBarButton(1)}>
                            <Text style={(selectedButton === 1)? styles.TextButton_S : styles.TextButton}>Detail</Text>
                        </TouchableOpacity>
                    </Layout>

                    <Layout >
                        <SafeAreaView style={{flex: 0, backgroundColor: '#ffffff'}} />
                        <TouchableOpacity style={styles.Button} onPress={() => PressTopTabBarButton(2)}>                        
                            <Text style={(selectedButton === 2)? styles.TextButton_S : styles.TextButton}>Insta-Worthy</Text>
                        </TouchableOpacity>
                    </Layout>
                </Layout>
            </Layout>

        </Layout>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        flex : 1,
        backgroundColor: 'white'
    },
    TopTabBar: {
        position: 'absolute',
        width: '100%',
        top: 0,
        height: 50,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        
    },
    TopTabBarInner:{
        flexDirection: 'row',
        width: WindowSize,
        justifyContent: 'space-evenly',
        alignItems : 'center',
    },
    Button : {
        padding: 15,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextButton: {
        fontFamily: 'BrandonGrotesque-Medium',
        fontSize: 18,
        color: '#8C8C8C'
    },
    TextButton_S: {
        fontFamily: 'BrandonGrotesque-Medium',
        fontSize: 18,
        color: 'black'
    },
    Thumbnail : {
        width: WindowSize,
        height: WindowSize
    },
    TitleContainer:{
        marginHorizontal: 30,
    },
    TitleText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 25,
        textAlign: 'left',
        marginTop: 30,
        marginBottom: 0
    },
    DescText: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 17,
        textAlign: 'left',
        marginTop: 0,
        marginBottom: 10
    },
    GlochatContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        marginBottom: 30
    },
    GlochatTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    GlochatButtonContainer: {
        marginHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    GloChatText: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 20,
    },
    BottomContainer: {
        marginBottom: 100
    },
    IndexText: {
        marginLeft: 30,
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 16,
        color: '#8797FF'
    },
    GlochatText: {
        fontFamily: 'IBMPlexSansKR-Text',
        fontSize: 16,
        color: 'black'
    },
    GloChatADContainer: {
        backgroundColor: '#7777FF',
        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center'
    },
    GloChatADText: {
        flex: 1,
        fontFamily: 'BrandonGrotesque-Medium',
        fontSize: 16,
        color: '#FFFFFF',
        marginLeft: 30
    },
    GloChatButton: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 13,
        marginRight: 30,
        alignItems: 'center'
    },
    GloChatButtonText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 20,
        color: '#7777FF',
        marginVertical: 5,
    },
    InfoContainer: {
        marginHorizontal: 30,
    },
    ContainerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30
    },
    ContainerTitle2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
        marginHorizontal: 30
    },
    ContainerTitleText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 25,
        color: '#7777FF',
    },
    Divider: {
        backgroundColor: '#7777FF',
        flex: 1,
        marginLeft: 20,
    },
    InfoDetailContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 10
    },
    LocationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },  
    InfoDetailContainer1: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    InfoDetailContainer2: {
        flex: 2,
    },
    InfoDetailContainer3: {
        flex: 1,
        justifyContent: 'center',
        marginTop: -5
    },
    InfoDetailContainer4: {
        flex: 2,
        marginTop: -5,
        marginLeft: -12
    },
    InfoDetailContainer5: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginVertical: 10
    },
    InfoDetailContainer6: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginHorizontal: 30
    },
    InfoDetailContainer7: {
        flex: 1,
        justifyContent: 'center',
        marginTop: -5
    },
    InfoDetailText: {
        flex : 1,
        fontFamily: 'IBMPlexSansKR-SemiBold',
        fontSize: 14,
    },
    InfoDetailText2: {
        flex : 2,
        fontFamily: 'IBMPlexSansKR-SemiBold',
        fontSize: 14,
    },
    TimeContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    NoteContainer: {
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#8797FF',
        marginVertical: 20
    },
    NoteText: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 16,
        color: 'white',
        marginVertical: 10,
        marginHorizontal: 25
    },
    EditorNoteTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15
    },
    EditorNoteTitle: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 20,
    },
    EditorNoteContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    EditorNoteText: {
        fontFamily: 'IBMPlexSansKR-Text',
        fontSize: 16,
        color: 'black',
        marginVertical: -10,
        marginLeft: 10,
    },
    EditorNoteDivider: {
        marginHorizontal: 20,
        marginVertical: 15,
        backgroundColor: '#8797FF'
    },
    PhotoSpotTitle: {
        fontFamily : 'IBMPlexSansKR-Medium',
        fontSize: 20,
        marginTop: -5
    },
    PhotoSpotDesc: {
        fontFamily : 'IBMPlexSansKR-Medium',
        fontSize: 16,
        marginTop: -10,
        lineHeight: 30
    },
    DetailContainer: {
        marginLeft: 30,
        marginVertical: 30
    },
    PurpleContainerLayoutStyle: {
        backgroundColor: '#7777FF',
        width: WindowSize,
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
        width: WindowSize * 0.46,
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
    FinalConatiner: {
        marginHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 50
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
    }
})