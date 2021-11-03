import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, Alert, Modal } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { ZoneMainSceneProps } from '../../navigation/SceneNavigator/Zone.navigator';
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
import { setZoneLocation } from '../../model/Zone/Zone.Location.model';
import { Loading } from '../../component/Common';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

export const ZoneMainScene = (props: ZoneMainSceneProps): React.ReactElement => {

    // Zone 화면 출력을 위한 Component Combine 역할 scene
    // Redux 최대 활용

    const loading = useSelector((state: RootState) => state.ZoneLoadingModel.loading);
    const location = useSelector((state: RootState) => state.ZoneLocationModel.location);
    const dispatch = useDispatch();

    const [chatrooms, setChatrooms] = useState();
    const [contents, setContents] = useState();

    const [zoneTitle, setZoneTitle] = useState<string>("");
    const [zoneList, setZoneList] = useState();

    const [failed, setFailed] = useState(false);

    useEffect(() => {
        dispatch(setZoneLoadingTrue());
        InitZoneMain();
    }, [location])

    const InitZoneMain = async () => {
        axios.get(SERVER + '/zone')
            .then((response) => {
                setZoneList(response.data);
            })
            .catch((e) => {
                console.log("Zone", e);
            });

        axios.get(SERVER + "/zone-main?q=" + location)
            .then((response) => {
                setChatrooms(response.data.chatRooms);
                setContents(response.data.contents);
                setZoneTitle(response.data.zoneInfo.title);
                // console.log(response.data.contents[4].items);
                dispatch(setZoneLoadingFalse());
            })
            .catch((e) => {
                console.log("Zone main", e);
                setFailed(true);

                showMessage({
                    message: "Server Request Failed",
                    type: "danger",
                    icon: "danger",
                });

                dispatch(setZoneLoadingFalse());
            })
        // 로딩 실패 처리하기
    }

    return failed ? (
        <Layout>
            <FlashMessage autoHide={false} />
        </Layout>
    ) : (
        <Layout style={styles.MainContainer}>

            {/* 최상단 지역 버튼 */}
            <ZoneMainTopTabBarComponent {...props} zoneTitle={zoneTitle} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <Layout style={styles.InnerContainer}>
                    {/* 지역 이미지 배너 */}
                    <ZoneBannerComponent {...props} zoneTitle={zoneTitle} />
                    {/* 가이드 리스트 */}
                    <ZoneGuideListComponent {...props} items={chatrooms} />
                </Layout>

                <Layout style={styles.ListContainer}>
                    {/* 카테고리 & 컨텐츠 목록 */}
                    <ZoneCategoryListComponent {...props} items={contents} zoneTitle={zoneTitle} />
                </Layout>

            </ScrollView>
            {/* 지역 바꿀 수 있는 Bottom Sheet */}
            <ZoneMainBottomTabBarComponent {...props} zoneList={zoneList} />

            {loading && <Loading />}

        </Layout>
    )
}


const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
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