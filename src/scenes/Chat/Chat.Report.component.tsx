import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, SafeAreaView, Text, Alert } from 'react-native';
import { Layout, LayoutElement, Input } from '@ui-kitten/components';
import { ChatReportScreenProps } from '../../navigation/ScreenNavigator/Chat.navigator';
import { AuthContext } from '../../context/AuthContext';
import { ReportTopTabBar } from '../../component/Chat/ChatRoomReport';

export const ChatReportScreen = (props: ChatReportScreenProps): LayoutElement => {

    const { currentUser } = React.useContext(AuthContext);
    const user = props.route.params.user;
    const [value, setValue] = React.useState('');

    const PressSend = () => {
        if (value == '') {
            // 이거 실행 에러남
            Alert.alert('Please enter contents');
        } else {
            const report = {
                id: props.route.params.id,
                guideUid: user?.uid,
                guideName: user?.name,
                user: currentUser?.email,
                userName: currentUser?.displayName,
                value: value,
            };
            
            const now = new Date();
            now.setHours(now.getHours() + 9);

            const reportDate = `${now.getFullYear()}-${
                now.getMonth() + 1
            }-${now.getDate()}-${now.getHours()}:${now.getMinutes()}`;

            const docRef = firestore()
                .collection('ReportAssistant')
                .doc(`${user.uid}-${currentUser?.uid}-${reportDate}`)
                .set(report);

            props.navigation.goBack();
        }
    };

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
