import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { ChatTASelectSceneProps } from '../../navigation/SceneNavigator/Chat.navigator';
import { CurrentKoreanTimeComponent, GuideListComponent, TASelectTopTabBarComponent } from '../../component/Chat/ChatTASelect';
import { useInterval } from '../../component/Chat/ChatRoom/Audio/Timer.component';
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';



export const ChatTASelectScene = (props: ChatTASelectSceneProps) => {

    const Zone = props.route.params.zone;
    const KRTIMEDIFF = 9 * 60 * 60 * 1000;

    const date = new Date();
    const utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
    const [time, setTime] = React.useState(new Date(utc + KRTIMEDIFF));

    useInterval(() => {
        const date = new Date();
        const utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
        setTime(new Date(utc + KRTIMEDIFF));
    }, 30000)

    return (
        <SafeAreaView style={styles.container}>

            <TASelectTopTabBarComponent {...props} />

            {/* <CurrentKoreanTimeComponent year={time.getFullYear()} month={time.getMonth() + 1} day={time.getDate()} hour={time.getHours()} minutes={time.getMinutes()} /> */}

            <GuideListComponent {...props} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: isIphoneX() ? getStatusBarHeight() + 60 : 60,
        backgroundColor: 'white'
    },

})