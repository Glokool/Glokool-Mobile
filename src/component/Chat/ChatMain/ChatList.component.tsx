import React from 'react';
import { StyleSheet, Pressable, FlatList, ScrollView } from 'react-native';
import { Layout, Text, Divider } from '@ui-kitten/components';
import { Arrow_Bottom, Chat_Book_Button, Guide_Location } from '../../../assets/icon/Chat';
import { windowHeight, windowWidth } from '../../../Design.component';
import FastImage from 'react-native-fast-image';
import { ChatRoomScreenProps } from '../../../navigation/ScreenNavigator/Chat.navigator';
import { SceneRoute } from '../../../navigation/app.route';


export const ChatList = (props : ChatRoomScreenProps) : React.ReactElement => {

    const [data, setData] = React.useState([
        {
            _id : 'testChat',
            day: new Date(),
            guide: {
                name: 'beomseok',
                score: 10,
                uid: 'PZhXvw6fKecR0fWfD8Y80yCc6EC3',
                token: '123',
                avatar: '123',
            },
        },
    ]);
    const [freeTrialData, setFreeTrailData] = React.useState([
        {
            _id : 'dkvoslsd-wkdjvisw12'
        },
        {
            _id : 'dkvoslsd-wkdjvisw14'
        },
        {
            _id : 'dkvoslsd-wkdjvisw13'
        },
    ]);

    const renderGuide = ({item} : {item : any, index : number}) : React.ReactElement => {


        return(
            <Pressable onPress={() => props.navigation.navigate(SceneRoute.CHATROOM, {
                id: item._id,
                guide: {
                    name: item.guide.name,
                    uid: item.guide.uid,
                    token: item.guide.token,
                },
                day: item.day,
                finish: true,
            })}>
                <Layout style={styles.ChatRoomContainer}>

                    <Layout style={styles.ChatLocationTitle}>
                        <Guide_Location />
                        <Text style={styles.GuideLocationTitleText}>  HONGDAE</Text>
                    </Layout>

                    <Divider style={styles.ChatRoomDivider}/>

                    <Layout style={styles.ChatRoomProfileContainer}>

                        <FastImage source={require('../../../assets/image/Chat/guideGray.png')} style={styles.ChatRoomProfileImage} />

                        <Layout style={styles.ChatRoomGuideInfoContainer}>

                            <Text style={styles.ChatRoomGuideTitle1}>Travel Assistant</Text>
                            <Text style={styles.ChatRoomGuideTitle2}>Glokool Official</Text>

                            <Layout style={styles.ChatRoomGuideTagContainer}>

                                <Layout style={styles.ChatRoomTagTextContainer}>
                                    <Text style={styles.ChatRoomTagText}>K-POP lover</Text>
                                </Layout>

                                <Layout style={styles.ChatRoomTagTextContainer}>
                                    <Text style={styles.ChatRoomTagText}>Hidden Spots</Text>
                                </Layout>

                            </Layout>

                        </Layout>

                        
                        <Layout style={styles.ChatRoomInfoContainer}>
                            <Text style={styles.TimeText}>00:00</Text>

                            <Layout style={styles.UnreadMessageContainer}>
                                <Text style={styles.UnreadMessageText}>3</Text>
                            </Layout>
                        </Layout>

                    </Layout>

                </Layout>
            </Pressable>
            

        )
    }

    const renderItem = ({item} : {item : any, index : number}) : React.ReactElement => {

        return(
            <Layout style={styles.GuideInfoContainer}>

                <Layout style={styles.GuideTitleContainer}>
                    <Guide_Location />
                    <Text style={styles.GuideLocationTitleText}>  HONGDAE</Text>
                </Layout>

                <Layout style={styles.GuideProfileContainer}>

                    <Layout style={styles.GuideProfileImageContainer}>
                        <FastImage source={require('../../../assets/image/Chat/guideGray.png')} style={styles.GuideProfileImage} />
                    </Layout>

                    <Layout style={styles.GuideProfileInfoContainer}>
                        <Text style={styles.GuideNameText}>GlokoolOfficial</Text>
                        <Text style={styles.GuideTagText1}># <Text style={styles.GuideTagText2}>k-pop Lover</Text></Text>
                        <Text style={styles.GuideTagText1}># <Text style={styles.GuideTagText2}>k-pop Lover</Text></Text>
                    </Layout>

                </Layout>

            </Layout>
        )
    }

    // 비었을 때
    if (data.length === 0) {
        return(
            <Layout style={styles.Container}>

                <ScrollView>

                    <Text style={styles.Title}>MY GloChat</Text>

                    <Layout style={styles.MainContainer}>
                        <Text style={styles.EmptyTextTitle}>No Message Yet</Text>
                        <Text style={styles.EmptyTextDesc}>
                            {`Start chatting with the travel assistant now!\n`}
                            {`choose your travel destination first.`}
                        </Text>

                        <Arrow_Bottom style={styles.BottomIcon}/>

                        <Pressable>
                            <Chat_Book_Button />
                        </Pressable>
                        
                    </Layout>

                    <Divider style={styles.Divider}/>

                    <Text style={styles.Title}>START FREE TRIAL</Text>
                    <Text style={styles.Desc}>with a local travel assistant!</Text>

                    <FlatList
                        style={styles.GuideHorizontalList}
                        keyExtractor={(item: any, index) => item._id}
                        data={freeTrialData}
                        renderItem={renderItem}
                        horizontal={true}
                        contentContainerStyle={styles.ListContainer}
                    />
                
                </ScrollView>

                <Layout style={styles.ADContainer}>
                    <FastImage source={require('../../../assets/image/Chat/Chat_Main_Bottom_AD.png')} style={styles.ADContainer}/>

                    <Pressable style={styles.ADButton}>
                        <FastImage source={require('../../../assets/image/Chat/GloChat_AD_Button.png')} style={styles.ADButtonImage} />
                    </Pressable>
                </Layout>

            </Layout>

        )
    }


    return(

        <Layout style={styles.Container}>

            <Text style={styles.Title}>MY GloChat</Text>


            <FlatList 
                style={styles.GuideVerticalList}
                keyExtractor={(item: any, index) => item._id}
                data={data}
                renderItem={renderGuide}
            />

            <Layout style={styles.ADContainer}>
                <FastImage source={require('../../../assets/image/Chat/Chat_Main_Bottom_AD.png')} style={styles.ADContainer}/>

                <Pressable style={styles.ADButton}>
                    <FastImage source={require('../../../assets/image/Chat/GloChat_AD_Button.png')} style={styles.ADButtonImage} />
                </Pressable>
            </Layout> 

        </Layout>

    )
}

