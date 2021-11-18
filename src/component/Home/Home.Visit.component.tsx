import React from 'react';
import { Layout, } from '@ui-kitten/components';
import { Pressable, StyleSheet, Text } from 'react-native';
import { windowWidth, windowHeight } from '../../Design.component';
import { HomeScreenProps } from '../../navigation/SceneNavigator/Home.navigator';
import FastImage from 'react-native-fast-image';
import { SceneRoute } from '../../navigation/app.route';

export const HomeVisitComponent = (props: HomeScreenProps) => {
    return (
        <Layout style={styles.VisitContainer}>
            <Text style={styles.VisitText}>I WANT TO VISIT...</Text>
            <Layout style={styles.VisitItemContainer}>
                <Pressable style={styles.Shadow} onPress={() => props.navigation.navigate(SceneRoute.ZONE_DETAIL_CONTENT, { Id: '6180f80565b8ea897521996f' })}>
                    <FastImage source={require('../../assets/image/Home/hongdae.png')} style={styles.VisitItem} resizeMode={'stretch'} />
                </Pressable>
                <Pressable style={styles.Shadow} onPress={() => props.navigation.navigate(SceneRoute.ZONE_DETAIL_CONTENT, { Id: '6180f95e65b8ea897521997d' })}>
                    <FastImage source={require('../../assets/image/Home/gwanghwamun.png')} style={styles.VisitItem} resizeMode={'stretch'} />
                </Pressable>
            </Layout>
        </Layout>
    )
}

const styles = StyleSheet.create({
    VisitContainer: {
        width: windowWidth,
        alignSelf: 'center',
        marginTop: windowHeight * 0.025,
        padding: windowWidth * 0.05,
        borderRadius: 10,
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
        width: windowWidth * 0.39,
        height: windowWidth * 0.39,
        borderRadius: 10,
        marginHorizontal: windowWidth * 0.01,
    },
    Shadow: {
        shadowColor: "#999",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
    }
})