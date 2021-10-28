import React, {useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Text,
    TouchableOpacity,
    Dimensions,
    Linking,
} from 'react-native';
import {
    Layout,
    LayoutElement,
    Modal,
    Card,
    Divider,
    Button,
} from '@ui-kitten/components';
import Clipboard from '@react-native-community/clipboard';
import { SceneRoute } from '../../navigation/app.route';
import Toast from 'react-native-easy-toast';
import { AngleLeft } from '../../assets/icon/Common';
import { EmergencyCall, Help, Report } from '../../assets/icon/Chat';
import { ChatHelpScreenProps } from '../../navigation/SceneNavigator/Chat.navigator';

var toastRef: any;

export const ChatHelpScreen = (props: ChatHelpScreenProps): LayoutElement => {
    const [modal, setModal] = useState(false);
    const id = props.route.params.id;
    const guide = props.route.params.guide;

    // 메소드는 다 모달에서 실행됨
    const PressCopy = () => {
        Clipboard.setString('070-4300-0833');
        toastRef.show('Copied!', 2000);
    };

    const PressLink = () => {
        Linking.openURL('https://www.instagram.com/glokool_korea/');
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

                <Help />

                <Text
                    style={{
                        fontSize: 18,
                        fontFamily: 'Pretendard-Medium',
                        marginLeft: 10,
                    }}>
                    HELP
                </Text>

                <Layout
                    style={{
                        flex: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                />

                <Layout style={styles.IconContainer} />
            </Layout>

            {/* 내용물 */}
            <Layout style={{ flex: 9, padding: 20, flexDirection: 'column' }}>
                <TouchableOpacity
                    onPress={() =>
                        props.navigation.navigate(SceneRoute.CHAT_REPORT, {
                            id: id,
                            guide: { uid: guide.uid, name: guide.name },
                        })
                    }>
                    <Layout style={styles.banner}>
                        <Report />
                        <Text style={styles.text}>Report Guide</Text>
                    </Layout>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setModal(!modal)}>
                    <Layout style={styles.banner}>
                        <EmergencyCall />
                        <Text style={styles.text}>
                            Emergency Call with Manager
                        </Text>
                    </Layout>
                </TouchableOpacity>
            </Layout>

            <Modal
                visible={modal}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setModal(!modal)}>
                <Card
                    disabled={true}
                    style={{ width: Dimensions.get('window').width * 0.8 }}>
                    <Layout>
                        <Text
                            style={styles.ModalKeyText}>
                            Call
                        </Text>
                        <Text
                            style={styles.ModalValText}>
                            070-4300-0833
                        </Text>
                        <Button onPress={PressCopy}>Copy</Button>
                    </Layout>
                    <Divider
                        style={{
                            marginVertical: 50,
                            backgroundColor: '#C9C9C9',
                        }}
                    />

                    <Layout>
                        <Text
                            style={styles.ModalKeyText}>
                            Instagram Direct
                        </Text>
                        <Text
                            style={styles.ModalValText}>
                            @glokool_korea
                        </Text>
                        <Button onPress={PressLink}>Link</Button>
                    </Layout>
                </Card>

                <Toast
                    ref={(toast) => (toastRef = toast)}
                    position={'center'}
                />
            </Modal>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    TabBar: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    IconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },
    banner: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        marginLeft: 10,
    },
    text: {
        fontSize: 20,
        fontFamily: 'Pretendard-Medium',
        marginLeft: 20,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    ModalKeyText: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    ModalValText:{
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    }
});
