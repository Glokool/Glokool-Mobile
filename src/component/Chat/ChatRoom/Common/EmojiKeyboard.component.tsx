import React from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../model';
import { Layout } from '@ui-kitten/components';
import { windowWidth } from '../../../../Design.component';
import { setEmojiKeyboardFalse } from '../../../../model/Chat/Chat.Keyboard.model';

export const EmojiKeyboardComponent = (props : any) : React.ReactElement => {

    const ChatDB = props.ChatDB;
    const ChatRoomID = props.ChatRoomID;    

    const dispatch = useDispatch();
    const keyboardHeight = useSelector((state : RootState) => state.ChatKeyboardModel.keyboardHeight);
    const emojiKeyboardVisiblity = useSelector((state : RootState) => state.ChatKeyboardModel.emojiKeyboardVisiblity);

    const data = ['웃음', '화남', '슬픔', '빡침', '아이러니', '아이콘!'];


    const PressIcon = (icon : string) => {
        dispatch(setEmojiKeyboardFalse());
    }


    const renderItem = (item : {item : any, index : number}) : React.ReactElement => {

        return(
            <Pressable style={styles.EmojiContainer} onPress={() => {PressIcon(item.item)}}>

            </Pressable>
        )
    }

   

    return(
        <>
            {(emojiKeyboardVisiblity)? 
                <Layout style={{ justifyContent: 'center', backgroundColor: '#F8F8F8', height: keyboardHeight, minHeight: 180}}>
                    <FlatList
                        style={styles.EmojiKeyboardContainer}
                        contentContainerStyle={styles.EmojiKeyboardInnerContainer}
                        columnWrapperStyle={{justifyContent: 'space-between'}}
                        data={data}
                        renderItem={renderItem}
                        numColumns={3}
                    />
                </Layout>
            :
                null
            }
        </>
    )
}

const styles = StyleSheet.create({
    EmojiKeyboardContainer : {
        width: '100%',
    },

    EmojiKeyboardInnerContainer: {
        paddingBottom: 20,
        paddingHorizontal: 20
    },



    EmojiContainer: {   
        backgroundColor: 'red',
        width : windowWidth * 0.28,
        height : windowWidth * 0.28,
        borderRadius: 10,
        marginBottom: 10
    }
})