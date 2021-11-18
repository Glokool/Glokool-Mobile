import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, Alert, Modal, Pressable, TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { ZoneMainSceneProps } from '../../navigation/SceneNavigator/Zone.navigator';
import {
    ZoneMainBottomTabBarComponent,
    ZoneMainTopTabBarComponent,
    ZoneBannerComponent,
    ZoneGuideListComponent,
    ZoneCategoryListComponent,
} from '../../component/Zone';
import { windowHeight, windowWidth } from '../../Design.component';
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
        InitZoneMain();
    }, [location])

    const InitZoneMain = async () => {
        dispatch(setZoneLoadingTrue());
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
                InitFailed();
                dispatch(setZoneLoadingFalse());
            })
        // 로딩 실패 처리하기
    }

    const InitFailed = () => {
        setFailed(true);

        showMessage({
            message: "Server Request Failed",
            type: "danger",
            icon: "danger",
            onPress: () => {
                InitZoneMain();
            }
        });
    }

    return failed ? (
        <Layout style={styles.MainContainer}>
            <TouchableOpacity
                onPress={() => {
                    setFailed(false)
                    InitZoneMain()
                }}>
                <Text style={styles.ReloadMessage}>Tap to reload</Text>
            </TouchableOpacity>
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
                    <ZoneGuideListComponent {...props} items={chatrooms} zoneTitle={zoneTitle} />
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
        width: windowWidth,
        height: windowHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e9e9e9'
    },
    InnerContainer: {
        width: windowWidth,
        backgroundColor: '#ffffff',
        paddingBottom: 20,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 3.84,
        // elevation: 2,
    },

    ListContainer: {
        marginTop: 20,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 3.84,
        // elevation: 2,
    },
    ReloadMessage: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 20,
        color: '#555'
    }
})