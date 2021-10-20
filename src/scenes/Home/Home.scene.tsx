import React, { useCallback, useState } from 'react';
import { Layout, LayoutElement, } from '@ui-kitten/components';
import { HomeScreenProps } from '../../navigation/ScreenNavigator/Home.navigator';
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
import { EmptyHomeImage, GloChatInfoButton, GloChatHomeButton, HomeGloIcon } from '../../assets/icon/Home';
import { windowHeight, windowWidth } from '../../Design.component';
import { EnterIcon } from '../../assets/icon/Zone';
import { NavigatorRoute } from '../../navigation/app.route';

var ToastRef: any;

export const HomeScreen = (props: HomeScreenProps): LayoutElement => {

    var exitApp: any = undefined;
    var timeout: any;

    const [zoneIndex, setZoneIndex] = useState(0);

    const ZoneList = [
        {
            name: 'HONGDAE',
            color: '#EFBA26',
        },
        {
            name: 'GWANGHWAMUN',
            color: '#C1E2D3',
        },
        {
            name: 'MYEONGDONG',
            color: '#CD6562',
        },
        {
            name: 'GANGNAM',
            color: '#A969C4',
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

    const renderZoneButton = (item: { item: { name: string, color: string }, index: number }) => {
        const additionalStyle = zoneIndex === item.index ? styles.LocationButtonSelected : styles.LocationButtonUnselected;
        return (
            <Pressable
                onPress={() => setZoneIndex(item.index)}
                style={[
                    styles.LocationButtonDefault,
                    additionalStyle,
                    {
                        backgroundColor: zoneIndex === item.index ? 'white' : item.item.color,
                        borderColor: item.item.color
                    }
                ]}
            >
                <Text
                    style={[
                        styles.LocationButtonText,
                        {
                            color: zoneIndex === item.index ? item.item.color : 'black'
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
                style={styles.ScrollViewContainer}>

                {/* top tab bar */}
                <HomeTopTabBar />

                {/* glochat 소개 컨테이너 */}
                <Layout style={styles.GloChatContainer}>

                    <EmptyHomeImage style={styles.GloChatImage} />

                    <Layout style={styles.GloChatTitleContainer}>
                        <Text style={styles.GloChatTitleText}>Start your journey</Text>
                        <Text style={styles.GloChatTitleText}>with GloChat today!</Text>
                    </Layout>

                    <Layout style={styles.GloChatSubTitleContainer}>
                        <Text style={styles.GloChatSubTitleText}>A real-time</Text>
                        <Text style={styles.GloChatSubTitleText}>travel assistance service</Text>
                    </Layout>

                </Layout>

                <Layout style={styles.GloChatButtonContainer}>
                    <Pressable>
                        <GloChatInfoButton />
                    </Pressable>
                    <Layout style={{ width: windowWidth * 0.05 }} />
                    <Pressable onPress={() => props.navigation.navigate(NavigatorRoute.CHAT)}>
                        <GloChatHomeButton />
                    </Pressable>
                </Layout>

                {/* Glo 소개하는 컨테이너 */}
                <Pressable style={styles.GloContainer}>

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

                </Pressable>

                {/* 지도 있는 곳  */}
                <Layout style={styles.DiscoverContainer}>

                    <Layout style={styles.DiscoverTextContainer}>
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
                        <Text style={[styles.DiscoverBottomText, { fontSize: 17 }]}>Must-visit entertaining spot</Text>
                        <Text style={[styles.DiscoverBottomText, { fontSize: 15, color: '#707070' }]}>{'Hongdae street, Sinchon, Yonsei&Ehwa Univ.'}</Text>
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

                <Layout style={{ height: windowHeight * 0.15 }} />
            </ScrollView>

        </Layout>
    );
};

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        alignItems: 'center',
    },
    ScrollViewContainer: {
        width: '100%',
        backgroundColor: '#00ff0000',
    },
    GloChatContainer: {
        height: windowHeight * 0.2,
        paddingLeft: windowWidth * 0.05
    },
    GloChatImage: {
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    GloChatTitleContainer: {
        backgroundColor: '#0000',
    },
    GloChatTitleText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 24,
        color: '#2F2073'
    },
    GloChatSubTitleContainer: {
        backgroundColor: '#0000',
        marginTop: windowHeight * 0.015
    },
    GloChatSubTitleText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 16,
        color: '#4A4A58'
    },
    GloChatButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: windowHeight * 0.015,
        paddingBottom: windowHeight * 0.025,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        shadowColor: '#7777ff',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 2,
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
        marginTop: windowHeight * 0.025,
        borderBottomWidth: 4,
        borderBottomColor: '#e4e4e4',
        paddingBottom: windowHeight * 0.025
    },
    DiscoverTextContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginHorizontal: windowWidth * 0.05,
    },
    DiscoverTitleText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18,
    },
    DiscoverSubTitleText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 15,
        color: '#756EBC',
        marginLeft: windowWidth * 0.025
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
        opacity: 0.7,
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
        marginLeft: windowWidth * 0.05
    },
    DiscoverBottomContainer: {
        paddingHorizontal: windowWidth * 0.05,
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
        paddingHorizontal: windowWidth * 0.05,
        marginTop: windowHeight * 0.025
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
        width: windowWidth * 0.45,
        height: windowWidth * 0.45,
        borderRadius: 10,
        borderWidth: 0.5,
        marginHorizontal: windowWidth * 0.015
    }
});
