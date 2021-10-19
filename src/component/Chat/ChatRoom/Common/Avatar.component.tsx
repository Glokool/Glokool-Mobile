import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Avatar, AvatarProps, IMessage } from 'react-native-gifted-chat';
import { windowWidth } from '../../../../Design.component';
import { Layout, Text } from '@ui-kitten/components';

export const renderAvatar = (props: AvatarProps<IMessage>): React.ReactElement => {

    if (props.currentMessage?.user.avatar == undefined) {
        return (
            <>
                <Layout style={styles.AvatarContainer}>
                    <FastImage source={require('../../../../assets/image/Chat/guideGray.png')} style={styles.Avatar} resizeMode={'stretch'} />              
                </Layout>
                <Text numberOfLines={1} style={styles.NicknameText}>{props.currentMessage?.user.name}</Text>
            </>
        )
    }

    return (
        <>
            <Layout style={styles.AvatarContainer}>
                <FastImage source={require('../../../../assets/image/Chat/guideGray.png')} style={styles.Avatar} resizeMode={'stretch'} />              
            </Layout>
            <Text numberOfLines={1} style={styles.NicknameText}>nickname</Text>
        </>
    )
}

const styles = StyleSheet.create({

    AvatarContainer: {
        width: windowWidth * 0.08, 
        height: windowWidth * 0.08, 
        marginRight: 5,
    },

    Avatar: {
        width: windowWidth * 0.08, 
        height: windowWidth * 0.08,
        borderRadius: 50
    },

    NicknameText: {
        position: 'absolute', 
        top: -10, 
        right: -140,
        width: 140
    }


})