import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components'
import { useDispatch } from 'react-redux';
import { windowHeight, windowWidth } from '../../Design.component';
import { ChatQuickRecommendationProps } from '../../navigation/ScreenNavigator/Chat.navigator';
import { QuickRecommendationTopTabBarComponent } from '../../component/Chat/ChatQuickRecommendation';



export const ChatQuickRecommendationScene = (props : ChatQuickRecommendationProps) : React.ReactElement => {

    const dispatch = useDispatch();

    return (
        <Layout style={styles.MainContainer}>

            <QuickRecommendationTopTabBarComponent {...props} />
            
        </Layout>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        width : windowWidth,
        height: windowHeight
    }
})