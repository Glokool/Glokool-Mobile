import React from 'react';
import { SeriesHiddenGemContentAttrProps } from '../../navigation/ScreenNavigator/Series.navigator';
import { Divider, Layout, LayoutElement, Text } from '@ui-kitten/components';
import {
    StyleSheet,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import {
    AngleDown,
    AngleLeft,
    AngleUp,
    GoUp,
    PurpleArrow,
} from '../../assets/icon/Common';
import axios from 'axios';
import { SERVER } from '../../server.component';
import {
    Contact,
    EditorNote,
    EditorNote_Check,
    GlokoolService,
    Location,
    PhotoSpot,
    Sns,
    Time,
    EntryFee,
    EditorNoteLine,
} from '../../assets/icon/Series';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { PhotoDetailFlatlist, PhotoSpotFlatlist } from '../../component/Series';
import { NavigatorRoute } from '../../navigation/app.route';
import { SelectableText } from '../../component/Common/SelectableText.component';

const WindowSize = Dimensions.get('window').width;

type IntroData = {
    _id: string;
    author: string;
    img: string;
};

type photoSpot = {
    _id: string;
    desc: string;
    images: Array<photoSpotImage>;
    location: string;
};

type photoSpotImage = {
    _id: string;
    author: string;
    img: string;
};

type AttractionData = {
    _id: string;
    banner: string;
    count: number;
    cover: string;
    cretedAt: Date;
    desc: string;
    editorNote: Array<string>;
    entryFee: string;
    glokoolService: Array<string>;
    intro: Array<IntroData>;
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
    };
    title: string;
    visible: boolean;
    photoSpot: Array<photoSpot>;
};

