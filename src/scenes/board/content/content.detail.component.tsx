import React from 'react'
import { Layout, LayoutElement, Text } from "@ui-kitten/components";
import { ContentDetailScreenProps } from '../../../navigation/board.navigator';


export const ContentDetailScreen = (props: ContentDetailScreenProps): LayoutElement => {

    const contentID = props.route.params.id;

    return(
        <Layout>
            <Text>{contentID}</Text>
        </Layout>
    );
}