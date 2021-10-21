import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Divider, Layout, Text, Toggle } from '@ui-kitten/components';
import { windowHeight, windowWidth } from '../../Design.component';
import { GuideModal, MemberList, SettingTopTabBarComponent } from '../../component/Chat/ChatRoomSetting';
import FastImage from 'react-native-fast-image';
import { ChatRoomSettingProps } from '../../navigation/SceneNavigator/Chat.navigator';
import { useDispatch } from 'react-redux';
import { setGuideVisiblityTrue } from '../../model/Chat/Chat.Setting.model';
import { SceneRoute } from '../../navigation/app.route';


export const ChatRoomSettingScene = (props: ChatRoomSettingProps) : React.ReactElement => {

    const dispatch = useDispatch();
    const [mute, setMute] = React.useState(false);

    const PressLeave = () => {
        console.log(props)
    }

    const PressMute = () => {

    }

    const PressProfile = () => {
        dispatch(setGuideVisiblityTrue());
    }

    const PressReport = () => {
        props.navigation.navigate(SceneRoute.CHAT_REPORT, {
            id : 'charRoomID', // 채팅방 id
            user : {
                name : '가이드 이름',
                uid : '1234'
            }
        })
    }

    return(
        <Layout style={styles.MainContainer}>

            <Layout style={styles.EmptyContainer}/>

            <Layout style={styles.ButtonContainer}>
                <Pressable onPress={PressLeave}>
                    <FastImage source={require('../../assets/image/Chat/Leave_Button.png')} style={styles.LeaveButton} />
                </Pressable>
            </Layout>

            <Layout style={styles.MuteButtonContainer}>
                <Text style={styles.Title}>Mute Message Notification</Text>
                <Toggle checked={mute} onChange={PressMute}/>
            </Layout>

            <Divider style={styles.Divider}/>

            <Layout style={styles.TitleContainer}>
                <Text style={styles.Title}>Travel Assistant</Text>
            </Layout>

            <Layout style={styles.GuideInfoContainer}>

                <Layout style={styles.GuideInfoContainer2}>
                    <FastImage source={require('../../assets/image/Chat/guideGray.png')} style={styles.Avatar}/>

                    <Text style={styles.Description}>Glokool Official</Text>
                </Layout>

                <Layout style={styles.DoubleButtonContainer}>

                    <Pressable onPress={PressProfile}>
                        <FastImage source={require('../../assets/image/Chat/Profile_Button.png')} style={styles.MainButton} />
                    </Pressable>

                    <Pressable onPress={PressReport}>
                        <FastImage source={require('../../assets/image/Chat/Report_Button.png')} style={styles.MainButton} />
                    </Pressable>

                </Layout>

            </Layout>

            <Divider style={styles.Divider}/>

            <Layout style={styles.TitleContainer}>
                <Text style={styles.Title}>Members</Text>
            </Layout>

            <Layout style={styles.MemberContainer}>
                <MemberList {...props}/>
            </Layout>
            

            <GuideModal {...props}/>

            <SettingTopTabBarComponent {...props} />

        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer : {
        width : windowWidth,
        height : windowHeight,
        alignItems: 'center',
    },

    EmptyContainer: {
        height: 60,
        width: '100%'
    },

    ButtonContainer: {
        marginVertical: 20
    },

    DoubleButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 140,
    },

    LeaveButton : {
        width : 140,
        height : 40
    },

    MuteButtonContainer: {
        width: '100%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20
    },

    TitleContainer : {
        paddingLeft: 20,
        width: '100%',
        marginVertical: 15
    },

    Title : {
        fontFamily : 'Pretendard-SemiBold',
        fontSize: 17
    },

    Divider: {
        width : '100%',
        height : 2,
        backgroundColor: '#F3F3F3'
    },

    GuideInfoContainer: {
        flexDirection: 'row',
        width: '100%',
        height : 52,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 15
    },

    GuideInfoContainer2:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    Avatar : {
        width : 52,
        height : 52,
        borderRadius: 100,
        marginRight : 10
    },

    Description : {
        fontFamily : 'Pretendard-Medium',
        fontSize: 16
    },

    MainButton : {
        width : 64,
        height : 28
    },
    
    MemberContainer: {
        width: '100%',
        flex : 1,
    }

})