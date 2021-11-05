import React, { useCallback } from 'react';
import { Layout, LayoutElement, } from '@ui-kitten/components';
import { HomeScreenProps } from '../../navigation/SceneNavigator/Home.navigator';
import {
    ScrollView,
    StyleSheet,
    BackHandler,
} from 'react-native';
import { useFocusEffect, } from '@react-navigation/native';
import Toast from 'react-native-easy-toast';
import { HomeGlochatComponent, HomeMapComponent, HomeVisitComponent } from '../../component/Home';
import { windowHeight, windowWidth } from '../../Design.component';
import { ChannelIO } from 'react-native-channel-plugin'

var ToastRef: any;

export const HomeScreen = (props: HomeScreenProps): LayoutElement => {

    var exitApp: any = undefined;
    var timeout: any;
    let ChannelSettings = {
        pluginKey: 'd9d38a55e5e1d7b03f80037e229a7203'
    };



    // React.useEffect(() => {
    //     ChannelIO.boot(ChannelSettings)
    //         .then((result) => {
    //             console.log('채널톡 시동 : ', result);
    //         })
    //         .catch((err) => {
    //             console.log('채널톡 시동 에러 : ',err);
    //         })
    // }, [])


    useFocusEffect(
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
                style={styles.ScrollViewContainer}
                bounces={false}>

                {/* glochat 소개 컨테이너 */}
                <HomeGlochatComponent {...props} />

                {/* 지도 있는 곳  */}
                <HomeMapComponent {...props} />

                {/* I WANT TO VISIT */}
                <HomeVisitComponent {...props} />

                <Layout style={{ height: windowHeight * 0.05, backgroundColor: '#0000' }} />

            </ScrollView>

        </Layout>
    );
};

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#ECECFC',
        paddingBottom: windowHeight * 0.1
    },
    ScrollViewContainer: {
        width: '100%',
        backgroundColor: '#00ff0000',
    },
});
