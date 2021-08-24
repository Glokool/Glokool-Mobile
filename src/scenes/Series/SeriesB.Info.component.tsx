import React, { useEffect } from 'react';
import { Divider, Layout, LayoutElement } from '@ui-kitten/components';
import {
    Dimensions,
    Image,
    Linking,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    Button,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator
} from 'react-native';
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route';
import { SERVER } from '../../server.component';
import axios from 'axios';
import { SeriesBDetailInfoProps } from '../../navigation/ScreenNavigator/Series.navigator';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import moment, { max } from 'moment';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import {
    GoUp,
    PurpleArrow,
    AngleLeft,
    AngleLeft_W,
    Bookmark,
    Bookmark_P,
    Plus,
    Plus_P,
} from '../../assets/icon/Common';
import {
    CommentSending,
    CountNum_B as CountNum,
    Comments1,
    Comments2,
    Comments3,
    Comments4,
    Comments5,
    Comments6,
    Comments6_s,
} from '../../assets/icon/Series';
import qs from 'query-string';
import { SeriesTopTabBar } from '../../component/Series';
import { Instagram, Naver } from '../../assets/icon/SNS';
import { SelectableText } from '../../component/Common/SelectableText.component';
import { ShareDialog } from 'react-native-fbsdk-next';
import Share from 'react-native-share';
import { Service } from '../../component/Series/Service.component';
import { ServiceModal } from '../../component/Series/Service.Modal.component';

import KakaoShareLink from 'react-native-kakao-share-link';
import { Share as ShareOut, FacebookShare } from '../../assets/icon/Series';

type recommendation_Item = {
    _id: string;
    image: string;
    title: string;
};

type Comments_Item = {
    writer: {
        uid: string;
        name: string;
        avatar: string;
        grade: string;
    };
    comment: string;
    parentComment: string;
    isDeleted: Boolean;
    createdAt: Date;
    updatedAt: Date;
    plus: Array<string>;
};

type ContentImg_Item = {
    _id: string;
    author: string;
    img: string;
};

type Content_Item = {
    _id: string;
    desc: string;
    images: Array<ContentImg_Item>;
    title: string;
};

type Series_Item = {
    count: string;
    cover: string;
    createdAt: Date;
    desc: string;
    plus: Array<string>;
    smallTitle: string;
    title: string;
    _id: string;
    comments: Array<Comments_Item>;
    content: Array<Content_Item>;
    recommendation: Array<recommendation_Item>;
};

const windowWidth = Dimensions.get('window').width;

