import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { ZoneMainSceneProps } from '../../navigation/ScreenNavigator/Zone.navigator';
import {
    ZoneMainBottomTabBarComponent,
    ZoneMainTopTabBarComponent,
    ZoneBannerComponent
} from '../../component/Zone/Main';

export const ZoneMainScene = (props: ZoneMainSceneProps): React.ReactElement => {

    // Zone 화면 출력을 위한 Component Combine 역할 scene
    // Redux 최대 활용



    return (
        <Layout style={styles.MainContainer}>

            {/* 최상단 지역 버튼 */}
            <ZoneMainTopTabBarComponent {...props} />

            {/* 지역 이미지 배너 */}
            <ZoneBannerComponent {...props} />

            {/* 지역 바꿀 수 있는 Bottom Sheet */}
            <ZoneMainBottomTabBarComponent {...props} />

        </Layout>
    )
}


const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        width: '100%',
        height: '100%'
    }
})