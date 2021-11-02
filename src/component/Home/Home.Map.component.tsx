import React, { useState } from 'react';
import { Layout, } from '@ui-kitten/components';
import {
    StyleSheet,
    Text,
    Pressable,
    FlatList,
    Alert
} from 'react-native';
import { windowWidth, windowHeight } from '../../Design.component';
import {
    Map_background,
    Hongdae_selected,
    Gwanghwamun_selected,
    Myeongdong_selected,
    Gangnam_selected,
    Hongdae_unselected,
    Gwanghwamun_unselected,
    Myeongdong_unselected,
    Gangnam_unselected,
} from '../../assets/icon/Home';
import { Enter_Purple } from '../../assets/icon/Home';
import { HomeScreenProps } from '../../navigation/SceneNavigator/Home.navigator';
import { useDispatch, useSelector } from 'react-redux';
import { setZoneLocation } from '../../model/Zone/Zone.Location.model';
import { NavigatorRoute } from '../../navigation/app.route';
import { RootState } from '../../model';

export const HomeMapComponent = (props: HomeScreenProps) => {

    const location = useSelector((state: RootState) => state.ZoneLocationModel.location);
    const dispatch = useDispatch();

    const [zoneIndex, setZoneIndex] = useState(0);

    type HomeZoneMapType = {
        name: string;
        bgColor: string;
        textColor: string;
        title: string;
        subTitle: string;
    }

    const ZoneList = [
        {
            name: 'HONGDAE',
            bgColor: '#FAD46C',
            textColor: '#BF9900',
            title: 'Must-visit entertaining spot',
            subTitle: 'Hondae street, Sinchon, Yonsei&Ewha Univ.',
        }, {
            name: 'GWANGHWAMUN',
            bgColor: '#9BD4B9',
            textColor: '#4F5D56',
            title: 'History Travel in the center of Seoul',
            subTitle: 'Gyeongbokgung Palace, Bukchon Hanok Village, Insadong',
        }, {
            name: 'MYEONGDONG',
            bgColor: '#CD6562',
            textColor: '#974644',
            title: 'A Center of Shopping and Premier Cultural Hub',
            subTitle: 'N tower, DDP, Myeongdong Cathedral',
        }, {
            name: 'GANGNAM',
            bgColor: '#A969C4',
            textColor: '#85529B',
            title: 'Most advanced metropolitan with modern attractions',
            subTitle: 'Olympic park, Lotte tower, Coex, Gangnam Station',
        },]

    const onPressZoneButon = (item: { item: HomeZoneMapType, index: number }) => {
        setZoneIndex(item.index);
        if (item.index < 2) {
            dispatch(setZoneLocation(item.item.name.toLowerCase()));
        }
    }

    const onPressExplore = () => {
        if (zoneIndex > 1) {
            Alert.alert("Coming Very Soon!\n We are working very hard to open new zones. Please stay tuned!");
        } else {
            props.navigation.navigate(NavigatorRoute.ZONE);
        }
    }

    const renderZoneButton = (item: { item: HomeZoneMapType, index: number }) => {
        const additionalStyle = item.index === zoneIndex ? styles.LocationButtonSelected : styles.LocationButtonUnselected;

        return (
            <Pressable
                onPress={() => onPressZoneButon(item)}
                style={[
                    styles.LocationButtonDefault,
                    additionalStyle,
                    {
                        backgroundColor: zoneIndex === item.index ? item.item.bgColor + 'aa' : 'white',
                        borderColor: zoneIndex === item.index ? '#0000' : item.item.bgColor,
                    }
                ]}
            >
                <Text
                    style={[
                        styles.LocationButtonText,
                        {
                            color: item.item.textColor,
                        }]}
                >
                    {item.item.name}
                </Text>
            </Pressable>
        )
    }


    return (
        <Layout style={styles.DiscoverContainer}>
            <Map_background style={styles.DiscoverMap} width={windowWidth * 0.9} height={windowWidth * 0.9 / 383 * 280} />

            {zoneIndex == 0 ?
                <Hongdae_selected style={styles.DiscoverMap} width={windowWidth * 0.9} height={windowWidth * 0.9 / 383 * 280} />
                :
                <Hongdae_unselected style={{ position: 'absolute', top: 30, right: 29 }} width={windowWidth * 0.9} height={windowWidth * 0.9 / 383 * 280} />
            }
            {zoneIndex == 1 ?
                <Gwanghwamun_selected style={styles.DiscoverMap} width={windowWidth * 0.9} height={windowWidth * 0.9 / 383 * 280} />
                :
                <Gwanghwamun_unselected style={{ position: 'absolute', top: -11, right: -2 }} width={windowWidth * 0.9} height={windowWidth * 0.9 / 383 * 280} />
            }
            {zoneIndex == 2 ?
                <Myeongdong_selected style={styles.DiscoverMap} width={windowWidth * 0.9} height={windowWidth * 0.9 / 383 * 280} />
                :
                <Myeongdong_unselected style={styles.DiscoverMap} width={windowWidth * 0.9} height={windowWidth * 0.9 / 383 * 280} />
            }
            {zoneIndex == 3 ?
                <Gangnam_selected style={styles.DiscoverMap} width={windowWidth * 0.9} height={windowWidth * 0.9 / 383 * 280} />
                :
                <Gangnam_unselected style={styles.DiscoverMap} width={windowWidth * 0.9} height={windowWidth * 0.9 / 383 * 280} />
            }

            <Layout style={{ backgroundColor: '#0000', }}>
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
            </Layout>

            <Pressable style={styles.ExploreButtonContainer} onPress={() => onPressExplore()}>
                <Text style={styles.ExploreButtonText}>EXPLORE</Text>
                <Enter_Purple width={windowWidth * 0.05} />
            </Pressable>

        </Layout>

    )
}

const styles = StyleSheet.create({
    DiscoverContainer: {
        width: windowWidth * 0.9,
        alignSelf: 'center',
        marginTop: windowHeight * 0.025,
        borderRadius: 10,
        padding: windowHeight * 0.025
    },
    DiscoverTitleText: {
        backgroundColor: '#0000',
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18,
    },
    DiscoverSubTitleText: {
        backgroundColor: '#0000',
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
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2.42,
        elevation: 2,
    },
    LocationButtonSelected: {

    },
    LocationButtonText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 13
    },
    ZoneImageContainer: {
        backgroundColor: '#0000',
        paddingVertical: windowHeight * 0.02,
        marginTop: windowHeight * 0.01
    },
    FlatListContainer: {

    },
    DiscoverBottomContainer: {
        height: windowHeight * 0.1,
        justifyContent: 'center',
    },
    DiscoverMap: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    ExploreButtonContainer: {
        flexDirection: 'row',
        borderRadius: 15,
        backgroundColor: '#ECECFC',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: windowHeight * 0.004,
        marginTop: windowHeight * 0.01
    },
    ExploreButtonText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 15,
        color: '#7B64C8',
        marginRight: windowWidth * 0.01
    },
    DiscoverBottomText: {
        fontFamily: 'Pretendard-Medium'
    },
})