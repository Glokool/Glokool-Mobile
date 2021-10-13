import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    BackHandler,
    Dimensions,
    Alert,
    SafeAreaView
} from 'react-native';
import { Divider, Layout, LayoutElement } from '@ui-kitten/components';
import { NavigatorRoute } from '../../navigation/app.route';
import { ChatScreenProps } from '../../navigation/ScreenNavigator/Chat.navigator';
import axios from 'axios';
import { SERVER } from '../../server.component';
import { ChatListNow } from '../../component/Chat/chat.list.now.component';
import { ChatListRecent } from '../../component/Chat/chat.list.recent.component';
import Toast from 'react-native-easy-toast';
import { AuthContext } from '../../context/AuthContext';
import { PriceData } from '../../types';

import { alertWindow } from '../../component/Common/LoginCheck.component';
import { ChatList, TopTabWeatherbar } from '../../component/Chat/ChatMain';

var ToastRef: any;
const windowHeight = Dimensions.get('window').height;

export const ChatScreen = (props: ChatScreenProps): LayoutElement => {
    const [now, setNow] = useState<boolean>(true);
    const [price, setPrice] = useState<PriceData>();

    const { currentUser } = useContext(AuthContext);

    var exitApp: any = undefined;
    var timeout: any;

    const pressBookButton = () => {
        if (!currentUser) {
            alertWindow(props.navigation);
        }
        else { 
            props.navigation.navigate(NavigatorRoute.PAY); 
        }
    }

    // 백핸들러 적용을 위한 함수
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

    useEffect(() => {
        InitResSetting();
    }, []);

    const InitResSetting = async () => {
        var config = {
            Method: 'get',
            url: SERVER + '/api/price',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        var result = await axios(config);
        setPrice({
            active: result.data.active,
            discountedPrice: result.data.discountedPrice,
            price: result.data.price,
            discount: result.data.discount,
        });
    }

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

    return (
        <Layout style={styles.MainContainer}>
            
            <SafeAreaView style={{flex: 0}} />

            <TopTabWeatherbar />

            <Divider style={styles.Divider}/>

            <ChatList />



            {/* <Layout style={styles.TextButtonContainer}>
                <TouchableOpacity onPress={() => setNow(true)}>
                    <Text
                        style={
                            now === true
                                ? styles.TextButtonSelected
                                : styles.TextButton
                        }>
                        NOW
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setNow(false)}>
                    <Text
                        style={
                            now === false
                                ? styles.TextButtonSelected
                                : styles.TextButton
                        }>
                        RECENT
                    </Text>
                </TouchableOpacity>
            </Layout>

            {now === true ? (
                <ChatListNow
                    navigation={props.navigation}
                    route={props.route}
                />
            ) : (
                <ChatListRecent
                    navigation={props.navigation}
                    route={props.route}
                />
            )}

            <Layout style={styles.AdContainer}>
                <Layout style={styles.AdContainer2}>
                    <Text style={styles.DiscountNot}>
                        {' ' + price?.price
                            .toString()
                            .replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ',',
                            ) + ' '}
                    </Text>

                    <Text style={styles.Cost}>
                        {price?.discountedPrice}
                        <Text style={styles.KRW}>
                            KRW{' '}
                            <Text style={styles.KRWElse}>
                                / Per DAY
                            </Text>
                        </Text>
                    </Text>
                </Layout>

                <Layout style={styles.AdContainer3}>
                    <TouchableOpacity
                        onPress={() => pressBookButton()}>
                        <Text style={styles.BookButtonText}>
                            BOOK
                        </Text>
                    </TouchableOpacity>
                </Layout>
            </Layout>

            <Toast ref={(toast) => (ToastRef = toast)} position={'bottom'} /> */}

            
        </Layout>
    );
};

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },

    Divider : {
        backgroundColor: '#F8F8F8',
        height: 6,
        width: '100%'
    },

    Title : {
        marginLeft : 20,
        fontFamily: 'Pretendard-Bold',
        fontSize: 17,
        marginVertical: 20
    }


    // TextButtonContainer: {
    //     marginLeft: 0,
    //     paddingLeft: 20,
    //     flexDirection: 'row',
    //     borderBottomWidth: 3,
    //     borderColor: "#f8f8f8",
    // },
    // TextButton: {
    //     padding: 10,
    //     color: '#D2D2D2',
    //     fontFamily: 'BrandonGrotesque-Medium',
    //     fontSize: 18,
    // },
    // TextButtonSelected: {
    //     padding: 10,
    //     color: 'black',
    //     fontFamily: 'BrandonGrotesque-Medium',
    //     fontSize: 18,
    // },
    // AdContainer: {
    //     position: 'absolute',
    //     width: '100%',
    //     bottom: windowHeight * 0.07,
    //     flexDirection: 'row',
    // },
    // AdContainer2: {
    //     borderTopWidth: 2,
    //     borderTopColor: '#eee',
    //     flex: 2,
    //     justifyContent: 'center',
    //     paddingVertical: 10,
    //     paddingBottom: 15,
    // },
    // AdContainer3: {
    //     backgroundColor: '#252525',
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // DiscountNot: {
    //     fontFamily: 'Pretendard-Medium',
    //     color: '#adadad',
    //     fontSize: 16,
    //     marginLeft: 30,
    //     textDecorationLine: 'line-through'
    // },
    // Cost: {
    //     fontFamily: 'Pretendard-Bold',
    //     fontSize: 22,
    //     marginLeft: 30,
    //     color: '#7777ff',
    // },
    // KRW: {
    //     fontFamily: 'BrandonGrotesque-Bold',
    //     fontSize: 14,
    // },
    // KRWElse: {
    //     fontFamily: 'Pretendard-SemiBold',
    //     fontSize: 17,
    //     color: 'black',
    // },
    // BookButtonText: {
    //     fontFamily: 'BrandonGrotesque-BoldItalic',
    //     fontSize: 22,
    //     color: '#7777FF',
    // },
});
