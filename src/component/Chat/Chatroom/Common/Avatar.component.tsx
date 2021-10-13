import { Layout } from '@ui-kitten/components';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { Avatar, AvatarProps, IMessage } from 'react-native-gifted-chat';
import { windowWidth } from '../../../../Design.component';


export const renderAvatar = (props: AvatarProps<IMessage>): React.ReactElement => {

    if (props.currentMessage?.user.avatar == undefined) {

        return (
            <Layout style={{ width: windowWidth * 0.08, height: windowWidth * 0.08, marginRight: 5 }}>
                <FastImage source={require('../../../../assets/image/Chat/guideGray.png')} style={{ width: windowWidth * 0.08, height: windowWidth * 0.08 }} resizeMode={'stretch'} />
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