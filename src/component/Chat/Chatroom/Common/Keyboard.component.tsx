import React from 'react';
import { Layout, Text } from '@ui-kitten/components'
import { StyleSheet, Pressable } from 'react-native';
import { Keyboard } from 'react-native-ui-lib';
import { Camera, Images, MyLocation, Record } from '../../../../assets/icon/Chat';
import { useDispatch } from 'react-redux';
import { setAudioVisiblityTrue } from '../../../../model/Chat/Chat.UI.model';

const KeyboardAccessoryView = Keyboard.KeyboardAccessoryView;
const KeyboardUtils = Keyboard.KeyboardUtils;
const KeyboardRegistry = Keyboard.KeyboardRegistry;

const renderCustomKeyboard = () : React.ReactChild => {

    const dispatch = useDispatch();

    return(
        <Layout style={{ justifyContent: 'center', backgroundColor: '#F8F8F8' }}>
            <Layout style={styles.SideContainer}>
                <Pressable
                    style={styles.SideButton}
                    onPress={() => dispatch(setAudioVisiblityTrue())}>
                    <Record />
                    <Text style={styles.SideButtonTxt}>Voices</Text>
                </Pressable>

                <Pressable
                    style={styles.SideButton}
                    onPress={() => ImageSend()}>
                    <Images />
                    <Text style={styles.SideButtonTxt}>Images</Text>
                </Pressable>

                <Pressable
                    style={styles.SideButton}
                    onPress={() => takePhoto()}>
                    <Camera />
                    <Text style={styles.SideButtonTxt}>Camera</Text>
                </Pressable>

                <Pressable
                    style={styles.SideButton}
                    onPress={() => LocationMessage()}>
                    <MyLocation />
                    <Text style={styles.SideButtonTxt}>
                        My Location
                    </Text>
                </Pressable>
            </Layout>

            <Layout style={styles.SideContainer}></Layout>
        </Layout>
    )
}

KeyboardRegistry.registerKeyboard(
    'menu',
    () => renderCustomKeyboard
);

const styles = StyleSheet.create({
    
    SideContainerBack: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        justifyContent: 'flex-end',
        top: 0,
        left: 0,
    },

    SideContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: '50%',
        backgroundColor: '#F8F8F8',

    },
    
    SideButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 86,
        height: 65,
        marginTop: 10,
    },

    SideButtonTxt: {
        fontFamily: 'IBMPlexSansKR-Medium',
        color: '#8C8C8C',
        fontSize: 12,
    },

})