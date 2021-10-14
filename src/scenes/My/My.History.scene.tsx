import React from 'react';
import {
    StyleSheet,
    Dimensions,
    FlatList,
    Platform
} from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { HistoryScreenProps } from '../../navigation/ScreenNavigator/My.navigator';
import { Location } from '../../assets/icon/Common';
import { CommonTopTabBar } from '../../component/Common';

const windowWidth = Dimensions.get('window').width;

export const HistoryScreen = (props: HistoryScreenProps) => {

    const sampleData = [
        {
            location: 'HONGDAE',
            assistant: 'Jaehoon Jang',
            date: '2021.07.04',
        },
        {
            location: 'HONGDAE',
            assistant: 'Glokool Official',
            date: '2021.07.04',
        },
        {
            location: 'HONGDAE',
            assistant: 'Sungsoo Park',
            date: '2021.07.04',
        },
    ]

    const renderItem = (item) => {

        return (
            <Layout style={styles.ItemContainer}>
                <Layout style={styles.ImageItem} />
                <Layout style={styles.InfoContainer}>
                    <Layout style={styles.LocationContainer}>
                        <Location />
                        <Text style={styles.LocationText}>{item.item.location}</Text>
                    </Layout>
                    <Layout style={styles.InfoItem}>
                        <Text style={[styles.InfoText, { color: '#b4b4b4', flex: 1, }]}>Travel Assistant</Text>
                        <Text style={[styles.InfoText, { flex: 1 }]}>{item.item.assistant}</Text>
                    </Layout>
                    <Layout style={styles.InfoItem}>
                        <Text style={[styles.InfoText, { color: '#b4b4b4', flex: 1, }]}>Booking Date</Text>
                        <Text style={[styles.InfoText, { flex: 1 }]}>{item.item.date}</Text>
                    </Layout>
                </Layout>
            </Layout>
        )
    }

    return (
        <Layout style={styles.MainContainer}>

            {/* Top Tab Bar */}
            <CommonTopTabBar title={'HISTORY'} navigation={props.navigation} child={<Layout style={{ height: 10 }} />} />

            {/* Previous Chatting List */}
            <FlatList
                data={sampleData}
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
        fontFamily: 'Pretendard-SemiBold',
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