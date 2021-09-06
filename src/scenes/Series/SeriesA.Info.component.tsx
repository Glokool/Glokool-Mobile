import React from 'react';
import { Layout, LayoutElement } from '@ui-kitten/components';
import {
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route';
import {
    AngleLeft,
    PurpleArrow,
    Bookmark,
    Bookmark_P,
    Plus,
    Plus_P,
} from '../../assets/icon/Common';
import {
    CommentSending,
    CountNum_A as CountNum,
    Comments2,
    Comments4,
    Comments6,
    Comments6_s,
} from '../../assets/icon/Series';
import { SeriesADetailInfoProps } from '../../navigation/ScreenNavigator/Series.navigator';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import moment from 'moment';
import { SERVER } from '../../server.component';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import qs from 'query-string';
import { SelectableText } from '../../component/Common/SelectableText.component';
import { ShareDialog } from 'react-native-fbsdk-next';
import Share from 'react-native-share';
import { Share as ShareOut, FacebookShare } from '../../assets/icon/Series';
import { Service } from '../../component/Series/Service.component';
import { ServiceModal } from '../../component/Series/Service.Modal.component';

type recommendation_Item = {
    _id: string;
    image: string;
    title: string;
};

type Comments_Item = {
    _id: string;
    writer: {
        uid: string;
        name: string;
        avatar: string;
        grade: string;
    };
    comment: string;
    createdAt: Date;
    plus: Array<string>;
};

type Series_Item = {
    images: Array<string>;
    comments: Array<Comments_Item>;
    _id: string;
    count: string;
    desc: string;
    gloPick: string;
    plus: Array<string>;
    title: string;
    createdAt: Date;
    recommendation: Array<recommendation_Item>;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const SeriesAInfoScreen = (
    props: SeriesADetailInfoProps,
): LayoutElement => {
    const ScrollVewRef = React.useRef(null);
    const [Id, setId] = React.useState(props.route.params.Id);
    const [carouselIndex, setCarouselIndex] = React.useState<number>(0);
    const [content, setContent] = React.useState<Series_Item>(null);
    const [image, setImage] = React.useState<Array<string>>([]);
    const [recommendation, setRecommendation] = React.useState<Array<recommendation_Item>>([]);

    const [comments, setComments] = React.useState<Array<Comments_Item>>([]);
    const [nowComment, setNowComment] = React.useState('');

    const [shareImage, setShareImage] = React.useState();
    const [Glochat, setGlochat] = React.useState(false);

    const [pressLike, setPressLike] = React.useState(false);
    const [pressBookmark, setPressBookmark] = React.useState(false);

    const user = auth().currentUser;
    const uid = user?.uid;

    React.useEffect(() => {
        encodeBase64Img();
    }, [image]);

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            InitSeries();
        });

        return unsubscribe;
    }, []);


    // url 형식의 이미지를 base64 형식으로 encoding
    // 해당 과정이 없으면 이미지 공유 불가능!!
    const encodeBase64Img = async () => {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", image[0], true);
        xhr.responseType = "blob";

        xhr.onload = function (e) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var res = event.target.result;
                res = res.replace("\\r?\\n", "");
                setShareImage(res);
            }
            var file = this.response;
            reader.readAsDataURL(file)
        };
        xhr.send()

    }

    const facebookShare = async () => {
        // facebook 에 공유하는 부분 (링크, quotion)
        const sharingOptions = {
            contentType: 'link',
            contentUrl: 'https://glokool.page.link/jdF1',
            quote: content?.title + '\nClick to find out exclusive Korea travel tips!',
        };

        await ShareDialog.canShow(sharingOptions).then((canShow) => {
            if (canShow) {
                return ShareDialog.show(sharingOptions);
            }
        }).catch((e) => console.log(e));
    }

    // sns 공유 메소드
    const shareItems = async () => {
        // // sns 공유
        const shareOptions = Platform.OS === 'ios' ? (
            {
                title: 'Share Contents',
                // 여기 메세지 앞에 indent 추가하지 말아주세요!
                message: `${content?.title}
Click to find out exclusive Korea travel tips!
glokool.page.link/jdF1`,
                url: shareImage,
            }
        ) : (
            {
                title: 'Share Contents',
                // 여기 메세지 앞에 indent 추가하지 말아주세요!
                message: `${content?.title}
Click to find out exclusive Korea travel tips!
glokool.page.link/jdF1`,
            }
        )
        Share.open(shareOptions)
            .then((res) => console.log(res))
            .catch((e) => console.log(e));
    }
    // 모달 컴포넌트에 bool 값 전달후 바로 초기화
    React.useEffect(() => {
        if (Glochat) {
            setGlochat(false);
        }
    }, [Glochat])

    async function InitSeries() {
        var Content = await axios.get(SERVER + '/api/contents/' + Id);

        setContent(Content.data);
        setImage(Content.data.images);
        setComments(Content.data.comments);
        setRecommendation(Content.data.recommendation);

        // 북마크 조회 하기 위한 함수
        if (uid) {
            const authToken = await auth().currentUser?.getIdToken();

            const config = {
                method: 'get',
                url: SERVER + '/api/users/bookmark',
                headers: {
                    Authorization: 'Bearer ' + authToken,
                },
            };

            axios(config)
                .then(function (response) {
                    let data = response.data.contents;
                    let dataTemp = [];

                    data.forEach((item) => {
                        dataTemp.push(item.id);
                    });
                    dataTemp.indexOf(Id) == -1 && setPressBookmark(true);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        Content.data.plus.indexOf(uid) == -1 && setPressLike(true);
    }

    const InitComments = async () => {
        var Content = await axios.get(SERVER + '/api/contents/' + Id);
        setComments(Content.data.comments);
    }

    const RenderCarousel = ({ item }) => {
        return (
            <Layout style={styles.ItemContainer}>
                <Image source={{ uri: item }} style={styles.ImageContainer} />
            </Layout>
        );
    };

    const PressBookmark = async () => {
        const authToken = await auth().currentUser?.getIdToken();
        var axios = require('axios');
        var data = qs.stringify({
            contentCode: content?._id,
        });
        var config = {
            method: 'post',
            url: SERVER + '/api/users/bookmark',
            headers: {
                Authorization: 'Bearer ' + authToken,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data,
        };

        axios(config)
            .then((response: { data: any; }) => {
                // InitSeries();
                setPressBookmark(!pressBookmark);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const PressPlus = async () => {
        const authToken = await auth().currentUser?.getIdToken();
        var config = {
            method: 'patch',
            url: SERVER + '/api/contents/' + content?._id + '/like',
            headers: {
                Authorization: 'Bearer ' + authToken,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        axios(config)
            .then((response) => {
                // InitSeries();
                setPressLike(!pressLike);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const CommentSendingPress = async () => {
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
            method: 'post',
            url: SERVER + '/api/comments',
            headers: {
                Authorization: 'Bearer ' + authToken,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data,
        };

        axios(config)
            .then((response) => {
                setNowComment('');
                InitComments();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const DeleteComment = async (id) => {
        const authToken = await auth().currentUser?.getIdToken();
        var config = {
            method: 'delete',
            url: SERVER + '/api/contents/' + content?._id + '/comments/' + id,
            headers: {
                Authorization: 'Bearer ' + authToken,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        axios(config)
            .then((response) => {
                InitComments();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const LikeComment = async (id) => {
        const authToken = await auth().currentUser?.getIdToken();
        var config = {
            method: 'patch',
            url:
                SERVER +
                '/api/contents/' +
                content?._id +
                '/comments/' +
                id +
                '/like',
            headers: {
                Authorization: 'Bearer ' + authToken,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        axios(config)
            .then((response) => {
                InitComments();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return content == null ? (
        <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator color='#999' size='large' />
        </Layout>
    ) : (
        <Layout style={styles.ContainerLayout}>
            <KeyboardAvoidingView
                keyboardVerticalOffset={Platform.OS === 'android' ? -190 : 0}
                behavior="padding"
                style={styles.Container}
            >
                <ScrollView
                    style={{ backgroundColor: '#ffffff' }}
                    showsVerticalScrollIndicator={false}
                // ref={ScrollVewRef}
                >
                    <SafeAreaView
                        style={{ flex: 0, backgroundColor: '#00FF0000' }}
                    />
                    <Layout style={{ height: 55 }} />
                    <Layout style={styles.CarouselContainerLayout}>
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
                            loop={false}
                            autoplay={false}
                            onSnapToItem={(index: number) =>
                                setCarouselIndex(index)
                            }
                        />
                        <Pagination
                            dotsLength={image.length}
                            containerStyle={styles.CarouselDotContainer}
                            activeDotIndex={carouselIndex}
                            dotColor={'#FFFFFF'}
                            dotStyle={styles.CarouselDot}
                            inactiveDotColor={'#ffffff'}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={1}
                        />
                    </Layout>
                    <Layout style={styles.SeriesBottomLayout}>
                        <Layout style={styles.SeriesDateLayoutStyle}>
                            <Text style={styles.SeriesDateTxtStyle}>
                                {moment(content?.createdAt).format(
                                    'YYYY-MM-DD',
                                )}
                            </Text>
                        </Layout>
                        <Layout style={styles.SeriesCountLayoutStyle}>
                            <CountNum
                                style={styles.SeriesCountIconLayoutStyle}
                            />
                            <Text style={styles.SeriesCountTxtStyle}>
                                {content?.count}
                            </Text>
                        </Layout>
                    </Layout>
                    <Layout style={styles.SeriesTitleLayoutStyle}>
                        <Text style={styles.SeriesTitleTxtStyle}>{content?.title}</Text>
                    </Layout>
                    <Layout style={styles.SeriesDescLayoutStyle}>
                        <SelectableText style={styles.SeriesDescTxtStyle} >{content?.desc}</SelectableText>
                    </Layout>

                    {/* 글로챗 컨테이너 */}
                    <TouchableOpacity onPress={() => setGlochat(!Glochat)}>
                        <Service />
                    </TouchableOpacity>
                    <ServiceModal isVisible={Glochat} data={content} />

                    {/* 공유 부분 */}
                    <Layout style={{ alignItems: 'center', marginTop: 20, }}>
                        <Text style={styles.ShareText}>Share with Others!</Text>
                        <Layout style={{ flexDirection: 'row', }}>
                            <TouchableOpacity
                                style={[styles.ShareButtonContainer, { paddingHorizontal: 25, borderRadius: 8, }]}
                                onPress={() => shareItems()}
                            >
                                <ShareOut />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.ShareButtonContainer, { borderRadius: 100 }]}
                                onPress={() => facebookShare()}
                            >
                                <FacebookShare />
                            </TouchableOpacity>
                        </Layout>
                    </Layout>



                    {/* check out more */}
                    <Layout style={styles.CheckMoreContainerLayoutStyle}>
                        <Layout style={styles.CheckMoreLayoutStyle}>
                            <Text
                                style={
                                    styles.CheckMoreTxtStyle
                                }>{`Check out more`}</Text>
                        </Layout>
                        {recommendation.map((item) => (
                            <Layout style={styles.CheckMoreLayoutStyle}>
                                <TouchableOpacity
                                    onPress={() => {
                                        // 이전에 있었던 화면은 사라집니다...
                                        props.navigation.pop()
                                        props.navigation.navigate(SceneRoute.SERIES_A_DETAIL, { Id: item._id });
                                    }}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={styles.RecommendationImg}
                                    />
                                </TouchableOpacity>
                            </Layout>
                        ))}
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
                            <Layout
                                style={styles.PurpleBottomContainerLayoutStyle}>
                                <Layout
                                    style={styles.PurpleBottomLayoutStyle}
                                    onTouchEnd={() => { setTimeout(() => { props.navigation.navigate(NavigatorRoute.CHAT); }, 150) }}>
                                    <Text style={styles.PurpleBottomTxtStyle}>
                                        {`Go to Glochat >>`}
                                    </Text>
                                </Layout>
                            </Layout>
                        </Layout>
                    </Layout>

                    {/* 보라색 배경 아래 얇은 그레이 선 */}
                    <Layout style={styles.GrayLineContainerLayoutStyle} />

                    {/* Comments */}
                    <Layout style={styles.CommentsConainer}>
                        <Layout style={styles.CommentsInnerConainer}>
                            {/* comments title */}
                            <Layout style={styles.CommentsTitleLayout}>
                                <Text style={styles.CommentsTitleTxt}>
                                    Comments
                                </Text>
                            </Layout>

                            {/* comments content */}
                            {comments.map((item) => (
                                <Layout
                                    style={styles.CommentsListContainerLayout}>
                                    <Layout
                                        style={
                                            styles.CommentsAuthorContainerLayout
                                        }>
                                        <Layout
                                            style={
                                                styles.CommentsAuthorInner01Layout
                                            }></Layout>
                                        <Layout
                                            style={
                                                styles.CommentsAuthorInner02Layout
                                            }>
                                            <Layout>
                                                <Text
                                                    style={
                                                        styles.CommentsAuthorInnerNameTxt02Layout
                                                    }>
                                                    {item.writer.name}
                                                </Text>
                                            </Layout>
                                            <Layout
                                                style={
                                                    styles.CommentsAuthorInner02InnerLayout
                                                }>
                                                <Layout>
                                                    <Text
                                                        style={
                                                            styles.CommentsAuthorInnerDateTxt02Layout
                                                        }>
                                                        {moment(
                                                            item.createdAt,
                                                        ).format('MM/DD hh:mm')}
                                                    </Text>
                                                </Layout>
                                                {/* 좋아요 아이콘 & 갯수 표시 */}
                                                {item.plus.length != 0 ? (
                                                    <Layout
                                                        style={
                                                            styles.CommentsAuthorInner02PlusContainerLayout
                                                        }>
                                                        <Comments6_s
                                                            style={
                                                                styles.CommentsAuthorInner02PlusIconLayout
                                                            }
                                                        />
                                                        <Text
                                                            style={
                                                                styles.CommentsAuthorInnerPlusNum02Layout
                                                            }>
                                                            {item.plus.length}
                                                        </Text>
                                                    </Layout>
                                                ) : null}
                                            </Layout>
                                        </Layout>
                                        {uid == item.writer.uid ? (
                                            <Layout
                                                style={
                                                    styles.CommentsAuthorInner03Layout
                                                }>
                                                <TouchableOpacity
                                                    style={
                                                        styles.CommentsAuthorInnerIcons03Layout
                                                    }
                                                    onPress={() => {
                                                        DeleteComment(item._id);
                                                    }}>
                                                    <Comments4 />
                                                </TouchableOpacity>
                                            </Layout>
                                        ) : (
                                            <Layout
                                                style={
                                                    styles.CommentsAuthorInner03Layout
                                                }>
                                                {item.plus.indexOf(uid) !=
                                                    -1 ? (
                                                    <TouchableOpacity
                                                        style={
                                                            styles.CommentsAuthorInnerIcons03Layout
                                                        }
                                                        onPress={() =>
                                                            LikeComment(
                                                                item._id,
                                                            )
                                                        }>
                                                        <Comments6 />
                                                    </TouchableOpacity>
                                                ) : (
                                                    <TouchableOpacity
                                                        style={
                                                            styles.CommentsAuthorInnerIcons03Layout
                                                        }
                                                        onPress={() => {
                                                            LikeComment(
                                                                item._id,
                                                            );
                                                        }}>
                                                        {uid ? (
                                                            <Comments2 />
                                                        ) : null}
                                                    </TouchableOpacity>
                                                )}
                                            </Layout>
                                        )}
                                    </Layout>
                                    <Layout
                                        style={
                                            styles.CommentsContentContainerLayout
                                        }>
                                        <Text
                                            style={
                                                styles.CommentsContentTxtLayout
                                            }>
                                            {item.comment}
                                        </Text>
                                    </Layout>
                                </Layout>
                            ))}
                        </Layout>

                        {/* 댓글 입력 */}
                        {uid ? (
                            <Layout style={styles.CommentsTextLayout}>
                                <TextInput
                                    style={styles.CommentsTextInput}
                                    placeholder="Write your comment"
                                    placeholderTextColor="#D1D1D1"
                                    autoCapitalize="none"
                                    textAlignVertical='center'
                                    onChangeText={(text) => setNowComment(text)}
                                    value={nowComment}></TextInput>
                                <TouchableOpacity
                                    style={styles.CommentSendingTouch}
                                    onPress={() => CommentSendingPress()}>
                                    <CommentSending />
                                </TouchableOpacity>
                            </Layout>
                        ) : null}
                    </Layout>


                </ScrollView>

            </KeyboardAvoidingView>

            {/* 탑탭바 */}
            <Layout style={styles.ContainerLayoutAngleLeft}>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#ffffff' }} />
                <Layout style={styles.ContainerIconLayout}>
                    <TouchableOpacity
                        style={styles.ContainerAngleLeft_W}
                        onPress={() => props.navigation.goBack()}>
                        <AngleLeft style={styles.AngleLeft} />
                    </TouchableOpacity>
                    {uid ? (
                        <Layout style={styles.TopTabIconLayout}>
                            <TouchableOpacity
                                style={styles.BookmarkTouch}
                                onPress={() => PressBookmark()}>
                                {pressBookmark ? (
                                    <Bookmark />
                                ) : (
                                    <Bookmark_P />
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.PlusTouch}
                                onPress={() => PressPlus()}>
                                {pressLike ? (
                                    <Plus />
                                ) : (
                                    <Plus_P />
                                )}
                            </TouchableOpacity>
                        </Layout>
                    ) : null}
                </Layout>
            </Layout>
        </Layout>
    );
};

const styles = StyleSheet.create({
    Container: {
        backgroundColor: 'white',
    },
    ContainerLayout: {
        position: 'relative',
        paddingBottom: windowHeight * 0.11
    },
    // 탑탭 style
    ContainerLayoutAngleLeft: {
        width: '100%',
        height: 50,
        position: 'absolute',
        top: 0,
        backgroundColor: '#ffffff',
    },
    ContainerIconLayout: {
        flexDirection: 'row',
        width: windowWidth,
    },
    ContainerOpacityLayoutAngleLeft: {
        width: windowWidth,
        height: 50,
        position: 'absolute',
        top: 0,
        backgroundColor: '#00FF0000',
    },
    ContainerAngleLeft: {
        width: windowWidth,
        backgroundColor: '#00FF0000',
        padding: 20,
    },
    ContainerAngleLeft_W: {
        backgroundColor: '#ffffff',
        padding: 20,
    },
    AngleLeft: {
        marginLeft: 20,
    },
    TopTabIconLayout: {
        width: '75%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    BookmarkTouch: {
        marginRight: 25,
        padding: 2,
    },
    PlusTouch: {
        padding: 2,
    },
    SeriesInfoImg: {
        width: 110,
    },
    ItemContainer: {
        width: windowWidth,
        height: windowWidth,
    },
    CarouselContainerLayout: {},
    Carousel: {
        height: windowWidth,
        backgroundColor: '#00FF0000',
    },
    CarouselInsideContainer: {
        marginLeft: -16,
        alignItems: 'center',
    },
    CarouselDotContainer: {
        position: 'absolute',
        bottom: -15,
        backgroundColor: '#00FF0000',
        opacity: 40,
        alignSelf: 'center',
    },
    CarouselDot: {
        width: 13,
        height: 4,
        borderRadius: 30,
        color: '#ffffff',
    },
    ImageContainer: {
        width: windowWidth,
        height: windowWidth,
        resizeMode: 'cover',
    },
    SeriesBottomLayout: {
        flexDirection: 'row',
        marginLeft: 30,
        marginTop: 20,
        alignItems: 'flex-end',
    },
    SeriesDateLayoutStyle: {
        flexDirection: 'row',
    },
    SeriesCountLayoutStyle: {
        marginLeft: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    SeriesCountIconLayoutStyle: {
        marginRight: 6,
    },
    SeriesDateTxtStyle: {
        color: '#B5B5B5',
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 15,
    },
    SeriesCountTxtStyle: {
        color: '#B5B5B5',
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 15,
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
    },
    SeriesTitleTxtStyle: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 26,
        color: '#000000',
        lineHeight: 30,
    },
    SeriesDescTxtStyle: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 16,
        color: '#414141',
    },
    CheckMoreContainerLayoutStyle: {
        width: windowWidth,
        backgroundColor: '#F6F6F6',
        flexDirection: 'row',
        marginTop: 20,
    },
    CheckMoreLayoutStyle: {
        marginVertical: 30,
        marginRight: 10,
        backgroundColor: '#00FF0000',
        width: windowWidth * 0.3,
        alignItems: 'center',
    },
    CheckMoreTxtStyle: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 23,
        color: '#000000',
        marginLeft: 10,
        lineHeight: 25,
    },
    RecommendationImg: {
        width: windowWidth * 0.27,
        height: windowWidth * 0.27,
        borderRadius: 10,
    },
    RecommendationTxt: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 15,
        color: '#000000',
        marginTop: 5,
        marginLeft: 3,
    },
    PurpleContainerLayoutStyle: {
        backgroundColor: '#7777FF',
        width: windowWidth,
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
        width: windowWidth * 0.46,
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
    GrayLineContainerLayoutStyle: {
        width: windowWidth,
        backgroundColor: '#EBEBEB',
        height: 12,
    },
    CommentsConainer: {
        marginBottom: 10,
        // borderWidth: 1,
        // borderColor: 'pink',
    },
    CommentsInnerConainer: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
    },
    CommentsTitleLayout: {
        marginBottom: 15,
    },
    CommentsTitleTxt: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 20,
        color: '#000000',
    },
    CommentsListContainerLayout: {
        marginBottom: 10,
    },
    CommentsAuthorContainerLayout: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
        // borderWidth: 1,
        // borderColor: 'red',
    },
    CommentsAuthorInner01Layout: {},
    CommentsAuthorInner02Layout: {
        flex: 1,
    },
    CommentsAuthorInner02InnerLayout: {
        flexDirection: 'row',
    },
    CommentsAuthorInnerNameTxt02Layout: {
        fontFamily: 'IBMPlexSansKR-SemiBold',
        fontSize: 14,
        color: '#000000',
    },
    CommentsAuthorInnerDateTxt02Layout: {
        fontFamily: 'IBMPlexSansKR-Text',
        fontSize: 11,
        color: '#C2C2C2',
    },
    CommentsAuthorInner02PlusContainerLayout: {
        flexDirection: 'row',
        marginLeft: 10,
        alignItems: 'center',
    },
    CommentsAuthorInner02PlusIconLayout: {},
    CommentsAuthorInnerPlusNum02Layout: {
        fontFamily: 'IBMPlexSansKR-Text',
        fontSize: 11,
        color: '#FFA757',
        marginLeft: 5,
    },
    CommentsAuthorInner03Layout: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    CommentsAuthorInnerIcons03Layout: {
        padding: 6,
        margin: 4,
        justifyContent: 'center',
    },
    CommentsContentContainerLayout: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 15,
        color: '#5D5959',
    },
    CommentsContentTxtLayout: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 15,
        color: '#5D5959',
    },
    CommentsTextLayout: {
        // margin: 15,
    },
    CommentsTextInput: {
        height: 49,
        borderColor: '#D1D1D1',
        borderWidth: 1.5,
        borderRadius: 30,
        paddingLeft: 20,
        fontFamily: 'IBMPlexSansKR-Medium',
        paddingTop: 0,
        paddingBottom: 0,
        // fontSize: 15,
        // position: 'relative',
    },
    CommentSendingTouch: {
        position: 'absolute',
        right: 3,
        top: 3,
    },
    ShareButtonContainer: {
        borderWidth: 1,
        borderColor: '#e9e9e9',
        padding: 5,
        marginHorizontal: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ShareText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: Platform.OS === 'ios' ? 16 : 14,
        color: '#7777ff'
    },
});
