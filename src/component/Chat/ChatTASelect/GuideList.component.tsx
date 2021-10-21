import React from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Divider, Layout, Text } from '@ui-kitten/components';
import { ChatTASelectSceneProps } from '../../../navigation/SceneNavigator/Chat.navigator';
import { BookButton, GroupChattingPerson, GroupChattingType } from '../../../assets/icon/Chat/GuideList';
import FastImage from 'react-native-fast-image';


export const GuideListComponent = (props : ChatTASelectSceneProps) : React.ReactElement => {

    const [data, setData] = React.useState([
        {
            _id: "616d28b2e5d90f7a8568ec63",
            guide: {
                _id : "6094d2265c8f9d70b4c997aa",
                uid: "caVmbSeML7htswLPgtEQxmcFX3I3",
                avatar: "https://s3tests3.s3.ap-northeast-2.amazonaws.com/guide/caVmbSeML7htswLPgtEQxmcFX3I3/16286640089833b11d14d-4fe7.png",
                name : "GlokoolOfficial",
                desc : '테스트 문구인데요 아직 생각한게 없네요. 좋은 글귀가 있으면 추천하세요',
                keyword : ['안녕', '반가워'],
                lang: [true, false ],
                },
            maxUserNum: 1,
            price: {
                price: 50,
                discount: "20"
            },
            users: []
        },
        {
            _id: "616d28b2e5d90f7a8568ec6a",
            guide: {
                _id : "6094d2265c8f9d70b4c997aa",
                uid: "caVmbSeML7htswLPgtEQxmcFX3I3",
                avatar: "https://s3tests3.s3.ap-northeast-2.amazonaws.com/guide/caVmbSeML7htswLPgtEQxmcFX3I3/16286640089833b11d14d-4fe7.png",
                name : "GlokoolOfficial",
                desc : '테스트 문구인데요 아직 생각한게 없네요. 좋은 글귀가 있으면 추천하세요',
                keyword : ['안녕', '반가워'],
                lang: [true, false ],
                },
            maxUserNum: 1,
            price: {
                price: 50,
                discount: "20"
            },
            users: []
        },

    ]);

    const renderGuide = ({item} : {item : any, index : number}) => {



        return(
            <Layout style={styles.GuideContainer}>

                <Layout style={styles.GuideInfoContainer}>

                    <FastImage source={{uri : item.guide.avatar}} style={styles.Avatar}/>

                    <Layout style={styles.GuideInfoTextContainer}>

                        <Layout style={styles.GuideNameContainer}>

                            <Text style={styles.GuideName}>{item.guide.name}</Text>

                            <Pressable style={styles.Button}>
                                <BookButton />
                            </Pressable>

                        </Layout>

                        <Text numberOfLines={2} style={styles.GuideDesc}>{item.guide.desc}</Text>

                    </Layout>
                </Layout>

                
                <Layout style={styles.TagContainer}>
                        
                    <Layout style={styles.Tag}>
                        <Text style={styles.TagText}>{item.guide.keyword[0]}</Text>
                    </Layout>

                    <Layout style={styles.Tag}>
                        <Text style={styles.TagText}>{item.guide.keyword[1]}</Text>
                    </Layout>

                </Layout>

                <Divider style={styles.Divider} />

                <Layout style={styles.BottomContainer}>

                    <Layout style={styles.TypeContainer}>

                        <Layout style={styles.IconContainer}>
                            <GroupChattingType/>
                            <Text style={styles.DescText}>Gruop Chat</Text>
                        </Layout>          

                        <Layout style={styles.IconContainer}>
                            <GroupChattingPerson/>
                            <Text style={styles.DescText}>10</Text>
                        </Layout>                   

                    </Layout>

                    <Layout style={styles.PriceContainer}>

                        <Text style={styles.DiscountBeforeText1}>$ <Text style={styles.DiscountBeforeText2}>30</Text></Text>

                        <Text style={styles.DiscountAfterText1}> $ <Text style={styles.DiscountAfterText2}> 14.00</Text> / day</Text>

                    </Layout>


                </Layout>




            </Layout>


        )
    }



    return(
        <Layout style={styles.container}>

            <Text style={styles.MainTitle}>FIND THE BEST</Text>
            <Text style={styles.SubTitle}>TRAVEL ASSISTANT FOR YOU</Text>

            <FlatList
                data={data}
                contentContainerStyle={{padding : 2}}
                keyExtractor={(item) => (item._id)}
                renderItem={renderGuide}
            />

            {/* <Layout style={styles.EmptyContainer}>
                <Text style={styles.EmptyTitle1}>Comming Soon</Text>
                <Text style={styles.EmptyTitle2}>We are currently updating our travel assistants list.</Text>
                <Text style={styles.EmptyTitle3}>Discover various travel tips at the “Zone” tap!</Text>
            </Layout> */}




        </Layout>

    )
}


const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        flex : 1,
    },

    GuideContainer: {
        width: '100%',
        padding : 10,
        borderRadius : 10,
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

    GuideInfoTextContainer : {
        alignItems : 'flex-start',
        justifyContent: 'space-between',
        marginLeft : 5,
        flex : 1,
        height : 80,
        paddingBottom: 5
    },

    GuideNameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },

    Avatar : {
        width: 80,
        height: 80,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: '#FFE4D2'
    },

    Button : {
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

    Tag : {
        justifyContent: 'center',
        alignItems : 'center',
        backgroundColor: '#F1F1FF',
        borderRadius: 19,
        paddingVertical: 3,
        width: '48%'
    },

    Divider: {
        height : 2,
        width: '100%',
        backgroundColor: '#F3F3F3',
        marginVertical : 5
    },

    BottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex : 1
    },

    IconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5
    },

    TypeContainer: {
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex : 1
    },

    PriceContainer: {
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex : 1
    },

    MainTitle : {
        fontFamily: 'Pretendard-SemiBold',
        color: '#404040',
        fontSize: 17,
        marginLeft: 6,
    },
    SubTitle : {
        fontFamily: 'Pretendard-Bold',
        color: '#000000',
        fontSize: 17,
        marginLeft: 6,
        marginBottom: 10
    },

    GuideName : {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 19,
        color: 'black'
    },

    GuideDesc : {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 15,
        color: '#858588'
    },

    TagText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 14,
        color: '#52528B',
    },

    DescText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 15,
        color: 'black',
        textAlignVertical: 'center',
        marginLeft: 5
    },

    DiscountBeforeText1 : {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 16,
        color: '#D1D1D1'
    },

    DiscountBeforeText2 : {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 16,
        color: '#D1D1D1',
        textDecorationLine : 'line-through',
    },

    DiscountAfterText1 : {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18,
        color: '#7777FF'
    },

    DiscountAfterText2 : {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18,
        color: 'black'
    },

    EmptyContainer: { 
        justifyContent: 'center',
        alignItems : 'center',
    },

    EmptyTitle1 : {
        fontFamily: 'Pretendard-Medium',
        fontSize: 18,
        marginVertical : 10
    },

    EmptyTitle2 : {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
    },

    EmptyTitle3 : {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#A5A5A5'
    }



})