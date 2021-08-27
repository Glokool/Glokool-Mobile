import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, Alert } from 'react-native';
import { Layout, LayoutElement, Input, Button } from '@ui-kitten/components';
import { ChatReportScreenProps } from '../../navigation/ScreenNavigator/Chat.navigator';
import { AngleLeft } from '../../assets/icon/Common';
import { Report } from '../../assets/icon/Chat';
import { AuthContext } from '../../context/AuthContext';

export const ChatReportScreen = (
    props: ChatReportScreenProps,
): LayoutElement => {
    const { currentUser } = React.useContext(AuthContext);

    const guide = props.route.params.guide;
    const [value, setValue] = React.useState('');

    const PressSend = () => {
        if (value == '') {
            // 이거 실행 에러남
            Alert.alert('Please enter contents');
        } else {
            const report = {
                id: props.route.params.id,
                guideUid: guide?.uid,
                guideName: guide?.name,
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
                .doc(`${guide.uid}-${currentUser?.uid}-${reportDate}`)
                .set(report);

            props.navigation.goBack();
        }
    };

    return (
        <React.Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />

            {/*탭바 디자인*/}
            <Layout style={styles.TabBar}>
                <TouchableOpacity
                    style={styles.IconContainer}
                    onPress={() => props.navigation.goBack()}>
                    <AngleLeft />
                </TouchableOpacity>

                <Report />

                <Text
                    style={{
                        fontSize: 18,
                        fontFamily: 'IBMPlexSansKR-Medium',
                        marginLeft: 10,
                    }}>
                    Report Travel Assistant
                </Text>

                <Layout
                    style={{
                        flex: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}></Layout>

                <Layout style={styles.IconContainer} />
            </Layout>

            {/* 내용물 */}
            <Layout style={{ flex: 9, padding: 20, flexDirection: 'column' }}>
                <Layout style={styles.SendContainer}>
                    <Text style={styles.desc}>
                        If there is any problem, please report and let us know.
                    </Text>
                    <TouchableOpacity
                        style={styles.SendButton}
                        onPress={() => PressSend()}>
                        <Text style={styles.SendButtonTxt}>Send</Text>
                    </TouchableOpacity>
                </Layout>

                <Input
                    placeholder="Please write what you need to report"
                    style={styles.input}
                    value={value}
                    multiline={true}
                    onChangeText={(nextValue) => setValue(nextValue)}
                />
            </Layout>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    TabBar: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
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
        height: '50%',
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
