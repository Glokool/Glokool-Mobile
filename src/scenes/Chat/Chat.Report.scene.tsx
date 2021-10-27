import React from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput } from 'react-native';
import { Layout, LayoutElement, Input } from '@ui-kitten/components';
import { ChatReportSceneProps } from '../../navigation/SceneNavigator/Chat.navigator';
import { AuthContext } from '../../context/AuthContext';
import { ReportTopTabBar } from '../../component/Chat/ChatRoomReport';
import { windowWidth, windowHeight } from '../../Design.component';

export const ChatReportScene = (props: ChatReportSceneProps): LayoutElement => {

    const { currentUser } = React.useContext(AuthContext);
    const user = props.route.params.user;
    const [value, setValue] = React.useState('');

    return (
        <SafeAreaView style={styles.MainContainer}>
            <ReportTopTabBar props={props} value={value} />

            {/* 내용물 */}
            <Layout style={{ width: windowWidth * 0.9, paddingTop: windowHeight * 0.05 }}>

                <Text style={styles.desc}>If there is any problem,</Text>
                <Text style={styles.desc}>please report and let us know.</Text>

                <TextInput
                    multiline={true}
                    numberOfLines={10}
                    onChangeText={(nextValue) => setValue(nextValue)}
                    style={styles.TextInputStyle}
                    textAlignVertical='top'
                    placeholder="Please write what you need to report"
                    placeholderTextColor={'#d1d1d1'}
                />
            </Layout>



        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center'
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
        fontFamily: 'Pretendard-Medium',
        fontSize: 16,
    },
    input: {
        width: '100%',
        height: 240
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

    TextInputStyle: {
        width: windowWidth * 0.9,
        height: windowWidth * 0.6,
        borderWidth: 2,
        borderColor: '#d1d1d1',
        borderRadius: 10,
        padding: 10,
        fontFamily: 'Pretendard-Regular',
        fontSize: windowWidth * 0.04,
        marginVertical: windowHeight * 0.02
    },
});
