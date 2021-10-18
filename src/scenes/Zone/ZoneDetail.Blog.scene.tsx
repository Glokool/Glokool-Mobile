import React, { useEffect, useState, useRef } from 'react';
import { Layout } from '@ui-kitten/components';
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
    ActivityIndicator
} from 'react-native';
import { SceneRoute } from '../../navigation/app.route';
import { SERVER, CDN } from '../../server.component';
import axios, { AxiosRequestConfig } from 'axios';
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import {
    GoUp,
    AngleLeft,
    AngleLeft_W,
    Bookmark_D2D2D2,
    Bookmark_P,
    Plus_D2D2D2,
    Plus_P,
    Comments
} from '../../assets/icon/Common';
import {
    CommentSending,
    CountNum_B as CountNum,
    Comments2,
    Comments4,
    Comments6,
    Comments6_s,
} from '../../assets/icon/Series';
import qs from 'query-string';
import { Instagram, Naver } from '../../assets/icon/SNS';
import { SelectableText } from '../../component/Common/SelectableText.component';
import { ShareDialog } from 'react-native-fbsdk-next';
import Share from 'react-native-share';
import { GlokoolServiceButton, GlokoolServiceModal } from '../../component/Zone';
import { GloChatButton } from '../../component/Zone';
import { Share as ShareOut, FacebookShare } from '../../assets/icon/Series';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { recommendation_Item, Comments_Item_Blog, ContentImg_Item, Content_Item, Series_Item_Blog, FacebookShareItem, ShareItem, Bookmark_Item } from '../../types';
import ImageModal from 'react-native-image-modal';
import { ZoneDetailBlogSceneProps } from '../../navigation/ScreenNavigator/Zone.navigator';
import { useDispatch } from 'react-redux';
import { setGloServiceVisibilityTrue } from '../../model/Zone/Zone.UI.model';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ZoneDetailBlogScene = (props: ZoneDetailBlogSceneProps) => {

    const ScrollViewRef = useRef<any>(null);

    const dispatch = useDispatch();

    const [height, setHeight] = useState<number>(0);
    const [Id, setId] = useState(props.route.params.Id);
    const [content, setContent] = useState<Series_Item_Blog | any>();
    const [contentInfo, setContentInfo] = useState<Array<Content_Item>>(
        [],
    );
    const [recommendation, setRecommendation] = useState<
        Array<recommendation_Item>
    >([]);
    const [comments, setComments] = useState<Array<Comments_Item_Blog>>([]);
    const [nowComment, setNowComment] = useState('');
    const [shareImage, setShareImage] = useState<string | ArrayBuffer | undefined>();
    const [modalItem, setModalItem] = useState();

    const [pressLike, setPressLike] = useState(false);
    const [pressBookmark, setPressBookmark] = useState(false);

    const [commentPosition, setCommentPosition] = useState<number>(0);

    const user = auth().currentUser;
    const uid: string | any = user?.uid;

    useEffect(() => {
        encodeBase64Img();
    }, [content]);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            InitSeries();
        });

        return unsubscribe;
    }, []);

    async function InitSeries() {
        var Content = await axios.get(SERVER + '/api/blog/' + Id).catch((e) => console.log(e));
        // 북마크 조회 하기 위한 함수
        if (uid) {
            const authToken = await auth().currentUser?.getIdToken();

            var config: AxiosRequestConfig = {
                method: 'get',
                url: SERVER + '/api/users/bookmark',
                headers: {
                    Authorization: 'Bearer ' + authToken,
                },
            };


            axios(config)
                .then(function (response) {
                    let data = response.data.items;
                    let dataTemp: Array<string> = [];

                    data.forEach((item: Bookmark_Item) => {
                        dataTemp.push(item.id);
                    });

                    dataTemp.indexOf(Id) !== -1 && setPressBookmark(true);
                    Content?.data.plus.indexOf(uid) !== -1 && setPressLike(true);

                    setContent(Content?.data);
                    setContentInfo(Content?.data.contents);
                    setRecommendation(Content?.data.recommendation);
                    setComments(Content?.data.comments);
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }

    const InitComments = async () => {
        var Content = await axios.get(SERVER + '/api/blog/' + Id);
        setComments(Content.data.comments);
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

    // url 형식의 이미지를 base64 형식으로 encoding
    // 해당 과정이 없으면 이미지 공유 불가능!!
    const encodeBase64Img = async () => {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", content?.cover, true);
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
    // glo-chat service 클릭 시 visible = true
    // item 을 전달받아서 set 해줍니다!
    const pressService = (item: any) => {
        dispatch(setGloServiceVisibilityTrue());
        setModalItem(item);
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
            .then((res) => console.log(res))
            .catch((e) => console.log(e));
    }


    const RenderCarousel = (item: { item: ContentImg_Item; index: number }) => {
        return (
            <Layout>
                <ImageModal
                    resizeMode="contain"
                    source={{ uri: CDN + item.item.img }}
                    style={styles.ImageContainer}
                />
                {item.item.author == null ||
                    item.item.author == '' ||
                    item.item.author == 'undefined' ? null : (
                    <Layout style={styles.authorContainer}>
                        {item.item.author[0] === 'i' ? (
                            <Instagram />
                        ) : item.item.author[0] === 'n' ? (
                            <Naver />
                        ) : null}
                        <Text
                            style={
                                styles.authorText
                            }>{`  ${item.item.author.slice(2)}`}</Text>
                    </Layout>
                )}
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

        var data = qs.stringify({
            blogCode: content?._id,
        });
        console.log(data);
        var config: AxiosRequestConfig = {
            method: 'post',
            url: SERVER + '/api/users/bookmark',
            headers: {
                Authorization: 'Bearer ' + authToken,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data,
        };

        axios(config)
            .then(() => {
                setPressBookmark(!pressBookmark);
            })
            .catch((error: Error) => {
                console.log("Error", error);
            });
    };

    // 하트 버튼
    const PressPlus = async () => {
        const authToken = await auth().currentUser?.getIdToken();
        var config: AxiosRequestConfig = {
            method: 'patch',
            url: SERVER + '/api/blog/' + content?._id + '/like',
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
            url: SERVER + '/api/blog/comments',
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
            url: SERVER + '/api/blog/' + content?._id + '/comments/' + id,
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
                '/api/blog/' +
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
            >
                <ScrollView
                    style={{ backgroundColor: '#ffffff' }}
                    showsVerticalScrollIndicator={false}
                    ref={ScrollViewRef}
                    onScroll={(e) => setHeight(e.nativeEvent.contentOffset.y)}
                >
                    {height >= windowWidth - 100 ? (
                        <Layout>
                            <Layout style={{ height: 50 }} />
                            <SafeAreaView
                                style={{
                                    flex: 0,
                                    backgroundColor: '#00FF0000',
                                }}
                            />
                        </Layout>
                    ) : null}

                    <Layout>
                        <ImageModal
                            resizeMode="contain"
                            style={styles.CoverImg}
                            source={{ uri: CDN + content?.cover }}
                        />
                        <Layout style={styles.SeriesBottomLayout}>
                            <Layout style={styles.SeriesDateLayoutStyle}>
                                <Text style={styles.SeriesDateTxtStyle}>{moment(content?.createdAt).format("YYYY-MM-DD")}</Text>
                            </Layout>
                            <Layout style={styles.SeriesCountLayoutStyle}>
                                <CountNum style={styles.SeriesCountIconLayoutStyle} />
                                <Text style={styles.SeriesCountTxtStyle}>{content?.count}</Text>
                            </Layout>
                        </Layout>
                    </Layout>
                    <Layout style={styles.TopTxtContainer}>
                        <Text style={styles.TitleTxt}>{content?.title}</Text>
                        <Text style={styles.SmallTitleTxt}>{content?.smallTitle}</Text>
                        <SelectableText style={styles.descTxt}>{content?.desc}</SelectableText>
                        <SelectableText style={styles.LetsBeginTxt}>Let's Begin!</SelectableText>
                    </Layout>

                    {/* content carousel */}
                    {contentInfo.map((item) => (
                        <>
                            <Layout style={styles.CarouselContainerLayout}>
                                <SwiperFlatList
                                    data={item.images}
                                    renderItem={RenderCarousel}
                                    showPagination
                                    style={{
                                        marginBottom: 10,
                                    }}
                                    paginationStyle={{ bottom: -30 }}
                                    paginationDefaultColor={'#7777ff77'}
                                    paginationStyleItemActive={{
                                        width: 10,
                                        height: 5,
                                    }}
                                    paginationActiveColor={'#7777ff'}
                                    paginationStyleItemInactive={{
                                        width: 10,
                                        height: 5,
                                    }}
                                />
                            </Layout>
                            <Layout>
                                <Layout style={styles.ContentTxtLayout}>
                                    <SelectableText style={styles.ContentTitleTxt} >{item.title}</SelectableText>
                                    <SelectableText style={styles.ContentDescTxt} >{item.desc}</SelectableText>
                                </Layout>

                                {/* 글로서비스 컨테이너 */}
                                <TouchableOpacity onPress={() => pressService(item)}>
                                    <GlokoolServiceButton />
                                </TouchableOpacity>

                            </Layout>
                        </>
                    ))}
                    {/* 글로서비스 모달 */}
                    <GlokoolServiceModal data={modalItem} />

                    {/* 땡큐 버튼 및 Go up 버튼 */}
                    <Layout style={styles.FinalConatiner}>
                        {/* 공유 부분 */}
                        <Layout style={{ alignItems: 'center' }}>
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

                        <TouchableOpacity
                            style={styles.GoUpButton}
                            onPress={() =>
                                ScrollViewRef.current.scrollTo({
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

                    {/* check out more */}
                    {recommendation ? (
                        <Layout style={styles.CheckMoreContainerLayoutStyle}>
                            <Layout style={styles.CheckMoreLayoutStyle}>
                                <Text style={styles.CheckMoreTxtStyle}>
                                    {`CHECK\nOUT\nMORE`}
                                </Text>
                            </Layout>
                            {recommendation.map((item) => (
                                <Layout style={{ marginLeft: 10, }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // 이전에 있었던 화면은 사라집니다...
                                            props.navigation.pop()
                                            props.navigation.navigate(SceneRoute.ZONE_DETAIL_BLOG, { Id: item._id });
                                        }}>
                                        <Image
                                            source={{ uri: CDN + item.image }}
                                            style={styles.RecommendationImg}
                                        />
                                    </TouchableOpacity>
                                </Layout>
                            ))}
                        </Layout>
                    ) : null}

                    <GloChatButton navigation={props.navigation} />

                    {/* Comments */}
                    <Layout
                        style={styles.CommentsConainer}
                        onLayout={(e) => { setCommentPosition(e.nativeEvent.layout.y) }}
                    >
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
                                                        onPress={() => {
                                                            LikeComment(
                                                                item._id,
                                                            );
                                                        }}>
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
            {height >= windowWidth - 100 ? (
                // 스크롤을 내렸을 시
                <Layout style={styles.ContainerLayoutAngleLeft}>
                    <SafeAreaView
                        style={{ flex: 0, backgroundColor: '#ffffff' }}
                    />
                    <Layout style={styles.ContainerIconLayout}>
                        <TouchableOpacity
                            style={styles.ContainerAngleLeft_W}
                            onPress={() => props.navigation.goBack()}>
                            <AngleLeft />
                        </TouchableOpacity>
                        {uid ? (
                            <Layout style={styles.TopTabIconLayout}>
                                <TouchableOpacity
                                    style={styles.BookmarkTouch}
                                    onPress={() => PressScrollButton()}
                                >
                                    <Comments />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.BookmarkTouch}
                                    onPress={() => PressBookmark()}
                                >
                                    {pressBookmark ?
                                        <Bookmark_P />
                                        :
                                        <Bookmark_D2D2D2 />
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.PlusTouch}
                                    onPress={() => PressPlus()}
                                >
                                    {pressLike ? (
                                        <Plus_P />
                                    ) : (
                                        <Plus_D2D2D2 />
                                    )}
                                </TouchableOpacity>
                            </Layout>
                        ) : null}
                    </Layout>
                </Layout>
            ) : (
                // 맨위에 포커스
                <Layout style={styles.ContainerOpacityLayoutAngleLeft}>
                    <TouchableOpacity
                        style={styles.ContainerAngleLeft}
                        onPress={() => props.navigation.goBack()}>
                        <AngleLeft_W />
                    </TouchableOpacity>
                    <Layout style={styles.TopImgIconLayout}>
                        <TouchableOpacity
                            style={styles.BookmarkTouch}
                            onPress={() => PressScrollButton()}
                        >
                            <Comments />
                        </TouchableOpacity>
                        {uid ? (
                            <TouchableOpacity style={styles.BookmarkTouch} onPress={() => PressBookmark()}>
                                {pressBookmark ?
                                    <Bookmark_P />
                                    :
                                    <Bookmark_D2D2D2 />
                                }
                            </TouchableOpacity>
                        ) : null}
                        {uid ? (
                            <TouchableOpacity style={styles.PlusTouch} onPress={() => PressPlus()}>
                                {pressLike ? (
                                    <Plus_P />
                                ) : (
                                    <Plus_D2D2D2 />
                                )}
                            </TouchableOpacity>
                        ) : null}
                    </Layout>

                </Layout>
            )}
        </Layout>
    );
};

const styles = StyleSheet.create({
    ContainerLayout: {
        paddingBottom: windowHeight * 0.11
    },
    // 탑탭 style
    ContainerLayoutAngleLeft: {
        width: '100%',
        paddingVertical: 10,
        position: 'absolute',
        top: 0,
        backgroundColor: '#ffffff',
        opacity: 0.75
    },
    ContainerIconLayout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: windowWidth,
    },
    ContainerOpacityLayoutAngleLeft: {
        width: windowWidth,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'ios' ? 50 : 10,
        backgroundColor: '#00FF0000',
        paddingHorizontal: 10,
    },
    ContainerAngleLeft: {
        backgroundColor: '#00ff0000',
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ContainerAngleLeft_W: {
        backgroundColor: '#ffffff',
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    TopTabIconLayout: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    BookmarkTouch: {
        marginRight: 25,
        padding: 2,
    },
    PlusTouch: {
        padding: 2,
    },
    CoverImg: {
        width: windowWidth,
        height: windowWidth,
        position: 'relative',
    },
    SeriesBottomLayout: {
        position: 'absolute',
        bottom: 10,
        backgroundColor: '#00ff0000',
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    SeriesDateLayoutStyle: {
        flexDirection: 'row',
        backgroundColor: '#00FF0000',
    },
    SeriesCountLayoutStyle: {
        marginLeft: 30,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00FF0000',
    },
    SeriesCountIconLayoutStyle: {
        marginRight: 6,

    },
    SeriesDateTxtStyle: {
        color: '#D2D2D2',
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 15,
    },
    SeriesCountTxtStyle: {
        color: '#D2D2D2',
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 15,
    },
    TopImgIconLayout: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00FF0000',
    },
    TopTxtContainer: {
        marginHorizontal: 25,
    },
    TitleTxt: {
        marginTop: 20,
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 26,
        color: '#000000',
    },
    SmallTitleTxt: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 20,
        color: '#999999',
    },
    descTxt: {
        marginTop: 10,
        fontFamily: 'IBMPlexSansKR-Text',
        fontSize: 16,
        color: '#414141',
    },
    LetsBeginTxt: {
        marginTop: 20,
        marginBottom: 20,
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 18,
        color: '#7777FF',
    },
    CarouselContainerLayout: {
        width: windowWidth,
        marginBottom: 30,
    },
    authorContainer: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 10,
        left: 20,
        backgroundColor: '#00FF0000',
    },
    authorText: {
        fontFamily: 'IBMPlexSansKR-Text',
        fontSize: 13,
        color: '#ffffff',
        opacity: 0.6,
    },
    ImageContainer: {
        width: windowWidth,
        height: windowWidth,
        resizeMode: 'cover',
    },
    ContentTxtLayout: {
        marginHorizontal: 25,
        marginTop: 5,
    },
    ContentTitleTxt: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 23,
        color: '#000000',
    },
    ContentDescTxt: {
        fontFamily: 'IBMPlexSansKR-Text',
        fontSize: 16,
        color: '#414141',
        marginTop: 10,
    },
    // thank you btn
    FinalConatiner: {
        marginHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
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
    CommentsConainer: {
        marginBottom: 10,
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
    },
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
    },
    CommentsAuthorInner02PlusIconLayout: {
        marginTop: 2,
    },
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
    CommentsContentTxtLayout: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 15,
        color: '#5D5959',
    },
    CommentsTextLayout: {
        margin: 15,
    },
    CommentsTextInput: {
        height: 49,
        borderColor: '#D1D1D1',
        borderWidth: 1.5,
        borderRadius: 30,
        paddingLeft: 20,
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 15,
        position: 'relative',
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
})
