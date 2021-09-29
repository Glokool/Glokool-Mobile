import React, { useContext } from 'react';
import {
    StyleSheet,
    Image,
    BackHandler,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    Platform
} from 'react-native';
import { Divider, Layout, LayoutElement, Text } from '@ui-kitten/components';

import { useFocusEffect } from '@react-navigation/native';

import { AuthContext } from '../../context/AuthContext';
import { MyScreenProps } from '../../navigation/ScreenNavigator/My.navigator';

import { MyProfile, BookmarkList } from '../../component/My/Main';
import { LoginCheck } from '../../component/Common';

import {
    Receipt,
    Receipt_Large,
    Setting_Btn,
    Comment_Btn,
    Bookmark_Btn,
} from '../../assets/icon/My';
import { HomeBG, } from '../../assets/icon/Home';
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
        <Layout>
            <LoginCheck
                navigation={props.navigation}
                route={props.route}
                visible={currentUser === null ? true : false}
            />
        </Layout>
    ) : (
        <Layout style={styles.SuperContainer}>

            <SafeAreaView />

            {/* 배경 이미지, 안드로이드에서 svg 안보여서 png 로 대체 */}
            {Platform.OS === 'ios' ? (
                <HomeBG style={styles.backgroundStyle} />
            ) : (
                <Image
                    source={require('../../assets/icon/Home/HomeBGimg.png')}
                    style={styles.backgroundStyle}
                />
            )}

            <Layout style={styles.MainContainer}>
                <Layout style={styles.Container}>

                    {/* 사용자 프로필 컴포넌트 분리 */}
                    <MyProfile />

                    {/* Settings, Bookmark 버튼 */}
                    <Layout style={styles.ButtonContainer}>
                        <TouchableOpacity
                            style={styles.Button}
                            onPress={() =>
                                props.navigation.navigate(SceneRoute.MY_SETTING)
                            }>
                            <Setting_Btn style={styles.ButtonIcon} />
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
                            <Receipt_Large style={styles.ButtonIcon} />
                            <Text style={styles.ButtonText}>Receipts</Text>
                        </TouchableOpacity>
                    </Layout>

                </Layout>

                {/* Bookmarklist 텍스트 */}
                <Layout style={styles.SmallTitleContainer}>
                    <Layout style={styles.TextTitleContainer}>
                        <Receipt />
                        <Text style={styles.TextTitle}>MY BOOKMARK LIST</Text>
                    </Layout>

                    <Layout style={styles.DividerContainer}>
                        <Divider style={styles.Divider} />
                    </Layout>
                </Layout>

                {/* Bookmarklist 컴포넌트 분리 */}
                <BookmarkList />

            </Layout>

        </Layout>
    );
};

const styles = StyleSheet.create({
    SuperContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#00000000'
    },
    MainContainer: {
        backgroundColor: '#00000000',
        alignItems: 'center',
    },
    Container: {
        marginHorizontal: 30,
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
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 16,
        color: '#8797FF',
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
