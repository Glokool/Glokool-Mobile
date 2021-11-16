import React from 'react';
import auth from '@react-native-firebase/auth';
import {
    StyleSheet,
    Dimensions,
    FlatList,
    Platform,
    Text,
    Pressable
} from 'react-native';
import { Layout } from '@ui-kitten/components';
import { HistoryScreenProps } from '../../navigation/SceneNavigator/My.navigator';
import { Location } from '../../assets/icon/Common';
import { CommonTopTabBar } from '../../component/Common';
import axios from 'axios';
import { CDN, SERVER } from '../../server.component';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import { SceneRoute } from '../../navigation/app.route';

const windowWidth = Dimensions.get('window').width;

interface HistoryChatData {
    _id : string;
    keyward : Array<string>;
    guide : {
        avatar : string;
        name : string;
        uid : string;
    }
    maxUserNum : number;
    price : {
        discountPrice : string;
        price : string;
    }
    priority : number;
    reservationPending: Array<string>;
    travelDate: Date;
    users : Array<String>;
    zone : string;
}

export const HistoryScreen = (props: HistoryScreenProps) => {

    const [data, setData] = React.useState<Array<HistoryChatData>>([]);

    React.useEffect(() => {
        InitPastChat();
    }, []);

    const InitPastChat = async() => {

        const token = await auth().currentUser?.getIdToken();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        axios.get(SERVER + '/users/chat-rooms/past', config)
            .then((result) => {
                setData(result.data);
            })
            .catch((err) => {
                console.log("에러 : ", err)
            })
    }

    const PressChat = (item : HistoryChatData) => {
        props.navigation.navigate(SceneRoute.CHATROOM, {
            id: item._id,
            guide: {
                name: item.guide.name,
                uid: item.guide.uid,
                avatar: item.guide.avatar,
            },
            zone: item.zone,
            maxUser: item.maxUserNum,
            day: moment(item.travelDate).format('yyyy-MM-DD'),
            finish: true,
        })
    }

    const renderItem = (item : {item : HistoryChatData, index : number}) => {



        return (
            <Pressable 
                style={styles.ItemContainer}
                onPress={() => PressChat(item.item)}
            >

                <Layout style={styles.ImageItem}>
                    <FastImage source={{uri : CDN + item.item.guide.avatar}} style={styles.ImageItem}/>
                </Layout>
                
                <Layout style={styles.InfoContainer}>
                    <Layout style={styles.LocationContainer}>
                        <Location />
                        <Text style={styles.LocationText}>{item.item.zone}</Text>
                    </Layout>
                    <Layout style={styles.InfoItem}>
                        <Text style={[styles.InfoText, { color: '#b4b4b4', flex: 1, }]}>Travel Assistant</Text>
                        <Text style={[styles.InfoText, { flex: 1 }]}>{item.item.guide.name}</Text>
                    </Layout>
                    <Layout style={styles.InfoItem}>
                        <Text style={[styles.InfoText, { color: '#b4b4b4', flex: 1, }]}>Booking Date</Text>
                        <Text style={[styles.InfoText, { flex: 1 }]}>{moment(item.item.travelDate).format('yyyy.MM.DD')}</Text>
                    </Layout>
                </Layout>

            </Pressable>
        )
    }

    return (
        <Layout style={styles.MainContainer}>

            {/* Top Tab Bar */}
            <CommonTopTabBar title={'HISTORY'} child={<Layout style={{ borderBottomWidth: 0.5, borderBottomColor: '#ddd' }} />} />

            {/* Previous Chatting List */}
            <FlatList
                data={data}
                renderItem={renderItem}
                style={styles.FlatListContainer}
            />

        </Layout>
    )
};

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    TopTabContainer: {
        width: windowWidth,
        paddingBottom: 10,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        backgroundColor: 'white',
    },
    TopTabItems: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    TopTabText: {
        flex: 5,
        fontFamily: 'BrandonGrotesque-Bold',
        textAlign: 'center',
        fontSize: 20,
    },
    BackButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ItemContainer: {
        flexDirection: 'row',
        backgroundColor : 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 2,
    },
    ImageItem: {
        width: 60,
        height: 60,
        borderWidth: 0.3,
        borderRadius: 100,
    },
    InfoItem: {
        flexDirection: 'row',
        width: windowWidth * 0.65,
        alignItems: 'center',
    },
    InfoText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
    },
    LocationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    LocationText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 16,
        marginLeft: 5,
    },
    InfoContainer: {
        marginLeft: 10
    },
    FlatListContainer: {
        width: windowWidth,
        paddingTop: 10,
    }
});