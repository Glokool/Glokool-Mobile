import React from 'react';
import { Layout } from '@ui-kitten/components';
import { MyHistoryChatSceneProps } from '../../navigation/SceneNavigator/My.navigator';
import { HistoryChatComponent } from '../../component/My/HistoryChat/HistoryChat.component';



export const MyHistoryChatScene = (props : MyHistoryChatSceneProps) : React.ReactElement => {

    return(
        <Layout style={{width: '100%', height: '100%'}}>
            <HistoryChatComponent {...props} />
        </Layout>
    );
}