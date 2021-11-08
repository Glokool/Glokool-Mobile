import React, { useCallback, useState } from 'react';
import { Layout, LayoutElement, } from '@ui-kitten/components';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { windowWidth, windowHeight } from '../../../Design.component';
import { CheckIcon } from '../../../assets/icon/Common';
import FastImage from 'react-native-fast-image';

export const GroupChat = () => {
    return (
        <>
            <Layout style={{ alignItems: 'center', marginVertical: windowHeight * 0.02 }}>
                <Layout style={styles.PriceContainer}>
                    <Text style={styles.OriginalPrice}> $12 </Text>
                    <Text style={styles.DiscountPrice}>$ 5.99</Text>
                    <Text style={styles.PerDay}> /day</Text>
                </Layout>
                <Text style={{ fontFamily: 'Pretendard-SemiBold', fontSize: 18, color: '#7777ff' }}>Personal assistant at reasonable price</Text>
            </Layout>

            <FastImage source={require('../../assets/image/Info/Image_04.png')} style={styles.Image_04} />

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Local\nTravel Assistant'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <CheckIcon />
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Service Hour'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.PriceValueText}>{'10AM - 7PM'}</Text>
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Number of\nChat Participants'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.PriceValueText}>{'10 people'}</Text>
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Response Time'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.PriceValueText}>{'Standard'}</Text>
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Itinerary Feedback'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <Layout style={{ width: 30, height: 5, backgroundColor: '#D2D2D2' }} />
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Information'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <CheckIcon />
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Q & A'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <CheckIcon />
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Recommendation'}</Text>
                    <Text style={styles.SmallText}>{'*Attraction, Restaurant, Cafe, Menu, Activity, Photo spot, Exhibition and etc.'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.PriceValueText}>{'Unlimited\nChoice'}</Text>
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Vegan Option'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.PriceValueText}>{'Unlimited\nChoice'}</Text>
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Reservation'}</Text>
                    <Text style={styles.SmallText}>{'*Attraction, Restaurant, Cafe, Activity, Exhibition and etc.'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <CheckIcon />
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Directions'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <CheckIcon />
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Live Translation'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <CheckIcon />
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Image Translation'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <CheckIcon />
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Communication\nwith Travelers'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <CheckIcon />
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Chat History'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <CheckIcon />
                </Layout>
            </Layout>
        </>
    )
}

export const PrivateChat = () => {
    return (
        <>
            <Layout style={{ alignItems: 'center', marginVertical: windowHeight * 0.02 }}>
                <Layout style={styles.PriceContainer}>
                    <Text style={styles.OriginalPrice}> $30 </Text>
                    <Text style={styles.DiscountPrice}>$ 14.99</Text>
                    <Text style={styles.PerDay}> /day</Text>
                </Layout>
                <Text style={{ fontFamily: 'Pretendard-SemiBold', fontSize: 18, color: '#7777ff' }}>100% customized service just for you</Text>
            </Layout>

            <FastImage source={require('../../assets/image/Info/Image_04.png')} style={styles.Image_04} />

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Local\nTravel Assistant'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <CheckIcon />
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Service Hour'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.PriceValueText}>{'10AM - 7PM'}</Text>
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Number of\nChat Participants'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.PriceValueText}>{'1 person only'}</Text>
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Response Time'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.PriceValueText}>{'Fast'}</Text>
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Itinerary Feedback'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <Layout style={{ width: 30, height: 5, backgroundColor: '#D2D2D2' }} />
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Information'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <CheckIcon />
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Q & A'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <CheckIcon />
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Recommendation'}</Text>
                    <Text style={styles.SmallText}>{'*Attraction, Restaurant, Cafe, Menu, Activity, Photo spot, Exhibition and etc.'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.PriceValueText}>{'Unlimited\nChoice'}</Text>
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Vegan Option'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.PriceValueText}>{'Unlimited\nChoice'}</Text>
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Reservation'}</Text>
                    <Text style={styles.SmallText}>{'*Attraction, Restaurant, Cafe, Activity, Exhibition and etc.'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <CheckIcon />
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Directions'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <CheckIcon />
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Live Translation'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <CheckIcon />
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Image Translation'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <CheckIcon />
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Communication\nwith Travelers'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <CheckIcon />
                </Layout>
            </Layout>

            <Layout style={styles.PriceInfoContainer}>
                <Layout style={{ flex: 1 }}>
                    <Text style={styles.PriceKeyText}>{'Chat History'}</Text>
                </Layout>
                <Layout style={{ flex: 1, alignItems: 'center' }}>
                    <CheckIcon />
                </Layout>
            </Layout>
        </>
    )
}


const styles = StyleSheet.create({
    PriceInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: windowWidth * 0.85,
        height: windowHeight * 0.06,
        marginVertical: windowHeight * 0.01
    },
    PriceKeyText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 16,
        color: '#555570',
    },
    PriceValueText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18,
        color: '#7777ff',
        textAlign: 'center',
    },
    SmallText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 11,
        color: '#ccc'
    },
    PriceContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    OriginalPrice: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 20,
        color: '#c6c6c6',
        textDecorationLine: 'line-through'
    },
    DiscountPrice: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 25,
    },
    PerDay: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18,
    },
    Image_04: {
        width: windowWidth * 0.9,
        height: windowWidth * 0.9 / 1110 * 48
    },
})