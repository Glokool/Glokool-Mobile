import React from 'react';
import { Text, StyleSheet } from 'react-native'
import { Layout, LayoutElement } from '@ui-kitten/components';
import { PaySecondPage } from '../../assets/icon/Pay';
import { PaySecondSceneProps } from '../../navigation/Pay.navigator';
import { CommonTopTabBar } from '../../component/Common/TopTabBar.component';

export const PaySecondScene = (props: PaySecondSceneProps): LayoutElement => {
    return (
        <Layout>
            {/* top tap bar */}
            <CommonTopTabBar
                title={'PAYMENT INFORMATION'}
                navigation={props.navigation}
                child={
                    <Layout style={styles.Pagination}>
                        <PaySecondPage />
                    </Layout>
                } />

            <Text style={styles.TitleText}>
                {'REVIEW & PAY'}
            </Text>
            <Text>
                Type of Travel Assistance Service
            </Text>

            <Layout>
                <Layout>
                    <Text>Private Chat</Text>
                </Layout>
                <Text>
                    2021.08.20
                </Text>
                <Text>
                    10 AM ~ 8 PM
                </Text>
                <Text>
                    (KST)
                </Text>
            </Layout>

            <Layout>
                <Text>Travel Destination</Text>
                <Text>Hongdae</Text>
            </Layout>
            <Layout>
                <Text>Travel Assistant Name</Text>
                <Text>Glokool Official</Text>
            </Layout>
            <Layout>
                <Text>Service Language</Text>
                <Text>English</Text>
            </Layout>

            <Text style={styles.TitleText}>
                PAYMENT DETAILS
            </Text>
            <Layout>
                <Text>Service Fees</Text>
                <Text>20.00 USD</Text>
            </Layout>
            <Layout>
                <Text>Promotion</Text>
                <Text>- 10.01 USD</Text>
            </Layout>

            {/* Banner */}

            {/* Divider */}

            <Layout>
                <Text style={styles.TitleText}>TOTAL</Text>
                <Layout>
                    <Text>9.99</Text>
                    <Text>USD</Text>
                </Layout>
            </Layout>

        </Layout>
    )
};

const styles = StyleSheet.create({
    Pagination: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    TitleText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 16,
        color: '#7777ff'
    },
    SubTitleText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#a1a1a1'
    },
    ValueText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
    }
})