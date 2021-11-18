import React from 'react';
import { StyleSheet, SafeAreaView, Text, ScrollView, Platform } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { ChatZoneSelectSceneProps } from '../../navigation/SceneNavigator/Chat.navigator';
import { ZoneButtonGroupComponent, ZoneSelectTopTabBarComponent } from '../../component/Chat/ChatZoneSelect';
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';
import { ZoneMapImage } from '../../assets/icon/Chat';
import { windowWidth } from '../../Design.component';

export const ChatZoneSelectScene = (props: ChatZoneSelectSceneProps): React.ReactElement => {
    
    return (
        <ScrollView style={styles.container} bounces={false}>
            <SafeAreaView />

            <ZoneMapImage width={windowWidth} height={windowWidth / 414 * 302} style={{ marginTop: Platform.OS === 'ios' ? 60 - getStatusBarHeight() : 60 }} />

            <Text style={styles.MainTitle}>WHERE ARE YOU PLANNING TO VISIT?</Text>
            <Text style={styles.SubTitle}>Select a zone to search for travel assistants</Text>

            <ZoneButtonGroupComponent {...props} />
            <ZoneSelectTopTabBarComponent {...props} />

        </ScrollView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        // paddingTop: isIphoneX()? getStatusBarHeight() + 60 : 60,
    },

    MainTitle: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 17,
        marginLeft: 16,
        marginTop: 35,
        color: 'black',
    },

    SubTitle: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 16,
        color: '#BEBEBE',
        marginLeft: 16,
        marginBottom: 15,
    },

})