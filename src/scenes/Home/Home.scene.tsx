import React, { useCallback } from 'react';
import { Layout, LayoutElement, } from '@ui-kitten/components';
import { HomeScreenProps } from '../../navigation/ScreenNavigator/Home.navigator';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    BackHandler,
    Image,
    Platform,
    TouchableOpacity
} from 'react-native';
import { NavigatorRoute } from '../../navigation/app.route';
import { useFocusEffect, } from '@react-navigation/native';
import Toast from 'react-native-easy-toast';
import { HomeTopTabBar, HomeCarousel } from '../../component/Home';
import 'firebase/auth';
import { HomeBG, GloChatInfo, GloChatInfoIcon } from '../../assets/icon/Home';
import { SceneRoute } from '../../navigation/app.route';

var ToastRef: any;

export const HomeScreen = (props: HomeScreenProps): LayoutElement => {

    var exitApp: any = undefined;
    var timeout: any;

    const focusEvent = useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);

            return () => {
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    handleBackButton,
                );
            };
        }, []),
    );

    const handleBackButton = () => {
        if (exitApp == undefined || !exitApp) {
            ToastRef.show('Press one more time to exit', 1000);
            exitApp = true;

            timeout = setTimeout(() => {
                exitApp = false;
            }, 2000);
        } else {
            clearTimeout(timeout);
            BackHandler.exitApp();
        }

        return true;
    };

    return (
        <Layout style={styles.MainContainer}>

            <Toast ref={(toast) => (ToastRef = toast)} position={'center'} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.ScrollViewContainer}>

                <HomeTopTabBar
                    navigation={props.navigation}
                    route={props.route} />
                
                <Layout>
                    <Text>Start your journey</Text>
                    <Text>with GloChat today!</Text>
                </Layout>

                <Layout>
                    <Text>A real-time</Text>
                    <Text>travel assistance service</Text>
                </Layout>

                
            </ScrollView>

        </Layout>
    );
};

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        alignItems:'center',
    },
    ScrollViewContainer:{
        width: '100%', 
        backgroundColor: '#00ff0000' 
    }
});
