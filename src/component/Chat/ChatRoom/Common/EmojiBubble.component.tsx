
import React from "react";
import { Layout } from "@ui-kitten/components";
import { BubbleProps, IMessage } from "react-native-gifted-chat";
import { GREAT, THANK_YOU, QUESTION, WOW, YAMMY, UH_OH, HELP_ME, HI, GOOD_BYE } from '../../../../assets/image/Chat/Emoji'
import FastImage from "react-native-fast-image";

export const EmojiMessages = (props: any) : React.ReactElement => {

    const emoji = [GREAT, THANK_YOU, QUESTION, WOW, YAMMY, UH_OH, HELP_ME, HI, GOOD_BYE];
    const data = ['GREAT', 'THANK_YOU', 'QUESTION', 'WOW', 'YAMMY', 'UH_OH', 'HELP_ME', 'HI', 'GOOD_BYE'];

    const index = data.indexOf(props.currentMessage?.emoji);

    return (
        <Layout>
            <FastImage source={emoji[index]} style={{ width : 150, height : 150}}/>
        </Layout>
    )
}