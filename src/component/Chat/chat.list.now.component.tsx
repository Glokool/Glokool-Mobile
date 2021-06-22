import React from 'react';
import auth from '@react-native-firebase/auth';
import {
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';
import {
    Layout,
    Text,
    LayoutElement 
} from '@ui-kitten/components';
import { ChatListNowProps } from '../../navigation/ScreenNavigator/Chat.navigator';
import axios from 'axios';
import { SERVER } from '../../server.component';
import { GloChatData } from '.';
import moment from 'moment';
import { SceneRoute } from '../../navigation/app.route';




export const ChatListNow = (props : ChatListNowProps) : LayoutElement => {

    const user = auth().currentUser;
    const Today = new Date();
    const [data, setData] = React.useState<Array<GloChatData>>([]);
    const [refresh, setRefresh] = React.useState<boolean>(false);

    React.useEffect(() => {
        InitNowList();
    }, []);

    async function InitNowList() {
        const Token = await user?.getIdToken(true);
        const AxiosConfig = {
          method: 'get',
          url: SERVER + '/api/users/reservations/future',
          headers: { 
            'Authorization': 'Bearer ' + Token 
          }
        }
        const RevData = await axios(AxiosConfig);
        setData(RevData.data);
    }

    function PressChatRoom(item : GloChatData){
        props.navigation.navigate(SceneRoute.CHATROOM, { id : item._id, guide: {name : item.guide.name, uid : item.guide.uid}, finish: true })
    }

    const RenderItem = (item : {item : GloChatData, index : number}) => {

        const DDay = moment(item.item.day).diff(Today, 'days');

        return(
            <Layout style={styles.ChatLayout}>
                <TouchableOpacity style={styles.ChatContainer} onPress={() => PressChatRoom(item.item)}>

                    <Layout style={styles.GuideContainer}>

                        <Layout style={styles.GuideAvatarContainer}>
                            <Image source={require('../../assets/profile/profile_01.png')} style={styles.GuideAvatar} resizeMode={'stretch'}/>
                        </Layout>

                        <Layout style={styles.GuideProfileContainer}>
                            <Text style={styles.GuideProfileTxt1}>Travel Assistant</Text>
                            {(item.item.guide.uid === '')?
                                <Text style={styles.GuideProfileTxt3}>Matching... please wait :)</Text>
                                :
                                <Text style={styles.GuideProfileTxt2}>{item.item.guide.name}</Text>
                            }
                        </Layout>

                    </Layout>

                    <Layout style={styles.DateContainer}>
                        {(DDay > 0)?  
                            <Text style={styles.DdayTxt}>D - {DDay}</Text>
                        :
                            <Text style={styles.DdayTxt}>D - Day</Text>
                        }                    
                        <Text style={styles.dateTxt}>{(moment(item.item.day).format('MM.DD'))}</Text>
                    </Layout>

                </TouchableOpacity>
            </Layout>
        )
    }

    return(
        <Layout>
            {(data.length === 0)? 
                <Layout style={styles.EmptyContainer}>
                    <Text style={styles.EmptyText}>Empty</Text>
                    <TouchableOpacity style={styles.EmptyButton} onPress={() => props.navigation.navigate(SceneRoute.SERIES_A_DETAIL, {Id : '60cc026bee8b3104211971b5' })}>
                        <Text style={styles.EmptyButtonText}>How to use GloChat?!</Text>
                    </TouchableOpacity>
                </Layout>            
            :
                <Layout style={styles.Container}>

                <FlatList 
                    data={data}
                    renderItem={RenderItem}
                    refreshing={refresh}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 500}}
                />
                </Layout>
            }

        </Layout>
    );
}

const styles = StyleSheet.create({
    EmptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    EmptyText: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 16,
        color: '#C3C3C3',
        marginBottom: 20,
        marginTop: 50,
    },
    EmptyButton: {
        width: 250,
        height: 60,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    EmptyButtonText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 20,
        color: '#7777FF'
    },
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#00FF0000',
        marginBottom: 10
    },
    ChatLayout: {
        width: '99%',
        alignSelf: 'center',
        paddingHorizontal: 10,
        height: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        marginBottom: 10
    },
    ChatContainer: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',

    },
    GuideContainer: {
        flexDirection: 'row',
        flex: 8,
        backgroundColor: '#00FF0000'
    },
    GuideAvatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00FF0000'
    },
    GuideAvatar: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    GuideProfileContainer: {
        marginLeft: 10,
        backgroundColor: '#00FF0000'
    },
    GuideProfileTxt1: {
        fontFamily:'IBMPlexSansKR-Medium',
        fontSize: 15,
        color: '#C3C3C3',
        marginBottom: -5
    },
    GuideProfileTxt2: {
        fontFamily:'IBMPlexSansKR-Medium',
        fontSize: 15,
        color: 'black',
        marginTop: 0
    },
    GuideProfileTxt3: {
        fontFamily:'IBMPlexSansKR-Medium',
        fontSize: 15,
        color: '#7777FF',
        marginTop: 0
    },
    DateContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00FF0000'
    },
    DdayTxt: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 16,
        color: '#8797FF',
    },
    dateTxt: {
        fontFamily:'IBMPlexSansKR-Medium',
        fontSize: 12,
        color: 'black',
        marginBottom: -5
    }
})