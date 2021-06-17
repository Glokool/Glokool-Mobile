import React from 'react';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Layout, LayoutElement, Spinner } from '@ui-kitten/components';

export const Loading = () : LayoutElement => {

    return(
        <Layout style={styles.MainContainer}>
            <Spinner size={'giant'} />
        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
})