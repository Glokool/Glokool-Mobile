import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Bubble, BubbleProps, Composer, ComposerProps, IMessage, InputToolbar, InputToolbarProps, Time } from 'react-native-gifted-chat';
import { Layout, Spinner, Text } from '@ui-kitten/components'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { RootState } from '../../../model';

// 위치 정보 말풍선 메시지 타입
type LocationBubbleMessage = {
    currentMessage : {
        location : {
            lat : string,
            lon : string
        },
        messageType : string
    }
}


// 대화창 말풍선 
export const renderBubble = (props) : React.ReactElement => {

    return (
        <Bubble
            {...props}
            wrapperStyle={{
                left: styles.LeftBubbleWrapper,
                right: styles.RightBubbleWrapper
            }}
            textStyle={{
                left: styles.LeftBubbleText,
                right: styles.RightBubbleText
            }}
            tickStyle={{ color: 'black' }}
        />
    );
};

// 채팅 메세지에 달려있는 시간 표시
export const renderTime = (props: any) : React.ReactElement => {

    return (
        <Layout
            style={(props.position === 'right')? styles.BubbleRightTimeContainer : styles.BubbleLeftTimeContainer}>
                <Time
                    {...props}
                    containerStyle={{ backgroundColor: 'red' }}
                    timeTextStyle={{
                        left: styles.BubbleTimeText,
                        right: styles.BubbleTimeText
                    }}
                />
        </Layout>
    );
};
    

export const renderCustomBubble = (props : BubbleProps<IMessage> & LocationBubbleMessage ) : React.ReactElement => {
    

    // Mapview (My Location) 출력을 위한 코드
    if (props.currentMessage.messageType === 'location') {
        return (
            <Pressable>
                <Text
                    style={styles.MyLocationHeaderText}>
                    My Location
                </Text>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{ width: 250, height: 125, margin: 10 }}
                    region={{
                        latitude: parseFloat(
                            props.currentMessage.location.lat,
                        ),
                        longitude: parseFloat(
                            props.currentMessage.location.lon,
                        ),
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}>
                    <Marker
                        coordinate={{
                            latitude: parseFloat(
                                props.currentMessage.location.lat,
                            ),
                            longitude: parseFloat(
                                props.currentMessage.location.lon,
                            ),
                        }}
                        title={'My Location'}
                    />
                </MapView>
            </Pressable>
        );
    }
};

//입력 창 확인
export const renderInputToolbar = (props : InputToolbarProps) : React.ReactElement => (
    <>
        {
            new Date(day).getFullYear() == new Date().getFullYear() &&
            new Date(day).getMonth() == new Date().getMonth() &&
            new Date(day).getDate() == new Date().getDate() ? 
            (
                <InputToolbar
                    {...props}
                    containerStyle={styles.ChatInputToolBar}
                />
            ) 
            : 
                null
        }
    </>
    
);


export const renderComposer = (props : ComposerProps) : React.ReactElement => (
    <Composer
        {...props}
        textInputProps={{ autoFocus: true, selectTextOnFocus: false, numberOfLines: 5 }}
        placeholder="Chat Message"
        textInputStyle={styles.ChatComposer}
    />
);

//대화 내용을 로딩하기 전 스피너 작동
export const renderLoading = () => {

    return (
        <Layout style={styles.LoadingContainer}>
            <Spinner size= "giant"/>
        </Layout>
    );

};

const styles = StyleSheet.create({

    ChatComposer : {
        alignSelf: 'center',
        marginBottom: -2,
        textDecorationLine: 'none',
        borderBottomWidth: 0,
        textAlignVertical: 'center',
        maxHeight: 90,
    },

    ChatInputToolBar : {
        borderWidth: 1.5,
        borderColor: '#D1D1D1',
        borderRadius: 30,
        margin: 10,
        alignItems: 'center',
    },

    LeftBubbleWrapper : {
        backgroundColor: '#7777FF',
        borderRadius: 10,
        marginBottom: 3,
    },

    LeftBubbleText: {
        color: 'white',
        fontFamily: 'Pretendard-Medium',
    },

    RightBubbleWrapper : {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 3,
        shadowColor: '#222',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1.41,
        elevation: 2,
    },

    RightBubbleText: {
        color: '#4E4ED8',
        fontSize: 15,
        fontFamily: 'Pretendard-Medium',
    },

    BubbleTimeText: {
        color: '#AEAEAE',
        fontFamily: 'BrandonGrotesque-Medium',
    },

    BubbleLeftTimeContainer: {
        position: 'absolute',
        backgroundColor: '#00FF0000',
        right: -55,
        top: -15,
    },

    BubbleRightTimeContainer: {
        position: 'absolute',
        backgroundColor: '#00FF0000',
        left: -60,
        top: -10,
    },

    MyLocationHeaderText: {
        textAlign: 'right',
        marginTop: 5,
        marginRight: 10,
        color: '#8C8C8C',
        fontFamily: 'BrandonGrotesque-Medium',
    },

    LoadingContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }


})