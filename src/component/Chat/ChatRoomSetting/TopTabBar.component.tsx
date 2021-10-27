import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { ArrowLeft } from '../../../assets/icon/Common';
import { ChatRoomSettingSceneProps } from '../../../navigation/ScreenNavigator/Chat.navigator';
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';


export const SettingTopTabBarComponent = (props : ChatRoomSettingSceneProps) : React.ReactElement => {

    const PressBackButton = () => {
        props.navigation.goBack();
    }

    return (
        <Layout style={styles.MainContainer}>
            
            <Pressable
                style={styles.LeftIcon}
                onPress={() => {PressBackButton()}}>
                <ArrowLeft />
            </Pressable>

            <Layout style={styles.TitleContainer}>
                <Text style={styles.Title}>CHAT ROOM SETTING</Text>
            </Layout>

            <Layout style={styles.EmptyContainer}/>
        </Layout>            

    );
}

const styles = StyleSheet.create({
    MainContainer : {
        flexDirection: 'row',
        // position: 'absolute',
        width: '100%',
        // top: isIphoneX()? getStatusBarHeight() : 0,
        height: 60,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderBottomWidth : 1,
        borderBottomColor : '#F0F0F0'
    },

    TitleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    Title: {
        fontFamily : 'BrandonGrotesque-Bold',
        fontSize: 16,
        color: 'black',
        textAlign : 'center',
    },

    
    LeftIcon : {
        width: 10,
        height : 10,
        marginHorizontal: 5,
        padding : 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },

    EmptyContainer: {
        width: 10,
        height : 10,
        marginHorizontal: 5,
        padding : 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    }
})