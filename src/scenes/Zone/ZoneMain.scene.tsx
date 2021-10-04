import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { ZoneMainSceneProps } from '../../navigation/ScreenNavigator/Zone.navigator';
import { ZoneMainBottomTabBarComponent, ZoneMainTopTabBarComponent } from '../../component/Zone/Main';

export const ZoneMainScene = (props : ZoneMainSceneProps) : React.ReactElement => {

    // Zone 화면 출력을 위한 Component Combine 역할 scene
    // Redux 최대 활용



    return(
        <Layout style={styles.MainContainer}>

            <ZoneMainTopTabBarComponent {...props}/>
            

            <ZoneMainBottomTabBarComponent {...props} />
            
        </Layout>
    )
}


const styles = StyleSheet.create({
    MainContainer: {
        flex : 1,
        width : '100%',
        height: '100%'
    }
})