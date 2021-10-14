import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { styles } from 'react-native-fbsdk-next/types/FBLoginButton';
import { Avatar, AvatarProps, IMessage } from 'react-native-gifted-chat';
import { windowWidth } from '../../../../Design.component';


export const renderAvatar = (props: AvatarProps<IMessage>): React.ReactElement => {

    if (props.currentMessage?.user.avatar == undefined) {

        return (
            <Layout style={{ width: windowWidth * 0.08, height: windowWidth * 0.08, marginRight: 5 }}>
                <FastImage source={require('../../../../assets/image/Chat/guideGray.png')} style={{ width: windowWidth * 0.08, height: windowWidth * 0.08 }} resizeMode={'stretch'} />

                <Text style={{position: 'absolute', top: -15, right: -45}}>닉네임</Text>
            </Layout>
        )
    }

    return (
        <Avatar
            {...props}
            imageStyle={{
                left: { width: windowWidth * 0.08, height: windowWidth * 0.08, marginRight: 5 },
                right: {}
            }}
        />
    )
}