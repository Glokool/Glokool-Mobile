import React, { useCallback, useState } from 'react';
import { Layout, LayoutElement, } from '@ui-kitten/components';
import { HomeScreenProps } from '../../navigation/SceneNavigator/Home.navigator';
import {
    ScrollView,
    StyleSheet,
    Text,
    BackHandler,
    Pressable,
    FlatList
} from 'react-native';
import { useFocusEffect, } from '@react-navigation/native';
import Toast from 'react-native-easy-toast';
import { HomeTopTabBar } from '../../component/Home';
import { HomeImage, GloChatInfoButton, GloChatHomeButton, HomeGloIcon, Enter_LightPurple, Enter_Purple } from '../../assets/icon/Home';
import { windowHeight, windowWidth } from '../../Design.component';
import { EnterIcon } from '../../assets/icon/Zone';
import { NavigatorRoute } from '../../navigation/app.route';
import { ChannelIO } from 'react-native-channel-plugin';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

var ToastRef: any;

export const HomeScreen = (props: HomeScreenProps): LayoutElement => {

    var exitApp: any = undefined;
    var timeout: any;
    let ChannelSettings = {
        "pluginKey": '6178b816e82898b96f85'
    };

    ChannelIO.boot(ChannelSettings).then((result) => {
        console.log(result);
    })

    const [zoneIndex, setZoneIndex] = useState(0);

    const ZoneList = [
        {
            name: 'HONGDAE',
            bgColor: '#FAD46C',
            textColor: '#BF9900',
            title: 'Must-visit entertaining spot',
            subTitle: 'Hondae street, Sinchon, Yonsei&Ewha Univ.',
        },
        {
            name: 'GWANGHWAMUN',
            bgColor: '#9BD4B9',
            textColor: '#4F5D56',
            title: 'History Travel in the center of Seoul',
            subTitle: 'Gyeongbokgung Palace, Bukchon Hanok Village, Insadong',
        },
        {
            name: 'MYEONGDONG',
            bgColor: '#CD6562',
            textColor: '#974644',
            title: 'A Center of Shopping and Premier Cultural Hub',
            subTitle: 'N tower, DDP, Myeongdong Cathedral',
        },
        {
            name: 'GANGNAM',
            bgColor: '#A969C4',
            textColor: '#85529B',
            title: 'Most advanced metropolitan with modern attractions',
            subTitle: 'Olympic park, Lotte towr, Coex, Gangnam Station',
        },
    ]

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

    const renderZoneButton = (item: { item, index: number }) => {
        const additionalStyle = zoneIndex === item.index ? styles.LocationButtonSelected : styles.LocationButtonUnselected;
        return (
            <Pressable
                onPress={() => setZoneIndex(item.index)}
                style={[
                    styles.LocationButtonDefault,
                    additionalStyle,
                    {
                        backgroundColor: zoneIndex === item.index ? 'white' : item.item.bgColor,
                        borderColor: item.item.bgColor
                    }
                ]}
            >
                <Text
                    style={[
                        styles.LocationButtonText,
                        {
                            color: item.item.textColor
                        }]}
                >
                    {item.item.name}
                </Text>
            </Pressable>
        )
    }

    return (
        <Layout style={styles.MainContainer}>

            <Toast ref={(toast) => (ToastRef = toast)} position={'center'} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.ScrollViewContainer}
                bounces={false}>

                {/* glochat 소개 컨테이너 */}
                <Layout style={styles.GloChatContainer}>

                    {/* top tab bar */}
                    <HomeTopTabBar />

                    <HomeImage style={styles.GloChatImage} />


                    <Layout style={styles.GloChatTitleContainer}>
                        <Text style={styles.GloChatTitleText}>Start your journey</Text>
                        <Text style={styles.GloChatTitleText}>with <Text style={{ color: '#8B63FF' }}>GloChat</Text> today!</Text>
                    </Layout>

                    <Layout style={styles.GloChatSubTitleContainer}>
                        <Text style={styles.GloChatSubTitleText}>A real-time</Text>
                        <Text style={styles.GloChatSubTitleText}>travel assistance service</Text>
                    </Layout>

                    <Layout style={styles.GloChatButtonContainer}>
                        <Pressable style={styles.HowItWorks}>
                            <Text style={styles.HowItWorksText}>How it Works?</Text>
                            <Enter_Purple />
                        </Pressable>

                        <LinearGradient
                            style={styles.StartGloChat}
                            colors={['#7777ff', '#8946A1']}
                            start={{ x: 1, y: 0.5 }}
                            end={{ x: 0, y: 0.5 }}
                            onTouchEnd={() => props.navigation.navigate(NavigatorRoute.CHAT)}
                        >
                            <Text style={styles.StartGloChatText}>Start GloChat</Text>
                            <Enter_LightPurple />
                        </LinearGradient>
                    </Layout>

                </Layout>

                {/* Glo 소개하는 컨테이너 */}
                {/* <Pressable style={styles.GloContainer}>

                    <Layout style={styles.GloAskButton}>
                        <Text style={styles.GloAskButtonText}>ASK</Text>
                    </Layout>

                    <HomeGloIcon style={styles.GloIcon} />

                    <Layout style={styles.GloTextContainer}>
                        <Text style={styles.GloTitleText}>Hello! My name is Glo.</Text>
                        <Text style={[styles.GloInfoText, { marginTop: windowHeight * 0.005 }]}>
                            I am your <Text style={[styles.GloInfoText, { color: '#7777ff' }]}>virtual travel assistant.</Text>
                        </Text>
                        <Text style={styles.GloInfoText}>Ask me anything about</Text>
                        <Text style={styles.GloInfoText}>traveling in Korea.</Text>
                    </Layout>

                </Pressable> */}

                {/* 지도 있는 곳  */}
                <Layout style={styles.DiscoverContainer}>

                    <Layout>
                        <Text style={styles.DiscoverTitleText}>DISCOVER</Text>
                        <Text style={styles.DiscoverSubTitleText}>TRAVEL DESTINATION</Text>
                    </Layout>

                    <Layout style={styles.ZoneImageContainer}>
                        <FlatList
                            data={ZoneList}
                            renderItem={renderZoneButton}
                            style={styles.FlatListContainer}
                            scrollEnabled={false}
                        />
                    </Layout>

                    <Layout style={styles.DiscoverBottomContainer}>
                        <Text style={[styles.DiscoverBottomText, { fontSize: 17 }]}>
                            {ZoneList[zoneIndex].title}
                        </Text>
                        <Text style={[styles.DiscoverBottomText, { fontSize: 15, color: '#707070' }]}>
                            {ZoneList[zoneIndex].subTitle}
                        </Text>
                        <Layout style={styles.ExploreButtonContainer}>
                            <Text style={styles.ExploreButtonText}>EXPLORE</Text>
                            <EnterIcon />
                        </Layout>
                    </Layout>
                </Layout>

                {/* I WANT TO VISIT */}
                <Layout style={styles.VisitContainer}>
                    <Text style={styles.VisitText}>I WANT TO VISIT...</Text>
                    <Layout style={styles.VisitItemContainer}>
                        <Layout style={styles.VisitItem} />
                        <Layout style={styles.VisitItem} />
                    </Layout>
                </Layout>

                <Layout style={{ height: windowHeight * 0.15, backgroundColor: '#0000' }} />
            </ScrollView>

        </Layout>
    );
};

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#ECECFC',
    },
    ScrollViewContainer: {
        width: '100%',
        backgroundColor: '#00ff0000',
    },
    GloChatContainer: {
        paddingLeft: windowWidth * 0.05,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        shadowColor: '#7777ff',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    GloChatImage: {
        position: 'absolute',
        right: 0,
        bottom: windowHeight * 0.05,
    },
    GloChatTitleContainer: {
        backgroundColor: '#0000',
    },
    GloChatTitleText: {
        fontFamily: 'Pretendard-ExtraBold',
        fontSize: 27,
        color: '#2F2073'
    },
    GloChatSubTitleContainer: {
        backgroundColor: '#0000',
        marginTop: windowHeight * 0.005
    },
    GloChatSubTitleText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 16,
        color: '#5454A5'
    },
    GloChatButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: windowHeight * 0.12,
        paddingBottom: windowHeight * 0.025,
        width: windowWidth * 0.9,
        backgroundColor: '#0000',
        elevation: 3,
    },
    GloContainer: {
        borderRadius: 22,
        borderWidth: 4,
        borderColor: '#EDEAFF',
        marginTop: windowHeight * 0.025,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: windowHeight * 0.025,
        marginHorizontal: windowWidth * 0.05
    },
    GloTextContainer: {
        backgroundColor: '#0000'
    },
    GloTitleText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 16,
        color: '#AEAEAE',
    },
    GloInfoText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 14,
    },
    GloIcon: {
        marginHorizontal: windowWidth * 0.05
    },
    GloAskButtonText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 13,
        color: '#7777ff'
    },
    GloAskButton: {
        borderRadius: 50,
        backgroundColor: '#8680F644',
        paddingHorizontal: windowWidth * 0.04,
        paddingVertical: windowHeight * 0.007,
        position: 'absolute',
        bottom: windowHeight * 0.01,
        right: windowWidth * 0.05,
    },
    DiscoverContainer: {
        width: windowWidth * 0.9,
        alignSelf: 'center',
        marginTop: windowHeight * 0.025,
        borderRadius: 10,
        padding: windowHeight * 0.025
    },
    DiscoverTitleText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18,
    },
    DiscoverSubTitleText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 15,
        color: '#756EBC',
    },
    LocationButtonDefault: {
        borderRadius: 10,
        width: windowWidth * 0.35,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: windowHeight * 0.015,
        marginVertical: windowHeight * 0.005,
        borderWidth: 2,
    },
    LocationButtonUnselected: {
        opacity: 0.8,
    },
    LocationButtonSelected: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2.42,
        elevation: 2,
    },
    LocationButtonText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 13
    },
    ZoneImageContainer: {
        backgroundColor: '#EEF1FF',
        paddingVertical: windowHeight * 0.02,
        marginTop: windowHeight * 0.01
    },
    FlatListContainer: {

    },
    DiscoverBottomContainer: {
        marginTop: windowHeight * 0.01
    },
    ExploreButtonContainer: {
        flexDirection: 'row',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#7777ff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: windowHeight * 0.004,
        marginTop: windowHeight * 0.01
    },
    ExploreButtonText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 15,
        color: '#7777ff',
        marginRight: windowWidth * 0.01
    },
    DiscoverBottomText: {
        fontFamily: 'Pretendard-Medium'
    },
    VisitContainer: {
        width: windowWidth * 0.9,
        alignSelf: 'center',
        marginTop: windowHeight * 0.025,
        padding: windowWidth * 0.05,
        borderRadius: 10,
    },
    VisitText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18,
    },
    VisitItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: windowHeight * 0.015
    },
    VisitItem: {
        width: windowWidth * 0.39,
        height: windowWidth * 0.39,
        borderRadius: 10,
        borderWidth: 0.5,
        marginHorizontal: windowWidth * 0.01
    },
    StartGloChat: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth * 0.43,
        height: windowHeight * 0.05,
        borderRadius: 100,
        opacity: 0.84
    },
    StartGloChatText: {
        color: 'white',
        fontFamily: 'Pretendard-Medium',
        fontSize: windowWidth * 0.035,
        marginRight: 5
    },
    HowItWorks: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth * 0.43,
        height: windowHeight * 0.05,
        borderRadius: 100,
        borderWidth: 1.5,
        borderColor: '#9A94F6',
        backgroundColor: '#fff',
        opacity: 0.84,
    },
    HowItWorksText: {
        color: '#6969DF',
        fontFamily: 'Pretendard-Medium',
        fontSize: windowWidth * 0.035,
        marginRight: 5
    }
});
