import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native'
import { Layout } from '@ui-kitten/components';
import { CommonTopTabBar } from '../../component/Common';
import { PayFailedSceneProps } from '../../navigation/Pay.navigator';
import { PayFailedPage } from '../../assets/icon/Pay';
import { EmptyImage, ArrowLeft } from '../../assets/icon/Common';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { windowHeight, windowWidth } from '../../Design.component';
import { SafeAreaView } from 'react-native-safe-area-context';

export const PayFailedScene = (props: PayFailedSceneProps) => {

    const goBackTwice = () => {
        props.navigation.pop();
        props.navigation.pop();
    }

    return (
        <Layout style={styles.MainContainer}>

            <Layout style={styles.TopTabContainer}>
                <Layout style={styles.TopTabItems}>
                    <TouchableOpacity
                        style={styles.BackButton}
                        onPress={() => goBackTwice()}
                    >
                        <ArrowLeft />
                    </TouchableOpacity>

                    <Text style={styles.TopTabText}>BOOKING CONFIRMATION</Text>

                    <Layout style={{ width: 30, height: 30, }} />
                </Layout>

                <Layout style={styles.Pagination}>
                    <PayFailedPage />
                </Layout>
            </Layout>

            <Layout style={styles.InfoContainer}>
                <EmptyImage />

                <Text style={styles.FailureText}>Payment Failure</Text>
                <Text style={styles.RetryText}>Please Try It Again :(</Text>
            </Layout>

            <TouchableOpacity
                style={styles.ButtonContainer}
                onPress={() => goBackTwice()}
            >
                <Text style={styles.ButtonText}>GO BACK</Text>
            </TouchableOpacity>

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
    MainContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: windowHeight * 0.07
    },
    ButtonContainer: {
        width: windowWidth * 0.9,
        height: windowHeight * 0.06,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    ButtonText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        color: 'white',
        fontSize: 18
    },
    FailureText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18,
        color: '#FE8686',
        marginTop: 20,
    },
    RetryText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        marginTop: 10,
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