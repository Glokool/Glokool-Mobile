import React from 'react';
import { StyleSheet, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Avatar, AvatarProps, IMessage } from 'react-native-gifted-chat';
import { windowWidth } from '../../../../Design.component';
import { Layout } from '@ui-kitten/components';

export const renderAvatar = (props: AvatarProps<IMessage>): React.ReactElement => {

    if (props.currentMessage?.user.avatar == undefined) {
        return (
            <>
                <Layout style={{ width: windowWidth * 0.08, height: windowWidth * 0.08, marginRight: 5, marginTop: - 10 }}>
                    <FastImage source={require('../../../../assets/image/Chat/guideGray.png')} style={{ width: windowWidth * 0.08, height: windowWidth * 0.08 }} resizeMode={'stretch'} />
                </Layout>
                <Text numberOfLines={1} style={styles.NicknameText}>{props.currentMessage?.user.name}</Text>
            </>
        )
    }

    return (
        <Layout style={{ width: windowWidth * 0.08, height: windowWidth * 0.08, marginRight: 5, marginTop: 10 }}>
            <FastImage source={{ uri: props.currentMessage.user.avatar }} style={{ width: windowWidth * 0.08, height: windowWidth * 0.08 }} resizeMode={'stretch'} />

            <Text numberOfLines={1} style={styles.NicknameText}>{props.currentMessage.user.name}</Text>
        </Layout>
    )
}

const styles = StyleSheet.create({

    NicknameText: {
        position: 'absolute',
        fontFamily: 'Pretendard-Medium',
        fontSize: 14,
        color: '#575757',
        top: -10,
        left: windowWidth * 0.12,
        overflow: 'visible',
        width: 100
    }


})