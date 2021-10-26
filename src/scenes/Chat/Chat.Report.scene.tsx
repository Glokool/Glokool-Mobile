import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, Alert } from 'react-native';
import { Layout, LayoutElement, Input, Button } from '@ui-kitten/components';
import { ChatReportSceneProps } from '../../navigation/SceneNavigator/Chat.navigator';
import { AngleLeft } from '../../assets/icon/Common';
import { Report } from '../../assets/icon/Chat';
import { AuthContext } from '../../context/AuthContext';
import { ReportTopTabBar } from '../../component/Chat/ChatRoomReport';

export const ChatReportScene = (props: ChatReportSceneProps): LayoutElement => {

    const { currentUser } = React.useContext(AuthContext);
    const user = props.route.params.user;
    const [value, setValue] = React.useState('');

    return (
        <SafeAreaView style={styles.MainContainer}>
            
            <Layout style={styles.EmptyContainer}/>

            {/* 내용물 */}
            <Layout style={{ flex: 9, padding: 20, flexDirection: 'column' }}>
                <Layout style={styles.SendContainer}>
                    <Text style={styles.desc}>
                        please report and let us know.
                    </Text>
                </Layout>

                <Input
                    placeholder="Please write what you need to report"
                    style={styles.input}
                    value={value}
                    multiline={true}
                    onChangeText={(nextValue) => setValue(nextValue)}
                />
            </Layout>

            <ReportTopTabBar props={props} value={value}/>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    MainContainer: {
        width :'100%',
        height : '100%'
    },

    EmptyContainer: {
        height: 52,
  
    },

    IconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },
    desc: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 16,
        marginVertical: 20,
        flex: 7,
    },
    input: {
        width: '100%',
        height: 240
    },
    SendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    SendButton: {
        width: 100,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#292434',
        alignItems: 'center',
        justifyContent: 'center',
    },
    SendButtonTxt: {
        color: '#8797FF',
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 19,
    },
});
