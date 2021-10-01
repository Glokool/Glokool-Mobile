import React from 'react';
import { Image, Keyboard, Platform, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { AngleLeft } from '../../../assets/icon/Common';
import { QuickSearchButton } from '../../../assets/icon/Chat';
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
        <Layout style={styles.TabBar} onTouchStart={Keyboard.dismiss}>
            <Pressable
                style={styles.IconContainer}
                onPress={() => {PressBackButton()}}>
                <AngleLeft />
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
                style={styles.IconContainer}
                onPress={() => {
                    props.props.navigation.navigate(SceneRoute.CHAT_QUICK_SEARCH);
                }}>
                <QuickSearchButton />
            </Pressable>
        </Layout>        
    )
}

const styles = StyleSheet.create({

    IconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        marginRight: 15,
    },

    Title: {
        fontFamily: 'Pretendard-Medium',
        fontSize: Platform.OS === 'ios' ? 18 : 15,
    },

    TabBar: {
        flexDirection: 'row',
        position: 'absolute',
        width: '100%',
        top: 0,
        height: 80,
        alignItems: 'center',
    },

    ProfileContainer: {
        flex: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },

    ProfileImage: {        
        width: 40,
        height: 40,
        borderRadius: 100,
        marginRight: 15,
    }

    
});

