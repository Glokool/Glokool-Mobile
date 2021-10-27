import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { ChatTASelectSceneProps } from '../../navigation/SceneNavigator/Chat.navigator';
import { GuideListComponent, TASelectTopTabBarComponent } from '../../component/Chat/ChatTASelect';
import { useInterval } from '../../component/Chat/ChatRoom/Audio/Timer.component';
import { windowWidth } from '../../Design.component';

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
            <GuideListComponent {...props} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: isIphoneX() ? getStatusBarHeight() + 60 : 60,
        backgroundColor: 'white',
        width: windowWidth,
    },

})