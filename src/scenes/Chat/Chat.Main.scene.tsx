import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    StyleSheet,
    BackHandler,
    Dimensions,
    SafeAreaView,
} from 'react-native';
import { Divider, Layout, LayoutElement} from '@ui-kitten/components';
import { ChatMainSceneProps } from '../../navigation/SceneNavigator/Chat.navigator';
import { ChatList, TopTabWeatherbar } from '../../component/Chat/ChatMain';

var ToastRef: any;
const windowHeight = Dimensions.get('window').height;

export const ChatMainScene = (props: ChatMainSceneProps): LayoutElement => {

    var exitApp: any = undefined;
    var timeout: any;

    // 백핸들러 적용을 위한 함수
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
        <SafeAreaView style={styles.MainContainer}>

            <TopTabWeatherbar />

            <ChatList {...props} />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    MainContainer: {
        flex : 1,
        backgroundColor: 'white',
    },

});
