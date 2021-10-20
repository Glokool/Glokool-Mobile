import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { ChatZoneSelectSceneProps } from '../../navigation/ScreenNavigator/Chat.navigator';
import { ZoneSelectTopTabBarComponent } from '../../component/Chat/ChatZoneSelect';




export const ChatZoneSelectScene = (props : ChatZoneSelectSceneProps) : React.ReactElement => {




    return (
        <SafeAreaView style={styles.container}>


            <ZoneSelectTopTabBarComponent {...props} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white'
    }

})