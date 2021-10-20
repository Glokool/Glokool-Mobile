import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { ZoneMainSceneProps } from '../../navigation/ScreenNavigator/Zone.navigator';
import {
    ZoneMainBottomTabBarComponent,
    ZoneMainTopTabBarComponent,
    ZoneBannerComponent,
    ZoneGuideListComponent,
    ZoneCategoryListComponent,
} from '../../component/Zone';
import { windowWidth } from '../../Design.component';
import axios from 'axios';
import { SERVER } from '../../server.component';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../model';
import { setZoneLoadingTrue, setZoneLoadingFalse } from '../../model/Zone/Zone.Loading.model';

export const ZoneMainScene = (props: ZoneMainSceneProps): React.ReactElement => {

    // Zone 화면 출력을 위한 Component Combine 역할 scene
    // Redux 최대 활용

    const loading = useSelector((state: RootState) => state.ZoneLoadingModel.loading);
    const dispatch = useDispatch();

    const [bannerImage, setBannerImage] = useState();
    const [chatrooms, setChatrooms] = useState();
    const [contents, setContents] = useState();

    useEffect(() => {
        dispatch(setZoneLoadingTrue());
        InitZoneMain();
    }, [])

    const InitZoneMain = async () => {
        axios.get(SERVER + '/api/zone-main')
            .then((response) => {

                setBannerImage(response.data.zoneInfo.images);
                setChatrooms(response.data.chatRooms);
                setContents(response.data.contents);

                console.log(response.data);

                dispatch(setZoneLoadingFalse());
            })
            .catch((e) => {
                console.log("Zone main", e);
            });
    }

    return loading ? (<Layout />) : (
        <Layout style={styles.MainContainer}>

            {/* 최상단 지역 버튼 */}
            <ZoneMainTopTabBarComponent {...props} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <Layout style={styles.InnerContainer}>
                    {/* 지역 이미지 배너 */}
                    <ZoneBannerComponent {...props} items={bannerImage} />
                    {/* 가이드 리스트 */}
                    <Text style={styles.GuideText}>LOCAL EXPERTS IN THIS AREA</Text>
                    <ZoneGuideListComponent {...props} items={chatrooms} />
                </Layout>

                <Layout style={styles.ListContainer}>
                    {/* 카테고리 & 컨텐츠 목록 */}
                    <ZoneCategoryListComponent {...props} items={contents} />
                </Layout>

            </ScrollView>
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
    },
    InnerContainer: {
        width: windowWidth,
        backgroundColor: '#ffffff',
        paddingBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 2,
    },
    GuideText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 18,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    ListContainer: {
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 2,
    }
})