export const SeriesBInfoScreen = (
    props: SeriesBDetailInfoProps,
): LayoutElement => {
    const ScrollVewRef = React.useRef(null);
    const [height, setHeight] = React.useState<number>(0);
    const [Id, setId] = React.useState(props.route.params.Id);
    const [content, setContent] = React.useState<Series_Item>(null);
    const [contentInfo, setContentInfo] = React.useState<Array<Content_Item>>(
        [],
    );
    const [carouselIndex, setCarouselIndex] = React.useState<number>(0);
    const [recommendation, setRecommendation] = React.useState<
        Array<recommendation_Item>
    >([]);
    const [comments, setComments] = React.useState<Array<Comments_Item>>([]);
    const [nowComment, setNowComment] = React.useState('');
    const [bookmarkList, setBookmarkList] = React.useState([]);
    const [shareImage, setShareImage] = React.useState();
    const [Glochat, setGlochat] = React.useState(false);
    const [modalItem, setModalItem] = React.useState();

    const user = auth().currentUser;
    const uid = user?.uid;

    const routeName = getFocusedRouteNameFromRoute(props.route);

    React.useEffect(() => {
        encodeBase64Img();
    }, [content]);
    // console.log(Id)

    // 모달 컴포넌트에 bool 값 전달 후 바로 초기화
    React.useEffect(() => {
        if (Glochat) {
            setGlochat(false);
        }
    }, [Glochat])

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            InitSeries();
        });

        return unsubscribe;
    }, []);

    async function InitSeries() {
        var Content = await axios.get(SERVER + '/api/blog/' + Id);

        console.log(Content.data);

        setContent(Content.data);
        setContentInfo(Content.data.contents);
        setRecommendation(Content.data.recommendation);
        setComments(Content.data.comments);
        console.log(Content.data.contents)

        // 북마크 조회 하기 위한 함수
        if (uid) {
            const authToken = await auth().currentUser?.getIdToken();
            var config = {
                method: 'get',
                url: SERVER + '/api/users/bookmark',
                headers: {
                    Authorization: 'Bearer ' + authToken,
                },
            };

            axios(config)
                .then(function (response) {
                    let data = response.data.blog;
                    let dataTemp = [];

                    data.forEach((item) => {
                        dataTemp.push(item.id);
                    });

                    setBookmarkList(dataTemp);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    const kakaoTest = async () => {

        // 현재 링크 클릭 시 첨부된 링크로 연결되지 않고
        // 앱의 메인 경로로만 연결됩니다 -> 해결 필요
        try {
            const response = await KakaoShareLink.sendFeed({
                content: {
                    title: content?.title,
                    imageUrl:
                        content?.cover,
                    link: {
                        webUrl: 'https://www.google.com',
                        mobileWebUrl: 'https://www.google.com',
                    },
                    description: content?.smallTitle,
                },
                social: {
                    likeCount: content?.plus.length,
                    viewCount: content?.count,
                },
                buttons: [
                    {
                        title: 'Open in Glokool',
                        link: {
                            webUrl: 'https://www.google.com',
                            mobileWebUrl: 'https://www.google.com',
                            androidExecutionParams: [{ key: 'key1', value: 'value1' }],
                            iosExecutionParams: [
                                { key: 'key1', value: 'value1' },
                                { key: 'key2', value: 'value2' },
                            ],
                        },
                    },
                ],
            });
            console.log(response);
        } catch (e) {
            console.error(e);
            console.error(e.message);
        }
    }

    const facebookShare = async () => {
        // facebook 에 공유하는 부분 (링크, quotion)
        const sharingOptions = {
            contentType: 'link',
            contentUrl: 'https://glokool.page.link/jdF1',
            quote: content?.title + '\nClick to find out exclusive Korea travel tips!',
        };

        const result = await ShareDialog.canShow(sharingOptions).then((canShow) => {
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
                var res = event.target.result;
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
        setGlochat(!Glochat);
        setModalItem(item);
    }

    // sns 공유 메소드
    const shareItems = async () => {
        // // sns 공유
        const shareOptions = {
            title: 'Share Contents',
            // 여기 메세지 앞에 indent 추가하지 말아주세요!
            message: `${content?.title}
Click to find out exclusive Korea travel tips!
glokool.page.link/jdF1`,
            url: shareImage,
        };
        Share.open(shareOptions);

    }


    const RenderCarousel = (item: { item: ContentImg_Item; index: number }) => {
        return (
            <Layout>
                <Image
                    source={{ uri: item.item.img }}
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

    const PressBookmark = async () => {
        const authToken = await auth().currentUser?.getIdToken();
        var axios = require('axios');
        var data = qs.stringify({
            blogCode: content?._id,
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
            .then((response) => {
                InitSeries();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // 하트 버튼
    const PressPlus = async () => {
        const authToken = await auth().currentUser?.getIdToken();
        var config = {
            method: 'patch',
            url: SERVER + '/api/blog/' + content?._id + '/like',
            headers: {
                Authorization: 'Bearer ' + authToken,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        axios(config)
            .then((response) => {
                // console.log(response.status)

                InitSeries();
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
            url: SERVER + '/api/blog/comments',
            headers: {
                Authorization: 'Bearer ' + authToken,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data,
        };

        axios(config)
            .then((response) => {
                setNowComment('');
                InitSeries();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const DeleteComment = async (id) => {
        const authToken = await auth().currentUser?.getIdToken();
        var config = {
            method: 'delete',
            url: SERVER + '/api/blog/' + content?._id + '/comments/' + id,
            headers: {
                Authorization: 'Bearer ' + authToken,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        axios(config)
            .then((response) => {
                InitSeries();
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
                InitSeries();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return content == null ? (
        <Layout style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <ActivityIndicator color='#999' size='large'/>
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
                    ref={ScrollVewRef}
                    onScroll={(e) => setHeight(e.nativeEvent.contentOffset.y)}>
                    <SafeAreaView
                        style={{ flex: 0, backgroundColor: '#00FF0000' }}
                    />
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
                        <Image source={{ uri: content?.cover }} style={styles.CoverImg} />
                        <Layout style={styles.SeriesBottomLayout}>
                            <Layout style={styles.SeriesDateLayoutStyle}>
                                <Text style={styles.SeriesDateTxtStyle}>{moment(content?.createdAt).format("YYYY-MM-DD")}</Text>
                            </Layout>
                            <Layout style={styles.SeriesCountLayoutStyle}>
                                <CountNum style={styles.SeriesCountIconLayoutStyle} />
                                <Text style={styles.SeriesCountTxtStyle}>{content?.count}</Text>
                            </Layout>
                            <Layout style={styles.TopImgIconLayout}>
                                {uid ? (
                                    <TouchableOpacity style={styles.BookmarkTouch} onPress={() => PressBookmark()}>
                                        {bookmarkList.indexOf(Id) == -1 ?
                                            <Bookmark />
                                            :
                                            <Bookmark_P />
                                        }
                                    </TouchableOpacity>
                                ) : null}
                                {uid ? (
                                    <TouchableOpacity style={styles.PlusTouch} onPress={() => PressPlus()}>
                                        {content?.plus.indexOf(uid) == -1 ? (
                                            <Plus />
                                        ) : (
                                            <Plus_P />
                                        )}
                                    </TouchableOpacity>
                                ) : null}
                            </Layout>
                        </Layout>
                    </Layout>
                    <Layout style={styles.TopTxtContainer}>
                        <Text style={styles.TitleTxt}>{content?.title}</Text>
                        <Text style={styles.SmallTitleTxt}>{content?.smallTitle}</Text>
                        <SelectableText style={styles.descTxt} item={content?.desc} />
                        <SelectableText style={styles.LetsBeginTxt} item={"Let's Begin !"} />
                    </Layout>

                    {/* content carousel */}
                    {contentInfo.map((item) => (
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
                                loop={true}
                                autoplay={false}
                                onSnapToItem={(index: number) =>
                                    setCarouselIndex(index)
                                }
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
                                <SelectableText style={styles.ContentTitleTxt} item={item.title} />
                                <SelectableText style={styles.ContentDescTxt} item={item.desc} />
                            </Layout>

                            {/* 글로서비스 컨테이너 */}
                            <TouchableOpacity onPress={() => pressService(item)}>
                                <Service />
                            </TouchableOpacity>

                        </Layout>
                    ))}
                    {/* 글로서비스 모달 */}
                    <ServiceModal isVisible={Glochat} data={modalItem} />

                    {/* 땡큐 버튼 및 Go up 버튼 */}
                    <Layout style={styles.FinalConatiner}>
                        {/* 공유 부분 */}
                        <Layout style={{ alignItems: 'center' }}>
                            <Text style={styles.ShareText}>Share with Others!</Text>
                            <Layout style={{ flexDirection: 'row', }}>
                                <TouchableOpacity
                                    style={[styles.ShareButtonContainer, { paddingHorizontal: 20, borderRadius: 8, }]}
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

                    {/* check out more */}
                    {recommendation ? (
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
                                            props.navigation.navigate(SceneRoute.SERIES_B_DETAIL, { Id: item._id });
                                        }}>
                                        <Image
                                            source={{ uri: item.image }}
                                            style={styles.RecommendationImg}
                                        />
                                    </TouchableOpacity>
                                </Layout>
                            ))}
                        </Layout>
                    ) : null}

                    {/* 그레이색 배경 */}
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
                                    <Text
                                        style={
                                            styles.PurpleBottomTxtStyle
                                        }>{`Go to Glochat >>`}</Text>
                                </Layout>
                            </Layout>
                        </Layout>
                    </Layout>

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
                            <AngleLeft style={styles.AngleLeft} />
                        </TouchableOpacity>
                        {uid ? (
                            <Layout style={styles.TopTabIconLayout}>
                                <TouchableOpacity
                                    style={styles.BookmarkTouch}
                                    onPress={() => PressBookmark()}>
                                    {bookmarkList.indexOf(Id) == -1 ? (
                                        <Bookmark />
                                    ) : (
                                        <Bookmark_P />
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.PlusTouch}
                                    onPress={() => PressPlus()}>
                                    {content?.plus.indexOf(uid) == -1 ? (
                                        <Plus />
                                    ) : (
                                        <Plus_P />
                                    )}
                                </TouchableOpacity>
                            </Layout>
                        ) : null}
                    </Layout>
                </Layout>
            ) : (
                // 맨위에 포커스
                <Layout style={styles.ContainerOpacityLayoutAngleLeft}>
                    <SafeAreaView
                        style={{ flex: 0, backgroundColor: '#00FF0000' }}
                    />
                    <TouchableOpacity
                        style={styles.ContainerAngleLeft}
                        onPress={() => props.navigation.goBack()}>
                        <AngleLeft_W style={styles.AngleLeft} />
                    </TouchableOpacity>
                </Layout>
            )}
        </Layout>
    );
};

const styles = StyleSheet.create({
    ContainerLayout: {},
    Container: {
        backgroundColor: 'white',
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
        backgroundColor: '#00FF0000',
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
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#00FF0000',
        height: '100%',
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
    CarouselInsideContainer: {
        marginLeft: -16,
        alignItems: 'center',
        width: windowWidth,
        height: windowWidth,
    },
    CarouselDotContainer: {
        bottom: 8,
        backgroundColor: '#00FF0000',
        opacity: 40,
        alignSelf: 'center',
    },
    CarouselDot: {
        width: 13,
        height: 4,
        borderRadius: 30,
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
        fontSize: 17,
        color: '#7777ff'
    },
})
