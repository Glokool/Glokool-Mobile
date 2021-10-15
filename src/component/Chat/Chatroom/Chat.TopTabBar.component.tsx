import React from 'react';
import { Image, Keyboard, Platform, Pressable, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { AngleLeft, ArrowLeft } from '../../../assets/icon/Common';
import { Chat_App, Chat_Setting, QuickSearchButton } from '../../../assets/icon/Chat';
import { SceneRoute } from '../../../navigation/app.route';
import { CDN } from '../../../server.component';
import { useDispatch } from 'react-redux';
import { setGuideVisiblityTrue } from '../../../model/Chat/Chat.UI.model';



export const ChatTopTabBarComponent = (props : any) : React.ReactElement => {

    const guide = props.guide;
    const msgRef = props.msgRef;
    const ChatDB = props.ChatDB;
    const dispatch = useDispatch();    

    const resetUserUnreadMsgCount = () => {
        msgRef.transaction((userUnreadCount: number) => {
            if (userUnreadCount && userUnreadCount > 0) {
                userUnreadCount = 0;
            }
            return userUnreadCount;
        });
    };

    const PressBackButton = () : void => {
        ChatDB.off('value');
        resetUserUnreadMsgCount();
        props.props.navigation.goBack();
    }

    return(

        <Layout style={styles.TabBar}>

            <SafeAreaView style={{flex: 0}}/>

            <Layout style={styles.TabBarContainer} onTouchStart={Keyboard.dismiss}>                        
                <Pressable
                    style={styles.LeftIcon}
                    onPress={() => {PressBackButton()}}>
                    <ArrowLeft />
                </Pressable>

                <Layout style={styles.ProfileContainer}>
                    <TouchableOpacity onPress={() => dispatch(setGuideVisiblityTrue())}>
                        {guide.avatar != " " &&
                            guide.avatar != undefined &&
                            guide.avatar != null ? (
                            <Image
                                source={{ uri: CDN + guide.avatar }}
                                style={styles.ProfileImage}
                            />
                        ) : (
                            <Image
                                source={require('../../assets/profile/profile_01.png')}
                                style={styles.ProfileImage}
                            />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => dispatch(setGuideVisiblityTrue())}>
                        <Text style={styles.Title}>
                            {props.props.route.params.guide.name === undefined
                                ? `매칭중..`
                                : `${props.props.route.params.guide.name}`}
                        </Text>
                    </TouchableOpacity>
                </Layout>

                <Pressable
                    style={styles.SmallIcon}
                    onPress={() => {
                        props.props.navigation.navigate(SceneRoute.CHAT_QUICK_RECOMMENDATION);
                    }}>
                    <Chat_App />
                </Pressable>

                <Pressable
                    style={styles.RightIcon}
                    onPress={() => {
                        props.props.navigation.navigate(SceneRoute.CHAT_ROOM_SETTING);
                    }}>
                    <Chat_Setting />
                </Pressable>
            </Layout>            
        </Layout>
        
    )
}

const styles = StyleSheet.create({

    IconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },

    Title: {
        fontFamily: 'Pretendard-Medium',
        textAlign : 'center',
        fontSize: Platform.OS === 'ios' ? 18 : 16,
    },

    TabBar: {
        position: 'absolute',
        width: '100%',
        top: 0,
        height: 60,
        justifyContent : 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderBottomWidth : 1,
        borderBottomColor : '#F0F0F0'
    },

    TabBarContainer : {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00FF0000'
    },

    ProfileContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00FF0000'
    },

    ProfileImage: {        
        width: 25,
        height: 25,
        borderRadius: 100,
        marginRight: 15,
    },

    SmallIconContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        backgroundColor: '#00FF0000'
    },

    LeftIcon : {
        width: 10,
        height : 10,
        marginHorizontal: 5,
        padding : 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        backgroundColor: '#00FF0000'
    },

    RightIcon : {
        width: 10,
        height : 10,
        marginHorizontal: 5,
        padding : 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },

    SmallIcon : {
        width: 10,
        height : 10,
        marginHorizontal: 5,
        padding : 15,
        justifyContent: 'center',
        alignItems: 'center'
    }

    
});

