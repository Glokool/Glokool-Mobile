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
import { ChatListRecentProps } from '../../navigation/ScreenNavigator/Chat.navigator';
import moment from 'moment';
import { GloChatData } from '.';
import axios from 'axios';
import { SERVER } from '../../server.component';
import { SceneRoute } from '../../navigation/app.route';


export const ChatListRecent = (props : ChatListRecentProps) : LayoutElement => {


    const user = auth().currentUser;
    const [data, setData] = React.useState<Array<GloChatData>>([]);

    React.useEffect(() => {

        InitNowList();

    }, []);

    async function InitNowList() {
        const Token = await user?.getIdToken(true);
        const AxiosConfig = {
          method: 'get',
          url: SERVER + '/api/users/reservations/past',
          headers: { 
            'Authorization': 'Bearer ' + Token 
          }
        }
        const RevData = await axios(AxiosConfig);
        setData(RevData.data);
    }

    const RenderItem = (item : {item : GloChatData, index : number}) => {


        return(
            <TouchableOpacity style={styles.ChatContainer}>

                <Layout style={styles.GuideContainer}>

                    <Layout style={styles.GuideAvatarContainer}>
                        <Image source={require('../../assets/profile/profile_01.png')} style={styles.GuideAvatar} resizeMode={'stretch'}/>
                    </Layout>

                    <Layout style={styles.GuideProfileContainer}>
                        <Text style={styles.GuideProfileTxt1}>Travel Assistant</Text>
                        <Text style={styles.GuideProfileTxt2}>{item.item.guide.name}</Text>
                    </Layout>

                </Layout>

                <Layout style={styles.DateContainer}>
                    <Text style={styles.DdayTxt}>{moment(item.item.day).format('YYYY.MM.DD')}</Text>
                </Layout>

            </TouchableOpacity>
        )
    }

    return(
        <Layout>
            {(data.length === 0)? 
                <Layout style={styles.EmptyContainer}>
                    <Text style={styles.EmptyText}>Empty</Text>
                    <TouchableOpacity style={styles.EmptyButton} onPress={() => props.navigation.navigate(SceneRoute.SERIES_A_DETAIL, {Id : '60cc01e0ee8b3104211971b4' })}>
                        <Text style={styles.EmptyButtonText}>How to use GloChat?!</Text>
                    </TouchableOpacity>
                </Layout>            
            :
                <Layout style={styles.Container}>

                <FlatList 
                    data={data}
                    renderItem={RenderItem}
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
        height: '100%'
    },
    ChatContainer: {
        width: '100%',
        height: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#F8F8F8',
        marginBottom: 10
    },
    GuideContainer: {
        flexDirection: 'row',
        flex: 7,
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
        fontSize: 17,
        color: '#C3C3C3',
        marginBottom: -10
    },
    GuideProfileTxt2: {
        fontFamily:'IBMPlexSansKR-Medium',
        fontSize: 17,
        color: 'black',
        marginTop: -5
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
        marginTop: 15
    },
    dateTxt: {
        fontFamily:'IBMPlexSansKR-Medium',
        fontSize: 12,
        color: 'black',
        marginVertical: 0
    }
})