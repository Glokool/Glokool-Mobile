import React, { useCallback } from 'react';
import { Layout, LayoutElement, } from '@ui-kitten/components';
import { HomeScreenProps } from '../../navigation/ScreenNavigator/Home.navigator';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    BackHandler,
    Image,
    Platform,
    TouchableOpacity
} from 'react-native';
import { NavigatorRoute } from '../../navigation/app.route';
import { useFocusEffect, } from '@react-navigation/native';
import Toast from 'react-native-easy-toast';
import { HomeTopTabBar, HomeCarousel } from '../../component/Home';
import 'firebase/auth';
import { HomeBG, GloChatInfo, GloChatInfoIcon } from '../../assets/icon/Home';
import { SceneRoute } from '../../navigation/app.route';
import { SelectableText } from '../../component/Common/SelectableText.component';

var ToastRef: any;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const HomeScreen = (props: HomeScreenProps): LayoutElement => {
    var exitApp: any = undefined;
    var timeout: any;

    const focusEvent = useFocusEffect(
        useCallback(() => {
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
            ToastRef.show('Press one more time to exit', 1000);
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

    const PressGloChatAD = () => {
        props.navigation.navigate(NavigatorRoute.CHAT);
    }

    return (
        <Layout style={{ alignItems: 'center', width: '100%' }}>

            {/* 백그라운드 이미지, 안드로이드에서 해당 svg 가 안보여서 png 로 */}
            {Platform.OS === 'ios' ? (
                <HomeBG style={styles.backgroundStyle} />
            ) : (
                <Image
                    source={require('../../assets/icon/Home/HomeBGimg.png')}
                    style={styles.backgroundStyle} />
            )}

            <Toast ref={(toast) => (ToastRef = toast)} position={'center'} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width: '100%', backgroundColor: '#00ff0000' }}>

                <HomeTopTabBar
                    navigation={props.navigation}
                    route={props.route} />

                {/* 타이틀 텍스트 */}
                <Layout style={styles.TitleTextContainer}>
                    <Text style={styles.TitleText}>
                        {`ASK US WHATEVER, WHENEVER`}
                    </Text>

                    <Text style={styles.TitleText}>
                        {`GLOKOOL GETS YOU GOIN' IN KOREA`}
                    </Text>
                </Layout>

                <TouchableOpacity
                    onPress={() =>
                        props.navigation.navigate(
                            SceneRoute.SERIES_A_DETAIL,
                            { Id: '60cc01e0ee8b3104211971b4' },
                        )}
                    style={{ alignItems: 'center', backgroundColor: '#00ff0000', }}>
                    <Layout style={styles.GloChatInfoContainer}>
                        <Layout style={{ backgroundColor: '#00ff0000' }}>
                            <Layout style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: '#00ff0000' }}>
                                <Text style={styles.GloChatInfoSmallText}>You wonder </Text><GloChatInfoIcon />
                            </Layout>
                            <Text style={styles.GloChatInfoText}>How to use</Text>
                            <Text style={[styles.GloChatInfoText, { color: '#7777ff' }]}>GloChat</Text>
                            <Text style={styles.GloChatInfoText}>Service?!</Text>
                        </Layout>
                        <GloChatInfo />
                    </Layout>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => PressGloChatAD()}
                    style={styles.GloChatADContainer}>
                    <Image
                        source={require('../../assets/icon/Home/GloChatAD.png')}
                        style={{ width: windowWidth * 0.85, height: windowWidth / 4906 * 1504 }}
                        resizeMode='contain'
                    />
                </TouchableOpacity>

                <Layout style={{ paddingBottom: 30, backgroundColor: '#00000000' }}>
                    <HomeCarousel
                        navigation={props.navigation}
                        route={props.route}
                    />
                </Layout>

                <Layout style={{width: '100%', height : windowHeight * 0.1, backgroundColor: '#00FF0000'}} />

            </ScrollView>

        </Layout>
    );
};

const styles = StyleSheet.create({
    backgroundStyle: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    TitleTextContainer: {
        marginHorizontal: 40,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: '#00ff0000'
    },
    TitleText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: Platform.OS === 'ios' ? 18 : 15,
    },
    GloChatADContainer: {
        alignItems: 'center',
        borderBottomColor: '#eee',
        borderBottomWidth: 2,
        paddingBottom: 5,
    },
    GloChatInfoText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: Platform.OS === 'ios' ? 18 : 15,
    },
    GloChatInfoSmallText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: Platform.OS === 'ios' ? 11 : 9,
        color: '#7777ff'
    },
    GloChatInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        backgroundColor: '#00ff0000',
        width: windowWidth * 0.85
    }
});
