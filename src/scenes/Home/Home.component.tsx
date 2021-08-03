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
    Button
} from 'react-native';
import { AngleRightDouble } from '../../assets/icon/Home';
import { NavigatorRoute } from '../../navigation/app.route';
import { useFocusEffect, useLinkTo } from '@react-navigation/native';
import Toast from 'react-native-easy-toast';
import { HomeTopTabBar, HomeCarousel } from '../../component/Home';
import { AdBanner } from '../../component/Common/AdBanner.component';

import { SelectableText } from '../../component/Common/SelectableText.component';

var ToastRef: any;
const windowWidth = Dimensions.get('window').width;

export const HomeScreen = (props: HomeScreenProps): LayoutElement => {
    var exitApp: any = undefined;
    var timeout: any;

    const linkTo = useLinkTo();

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
        //props.navigation.navigate(NavigatorRoute.CHAT);

        console.log('버튼클릭');
        await Linking.openURL('glokool://app/series');
        console.log('버튼클릭');
    }

    

    return (
        <Layout style={{ alignItems: 'flex-start', width: '100%' }}>
            <Toast ref={(toast) => (ToastRef = toast)} position={'center'} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width: '100%' }}>
                <Layout style={{ width: '100%', height: 80 }} />

                {/* 타이틀 텍스트 */}
                <Layout style={styles.TitleTextContainer}>
                    <Button title="test" onPress={()=>linkTo('/main/series')}></Button>
                    <Text style={styles.TitleText1}>
                        {`Ask us whatever, whenever`}
                    </Text>

                    <Text style={styles.TitleText2}>
                        {`Glokool gets you goin' in Korea.`}
                    </Text>
                </Layout>

                <HomeCarousel
                    navigation={props.navigation}
                    route={props.route}
                />

                {/* 글로챗 광고 */}
                <Layout style={styles.GloChatADContainer}>
                    <Layout style={styles.GloChatContainer1}>
                        <Text
                            style={
                                styles.GloChat1
                            }>{`What are some popular${`\n`}restaurants nearby?`}</Text>
                    </Layout>

                    <Layout style={styles.GloChatContainer2}>
                        <Text style={styles.GloChat2}>{`There are..`}</Text>
                    </Layout>

                    <Pressable
                        style={styles.GloChatContainer3}
                        onPress={() => PressGloChatAD()}>
                        <Text style={styles.GloChat3}>{`Click to Start `}</Text>
                        <Text style={styles.GloChat3_1}>{`Glo-Chat`}</Text>
                        <Text style={styles.GloChat3}>{`!   `}</Text>
                        <AngleRightDouble style={styles.GloChatIcon} />
                    </Pressable>
                </Layout>

                <AdBanner />
            </ScrollView>

            <HomeTopTabBar
                navigation={props.navigation}
                route={props.route}></HomeTopTabBar>
        </Layout>
    );
};

const styles = StyleSheet.create({
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
        marginVertical: 20,
    },
    TitleText1: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 22,
    },
    TitleText2: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 24,
    },
    GloChatADContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 15,
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
});
