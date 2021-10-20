import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { ChatZoneSelectSceneProps } from '../../navigation/ScreenNavigator/Chat.navigator';
import { ZoneButtonGroupComponent, ZoneSelectTopTabBarComponent } from '../../component/Chat/ChatZoneSelect';
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';




export const ChatZoneSelectScene = (props : ChatZoneSelectSceneProps) : React.ReactElement => {




    return (
        <SafeAreaView style={styles.container}>

            <ZoneSelectTopTabBarComponent {...props} />

            <Text style={styles.MainTitle}>WHERE ARE YOU PLANNING TO VISIT?</Text>
            <Text style={styles.SubTitle}>Select a zone to search for travel assistants</Text>

            <ZoneButtonGroupComponent {...props} />


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: isIphoneX()? getStatusBarHeight() + 60 : 60,
    },

    MainTitle : {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 17,
        marginLeft: 16
    },

    SubTitle : {
        fontFamily: 'Pretendard-Medium',
        fontSize: 16,
        color: '#BEBEBE',
        marginLeft: 16
    },

})