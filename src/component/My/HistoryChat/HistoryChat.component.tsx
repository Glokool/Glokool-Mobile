import React, { useState } from 'react';
import { SafeAreaView, Platform, } from 'react-native';
import { Layout, LayoutElement } from '@ui-kitten/components';
import database, { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { AuthContext } from '../../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuVisiblityFalse } from '../../../model/Chat/Chat.UI.model';
import {
    ImageModal,
    LocationModal,
    renderBubble,
    renderImage,
    renderTime,
    renderLoading,
    renderSystemMessage,
    renderSound,
    renderAvatar,
    renderCustomBubble,
    renderLoadEarlier,
    GuideModalComponent,
} from '../../Chat/ChatRoom';
import { setChatLoadingFalse } from '../../../model/Chat/Chat.Loading.model';
import { RootState } from '../../../model';
import { cleanRoomName } from '../../../model/Chat/Chat.Data.model';
import { cleanKeyboardHeight, setEmojiKeyboardFalse } from '../../../model/Chat/Chat.Keyboard.model';
import { getBottomSpace, getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';
import moment from 'moment';

import { ChatRoomSceneProps } from '../../../navigation/SceneNavigator/Chat.navigator';
import { ChatTopTabBarComponent } from './TopTabBar.component';


export const HistoryChatComponent = (props: ChatRoomSceneProps): LayoutElement => {

    const day = props.route.params.day
    const Guide = props.route.params.guide;

    const { currentUser, setCurrentUser } = React.useContext(AuthContext);

    const dispatch = useDispatch();
    const roomName = useSelector((state: RootState) => state.ChatDataModel.roomName);
    const menuVisiblity = useSelector((state: RootState) => state.ChatUIModel.menuVisiblity);
    const emojiKeyboardVisiblity = useSelector((state: RootState) => state.ChatKeyboardModel.emojiKeyboardVisiblity);


    const [messagesCount, setMessagesCount] = React.useState<number>(50);
    const [ChatDB, setChatDB] = React.useState<FirebaseDatabaseTypes.Reference | undefined>(undefined);
    const [chatMessages, setChatMessages] = React.useState<Array<IMessage>>([]);


    const [iphoneXKeyboardPadding, setIphoneXKeyboardPadding] = useState<number>(getBottomSpace() - 34);
    const [iosKeyboardPadding, setIosKeyboardPadding] = useState<number>(-14);

    React.useEffect(() => {
        
        ChatRoomMessageInit();
        dispatch(setChatLoadingFalse());

        return () => {
            if (ChatDB != undefined) {
                ChatDB.off('child_added', OfftheDB)
            };

            dispatch(setMenuVisiblityFalse());
            dispatch(setEmojiKeyboardFalse());
            dispatch(cleanKeyboardHeight());
        };
    }, []);


    const LoadEarlierMessages = () => {

        // 50개씩 예전 메시지 로딩
        setChatMessages([]);

        ChatDB?.off('child_added'); // 먼저 기존 리스너 제거

        var tempMessages: Array<IMessage> = [];

        ChatDB?.orderByKey().limitToLast(1).on('child_added', (snapshot, previousKey) => {
            setChatMessages(value => GiftedChat.append(value, snapshot.val()));            
        });


        ChatDB?.orderByKey().limitToLast(messagesCount + 50).once('value', (snapshot) => {
            snapshot.forEach((data) => {
                tempMessages = GiftedChat.append(tempMessages, data.val());
            });
        });


        setChatMessages(tempMessages);
        setMessagesCount(messagesCount + 50);
        
    }

    const OfftheDB = (snapshot: FirebaseDatabaseTypes.DataSnapshot, response?: string | null | undefined): void => {
        setChatDB(undefined);
        dispatch(cleanRoomName())
    }


    const ChatRoomMessageInit = async (): Promise<void> => {

        const travelDate = moment(props.route.params.day).format('yyyy-MM-DD');
        const DBURL = '/chats/' + travelDate + '/' + props.route.params.id + '/messages';

        const Chat = database().ref(DBURL);
        setChatDB(Chat);

        console.log(travelDate)

        var tempMessages: Array<IMessage> = [];

        Chat.orderByKey().limitToLast(messagesCount).once('value', (snapshot) => {
            snapshot.forEach((data) => {
                tempMessages = GiftedChat.append(tempMessages, data.val());
            });

            setChatMessages(tempMessages);
        });

    }



    

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

            <Layout style={{ flex: 1 }} >

                <GiftedChat
                    messages={chatMessages}
                    textInputProps={{ autoFocus: true }}
                    bottomOffset={(isIphoneX()) ? -getBottomSpace() + 47 : (Platform.OS === 'ios') ? - 25 : 0}
                    infiniteScroll={true}
                    loadEarlier={true}
                    user={{
                        _id: currentUser?.uid,
                    }}
                    messagesContainerStyle={{
                        paddingTop: isIphoneX() ? getStatusBarHeight() + 13 : 60
                    }}
                    onLoadEarlier={() => { LoadEarlierMessages() }}
                    alwaysShowSend={false}
                    showUserAvatar={false}
                    renderAvatarOnTop={true}
                    renderLoadEarlier={renderLoadEarlier}
                    renderAvatar={renderAvatar}
                    renderTime={renderTime}
                    renderInputToolbar={() => {return null}}
                    renderBubble={(props) => renderBubble(props, Guide)}
                    renderLoading={renderLoading}
                    renderSystemMessage={renderSystemMessage}
                    renderMessageImage={(props) => renderImage(props, dispatch)}
                    renderMessageAudio={(props) => renderSound(props, Guide)}
                    renderCustomView={(props) => renderCustomBubble(props, dispatch)}
                />

            </Layout>

            {/* 이미지 클릭시 확대 이미지 창 출력 */}
            <ImageModal />

            {/* 지도 메시지 클릭시 확대 창 출력 */}
            <LocationModal />

            {/*채팅방 탑 탭바*/}
            <ChatTopTabBarComponent {...props} />

            {/* 공지사항 화면 */}
            {/* <NoticeComponent /> */}

            {/* 가이드 모달 */}
            <GuideModalComponent guide={props.route.params.guide.uid} zone={props.route.params.zone} maxUser={props.route.params.maxUser} />

        </SafeAreaView>

    );
};