const styles = StyleSheet.create({
    Container: {
        marginBottom: 65,
        height : windowHeight - 75 - 6 - 65
    },

    MainContainer: {
        width: '100%',
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40
    },

    MainContainer2: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    Title : {
        marginLeft : 20,
        fontFamily: 'Pretendard-Bold',
        fontSize: 17,
        marginVertical: 20
    },

    Desc : {
        marginLeft : 20,
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 17,
        marginTop : -20,
        color: '#A7A7A7'
    },

    EmptyTextTitle : {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 17,
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 20
    },

    EmptyTextDesc : {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#AAAAAA',
        textAlign: 'center',
        marginBottom: 20
    },

    BottomIcon : {
        marginBottom: 20
    },

    Divider : {
        backgroundColor: '#F8F8F8',
        height: 6,
        width: '100%'
    },

    GuideHorizontalList: {
        marginVertical: 10,
        width: '100%',
    },

    GuideVerticalList : {
        width: '100%',
    },

    ListContainer: {
        paddingRight: 15,
        paddingVertical: 5
    },

    GuideInfoContainer: {
        minWidth : 232,
        width : windowWidth * 0.56,
        minHeight : 144,
        height : windowHeight * 0.16,
        borderRadius : 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15,
        marginBottom: 30
    },

    GuideTitleContainer: {
        width : '87%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#EFEFEF',
        borderRadius: 25,
        marginBottom: 10,
        flexDirection: 'row'
    },

    GuideLocationTitleText: {
        fontFamily : 'BrandonGrotesque-Bold',
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },

    GuideProfileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },

    GuideProfileImageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    GuideProfileImage: {
        width : 70,
        height : 70,
        borderRadius: 50
    },

    GuideProfileInfoContainer: {
        flex : 3,
        alignItems: 'center',
        justifyContent: 'center'
    },

    GuideNameText: {
        fontFamily : 'Pretendard-SemiBold',
        fontSize: 16,
        textAlign : 'left',
        alignSelf: 'flex-start',
        marginLeft: 5
    },

    GuideTagText1 : {
        fontFamily: 'Pretendard-Medium',
        fontSize : 14,
        color: '#BEBEBE',
        alignSelf: 'flex-start',
        marginLeft: 7
    },

    GuideTagText2: {
        fontFamily: 'Pretendard-Medium',
        fontSize : 14,
    },

    ADContainer: {
        width: '100%',
        minHeight: 120,
        height : windowHeight * 0.13,
        borderRadius: 10,
    },

    ADButton : {
        position: 'absolute',
        bottom : 10,
        right : 10
    },

    ADButtonImage: {
        width: 160,
        height : 44
    },

    ChatRoomContainer: {
        width : '95%',
        minHeight: 180,
        alignSelf : 'center',
        marginHorizontal: 15,
        paddingHorizontal : 20,
        paddingVertical: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        marginVertical: 10,
    },

    ChatLocationTitle: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },

    ChatRoomDivider : {
        backgroundColor: '#F8F8F8',
        height: 3,
        width: '100%',
        marginVertical: 10
    },

    ChatRoomProfileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop : 10
    },

    ChatRoomProfileImage: {
        width: 74,
        height : 74,
        borderWidth: 2,
        borderColor: '#EEEEFF',
        borderRadius: 50,
        marginRight: 10
    },

    ChatRoomGuideInfoContainer : {
        alignItems: 'flex-start',
        justifyContent : 'center'
    },

    ChatRoomGuideTagContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop : 5
    },

    ChatRoomGuideTitle1 : {
        fontFamily: 'Pretendard-Medium',
        fontSize: 14,
        color: '#B4B4B4'
    },

    ChatRoomGuideTitle2 : {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18,
        color: 'black'
    },

    ChatRoomTagTextContainer : {
        backgroundColor: '#F1F1FF',
        borderRadius: 15
    },

    ChatRoomTagText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 12,
        color: '#6464A0',
        marginVertical: 5,
        marginHorizontal: 10
    },

    ChatRoomInfoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    TimeText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 12,
        color: '#929292'
    },

    UnreadMessageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor : '#7777FF',
        marginHorizontal: 10
    },

    UnreadMessageText : {
        fontFamily : 'BrandonGrotesque-Bold',
        fontSize: 15,
        color: 'white',
        margin: 3,
        marginHorizontal: 10
    }


})