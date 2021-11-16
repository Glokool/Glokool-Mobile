import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, ScrollView } from 'react-native';
import { Divider, Layout } from '@ui-kitten/components';
import { ChatTASelectSceneProps } from '../../../navigation/SceneNavigator/Chat.navigator';
import { BookButton, EmptyTAIcon, GroupChattingPerson, GroupChattingType } from '../../../assets/icon/Chat/GuideList';
import FastImage from 'react-native-fast-image';
import { NavigatorRoute, SceneRoute } from '../../../navigation/app.route';
import { CurrentKoreanTimeComponent } from '.';
import { useInterval } from '../ChatRoom/Audio/Timer.component';
import { windowHeight, windowWidth } from '../../../Design.component';
import { CDN, SERVER } from '../../../server.component';
import axios from 'axios';

interface GuideData {
    _id: string;
    createdAt: Date;
    guide: {
        _id: string;
        avatar: string;
        name: string;
        uid: string;
        oneLineIntro: string;
        keyword: Array<string> | undefined;
    }
    maxUserNum: number;
    price: {
        discountPrice: number;
        price: number;
    }
    reservationPendingCount: number;
    travelDate: Date;
    userCount: number;
}

export const GuideListComponent = (props: ChatTASelectSceneProps): React.ReactElement => {

    const KRTIMEDIFF = 9 * 60 * 60 * 1000;

    const [data, setData] = React.useState<Array<GuideData>>([]);

    const date = new Date();
    const utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
    const [time, setTime] = React.useState(new Date(utc + KRTIMEDIFF));

    useInterval(() => {
        const date = new Date();
        const utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
        setTime(new Date(utc + KRTIMEDIFF));
    }, 30000);

    React.useEffect(() => {
        // 서버에서 정보 가져오기;
        const URL = SERVER + '/chat-rooms';
        const config = {
            params: {
                q: (props.route.params.zone).toLowerCase()
            }
        }

        axios.get(URL, config)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                console.log('가이드 리스트 받아오기 실패 : ', err);
            })

    }, [])



    const renderGuide = ({ item }: { item: GuideData, index: number }) => {

        return (
            <Layout style={styles.GuideContainer}>

                <Layout style={styles.GuideInfoContainer}>
                    <FastImage source={{ uri: CDN + item.guide.avatar }} style={styles.Avatar} />
                    <Layout style={styles.GuideInfoTextContainer}>
                        <Layout style={styles.GuideNameContainer}>
                            <Text style={styles.GuideName}>{item.guide.name}</Text>
                            <Pressable style={styles.Button} onPress={() => {
                                props.navigation.navigate(NavigatorRoute.PAY, {
                                    screen: SceneRoute.PAY_FIRST,
                                    params: {
                                        ChatRoomID: item._id,
                                        guide: item.guide._id,
                                        price: item.price,
                                        guideName: item.guide.name,
                                        zone: props.route.params.zone,
                                        maxUserNum: item.maxUserNum
                                    }
                                })
                            }}>
                                <BookButton width={windowWidth * 0.18} height={windowWidth * 0.18 / 8 * 3} />
                            </Pressable>
                        </Layout>
                        <Text numberOfLines={2} style={styles.GuideDesc}>{item.guide.oneLineIntro}</Text>
                    </Layout>
                </Layout>

                {(item.guide.keyword?.length === 2) ?
                    <Layout style={styles.TagContainer}>
                        <Layout style={styles.Tag}>
                            <Text style={styles.TagText}>{item.guide.keyword[0]}</Text>
                        </Layout>

                        <Layout style={styles.Tag}>
                            <Text style={styles.TagText}>{item.guide.keyword[1]}</Text>
                        </Layout>
                    </Layout>
                    :
                    <Layout style={styles.TagContainer} />
                }

                <Divider style={styles.Divider} />

                <Layout style={styles.BottomContainer}>
                    <Layout style={styles.TypeContainer}>
                        <Layout style={styles.IconContainer}>
                            <GroupChattingType />
                            <Text style={styles.DescText}>{(item.maxUserNum === 1) ? 'Private Chat' : 'Group Chat'}</Text>
                        </Layout>

                        <Layout style={styles.IconContainer}>
                            <GroupChattingPerson />
                            <Text style={styles.DescText}>{item.maxUserNum}</Text>
                        </Layout>
                    </Layout>

                    <Layout style={styles.PriceContainer}>
                        <Text style={styles.DiscountBeforeText1}>$ <Text style={styles.DiscountBeforeText2}>{item.price.price}</Text></Text>
                        <Text style={styles.DiscountAfterText1}> $ <Text style={styles.DiscountAfterText2}>{item.price.discountPrice}</Text> / day</Text>
                    </Layout>
                </Layout>
            </Layout>
        )
    }

    return (
        <ScrollView scrollEnabled={data.length > 0} showsVerticalScrollIndicator={false}>

            <CurrentKoreanTimeComponent year={time.getFullYear()} month={time.getMonth() + 1} day={time.getDate()} hour={time.getHours()} minutes={time.getMinutes()} time={time} />
            <Text style={styles.MainTitle}>FIND THE BEST</Text>
            <Text style={styles.SubTitle}>TRAVEL ASSISTANT FOR YOU</Text>

            {data.length > 0 ? (
                <FlatList
                    data={data}
                    contentContainerStyle={{ padding: 2 }}
                    keyExtractor={(item) => (item._id)}
                    renderItem={renderGuide}
                    scrollEnabled={false}
                    style={{ alignSelf: 'center' }}
                />
            ) : (
                <Layout style={styles.EmptyContainer}>
                    <EmptyTAIcon />
                    <Text style={styles.EmptyTitle1}>Comming Soon</Text>
                    <Text style={styles.EmptyTitle2}>We are currently updating our travel assistants list.</Text>
                    <Text style={styles.EmptyTitle3}>Discover various travel tips at the “Zone” tap!</Text>
                </Layout>
            )}

        </ScrollView>


    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },

    GuideContainer: {
        width: windowWidth * 0.9,
        paddingVertical: windowWidth * 0.05,
        paddingHorizontal: windowWidth * 0.03,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginBottom: 20
    },

    GuideInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    GuideInfoTextContainer: {
        alignItems: 'flex-start',
        marginLeft: 5,
        flex: 1,
        height: 80,
        paddingBottom: 5
    },

    GuideNameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 5,
        width: '100%'
    },

    Avatar: {
        width: 80,
        height: 80,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: '#FFE4D2'
    },

    Button: {
        width: 80,
        height: 30
    },

    TagContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        marginLeft: 85,
        marginVertical: 5
    },

    Tag: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1F1FF',
        borderRadius: 19,
        paddingVertical: 3,
        width: '48%'
    },

    Divider: {
        height: 2,
        width: '100%',
        backgroundColor: '#F3F3F3',
        marginVertical: 5
    },

    BottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        flex: 1
    },

    IconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5
    },

    TypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },

    PriceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },

    MainTitle: {
        fontFamily: 'Pretendard-SemiBold',
        color: '#404040',
        fontSize: 17,
        marginLeft: windowWidth * 0.06,
        marginTop: windowHeight * 0.01,
    },
    SubTitle: {
        fontFamily: 'Pretendard-Bold',
        color: '#000000',
        fontSize: 17,
        marginLeft: windowWidth * 0.06,
        marginBottom: windowHeight * 0.02,
    },

    GuideName: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 19,
        color: 'black'
    },

    GuideDesc: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 15,
        marginLeft: 5,
        marginTop: 5,
        color: '#858588'
    },

    TagText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 14,
        color: '#52528B',
    },

    DescText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: windowWidth * 0.035,
        color: 'black',
        textAlignVertical: 'center',
        marginLeft: 5
    },

    DiscountBeforeText1: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: windowWidth * 0.037,
        color: '#D1D1D1'
    },

    DiscountBeforeText2: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: windowWidth * 0.037,
        color: '#D1D1D1',
        textDecorationLine: 'line-through',
    },

    DiscountAfterText1: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: windowWidth * 0.042,
        color: '#7777FF'
    },

    DiscountAfterText2: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: windowWidth * 0.042,
        color: 'black'
    },

    EmptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: windowHeight * 0.03
    },

    EmptyTitle1: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 18,
        marginVertical: 10
    },

    EmptyTitle2: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
    },

    EmptyTitle3: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#A5A5A5'
    }



})