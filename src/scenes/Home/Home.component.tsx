import React from 'react';
import {
    Layout,
    LayoutElement,
} from '@ui-kitten/components';
import { HomeScreenProps } from '../../navigation/ScreenNavigator/Home.navigator';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    BackHandler,
    Pressable,
    Linking,
    Button,
    Image,
    Platform,
    ImageBackground
} from 'react-native';
import { AngleRightDouble } from '../../assets/icon/Home';
import { NavigatorRoute } from '../../navigation/app.route';
import { useFocusEffect, useLinkTo } from '@react-navigation/native';
import Toast from 'react-native-easy-toast';
import { HomeTopTabBar, HomeCarousel } from '../../component/Home';
import { AdBanner } from '../../component/Common/AdBanner.component';
import { SelectableText } from '../../component/Common/SelectableText.component';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from "@react-native-firebase/app";
import 'firebase/auth';
import { GloChatAD, InstagramPurple, WebsitePurple, HomeBG } from '../../assets/icon/Home';


var ToastRef: any;
const windowWidth = Dimensions.get('window').width;

export const HomeScreen = (props: HomeScreenProps): LayoutElement => {
    var exitApp: any = undefined;
    var timeout: any;

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

    async function PressGloChatAD() {
        props.navigation.navigate(NavigatorRoute.CHAT);
    }

    return (
        <Layout style={{ alignItems: 'center', width: '100%' }}>

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
                style={{ height: '100%', width: '100%', backgroundColor: '#00ff0000' }}>
                <Layout style={{ width: '100%', height: 80, backgroundColor: '#00ff0000' }} />
                {/* <Layout style={styles.topTab}>
                    <Image source={require('../../assets/icon/Home/textLogo.png')} />
                    <Text>Login O</Text>
                </Layout> */}

                <HomeTopTabBar
                    navigation={props.navigation}
                    route={props.route}></HomeTopTabBar>

                {/* 타이틀 텍스트 */}
                <Layout style={styles.TitleTextContainer}>
                    <Text style={styles.TitleText1}>
                        {`ASK US WHATEVER, WHENEVER`}
                    </Text>

                    <Text style={styles.TitleText2}>
                        {`GLOKOOL GETS YOU GOIN' IN KOREA`}
                    </Text>
                </Layout>

                <HomeCarousel
                    navigation={props.navigation}
                    route={props.route}
                />

                <Layout style={{ alignItems: 'center', marginTop: 10, backgroundColor: '#00ff0000' }}>
                    <Pressable onPress={() => PressGloChatAD()}>
                        <GloChatAD />
                    </Pressable>
                </Layout>

                <Layout style={{ flexDirection: 'row', marginLeft: 20, backgroundColor: '#00ff0000', alignItems: 'center', paddingBottom: Platform.OS === 'android' ? 40 : 0 }}>
                    <Pressable onPress={() => Linking.openURL('https://glokool.com/home')}>
                        <Layout style={styles.buttonContainer}>
                            <WebsitePurple />
                            <Text style={styles.buttonText}>  Website</Text>
                        </Layout>
                    </Pressable>
                    <Pressable onPress={() => Linking.openURL('https://www.instagram.com/glokool_official')}>
                        <Layout style={[styles.buttonContainer, { marginLeft: 10, }]}>
                            <InstagramPurple />
                            <Text style={styles.buttonText}>  Instagram</Text>
                        </Layout>
                    </Pressable>
                </Layout>

                {/* <AdBanner /> */}
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
    buttonContainer: {
        flexDirection: 'row',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#7777ff',
        padding: 8,
        backgroundColor: '#00ff0000',
        height: 40,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 14,
        fontFamily: 'Pretendard-Medium'
    },
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00FF0000',
        borderRadius: 15,
        height: 120,
        width: Dimensions.get('window').width,
        marginVertical: 10,
    },
    TitleTextContainer: {
        marginHorizontal: 40,
        marginTop: 40,
        marginBottom: 20,
        backgroundColor: '#00ff0000'
    },
    TitleText1: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 18,
    },
    TitleText2: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 18,
    },
    GloChatADContainer: {
        backgroundColor: '#292434',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
        marginHorizontal: 30,
    },
    ADtext: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        color: 'white',
    },
    GloChatContainer1: {
        alignSelf: 'flex-start',
        marginLeft: 30,
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        borderBottomStartRadius: 5,
        borderBottomEndRadius: 15,
        padding: 10,
        width: windowWidth * 0.6,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
    },
    GloChat1: {
        fontFamily: 'BrandonGrotesque-Medium',
        fontSize: 21,
        lineHeight: 25,
    },
    GloChatContainer2: {
        alignSelf: 'flex-end',
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        marginRight: 30,
        marginTop: 10,
        padding: 10,
        width: '30%',
        backgroundColor: '#F7F7F7',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
    },
    GloChat2: {
        fontFamily: 'BrandonGrotesque-Medium',
        fontSize: 21,
    },
    GloChatContainer3: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'row',
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 5,
        marginRight: 30,
        marginTop: -10,
        padding: 10,
        width: '70%',
        backgroundColor: '#292434',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
    },
    GloChat3: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 21,
        color: '#8797FF',
    },
    GloChat3_1: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 21,
        color: '#FFFFFF',
    },
    GloChatIcon: {
        alignSelf: 'center',
    },

    CarouselContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#00FF0000',
    },
    Carousel: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    CarouselImage: {
        width: Dimensions.get('window').width * 0.8,
        height: 110,
        resizeMode: 'stretch',
        borderRadius: 10,
    },
    topTab: {
        backgroundColor: '#00ff0000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 50 : 20,
        paddingHorizontal: 40,
        alignItems: 'center'
    }
});
