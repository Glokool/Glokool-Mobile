import React, { useState, useEffect, useRef } from 'react';
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
} from 'react-native';
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route';
import {
    AngleLeft,
    PurpleArrow,
    Bookmark,
    Bookmark_P,
    Plus,
    Plus_P,
    Comments
} from '../../assets/icon/Common';
import {
    CommentSending,
    CountNum_A as CountNum,
    Comments2,
    Comments4,
    Comments6,
    Comments6_s,
} from '../../assets/icon/Series';
import moment from 'moment';
import { SERVER, CDN } from '../../server.component';
import axios, { AxiosRequestConfig } from 'axios';
import auth from '@react-native-firebase/auth';
import qs from 'query-string';
import { SelectableText } from '../../component/Common/SelectableText.component';
import { ShareDialog } from 'react-native-fbsdk-next';
import Share from 'react-native-share';
import { Share as ShareOut, FacebookShare } from '../../assets/icon/Series';
import { GlokoolServiceButton, GlokoolServiceModal } from '../../component/Zone';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { recommendation_Item, Comments_Item, Series_Item, FacebookShareItem, ShareItem, Bookmark_Item } from '../../types';
import ImageModal from 'react-native-image-modal';
import { ZoneDetailContentSceneProps } from '../../navigation/SceneNavigator/Zone.navigator';
import { useDispatch } from 'react-redux';
import { setGloServiceVisibilityTrue } from '../../model/Zone/Zone.UI.model';
import { Loading } from '../../component/Common';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ZoneDetailContentScene = (props: ZoneDetailContentSceneProps,): LayoutElement => {

    const ScrollViewRef = useRef<any>(null);
    const Id = props.route.params.Id;

    const dispatch = useDispatch();

    const [content, setContent] = useState<Series_Item>();
    const [image, setImage] = useState<Array<string>>([]);
    const [recommendation, setRecommendation] = useState<Array<recommendation_Item>>([]);

    const [comments, setComments] = useState<Array<Comments_Item>>([]);
    const [nowComment, setNowComment] = useState('');

    const [shareImage, setShareImage] = useState<string | ArrayBuffer | undefined>();

    const [pressLike, setPressLike] = useState(false);
    const [pressBookmark, setPressBookmark] = useState(false);

    const [commentPosition, setCommentPosition] = useState<number>(0);

    const user = auth().currentUser;
    const uid: string | any = user?.uid;

    useEffect(() => {
        if (image.length > 0) {
            encodeBase64Img();
        }
    }, [image]);

    useEffect(() => {
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
                var res = event.target?.result;
                setShareImage(res);
            }
            var file = this.response;
            reader.readAsDataURL(file)
        };
        xhr.send()

    }

    const facebookShare = () => {
        // facebook 에 공유하는 부분 (링크, quotion)
        const sharingOptions: FacebookShareItem = {
            contentType: 'link',
            contentUrl: 'https://glokool.page.link/jdF1',
            quote: content?.title + '\nClick to find out exclusive Korea travel tips!',
        };

        ShareDialog.canShow(sharingOptions).then((canShow) => {
            if (canShow) {
                return ShareDialog.show(sharingOptions);
            }
        }).catch((e) => console.log(e));
    }

    // sns 공유 메소드
    const shareItems = async () => {
        // // sns 공유
        const shareOptions: ShareItem = {
            title: 'Share Contents',
            // 여기 메세지 앞에 indent 추가하지 말아주세요!
            message: `${content?.title}
Click to find out exclusive Korea travel tips!
glokool.page.link/jdF1`,
        }

        if (Platform.OS === 'ios') {
            Object.assign(shareOptions, { url: shareImage });
        }

        Share.open(shareOptions)
            .then((res) => { })
            .catch((e) => console.log(e));
    }

    async function InitSeries() {
        var Content = await axios.get(SERVER + '/contents/' + Id).catch((e) => console.log("카드뉴스 : ", e));

        setContent(Content?.data);
        setImage(Content?.data.images);
        setComments(Content?.data.comments);

        if (Content?.data.recommendation != undefined) {
            setRecommendation(Content.data.recommendation)
        }


        // 북마크 조회 하기 위한 함수
        if (uid) {
            const authToken = await auth().currentUser?.getIdToken();

            const config: AxiosRequestConfig = {
                method: 'get',
                url: SERVER + '/users/bookmark',
                headers: {
                    Authorization: 'Bearer ' + authToken,
                },
            };

            axios(config)
                .then(function (response) {
                    const data = response.data.items;
                    let dataTemp: Array<string> = [];

                    data.forEach((item: Bookmark_Item) => {
                        dataTemp.push(item.id);
                    });

                    dataTemp.indexOf(Id) !== -1 && setPressBookmark(true);
                    Content?.data.plus.indexOf(uid) !== -1 && setPressLike(true);
                })
                .catch(function (error) {
                    console.log("error : ", error);
                });
        }
    }

    const InitComments = async () => {
        axios.get(SERVER + '/contents/' + Id)
            .then((response) => {
                setComments(response.data.comments);
            })
            .catch((e) => {
                console.log("카드뉴스 댓글 : ", e);
            });

    }

    const RenderCarousel = (item: { item: string }) => {

        return (
            <Layout style={styles.ItemContainer}>
                <ImageModal resizeMode="contain" source={{ uri: CDN + item.item }} style={styles.ImageContainer} />
            </Layout>
        );
    };

    const PressScrollButton = () => {
        ScrollViewRef.current.scrollTo({
            x: 0,
            y: commentPosition - 100,
            animated: true
        })
    }

    const PressBookmark = async () => {
        const authToken = await auth().currentUser?.getIdToken();

        var axios = require('axios');
        var data = qs.stringify({
            contentCode: content?._id,
        });

        var config = {
            method: 'post',
            url: SERVER + '/users/bookmark',
            headers: {
                Authorization: 'Bearer ' + authToken,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data,
        };

        axios(config)
            .then((response: { data: any }) => {
                setPressBookmark(!pressBookmark);
            })
            .catch((error: Error) => {
                console.log(error);
            });
    };

    const PressPlus = async () => {
        const authToken = await auth().currentUser?.getIdToken();
        var config: AxiosRequestConfig = {
            method: 'patch',
            url: SERVER + '/contents/' + content?._id + '/like',
            headers: {
                Authorization: 'Bearer ' + authToken,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        axios(config)
            .then(() => {
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

        var config: AxiosRequestConfig = {
            method: 'post',
            url: SERVER + '/comments',
            headers: {
                Authorization: 'Bearer ' + authToken,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data,
        };

        axios(config)
            .then(() => {
                setNowComment('');
                InitComments();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const DeleteComment = async (id: string) => {
        const authToken = await auth().currentUser?.getIdToken();
        var config: AxiosRequestConfig = {
            method: 'delete',
            url: SERVER + '/contents/' + content?._id + '/comments/' + id,
            headers: {
                Authorization: 'Bearer ' + authToken,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        axios(config)
            .then(() => {
                InitComments();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const LikeComment = async (id: string) => {
        const authToken = await auth().currentUser?.getIdToken();
        var config: AxiosRequestConfig = {
            method: 'patch',
            url:
                SERVER +
                '/contents/' +
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
            .then(() => {
                InitComments();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return content == null ? (
        <Loading />
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
                    ref={ScrollViewRef}
                >
                    <SafeAreaView
                        style={{ flex: 0, backgroundColor: '#00FF0000' }}
                    />
                    <Layout style={{ height: 55 }} />
                    <Layout>
                        <SwiperFlatList
                            data={image}
                            renderItem={RenderCarousel}
                            showPagination
                            paginationStyle={{ bottom: -10 }}
                            paginationDefaultColor={'#ffffff77'}
                            paginationStyleItemActive={{
                                width: 10,
                                height: 5,
                            }}
                            paginationActiveColor={'#ffffff'}
                            paginationStyleItemInactive={{
                                width: 10,
                                height: 5,
                            }}
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
                    <TouchableOpacity onPress={() => dispatch(setGloServiceVisibilityTrue())}>
                        <GlokoolServiceButton />
                    </TouchableOpacity>
                    <GlokoolServiceModal data={content} />

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
                            <Text style={styles.CheckMoreTxtStyle}>
                                {`CHECK\nOUT\nMORE`}
                            </Text>
                        </Layout>
                        {recommendation.map((item, index) => (
                            <Layout style={styles.CheckMoreItemContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        // 이전에 있었던 화면은 사라집니다...
                                        props.navigation.pop()
                                        props.navigation.navigate(SceneRoute.ZONE_DETAIL_CONTENT, { Id: item._id });
                                    }}>
                                    <Image
                                        source={{ uri: CDN + item.image }}
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
                            <Layout style={styles.PurpleBottomContainerLayoutStyle}>
                                <TouchableOpacity onPress={() => props.navigation.navigate(NavigatorRoute.CHAT)}>
                                    <Layout style={styles.PurpleBottomLayoutStyle}>
                                        <Text style={styles.PurpleBottomTxtStyle}>
                                            {`GO TO Glochat >>`}
                                        </Text>
                                    </Layout>
                                </TouchableOpacity>
                            </Layout>
                        </Layout>
                    </Layout>

                    {/* 보라색 배경 아래 얇은 그레이 선 */}
                    <Layout style={styles.GrayLineContainerLayoutStyle} />

                    {/* Comments */}
                    <Layout
                        style={styles.CommentsContainer}
                        onLayout={(e) => { setCommentPosition(e.nativeEvent.layout.y) }}
                    >
                        <Layout style={styles.CommentsInnerContainer}>
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
                                        <Layout></Layout>
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
                                                        <Comments6_s />
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
                                    <Layout>
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
                            <Layout>
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

                    <Layout style={{ height: windowHeight * 0.1 }} />
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
                                style={styles.ScrollButtonTouch}
                                onPress={() => PressScrollButton()}
                            >
                                <Comments />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.ScrollButtonTouch}
                                onPress={() => PressBookmark()}>
                                {pressBookmark ? (
                                    <Bookmark_P />
                                ) : (
                                    <Bookmark />
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.PlusTouch}
                                onPress={() => PressPlus()}>
                                {pressLike ? (
                                    <Plus_P />
                                ) : (
                                    <Plus />
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
    ScrollButtonTouch: {
        marginRight: 25,
        padding: 2,
    },
    PlusTouch: {
        padding: 2,
    },
    ItemContainer: {
        width: windowWidth,
        height: windowWidth,
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
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
    },
    SeriesCountTxtStyle: {
        color: '#B5B5B5',
        fontFamily: 'Pretendard-Medium',
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
        fontFamily: 'Pretendard-Medium',
        fontSize: 16,
        color: '#414141',
    },
    CheckMoreContainerLayoutStyle: {
        width: windowWidth,
        backgroundColor: '#F6F6F6',
        flexDirection: 'row',
        marginTop: 20,
        padding: 20,
    },
    CheckMoreLayoutStyle: {
        backgroundColor: '#0000',
        marginRight: 45,
    },
    CheckMoreItemContainer: {
        marginLeft: 10,
    },
    CheckMoreTxtStyle: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 15,
        color: '#000000',
    },
    RecommendationImg: {
        width: windowWidth * 0.3,
        height: windowWidth * 0.3,
        borderRadius: 10,
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
        fontFamily: 'Pretendard-Regular',
        fontSize: 16,
    },
    PurpleBottomContainerLayoutStyle: {
        backgroundColor: '#00FF0000',
        alignItems: 'flex-end',
    },
    PurpleBottomLayoutStyle: {
        backgroundColor: '#ffffff',
        width: windowWidth * 0.62,
        height: 42,
        marginTop: 15,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    PurpleBottomTxtStyle: {
        color: '#7777FF',
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 18,
    },
    GrayLineContainerLayoutStyle: {
        width: windowWidth,
        backgroundColor: '#EBEBEB',
        height: 12,
    },
    CommentsContainer: {
        marginBottom: 10,
    },
    CommentsInnerContainer: {
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
    },
    CommentsAuthorInner02Layout: {
        flex: 1,
    },
    CommentsAuthorInner02InnerLayout: {
        flexDirection: 'row',
    },
    CommentsAuthorInnerNameTxt02Layout: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 14,
        color: '#000000',
    },
    CommentsAuthorInnerDateTxt02Layout: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 11,
        color: '#C2C2C2',
    },
    CommentsAuthorInner02PlusContainerLayout: {
        flexDirection: 'row',
        marginLeft: 10,
        alignItems: 'center',
    },
    CommentsAuthorInnerPlusNum02Layout: {
        fontFamily: 'Pretendard-Medium',
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
    CommentsContentTxtLayout: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#5D5959',
    },
    CommentsTextInput: {
        height: 49,
        borderColor: '#D1D1D1',
        borderWidth: 1.5,
        borderRadius: 30,
        paddingLeft: 20,
        fontFamily: 'Pretendard-Medium',
        paddingTop: 0,
        paddingBottom: 0,
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
