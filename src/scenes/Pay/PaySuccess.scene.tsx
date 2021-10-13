import { Layout } from '@ui-kitten/components';
import React from 'react';
import { PaySuccessSceneProps } from '../../navigation/Pay/Pay.navigator';
import { ArrowLeft, EmptyImage } from '../../assets/icon/Common';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { PaySuccessPage } from '../../assets/icon/Pay';
import { windowWidth, windowHeight } from '../../Design.component';
import { NavigatorRoute } from '../../navigation/app.route';

export const PaySuccessScene = (props: PaySuccessSceneProps) => {
    return (
        <Layout style={styles.MainContainer}>

            <Layout style={styles.TopTabContainer}>
                <Layout style={styles.TopTabItems}>
                    <Text style={styles.TopTabText}>BOOKING CONFIRMATION</Text>
                </Layout>

                <Layout style={styles.Pagination}>
                    <PaySuccessPage />
                </Layout>
            </Layout>

            <Layout style={styles.InfoContainer}>
                <EmptyImage />

                <Text style={styles.FailureText}>Payment Successful</Text>
                <Text style={styles.RetryText}>Your booking has been confirmed</Text>
                <Text style={styles.RetryText}>and the receipt has been issued.</Text>
            </Layout>

            <Layout>
                <TouchableOpacity
                    style={[styles.ButtonContainer, { borderWidth: 2, borderColor: '#7777ff' }]}
                    onPress={() => { }}
                >
                    <Text style={[styles.ButtonText, { color: '#7777ff' }]}>VIEW RECEIPTS</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.ButtonContainer, { borderWidth: 2, borderColor: '#7777ff' }]}
                    onPress={() => { props.navigation.navigate(NavigatorRoute.HOME) }}
                >
                    <Text style={[styles.ButtonText, { color: '#7777ff' }]}>CONTINUE BROWSING</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.ButtonContainer, { backgroundColor: '#7777ff' }]}
                    onPress={() => { }}
                >
                    <Text style={[styles.ButtonText, { color: 'white' }]}>START CONVERSATION</Text>
                </TouchableOpacity>
            </Layout>

        </Layout>
    )
}

const styles = StyleSheet.create({
    Pagination: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    MainContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: windowHeight * 0.05
    },
    ButtonContainer: {
        width: windowWidth * 0.9,
        height: windowHeight * 0.06,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ButtonText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 18
    },
    FailureText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18,
        color: '#FE8686',
        marginVertical: 20,
    },
    RetryText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        marginTop: 5,
    },
    TopTabContainer: {
        width: windowWidth * 0.9,
        paddingBottom: 10,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        backgroundColor: 'white',
    },
    TopTabItems: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    TopTabText: {
        flex: 5,
        fontFamily: 'BrandonGrotesque-Bold',
        textAlign: 'center',
        fontSize: 18,
    },
    BackButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
    },
    InfoContainer: {
        alignItems: 'center'
    }
});