import React from 'react';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Layout, LayoutElement } from '@ui-kitten/components';

export const Loading = () : LayoutElement => {

    return(
        <Layout style={styles.MainContainer}>
            <LottieView source={require('../../assets/loading.json')} autoPlay loop />
        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
})