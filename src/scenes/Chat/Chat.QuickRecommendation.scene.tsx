import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components'
import { useDispatch } from 'react-redux';
import { windowHeight, windowWidth } from '../../Design.component';
import { ChatQuickRecommendationProps } from '../../navigation/ScreenNavigator/Chat.navigator';
import { QuickRecommendationTopTabBarComponent } from '../../component/Chat/ChatQuickRecommendation';
import FastImage from 'react-native-fast-image';



export const ChatQuickRecommendationScene = (props : ChatQuickRecommendationProps) : React.ReactElement => {

    const dispatch = useDispatch();

    return (
        <SafeAreaView style={styles.MainContainer}>
          
            <Layout style={styles.EmptyContainer} />

            <Layout style={styles.PictureBannerContainer}>
                <FastImage source={require('../../assets/image/Chat/QuickRecommendBanner.png')} style={styles.PictureBannerContainer}/>
            </Layout>

            <Layout style={styles.CategoryContainer}>
                <Text>안녕?</Text>
            </Layout>    


            <QuickRecommendationTopTabBarComponent {...props} />
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        width : windowWidth,
        height: windowHeight,
        backgroundColor: 'white'
    },

    EmptyContainer: {
        height : 60
    },

    PictureBannerContainer: {
        height: 64,
        width : '100%'
    },

    CategoryContainer: {
        flex : 1,
        marginVertical : 10,
        marginHorizontal: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        alignItems: 'center'
    }
})