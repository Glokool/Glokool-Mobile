import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    View,
    Text,
} from 'react-native';
import { HistoryScreenProps } from '../../navigation/ScreenNavigator/My.navigator';
import { AngleLeft } from '../../assets/icon/Common';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatListRecent } from '../../component/Chat/chat.list.recent.component';
const windowWidth = Dimensions.get('window').width;

export const HistoryScreen = (props: HistoryScreenProps) => {

    return (
        <View style={styles.MainContainer}>

            {/* Top Tab Bar */}
            <View style={styles.TopTabContainer}>
                <SafeAreaView />
                <View style={styles.TopTabItems}>

                    <TouchableOpacity style={styles.BackButton}>
                        <AngleLeft />
                    </TouchableOpacity>

                    <Text style={styles.TopTabText}>History</Text>

                    <View style={{ flex: 1 }} />
                </View>
            </View>
            
            {/* Previous Chatting List */}
            <View style={styles.ChatListContainer}>
                <ChatListRecent navigation={props.navigation} route={props.route} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center'
    },
    TopTabContainer: {
        width: windowWidth,
    },
    TopTabItems: {
        flexDirection: 'row',
    },
    TopTabText: {
        flex: 5,
        textAlign: 'center'
    },
    BackButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ChatListContainer: {
        width: windowWidth
    }
});