export const SeriesHiddenGemContentAttr = (
    props: SeriesHiddenGemContentAttrProps,
): LayoutElement => {
    const TourCode = props.route.params.TourCode;
    const PlaceCode = props.route.params.PlaceCode;
    const ScrollVewRef = React.useRef(null);

    const [data, setData] = React.useState<AttractionData>();
    const [selectedButton, setSelectedButton] = React.useState<number>(0);
    const [Glochat, setGlochat] = React.useState<boolean>(false);

    const [infoPos, setInfoPos] = React.useState<number>(0);
    const [detailPos, setDetailPos] = React.useState<number>(0);
    const [instaPos, setInstaPos] = React.useState<number>(0);

    React.useEffect(() => {
        InitContentAttr();
    }, []);

    async function InitContentAttr() {
        var ContentAttr = await axios.get(
            `${SERVER}/api/tours/${TourCode}/attractions/${PlaceCode}/info`,
        );
        setData(ContentAttr.data);
    }

    function PressTopTabBarButton(index: number) {
        setSelectedButton(index);

        if (index === 0) {
            ScrollVewRef.current.scrollTo({
                x: 0,
                y: infoPos - 100,
                animated: true,
            });
        } else if (index === 1) {
            ScrollVewRef.current.scrollTo({
                x: 0,
                y: detailPos - 100,
                animated: true,
            });
        } else if (index === 2) {
            ScrollVewRef.current.scrollTo({
                x: 0,
                y: instaPos - 100,
                animated: true,
            });
        }
    }

    /* 스크롤 위치에 따라 상단 네비바 카테고리 볼드 처리 변경 */
    function handleOnScroll(e) {
        const scrollPos = e.nativeEvent.contentOffset.y;

        /*0 info 1 detail insta 2*/
        if (scrollPos >= instaPos - 100) {
            setSelectedButton(2);
        } else if (scrollPos >= detailPos - 100) {
            setSelectedButton(1);
        } else if (scrollPos >= infoPos - 100) {
            setSelectedButton(0);
        }
    }

    return (
        <Layout style={styles.MainContainer}>

            <ScrollView
                ref={ScrollVewRef}
                style={styles.MainContainer}
                showsVerticalScrollIndicator={false}
                onScroll={(e) => {
                    handleOnScroll(e);
                }}>
                <SafeAreaView
                    style={{ flex: 0, backgroundColor: '#00FF0000' }}
                />
                <Layout style={{ height: 50 }} />
                {/* 썸네일 이미지 */}
                <Image
                    source={{ uri: data?.cover }}
                    style={styles.Thumbnail}
                    resizeMode={'contain'}
                />

                {/* 타이틀 컨테이너 */}
                <Layout style={styles.TitleContainer}>
                    <SelectableText style={styles.TitleText} item={data?.title} />
                    <SelectableText style={styles.DescText} item={data?.desc} />
                </Layout>

                {/* 글로챗 컨테이너 */}
                <Layout style={styles.GlochatContainer}>
                    <TouchableOpacity
                        style={styles.GlochatButtonContainer}
                        onPress={() => setGlochat(!Glochat)}>
                        <Layout style={styles.GlochatTextContainer}>
                            <GlokoolService />
                            <Text style={styles.GloChatText}>
                                {' '}
                                Glo-Chat Service
                            </Text>
                        </Layout>

                        {Glochat ? <AngleUp /> : <AngleDown />}
                    </TouchableOpacity>

                    {Glochat
                        ? data?.glokoolService.map((item, index) => (
                            <Text style={styles.IndexText}>
                                {index + 1}
                                <Text>{`    ${item}`}</Text>{' '}
                            </Text>
                        ))
                        : null}
                </Layout>

                {/* 인포메이션 컨테이너 */}
                <Layout
                    style={styles.InfoContainer}
                    onLayout={(e) => {
                        setInfoPos(e.nativeEvent.layout.y);
                    }}>
                    <Layout style={styles.ContainerTitle}>
                        <Text style={styles.ContainerTitleText}>Info</Text>
                        <Divider style={styles.Divider} />
                    </Layout>

                    <Layout style={styles.LocationContainer}>
                        <Location />
                        <SelectableText style={styles.InfoDetailText} item={`  ${data?.loc}`} />
                    </Layout>

                    {data === undefined ? null : (
                        <MapView
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={{
                                width: WindowSize - 60,
                                height: WindowSize * 0.38,
                                borderRadius: 15,
                                marginBottom: 20,
                            }}
                            region={{
                                latitude: parseFloat(data?.lat),
                                longitude: parseFloat(data?.lon),
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            }}>
                            <Marker
                                coordinate={{
                                    latitude: parseFloat(data?.lat),
                                    longitude: parseFloat(data?.lon),
                                }}
                                title={data.title}
                            />
                        </MapView>
                    )}

                    <Layout style={styles.InfoDetailContainer5}>
                        <Time />
                        <Layout style={styles.InfoDetailContainer3}>
                            <SelectableText style={styles.InfoDetailText} item={'  Open Hour'} />
                        </Layout>

                        <Layout style={styles.InfoDetailContainer4}>
                            <SelectableText style={styles.InfoDetailText} item={`${data?.time.everyTime}`} />
                        </Layout>
                    </Layout>

                    <Layout style={styles.InfoDetailContainer}>
                        <Layout style={styles.InfoDetailContainer1}>
                            <Contact />
                            <SelectableText style={styles.InfoDetailText} item={'  Call'} />
                        </Layout>

                        <Layout style={styles.InfoDetailContainer2}>
                            {data?.phone ? (
                                <SelectableText style={styles.InfoDetailText} item={' ' + `${data?.phone}`} />
                            ) : (
                                <SelectableText style={styles.InfoDetailText} item={'-'} />
                            )}
                        </Layout>
                    </Layout>

                    <Layout style={styles.InfoDetailContainer}>
                        <Layout style={styles.InfoDetailContainer1}>
                            <Sns />
                            <SelectableText style={styles.InfoDetailText} item={'  SNS'} />
                        </Layout>

                        <Layout style={styles.InfoDetailContainer2}>
                            {data?.sns ? (
                                <Text style={styles.InfoDetailText}>
                                    {' '}
                                    {`${data?.sns.slice(2)}`}
                                </Text>
                            ) : (
                                <SelectableText style={styles.InfoDetailText} item={'-'} />
                            )}
                        </Layout>
                    </Layout>

                    <Layout style={styles.InfoDetailContainer}>
                        <Layout style={styles.InfoDetailContainer1}>
                            <EntryFee />
                            <SelectableText style={styles.InfoDetailText} item={'  Entrance'} />
                        </Layout>

                        <Layout style={styles.InfoDetailContainer2}>
                            {data?.entryFee || data?.entryFee == '0' ? (
                                <Text style={styles.InfoDetailText}>
                                    {data?.entryFee}
                                    <Text style={{ color: '#8797FF' }}>
                                        {' '}
                                        KRW
                                    </Text>
                                </Text>
                            ) : (
                                <SelectableText style={styles.InfoDetailText} item={'Free'} />
                            )}
                        </Layout>
                    </Layout>

                    {data?.note === '' || data?.note === 'undefined' ? null : (
                        <Layout style={styles.NoteContainer}>
                            <Text style={styles.NoteText}>{data?.note}</Text>
                        </Layout>
                    )}
                </Layout>

                {/* 디테일 컨테이너 */}
                <Layout
                    style={styles.DetailContainer}
                    onLayout={(e) => {
                        setDetailPos(e.nativeEvent.layout.y);
                    }}>
                    <Layout style={styles.ContainerDetailTitle}>
                        <Text style={styles.ContainerTitleText}>Detail</Text>
                        <Divider style={styles.Divider} />
                    </Layout>

                    <PhotoDetailFlatlist data={data?.intro} />
                </Layout>

                {/* 에디터 노트 */}
                <Layout style={styles.InfoContainer}>
                    <Layout style={styles.EditorNoteTitleContainer}>
                        <EditorNote />
                        <SelectableText style={styles.EditorNoteTitle} item={"  Editor's Note"} />
                    </Layout>

                    {data?.editorNote.map((item, index) => (
                        <Layout style={styles.EditorNoteContainer}>
                            <Layout style={styles.EditorNoteInnerContainer}>
                                <EditorNote_Check />
                                <SelectableText style={styles.EditorNoteText} item={item} />
                            </Layout>
                            {index == data.editorNote.length - 1 ?
                                
                                <Layout style={{ backgroundColor: '#0f00', width: WindowSize, height:80, marginLeft: -30, alignItems: 'center', justifyContent:'center' }}>
                                    <Image source={require('../../assets/content/editor_note.png')} style={{ width: WindowSize + 60, resizeMode: 'contain' }} />
                                </Layout>
                                :
                                <Divider style={styles.EditorNoteDivider} />
                            }
                        </Layout>
                    ))}

                </Layout>


                {/* <Layout style={styles.EditorNoteEndLine}>
                    <EditorNoteLine style = {{ width: WindowSize, left: -30,}} />                
                </Layout> */}

                {/* 포토스팟 컨테이너 */}
                <Layout
                    onLayout={(e) => {
                        setInstaPos(e.nativeEvent.layout.y);
                    }}>
                    <Layout style={styles.ContainerTitle2}>
                        <Text style={styles.ContainerTitleText}>
                            Insta-Worthy
                        </Text>
                        <Divider style={styles.Divider} />
                    </Layout>

                    <Layout style={styles.InfoDetailContainer6}>
                        <PhotoSpot style={{ marginRight: 10 }} />
                        <Layout style={styles.InfoDetailContainer7}>
                            <Text style={styles.PhotoSpotTitle}>
                                Photo Spot
                            </Text>
                            <Text style={styles.PhotoSpotDesc}>Take your best photo</Text>
                            <Text style={styles.PhotoSpotDesc}>refer to our recommendation!</Text>
                        </Layout>
                    </Layout>

                    <PhotoSpotFlatlist data={data?.photoSpot} />
                </Layout>

                {/* 땡큐 버튼 및 Go up 버튼 */}
                <Layout style={styles.FinalConatiner}>
                    <Text style={styles.ThankyouText}>Thank You!</Text>

                    <TouchableOpacity
                        style={styles.GoUpButton}
                        onPress={() =>
                            ScrollVewRef.current.scrollTo({
                                x: 0,
                                y: 0,
                                animated: true,
                            })
                        }>
                        <Text style={styles.ThankyouText}>
                            Go Up <GoUp />
                        </Text>
                    </TouchableOpacity>
                </Layout>

                {/* 보라색 배경 */}
                <Layout style={styles.PurpleContainerLayoutStyle}>
                    <PurpleArrow style={styles.PurpleArrow} />
                    <Layout style={styles.PurpleTopLayoutStyle}>
                        <Text style={styles.PurpleTopTxtStyle}>
                            {`Can't find the information you need?`}
                            {'\n'}
                            {`Ask our travel assistants for more! `}
                        </Text>
                        <Layout style={styles.PurpleBottomContainerLayoutStyle}>
                            <Layout
                                style={styles.PurpleBottomLayoutStyle}
                                onTouchEnd={() => { setTimeout(() => { props.navigation.navigate(NavigatorRoute.CHAT); }, 150) }}>
                                <Text
                                    style={
                                        styles.PurpleBottomTxtStyle
                                    }>{`Go to Glochat >>`}</Text>
                            </Layout>
                        </Layout>
                    </Layout>
                </Layout>
            </ScrollView>

            <Layout style={styles.TopTabBar}>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#ffffff' }} />
                <Layout style={styles.TopTabBarInner}>
                    <Layout>
                        <SafeAreaView
                            style={{ flex: 0, backgroundColor: '#ffffff' }}
                        />
                        <TouchableOpacity
                            style={styles.Button}
                            onPress={() => props.navigation.goBack()}>
                            <AngleLeft />
                        </TouchableOpacity>
                    </Layout>

                    <Layout>
                        <SafeAreaView
                            style={{ flex: 0, backgroundColor: '#ffffff' }}
                        />
                        <TouchableOpacity
                            style={styles.Button}
                            onPress={() => PressTopTabBarButton(0)}>
                            <Text
                                style={
                                    selectedButton === 0
                                        ? styles.TextButton_S
                                        : styles.TextButton
                                }>
                                Info
                            </Text>
                        </TouchableOpacity>
                    </Layout>

                    <Layout>
                        <SafeAreaView
                            style={{ flex: 0, backgroundColor: '#ffffff' }}
                        />
                        <TouchableOpacity
                            style={styles.Button}
                            onPress={() => PressTopTabBarButton(1)}>
                            <Text
                                style={
                                    selectedButton === 1
                                        ? styles.TextButton_S
                                        : styles.r
                                }>
                                Detail
                            </Text>
                        </TouchableOpacity>
                    </Layout>

                    <Layout>
                        <SafeAreaView
                            style={{ flex: 0, backgroundColor: '#ffffff' }}
                        />
                        <TouchableOpacity
                            style={styles.Button}
                            onPress={() => PressTopTabBarButton(2)}>
                            <Text
                                style={
                                    selectedButton === 2
                                        ? styles.TextButton_S
                                        : styles.TextButton
                                }>
                                Insta-Worthy
                            </Text>
                        </TouchableOpacity>
                    </Layout>
                </Layout>
            </Layout>
        </Layout>
    );
};

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    TopTabBar: {
        position: 'absolute',
        width: '100%',
        top: 0,
        height: 70,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TopTabBarInner: {
        flexDirection: 'row',
        width: WindowSize,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    Button: {
        padding: 15,
        height: 50,
        justifyContent: 'center',
    },
    TextButton: {
        fontFamily: 'BrandonGrotesque-Medium',
        fontSize: 18,
        color: '#8C8C8C',
        height: 50,
        lineHeight: 50,
    },
    TextButton_S: {
        fontFamily: 'BrandonGrotesque-Medium',
        fontSize: 18,
        color: 'black',
        height: 50,
        lineHeight: 50,
    },
    Thumbnail: {
        width: WindowSize,
        height: WindowSize,
    },
    TitleContainer: {
        marginHorizontal: 30,
    },
    TitleText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 25,
        textAlign: 'left',
        marginTop: 30,
        marginBottom: 0,
    },
    DescText: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 17,
        textAlign: 'left',
        marginTop: 0,
        marginBottom: 10,
    },
    GlochatContainer: {
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.18,
        // shadowRadius: 1.0,
        // elevation: 1,
        marginBottom: 20,
        paddingTop: 15,
        paddingBottom: 15,
    },
    GlochatTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },
    GlochatButtonContainer: {
        marginHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    GloChatText: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 20,
    },
    BottomContainer: {
        marginBottom: 100,
    },
    IndexText: {
        marginLeft: 30,
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 16,
        color: '#8797FF',
    },
    GlochatText: {
        fontFamily: 'IBMPlexSansKR-Text',
        fontSize: 16,
        color: 'black',
    },
    GloChatADContainer: {
        backgroundColor: '#7777FF',
        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
    },
    GloChatADText: {
        flex: 1,
        fontFamily: 'BrandonGrotesque-Medium',
        fontSize: 16,
        color: '#FFFFFF',
        marginLeft: 30,
    },
    GloChatButton: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 13,
        marginRight: 30,
        alignItems: 'center',
    },
    GloChatButtonText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 20,
        color: '#7777FF',
        marginVertical: 5,
    },
    InfoContainer: {
        marginHorizontal: 30,
        marginBottom: 30,
    },
    ContainerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
    },
    ContainerDetailTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
        marginRight: 30,
    },
    ContainerTitle2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
        marginHorizontal: 30,
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
        marginVertical: 10,
    },
    LocationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    InfoDetailContainer1: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    InfoDetailContainer2: {
        flex: 2,
    },
    InfoDetailContainer3: {
        flex: 1,
        justifyContent: 'center',
        marginTop: -5,
    },
    InfoDetailContainer4: {
        flex: 2,
        marginTop: -5,
        marginLeft: -12,
    },
    InfoDetailContainer5: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginVertical: 10,
    },
    InfoDetailContainer6: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginHorizontal: 30,
    },
    InfoDetailContainer7: {
        flex: 1,
        justifyContent: 'center',
        marginTop: -5,
    },
    InfoDetailText: {
        flex: 1,
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 14,
    },
    InfoDetailText2: {
        flex: 2,
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 14,
    },
    TimeContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    NoteContainer: {
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#8797FF',
        marginVertical: 20,
    },
    NoteText: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 16,
        color: 'white',
        marginVertical: 10,
        marginHorizontal: 25,
    },
    EditorNoteTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    EditorNoteTitle: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 20,
    },
    EditorNoteContainer: {
        // marginVertical: 10,
        // marginBottom: 20,
    },
    EditorNoteInnerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
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
        backgroundColor: '#8797FF',
    },
    EditorNoteEndLine: {
        // borderWidth: 1,
        marginVertical: 15,
    },
    PhotoSpotTitle: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 20,
        marginTop: -5,
    },
    PhotoSpotDesc: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 16,
        marginBottom: -3,
        lineHeight: 20,
    },
    DetailContainer: {
        marginLeft: 30,
        marginVertical: 30,
    },
    PurpleContainerLayoutStyle: {
        backgroundColor: '#7777FF',
        width: WindowSize,
        height: 129,
        position: 'relative',
    },
    PurpleArrow: {
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
        color: '#FFFFFF',
        fontFamily: 'BrandonGrotesque-Medium',
        fontSize: 18,
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
        color: '#7777FF',
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 20,
    },
    FinalConatiner: {
        marginHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 50,
    },
    ThankyouText: {
        color: '#7777FF',
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 17,
    },
    GoUpButton: {
        borderRadius: 15,
        width: 100,
        height: 40,
        backgroundColor: '#F6F6F6',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
    },
});
