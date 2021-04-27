import React from 'react'
import { Layout, LayoutElement, Text } from "@ui-kitten/components";
import { ContentScreenProps } from '../../navigation/home.navigator'



export const ContentScreen = (props: ContentScreenProps): LayoutElement => {



    return(
        <Layout>
            <Text>안녕</Text>
        </Layout>
    );
}