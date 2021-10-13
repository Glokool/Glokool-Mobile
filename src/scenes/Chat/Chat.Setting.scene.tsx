import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { windowHeight, windowWidth } from '../../Design.component';
import { SettingTopTabBarComponent } from '../../component/Chat/ChatRoomSetting';


export const ChatRoomSettingScene = (props: ChatRoomSettingProps) : React.ReactElement => {

    return(
        <Layout style={styles.MainContainer}>

            <SettingTopTabBarComponent {...props} />

        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer : {
        width : windowWidth,
        height : windowHeight
    }
})