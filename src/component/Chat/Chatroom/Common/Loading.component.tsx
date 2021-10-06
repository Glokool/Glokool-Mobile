import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Spinner } from '@ui-kitten/components'

//대화 내용을 로딩하기 전 스피너 작동
export const renderLoading = () => {

    return (
        <Layout style={styles.LoadingContainer}>
            <Spinner size= "giant"/>
        </Layout>
    );

};

const styles = StyleSheet.create({

    LoadingContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
    
})