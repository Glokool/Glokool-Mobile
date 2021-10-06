import React from 'react';
import { Keyboard, Pressable, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ActionsProps } from 'react-native-gifted-chat';
import { useDispatch } from 'react-redux';
import { setMenuVisiblityTrue } from '../../../../model/Chat/Chat.UI.model';

export const renderActions = (props : ActionsProps) : React.ReactElement => {

    function PressActionButton() {
        const dispatch = useDispatch();

        dispatch(setMenuVisiblityTrue());
        Keyboard.dismiss();
    }
  
    return (
        <Pressable
            style={styles.ActionButton}
            onPress={() => PressActionButton()}
        >
            <FastImage
                style={styles.MenuImage}
                source={require('../../assets/icon/Chat/Menu_S.png')}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    MenuImage: {
        width: 20,
        height: 20,
        resizeMode: 'stretch',
    },

    ActionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 17,
        marginBottom: 17,
    },
})