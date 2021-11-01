import React, { useContext } from 'react';
import {
    StyleSheet,
    BackHandler,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    ScrollView, 
    Text
} from 'react-native';
import { Divider, Layout, LayoutElement } from '@ui-kitten/components';

import { useFocusEffect } from '@react-navigation/native';

import { AuthContext } from '../../context/AuthContext';
import { MyScreenProps } from '../../navigation/SceneNavigator/My.navigator';

import { MyProfile, BookmarkList } from '../../component/My';
import {
    SettingsButton,
    ReceiptsButton,
    HistoryButton,
    BookmarkListIcon,
} from '../../assets/icon/My';
import { SceneRoute } from '../../navigation/app.route';

const windowWidth = Dimensions.get('window').width;

export const MYScreen = (props: MyScreenProps): LayoutElement => {
    const { currentUser } = useContext(AuthContext);

    var exitApp: any = undefined;
    var timeout: any;

    // 백핸들러 적용을 위한 함수
    const focusEvent = useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);

            return () => {
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    handleBackButton,
                );
            };
        }, []),
    );

    const handleBackButton = () => {
        if (exitApp == undefined || !exitApp) {
            // 한번만 더 누르면 종료
            exitApp = true;

            timeout = setTimeout(() => {
                exitApp = false;
            }, 2000);
        } else {
            clearTimeout(timeout);
            BackHandler.exitApp();
        }
        return true;
    };

    return currentUser === null ? (
        <Layout />
    ) : (
        <ScrollView style={styles.SuperContainer} bounces={false} showsVerticalScrollIndicator={false}>

            <SafeAreaView />

            <Layout style={styles.MainContainer}>
                <Layout style={styles.Container}>

                    {/* 사용자 프로필 컴포넌트 분리 */}
                    <MyProfile currentUser={currentUser} />

                    {/* Settings, Bookmark, History 버튼 */}
                    <Layout style={styles.ButtonContainer}>
                        <TouchableOpacity
                            style={styles.Button}
                            onPress={() =>
                                props.navigation.navigate(SceneRoute.MY_SETTING)
                            }>
                            <SettingsButton style={styles.ButtonIcon} />
                            <Text style={styles.ButtonText}>Settings</Text>
                        </TouchableOpacity>

                        <Layout style={styles.VerticalLine} />

                        <TouchableOpacity
                            style={styles.Button}
                            onPress={() =>
                                props.navigation.navigate(
                                    SceneRoute.PAID_CHAT_LIST,
                                )
                            }>
                            <ReceiptsButton style={styles.ButtonIcon} />
                            <Text style={styles.ButtonText}>Receipts</Text>
                        </TouchableOpacity>

                        <Layout style={styles.VerticalLine} />

                        <TouchableOpacity
                            style={styles.Button}
                            onPress={() =>
                                props.navigation.navigate(
                                    SceneRoute.HISTORY,
                                )
                            }>
                            <HistoryButton style={styles.ButtonIcon} />
                            <Text style={styles.ButtonText}>History</Text>
                        </TouchableOpacity>
                    </Layout>

                </Layout>

                {/* Bookmarklist 텍스트 */}
                <Layout style={styles.SmallTitleContainer}>
                    <Layout style={styles.TextTitleContainer}>
                        <BookmarkListIcon />
                        <Text style={styles.TextTitle}>MY BOOKMARK LIST</Text>
                    </Layout>

                    <Layout style={styles.DividerContainer}>
                        <Divider style={styles.Divider} />
                    </Layout>
                </Layout>

                {/* Bookmarklist 컴포넌트 분리 */}
                <BookmarkList {...props} />

            </Layout>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    SuperContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        // alignItems: 'center'
    },
    MainContainer: {
        backgroundColor: '#00000000',
        alignItems: 'center',
    },
    Container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000000'
    },
    VerticalLine: {
        backgroundColor: '#8797ff55',
        width: 2,
        height: '60%',
    },
    ButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        alignSelf: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    Button: {
        width: windowWidth * 0.25,
        height: windowWidth * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 10,
        backgroundColor: 'white',
    },
    ButtonIcon: {
        marginTop: 10,
    },
    ButtonText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 14,
        color: '#4e4e4e',
        marginTop: 5,
    },
    SmallTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
    },
    TextTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    TextTitle: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 16,
        marginLeft: 5,
    },
    DividerContainer: {
        flex: 1,
    },
    Divider: {
        backgroundColor: '#8797FF',
        marginLeft: 10,
    },
    backgroundStyle: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
